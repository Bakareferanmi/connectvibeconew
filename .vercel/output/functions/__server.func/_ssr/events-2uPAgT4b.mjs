import { i as __toESM } from "../_runtime.mjs";
import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as events, p as pastEvents, r as cn, s as eventKinds } from "./site-data-kXW2ODfP.mjs";
import { i as Section, n as PageHero, r as Reveal, t as Kicker } from "./section-DvpWWL1W.mjs";
import { t as CtaBand } from "./cta-band-BDJ_V0su.mjs";
import { t as Media } from "./media-ymJJhtLM.mjs";
import { t as formatDate } from "./dates-BG5zqnfI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-2uPAgT4b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EventsPage() {
	const [kind, setKind] = (0, import_react.useState)("all");
	const upcoming = (0, import_react.useMemo)(() => events.filter((e) => !e.past).filter((e) => kind === "all" ? true : e.kind === kind).sort((a, b) => a.date.localeCompare(b.date)), [kind]);
	const past = (0, import_react.useMemo)(() => pastEvents.filter((e) => kind === "all" ? true : e.kind === kind), [kind]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Events",
			title: "A calendar you can actually use.",
			lede: "Workshops, training, fundraising, conferences, project launches — and the days we look back on.",
			image: "/images/greenway.jpg",
			imageAlt: "A greenway path through restored parkland",
			compact: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Upcoming" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep",
				children: "Come as you are."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				role: "tablist",
				"aria-label": "Event type",
				children: eventKinds.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": kind === k.id,
					onClick: () => setKind(k.id),
					className: cn("h-10 rounded-full px-4 text-sm font-medium transition-[background-color,color] duration-150", kind === k.id ? "bg-deep text-snow" : "bg-snow text-deep shadow-[var(--shadow-border)] hover:bg-foam"),
					children: k.label
				}, k.id))
			})]
		}), upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-10 text-muted",
			children: "Nothing in this category just now. Try another filter."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3",
			children: upcoming.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/events/$slug",
				params: { slug: e.slug },
				className: "group flex h-full flex-col overflow-hidden rounded-2xl bg-snow shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-border-hover)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
					src: e.image,
					alt: "",
					className: "aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-105"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.16em] text-ocean",
							children: [
								formatDate(e.date),
								" · ",
								e.kind
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-lg font-semibold text-deep",
							children: e.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								e.city,
								" · ",
								e.place
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 flex-1 text-sm leading-relaxed text-muted",
							children: e.summary
						})
					]
				})]
			}, e.slug))
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			className: "bg-snow",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Past events" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep",
				children: "Days that already happened — with pictures."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-6 lg:grid-cols-3",
				children: past.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "overflow-hidden rounded-2xl bg-paper shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/events/$slug",
						params: { slug: e.slug },
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
							src: e.image,
							alt: e.title,
							className: "aspect-[16/10] w-full"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-[0.16em] text-ocean",
									children: formatDate(e.date)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 text-lg font-semibold text-deep",
									children: e.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: e.summary
								})
							]
						})]
					}), e.gallery ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-1 px-2 pb-2",
						children: e.gallery.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
							src: g,
							alt: "",
							className: "aspect-square w-full rounded-lg"
						}, g))
					}) : null]
				}, e.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
			title: "Bring a room, or fill one.",
			text: "Host with us, sponsor a training day, or simply come.",
			primary: {
				label: "Get involved",
				href: "/get-involved"
			},
			secondary: {
				label: "Contact",
				href: "/contact"
			}
		})
	] });
}
//#endregion
export { EventsPage as component };
