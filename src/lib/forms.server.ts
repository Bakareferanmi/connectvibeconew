/**
 * Server-only email helper for the website forms (newsletter, event sign-ups).
 * Uses Resend (https://resend.com). Set these environment variables in Vercel:
 *
 *   RESEND_API_KEY     your Resend API key
 *   FORMS_TO_EMAIL     where sign-ups are delivered (the client's inbox)
 *   FORMS_FROM_EMAIL   e.g. "connectvibeco <forms@yourdomain.org>" (domain verified in Resend)
 *
 * Until they are set, local development just logs the message to the terminal.
 */
import { env } from "@/lib/env.server";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Mail = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export async function sendMail({ subject, text, html, replyTo }: Mail): Promise<void> {
  const apiKey = env("RESEND_API_KEY");
  const to = env("FORMS_TO_EMAIL");
  const from = env("FORMS_FROM_EMAIL") ?? "connectvibeco <onboarding@resend.dev>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "production") {
      console.error("[forms] RESEND_API_KEY or FORMS_TO_EMAIL is not set");
      throw new Error("Email is not configured");
    }
    console.log(`\n[forms] Email not configured. Would have sent:\n${subject}\n${text}\n`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      subject,
      text,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(`[forms] Resend error ${res.status}: ${detail}`);
    throw new Error("Could not send email");
  }
}