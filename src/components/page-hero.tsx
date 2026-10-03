"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  image: string;
  imageAlt: string;
  actions?: ReactNode;
  compact?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function PageHero({
  kicker,
  title,
  lede,
  image,
  imageAlt,
  actions,
  compact,
}: PageHeroProps) {
  const reduce = useReducedMotion();
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-deep text-snow",
        compact ? "min-h-[70vh]" : "min-h-[88vh]",
      )}
    >
      <img
        src={image}
        alt={imageAlt}
        className={cn(
          "absolute inset-0 size-full object-cover",
          !reduce && "hero-kenburns",
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-deep/78 to-deep/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/20" />
      <div className="noise-overlay" />

      <div
        className={cn(
          "relative mx-auto flex max-w-[88rem] flex-col justify-end px-4 sm:px-6 lg:px-8",
          compact ? "min-h-[70vh] pb-16 pt-32" : "min-h-[88vh] pb-20 pt-36 lg:pb-24",
        )}
      >
        <motion.div
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
          }}
          className="max-w-3xl"
        >
          {kicker ? (
            <motion.p
              variants={item(reduce)}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal"
            >
              {kicker}
            </motion.p>
          ) : null}
          <motion.h1
            variants={item(reduce)}
            className="text-4xl font-semibold tracking-[-0.035em] text-snow sm:text-5xl lg:text-6xl lg:leading-[1.05]"
          >
            {title}
          </motion.h1>
          {lede ? (
            <motion.p
              variants={item(reduce)}
              className="mt-6 max-w-xl text-base leading-relaxed text-snow/80 sm:text-lg"
            >
              {lede}
            </motion.p>
          ) : null}
          {actions ? (
            <motion.div variants={item(reduce)} className="mt-8 flex flex-wrap gap-3">
              {actions}
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

function item(reduce: boolean | null) {
  return {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 16, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease },
    },
  };
}
