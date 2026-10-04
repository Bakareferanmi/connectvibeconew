/** Server-only: read the managed content from the database. */
import { getSql } from "@/lib/db";
import type { SiteContent } from "@/lib/content-store";
import type { Job, Project, SiteEvent } from "@/lib/site-data";

const TTL_MS = 15_000;
let cache: { at: number; value: SiteContent } | null = null;

export function clearContentCache(): void {
  cache = null;
}

const EMPTY: SiteContent = { events: null, projects: null, jobs: null };

export async function readSiteContent(): Promise<SiteContent> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.value;
  try {
    const sql = await getSql();
    const meta = await sql<{ type: string }>`select type from content_meta`;
    if (meta.length === 0) {
      cache = { at: Date.now(), value: EMPTY };
      return EMPTY;
    }
    const managed = new Set(meta.map((m) => m.type));
    const rows = await sql<{ type: string; slug: string; data: Record<string, unknown> }>`
      select type, slug, data from content_items order by position asc, updated_at asc`;
    const pick = <T>(type: string): T[] | null =>
      managed.has(type)
        ? rows.filter((r) => r.type === type).map((r) => ({ ...r.data, slug: r.slug }) as T)
        : null;
    const value: SiteContent = {
      events: pick<SiteEvent>("event"),
      projects: pick<Project>("project"),
      jobs: pick<Job>("job"),
    };
    cache = { at: Date.now(), value };
    return value;
  } catch (err) {
    // If the database is unreachable, keep the site up with the built-in content.
    console.error("[content] could not read content, using built-in content:", err);
    return EMPTY;
  }
}
