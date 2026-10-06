import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Media } from "@/components/media";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Kicker, Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pillars } from "@/lib/site-data";
import { copy } from "@/lib/content-store";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/what-we-do")({
  component: WhatWeDoPage,
  head: () =>
    pageHead({
      title: "What we do | connectvibeco",
      description:
        "Sustainable infrastructure, community assets, social development and social value: the four practices of Connect eVibe Trust.",
      path: "/what-we-do",
      jsonLd: breadcrumbJsonLd([{ name: "What we do", path: "/what-we-do" }]),
    }),
});

function WhatWeDoPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        kicker={copy("what-we-do-hero-kicker", "What we do")}
        title={copy("what-we-do-hero-title", "Build. Connect. Empower. Sustain.")}
        lede={copy(
          "what-we-do-hero-lede",
          "Four practices, one trust. Sustainable infrastructure, community assets, social development and measurable social value.",
        )}
        image="/images/solar.jpg"
        imageAlt="Rows of solar panels in green countryside"
        compact
      />

      {pillars.map((p, i) => (
        <section
          id={p.slug}
          key={p.slug}
          className={cn("scroll-mt-24 py-20 lg:py-28", i % 2 === 1 ? "bg-snow" : "bg-paper")}
        >
          <div className="mx-auto grid max-w-[88rem] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : undefined}>
              <Media src={p.image} alt={p.title} className="aspect-[4/3] w-full rounded-3xl" />
            </Reveal>
            <Reveal delay={0.08}>
              <Kicker>
                {p.kicker} · {p.title}
              </Kicker>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl">
                {p.summary}
              </h2>
              <p className="mt-5 leading-relaxed text-muted">{p.body}</p>
              <ul className="mt-6 space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-sm text-deep">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" />
                    {pt}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ))}

      <Section className="bg-snow">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker>{copy("what-we-do-kicker-1", "From brief to belonging")}</Kicker>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep">
            {copy("what-we-do-h2-1", "A simple sequence. Held carefully.")}
          </h2>
        </Reveal>
        <ol className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {[
            { n: "01", t: "Listen", d: "Resident workshops, data, and a walk of the street." },
            { n: "02", t: "Specify", d: "A brief the community can defend, cost, carbon, jobs." },
            { n: "03", t: "Deliver", d: "Local labour, trainees on site, neighbours as clients." },
            {
              n: "04",
              t: "Belong",
              d: "Ownership, maintenance, and skills that stay when we leave.",
            },
          ].map((s) => (
            <li key={s.n} className="rounded-2xl bg-paper p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-ocean">{s.n}</p>
              <h3 className="mt-2 text-xl font-semibold text-deep">{s.t}</h3>
              <p className="mt-2 text-sm text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <Button asChild>
            <Link to="/projects">
              See it on the ground
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
