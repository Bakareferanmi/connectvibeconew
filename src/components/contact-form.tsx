"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactPathways, type PathwayId } from "@/lib/site-data";
import { submitContact } from "@/lib/forms";
import { cn } from "@/lib/utils";

export function ContactForm({ initialIntent }: { initialIntent?: string }) {
  const initial = useMemo<PathwayId>(() => {
    const match = contactPathways.find((p) => p.id === initialIntent);
    return match?.id ?? "general";
  }, [initialIntent]);

  const [pathway, setPathway] = useState<PathwayId>(initial);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setPathway(initial);
  }, [initial]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please add your name, email and a short message.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await submitContact({ data: { pathway, name, email, organisation, message, website } });
      setSent(true);
      setName("");
      setEmail("");
      setOrganisation("");
      setMessage("");
      toast.success("Message received. We’ll be in touch.");
    } catch {
      setError("We couldn’t send your message. Please try again. Your details are still here.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div role="status" className="rounded-3xl bg-snow p-8 shadow-[var(--shadow-border)] sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean">Thank you</p>
        <h2 className="mt-3 text-2xl font-semibold text-deep">We’ve got it.</h2>
        <p className="mt-3 max-w-md text-muted">
          A note is with the team for your “{contactPathways.find((p) => p.id === pathway)?.title}”
          enquiry. We aim to reply within three working days.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setSent(false)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-snow p-5 shadow-[var(--shadow-border)] sm:p-8">
      <p className="text-sm font-medium text-deep">What brings you in?</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {contactPathways.map((p) => {
          const active = pathway === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPathway(p.id)}
              className={cn(
                "rounded-2xl p-4 text-left transition-[background-color,box-shadow,color] duration-150",
                active
                  ? "bg-deep text-snow shadow-[var(--shadow-lift)]"
                  : "bg-paper text-deep hover:bg-foam",
              )}
            >
              <span className="block text-sm font-semibold">{p.title}</span>
              <span className={cn("mt-1 block text-xs leading-relaxed", active ? "text-snow/70" : "text-muted")}>
                {p.text}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            maxLength={120}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            maxLength={200}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="org">Organisation (optional)</Label>
          <Input
            id="org"
            name="organisation"
            maxLength={200}
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
          />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            maxLength={5000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Tell us about the place, the people, or the role."
          />
        </div>
      </div>

      <div hidden aria-hidden="true">
        <label htmlFor="contact-website">Leave this empty</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off"
          value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
      <Button type="submit" size="lg" className="mt-6" disabled={busy}>
        {busy ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
