import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-36 w-full resize-y rounded-xl bg-paper px-4 py-3 text-base text-ink shadow-[inset_0_0_0_1px_rgba(11,27,51,0.12)] outline-none transition-[box-shadow] duration-150 placeholder:text-muted/80 focus-visible:shadow-[inset_0_0_0_2px_#007BFF]",
        className,
      )}
      {...props}
    />
  );
}
