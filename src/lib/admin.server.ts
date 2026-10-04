/**
 * Server-only: admin login (one shared password) and database operations.
 *
 * Environment variables (set in Vercel):
 *   ADMIN_PASSWORD        the password the client types at /admin
 *   ADMIN_SESSION_SECRET  optional long random string used to sign the login cookie
 *
 * In local development (not production) the password defaults to "admin".
 */
import { createHash, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { deleteCookie, getCookie, getRequestIP, setCookie } from "@tanstack/react-start/server";
import { z } from "zod";
import { clearContentCache } from "@/lib/content.server";
import { getSql } from "@/lib/db";
import { isPersistent } from "@/lib/forms.server";
import { defaults, type ContentType } from "@/lib/content-store";
import { env } from "@/lib/env.server";

const COOKIE = "cv_admin";
const SESSION_HOURS = 12;
const isProd = process.env.NODE_ENV === "production";

export function adminPassword(): string | undefined {
  return env("ADMIN_PASSWORD") ?? (isProd ? undefined : "admin");
}

export { isPersistent };

function secretKey(): Uint8Array {
  const base = env("ADMIN_SESSION_SECRET") ?? `${adminPassword() ?? "unset"}::cv-admin`;
  return new TextEncoder().encode(base);
}

const sha = (v: string) => createHash("sha256").update(v).digest();

// ---- login throttling (best effort, per server instance) ----
const attempts = new Map<string, { count: number; until: number }>();

function throttled(ip: string): boolean {
  const a = attempts.get(ip);
  return !!a && a.count >= 5 && Date.now() < a.until;
}
function recordFailure(ip: string): void {
  const a = attempts.get(ip);
  if (a && Date.now() < a.until) a.count += 1;
  else attempts.set(ip, { count: 1, until: Date.now() + 10 * 60_000 });
}

export async function login(password: string): Promise<"ok" | "bad" | "locked" | "disabled"> {
  const expected = adminPassword();
  if (!expected) return "disabled";
  const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
  if (throttled(ip)) return "locked";
  const ok = timingSafeEqual(sha(password), sha(expected));
  if (!ok) {
    recordFailure(ip);
    await new Promise((r) => setTimeout(r, 400));
    return "bad";
  }
  attempts.delete(ip);
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(secretKey());
  setCookie(COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  });
  return "ok";
}

export function logout(): void {
  deleteCookie(COOKIE, { path: "/" });
}

export async function isAdmin(): Promise<boolean> {
  const token = getCookie(COOKIE);
  if (!token || !adminPassword()) return false;
  try {
    await jwtVerify(token, secretKey());
    return true;
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) throw new Error("Not authorised");
}

function requirePersistent(): void {
  if (!isPersistent()) {
    throw new Error(
      "No database is connected (DATABASE_URL is not set), so changes would be lost. Add a Neon database in Vercel first.",
    );
  }
}

// ---- validation ----
const slug = z
  .string()
  .trim()
  .min(1)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes only");
const text = (max: number) => z.string().trim().min(1, "Required").max(max);
const optText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));
const imagePath = z
  .string()
  .trim()
  .min(1, "Choose an image")
  .max(400)
  .refine((v) => v.startsWith("/") || v.startsWith("https://"), "Use /images/... or an https:// link");
const lines = z.array(z.string().trim().min(1).max(300)).max(40);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");

export const schemas = {
  event: z.object({
    slug,
    title: text(140),
    kind: z.enum(["workshop", "training", "fundraising", "conference", "launch", "community"]),
    date: isoDate,
    end: isoDate.optional().or(z.literal("")),
    place: text(120),
    city: text(120),
    summary: text(400),
    body: text(3000),
    image: imagePath,
    gallery: z.array(imagePath).max(12).optional(),
  }),
  project: z.object({
    slug,
    number: text(10),
    title: text(140),
    place: text(120),
    status: z.enum(["live", "delivery", "coming"]),
    theme: text(80),
    summary: text(400),
    body: text(3000),
    image: imagePath,
    outcomes: lines,
    year: text(40),
  }),
  job: z.object({
    slug,
    title: text(140),
    kind: z.enum(["employed", "volunteer", "apprenticeship"]),
    location: text(120),
    type: text(60),
    team: text(80),
    closing: text(60),
    summary: text(500),
    points: lines,
  }),
} as const;

/** `json` is the item as a JSON string (parsed in the browser), which keeps the server-function types simple. */
export type AdminItem = { slug: string; position: number; json: string };

const TABLE_KEY: Record<ContentType, "events" | "projects" | "jobs"> = {
  event: "events",
  project: "projects",
  job: "jobs",
};

