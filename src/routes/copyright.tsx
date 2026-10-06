import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";
import { site } from "@/lib/site-data";

export const Route = createFileRoute("/copyright")({
  component: CopyrightPage,
  head: () =>
    pageHead({
      title: "Copyright notice | connectvibeco",
      description:
        "Copyright and permitted use of the content on the Connect eVibe Trust website, and how to contact us about reuse or a concern.",
      path: "/copyright",
      jsonLd: breadcrumbJsonLd([{ name: "Copyright notice", path: "/copyright" }]),
    }),
});

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-deep">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

const link = "text-ocean underline underline-offset-2";

function CopyrightPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:pt-40">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ocean">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-deep sm:text-5xl">
          Copyright notice
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>

        <Block title="What is protected">
          <p>
            Unless it says otherwise, the text, graphics, logos, layout, photographs and other
            material on this website belong to {site.legalName} or are used with permission from
            their owners, and are protected by copyright and other intellectual property laws. The
            names and logos shown on the site, including “{site.name}”, are our marks.
          </p>
        </Block>

        <Block title="What you may do">
          <ul className="list-disc space-y-2 pl-5">
            <li>View the site and print or download single pages for your own personal use.</li>
            <li>
              Share links to our pages and quote short extracts with a clear credit to{" "}
              {site.legalName} and a link back to the page.
            </li>
            <li>
              Use our share images and press material to report on our work or promote our events,
              as long as you do not change them or suggest we endorse something we do not.
            </li>
          </ul>
        </Block>

        <Block title="What you may not do without our written permission">
          <ul className="list-disc space-y-2 pl-5">
            <li>Copy, republish, sell or distribute the site content, in whole or in part.</li>
            <li>Use our name, logo or images in a way that suggests a connection with us.</li>
            <li>Remove copyright or credit notices from anything on the site.</li>
          </ul>
        </Block>

        <Block title="Third-party material">
          <p>
            Some photographs, icons or other material may belong to third parties and are used under
            licence or with permission. Their rights stay with their owners. Brand names and logos
            of social networks and other services shown on the site belong to those companies.
          </p>
        </Block>

        <Block title="Reuse requests and concerns">
          <p>
            To ask to reuse something, or if you believe material on this site infringes your
            rights, email{" "}
            <a className={link} href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            with the page address, what you are asking about and, for a concern, how you own the
            rights. We will look into it promptly.
          </p>
          <p>
            See also our{" "}
            <Link to="/terms" className={link}>
              terms and conditions
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className={link}>
              privacy notice
            </Link>
            .
          </p>
        </Block>

        <p className="mt-12">
          <Link to="/" className="text-sm font-medium text-ocean underline underline-offset-2">
            Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
