import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { NotFound } from "@/components/not-found";
import { SiteShell } from "@/components/site-shell";
import { loadContent } from "@/lib/content";
import { applyContent } from "@/lib/content-store";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, shareMeta } from "@/lib/seo";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  // Load events / projects / jobs (database copy if the client has edited them).
  loader: async () => ({ content: await loadContent() }),
  staleTime: 30_000,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#002D6B" },
      ...shareMeta({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, path: "/" }),
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootDocument,
});

function RootDocument() {
  // Also applied here so the browser has the same content after hydration.
  const { content } = Route.useLoaderData();
  applyContent(content);

  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <SiteShell>
          <Outlet />
        </SiteShell>
        <Scripts />
      </body>
    </html>
  );
}
