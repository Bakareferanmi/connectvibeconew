import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl bg-paper px-4 text-base text-ink shadow-[inset_0_0_0_1px_rgba(11,27,51,0.12)] outline-none transition-[box-shadow] duration-150 placeholder:text-muted/80 focus-visible:shadow-[inset_0_0_0_2px_#007BFF]",
        className,
      )}
      {...props}
    />
  );
}
