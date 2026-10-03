import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as projects, r as cn } from "./site-data-kXW2ODfP.mjs";
import { i as Section, n as PageHero, r as Reveal, t as Kicker } from "./section-DvpWWL1W.mjs";
import { t as CtaBand } from "./cta-band-BDJ_V0su.mjs";
import { t as Media } from "./media-ymJJhtLM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-CCzfkw2H.js
var import_jsx_runtime = require_jsx_runtime();
var statusLabel = {
	live: "Live",
	delivery: "In delivery",
	coming: "Coming soon"
};
function ProjectsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Projects",
			title: "From ideas to places people can use.",
			lede: "Retrofit, civic buildings, green infrastructure and neighbourhoods still on the drawing board — all of them specified with the people who will live there.",
			image: "/images/housing.jpg",
			imageAlt: "Climate-resilient community housing with timber cladding and rain gardens",
			compact: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Portfolio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep",
			children: "Four places. One way of working."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-5",
			children: projects.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * .04,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/projects/$slug",
					params: { slug: p.slug },
					className: "group grid overflow-hidden rounded-3xl bg-snow shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] lg:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
						src: p.image,
						alt: p.title,
						className: cn("aspect-[16/10] w-full lg:col-span-6 lg:aspect-auto lg:h-full", "transition-transform duration-700 group-hover:scale-[1.03]")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-center p-6 lg:col-span-6 lg:p-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold uppercase tracking-[0.18em] text-ocean",
									children: [
										p.number,
										" · ",
										p.theme
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-foam px-2.5 py-0.5 text-[0.7rem] font-medium text-deep",
									children: statusLabel[p.status]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-2xl font-semibold tracking-tight text-deep sm:text-3xl",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									p.place,
									" · ",
									p.year
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-xl text-sm leading-relaxed text-muted",
								children: p.summary
							})
						]
					})]
				})
			}, p.slug))
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
			title: "Have a community project?",
			text: "Bring us a street, a building, a group. We'll tell you honestly if we can help.",
			primary: {
				label: "Start a conversation",
				href: "/contact"
			}
		})
	] });
}
//#endregion
export { ProjectsPage as component };
