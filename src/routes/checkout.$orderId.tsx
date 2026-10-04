import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCheckoutOrder, payDemoOrder } from "@/lib/payments";

export const Route = createFileRoute("/checkout/$orderId")({
  component: CheckoutPage,
  loader: async ({ params }) => ({ order: await getCheckoutOrder({ data: { id: params.orderId } }) }),
  head: () => ({
    meta: [{ title: "Checkout | connectvibeco" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

function CheckoutPage() {
  const { order } = Route.useLoaderData();
  const [paid, setPaid] = useState(order?.status === "paid");
  const [busy, setBusy] = useState(false);

  if (!order) {
    return (
      <Shell>
        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-deep">Order not found</h1>
        <p className="mt-4 text-muted">
          This checkout link isn’t valid any more. You can start again from the event page.
        </p>
        <Button asChild className="mt-6">
          <Link to="/events">See events</Link>
        </Button>
      </Shell>
    );
  }

  async function onPay(e: FormEvent) {
    e.preventDefault();
    if (busy || !order) return;
    setBusy(true);
    try {
      await new Promise((r) => setTimeout(r, 900)); // pretend to talk to a bank
      await payDemoOrder({ data: { id: order.id } });
      setPaid(true);
    } catch {
      toast.error("Sorry, that didn’t go through. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (paid) {
    return (
      <Shell>
        <div role="status">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean">
            {order.demo ? "Demo payment complete" : "Payment complete"}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep">
            Your place is booked.
          </h1>
          <p className="mt-4 text-muted">
            Thank you, {order.name}. We’ve booked {order.tickets}{" "}
            {order.tickets === 1 ? "place" : "places"} for {order.eventTitle} and will email{" "}
            {order.email} with the details.
          </p>
          {order.demo ? (
            <p className="mt-4 rounded-2xl bg-foam p-4 text-sm text-deep">
              This was a demo checkout. No money was taken.
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/events/$slug" params={{ slug: order.eventSlug }}>
                Back to the event
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/events">All events</Link>
            </Button>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      {order.demo ? (
        <p
          role="note"
          className="mb-6 rounded-2xl bg-deep px-4 py-3 text-sm font-medium text-snow"
        >
          Demo checkout. No money is taken and no real card is needed.
        </p>
      ) : null}
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean">Checkout</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep">
        Pay for your place
      </h1>

      <dl className="mt-6 divide-y divide-line rounded-2xl bg-paper px-5 shadow-[var(--shadow-border)]">
        <Row label="Event" value={order.eventTitle} />
        <Row label="Booked by" value={`${order.name} (${order.email})`} />
        <Row
          label="Places"
          value={`${order.tickets} × ${order.unit}`}
        />
        <Row label="Total" value={order.total} strong />
      </dl>

      <form onSubmit={onPay} className="mt-8 grid gap-5">
        <p className="text-sm text-muted">
          {order.demo
            ? "Test card details are filled in for you. Please don’t type a real card number here."
            : "Enter your card details."}
        </p>
        <div className="grid gap-2">
          <Label htmlFor="card-name">Name on card</Label>
          <Input id="card-name" defaultValue={order.name} autoComplete="off" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="card-number">Card number</Label>
          <Input
            id="card-number"
            defaultValue="4242 4242 4242 4242"
            inputMode="numeric"
            autoComplete="off"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="grid gap-2">
            <Label htmlFor="card-exp">Expiry</Label>
            <Input id="card-exp" defaultValue="12 / 34" autoComplete="off" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="card-cvc">CVC</Label>
            <Input id="card-cvc" defaultValue="123" inputMode="numeric" autoComplete="off" />
          </div>
        </div>
        <Button type="submit" size="lg" disabled={busy}>
          {busy ? "Processing..." : `Pay ${order.total}`}
        </Button>
      </form>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <div className="mx-auto max-w-xl px-4 pb-24 pt-32 sm:px-6 lg:pt-40">
        <div className="rounded-3xl bg-snow p-6 shadow-[var(--shadow-border)] sm:p-8">
          {children}
        </div>
      </div>
    </main>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className={strong ? "text-lg font-semibold text-deep" : "text-right text-deep"}>
        {value}
      </dd>
    </div>
  );
}
