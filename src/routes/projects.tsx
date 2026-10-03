import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand } from "@/components/cta-band";
import { Media } from "@/components/media";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Kicker, Section } from "@/components/section";
import { projects, type ProjectStatus } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({ meta: [{ title: "Projects | connectvibeco" }] }),
});

const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  delivery: "In delivery",
  coming: "Coming soon",
};

function ProjectsPage() {
  return (
    <main>
      <PageHero
        kicker="Projects"
        title="From ideas to places people can use."
        lede="Retrofit, civic buildings, green infrastructure and neighbourhoods still on the drawing board, all of them specified with the people who will live there."
        image="/images/housing.jpg"
        imageAlt="Climate-resilient community housing with timber cladding and rain gardens"
        compact
      />

      <Section>
        <Reveal>
          <Kicker>Portfolio</Kicker>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep">
            Four places. One way of working.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group grid overflow-hidden rounded-3xl bg-snow shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] lg:grid-cols-12"
              >
                <Media
                  src={p.image}
                  alt={p.title}
                  className={cn(
                    "aspect-[16/10] w-full lg:col-span-6 lg:aspect-auto lg:h-full",
                    "transition-transform duration-700 group-hover:scale-[1.03]",
                  )}
                />
                <div className="flex flex-col justify-center p-6 lg:col-span-6 lg:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean">
                      {p.number} · {p.theme}
                    </span>
                    <span className="rounded-full bg-foam px-2.5 py-0.5 text-[0.7rem] font-medium text-deep">
                      {statusLabel[p.status]}
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-deep sm:text-3xl">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    {p.place} · {p.year}
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{p.summary}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Have a community project?"
        text="Bring us a street, a building, a group. We'll tell you honestly if we can help."
        primary={{ label: "Start a conversation", href: "/contact" }}
      />
    </main>
  );
}
