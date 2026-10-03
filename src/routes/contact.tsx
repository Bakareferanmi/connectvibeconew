import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { site, social } from "@/lib/site-data";

type ContactSearch = {
  intent?: string;
};

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    intent: typeof search.intent === "string" ? search.intent : undefined,
  }),
  head: () => ({ meta: [{ title: "Contact | connectvibeco" }] }),
});

function ContactPage() {
  const { intent } = Route.useSearch();

  return (
    <main>
      <PageHero
        kicker="Contact"
        title="Six doors. One team."
        lede="Partner, support a project, volunteer, bring a community brief, ask about a career, or just say hello."
        image="/images/community-centre.jpg"
        imageAlt="A civic community building and public square"
        compact
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2 className="text-2xl font-semibold tracking-tight text-deep">
              {site.legalName}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{site.charityLine}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block text-base font-medium text-ocean"
            >
              {site.email}
            </a>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-ocean">
              Also
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/get-involved" className="text-deep hover:text-ocean">
                  Get involved
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-deep hover:text-ocean">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-deep hover:text-ocean">
                  Events
                </Link>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center rounded-full bg-snow px-3.5 text-sm font-medium text-deep shadow-[var(--shadow-border)] hover:bg-foam"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>
          <div className="lg:col-span-8">
            <ContactForm initialIntent={intent} />
          </div>
        </div>
      </Section>
    </main>
  );
}
