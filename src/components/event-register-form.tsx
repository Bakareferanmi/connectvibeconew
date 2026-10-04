"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { registerForEvent } from "@/lib/forms";

export function EventRegisterForm({ slug, title }: { slug: string; title: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("1");
  const [notes, setNotes] = useState("");
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      await registerForEvent({
        data: { slug, name, email, guests: Number(guests), notes, company },
      });
      setDone(true);
      toast.success("You’re registered. We’ll be in touch.");
    } catch {
      toast.error("Sorry, we couldn’t register you. Please check your details and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div
        role="status"
        className="rounded-3xl bg-snow p-8 shadow-[var(--shadow-border)] sm:p-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean">
          Registered
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-deep">You’re on the list.</h3>
        <p className="mt-3 max-w-md text-muted">
          Thank you. We’ve noted your place for {title} and will email you the details.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-3xl bg-snow p-5 shadow-[var(--shadow-border)] sm:p-8"
      aria-labelledby="register-heading"
    >
      <h2 id="register-heading" className="text-2xl font-semibold tracking-tight text-deep">
        Register for this event
      </h2>
      <p className="mt-2 text-sm text-muted">
        Free to attend. Tell us who is coming and we’ll send the details.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="reg-name">Name</Label>
          <Input
            id="reg-name"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="reg-email">Email</Label>
          <Input
            id="reg-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="reg-guests">Places needed</Label>
          <Input
            id="reg-guests"
            name="guests"
            type="number"
            inputMode="numeric"
            min={1}
            max={6}
            required
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="reg-notes">Anything we should know? (optional)</Label>
          <Textarea
            id="reg-notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Access needs, dietary requirements, questions."
          />
        </div>
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="reg-company">Company</label>
        <input
          id="reg-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <Button type="submit" size="lg" className="mt-6" disabled={busy}>
        {busy ? "Registering..." : "Register"}
      </Button>
      <p className="mt-4 text-xs text-muted">
        We use your details only to run this event.{" "}
        <a href="/privacy" className="underline underline-offset-2">
          Privacy notice
        </a>
        .
      </p>
    </form>
  );
}