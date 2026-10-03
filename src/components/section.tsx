import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 lg:py-28", className)}>
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.22em] text-ocean",
        className,
      )}
    >
      {children}
    </p>
  );
}
