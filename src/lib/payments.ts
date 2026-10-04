import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { loadContent } from "@/lib/content";
import { eventPrice, formatMoney, type Currency } from "@/lib/pricing";
import { getEvent } from "@/lib/site-data";

const checkoutSchema = z.object({
  slug: z.string().trim().min(1).max(120),
  name: z.string().trim().min(1, "Please add your name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  guests: z.coerce.number().int().min(1).max(6),
  notes: z.string().trim().max(1000).optional(),
  company: z.string().max(200).optional(),
});

/** Create an order for a paid event and return where the buyer should go to pay. */
export const startCheckout = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => checkoutSchema.parse(data))
  .handler(async ({ data }): Promise<{ url: string }> => {
    if (data.company) throw new Error("Could not start checkout"); // bot
    await loadContent(); // the event may have been added in /admin
    const event = getEvent(data.slug);
    if (!event || event.past) throw new Error("This event is not open for booking");
    // The price always comes from the event on the server, never from the browser.
    const price = eventPrice(event);
    if (!price) throw new Error("This event is free. Use the free registration instead");
    const { createOrder, getProvider } = await import("./payments.server.ts");
    const order = await createOrder({
      eventSlug: event.slug,
      eventTitle: event.title,
      name: data.name,
      email: data.email,
      tickets: data.guests,
      notes: data.notes ?? "",
      currency: price.currency,
      unitAmount: price.minor,
    });
    return getProvider().createCheckout(order);
  });

export type CheckoutOrder = {
  id: string;
  status: "pending" | "paid";
  eventTitle: string;
  eventSlug: string;
  name: string;
  email: string;
  tickets: number;
  currency: Currency;
  unit: string;
  total: string;
  demo: boolean;
};

const idSchema = z.object({ id: z.string().trim().min(10).max(60) });

export const getCheckoutOrder = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data }): Promise<CheckoutOrder | null> => {
    const { getOrder } = await import("./payments.server.ts");
    const o = await getOrder(data.id);
    if (!o) return null;
    return {
      id: o.id,
      status: o.status,
      eventTitle: o.eventTitle,
      eventSlug: o.eventSlug,
      name: o.name,
      email: o.email,
      tickets: o.tickets,
      currency: o.currency,
      unit: formatMoney(o.unitAmount, o.currency),
      total: formatMoney(o.totalAmount, o.currency),
      demo: o.provider === "demo",
    };
  });

/** DEMO checkout only: marks the order paid without taking any money. */
export const payDemoOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data }): Promise<{ ok: true }> => {
    const { getOrder, markOrderPaid } = await import("./payments.server.ts");
    const order = await getOrder(data.id);
    if (!order) throw new Error("Order not found");
    if (order.provider !== "demo") throw new Error("This order is not a demo order");
    await markOrderPaid(order.id);
    return { ok: true };
  });
