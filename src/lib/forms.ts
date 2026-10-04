import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { loadContent } from "@/lib/content";
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

/**
 * Keep a copy in the database (sign-ups dashboard) AND email the client.
 * It only fails if neither worked, so a sign-up is never silently lost.
 */
async function record(args: {
  kind: "newsletter" | "event";
  name: string | null;
  email: string;
  details: Record<string, unknown>;
  mail: { subject: string; text: string; html: string };
}): Promise<void> {
  const { saveSubmission, sendMail } = await import("./forms.server.ts");
  const [stored, mailed] = await Promise.all([
    saveSubmission(args.kind, args.name, args.email, args.details).catch((err) => {
      console.error("[forms] could not save submission:", err);
      return false;
    }),
    sendMail({ ...args.mail, replyTo: args.email }).then(
      () => true,
      () => false,
    ),
  ]);
  if (!stored && !mailed) throw new Error("Could not record your submission");
}

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
