import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Media } from "@/components/media";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Kicker, Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { communityProgrammes, stories, volunteerRoles } from "@/lib/site-data";
import { copy } from "@/lib/content-store";

export const Route = createFileRoute("/community")({
  component: CommunityPage,
  head: () => ({ meta: [{ title: "Community | connectvibeco" }] }),
});

function CommunityPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        kicker={copy("community-hero-kicker", "Community")}
        title={copy("community-hero-title", "More than a programme page.")}
        lede={copy(
          "community-hero-lede",
          "Initiatives, volunteering, local partnerships, youth, skills and the stories that prove the work is human.",
        )}
        image="/images/skills.jpg"
        imageAlt="People in a bright community skills classroom"
        compact
        actions={
          <>
            <Button asChild variant="onDarkSolid">
              <Link to="/contact" search={{ intent: "volunteer" }}>
                Volunteer
              </Link>
            </Button>
            <Button asChild variant="onDark">
              <Link to="/get-involved">Get involved</Link>
            </Button>
          </>
        }
      />

      <Section>
        <Reveal>
          <Kicker>{copy("community-kicker-1", "Programmes")}</Kicker>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl">
            {copy("community-h2-1", "People places prosperity, in that order.")}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {communityProgrammes.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="grid overflow-hidden rounded-2xl bg-snow shadow-[var(--shadow-border)] sm:grid-cols-5">
                <Media
                  src={p.image}
                  alt=""
                  className="aspect-[4/3] w-full sm:col-span-2 sm:aspect-auto sm:h-full"
                />
                <div className="sm:col-span-3 p-6">
                  <h3 className="text-xl font-semibold text-deep">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-snow">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Kicker>{copy("community-kicker-2", "Volunteering")}</Kicker>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep">
              {copy("community-h2-2", "A few hours that compound.")}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              {copy(
                "community-p-1",
                "Open days, planting, mentoring, events. We train, we feed you, we do not waste your time. Under-18s are welcome with an accompanying adult on family days.",
              )}
            </p>
            <Button asChild className="mt-8">
              <Link to="/contact" search={{ intent: "volunteer" }}>
                Offer your time
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {volunteerRoles.map((r) => (
              <div key={r.title} className="rounded-2xl bg-paper p-5">
                <h3 className="font-semibold text-deep">{r.title}</h3>
                <p className="mt-2 text-sm text-muted">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <Reveal>
          <Kicker>{copy("community-kicker-3", "Partnerships")}</Kicker>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl">
            {copy(
              "community-h2-3",
              "Local authorities, housing providers, colleges, clinics, and the group that already meets in the hall.",
            )}
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            {copy(
              "community-p-2",
              "We do not land in a neighbourhood and invent a network. We join the one that exists, then add capital, design and delivery muscle. If you are already doing the work, we would rather sit beside you than in front of you.",
            )}
          </p>
          <Button asChild variant="outline" className="mt-8">
            <Link to="/contact" search={{ intent: "partner" }}>
              Talk partnerships
            </Link>
          </Button>
        </Reveal>
      </Section>

      <Section className="bg-foam">
        <Reveal>
          <Kicker>{copy("community-kicker-4", "Community stories")}</Kicker>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep">
            {copy("community-h2-4", "What it felt like, not just what we counted.")}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {stories.map((s) => (
            <article
              key={s.slug}
              className="overflow-hidden rounded-2xl bg-snow shadow-[var(--shadow-border)]"
            >
              <Media src={s.image} alt="" className="aspect-[16/10] w-full" />
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  {s.place} · {s.date}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-deep">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Join the community."
        text="Volunteer, bring a project, or simply come to the next open day."
        primary={{ label: "Get involved", href: "/get-involved" }}
        secondary={{ label: "See events", href: "/events" }}
      />
    </main>
  );
}
