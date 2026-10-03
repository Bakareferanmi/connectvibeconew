import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  stacked?: boolean;
  onDark?: boolean;
  showWordmark?: boolean;
};

export function LogoMark({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const ring = onDark ? "#7FD9FF" : "#007BFF";
  const bars = onDark ? "#F4F7FA" : "#002D6B";
  return (
    <svg
      viewBox="0 0 80 80"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M58.8 18.2C51.4 11.2 40.6 9.8 31.6 14.8C20.2 21.2 14.8 35.2 19.8 47.2C24.6 58.4 37.2 64.8 49.6 61.2"
        stroke={ring}
        strokeWidth="9.5"
        strokeLinecap="round"
      />
      <rect x="27.5" y="42" width="7" height="14" rx="1.6" fill={bars} />
      <rect x="36" y="34.5" width="7" height="21.5" rx="1.6" fill={bars} />
      <rect x="44.5" y="27" width="7" height="29" rx="1.6" fill={bars} />
      <path
        d="M55.2 25.8c3.2 4.6 2.8 10.6-1 14.4-4.4-1.8-8.2-5.4-9.8-10.2 3.6-3.6 7.2-5 10.8-4.2z"
        fill="#2ECC71"
      />
      <path
        d="M50.6 32.2c1.6 2.2 3.4 3.8 5.4 4.8"
        stroke="#0B1B33"
        strokeOpacity="0.18"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  stacked = false,
  onDark = false,
  showWordmark = true,
}: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        stacked ? "flex-col items-start gap-1" : "gap-2.5",
        className,
      )}
    >
      <LogoMark className={cn("size-10", markClassName)} onDark={onDark} />
      {showWordmark ? (
        <span className={cn("flex flex-col leading-none", stacked && "pl-0")}>
          <span
            className={cn(
              "font-bold tracking-[-0.04em] lowercase",
              stacked ? "text-xl" : "text-[1.05rem]",
              onDark ? "text-snow" : "text-deep",
            )}
          >
            connectvibe
            <span className={onDark ? "text-teal" : "text-ocean"}>co</span>
          </span>
          {stacked ? (
            <span
              className={cn(
                "mt-1 text-[0.58rem] font-medium uppercase tracking-[0.18em]",
                onDark ? "text-snow/70" : "text-muted",
              )}
            >
              Infrastructure · Community · Opportunity
            </span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}
