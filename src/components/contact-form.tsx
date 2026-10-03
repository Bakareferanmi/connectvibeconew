"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactPathways, type PathwayId } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "connectvibe.enquiries";

type Enquiry = {
  id: string;
  at: string;
  pathway: PathwayId;
  name: string;
  email: string;
  organisation: string;
  message: string;
};

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
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setPathway(initial);
  }, [initial]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please add your name, email and a short message.");
      return;
    }
    const enquiry: Enquiry = {
      id: crypto.randomUUID(),
      at: new Date().toISOString(),
      pathway,
      name: name.trim(),
      email: email.trim(),
      organisation: organisation.trim(),
      message: message.trim(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Enquiry[];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([enquiry, ...prev].slice(0, 20)));
    } catch {
      /* ignore quota */
    }
    setSent(true);
    toast.success("Message received. We’ll be in touch.");
  }

  if (sent) {
    return (
      <div className="rounded-3xl bg-snow p-8 shadow-[var(--shadow-border)] sm:p-10">
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
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
          />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Tell us about the place, the people, or the role."
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6">
        Send message
      </Button>
    </form>
  );
}
