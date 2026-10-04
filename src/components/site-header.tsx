"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight, Heart } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { nav, site } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Light bar only when scrolled AND menu is closed. While the menu is open the header goes dark.
  const solid = scrolled && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
          open
            ? "bg-deep"
            : solid
              ? "bg-snow/90 shadow-[0_1px_0_rgba(11,27,51,0.06)] backdrop-blur-md"
              : "bg-gradient-to-b from-navy/80 via-navy/35 to-transparent",
        )}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[88rem] items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link
            to="/"
            className="relative z-10 shrink-0"
            aria-label="connectvibeco home"
            onClick={() => setOpen(false)}
          >
            <Logo onDark={!solid} markClassName="size-9 lg:size-10" />
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 text-[0.8125rem] font-medium tracking-tight transition-[color,background-color] duration-200",
                    solid
                      ? active
                        ? "bg-foam text-deep"
                        : "text-deep/75 hover:bg-foam hover:text-deep"
                      : active
                        ? "bg-snow/12 text-snow"
                        : "text-snow/80 hover:bg-snow/10 hover:text-snow",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {site.donateUrl ? (
              <Button asChild size="sm" variant="teal" className="hidden md:inline-flex">
                <a href={site.donateUrl} target="_blank" rel="noreferrer">
                  <Heart className="size-4" aria-hidden="true" />
                  Donate
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            ) : null}
            <Button
              asChild
              size="sm"
              variant={solid ? "primary" : "onDarkSolid"}
              className="hidden lg:inline-flex"
            >
              <Link to="/get-involved">
                Get involved
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <button
              type="button"
              className={cn(
                "relative z-10 inline-flex size-11 items-center justify-center rounded-full xl:hidden",
                solid ? "text-deep hover:bg-foam" : "text-snow hover:bg-snow/10",
              )}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative size-5">
                <span
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
                    open ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]",
                  )}
                >
                  <X className="size-5" />
                </span>
                <span
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
                    open ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none",
                  )}
                >
                  <Menu className="size-5" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay lives OUTSIDE <header> so backdrop-blur can't trap it inside the header bar */}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-deep xl:hidden"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-dvh flex-col px-6 pb-10 pt-24">
              <nav
                className="flex flex-1 flex-col gap-1 overflow-y-auto"
                aria-label="Mobile"
              >
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={
                        pathname === item.href || pathname.startsWith(`${item.href}/`)
                          ? "page"
                          : undefined
                      }
                      className="block py-3 text-3xl font-semibold tracking-tight text-snow"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="grid gap-3">
                {site.donateUrl ? (
                  <Button asChild variant="teal" size="lg" className="w-full">
                    <a href={site.donateUrl} target="_blank" rel="noreferrer">
                      <Heart className="size-5" aria-hidden="true" />
                      Donate
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </Button>
                ) : null}
                <Button asChild variant="onDarkSolid" size="lg" className="w-full">
                  <Link to="/get-involved" onClick={() => setOpen(false)}>
                    Get involved
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}