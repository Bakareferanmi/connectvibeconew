import { createFileRoute } from "@tanstack/react-router";

/**
 * /robots.txt: search engines and AI assistants (ChatGPT, Claude, Perplexity,
 * Gemini...) may read the public site; the admin area and checkout are off limits.
 * The crawler list lives in src/lib/seo.ts.
 */
export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const { AI_CRAWLERS, DISALLOWED_PATHS, SITE_URL } = await import("@/lib/seo");
        const rules = (agent: string) =>
          [
            `User-agent: ${agent}`,
            "Allow: /",
            ...DISALLOWED_PATHS.map((p) => `Disallow: ${p}`),
          ].join("\n");

        const text = [
          "# connectvibeco: search engines and AI assistants are welcome.",
          `# A plain-language summary of the site for AI is at ${SITE_URL}/llms.txt`,
          "",
          rules("*"),
          "",
          ...AI_CRAWLERS.map((bot) => `${rules(bot)}\n`),
          `Sitemap: ${SITE_URL}/sitemap.xml`,
          "",
        ].join("\n");

        return new Response(text, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});
