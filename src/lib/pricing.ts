/** Ticket pricing helpers (client-safe, shared by the pages and the server). */
import type { SiteEvent } from "@/lib/site-data";

export const CURRENCIES = [
  { code: "NGN", label: "Naira (₦)", locale: "en-NG" },
  { code: "GBP", label: "Pounds (£)", locale: "en-GB" },
  { code: "USD", label: "US dollars ($)", locale: "en-US" },
] as const;

export type Currency = (typeof CURRENCIES)[number]["code"];

export const isCurrency = (v: unknown): v is Currency =>
  CURRENCIES.some((c) => c.code === v);

/** Prices are stored in major units (25.50); payments always use minor units (2550). */
export const toMinor = (major: number): number => Math.round(major * 100);

/** Format an amount given in minor units, e.g. formatMoney(2550, "GBP") -> "£25.50". */
export function formatMoney(minor: number, currency: Currency): string {
  const locale = CURRENCIES.find((c) => c.code === currency)?.locale ?? "en-GB";
  const major = minor / 100;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(major) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(major);
}

export type EventPrice = { minor: number; currency: Currency };

/** The ticket price of an event, or null when it is free. */
export function eventPrice(e: Pick<SiteEvent, "pricing" | "price" | "currency">): EventPrice | null {
  if (e.pricing !== "paid" || !e.price || e.price <= 0 || !isCurrency(e.currency)) return null;
  return { minor: toMinor(e.price), currency: e.currency };
}

export function priceLabel(e: Pick<SiteEvent, "pricing" | "price" | "currency">): string {
  const p = eventPrice(e);
  return p ? formatMoney(p.minor, p.currency) : "Free";
}
