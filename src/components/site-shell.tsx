import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "sonner";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteHeader />
      {children}
      <SiteFooter />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "font-sans",
        }}
      />
    </div>
  );
}
