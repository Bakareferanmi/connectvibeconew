import { Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as cn } from "./site-data-kXW2ODfP.mjs";
import { t as useReducedMotion } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/section-DvpWWL1W.js
var import_jsx_runtime = require_jsx_runtime();
var ease$1 = [
	.22,
	1,
	.36,
	1
];
function Reveal({ children, className, delay = 0, y = 18 }) {
	const reduce = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className,
		initial: reduce ? false : {
			opacity: 0,
			y,
			filter: "blur(8px)"
		},
		whileInView: {
			opacity: 1,
			y: 0,
			filter: "blur(0px)"
		},
		viewport: {
			once: true,
			margin: "-8% 0px"
		},
		transition: {
			duration: .7,
			delay,
			ease: ease$1
		},
		children
	});
}
function Stagger({ children, className, delay = 0 }) {
	const reduce = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className,
		initial: "hidden",
		whileInView: "show",
		viewport: {
			once: true,
			margin: "-8% 0px"
		},
		variants: {
			hidden: {},
			show: { transition: {
				staggerChildren: reduce ? 0 : .09,
				delayChildren: delay
			} }
		},
		children
	});
}
function StaggerItem({ children, className, ...props }) {
	const reduce = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: cn(className),
		variants: {
			hidden: reduce ? { opacity: 1 } : {
				opacity: 0,
				y: 16,
				filter: "blur(6px)"
			},
			show: {
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				transition: {
					duration: .6,
					ease: ease$1
				}
			}
		},
		...props,
		children
	});
}
var ease = [
	.22,
	1,
	.36,
	1
];
function PageHero({ kicker, title, lede, image, imageAlt, actions, compact }) {
	const reduce = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("relative isolate overflow-hidden bg-deep text-snow", compact ? "min-h-[70vh]" : "min-h-[88vh]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image,
				alt: imageAlt,
				className: cn("absolute inset-0 size-full object-cover", !reduce && "hero-kenburns")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-navy/92 via-deep/78 to-deep/35" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "noise-overlay" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("relative mx-auto flex max-w-[88rem] flex-col justify-end px-4 sm:px-6 lg:px-8", compact ? "min-h-[70vh] pb-16 pt-32" : "min-h-[88vh] pb-20 pt-36 lg:pb-24"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: reduce ? false : "hidden",
					animate: "show",
					variants: {
						hidden: {},
						show: { transition: {
							staggerChildren: .1,
							delayChildren: .08
						} }
					},
					className: "max-w-3xl",
					children: [
						kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							variants: item(reduce),
							className: "mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal",
							children: kicker
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							variants: item(reduce),
							className: "text-4xl font-semibold tracking-[-0.035em] text-snow sm:text-5xl lg:text-6xl lg:leading-[1.05]",
							children: title
						}),
						lede ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							variants: item(reduce),
							className: "mt-6 max-w-xl text-base leading-relaxed text-snow/80 sm:text-lg",
							children: lede
						}) : null,
						actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: item(reduce),
							className: "mt-8 flex flex-wrap gap-3",
							children: actions
						}) : null
					]
				})
			})
		]
	});
}
function item(reduce) {
	return {
		hidden: reduce ? { opacity: 1 } : {
			opacity: 0,
			y: 16,
			filter: "blur(8px)"
		},
		show: {
			opacity: 1,
			y: 0,
			filter: "blur(0px)",
			transition: {
				duration: .7,
				ease
			}
		}
	};
}
function Section({ children, className, id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		className: cn("py-20 lg:py-28", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8",
			children
		})
	});
}
function Kicker({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-xs font-semibold uppercase tracking-[0.22em] text-ocean", className),
		children
	});
}
//#endregion
export { Stagger as a, Section as i, PageHero as n, StaggerItem as o, Reveal as r, Kicker as t };
