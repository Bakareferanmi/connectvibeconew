import { i as __toESM } from "../_runtime.mjs";
import { J as notFound, S as useRouter, Y as require_jsx_runtime, _ as Outlet, b as createRootRoute, f as Scripts, g as createRouter, m as useRouterState, p as HeadContent, v as lazyRouteComponent, x as Link, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as social, f as nav, g as site, l as getEvent, r as cn, t as Button, u as getProject } from "./site-data-kXW2ODfP.mjs";
import { r as AnimatePresence, t as useReducedMotion } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as Menu, p as ArrowUpRight, r as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-EYaHTJdF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-[72vh] flex-col items-center justify-center bg-paper px-6 py-32 text-center text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.22em] text-ocean",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-4xl font-semibold tracking-tight text-deep",
				children: "This page isn’t built yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-md text-muted",
				children: "The path you followed doesn’t exist. Head home, or talk to us if you were expecting something here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Back home"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						children: "Contact"
					})
				})]
			})
		]
	});
}
function LogoMark({ className, onDark = false }) {
	const ring = onDark ? "#7FD9FF" : "#007BFF";
	const bars = onDark ? "#F4F7FA" : "#002D6B";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 80 80",
		className: cn("shrink-0", className),
		"aria-hidden": "true",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M58.8 18.2C51.4 11.2 40.6 9.8 31.6 14.8C20.2 21.2 14.8 35.2 19.8 47.2C24.6 58.4 37.2 64.8 49.6 61.2",
				stroke: ring,
				strokeWidth: "9.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "27.5",
				y: "42",
				width: "7",
				height: "14",
				rx: "1.6",
				fill: bars
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "36",
				y: "34.5",
				width: "7",
				height: "21.5",
				rx: "1.6",
				fill: bars
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "44.5",
				y: "27",
				width: "7",
				height: "29",
				rx: "1.6",
				fill: bars
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M55.2 25.8c3.2 4.6 2.8 10.6-1 14.4-4.4-1.8-8.2-5.4-9.8-10.2 3.6-3.6 7.2-5 10.8-4.2z",
				fill: "#2ECC71"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M50.6 32.2c1.6 2.2 3.4 3.8 5.4 4.8",
				stroke: "#0B1B33",
				strokeOpacity: "0.18",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			})
		]
	});
}
function Logo({ className, markClassName, stacked = false, onDark = false, showWordmark = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center", stacked ? "flex-col items-start gap-1" : "gap-2.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {
			className: cn("size-10", markClassName),
			onDark
		}), showWordmark ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("flex flex-col leading-none", stacked && "pl-0"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("font-bold tracking-[-0.04em] lowercase", stacked ? "text-xl" : "text-[1.05rem]", onDark ? "text-snow" : "text-deep"),
				children: ["connectvibe", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: onDark ? "text-teal" : "text-ocean",
					children: "co"
				})]
			}), stacked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("mt-1 text-[0.58rem] font-medium uppercase tracking-[0.18em]", onDark ? "text-snow/70" : "text-muted"),
				children: "Infrastructure · Community · Opportunity"
			}) : null]
		}) : null]
	});
}
var groups = [{
	title: "The trust",
	links: [
		{
			label: "About",
			href: "/about"
		},
		{
			label: "What we do",
			href: "/what-we-do"
		},
		{
			label: "Impact",
			href: "/impact"
		},
		{
			label: "Careers",
			href: "/careers"
		}
	]
}, {
	title: "In community",
	links: [
		{
			label: "Community",
			href: "/community"
		},
		{
			label: "Projects",
			href: "/projects"
		},
		{
			label: "Events",
			href: "/events"
		},
		{
			label: "Get involved",
			href: "/get-involved"
		}
	]
}];
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "bg-navy text-snow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 lg:grid-cols-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
								onDark: true,
								stacked: true,
								markClassName: "size-12"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 max-w-sm text-sm leading-relaxed text-snow/70",
								children: [
									site.description,
									" ",
									site.shortTag
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${site.email}`,
								className: "mt-6 inline-block text-sm font-medium text-teal link-underline",
								children: site.email
							})
						]
					}),
					groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.18em] text-teal",
							children: group.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2.5",
							children: group.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: l.href,
								className: "text-sm text-snow/75 transition-colors duration-150 hover:text-snow",
								children: l.label
							}) }, l.href))
						})]
					}, group.title)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-[0.18em] text-teal",
								children: "Follow"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 flex flex-wrap gap-2",
								children: social.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: s.href,
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex h-10 items-center rounded-full bg-snow/8 px-3.5 text-sm text-snow/80 transition-[background-color,color] duration-150 hover:bg-snow/16 hover:text-snow",
									children: s.label
								}) }, s.label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-8 text-xs leading-relaxed text-snow/50",
								children: [
									site.legalName,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									site.charityLine
								]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 flex flex-col gap-3 border-t border-snow/10 pt-6 text-xs text-snow/45 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					site.legalName
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4",
					children: [nav.slice(0, 3).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: n.href,
						className: "hover:text-snow",
						children: n.label
					}, n.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "hover:text-snow",
						children: "Contact"
					})]
				})]
			})]
		})
	});
}
function SiteHeader() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const reduce = useReducedMotion();
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	const solid = scrolled || open;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300", solid ? "bg-snow/90 shadow-[0_1px_0_rgba(11,27,51,0.06)] backdrop-blur-md" : "bg-gradient-to-b from-navy/80 via-navy/35 to-transparent"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-[4.5rem] max-w-[88rem] items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "relative z-10 shrink-0",
					"aria-label": "connectvibeco home",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
						onDark: !solid,
						markClassName: "size-9 lg:size-10"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-0.5 xl:flex",
					"aria-label": "Primary",
					children: nav.map((item) => {
						const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.href,
							className: cn("rounded-full px-3 py-2 text-[0.8125rem] font-medium tracking-tight transition-[color,background-color] duration-200", solid ? active ? "bg-foam text-deep" : "text-deep/75 hover:bg-foam hover:text-deep" : active ? "bg-snow/12 text-snow" : "text-snow/80 hover:bg-snow/10 hover:text-snow"),
							children: item.label
						}, item.href);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						variant: solid ? "primary" : "onDarkSolid",
						className: "hidden sm:inline-flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/get-involved",
							children: ["Get involved", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("relative z-10 inline-flex size-11 items-center justify-center rounded-full xl:hidden", solid ? "text-deep hover:bg-foam" : "text-snow hover:bg-snow/10"),
						"aria-label": open ? "Close menu" : "Open menu",
						"aria-expanded": open,
						onClick: () => setOpen((v) => !v),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative size-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("absolute inset-0 flex items-center justify-center transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)]", open ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("absolute inset-0 flex items-center justify-center transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)]", open ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							})]
						})
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "fixed inset-0 z-40 bg-deep xl:hidden",
			initial: reduce ? { opacity: 1 } : { opacity: 0 },
			animate: { opacity: 1 },
			exit: {
				opacity: 0,
				transition: { duration: .15 }
			},
			transition: {
				duration: .25,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-dvh flex-col px-6 pb-10 pt-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-1 flex-col gap-1 overflow-y-auto",
					children: nav.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: reduce ? false : {
							opacity: 0,
							y: 12,
							filter: "blur(6px)"
						},
						animate: {
							opacity: 1,
							y: 0,
							filter: "blur(0px)"
						},
						transition: {
							delay: .04 * i,
							duration: .4,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.href,
							className: "block py-3 text-3xl font-semibold tracking-tight text-snow",
							children: item.label
						})
					}, item.href))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "onDarkSolid",
					size: "lg",
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/get-involved",
						children: "Get involved"
					})
				})]
			})
		}) : null })]
	});
}
function SiteShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "bottom-right",
				toastOptions: { className: "font-sans" }
			})
		]
	});
}
var styles_default = "/assets/styles-CossVGPh.css";
var Route$12 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "connectvibeco — Building what communities need" },
			{
				name: "description",
				content: "Connect eVibe Trust. Sustainable infrastructure, stronger communities, better opportunities. Registered charity in England and Wales."
			},
			{
				name: "theme-color",
				content: "#002D6B"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	notFoundComponent: NotFound,
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$11 = () => import("./routes-Djxd7j4M.mjs");
var Route$11 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [{ title: "connectvibeco — Building what communities need" }] })
});
var $$splitComponentImporter$10 = () => import("./about-BKYluu4O.mjs");
var Route$10 = createFileRoute("/about")({
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [{ title: "About — connectvibeco" }] })
});
var $$splitComponentImporter$9 = () => import("./careers-Br21gehU.mjs");
var Route$9 = createFileRoute("/careers")({
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => ({ meta: [{ title: "Careers — connectvibeco" }] })
});
var $$splitComponentImporter$8 = () => import("./community-D1VqBCTj.mjs");
var Route$8 = createFileRoute("/community")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => ({ meta: [{ title: "Community — connectvibeco" }] })
});
var $$splitComponentImporter$7 = () => import("./contact-CTbwUPGC.mjs");
var Route$7 = createFileRoute("/contact")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	validateSearch: (search) => ({ intent: typeof search.intent === "string" ? search.intent : void 0 }),
	head: () => ({ meta: [{ title: "Contact — connectvibeco" }] })
});
var $$splitComponentImporter$6 = () => import("./events-2uPAgT4b.mjs");
var Route$6 = createFileRoute("/events")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Events — connectvibeco" }] })
});
var $$splitComponentImporter$5 = () => import("./get-involved-BbjXMMSg.mjs");
var Route$5 = createFileRoute("/get-involved")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Get involved — connectvibeco" }] })
});
var $$splitComponentImporter$4 = () => import("./impact-CPzV8FzT.mjs");
var Route$4 = createFileRoute("/impact")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Impact — connectvibeco" }] })
});
var $$splitComponentImporter$3 = () => import("./projects-CCzfkw2H.mjs");
var Route$3 = createFileRoute("/projects")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Projects — connectvibeco" }] })
});
var $$splitComponentImporter$2 = () => import("./what-we-do-Dpb5bsO3.mjs");
var Route$2 = createFileRoute("/what-we-do")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "What we do — connectvibeco" }] })
});
var $$splitComponentImporter$1 = () => import("./events._slug-B9K5758e.mjs");
var Route$1 = createFileRoute("/events/$slug")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	loader: ({ params }) => {
		const event = getEvent(params.slug);
		if (!event) throw notFound();
		return { event };
	},
	head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.event.title ?? "Event"} — connectvibeco` }] })
});
var $$splitComponentImporter = () => import("./projects._slug-CMWrmj83.mjs");
var Route = createFileRoute("/projects/$slug")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: ({ params }) => {
		const project = getProject(params.slug);
		if (!project) throw notFound();
		return { project };
	},
	head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.project.title ?? "Project"} — connectvibeco` }] })
});
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var AboutRoute = Route$10.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$12
});
var CareersRoute = Route$9.update({
	id: "/careers",
	path: "/careers",
	getParentRoute: () => Route$12
});
var CommunityRoute = Route$8.update({
	id: "/community",
	path: "/community",
	getParentRoute: () => Route$12
});
var ContactRoute = Route$7.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$12
});
var EventsRoute = Route$6.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => Route$12
});
var GetInvolvedRoute = Route$5.update({
	id: "/get-involved",
	path: "/get-involved",
	getParentRoute: () => Route$12
});
var ImpactRoute = Route$4.update({
	id: "/impact",
	path: "/impact",
	getParentRoute: () => Route$12
});
var ProjectsRoute = Route$3.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => Route$12
});
var WhatWeDoRoute = Route$2.update({
	id: "/what-we-do",
	path: "/what-we-do",
	getParentRoute: () => Route$12
});
var EventsSlugRoute = Route$1.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => EventsRoute
});
var ProjectsSlugRoute = Route.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => ProjectsRoute
});
var EventsRouteChildren = { EventsSlugRoute };
var EventsRouteWithChildren = EventsRoute._addFileChildren(EventsRouteChildren);
var ProjectsRouteChildren = { ProjectsSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	CareersRoute,
	CommunityRoute,
	ContactRoute,
	EventsRoute: EventsRouteWithChildren,
	GetInvolvedRoute,
	ImpactRoute,
	ProjectsRoute: ProjectsRoute._addFileChildren(ProjectsRouteChildren),
	WhatWeDoRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Route$7 as i, Route as n, Route$1 as r, router_exports as t };
