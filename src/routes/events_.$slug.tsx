import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { EventRegisterForm } from "@/components/event-register-form";
import { Media } from "@/components/media";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { loadContent } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { eventPrice, priceLabel } from "@/lib/pricing";
import { shareMeta } from "@/lib/seo";
import { getEvent } from "@/lib/site-data";

export const Route = createFileRoute("/events_/$slug")({
  component: EventDetailPage,
  loader: async ({ params }) => {
    await loadContent(); // events may have been added or edited in /admin
    const event = getEvent(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    const e = loaderData?.event;
    if (!e) return { meta: [{ title: "Event | connectvibeco" }] };
    return {
      meta: shareMeta({
        title: `${e.title} | connectvibeco`,
        description: e.summary,
        path: `/events/${e.slug}`,
        image: `/og/event/${e.slug}`,
        imageAlt: e.title,
      }),
    };
  },
});

function EventDetailPage() {
  const { event } = Route.useLoaderData();
  const price = eventPrice(event);

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        kicker={`${event.past ? "Past event" : "Upcoming"} · ${event.kind}`}
        title={event.title}
        lede={`${formatDate(event.date)} · ${event.place}, ${event.city} · ${priceLabel(event)}`}
        image={event.image}
        imageAlt={event.title}
        compact
        actions={
          <>
            <Button asChild variant="onDark">
              <Link to="/events">
                <ArrowLeft className="size-4" />
                All events
              </Link>
            </Button>
            {!event.past ? (
              <Button asChild variant="onDarkSolid">
                <a href="#register">{price ? "Book a place" : "Register"}</a>
              </Button>
            ) : null}
          </>
        }
      />

      <Section>
        <Reveal className="max-w-2xl">
          <p className="text-lg leading-relaxed text-muted">{event.body}</p>
        </Reveal>
        {event.gallery ? (
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {event.gallery.map((g) => (
              <Media key={g} src={g} alt="" className="aspect-[4/3] w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="mt-12">
            <Media
              src={event.image}
              alt={event.title}
              className="aspect-[21/9] w-full rounded-3xl"
            />
          </div>
        )}
      </Section>

      {!event.past ? (
        <Section>
          <div id="register" className="mx-auto max-w-2xl scroll-mt-28">
            <EventRegisterForm slug={event.slug} title={event.title} price={price} />
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </main>
  );
}