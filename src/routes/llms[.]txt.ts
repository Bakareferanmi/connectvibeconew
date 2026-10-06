import { createFileRoute } from "@tanstack/react-router";

/**
 * /llms.txt: a short, plain-text guide to the site for AI assistants (the
 * llmstxt.org convention). Built from the same content as the site, so events,
 * projects and FAQs edited in /admin appear here automatically.
 */
export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const { loadContent } = await import("@/lib/content");
        const { SITE_URL } = await import("@/lib/seo");
        const { events, faqs, projects, site, social } = await import("@/lib/site-data");
        await loadContent();

        // Keep each description on one line so the list stays easy to parse.
        const one = (v: string) => v.replace(/\s+/g, " ").trim();
        const at = (path: string) => `${SITE_URL}${path}`;
        const item = (title: string, path: string, note?: string) =>
          `- [${title}](${at(path)})${note ? `: ${one(note)}` : ""}`;

        const text = [
          `# ${site.legalName} (${site.name})`,
          "",
          `> ${one(site.description)} ${site.charityLine}.`,
          "",
          `${site.legalName} is a charity that works with communities, public bodies, funders and partners on sustainable infrastructure, community assets, social development and measurable social value. Contact: ${site.email}.`,
          "",
          "## Main pages",
          item("Home", "/", "What we do and why it matters"),
          item("About", "/about", "Who we are and how the trust is governed"),
          item("What we do", "/what-we-do", "Our four practices"),
          item("Impact", "/impact", "Results and social value, counted in public"),
          item("Community", "/community", "Community programmes and volunteering"),
          item("Get involved", "/get-involved", "Volunteer, partner, fundraise or donate"),
          item("Careers", "/careers", "Jobs, apprenticeships and volunteer roles"),
          item("Contact", "/contact", "How to reach us"),
          item("FAQs", "/faq", "Common questions answered"),
          "",
          "## Projects",
          ...projects.map((p) => item(p.title, `/projects/${p.slug}`, `${p.place}. ${p.summary}`)),
          "",
          "## Events",
          ...events.map((e) =>
            item(e.title, `/events/${e.slug}`, `${e.date}, ${e.place}, ${e.city}. ${e.summary}`),
          ),
          "",
          "## Frequently asked questions",
          ...faqs.map((f) => item(f.title, "/faq", f.body)),
          "",
          "## Follow us",
          ...social.map((s) => `- [${s.label}](${s.href})`),
          "",
          "## Policies",
          item("Privacy and cookies", "/privacy"),
          item("Terms and conditions", "/terms"),
          item("Copyright notice", "/copyright"),
          "",
        ].join("\n");

        return new Response(text, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
