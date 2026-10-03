import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as site, n as approach, t as Button } from "./site-data-kXW2ODfP.mjs";
import { a as Stagger, i as Section, n as PageHero, o as StaggerItem, r as Reveal, t as Kicker } from "./section-DvpWWL1W.mjs";
import { t as CtaBand } from "./cta-band-BDJ_V0su.mjs";
import { t as Media } from "./media-ymJJhtLM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BKYluu4O.js
var import_jsx_runtime = require_jsx_runtime();
var values = [
	{
		title: "Trust",
		text: "We are a registered charity. The books, the briefs and the hard conversations are all on the table."
	},
	{
		title: "Craft",
		text: "Buildings that perform. Landscapes that hold water. Programmes people actually finish."
	},
	{
		title: "Belonging",
		text: "If the people who live there did not help write it, it is not finished."
	},
	{
		title: "Patience",
		text: "We stay past the ribbon. Ownership, maintenance and skills are part of the work."
	}
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "About the trust",
			title: "A charity that builds — and stays.",
			lede: `${site.legalName}. We connect people, ideas and resources so infrastructure becomes opportunity.`,
			image: "/images/community-centre.jpg",
			imageAlt: "A timber and brick community building with a civic square",
			compact: true,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "onDarkSolid",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/what-we-do",
					children: "What we do"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 lg:grid-cols-12 lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "lg:col-span-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Who we are" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl",
					children: "Connect eVibe exists to make infrastructure do more than stand."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: .08,
				className: "lg:col-span-7 space-y-5 text-base leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Too many places get a building and lose the plot. We were set up so communities can specify, deliver and then own the civic infrastructure they need — homes that hold heat, streets that hold water, rooms that hold people." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We work as a trust: independent, charitable, and stubborn about social value. Partners bring land, capital and expertise. Residents bring the brief. We hold the space between them until the work belongs locally." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						site.legalName,
						". ",
						site.charityLine,
						". Our public name is",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-deep",
							children: "connectvibeco"
						}),
						"."
					] })
				]
			})]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			className: "bg-snow",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "How we work" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl",
				children: "Connect · Build · Empower — then hand it over."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
				className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: approach.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StaggerItem, {
					className: "rounded-2xl bg-paper p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.18em] text-ocean",
						children: a.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: a.text
					})]
				}, a.key))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-center gap-10 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
				src: "/images/engineer.jpg",
				alt: "An engineer on a rooftop looking toward the city",
				className: "aspect-[4/3] w-full rounded-3xl"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: .08,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Governance" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep",
						children: "Incorporated trustees, public duty."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 leading-relaxed text-muted",
						children: "The trust is governed by incorporated trustees. We report as a charity in England and Wales, publish impact in plain language, and treat social value as a design requirement — not a paragraph in a tender."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-8 grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-snow p-5 shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-semibold uppercase tracking-[0.16em] text-ocean",
								children: "Registered name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-2 text-sm font-medium text-deep",
								children: site.legalName
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-snow p-5 shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-semibold uppercase tracking-[0.16em] text-ocean",
								children: "Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-2 text-sm font-medium text-deep",
								children: site.charityLine
							})]
						})]
					})
				]
			})]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			className: "bg-foam",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "What we hold to" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep",
				children: "Values we hire against."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 md:grid-cols-2",
				children: values.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-snow p-6 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold text-deep",
						children: v.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: v.text
					})]
				}) }, v.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
			kicker: "Work with us",
			title: "Bring a brief. Or a street.",
			text: "Authorities, community groups, funders and neighbours — if you have a place that needs to work harder, start here."
		})
	] });
}
//#endregion
export { AboutPage as component };
