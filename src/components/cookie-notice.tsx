"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const KEY = "connectvibe.cookie-consent";
export const COOKIE_SETTINGS_EVENT = "connectvibe:cookie-settings";

export type Consent = "accepted" | "declined" | null;

/** Read the visitor's choice. Use this before switching on analytics. */
export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);
    const reopen = () => setVisible(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* storage unavailable: the choice just won't be remembered */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl bg-navy p-5 text-snow shadow-[var(--shadow-lift)] ring-1 ring-snow/15 sm:left-6 sm:right-auto sm:mx-0"
    >
      <p className="text-sm leading-relaxed text-snow/85">
        This site uses only the cookies and storage it needs to work. If we add analytics,
        we’ll switch it on only if you accept. Read our{" "}
        <a href="/privacy" className="text-teal underline underline-offset-2">
          privacy and cookie notice
        </a>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" variant="teal" onClick={() => choose("accepted")}>
          Accept
        </Button>
        <Button size="sm" variant="onDark" onClick={() => choose("declined")}>
          No thanks
        </Button>
      </div>
    </div>
  );
}