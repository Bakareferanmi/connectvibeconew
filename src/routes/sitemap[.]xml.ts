import { createFileRoute } from "@tanstack/react-router";

/**
 * /sitemap.xml: every public page, plus each event and project, so Google (and
 * AI crawlers) find new content as soon as it is added in /admin.
 */
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { loadContent } = await import("@/lib/content");
        const { SITE_URL } = await import("@/lib/seo");
        const { events, projects } = await import("@/lib/site-data");
        await loadContent();

        const pages: { path: string; priority: string; changefreq: string }[] = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/about", priority: "0.8", changefreq: "monthly" },
          { path: "/what-we-do", priority: "0.8", changefreq: "monthly" },
          { path: "/projects", priority: "0.8", changefreq: "weekly" },
          { path: "/events", priority: "0.8", changefreq: "weekly" },
          { path: "/community", priority: "0.7", changefreq: "monthly" },
          { path: "/impact", priority: "0.7", changefreq: "monthly" },
          { path: "/get-involved", priority: "0.7", changefreq: "monthly" },
          { path: "/careers", priority: "0.6", changefreq: "weekly" },
          { path: "/faq", priority: "0.6", changefreq: "monthly" },
          { path: "/contact", priority: "0.6", changefreq: "yearly" },
          { path: "/privacy", priority: "0.2", changefreq: "yearly" },
          { path: "/terms", priority: "0.2", changefreq: "yearly" },
          { path: "/copyright", priority: "0.2", changefreq: "yearly" },
          ...projects.map((p) => ({
            path: `/projects/${p.slug}`,
            priority: "0.6",
            changefreq: "monthly",
          })),
          ...events.map((e) => ({
            path: `/events/${e.slug}`,
            priority: e.past ? "0.4" : "0.7",
            changefreq: e.past ? "yearly" : "weekly",
          })),
        ];

        const esc = (v: string) =>
          v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const body = pages
          .map(
            (p) =>
              `  <url>\n    <loc>${esc(`${SITE_URL}${p.path === "/" ? "/" : p.path}`)}</loc>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`,
          )
          .join("\n");

        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
          {
            headers: {
              "Content-Type": "application/xml; charset=utf-8",
              "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
            },
          },
        );
      },
    },
  },
});
