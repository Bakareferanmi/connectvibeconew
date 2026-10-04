"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Kicker, Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { culture, jobs, type JobKind } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
  head: () => ({ meta: [{ title: "Careers | connectvibeco" }] }),
});

const groups: { id: JobKind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "employed", label: "Current opportunities" },
  { id: "apprenticeship", label: "Apprenticeships" },
  { id: "volunteer", label: "Volunteers" },
];

function CareersPage() {
  const [kind, setKind] = useState<JobKind | "all">("all");
  const list = useMemo(
    () => jobs.filter((j) => (kind === "all" ? true : j.kind === kind)),
    [kind],
  );

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        kicker="Careers"
        title="Build your career while building stronger communities."
        lede="Not just vacancies. Employed roles, apprenticeships, volunteering, and a culture we will actually describe."
        image="/images/careers.jpg"
        imageAlt="A construction professional overlooking a timber building site at dusk"
        compact
        actions={
          <Button asChild variant="onDarkSolid">
            <Link to="/contact" search={{ intent: "career" }}>
              Speculative note
            </Link>
          </Button>
        }
      />

      <Section className="bg-snow">
        <Reveal>
          <Kicker>Working at Connect eVibe</Kicker>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl">
            Kind, not soft. On site, not only on slides.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {culture.map((c) => (
            <div key={c.title} className="rounded-2xl bg-paper p-6">
              <h3 className="text-lg font-semibold text-deep">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Kicker>Opportunities</Kicker>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep">
            Open seats, including the ones you grow into.
          </h2>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-2">
          {groups.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setKind(g.id)}
              className={cn(
                "h-10 rounded-full px-4 text-sm font-medium transition-[background-color,color] duration-150",
                kind === g.id
                  ? "bg-deep text-snow"
                  : "bg-snow text-deep shadow-[var(--shadow-border)] hover:bg-foam",
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
        <ul className="mt-8 divide-y divide-line rounded-3xl bg-snow shadow-[var(--shadow-border)]">
          {list.map((job) => (
            <li key={job.slug} className="p-5 sm:p-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-deep">{job.title}</h3>
                    <span className="rounded-full bg-foam px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-deep">
                      {job.type}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {job.location} · {job.team} · Closes {job.closing}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{job.summary}</p>
                  <ul className="mt-3 space-y-1">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-2 text-sm text-deep">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="shrink-0">
                  <Link to="/contact" search={{ intent: "career" }}>
                    Apply
                  </Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Don’t see the seat?"
        text="Send a note. We keep a short list and we actually open it."
        primary={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "Volunteer", href: "/get-involved" }}
      />
    </main>
  );
}
