import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/site-data";

/** Frequently asked questions. Plain <details> so it works without JavaScript and with a keyboard. */
export function FaqList({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  if (items.length === 0) return null;
  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl bg-snow shadow-[var(--shadow-border)]">
      {items.map((f) => (
        <details key={f.slug} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-deep outline-none transition-colors hover:bg-foam focus-visible:bg-foam sm:px-7 sm:text-lg [&::-webkit-details-marker]:hidden">
            {f.title}
            <ChevronDown
              className="size-5 shrink-0 text-ocean transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="px-5 pb-6 text-base leading-relaxed text-muted sm:px-7">{f.body}</p>
        </details>
      ))}
    </div>
  );
}
