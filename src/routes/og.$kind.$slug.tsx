import { createFileRoute } from "@tanstack/react-router";

/**
 * /og/event/<slug> and /og/project/<slug>: the share image shown when a link is
 * pasted into WhatsApp, LinkedIn, X, Facebook, etc. Falls back to the main
 * /og.jpg if anything goes wrong, so a share card is never broken.
 */
export const Route = createFileRoute("/og/$kind/$slug")({
  server: {
    handlers: {
      GET: async ({ request, params }: { request: Request; params: { kind: string; slug: string } }) => {
        const origin = new URL(request.url).origin;
        const fallback = () => Response.redirect(`${origin}/og.jpg`, 302);
        try {
          const { loadContent } = await import("@/lib/content");
          const { getEvent, getProject } = await import("@/lib/site-data");
          const { buildShareImage } = await import("@/lib/og-image.server");
          await loadContent();

          let input: Parameters<typeof buildShareImage>[0] | null = null;
          if (params.kind === "event") {
            const e = getEvent(params.slug);
            if (e) {
              const when = new Date(`${e.date}T00:00:00Z`).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              });
              input = {
                kicker: `${e.past ? "Past event" : "Upcoming"} · ${e.kind}`,
                title: e.title,
                meta: `${when} · ${e.place}, ${e.city}`,
                photoUrl: e.image.startsWith("http") ? e.image : `${origin}${e.image}`,
              };
            }
          } else if (params.kind === "project") {
            const p = getProject(params.slug);
            if (p) {
              input = {
                kicker: `Project ${p.number} · ${p.theme}`,
                title: p.title,
                meta: `${p.place} · ${p.year}`,
                photoUrl: p.image.startsWith("http") ? p.image : `${origin}${p.image}`,
              };
            }
          }
          if (!input) return fallback();

          const jpg = await buildShareImage(input);
          return new Response(new Uint8Array(jpg), {
            headers: {
              "Content-Type": "image/jpeg",
              "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
            },
          });
        } catch (err) {
          console.error("[og] could not build share image:", err);
          return fallback();
        }
      },
    },
  },
});
