import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Media } from "@/components/media";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/dates";
import { getEvent } from "@/lib/site-data";

export const Route = createFileRoute("/events/$slug")({
  component: EventDetailPage,
  loader: ({ params }) => {
    const event = getEvent(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.event.title ?? "Event"} | connectvibeco` }],
  }),
});

function EventDetailPage() {
  const { event } = Route.useLoaderData();

  return (
    <main>
      <PageHero
        kicker={`${event.past ? "Past event" : "Upcoming"} · ${event.kind}`}
        title={event.title}
        lede={`${formatDate(event.date)} · ${event.place}, ${event.city}`}
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
                <Link to="/contact" search={{ intent: "general" }}>
                  Register interest
                </Link>
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

      <CtaBand />
    </main>
  );
}
