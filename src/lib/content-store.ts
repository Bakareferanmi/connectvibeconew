/**
 * Content store (client-safe).
 *
 * The site's events, projects, jobs, FAQs and social links start life as the built-in
 * data in `site-data.ts`. When the client edits them in /admin, the database copy wins:
 * `applyContent()` swaps the contents of those same arrays in place, so every page that
 * already imports them keeps working with no changes.
 *
 * Page wording works the same way, one piece of text at a time: pages call
 * `copy("about-h2-1", "original text")`, and /admin can replace any of them.
 *
 * `null` for a list means "not managed in the database, keep the built-in content".
 */
import {
  events,
  faqs,
  jobs,
  pastEvents,
  projects,
  site,
  social,
  upcomingEvents,
  type Faq,
  type Job,
  type Project,
  type SiteEvent,
} from "@/lib/site-data";

export type ContentType = "event" | "project" | "job" | "faq" | "social" | "copy";

/** A social link as edited in /admin (the public site uses `{ label, href }`). */
export type SocialItem = { slug: string; title: string; href: string };

export type SiteContent = {
  events: SiteEvent[] | null;
  projects: Project[] | null;
  jobs: Job[] | null;
  faqs: Faq[] | null;
  social: SocialItem[] | null;
  /** Edited wording, by text id. Empty when nothing has been edited. */
  copy: Record<string, string>;
};

export const EMPTY_CONTENT: SiteContent = {
  events: null,
  projects: null,
  jobs: null,
  faqs: null,
  social: null,
  copy: {},
};

/** Site-wide details that can be edited as text (footer, About, Contact, Privacy...). */
export const SITE_SLOTS = [
  { id: "site-legal-name", key: "legalName", label: "Organisation name (legal name)" },
  { id: "site-tagline", key: "tagline", label: "Tagline" },
  { id: "site-short-tag", key: "shortTag", label: "Short slogan" },
  { id: "site-description", key: "description", label: "Short description (footer and home page)" },
  { id: "site-email", key: "email", label: "Contact email" },
  { id: "site-web", key: "web", label: "Website address" },
  { id: "site-charity-line", key: "charityLine", label: "Charity registration line" },
  { id: "site-donate-url", key: "donateUrl", label: "Donate button link (https://...)" },
] as const;

type SiteKey = (typeof SITE_SLOTS)[number]["key"];

type Defaults = {
  events: SiteEvent[];
  projects: Project[];
  jobs: Job[];
  faqs: Faq[];
  socialItems: SocialItem[];
  site: Record<SiteKey, string>;
};

const g = globalThis as typeof globalThis & { __cvDefaults__?: Defaults };

const slugOf = (v: string) =>
  v
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "link";

/** Snapshot of the built-in content, taken before any database content is applied. */
export const defaults: Defaults = (g.__cvDefaults__ ??= {
  events: events.map((e) => ({ ...e })),
  projects: projects.map((p) => ({ ...p })),
  jobs: jobs.map((j) => ({ ...j })),
  faqs: faqs.map((f) => ({ ...f })),
  socialItems: social.map((s) => ({ slug: slugOf(s.label), title: s.label, href: s.href })),
  site: Object.fromEntries(
    SITE_SLOTS.map((s) => [s.key, String((site as Record<string, unknown>)[s.key] ?? "")]),
  ) as Record<SiteKey, string>,
});

/** Edited page wording, by id. Changed in place by applyContent(). */
export const copyOverrides: Record<string, string> = {};

/** The text for a slot: the edited wording if there is one, otherwise the original. */
export function copy(id: string, fallback: string): string {
  return copyOverrides[id] ?? fallback;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/** An event is "past" once its (end) date is before today. Computed, never stored. */
export function withPast(list: SiteEvent[]): SiteEvent[] {
  const today = todayISO();
  return list.map((e) => ({ ...e, past: (e.end || e.date) < today }));
}

function replace<T>(target: T[], next: T[]): void {
  target.splice(0, target.length, ...next);
}

export function applyContent(content: SiteContent): void {
  const ev = withPast(content.events ?? defaults.events);
  replace(events, ev);
  replace(projects, content.projects ?? defaults.projects);
  replace(jobs, content.jobs ?? defaults.jobs);
  replace(faqs, content.faqs ?? defaults.faqs);
  replace(
    social,
    (content.social ?? defaults.socialItems).map((s) => ({ label: s.title, href: s.href })),
  );
  replace(
    upcomingEvents,
    ev.filter((e) => !e.past).sort((a, b) => a.date.localeCompare(b.date)),
  );
  replace(
    pastEvents,
    ev.filter((e) => e.past).sort((a, b) => b.date.localeCompare(a.date)),
  );

  for (const k of Object.keys(copyOverrides)) delete copyOverrides[k];
  Object.assign(copyOverrides, content.copy ?? {});
  const mutableSite = site as unknown as Record<string, string>;
  for (const s of SITE_SLOTS) {
    mutableSite[s.key] = copyOverrides[s.id] ?? defaults.site[s.key];
  }
}
