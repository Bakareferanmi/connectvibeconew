import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

type Path =
  | "/"
  | "/about"
  | "/what-we-do"
  | "/community"
  | "/projects"
  | "/events"
  | "/impact"
  | "/careers"
  | "/contact"
  | "/get-involved";

export function CtaBand({
  kicker = "Next step",
  title = "Let's build something that lasts.",
  text = "Partner, volunteer, bring a project, or start a career with us. There is a door for every kind of yes.",
  primary = { label: "Contact us", href: "/contact" },
  secondary = { label: "Get involved", href: "/get-involved" },
}: {
  kicker?: string;
  title?: string;
  text?: string;
  primary?: { label: string; href: Path };
  secondary?: { label: string; href: Path } | null;
}) {
  return (
    <section className="relative overflow-hidden bg-deep py-20 text-snow lg:py-28">
      <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-ocean/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 size-80 rounded-full bg-teal/20 blur-3xl" />
      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">
            {kicker}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-snow/75">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="onDarkSolid" size="lg">
              <Link to={primary.href}>
                {primary.label}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            {secondary ? (
              <Button asChild variant="onDark" size="lg">
                <Link to={secondary.href}>{secondary.label}</Link>
              </Button>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
