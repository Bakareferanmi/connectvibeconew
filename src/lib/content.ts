import { createServerFn } from "@tanstack/react-start";
import { applyContent, EMPTY_CONTENT, type SiteContent } from "@/lib/content-store";

/** Public: the managed content (or nulls to keep the built-in content). */
export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteContent> => {
    const { readSiteContent } = await import("./content.server.ts");
    return readSiteContent();
  },
);

let lastLoad = 0;
let last: SiteContent | null = null;
let inflight: Promise<SiteContent> | null = null;

/**
 * Make sure the content arrays reflect the database and return the content.
 * In the browser it only re-fetches every 20 seconds (or immediately with
 * `force`, e.g. right after an admin edit). On the server there is no extra
 * delay here: `content.server.ts` has its own short cache that /admin clears on save.
 */
export async function loadContent(force = false): Promise<SiteContent> {
  const ttl = typeof window === "undefined" ? 0 : 20_000;
  if (!force && last && Date.now() - lastLoad < ttl) return last;
  inflight ??= getSiteContent()
    .then((c) => {
      applyContent(c);
      last = c;
      lastLoad = Date.now();
      return c;
    })
    .catch((err) => {
      console.error("[content] load failed:", err);
      return last ?? EMPTY_CONTENT;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}
