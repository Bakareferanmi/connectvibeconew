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

/** Deliver to Formspree and retain a database copy when storage is available. */
async function record(args: {
  kind: "newsletter" | "event" | "contact";
  name: string | null;
  email: string;
  details: Record<string, unknown>;
  mail: { subject: string; text: string; html: string };
}): Promise<void> {
  const { saveSubmission, sendToFormspree } = await import("./forms.server.ts");
  await sendToFormspree({
    _subject: args.mail.subject,
    form_type: args.kind,
    name: args.name ?? "",
    email: args.email,
    ...args.details,
  });
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
  company: honeypot,
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }): Promise<FormResult> => {
    if (data.company) return { ok: true };
    await record({
      kind: "contact",
      name: data.name,
      email: data.email,
      details: { pathway: data.pathway, organisation: data.organisation, message: data.message },
      mail: { subject: `New ${data.pathway} enquiry`, text: data.message, html: "" },
    });
    return { ok: true };
  });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => newsletterSchema.parse(data))
  .handler(async ({ data }): Promise<FormResult> => {
    if (data.company) return { ok: true }; // bot: pretend it worked
    const { escapeHtml } = await import("./forms.server.ts");
    await record({
      kind: "newsletter",
      name: null,
      email: data.email,
      details: {},
      mail: {
        subject: "New newsletter sign-up",
        text: `New newsletter sign-up\n\nEmail: ${data.email}`,
        html: `<p><strong>New newsletter sign-up</strong></p><p>Email: ${escapeHtml(data.email)}</p>`,
      },
    });
    return { ok: true };
  });

export const registerForEvent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => eventSchema.parse(data))
  .handler(async ({ data }): Promise<FormResult> => {
    if (data.company) return { ok: true };
    await loadContent(); // the event may have been added in /admin
    const event = getEvent(data.slug);
    if (!event || event.past) throw new Error("This event is not open for registration");
    if (eventPrice(event)) throw new Error("This event needs a ticket. Please use the booking form");
    const { escapeHtml } = await import("./forms.server.ts");
    const notes = data.notes || "(none)";
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
      mail: {
        subject: `Event registration: ${event.title} (${data.name})`,
        text: [
          `New registration for ${event.title}`,
          `Date: ${event.date}`,
          `Place: ${event.place}, ${event.city}`,
          "",
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Places needed: ${data.guests}`,
          `Notes: ${notes}`,
        ].join("\n"),
        html: `<p><strong>New registration for ${escapeHtml(event.title)}</strong></p>
<p>${escapeHtml(event.date)} · ${escapeHtml(event.place)}, ${escapeHtml(event.city)}</p>
<ul>
<li>Name: ${escapeHtml(data.name)}</li>
<li>Email: ${escapeHtml(data.email)}</li>
<li>Places needed: ${data.guests}</li>
<li>Notes: ${escapeHtml(notes)}</li>
</ul>`,
      },
    });
    return { ok: true };
  });
