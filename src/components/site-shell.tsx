import type { ReactNode } from "react";
import { CookieNotice } from "@/components/cookie-notice";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "sonner";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-snow focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-deep focus:shadow-[var(--shadow-lift)]"
      >
        Skip to main content
      </a>
      <SiteHeader />
      {children}
      <SiteFooter />
      <CookieNotice />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "font-sans",
        }}
      />
    </div>
  );
}