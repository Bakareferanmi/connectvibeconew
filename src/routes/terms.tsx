import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";
import { site } from "@/lib/site-data";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () =>
    pageHead({
      title: "Terms and conditions | connectvibeco",
      description:
        "The terms that apply when you use the Connect eVibe Trust website, register for events or send us enquiries.",
      path: "/terms",
      jsonLd: breadcrumbJsonLd([{ name: "Terms and conditions", path: "/terms" }]),
    }),
});

const LAST_UPDATED = "6 October 2026";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-deep">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

const link = "text-ocean underline underline-offset-2";

function TermsPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:pt-40">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ocean">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-deep sm:text-5xl">
          Terms and conditions
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: {LAST_UPDATED}</p>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          These terms apply to your use of this website, which is run by {site.legalName} (“we”,
          “us”). By using the site you agree to them. If you do not agree, please do not use it.
        </p>

        <Block title="About us">
          <p>
            {site.legalName}. {site.charityLine}. You can reach us at{" "}
            <a className={link} href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            or through our{" "}
            <Link to="/contact" className={link}>
              contact page
            </Link>
            .
          </p>
        </Block>

        <Block title="Using this website">
          <p>
            You may use the site for lawful purposes only. You must not misuse it, for example by
            trying to gain unauthorised access, introducing malicious code, sending spam through our
            forms, or collecting data from the site by automated means in a way that disrupts it.
          </p>
          <p>
            We work to keep the information accurate and up to date, but it is provided for general
            information and we do not guarantee that it is complete or error free. We may change or
            remove content, or suspend the site, at any time without notice.
          </p>
        </Block>

        <Block title="Events and registrations">
          <p>
            Registering for an event through the site is a request for a place and is subject to
            availability. For paid events, the price shown at checkout is the price you pay, in the
            currency shown. Once your payment is confirmed we will send you the event details by
            email.
          </p>
          <p>
            Event details such as dates, venues and speakers may change. If we cancel an event, we
            will tell you as soon as we can and refund anything you paid for it. Refunds for other
            reasons are at our discretion unless the law says otherwise; please email us as early as
            possible if you cannot attend. Nothing in these terms affects your statutory rights.
          </p>
        </Block>

        <Block title="Donations">
          <p>
            Donations are made through our payment partner and are governed by their terms as well
            as these. We use donations to deliver our charitable work. Please contact us if you
            think a donation was made in error.
          </p>
        </Block>

        <Block title="Your messages and sign-ups">
          <p>
            When you send us a message, join the newsletter or register for an event, you must give
            accurate information and must not submit anything unlawful, offensive or that belongs to
            someone else. We handle your personal information as described in our{" "}
            <Link to="/privacy" className={link}>
              privacy notice
            </Link>
            .
          </p>
        </Block>

        <Block title="Intellectual property">
          <p>
            The content of this site, including text, logos, design and images we own, is protected
            by copyright and other rights. See our{" "}
            <Link to="/copyright" className={link}>
              copyright notice
            </Link>{" "}
            for what you may and may not do with it.
          </p>
        </Block>

        <Block title="Links to other sites">
          <p>
            The site may link to websites and social media pages run by others. We do not control
            them and are not responsible for their content or privacy practices.
          </p>
        </Block>

        <Block title="Our responsibility to you">
          <p>
            We are not liable for loss or damage that was not reasonably foreseeable, for business
            losses, or for problems caused by things outside our control, such as interruptions to
            the internet or to our hosting providers. Nothing in these terms limits our liability
            for death or personal injury caused by negligence, for fraud, or for anything else that
            cannot be limited by law.
          </p>
        </Block>

        <Block title="Changes and governing law">
          <p>
            We may update these terms from time to time. The version on this page is the one that
            applies, and the date at the top shows when it last changed. These terms are governed by
            the law of England and Wales, and the courts of England and Wales have jurisdiction,
            although if you live elsewhere in the UK you may also bring a claim in your local
            courts.
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
