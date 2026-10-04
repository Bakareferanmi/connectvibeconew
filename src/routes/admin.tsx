import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  adminAdopt,
  adminDelete,
  adminDeleteSubmission,
  adminGetContent,
  adminLogin,
  adminLogout,
  adminSave,
  adminSession,
  adminSubmissions,
  adminUploadImage,
} from "@/lib/admin";
import { defaults, type ContentType } from "@/lib/content-store";
import { loadContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  loader: () => adminSession(),
  head: () => ({
    meta: [{ title: "Admin | connectvibeco" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

/* ------------------------------------------------------------------ */
/* Field definitions: what the client can edit for each kind of item   */
/* ------------------------------------------------------------------ */

type Field = {
  key: string;
  label: string;
  kind: "text" | "textarea" | "select" | "date" | "lines" | "image" | "number";
  /** Only show this field while another field has this value. */
  showIf?: { key: string; value: string };
  options?: { value: string; label: string }[];
  required?: boolean;
  help?: string;
  rows?: number;
};

const opt = (...values: string[]) =>
  values.map((v) => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) }));

const FIELDS: Record<ContentType, Field[]> = {
  event: [
    { key: "title", label: "Title", kind: "text", required: true },
    { key: "kind", label: "Type of event", kind: "select", options: opt("community", "workshop", "training", "fundraising", "conference", "launch"), required: true },
    { key: "date", label: "Date", kind: "date", required: true },
    { key: "end", label: "End date (optional, for multi-day events)", kind: "date" },
    { key: "place", label: "Venue", kind: "text", required: true },
    { key: "city", label: "City", kind: "text", required: true },
    { key: "summary", label: "Short summary", kind: "textarea", rows: 3, required: true, help: "Shown on the events list." },
    { key: "body", label: "Full description", kind: "textarea", rows: 7, required: true },
    { key: "image", label: "Main image", kind: "image", required: true },
    { key: "gallery", label: "Gallery images (optional)", kind: "lines", rows: 3 },
    { key: "pricing", label: "Tickets", kind: "select", options: [{ value: "free", label: "Free to attend" }, { value: "paid", label: "Paid (visitors pay online)" }], required: true, help: "Free events use the simple registration form. Paid events take visitors to checkout." },
    { key: "currency", label: "Currency", kind: "select", options: [{ value: "NGN", label: "Naira (₦)" }, { value: "GBP", label: "Pounds (£)" }, { value: "USD", label: "US dollars ($)" }], required: true, showIf: { key: "pricing", value: "paid" } },
    { key: "price", label: "Price per place", kind: "number", required: true, showIf: { key: "pricing", value: "paid" }, help: "In the currency above, e.g. 25 or 12.50. Each visitor can book up to 6 places." },
  ],
  project: [
    { key: "title", label: "Title", kind: "text", required: true },
    { key: "number", label: "Project number (e.g. 01)", kind: "text", required: true },
    { key: "place", label: "Place", kind: "text", required: true },
    { key: "status", label: "Status", kind: "select", options: [{ value: "live", label: "Live" }, { value: "delivery", label: "In delivery" }, { value: "coming", label: "Coming soon" }], required: true },
    { key: "theme", label: "Theme (e.g. Retrofit)", kind: "text", required: true },
    { key: "year", label: "Year or dates (e.g. 2026 or From 2027)", kind: "text", required: true },
    { key: "summary", label: "Short summary", kind: "textarea", rows: 3, required: true },
    { key: "body", label: "Full description", kind: "textarea", rows: 7, required: true },
    { key: "image", label: "Main image", kind: "image", required: true },
    { key: "outcomes", label: "Outcomes (one per line)", kind: "lines", rows: 4 },
  ],
  job: [
    { key: "title", label: "Job title", kind: "text", required: true },
    { key: "kind", label: "Kind", kind: "select", options: [{ value: "employed", label: "Employed" }, { value: "volunteer", label: "Volunteer" }, { value: "apprenticeship", label: "Apprenticeship" }], required: true },
    { key: "location", label: "Location", kind: "text", required: true },
    { key: "type", label: "Hours (e.g. Full-time)", kind: "text", required: true },
    { key: "team", label: "Team", kind: "text", required: true },
    { key: "closing", label: "Closing date (e.g. 31 Oct 2026)", kind: "text", required: true },
    { key: "summary", label: "Summary", kind: "textarea", rows: 4, required: true },
    { key: "points", label: "Requirements (one per line)", kind: "lines", rows: 5 },
  ],
};

const LABELS: Record<ContentType, { plural: string; singular: string }> = {
  event: { plural: "Events", singular: "event" },
  project: { plural: "Projects", singular: "project" },
  job: { plural: "Jobs", singular: "job" },
};

const knownImages = Array.from(
  new Set([...defaults.events, ...defaults.projects].map((i) => i.image)),
);

type Json = Record<string, unknown>;

function slugify(v: string): string {
  return v
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function toValues(type: ContentType, item: Json | null): Record<string, string> {
  const values: Record<string, string> = { slug: String(item?.slug ?? "") };
  for (const f of FIELDS[type]) {
    const v = item?.[f.key];
    values[f.key] = Array.isArray(v) ? v.join("\n") : v == null ? "" : String(v);
  }
  if (type === "event" && !values.pricing) values.pricing = "free"; // events made before pricing existed
  return values;
}

/** Tidy an image address: "hero.jpg" and "images/hero.jpg" both become "/images/hero.jpg". */
function normImage(v: string): string {
  const s = v.trim().replace(/^["'`]+|["'`,;]+$/g, "").trim();
  if (!s || s.startsWith("/") || /^https?:\/\//i.test(s)) return s;
  if (/^images\//i.test(s)) return `/${s}`;
  if (/^[\w.\- ]+\.(jpe?g|png|webp|avif|gif|svg)$/i.test(s)) return `/images/${s.trim()}`;
  return s;
}

/** Shrink a picture in the browser (max 1800px, WebP) so phone photos upload quickly. Returns base64. */
async function shrinkToBase64(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob: Blob = await new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Could not read that picture"))), "image/webp", 0.85),
  );
  const buf = new Uint8Array(await blob.arrayBuffer());
  let bin = "";
  for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
  return btoa(bin);
}

function UploadButton({
  multiple,
  label,
  onUploaded,
}: {
  multiple?: boolean;
  label: string;
  onUploaded: (urls: string[]) => void;
}) {
  const [busy, setBusy] = useState(false);
  async function onPick(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    const urls: string[] = [];
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) throw new Error(`${file.name} is not a picture`);
        const data = await shrinkToBase64(file).catch(() => {
          throw new Error(`Couldn’t read ${file.name}. Try a JPG, PNG or WebP picture`);
        });
        const res = await adminUploadImage({ data: { name: file.name, data } });
        urls.push(res.url);
      }
      toast.success(urls.length === 1 ? "Picture uploaded." : `${urls.length} pictures uploaded.`);
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      if (urls.length) onUploaded(urls);
      setBusy(false);
    }
  }
  return (
    <label className="inline-flex w-fit cursor-pointer items-center rounded-full bg-deep px-4 py-2 text-sm font-medium text-snow transition-colors hover:bg-ocean has-[:disabled]:cursor-wait has-[:disabled]:opacity-60">
      {busy ? "Uploading..." : label}
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        disabled={busy}
        className="sr-only"
        onChange={(e) => {
          void onPick(e.target.files);
          e.target.value = "";
        }}
      />
    </label>
  );
}

function fromValues(type: ContentType, values: Record<string, string>): Json {
  const out: Json = { slug: values.slug.trim() };
  for (const f of FIELDS[type]) {
    const raw = values[f.key] ?? "";
    if (f.showIf && values[f.showIf.key] !== f.showIf.value) continue; // hidden field
    out[f.key] =
      f.kind === "lines"
        ? raw
            .split(/[\r\n]+/)
            .flatMap((l) => (f.key === "gallery" ? l.split(/\s*,\s*|\s{2,}/) : [l]))
            .map((l) => (f.key === "gallery" ? normImage(l) : l.trim()))
            .filter(Boolean)
        : f.kind === "image"
          ? normImage(raw)
        : f.kind === "number"
          ? raw.trim() === "" ? undefined : Number(raw)
          : raw.trim();
  }
  return out;
}

function errorMessage(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  // zod errors arrive as JSON text; show the first readable message
  try {
    const parsed = JSON.parse(msg) as { message?: string; path?: string[] }[];
    if (Array.isArray(parsed) && parsed[0]?.message) {
      return `${parsed[0].path?.join(".") || "Form"}: ${parsed[0].message}`;
    }
  } catch {
    /* not JSON */
  }
  return msg;
}

/* ------------------------------------------------------------------ */

function AdminPage() {
  const session = Route.useLoaderData();
  const router = useRouter();

  return (
    <main id="main" tabIndex={-1} className="min-h-screen outline-none">
      <div className="bg-navy pb-10 pt-28 text-snow">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">Admin</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Manage your website</h1>
          </div>
          {session.authed ? (
            <Button
              variant="onDark"
              size="sm"
              onClick={async () => {
                await adminLogout();
                await router.invalidate();
              }}
            >
              Log out
            </Button>
          ) : null}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {!session.configured ? (
          <Notice tone="warn">
            The admin area isn’t set up yet. Add an <code>ADMIN_PASSWORD</code> environment
            variable in Vercel and redeploy.
          </Notice>
        ) : !session.authed ? (
          <LoginForm onDone={() => router.invalidate()} />
        ) : (
          <Dashboard persistent={session.persistent} />
        )}
      </div>
    </main>
  );
}

function Notice({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warn" }) {
  return (
    <div
      className={cn(
        "rounded-2xl p-4 text-sm leading-relaxed",
        tone === "warn" ? "bg-amber-50 text-amber-900 ring-1 ring-amber-200" : "bg-foam text-deep",
      )}
    >
      {children}
    </div>
  );
}

function LoginForm({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const { result } = await adminLogin({ data: { password } });
      if (result === "ok") {
        onDone();
      } else if (result === "locked") {
        toast.error("Too many attempts. Please wait 10 minutes and try again.");
      } else if (result === "disabled") {
        toast.error("Admin is not set up yet.");
      } else {
        toast.error("That password isn’t right.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-sm rounded-3xl bg-snow p-6 shadow-[var(--shadow-border)]"
    >
      <h2 className="text-xl font-semibold text-deep">Log in</h2>
      <div className="mt-5 grid gap-2">
        <Label htmlFor="admin-password">Password</Label>
        <Input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" className="mt-5 w-full" disabled={busy}>
        {busy ? "Checking..." : "Log in"}
      </Button>
    </form>
  );
}

/* ------------------------------------------------------------------ */

type Tab = "signups" | ContentType;
type AdminContent = Awaited<ReturnType<typeof adminGetContent>>;

function Dashboard({ persistent }: { persistent: boolean }) {
  const [tab, setTab] = useState<Tab>("signups");
  const [content, setContent] = useState<AdminContent | null>(null);
  const router = useRouter();

  const reload = useCallback(async () => {
    try {
      setContent(await adminGetContent());
    } catch (err) {
      toast.error(errorMessage(err));
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const afterChange = useCallback(async () => {
    await reload();
    await loadContent(true); // refresh the public pages' data too
    await router.invalidate();
  }, [reload, router]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "signups", label: "Sign-ups" },
    { id: "event", label: "Events" },
    { id: "project", label: "Projects" },
    { id: "job", label: "Jobs" },
  ];

  return (
    <div>
      {!persistent ? (
        <div className="mb-6">
          <Notice tone="warn">
            No database is connected, so changes and sign-ups can’t be saved. Add a Neon database
            to the Vercel project (it sets <code>DATABASE_URL</code>) and redeploy.
          </Notice>
        </div>
      ) : null}

      <div role="tablist" aria-label="Admin sections" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "h-11 rounded-full px-5 text-sm font-medium transition-colors",
              tab === t.id ? "bg-deep text-snow" : "bg-snow text-deep hover:bg-foam",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "signups" ? (
          <Signups />
        ) : content ? (
          <ContentManager
            key={tab}
            type={tab}
            state={content[tab]}
            onChanged={afterChange}
          />
        ) : (
          <p className="text-muted">Loading...</p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Events / projects / jobs                                            */
/* ------------------------------------------------------------------ */

function ContentManager({
  type,
  state,
  onChanged,
}: {
  type: ContentType;
  state: AdminContent[ContentType];
  onChanged: () => Promise<void>;
}) {
  const [editing, setEditing] = useState<null | { original: string | null; position: number | null }>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [slugTouched, setSlugTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const label = LABELS[type];

  const items = useMemo(
    () => state.items.map((i) => ({ ...i, data: JSON.parse(i.json) as Json })),
    [state.items],
  );

  function startNew() {
    setValues(toValues(type, null));
    setSlugTouched(false);
    setEditing({ original: null, position: null });
  }

  function startEdit(i: (typeof items)[number]) {
    setValues(toValues(type, i.data));
    setSlugTouched(true);
    setEditing({ original: i.slug, position: i.position });
  }

  function set(key: string, v: string) {
    setValues((prev) => {
      const next = { ...prev, [key]: v };
      if (key === "title" && !slugTouched) next.slug = slugify(v);
      return next;
    });
  }

  async function adopt() {
    setBusy(true);
    try {
      await adminAdopt({ data: { type } });
      toast.success("Done. You can now edit these.");
      await onChanged();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    try {
      await adminSave({
        data: {
          type,
          item: fromValues(type, values),
          originalSlug: editing.original,
          position: editing.position,
        },
      });
      toast.success("Saved.");
      setEditing(null);
      await onChanged();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function remove(slug: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This can’t be undone.`)) return;
    setBusy(true);
    try {
      await adminDelete({ data: { type, slug } });
      toast.success("Deleted.");
      await onChanged();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  if (editing) {
    return (
      <form onSubmit={save} className="rounded-3xl bg-snow p-5 shadow-[var(--shadow-border)] sm:p-8">
        <h2 className="text-xl font-semibold text-deep">
          {editing.original ? `Edit ${label.singular}` : `New ${label.singular}`}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {FIELDS[type]
            .filter((f) => !f.showIf || values[f.showIf.key] === f.showIf.value)
            .map((f) => (
            <FieldInput
              key={f.key}
              field={f}
              value={values[f.key] ?? ""}
              onChange={(v) => set(f.key, v)}
            />
          ))}
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="f-slug">Web address</Label>
            <Input
              id="f-slug"
              value={values.slug ?? ""}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", slugify(e.target.value));
              }}
              required
            />
            <p className="text-xs text-muted">
              Used in the page link. Changing it later changes the page address.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button type="submit" disabled={busy}>
            {busy ? "Saving..." : "Save"}
          </Button>
          <Button type="button" variant="outline" onClick={() => setEditing(null)}>
            Cancel
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div>
      {!state.managed ? (
        <div className="mb-6">
          <Notice>
            The website is currently showing the built-in {label.plural.toLowerCase()}. To change,
            add or remove them here, copy them into the editor first.{" "}
            <button
              onClick={adopt}
              disabled={busy}
              className="font-semibold underline underline-offset-2"
            >
              Start editing
            </button>
          </Notice>
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-deep">
          {label.plural} <span className="text-muted">({items.length})</span>
        </h2>
        {state.managed ? <Button onClick={startNew}>Add {label.singular}</Button> : null}
      </div>

      <ul className="mt-5 grid gap-3">
        {items.map((i) => (
          <li
            key={i.slug}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-snow p-4 shadow-[var(--shadow-border)]"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-deep">{String(i.data.title)}</p>
              <p className="truncate text-sm text-muted">{subline(type, i.data)}</p>
            </div>
            {state.managed ? (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(i)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={busy}
                  onClick={() => remove(i.slug, String(i.data.title))}
                >
                  Delete
                </Button>
              </div>
            ) : null}
          </li>
        ))}
        {items.length === 0 ? <li className="text-muted">Nothing here yet.</li> : null}
      </ul>
    </div>
  );
}

function subline(type: ContentType, d: Json): string {
  if (type === "event") return `${String(d.date)} · ${String(d.place)}, ${String(d.city)}`;
  if (type === "project") return `${String(d.status)} · ${String(d.place)}`;
  return `${String(d.kind)} · ${String(d.location)} · closes ${String(d.closing)}`;
}

function FieldInput({
  field: f,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = `f-${f.key}`;
  const wide = f.kind === "textarea" || f.kind === "lines" || f.kind === "image";
  return (
    <div className={cn("grid gap-2", wide && "sm:col-span-2")}>
      <Label htmlFor={id}>{f.label}</Label>
      {f.kind === "textarea" || f.kind === "lines" ? (
        <>
          <Textarea
            id={id}
            rows={f.rows ?? 4}
            value={value}
            required={f.required}
            onChange={(e) => onChange(e.target.value)}
          />
          {f.key === "gallery" ? (
            <UploadButton
              multiple
              label="Upload pictures"
              onUploaded={(urls) => onChange([value.trim(), ...urls].filter(Boolean).join("\n"))}
            />
          ) : null}
        </>
      ) : f.kind === "select" ? (
        <select
          id={id}
          value={value}
          required={f.required}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full rounded-xl bg-paper px-4 text-base text-ink shadow-[inset_0_0_0_1px_rgba(11,27,51,0.12)] outline-none focus-visible:shadow-[inset_0_0_0_2px_#007BFF]"
        >
          <option value="" disabled>
            Choose...
          </option>
          {f.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : f.kind === "image" ? (
        <>
          <Input
            id={id}
            list="known-images"
            value={value}
            required={f.required}
            placeholder="/images/hero.jpg or https://..."
            onChange={(e) => onChange(e.target.value)}
          />
          <datalist id="known-images">
            {knownImages.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
          <UploadButton label="Upload a picture" onUploaded={(urls) => onChange(urls[0])} />
          <p className="text-xs text-muted">
            Upload a picture from your device. You can also pick one of the site’s images from the list, or paste a full https:// link.
          </p>
          {value ? (
            <img
              src={value}
              alt=""
              className="mt-1 h-28 w-48 rounded-xl object-cover ring-1 ring-line"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              onLoad={(e) => ((e.currentTarget as HTMLImageElement).style.display = "block")}
            />
          ) : null}
        </>
      ) : (
        <Input
          id={id}
          type={f.kind === "date" ? "date" : f.kind === "number" ? "number" : "text"}
          {...(f.kind === "number" ? { min: 0, step: "0.01", inputMode: "decimal" as const } : {})}
          value={value}
          required={f.required}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {f.help ? <p className="text-xs text-muted">{f.help}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sign-ups dashboard                                                  */
/* ------------------------------------------------------------------ */

type Row = Awaited<ReturnType<typeof adminSubmissions>>[number];

const KIND_LABEL: Record<string, string> = {
  newsletter: "Newsletter",
  event: "Event",
  contact: "Contact",
};

function detailText(r: Row): string {
  try {
    const d = JSON.parse(r.detailsJson) as Json;
    if (r.kind === "event") {
      const paid = d.payment ? `${String(d.payment)} ${String(d.amount ?? "")}`.trim() : "";
      const parts = [String(d.event ?? ""), d.places ? `${d.places} place(s)` : "", paid, String(d.notes ?? "")];
      return parts.filter(Boolean).join(" · ");
    }
    return Object.values(d).filter(Boolean).join(" · ");
  } catch {
    return "";
  }
}

function csvCell(v: string): string {
  const safe = /^[=+\-@]/.test(v) ? `'${v}` : v; // stop spreadsheet formula injection
  return `"${safe.replace(/"/g, '""')}"`;
}

function Signups() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [filter, setFilter] = useState<"all" | "newsletter" | "event" | "contact">("all");
  const [q, setQ] = useState("");

  const load = useCallback(async () => {
    try {
      setRows(await adminSubmissions());
    } catch (err) {
      toast.error(errorMessage(err));
      setRows([]);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return (rows ?? []).filter(
      (r) =>
        (filter === "all" || r.kind === filter) &&
        (!needle ||
          `${r.name ?? ""} ${r.email} ${detailText(r)}`.toLowerCase().includes(needle)),
    );
  }, [rows, filter, q]);

  const count = (k: string) => (rows ?? []).filter((r) => r.kind === k).length;

  function exportCsv() {
    const header = ["Date", "Type", "Name", "Email", "Details"];
    const lines = shown.map((r) =>
      [new Date(r.created_at).toISOString(), KIND_LABEL[r.kind] ?? r.kind, r.name ?? "", r.email, detailText(r)]
        .map(csvCell)
        .join(","),
    );
    const blob = new Blob([[header.map(csvCell).join(","), ...lines].join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `signups-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function remove(r: Row) {
    if (!window.confirm(`Delete the entry for ${r.email}? This can’t be undone.`)) return;
    try {
      await adminDeleteSubmission({ data: { id: r.id } });
      setRows((prev) => (prev ?? []).filter((x) => x.id !== r.id));
      toast.success("Deleted.");
    } catch (err) {
      toast.error(errorMessage(err));
    }
  }

  const chips = [
    { id: "all", label: `All (${rows?.length ?? 0})` },
    { id: "newsletter", label: `Newsletter (${count("newsletter")})` },
    { id: "event", label: `Events (${count("event")})` },
    { id: "contact", label: `Contact (${count("contact")})` },
  ] as const;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              aria-pressed={filter === c.id}
              className={cn(
                "h-10 rounded-full px-4 text-sm transition-colors",
                filter === c.id ? "bg-ocean text-snow" : "bg-snow text-deep hover:bg-foam",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Input
            aria-label="Search sign-ups"
            placeholder="Search name, email..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-10 w-56"
          />
          <Button size="sm" variant="outline" onClick={exportCsv} disabled={!shown.length}>
            Download CSV
          </Button>
          <Button size="sm" variant="ghost" onClick={load}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl bg-snow shadow-[var(--shadow-border)]">
        {rows === null ? (
          <p className="p-6 text-muted">Loading...</p>
        ) : shown.length === 0 ? (
          <p className="p-6 text-muted">No sign-ups yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {shown.map((r) => (
              <li key={r.id} className="flex flex-wrap items-start justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-foam px-2.5 py-0.5 text-xs font-medium text-deep">
                      {KIND_LABEL[r.kind] ?? r.kind}
                    </span>
                    <span className="font-medium text-deep">{r.name || r.email}</span>
                  </p>
                  <p className="mt-1 break-all text-sm text-muted">
                    <a className="text-ocean underline underline-offset-2" href={`mailto:${r.email}`}>
                      {r.email}
                    </a>
                    {detailText(r) ? <> · {detailText(r)}</> : null}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {new Date(r.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => remove(r)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
