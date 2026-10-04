"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CtaBand } from "@/components/cta-band";
import { Media } from "@/components/media";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Kicker, Section } from "@/components/section";
import { formatDate } from "@/lib/dates";
import { eventPrice, priceLabel } from "@/lib/pricing";
import { eventKinds, events, pastEvents, type EventKind } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { copy } from "@/lib/content-store";

export const Route = createFileRoute("/events")({
  component: EventsPage,
  head: () => ({ meta: [{ title: "Events | connectvibeco" }] }),
});

function EventsPage() {
  const [kind, setKind] = useState<EventKind | "all">("all");

  const upcoming = useMemo(
    () =>
      events
        .filter((e) => !e.past)
        .filter((e) => (kind === "all" ? true : e.kind === kind))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [kind],
  );

  const past = useMemo(
    () => pastEvents.filter((e) => (kind === "all" ? true : e.kind === kind)),
    [kind],
  );

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        kicker={copy("events-hero-kicker", "Events")}
        title={copy("events-hero-title", "A calendar you can actually use.")}
        lede={copy(
          "events-hero-lede",
          "Workshops, training, fundraising, conferences, project launches, and the days we look back on.",
        )}
        image="/images/greenway.jpg"
        imageAlt="A greenway path through restored parkland"
        compact
      />

      <Section>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Kicker>{copy("events-kicker-1", "Upcoming")}</Kicker>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep">
              {copy("events-h2-1", "Come as you are.")}
            </h2>
          </Reveal>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Event type">
            {eventKinds.map((k) => (
              <button
                key={k.id}
                type="button"
                role="tab"
                aria-selected={kind === k.id}
                onClick={() => setKind(k.id)}
                className={cn(
                  "h-10 rounded-full px-4 text-sm font-medium transition-[background-color,color] duration-150",
                  kind === k.id
                    ? "bg-deep text-snow"
                    : "bg-snow text-deep shadow-[var(--shadow-border)] hover:bg-foam",
                )}
              >
                {k.label}
              </button>
            ))}
          </div>
        </div>

        {upcoming.length === 0 ? (
          <p className="mt-10 text-muted">
            {copy("events-p-1", "Nothing in this category just now. Try another filter.")}
          </p>
        ) : (
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {upcoming.map((e) => (
              <Link
                key={e.slug}
                to="/events/$slug"
                params={{ slug: e.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-snow shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-border-hover)]"
              >
                <Media
                  src={e.image}
                  alt=""
                  className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ocean">
                    {formatDate(e.date)} · {e.kind}
                    {eventPrice(e) ? ` · ${priceLabel(e)}` : ""}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-deep">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted">
                    {e.city} · {e.place}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{e.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>

      <Section className="bg-snow">
        <Reveal>
          <Kicker>{copy("events-kicker-2", "Past events")}</Kicker>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep">
            {copy("events-h2-2", "Days that already happened, with pictures.")}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {past.map((e) => (
            <article
              key={e.slug}
              className="overflow-hidden rounded-2xl bg-paper shadow-[var(--shadow-border)]"
            >
              <Link to="/events/$slug" params={{ slug: e.slug }} className="block">
                <Media src={e.image} alt={e.title} className="aspect-[16/10] w-full" />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ocean">
                    {formatDate(e.date)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-deep">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted">{e.summary}</p>
                </div>
              </Link>
              {e.gallery ? (
                <div className="grid grid-cols-3 gap-1 px-2 pb-2">
                  {e.gallery.map((g) => (
                    <Media key={g} src={g} alt="" className="aspect-square w-full rounded-lg" />
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Bring a room, or fill one."
        text="Host with us, sponsor a training day, or simply come."
        primary={{ label: "Get involved", href: "/get-involved" }}
        secondary={{ label: "Contact", href: "/contact" }}
      />
    </main>
  );
}