export async function getAdminContent() {
  const sql = await getSql();
  const meta = await sql<{ type: string }>`select type from content_meta`;
  const managed = new Set(meta.map((m) => m.type));
  const rows = await sql<{ type: string; slug: string; position: number; data: Record<string, unknown> }>`
    select type, slug, position, data from content_items order by position asc, updated_at asc`;
  const out = {} as Record<ContentType, { managed: boolean; items: AdminItem[] }>;
  for (const type of ["event", "project", "job"] as const) {
    if (managed.has(type)) {
      out[type] = {
        managed: true,
        items: rows
          .filter((r) => r.type === type)
          .map((r) => ({
            slug: r.slug,
            position: r.position,
            json: JSON.stringify({ ...r.data, slug: r.slug }),
          })),
      };
    } else {
      out[type] = {
        managed: false,
        items: (defaults[TABLE_KEY[type]] as unknown as Record<string, unknown>[]).map((d, i) => ({
          slug: String(d.slug),
          position: i * 10,
          json: JSON.stringify(d),
        })),
      };
    }
  }
  return out;
}

export async function adoptDefaults(type: ContentType): Promise<void> {
  requirePersistent();
  const sql = await getSql();
  const list = defaults[TABLE_KEY[type]] as unknown as Record<string, unknown>[];
  for (let i = 0; i < list.length; i += 1) {
    const { slug: s, ...rest } = list[i] as { slug: string } & Record<string, unknown>;
    delete (rest as Record<string, unknown>).past; // computed from the date
    await sql`
      insert into content_items (type, slug, data, position)
      values (${type}, ${s}, ${JSON.stringify(rest)}::jsonb, ${i * 10})
      on conflict (type, slug) do nothing`;
  }
  await sql`insert into content_meta (type) values (${type}) on conflict do nothing`;
  clearContentCache();
}

export async function saveItem(
  type: ContentType,
  input: unknown,
  originalSlug: string | null,
  position: number | null,
): Promise<void> {
  requirePersistent();
  const parsed = schemas[type].parse(input) as { slug: string } & Record<string, unknown>;
  const { slug: s, ...rest } = parsed;
  // empty optional strings are not worth storing
  for (const k of Object.keys(rest)) {
    if (rest[k] === "" || (Array.isArray(rest[k]) && (rest[k] as unknown[]).length === 0 && k === "gallery")) {
      delete rest[k];
    }
  }
  const sql = await getSql();
  await sql`insert into content_meta (type) values (${type}) on conflict do nothing`;
  if (!originalSlug) {
    const exists = await sql`select 1 from content_items where type = ${type} and slug = ${s}`;
    if (exists.length) throw new Error(`An item with the web address "${s}" already exists`);
  } else if (originalSlug !== s) {
    const exists = await sql`select 1 from content_items where type = ${type} and slug = ${s}`;
    if (exists.length) throw new Error(`An item with the web address "${s}" already exists`);
    await sql`delete from content_items where type = ${type} and slug = ${originalSlug}`;
  }
  let pos = position;
  if (pos === null || Number.isNaN(pos)) {
    const max = await sql<{ m: number | null }>`select max(position) as m from content_items where type = ${type}`;
    pos = (max[0]?.m ?? -10) + 10;
  }
  await sql`
    insert into content_items (type, slug, data, position, updated_at)
    values (${type}, ${s}, ${JSON.stringify(rest)}::jsonb, ${pos}, now())
    on conflict (type, slug) do update
      set data = excluded.data, position = excluded.position, updated_at = now()`;
  clearContentCache();
}

export async function deleteItem(type: ContentType, s: string): Promise<void> {
  requirePersistent();
  const sql = await getSql();
  await sql`delete from content_items where type = ${type} and slug = ${s}`;
  clearContentCache();
}

export type SubmissionRow = {
  id: number;
  kind: string;
  name: string | null;
  email: string;
  detailsJson: string;
  created_at: string;
};

export async function listSubmissions(): Promise<SubmissionRow[]> {
  const sql = await getSql();
  const rows = await sql<{
    id: number;
    kind: string;
    name: string | null;
    email: string;
    details: unknown;
    created_at: Date | string;
  }>`select id, kind, name, email, details, created_at from submissions order by created_at desc limit 2000`;
  return rows.map((r) => ({
    id: r.id,
    kind: r.kind,
    name: r.name,
    email: r.email,
    detailsJson: JSON.stringify(r.details ?? {}),
    created_at: new Date(r.created_at).toISOString(),
  }));
}

export async function deleteSubmission(id: number): Promise<void> {
  const sql = await getSql();
  await sql`delete from submissions where id = ${id}`;
}
