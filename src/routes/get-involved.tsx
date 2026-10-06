import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Handshake, Heart, Landmark, Sprout, Users } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Media } from "@/components/media";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Kicker, Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { volunteerRoles } from "@/lib/site-data";
import { copy } from "@/lib/content-store";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/get-involved")({
  component: GetInvolvedPage,
  head: () =>
    pageHead({
      title: "Get involved | connectvibeco",
      description:
        "Volunteer, partner, fundraise or donate. Find the way to get involved with Connect eVibe Trust that suits you.",
      path: "/get-involved",
      jsonLd: breadcrumbJsonLd([{ name: "Get involved", path: "/get-involved" }]),
    }),
});

const doors = [
  {
    icon: Handshake,
    title: "Partner",
    text: "Authorities, housing providers, colleges, contractors, community trusts. Bring land, capital or a brief.",
    href: "/contact",
    intent: "partner" as const,
  },
  {
    icon: Landmark,
    title: "Support a project",
    text: "Gifts, grants, community shares, or a skill you can lend to a live street.",
    href: "/contact",
    intent: "support" as const,
  },
  {
    icon: Heart,
    title: "Volunteer",
    text: "Open days, planting, mentoring, events. A few hours that compound.",
    href: "/contact",
    intent: "volunteer" as const,
  },
  {
    icon: Sprout,
    title: "Bring a community project",
    text: "A street, a building, a group. We’ll tell you honestly if we can help.",
    href: "/contact",
    intent: "project" as const,
  },
  {
    icon: Briefcase,
    title: "Build a career here",
    text: "Roles, apprenticeships and a speculative note we’ll actually read.",
    href: "/careers",
    intent: undefined,
  },
  {
    icon: Users,
    title: "Come to an event",
    text: "Workshops, launches, the winter assembly. The rooms are open.",
    href: "/events",
    intent: undefined,
  },
];

function GetInvolvedPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        kicker={copy("get-involved-hero-kicker", "Get involved")}
        title={copy("get-involved-hero-title", "There is a door for every kind of yes.")}
        lede={copy(
          "get-involved-hero-lede",
          "Partner, fund, volunteer, bring a project, start a career, or simply come to the next open day.",
        )}
        image="/images/hero.jpg"
        imageAlt="A sustainable neighbourhood at golden hour"
        compact
      />

      <Section>
        <Reveal>
          <Kicker>{copy("get-involved-kicker-1", "Choose a door")}</Kicker>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl">
            {copy("get-involved-h2-1", "Real solutions. Lasting impact. You in the room.")}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {doors.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.05}>
              <DoorCard door={d} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-snow">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Media
              src="/images/skills.jpg"
              alt="Skills workshop"
              className="aspect-[4/3] w-full rounded-3xl"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Kicker>{copy("get-involved-kicker-2", "Volunteer roles")}</Kicker>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep">
              {copy("get-involved-h2-2", "The work is physical, social, and occasionally muddy.")}
            </h2>
            <ul className="mt-6 space-y-4">
              {volunteerRoles.map((r) => (
                <li key={r.title}>
                  <p className="font-semibold text-deep">{r.title}</p>
                  <p className="text-sm text-muted">{r.text}</p>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8">
              <Link to="/contact" search={{ intent: "volunteer" }}>
                Volunteer with us
              </Link>
            </Button>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="If you’re not sure which door, pick general."
        text="We’ll route you. Better a conversation than a perfect form."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={null}
      />
    </main>
  );
}

function DoorCard({ door }: { door: (typeof doors)[number] }) {
  const Icon = door.icon;
  const body = (
    <>
      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-foam text-ocean">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-deep">{door.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{door.text}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-ocean">
        Continue
        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </>
  );
  const className =
    "group flex h-full flex-col rounded-2xl bg-snow p-6 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]";

  if (door.intent) {
    return (
      <Link to="/contact" search={{ intent: door.intent }} className={className}>
        {body}
      </Link>
    );
  }

  if (door.href === "/careers") {
    return (
      <Link to="/careers" className={className}>
        {body}
      </Link>
    );
  }

  return (
    <Link to="/events" className={className}>
      {body}
    </Link>
  );
}
