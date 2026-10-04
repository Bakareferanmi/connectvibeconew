import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { ContentType } from "@/lib/content-store";

const typeSchema = z.enum(["event", "project", "job"]);

/** Is the admin area set up, and is this visitor logged in? */
export const adminSession = createServerFn({ method: "GET" }).handler(async () => {
  const a = await import("./admin.server.ts");
  return {
    configured: !!a.adminPassword(),
    authed: await a.isAdmin(),
    persistent: a.isPersistent(),
  };
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ password: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const a = await import("./admin.server.ts");
    return { result: await a.login(data.password) };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const a = await import("./admin.server.ts");
  a.logout();
  return { ok: true as const };
});

export const adminGetContent = createServerFn({ method: "GET" }).handler(async () => {
  const a = await import("./admin.server.ts");
  await a.requireAdmin();
  return a.getAdminContent();
});

export const adminAdopt = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ type: typeSchema }).parse(d))
  .handler(async ({ data }) => {
    const a = await import("./admin.server.ts");
    await a.requireAdmin();
    await a.adoptDefaults(data.type as ContentType);
    return { ok: true as const };
  });

export const adminSave = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z
      .object({
        type: typeSchema,
        item: z.record(z.string(), z.unknown()),
        originalSlug: z.string().nullable(),
        position: z.number().nullable(),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const a = await import("./admin.server.ts");
    await a.requireAdmin();
    await a.saveItem(data.type as ContentType, data.item, data.originalSlug, data.position);
    return { ok: true as const };
  });

export const adminDelete = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ type: typeSchema, slug: z.string().min(1) }).parse(d))
  .handler(async ({ data }) => {
    const a = await import("./admin.server.ts");
    await a.requireAdmin();
    await a.deleteItem(data.type as ContentType, data.slug);
    return { ok: true as const };
  });

export const adminSubmissions = createServerFn({ method: "GET" }).handler(async () => {
  const a = await import("./admin.server.ts");
  await a.requireAdmin();
  return a.listSubmissions();
});

export const adminDeleteSubmission = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ id: z.number().int() }).parse(d))
  .handler(async ({ data }) => {
    const a = await import("./admin.server.ts");
    await a.requireAdmin();
    await a.deleteSubmission(data.id);
    return { ok: true as const };
  });
