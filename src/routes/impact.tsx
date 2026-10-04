import { createFileRoute, Link } from "@tanstack/react-router";
import { CountUp } from "@/components/count-up";
import { CtaBand } from "@/components/cta-band";
import { Media } from "@/components/media";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Kicker, Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { projects, stats } from "@/lib/site-data";

export const Route = createFileRoute("/impact")({
  component: ImpactPage,
  head: () => ({ meta: [{ title: "Impact | connectvibeco" }] }),
});

const measures = [
  {
    title: "Carbon & comfort",
    text: "Space-heat demand, bill reduction, and whether the house is actually warm. We meter, we do not guess.",
  },
  {
    title: "Local wealth",
    text: "Pounds kept in the neighbourhood: labour, suppliers, community energy yield, avoided leakage.",
  },
  {
    title: "Skills & work",
    text: "Training hours, apprentices who complete, job offers made on the back of live sites.",
  },
  {
    title: "Belonging",
    text: "Do people say the place feels like theirs? We ask, in rooms and on doorsteps, every year.",
  },
];

function ImpactPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        kicker="Impact"
        title="Impact that can be seen."
        lede="Communities reached, projects delivered, people engaged, social value created, counted in public."
        image="/images/aerial.jpg"
        imageAlt="Aerial view of a neighbourhood with rooftop solar"
        compact
      />

      <section className="bg-deep py-16 text-snow lg:py-20">
        <div className="mx-auto grid max-w-[88rem] grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="border-t border-snow/20 pt-6">
              <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
                <CountUp
                  value={s.value}
                  prefix={"prefix" in s ? s.prefix : ""}
                  suffix={s.suffix}
                  decimals={"decimals" in s ? s.decimals : 0}
                  pad={"pad" in s ? s.pad : undefined}
                />
              </p>
              <p className="mt-2 text-sm text-snow/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Section>
        <Reveal>
          <Kicker>How we count</Kicker>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl">
            Social value is a design requirement, not a report at the end.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {measures.map((m) => (
            <div key={m.title} className="rounded-2xl bg-snow p-6 shadow-[var(--shadow-border)]">
              <h3 className="text-lg font-semibold text-deep">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-snow">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Media
              src="/images/solar.jpg"
              alt="A solar farm in rolling countryside"
              className="aspect-[4/3] w-full rounded-3xl"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Kicker>This year</Kicker>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep">
              A snapshot, not a victory lap.
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
              <li>
                <span className="font-medium text-deep">Riverside Retrofit</span>: 42 homes in
                delivery, 12 technician apprentices, a community energy vehicle ready for first
                generation.
              </li>
              <li>
                <span className="font-medium text-deep">Oak Hub</span>: brief written in six
                resident workshops; community land trust in place for ownership.
              </li>
              <li>
                <span className="font-medium text-deep">North Greenway</span>: rain gardens held a
                1-in-30 storm; the school field stayed dry.
              </li>
            </ul>
            <Button asChild className="mt-8" variant="outline">
              <Link to="/projects">Read the projects</Link>
            </Button>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <Kicker>Places behind the numbers</Kicker>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-2xl"
            >
              <Media
                src={p.image}
                alt={p.title}
                className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
              />
              <p className="mt-2 text-sm font-medium text-deep">{p.title}</p>
              <p className="text-xs text-muted">{p.place}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Help us move the numbers."
        text="Partner, fund, volunteer, or bring the next street."
      />
    </main>
  );
}
