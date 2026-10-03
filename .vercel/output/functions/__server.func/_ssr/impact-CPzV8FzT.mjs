import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as projects, t as Button, v as stats } from "./site-data-kXW2ODfP.mjs";
import { i as Section, n as PageHero, r as Reveal, t as Kicker } from "./section-DvpWWL1W.mjs";
import { t as CtaBand } from "./cta-band-BDJ_V0su.mjs";
import { t as Media } from "./media-ymJJhtLM.mjs";
import { t as CountUp } from "./count-up-OdPfvjEt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/impact-CPzV8FzT.js
var import_jsx_runtime = require_jsx_runtime();
var measures = [
	{
		title: "Carbon & comfort",
		text: "Space-heat demand, bill reduction, and whether the house is actually warm. We meter, we do not guess."
	},
	{
		title: "Local wealth",
		text: "Pounds kept in the neighbourhood: labour, suppliers, community energy yield, avoided leakage."
	},
	{
		title: "Skills & work",
		text: "Training hours, apprentices who complete, job offers made on the back of live sites."
	},
	{
		title: "Belonging",
		text: "Do people say the place feels like theirs? We ask, in rooms and on doorsteps, every year."
	}
];
function ImpactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Impact",
			title: "Impact that can be seen.",
			lede: "Communities reached, projects delivered, people engaged, social value created — counted in public.",
			image: "/images/aerial.jpg",
			imageAlt: "Aerial view of a neighbourhood with rooftop solar",
			compact: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-deep py-16 text-snow lg:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-[88rem] grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-snow/20 pt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-4xl font-semibold tracking-tight sm:text-5xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
							value: s.value,
							prefix: "prefix" in s ? s.prefix : "",
							suffix: s.suffix,
							decimals: "decimals" in s ? s.decimals : 0,
							pad: "pad" in s ? s.pad : void 0
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-snow/70",
						children: s.label
					})]
				}, s.label))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "How we count" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl",
			children: "Social value is a design requirement, not a report at the end."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-4 md:grid-cols-2",
			children: measures.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-snow p-6 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold text-deep",
					children: m.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: m.text
				})]
			}, m.title))
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			className: "bg-snow",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-center gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
					src: "/images/solar.jpg",
					alt: "A solar farm in rolling countryside",
					className: "aspect-[4/3] w-full rounded-3xl"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: .08,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "This year" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep",
							children: "A snapshot, not a victory lap."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-6 space-y-4 text-sm leading-relaxed text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-deep",
									children: "Riverside Retrofit"
								}), " — 42 homes in delivery, 12 technician apprentices, a community energy vehicle ready for first generation."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-deep",
									children: "Oak Hub"
								}), " — brief written in six resident workshops; community land trust in place for ownership."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-deep",
									children: "North Greenway"
								}), " — rain gardens held a 1-in-30 storm; the school field stayed dry."] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-8",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/projects",
								children: "Read the projects"
							})
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Places behind the numbers" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/projects/$slug",
				params: { slug: p.slug },
				className: "group overflow-hidden rounded-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
						src: p.image,
						alt: p.title,
						className: "aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm font-medium text-deep",
						children: p.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: p.place
					})
				]
			}, p.slug))
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
			title: "Help us move the numbers.",
			text: "Partner, fund, volunteer, or bring the next street."
		})
	] });
}
//#endregion
export { ImpactPage as component };
