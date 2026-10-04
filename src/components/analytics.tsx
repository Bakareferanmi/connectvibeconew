"use client";

import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, getConsent } from "@/components/cookie-notice";
import { GA_ID, disableGa, enableGa, trackPageView } from "@/lib/analytics";

/** Renders nothing. Loads Google Analytics only after the visitor accepts cookies. */
export function Analytics() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const sync = () => {
      if (getConsent() === "accepted") {
        enableGa();
        setOn(true);
      } else {
        disableGa();
        setOn(false);
      }
    };
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  useEffect(() => {
    if (on) trackPageView(pathname);
  }, [on, pathname]);

  return null;
}
