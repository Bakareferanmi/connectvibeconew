import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as projects, t as Button } from "./site-data-kXW2ODfP.mjs";
import { i as Section, n as PageHero, r as Reveal } from "./section-DvpWWL1W.mjs";
import { h as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as CtaBand } from "./cta-band-BDJ_V0su.mjs";
import { t as Media } from "./media-ymJJhtLM.mjs";
import { n as Route } from "./router-EYaHTJdF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._slug-CMWrmj83.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectDetailPage() {
	const { project } = Route.useLoaderData();
	const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: `${project.number} · ${project.theme} · ${project.place}`,
			title: project.title,
			lede: project.summary,
			image: project.image,
			imageAlt: project.title,
			compact: true,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "onDark",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/projects",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "All projects"]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-12 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "lg:col-span-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg leading-relaxed text-muted",
					children: project.body
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm font-medium text-deep",
					children: ["Programme ", project.year]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .08,
				className: "lg:col-span-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3 rounded-2xl bg-snow p-6 shadow-[var(--shadow-border)]",
					children: project.outcomes.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 text-sm text-deep",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" }), o]
					}, o))
				})
			})]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			className: "bg-snow pt-0 lg:pt-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold uppercase tracking-[0.18em] text-ocean",
				children: "More projects"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 md:grid-cols-3",
				children: others.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/projects/$slug",
					params: { slug: p.slug },
					className: "group overflow-hidden rounded-2xl bg-paper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
						src: p.image,
						alt: p.title,
						className: "aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.14em] text-muted",
							children: p.place
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-semibold text-deep",
							children: p.title
						})]
					})]
				}, p.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { ProjectDetailPage as component };
