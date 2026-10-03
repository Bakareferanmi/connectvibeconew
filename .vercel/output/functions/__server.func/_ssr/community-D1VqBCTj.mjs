import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as communityProgrammes, t as Button, x as volunteerRoles, y as stories } from "./site-data-kXW2ODfP.mjs";
import { i as Section, n as PageHero, r as Reveal, t as Kicker } from "./section-DvpWWL1W.mjs";
import { m as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as CtaBand } from "./cta-band-BDJ_V0su.mjs";
import { t as Media } from "./media-ymJJhtLM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-D1VqBCTj.js
var import_jsx_runtime = require_jsx_runtime();
function CommunityPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Community",
			title: "More than a programme page.",
			lede: "Initiatives, volunteering, local partnerships, youth, skills and the stories that prove the work is human.",
			image: "/images/skills.jpg",
			imageAlt: "People in a bright community skills classroom",
			compact: true,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "onDarkSolid",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					search: { intent: "volunteer" },
					children: "Volunteer"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "onDark",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/get-involved",
					children: "Get involved"
				})
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Programmes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl",
			children: "People places prosperity — in that order."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-4 md:grid-cols-2",
			children: communityProgrammes.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * .05,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "grid overflow-hidden rounded-2xl bg-snow shadow-[var(--shadow-border)] sm:grid-cols-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
						src: p.image,
						alt: "",
						className: "aspect-[4/3] w-full sm:col-span-2 sm:aspect-auto sm:h-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-3 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-semibold text-deep",
							children: p.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: p.text
						})]
					})]
				})
			}, p.title))
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			className: "bg-snow",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-2 lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Volunteering" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep",
						children: "A few hours that compound."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 leading-relaxed text-muted",
						children: "Open days, planting, mentoring, events. We train, we feed you, we do not waste your time. Under-18s are welcome with an accompanying adult on family days."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							search: { intent: "volunteer" },
							children: ["Offer your time", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: volunteerRoles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-paper p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-deep",
							children: r.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: r.text
						})]
					}, r.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Partnerships" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl",
				children: "Local authorities, housing providers, colleges, clinics, and the group that already meets in the hall."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-2xl leading-relaxed text-muted",
				children: "We do not land in a neighbourhood and invent a network. We join the one that exists, then add capital, design and delivery muscle. If you are already doing the work, we would rather sit beside you than in front of you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					search: { intent: "partner" },
					children: "Talk partnerships"
				})
			})
		] }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			className: "bg-foam",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Community stories" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep",
				children: "What it felt like, not just what we counted."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 md:grid-cols-3",
				children: stories.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "overflow-hidden rounded-2xl bg-snow shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
						src: s.image,
						alt: "",
						className: "aspect-[16/10] w-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-medium uppercase tracking-[0.14em] text-muted",
								children: [
									s.place,
									" · ",
									s.date
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-lg font-semibold text-deep",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: s.excerpt
							})
						]
					})]
				}, s.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
			title: "Join the community.",
			text: "Volunteer, bring a project, or simply come to the next open day.",
			primary: {
				label: "Get involved",
				href: "/get-involved"
			},
			secondary: {
				label: "See events",
				href: "/events"
			}
		})
	] });
}
//#endregion
export { CommunityPage as component };
