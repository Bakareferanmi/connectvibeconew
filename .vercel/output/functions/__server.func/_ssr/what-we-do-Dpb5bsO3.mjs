import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as pillars, r as cn, t as Button } from "./site-data-kXW2ODfP.mjs";
import { i as Section, n as PageHero, r as Reveal, t as Kicker } from "./section-DvpWWL1W.mjs";
import { m as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as CtaBand } from "./cta-band-BDJ_V0su.mjs";
import { t as Media } from "./media-ymJJhtLM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/what-we-do-Dpb5bsO3.js
var import_jsx_runtime = require_jsx_runtime();
function WhatWeDoPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "What we do",
			title: "Build. Connect. Empower. Sustain.",
			lede: "Four practices, one trust. Sustainable infrastructure, community assets, social development and measurable social value.",
			image: "/images/solar.jpg",
			imageAlt: "Rows of solar panels in green countryside",
			compact: true
		}),
		pillars.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: p.slug,
			className: cn("scroll-mt-24 py-20 lg:py-28", i % 2 === 1 ? "bg-snow" : "bg-paper"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-[88rem] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: i % 2 === 1 ? "lg:order-2" : void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
						src: p.image,
						alt: p.title,
						className: "aspect-[4/3] w-full rounded-3xl"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: .08,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Kicker, { children: [
							p.kicker,
							" · ",
							p.title
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl",
							children: p.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 leading-relaxed text-muted",
							children: p.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 space-y-2",
							children: p.points.map((pt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3 text-sm text-deep",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" }), pt]
							}, pt))
						})
					]
				})]
			})
		}, p.slug)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			className: "bg-snow",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "mx-auto max-w-2xl text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "From brief to belonging" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep",
						children: "A simple sequence. Held carefully."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2",
					children: [
						{
							n: "01",
							t: "Listen",
							d: "Resident workshops, data, and a walk of the street."
						},
						{
							n: "02",
							t: "Specify",
							d: "A brief the community can defend — cost, carbon, jobs."
						},
						{
							n: "03",
							t: "Deliver",
							d: "Local labour, trainees on site, neighbours as clients."
						},
						{
							n: "04",
							t: "Belong",
							d: "Ownership, maintenance, and skills that stay when we leave."
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl bg-paper p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-[0.18em] text-ocean",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-xl font-semibold text-deep",
								children: s.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: s.d
							})
						]
					}, s.n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/projects",
							children: ["See it on the ground", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { WhatWeDoPage as component };
