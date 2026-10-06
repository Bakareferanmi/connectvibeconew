import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand } from "@/components/cta-band";
import { Media } from "@/components/media";
import { PageHero } from "@/components/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { Kicker, Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { approach, site } from "@/lib/site-data";
import { copy } from "@/lib/content-store";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () =>
    pageHead({
      title: "About | connectvibeco",
      description:
        "Who Connect eVibe Trust is, how the trust is governed, and how we work with communities, public bodies, funders and partners.",
      path: "/about",
      jsonLd: breadcrumbJsonLd([{ name: "About", path: "/about" }]),
    }),
});

const values = [
  {
    title: "Trust",
    text: "We are a registered charity. The books, the briefs and the hard conversations are all on the table.",
  },
  {
    title: "Craft",
    text: "Buildings that perform. Landscapes that hold water. Programmes people actually finish.",
  },
  {
    title: "Belonging",
    text: "If the people who live there did not help write it, it is not finished.",
  },
  {
    title: "Patience",
    text: "We stay past the ribbon. Ownership, maintenance and skills are part of the work.",
  },
];

function AboutPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        kicker={copy("about-hero-kicker", "About the trust")}
        title={copy("about-hero-title", "A charity that builds, and stays.")}
        lede={`${site.legalName}. We connect people, ideas and resources so infrastructure becomes opportunity.`}
        image="/images/community-centre.jpg"
        imageAlt="A timber and brick community building with a civic square"
        compact
        actions={
          <Button asChild variant="onDarkSolid">
            <Link to="/what-we-do">What we do</Link>
          </Button>
        }
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Kicker>{copy("about-kicker-1", "Who we are")}</Kicker>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl">
              {copy(
                "about-h2-1",
                "Connect eVibe exists to make infrastructure do more than stand.",
              )}
            </h2>
          </Reveal>
          <Reveal
            delay={0.08}
            className="lg:col-span-7 space-y-5 text-base leading-relaxed text-muted"
          >
            <p>
              {copy(
                "about-p-1",
                "Too many places get a building and lose the plot. We were set up so communities can specify, deliver and then own the civic infrastructure they need, homes that hold heat, streets that hold water, rooms that hold people.",
              )}
            </p>
            <p>
              {copy(
                "about-p-2",
                "We work as a trust: independent, charitable, and stubborn about social value. Partners bring land, capital and expertise. Residents bring the brief. We hold the space between them until the work belongs locally.",
              )}
            </p>
            <p>
              {site.legalName}. {site.charityLine}. Our public name is{" "}
              <span className="font-medium text-deep">connectvibeco</span>.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-snow">
        <Reveal>
          <Kicker>{copy("about-kicker-2", "How we work")}</Kicker>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl">
            {copy("about-h2-2", "Connect · Build · Empower, then hand it over.")}
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((a) => (
            <StaggerItem key={a.key} className="rounded-2xl bg-paper p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean">
                {a.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{a.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Media
              src="/images/engineer.jpg"
              alt="An engineer on a rooftop looking toward the city"
              className="aspect-[4/3] w-full rounded-3xl"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Kicker>{copy("about-kicker-3", "Governance")}</Kicker>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep">
              {copy("about-h2-3", "Incorporated trustees, public duty.")}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              {copy(
                "about-p-3",
                "The trust is governed by incorporated trustees. We report as a charity in England and Wales, publish impact in plain language, and treat social value as a design requirement, not a paragraph in a tender.",
              )}
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-snow p-5 shadow-[var(--shadow-border)]">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ocean">
                  {copy("about-dt-1", "Registered name")}
                </dt>
                <dd className="mt-2 text-sm font-medium text-deep">{site.legalName}</dd>
              </div>
              <div className="rounded-2xl bg-snow p-5 shadow-[var(--shadow-border)]">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ocean">
                  {copy("about-dt-2", "Status")}
                </dt>
                <dd className="mt-2 text-sm font-medium text-deep">{site.charityLine}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-foam">
        <Reveal>
          <Kicker>{copy("about-kicker-4", "What we hold to")}</Kicker>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep">
            {copy("about-h2-4", "Values we hire against.")}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {values.map((v) => (
            <Reveal key={v.title}>
              <div className="rounded-2xl bg-snow p-6 shadow-[var(--shadow-border)]">
                <h3 className="text-lg font-semibold text-deep">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        kicker="Work with us"
        title="Bring a brief. Or a street."
        text="Authorities, community groups, funders and neighbours, if you have a place that needs to work harder, start here."
      />
    </main>
  );
}
