/**
 * Google Analytics 4, loaded ONLY after the visitor accepts the cookie notice.
 * Set VITE_GA_MEASUREMENT_ID (looks like G-XXXXXXXXXX) in Vercel to turn it on.
 */
export const GA_ID: string | undefined =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim() || undefined;

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
} & Record<string, unknown>;

function win(): GtagWindow {
  return window as unknown as GtagWindow;
}

export function enableGa(): void {
  if (!GA_ID || typeof window === "undefined") return;
  const w = win();
  w[`ga-disable-${GA_ID}`] = false;
  if (w.gtag) return; // already loaded
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // GA requires the real `arguments` object, not an array.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID, { send_page_view: false });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export function disableGa(): void {
  if (!GA_ID || typeof window === "undefined") return;
  win()[`ga-disable-${GA_ID}`] = true;
  // Remove GA cookies if they were set earlier
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0]?.trim();
    if (name && (name === "_ga" || name.startsWith("_ga_") || name === "_gid")) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
}

export function trackPageView(path: string): void {
  if (!GA_ID || typeof window === "undefined") return;
  win().gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
