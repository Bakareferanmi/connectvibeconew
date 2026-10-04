"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/lib/forms";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      await subscribeNewsletter({ data: { email, company } });
      setDone(true);
      setEmail("");
      toast.success("You’re on the list. Thank you.");
    } catch {
      toast.error("Sorry, that didn’t work. Please check your email and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <p role="status" className="text-sm text-teal">
        Thank you. You’re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm" noValidate={false}>
      <label htmlFor="newsletter-email" className="text-sm font-medium text-snow">
        Get our newsletter
      </label>
      <div className="mt-2 flex gap-2">
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 bg-snow/10 text-snow shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)] placeholder:text-snow/60 focus-visible:shadow-[inset_0_0_0_2px_#00bfa6]"
        />
        <Button
          type="submit"
          variant="teal"
          size="icon"
          disabled={busy}
          aria-label={busy ? "Subscribing" : "Subscribe"}
        >
          <ArrowRight className="size-5" aria-hidden="true" />
        </Button>
      </div>
      {/* Honeypot: hidden from people, bots fill it in */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="newsletter-company">Company</label>
        <input
          id="newsletter-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <p className="mt-2 text-xs text-snow/60">
        News and invitations a few times a year. Unsubscribe any time.{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-snow">
          Privacy
        </a>
        .
      </p>
    </form>
  );
}