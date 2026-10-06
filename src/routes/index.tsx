import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Building2, Globe2, Leaf, Users } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq";
import { Media } from "@/components/media";
import { PageHero } from "@/components/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { Kicker, Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/dates";
import { approach, pillars, projects, site, stats, stories, upcomingEvents } from "@/lib/site-data";
import { copy } from "@/lib/content-store";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Home,
  head: () =>
    pageHead({
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      path: "/",
    }),
});

const approachIcons = {
  Build: Building2,
  Connect: Users,
  Empower: Leaf,
  Sustain: Globe2,
} as const;

function Home() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        kicker={copy("home-hero-kicker", "Sustainable infrastructure · Community · Opportunity")}
        title={
          <>
            Building what
            <br />
            <span className="text-teal">communities</span> need.
          </>
        }
        lede={
          <>
            Sustainable infrastructure. Stronger communities. Better opportunities.
            <span className="mt-3 block text-snow/70">{site.description}</span>
          </>
        }
        image="/images/hero.jpg"
        imageAlt="A sustainable mixed-use neighbourhood at golden hour, with timber buildings, gardens and a city skyline beyond"
        actions={
          <>
            <Button asChild variant="onDarkSolid" size="lg">
              <Link to="/projects">
                Explore our work
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="onDark" size="lg">
              <Link to="/get-involved">Get involved</Link>
            </Button>
          </>
        }
      />

      <Section>
        <Reveal>
          <Kicker>{copy("home-kicker-1", "Our approach")}</Kicker>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-5xl">
            {copy(
              "home-h2-1",
              "Infrastructure should do more than stand. It should create opportunity.",
            )}
          </h2>
        </Reveal>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" delay={0.1}>
          {approach.map((item) => {
            const Icon = approachIcons[item.key];
            return (
              <StaggerItem
                key={item.key}
                className="rounded-2xl bg-snow p-6 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-300 ease-[var(--ease-out-smooth)] hover:-translate-y-1 hover:shadow-[var(--shadow-border-hover)]"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-foam text-ocean">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-lg font-semibold uppercase tracking-[0.14em] text-deep">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <Section className="bg-snow pt-0 lg:pt-0">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <Kicker>{copy("home-kicker-2", "What we do")}</Kicker>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl">
              {copy("home-h2-2", "Four ways we show up.")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button asChild variant="outline">
              <Link to="/what-we-do">
                See what we do
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                to="/what-we-do"
                hash={p.slug}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-paper shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-300 ease-[var(--ease-out-smooth)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Media
                    src={p.image}
                    alt=""
                    framed={false}
                    className="size-full transition-transform duration-700 ease-[var(--ease-out-smooth)] group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-deep/80 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-snow backdrop-blur-sm">
                    {p.kicker}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold text-deep">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ocean">
                    Learn more
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="relative isolate overflow-hidden bg-deep py-20 text-snow lg:py-28">
        <img
          src="/images/aerial.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-deep/80 to-deep/70" />
        <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Kicker className="text-teal">
              {copy("home-kicker-3", "Impact that can be seen")}
            </Kicker>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              {copy("home-h2-3", "Numbers we will still be proud of in ten years.")}
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-t border-snow/20 pt-6">
                <p className="text-4xl font-semibold tracking-tight text-snow sm:text-5xl">
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
          <div className="mt-10">
            <Button asChild variant="onDark">
              <Link to="/impact">
                Read the impact
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <Kicker>{copy("home-kicker-4", "Featured projects")}</Kicker>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl">
              {copy("home-h2-4", "From ideas to places people can use.")}
            </h2>
          </Reveal>
          <Button asChild variant="outline">
            <Link to="/projects">
              View all projects
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group relative isolate block overflow-hidden rounded-2xl"
              >
                <Media
                  src={p.image}
                  alt={p.title}
                  framed={false}
                  className="aspect-[16/10] w-full transition-transform duration-700 ease-[var(--ease-out-smooth)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-snow">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-teal">
                    {p.number} · {p.theme}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-sm text-snow/75">
                    {p.place} · {p.year}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-snow">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              <Media
                src="/images/skills.jpg"
                alt="Adults in a community skills workshop"
                className="h-64 w-full rounded-2xl sm:h-80"
              />
              <Media
                src="/images/housing.jpg"
                alt="Climate-resilient community housing"
                className="mt-8 h-64 w-full rounded-2xl sm:h-80"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Kicker>Community & people</Kicker>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl">
              {copy("home-h2-5", "Community at the heart of everything.")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              {copy(
                "home-p-1",
                "Programmes, volunteering, youth, women, skills and local enterprise. The building is never the whole story; the people who will run it write the brief.",
              )}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {[
                "Community programmes",
                "Volunteering",
                "Youth",
                "Women",
                "Skills",
                "Local enterprise",
              ].map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-foam px-3 py-1.5 text-sm font-medium text-deep"
                >
                  {t}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8">
              <Link to="/community">
                Join the community
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <Kicker>{copy("home-kicker-5", "Upcoming events")}</Kicker>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl">
              {copy("home-h2-6", "Rooms you can walk into.")}
            </h2>
          </Reveal>
          <Button asChild variant="outline">
            <Link to="/events">
              View all events
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {upcomingEvents.slice(0, 3).map((e, i) => (
            <Reveal key={e.slug} delay={i * 0.06}>
              <Link
                to="/events/$slug"
                params={{ slug: e.slug }}
                className="group flex h-full flex-col rounded-2xl bg-snow p-2 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-border-hover)]"
              >
                <Media src={e.image} alt="" className="aspect-[16/10] w-full rounded-xl" />
                <div className="flex flex-1 flex-col px-3 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ocean">
                    {formatDate(e.date, "d MMM yyyy")}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-deep">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted">
                    {e.city} · {e.place}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="relative isolate overflow-hidden">
        <img
          src="/images/careers.jpg"
          alt="A construction professional looking out over a timber building site at dusk"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-deep/80 to-deep/40" />
        <div className="relative mx-auto grid min-h-[28rem] max-w-[88rem] items-center px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="max-w-xl text-snow">
            <Kicker className="text-teal">{copy("home-kicker-6", "Careers")}</Kicker>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
              {copy("home-h2-7", "Build your career. Build a better future.")}
            </h2>
            <p className="mt-4 text-snow/75">
              {copy(
                "home-p-2",
                "Engineering · Project management · Community · and more. Paid roles, apprenticeships and volunteering, all of it real work.",
              )}
            </p>
            <Button asChild variant="onDarkSolid" className="mt-8">
              <Link to="/careers">
                View opportunities
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <Section className="bg-paper">
        <Reveal>
          <Kicker>Stories & updates</Kicker>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl">
            {copy("home-h2-8", "Field notes from the work.")}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-snow shadow-[var(--shadow-border)]">
                <Media src={s.image} alt="" className="aspect-[16/10] w-full" />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                    {s.place} · {s.date}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-deep">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-snow">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Kicker>{copy("home-faq-kicker", "FAQs")}</Kicker>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl">
              {copy("home-faq-title", "Questions people ask us.")}
            </h2>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/faq">See all questions</Link>
            </Button>
          </Reveal>
          <div className="lg:col-span-8">
            <FaqList limit={5} />
          </div>
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
