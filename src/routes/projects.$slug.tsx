import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Media } from "@/components/media";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { getProject, projects } from "@/lib/site-data";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetailPage,
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.project.title ?? "Project"} — connectvibeco` }],
  }),
});

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <main>
      <PageHero
        kicker={`${project.number} · ${project.theme} · ${project.place}`}
        title={project.title}
        lede={project.summary}
        image={project.image}
        imageAlt={project.title}
        compact
        actions={
          <Button asChild variant="onDark">
            <Link to="/projects">
              <ArrowLeft className="size-4" />
              All projects
            </Link>
          </Button>
        }
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-muted">{project.body}</p>
            <p className="mt-6 text-sm font-medium text-deep">Programme {project.year}</p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <ul className="space-y-3 rounded-2xl bg-snow p-6 shadow-[var(--shadow-border)]">
              {project.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-sm text-deep">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-snow pt-0 lg:pt-0">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-ocean">
          More projects
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-2xl bg-paper"
            >
              <Media
                src={p.image}
                alt={p.title}
                className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-muted">{p.place}</p>
                <h3 className="mt-1 font-semibold text-deep">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
