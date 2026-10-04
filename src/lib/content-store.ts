/**
 * Content store (client-safe).
 *
 * The site's events, projects and jobs start life as the built-in arrays in
 * `site-data.ts`. When the client edits them in /admin, the database copy wins:
 * `applyContent()` swaps the contents of those same arrays in place, so every
 * page that already imports `events`, `projects`, `jobs`, `upcomingEvents` or
 * `pastEvents` keeps working with no changes.
 *
 * `null` for a type means "not managed in the database, keep the built-in content".
 */
import {
  events,
  jobs,
  pastEvents,
  projects,
  upcomingEvents,
  type Job,
  type Project,
  type SiteEvent,
} from "@/lib/site-data";

export type ContentType = "event" | "project" | "job";

export type SiteContent = {
  events: SiteEvent[] | null;
  projects: Project[] | null;
  jobs: Job[] | null;
};

type Defaults = { events: SiteEvent[]; projects: Project[]; jobs: Job[] };

const g = globalThis as typeof globalThis & { __cvDefaults__?: Defaults };

/** Snapshot of the built-in content, taken before any database content is applied. */
export const defaults: Defaults = (g.__cvDefaults__ ??= {
  events: events.map((e) => ({ ...e })),
  projects: projects.map((p) => ({ ...p })),
  jobs: jobs.map((j) => ({ ...j })),
});

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
  replace(
    upcomingEvents,
    ev.filter((e) => !e.past).sort((a, b) => a.date.localeCompare(b.date)),
  );
  replace(
    pastEvents,
    ev.filter((e) => e.past).sort((a, b) => b.date.localeCompare(a.date)),
  );
}
