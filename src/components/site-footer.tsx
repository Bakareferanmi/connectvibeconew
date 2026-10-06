import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { COOKIE_SETTINGS_EVENT } from "@/components/cookie-notice";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { socialIconFor } from "@/components/social-icons";
import { Button } from "@/components/ui/button";
import { nav, site, social } from "@/lib/site-data";

const groups = [
  {
    title: "The trust",
    links: [
      { label: "About", href: "/about" },
      { label: "What we do", href: "/what-we-do" },
      { label: "Impact", href: "/impact" },
      { label: "Careers", href: "/careers" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    title: "In community",
    links: [
      { label: "Community", href: "/community" },
      { label: "Projects", href: "/projects" },
      { label: "Events", href: "/events" },
      { label: "Get involved", href: "/get-involved" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-navy text-snow">
      <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo onDark stacked markClassName="size-12" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-snow/70">
              {site.description} {site.shortTag}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block text-sm font-medium text-teal link-underline"
            >
              {site.email}
            </a>
            {site.donateUrl ? (
              <div className="mt-6">
                <Button asChild variant="teal">
                  <a href={site.donateUrl} target="_blank" rel="noreferrer">
                    <Heart className="size-4" aria-hidden="true" />
                    Donate
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
              </div>
            ) : null}
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>
          {groups.map((group) => (
            <div key={group.title} className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="text-sm text-snow/75 transition-colors duration-150 hover:text-snow"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Follow</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {social.map((s) => {
                const Icon = socialIconFor(s.label, s.href);
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${s.label} (opens in a new tab)`}
                      title={s.label}
                      className="group inline-flex size-11 items-center justify-center rounded-full border border-snow/15 bg-snow/5 text-snow/80 transition-[background-color,color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-teal hover:bg-teal hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 text-xs leading-relaxed text-snow/65">
              {site.legalName}
              <br />
              {site.charityLine}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-snow/10 pt-6 text-xs text-snow/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {nav.slice(0, 3).map((n) => (
              <Link key={n.href} to={n.href} className="hover:text-snow">
                {n.label}
              </Link>
            ))}
            <Link to="/contact" className="hover:text-snow">
              Contact
            </Link>
            <Link to="/privacy" className="hover:text-snow">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-snow">
              Terms
            </Link>
            <Link to="/copyright" className="hover:text-snow">
              Copyright
            </Link>
            <button
              type="button"
              className="hover:text-snow"
              onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
            >
              Cookie settings
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-snow/65">
          Built with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by{" "}
          <a
            href="https://beepeelabs.cv"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-teal link-underline"
          >
            BeepeeLabs
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
