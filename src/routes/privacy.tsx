import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { GA_ID } from "@/lib/analytics";
import { pageHead } from "@/lib/seo";
import { site } from "@/lib/site-data";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () =>
    pageHead({
      title: "Privacy and cookies | connectvibeco",
      description: "How Connect eVibe Trust collects, uses and protects your personal information.",
      path: "/privacy",
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

function PrivacyPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:pt-40">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ocean">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-deep sm:text-5xl">
          Privacy and cookies
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          This notice explains what personal information {site.legalName} (“we”, “us”) collects
          through this website, why, and what your rights are.
        </p>

        <Block title="Who we are">
          <p>
            {site.legalName} is the data controller for information collected on this site.{" "}
            {site.charityLine}. You can contact us at{" "}
            <a className="text-ocean underline underline-offset-2" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </Block>

        <Block title="What we collect and why">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-ink">Contact form.</strong> Your name, email, organisation
              (optional) and message, so we can reply to your enquiry.
            </li>
            <li>
              <strong className="text-ink">Newsletter.</strong> Your email address, so we can send
              news and invitations. You can unsubscribe at any time.
            </li>
            <li>
              <strong className="text-ink">Event registration.</strong> Your name, email, number of
              places and any notes you add, so we can run the event and send you details.
            </li>
          </ul>
          <p>
            We rely on your consent for the newsletter, and on our legitimate interest in
            responding to enquiries and running our events for the other forms.
          </p>
        </Block>

        <Block title="Who we share it with">
          <p>
            We do not sell your information. We use trusted providers to run the site and deliver
            messages: our website host, a database provider that stores sign-ups, and an email
            delivery service that sends form submissions to our team.
            {GA_ID
              ? " If you accept analytics cookies, Google Analytics (Google LLC) also receives information about how you use the site."
              : ""}{" "}
            These providers process data on our behalf or under their own privacy terms.
          </p>
        </Block>

        <Block title="How long we keep it">
          <p>
            We keep personal information only for as long as we need it for the purpose it was
            collected, and delete it when it is no longer needed.
          </p>
        </Block>

        <Block title="Your rights">
          <p>
            Under UK data protection law you can ask to see, correct, delete or restrict the use of
            your information, object to how we use it, and withdraw consent at any time. Email{" "}
            <a className="text-ocean underline underline-offset-2" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            and we will respond within one month. If you are unhappy with how we handle your data,
            you can complain to the Information Commissioner’s Office at{" "}
            <a
              className="text-ocean underline underline-offset-2"
              href="https://ico.org.uk"
              target="_blank"
              rel="noreferrer"
            >
              ico.org.uk
            </a>
            .
          </p>
        </Block>

        <Block title="Cookies and similar technologies">
          {GA_ID ? (
            <>
              <p>
                This site uses the cookies and browser storage it needs to work, plus a small
                record of your choice on the cookie notice.
              </p>
              <p>
                If you click “Accept”, we also use Google Analytics 4, which sets cookies
                (such as <code>_ga</code>) to count visits and see which pages are useful. The
                information is used in aggregate to improve the site. If you decline, no analytics
                cookies are set. You can change your choice at any time using “Cookie settings”
                in the footer.
              </p>
            </>
          ) : (
            <p>
              This site uses only the cookies and browser storage it needs to work, plus a small
              record of your choice on the cookie notice. We do not currently run analytics or
              advertising cookies. If that changes, we will update this notice and switch
              non-essential tools on only if you accept them. You can change your choice at any
              time using “Cookie settings” in the footer.
            </p>
          )}
        </Block>

        <Block title="Changes to this notice">
          <p>We may update this notice from time to time. The latest version is always on this page.</p>
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