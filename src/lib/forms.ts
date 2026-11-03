import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { loadContent } from "@/lib/content";
import { eventPrice } from "@/lib/pricing";
import { getEvent } from "@/lib/site-data";

/** Hidden "company" field: real people leave it empty, bots fill it in. */
const honeypot = z.string().max(200).optional();

const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(200),
  company: honeypot,
});

const eventSchema = z.object({
  slug: z.string().trim().min(1).max(120),
  name: z.string().trim().min(1, "Please add your name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  guests: z.coerce.number().int().min(1).max(6),
  notes: z.string().trim().max(1000).optional(),
  company: honeypot,
});

export type FormResult = { ok: true };

/** Retain a database copy after Pentreeform has accepted a submission. */
async function record(args: {
  kind: "newsletter" | "event" | "contact";
  name: string | null;
  email: string;
  details: Record<string, unknown>;
}): Promise<void> {
  const { saveSubmission } = await import("./forms.server.ts");
  try {
    await saveSubmission(args.kind, args.name, args.email, args.details);
  } catch (err) {
    console.error("[forms] could not save database copy:", err);
  }
}

const contactSchema = z.object({
  pathway: z.enum(["general", "partner", "support", "volunteer", "project", "career"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  organisation: z.string().trim().max(200),
  message: z.string().trim().min(1).max(5000),
  website: honeypot,
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }): Promise<FormResult> => {
    if (data.website) throw new Error("Please leave the website field empty and try again.");
    await record({
      kind: "contact",
      name: data.name,
      email: data.email,
      details: { pathway: data.pathway, organisation: data.organisation, message: data.message },
    });
    return { ok: true };
  });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => newsletterSchema.parse(data))
  .handler(async ({ data }): Promise<FormResult> => {
    if (data.company) return { ok: true }; // bot: pretend it worked
    await record({
      kind: "newsletter",
      name: null,
      email: data.email,
      details: {},
    });
    return { ok: true };
  });

/** Confirm the event is currently open and free before asking Pentreeform to save it. */
export const validateFreeEvent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => eventSchema.parse(data))
  .handler(async ({ data }): Promise<{ title: string; date: string; place: string }> => {
    if (data.company) throw new Error("Could not register");
    await loadContent();
    const event = getEvent(data.slug);
    if (!event || event.past) throw new Error("This event is not open for registration");
    if (eventPrice(event)) throw new Error("This event needs a ticket. Please use the booking form");
    return { title: event.title, date: event.date, place: `${event.place}, ${event.city}` };
  });

export const registerForEvent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => eventSchema.parse(data))
  .handler(async ({ data }): Promise<FormResult> => {
    if (data.company) return { ok: true };
    await loadContent(); // the event may have been added in /admin
    const event = getEvent(data.slug);
    if (!event || event.past) throw new Error("This event is not open for registration");
    if (eventPrice(event)) throw new Error("This event needs a ticket. Please use the booking form");
    await record({
      kind: "event",
      name: data.name,
      email: data.email,
      details: {
        event: event.title,
        slug: event.slug,
        date: event.date,
        places: data.guests,
        notes: data.notes || "",
      },
    });
    return { ok: true };
  });
