/** Server-only: read the managed content from the database. */
import { getSql } from "@/lib/db";
import { EMPTY_CONTENT, type SiteContent, type SocialItem } from "@/lib/content-store";
import type { Faq, Job, Project, SiteEvent } from "@/lib/site-data";

const TTL_MS = 15_000;
let cache: { at: number; value: SiteContent } | null = null;

export function clearContentCache(): void {
  cache = null;
}

export async function readSiteContent(): Promise<SiteContent> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.value;
  try {
    const sql = await getSql();
    const meta = await sql<{ type: string }>`select type from content_meta`;
    const managed = new Set(meta.map((m) => m.type));
    const rows = await sql<{ type: string; slug: string; data: Record<string, unknown> }>`
      select type, slug, data from content_items order by position asc, updated_at asc`;
    const pick = <T>(type: string): T[] | null =>
      managed.has(type)
        ? rows.filter((r) => r.type === type).map((r) => ({ ...r.data, slug: r.slug }) as T)
        : null;
    // Edited wording is an overlay: every row counts, no "start editing" step.
    const copy: Record<string, string> = {};
    for (const r of rows) {
      if (r.type === "copy" && typeof r.data.text === "string") copy[r.slug] = r.data.text;
    }
    const value: SiteContent = {
      events: pick<SiteEvent>("event"),
      projects: pick<Project>("project"),
      jobs: pick<Job>("job"),
      faqs: pick<Faq>("faq"),
      social: pick<SocialItem>("social"),
      copy,
    };
    cache = { at: Date.now(), value };
    return value;
  } catch (err) {
    // If the database is unreachable, keep the site up with the built-in content.
    console.error("[content] could not read content, using built-in content:", err);
    return EMPTY_CONTENT;
  }
}
