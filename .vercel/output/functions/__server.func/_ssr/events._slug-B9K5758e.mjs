import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./site-data-kXW2ODfP.mjs";
import { i as Section, n as PageHero, r as Reveal } from "./section-DvpWWL1W.mjs";
import { h as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as CtaBand } from "./cta-band-BDJ_V0su.mjs";
import { t as Media } from "./media-ymJJhtLM.mjs";
import { r as Route$1 } from "./router-EYaHTJdF.mjs";
import { t as formatDate } from "./dates-BG5zqnfI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events._slug-B9K5758e.js
var import_jsx_runtime = require_jsx_runtime();
function EventDetailPage() {
	const { event } = Route$1.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: `${event.past ? "Past event" : "Upcoming"} · ${event.kind}`,
			title: event.title,
			lede: `${formatDate(event.date)} · ${event.place}, ${event.city}`,
			image: event.image,
			imageAlt: event.title,
			compact: true,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "onDark",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/events",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "All events"]
				})
			}), !event.past ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "onDarkSolid",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					search: { intent: "general" },
					children: "Register interest"
				})
			}) : null] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			className: "max-w-2xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg leading-relaxed text-muted",
				children: event.body
			})
		}), event.gallery ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid gap-3 sm:grid-cols-3",
			children: event.gallery.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
				src: g,
				alt: "",
				className: "aspect-[4/3] w-full rounded-2xl"
			}, g))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
				src: event.image,
				alt: event.title,
				className: "aspect-[21/9] w-full rounded-3xl"
			})
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { EventDetailPage as component };
