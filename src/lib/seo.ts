/**
 * Central SEO / share-card settings.
 * Set VITE_SITE_URL in Vercel (e.g. https://www.connectvibeco.org) once the real
 * domain is live. Until then the fallback below is used.
 */
export const SITE_URL: string = (
  (import.meta.env.VITE_SITE_URL as string | undefined)?.trim() ||
  "https://connectvibeconew.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "connectvibeco";

export const DEFAULT_TITLE = "connectvibeco | Building what communities need";
export const DEFAULT_DESCRIPTION =
  "Connect eVibe Trust. Sustainable infrastructure, stronger communities, better opportunities. Registered charity in England and Wales.";

type ShareArgs = {
  title: string;
  description: string;
  /** Path on this site, e.g. "/events/skills-for-green-jobs" */
  path?: string;
  /** Path to the share image, e.g. "/og/event/skills-for-green-jobs" or "/og.jpg" */
  image?: string;
  imageAlt?: string;
};

/** Open Graph + Twitter/X tags for a page. */
export function shareMeta({
  title,
  description,
  path = "/",
  image = "/og.jpg",
  imageAlt = "connectvibeco: sustainable community infrastructure",
}: ShareArgs) {
  const url = `${SITE_URL}${path}`;
  const img = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: imageAlt },
    { property: "og:locale", content: "en_GB" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
    { name: "twitter:image:alt", content: imageAlt },
  ];
}
