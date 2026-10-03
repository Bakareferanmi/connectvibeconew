import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button, x as volunteerRoles } from "./site-data-kXW2ODfP.mjs";
import { i as Section, n as PageHero, r as Reveal, t as Kicker } from "./section-DvpWWL1W.mjs";
import { c as Heart, f as Briefcase, i as Sprout, l as Handshake, m as ArrowRight, n as Users, s as Landmark } from "../_libs/lucide-react.mjs";
import { t as CtaBand } from "./cta-band-BDJ_V0su.mjs";
import { t as Media } from "./media-ymJJhtLM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/get-involved-BbjXMMSg.js
var import_jsx_runtime = require_jsx_runtime();
var doors = [
	{
		icon: Handshake,
		title: "Partner",
		text: "Authorities, housing providers, colleges, contractors, community trusts. Bring land, capital or a brief.",
		href: "/contact",
		intent: "partner"
	},
	{
		icon: Landmark,
		title: "Support a project",
		text: "Gifts, grants, community shares, or a skill you can lend to a live street.",
		href: "/contact",
		intent: "support"
	},
	{
		icon: Heart,
		title: "Volunteer",
		text: "Open days, planting, mentoring, events. A few hours that compound.",
		href: "/contact",
		intent: "volunteer"
	},
	{
		icon: Sprout,
		title: "Bring a community project",
		text: "A street, a building, a group. We’ll tell you honestly if we can help.",
		href: "/contact",
		intent: "project"
	},
	{
		icon: Briefcase,
		title: "Build a career here",
		text: "Roles, apprenticeships and a speculative note we’ll actually read.",
		href: "/careers",
		intent: void 0
	},
	{
		icon: Users,
		title: "Come to an event",
		text: "Workshops, launches, the winter assembly. The rooms are open.",
		href: "/events",
		intent: void 0
	}
];
function GetInvolvedPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Get involved",
			title: "There is a door for every kind of yes.",
			lede: "Partner, fund, volunteer, bring a project, start a career, or simply come to the next open day.",
			image: "/images/hero.jpg",
			imageAlt: "A sustainable neighbourhood at golden hour",
			compact: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Choose a door" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl",
			children: "Real solutions. Lasting impact. You in the room."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3",
			children: doors.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * .05,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorCard, { door: d })
			}, d.title))
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			className: "bg-snow",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-center gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
					src: "/images/skills.jpg",
					alt: "Skills workshop",
					className: "aspect-[4/3] w-full rounded-3xl"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: .08,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Volunteer roles" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep",
							children: "The work is physical, social, and occasionally muddy."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 space-y-4",
							children: volunteerRoles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-deep",
								children: r.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: r.text
							})] }, r.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								search: { intent: "volunteer" },
								children: "Volunteer with us"
							})
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
			title: "If you’re not sure which door — pick general.",
			text: "We’ll route you. Better a conversation than a perfect form.",
			primary: {
				label: "Contact us",
				href: "/contact"
			},
			secondary: null
		})
	] });
}
function DoorCard({ door }) {
	const Icon = door.icon;
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex size-11 items-center justify-center rounded-xl bg-foam text-ocean",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-5",
				strokeWidth: 1.75
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mt-5 text-xl font-semibold text-deep",
			children: door.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 flex-1 text-sm leading-relaxed text-muted",
			children: door.text
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "mt-5 inline-flex items-center gap-1 text-sm font-medium text-ocean",
			children: ["Continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" })]
		})
	] });
	const className = "group flex h-full flex-col rounded-2xl bg-snow p-6 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]";
	if (door.intent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/contact",
		search: { intent: door.intent },
		className,
		children: body
	});
	if (door.href === "/careers") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/careers",
		className,
		children: body
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/events",
		className,
		children: body
	});
}
//#endregion
export { GetInvolvedPage as component };
