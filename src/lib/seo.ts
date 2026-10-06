/**
 * Central SEO / share-card settings.
 * Set VITE_SITE_URL in Vercel (e.g. https://www.connectvibeco.org) once the real
 * domain is live. Until then the fallback below is used.
 *
 * What lives here:
 *  - shareMeta():  Open Graph + Twitter tags (share cards)
 *  - pageHead():   title, description, canonical URL, robots, share tags and
 *                  structured data (JSON-LD) for one page. Used by every public route.
 *  - JSON-LD builders: the "facts" Google and AI assistants read directly
 *                  (organisation, website, events, FAQs).
 *  - AI_CRAWLERS:  the search / assistant bots named in /robots.txt.
 */
import { site, social, type SiteEvent } from "@/lib/site-data";
import { eventPrice } from "@/lib/pricing";

export const SITE_URL: string = (
  (import.meta.env.VITE_SITE_URL as string | undefined)?.trim() ||
  "https://connectvibeconew.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "connectvibeco";

export const DEFAULT_TITLE = "connectvibeco | Building what communities need";
export const DEFAULT_DESCRIPTION =
  "Connect eVibe Trust. Sustainable infrastructure, stronger communities, better opportunities. Registered charity in England and Wales.";

/** Allow rich snippets, large image previews and full-length snippets in search and AI answers. */
export const ROBOTS_INDEX =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
export const ROBOTS_NOINDEX = "noindex, nofollow";

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

/* ------------------------------------------------------------------ */
/* Structured data (JSON-LD)                                           */
/* ------------------------------------------------------------------ */

type JsonLd = Record<string, unknown>;

/** A <script type="application/ld+json"> tag. `<` is escaped so content can never close the tag early. */
export function jsonLdScript(data: JsonLd | JsonLd[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

/** The organisation behind the site. `sameAs` follows the social links edited in /admin. */
export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${SITE_URL}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: SITE_URL,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    image: `${SITE_URL}/og.jpg`,
    description: `${site.description} ${site.charityLine}.`,
    slogan: site.shortTag,
    email: site.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.email,
      url: `${SITE_URL}/contact`,
    },
    sameAs: social.map((s) => s.href).filter((h) => /^https:\/\//i.test(h)),
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-GB",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** A page's place in the site, shown as a breadcrumb trail in Google results. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

/** Event rich result (date, place, price) for Google and AI assistants. */
export function eventJsonLd(e: SiteEvent): JsonLd {
  const price = eventPrice(e);
  const url = `${SITE_URL}/events/${e.slug}`;
  const image = e.image.startsWith("http") ? e.image : `${SITE_URL}${e.image}`;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.summary,
    startDate: e.date,
    ...(e.end ? { endDate: e.end } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: e.place,
      address: { "@type": "PostalAddress", addressLocality: e.city },
    },
    image: [image],
    url,
    organizer: { "@type": "NGO", name: site.legalName, url: SITE_URL },
    offers: {
      "@type": "Offer",
      url,
      price: price ? (price.minor / 100).toFixed(2) : "0",
      priceCurrency: price?.currency ?? "GBP",
      availability: e.past ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
    },
  };
}

/* ------------------------------------------------------------------ */
/* One call per page                                                   */
/* ------------------------------------------------------------------ */

type PageHeadArgs = ShareArgs & {
  /** Keep this page out of search results (admin, checkout, ...). */
  noindex?: boolean;
  /** Extra structured data for this page (event, FAQ, breadcrumbs...). */
  jsonLd?: JsonLd | JsonLd[];
};

/**
 * Everything a public page needs in <head>: title, description, canonical link,
 * robots, share cards and structured data. Use it as `head: () => pageHead({...})`.
 */
export function pageHead({ noindex, jsonLd, ...share }: PageHeadArgs) {
  const path = share.path ?? "/";
  return {
    meta: [
      ...shareMeta(share),
      { name: "robots", content: noindex ? ROBOTS_NOINDEX : ROBOTS_INDEX },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${path === "/" ? "" : path}` }],
    scripts: jsonLd ? [jsonLdScript(jsonLd)] : [],
  };
}

/* ------------------------------------------------------------------ */
/* Crawlers                                                            */
/* ------------------------------------------------------------------ */

/**
 * Search and AI-assistant crawlers named in /robots.txt. They are all allowed:
 * being readable by assistants (ChatGPT, Claude, Perplexity, Gemini, Copilot...)
 * is the point of "AI SEO". To opt a bot out, delete its name here.
 */
export const AI_CRAWLERS = [
  // OpenAI (ChatGPT search, browsing and model training)
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  // Anthropic (Claude)
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google (Gemini / AI Overviews controls) and Apple
  "Google-Extended",
  "Applebot-Extended",
  // Microsoft Bing / Copilot, DuckDuckGo
  "Bingbot",
  "DuckAssistBot",
  // Others
  "Meta-ExternalAgent",
  "Amazonbot",
  "cohere-ai",
  "YouBot",
  "MistralAI-User",
] as const;

/** Paths no crawler should visit. */
export const DISALLOWED_PATHS = ["/admin", "/checkout/", "/_serverFn/"] as const;
