/**
 * Server-only payments layer for paid events.
 *
 * Everything the site needs from a payment provider is the small `PaymentProvider`
 * interface below. Today only the DEMO provider exists: it sends the buyer to our own
 * /checkout page, where "Pay" just marks the order as paid and takes NO money.
 *
 * To wire a real provider later (Paystack, Flutterwave, Stripe...):
 *   1. add a provider object here whose `createCheckout()` creates a hosted payment
 *      session with the provider's API and returns its URL,
 *   2. add a webhook route that verifies the provider's signature and calls
 *      `markOrderPaid(orderId, { providerRef })`,
 *   3. set PAYMENT_PROVIDER=<its id> in Vercel.
 * Nothing else (event page, admin, sign-ups) needs to change.
 */
import { randomUUID } from "node:crypto";
import { getSql } from "@/lib/db";
import { env } from "@/lib/env.server";
import { escapeHtml, isPersistent, saveSubmission, sendMail } from "@/lib/forms.server";
import { formatMoney, type Currency } from "@/lib/pricing";

export type Order = {
  id: string;
  eventSlug: string;
  eventTitle: string;
  name: string;
  email: string;
  tickets: number;
  notes: string;
  currency: Currency;
  unitAmount: number;
  totalAmount: number;
  status: "pending" | "paid";
  provider: string;
};

export type PaymentProvider = {
  id: string;
  /** Where to send the buyer so they can pay for this order. */
  createCheckout(order: Order): Promise<{ url: string }>;
};

const demoProvider: PaymentProvider = {
  id: "demo",
  async createCheckout(order) {
    return { url: `/checkout/${order.id}` };
  },
};

const providers: Record<string, PaymentProvider> = {
  demo: demoProvider,
};

export function getProvider(): PaymentProvider {
  const id = env("PAYMENT_PROVIDER") ?? "demo";
  const p = providers[id];
  if (!p) throw new Error(`Unknown PAYMENT_PROVIDER "${id}"`);
  return p;
}

type Row = {
  id: string;
  event_slug: string;
  event_title: string;
  name: string;
  email: string;
  tickets: number;
  notes: string;
  currency: string;
  unit_amount: number;
  total_amount: number;
  status: "pending" | "paid";
  provider: string;
};

const toOrder = (r: Row): Order => ({
  id: r.id,
  eventSlug: r.event_slug,
  eventTitle: r.event_title,
  name: r.name,
  email: r.email,
  tickets: r.tickets,
  notes: r.notes,
  currency: r.currency as Currency,
  unitAmount: r.unit_amount,
  totalAmount: r.total_amount,
  status: r.status,
  provider: r.provider,
});

export async function createOrder(input: {
  eventSlug: string;
  eventTitle: string;
  name: string;
  email: string;
  tickets: number;
  notes: string;
  currency: Currency;
  unitAmount: number;
}): Promise<Order> {
  if (!isPersistent()) throw new Error("Payments are not available until the database is connected");
  const sql = await getSql();
  const id = randomUUID();
  const provider = getProvider().id;
  const total = input.unitAmount * input.tickets;
  await sql`
    insert into orders (id, event_slug, event_title, name, email, tickets, notes,
                        currency, unit_amount, total_amount, provider)
    values (${id}, ${input.eventSlug}, ${input.eventTitle}, ${input.name}, ${input.email},
            ${input.tickets}, ${input.notes}, ${input.currency}, ${input.unitAmount},
            ${total}, ${provider})`;
  return {
    id,
    eventSlug: input.eventSlug,
    eventTitle: input.eventTitle,
    name: input.name,
    email: input.email,
    tickets: input.tickets,
    notes: input.notes,
    currency: input.currency,
    unitAmount: input.unitAmount,
    totalAmount: total,
    status: "pending",
    provider,
  };
}

export async function getOrder(id: string): Promise<Order | null> {
  if (!isPersistent()) return null;
  const sql = await getSql();
  const rows = await sql<Row>`select * from orders where id = ${id} limit 1`;
  return rows[0] ? toOrder(rows[0]) : null;
}

/**
 * Mark an order paid, record it in the sign-ups dashboard and email the client.
 * Safe to call twice (a webhook may retry): only the first call does anything.
 */
export async function markOrderPaid(
  id: string,
  opts: { providerRef?: string } = {},
): Promise<Order | null> {
  const sql = await getSql();
  const updated = await sql<Row>`
    update orders
       set status = 'paid', paid_at = now(), provider_ref = ${opts.providerRef ?? null}
     where id = ${id} and status = 'pending'
     returning *`;
  if (!updated[0]) return getOrder(id); // already paid, or unknown
  const order = toOrder(updated[0]);

  const demo = order.provider === "demo";
  const total = formatMoney(order.totalAmount, order.currency);
  const unit = formatMoney(order.unitAmount, order.currency);
  const paymentLabel = demo ? "Paid (DEMO, no money taken)" : "Paid";

  await saveSubmission("event", order.name, order.email, {
    event: order.eventTitle,
    slug: order.eventSlug,
    places: order.tickets,
    notes: order.notes,
    payment: paymentLabel,
    amount: total,
    currency: order.currency,
    orderId: order.id,
  }).catch((err) => console.error("[payments] could not save submission:", err));

  await sendMail({
    subject: `${paymentLabel}: ${order.eventTitle} (${order.name})`,
    text: [
      `${paymentLabel}: ticket order for ${order.eventTitle}`,
      "",
      `Name: ${order.name}`,
      `Email: ${order.email}`,
      `Places: ${order.tickets} x ${unit}`,
      `Total: ${total}`,
      `Notes: ${order.notes || "(none)"}`,
      `Order: ${order.id}`,
      ...(demo ? ["", "This was a demo checkout. No payment was taken."] : []),
    ].join("\n"),
    html: `<p><strong>${escapeHtml(paymentLabel)}: ticket order for ${escapeHtml(order.eventTitle)}</strong></p>
<ul>
<li>Name: ${escapeHtml(order.name)}</li>
<li>Email: ${escapeHtml(order.email)}</li>
<li>Places: ${order.tickets} x ${escapeHtml(unit)}</li>
<li>Total: ${escapeHtml(total)}</li>
<li>Notes: ${escapeHtml(order.notes || "(none)")}</li>
<li>Order: ${escapeHtml(order.id)}</li>
</ul>${demo ? "<p><em>This was a demo checkout. No payment was taken.</em></p>" : ""}`,
    replyTo: order.email,
  }).catch((err) => console.error("[payments] could not email the order:", err));

  return { ...order, status: "paid" };
}
