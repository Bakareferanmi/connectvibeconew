import { i as __toESM } from "../_runtime.mjs";
import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as jobs, o as culture, r as cn, t as Button } from "./site-data-kXW2ODfP.mjs";
import { i as Section, n as PageHero, r as Reveal, t as Kicker } from "./section-DvpWWL1W.mjs";
import { t as CtaBand } from "./cta-band-BDJ_V0su.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/careers-Br21gehU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var groups = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "employed",
		label: "Current opportunities"
	},
	{
		id: "apprenticeship",
		label: "Apprenticeships"
	},
	{
		id: "volunteer",
		label: "Volunteers"
	}
];
function CareersPage() {
	const [kind, setKind] = (0, import_react.useState)("all");
	const list = (0, import_react.useMemo)(() => jobs.filter((j) => kind === "all" ? true : j.kind === kind), [kind]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Careers",
			title: "Build your career while building stronger communities.",
			lede: "Not just vacancies. Employed roles, apprenticeships, volunteering, and a culture we will actually describe.",
			image: "/images/careers.jpg",
			imageAlt: "A construction professional overlooking a timber building site at dusk",
			compact: true,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "onDarkSolid",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					search: { intent: "career" },
					children: "Speculative note"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			className: "bg-snow",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Working at Connect eVibe" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl",
				children: "Kind, not soft. On site, not only on slides."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 md:grid-cols-2",
				children: culture.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-paper p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold text-deep",
						children: c.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: c.text
					})]
				}, c.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Opportunities" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep",
				children: "Open seats, including the ones you grow into."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setKind(g.id),
					className: cn("h-10 rounded-full px-4 text-sm font-medium transition-[background-color,color] duration-150", kind === g.id ? "bg-deep text-snow" : "bg-snow text-deep shadow-[var(--shadow-border)] hover:bg-foam"),
					children: g.label
				}, g.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 divide-y divide-line rounded-3xl bg-snow shadow-[var(--shadow-border)]",
				children: list.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "p-5 sm:p-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-semibold text-deep",
										children: job.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-foam px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-deep",
										children: job.type
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted",
									children: [
										job.location,
										" · ",
										job.team,
										" · Closes ",
										job.closing
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted",
									children: job.summary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 space-y-1",
									children: job.points.map((pt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2 text-sm text-deep",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" }), pt]
									}, pt))
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								search: { intent: "career" },
								children: "Apply"
							})
						})]
					})
				}, job.slug))
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
			title: "Don’t see the seat?",
			text: "Send a note. We keep a short list and we actually open it.",
			primary: {
				label: "Get in touch",
				href: "/contact"
			},
			secondary: {
				label: "Volunteer",
				href: "/get-involved"
			}
		})
	] });
}
//#endregion
export { CareersPage as component };
