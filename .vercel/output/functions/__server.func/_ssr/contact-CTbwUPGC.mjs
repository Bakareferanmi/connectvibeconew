import { i as __toESM } from "../_runtime.mjs";
import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as social, a as contactPathways, g as site, r as cn, t as Button } from "./site-data-kXW2ODfP.mjs";
import { i as Section, n as PageHero, r as Reveal } from "./section-DvpWWL1W.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Route$7 } from "./router-EYaHTJdF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CTbwUPGC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-12 w-full rounded-xl bg-paper px-4 text-base text-ink shadow-[inset_0_0_0_1px_rgba(11,27,51,0.12)] outline-none transition-[box-shadow] duration-150 placeholder:text-muted/80 focus-visible:shadow-[inset_0_0_0_2px_#007BFF]", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-sm font-medium text-deep", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-36 w-full resize-y rounded-xl bg-paper px-4 py-3 text-base text-ink shadow-[inset_0_0_0_1px_rgba(11,27,51,0.12)] outline-none transition-[box-shadow] duration-150 placeholder:text-muted/80 focus-visible:shadow-[inset_0_0_0_2px_#007BFF]", className),
		...props
	});
}
var STORAGE_KEY = "connectvibe.enquiries";
function ContactForm({ initialIntent }) {
	const initial = (0, import_react.useMemo)(() => {
		return contactPathways.find((p) => p.id === initialIntent)?.id ?? "general";
	}, [initialIntent]);
	const [pathway, setPathway] = (0, import_react.useState)(initial);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [organisation, setOrganisation] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setPathway(initial);
	}, [initial]);
	function onSubmit(e) {
		e.preventDefault();
		if (!name.trim() || !email.trim() || !message.trim()) {
			toast.error("Please add your name, email and a short message.");
			return;
		}
		const enquiry = {
			id: crypto.randomUUID(),
			at: (/* @__PURE__ */ new Date()).toISOString(),
			pathway,
			name: name.trim(),
			email: email.trim(),
			organisation: organisation.trim(),
			message: message.trim()
		};
		try {
			const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
			localStorage.setItem(STORAGE_KEY, JSON.stringify([enquiry, ...prev].slice(0, 20)));
		} catch {}
		setSent(true);
		toast.success("Message received. We’ll be in touch.");
	}
	if (sent) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-snow p-8 shadow-[var(--shadow-border)] sm:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-ocean",
				children: "Thank you"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-2xl font-semibold text-deep",
				children: "We’ve got it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 max-w-md text-muted",
				children: [
					"A note is with the team for your “",
					contactPathways.find((p) => p.id === pathway)?.title,
					"” enquiry. We aim to reply within three working days."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				variant: "outline",
				onClick: () => setSent(false),
				children: "Send another"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "rounded-3xl bg-snow p-5 shadow-[var(--shadow-border)] sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-deep",
				children: "What brings you in?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-2 sm:grid-cols-2",
				children: contactPathways.map((p) => {
					const active = pathway === p.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setPathway(p.id),
						className: cn("rounded-2xl p-4 text-left transition-[background-color,box-shadow,color] duration-150", active ? "bg-deep text-snow shadow-[var(--shadow-lift)]" : "bg-paper text-deep hover:bg-foam"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-semibold",
							children: p.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-1 block text-xs leading-relaxed", active ? "text-snow/70" : "text-muted"),
							children: p.text
						})]
					}, p.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							name: "name",
							autoComplete: "name",
							value: name,
							onChange: (e) => setName(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							name: "email",
							type: "email",
							autoComplete: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "org",
							children: "Organisation (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "org",
							name: "organisation",
							value: organisation,
							onChange: (e) => setOrganisation(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "message",
							children: "Message"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "message",
							name: "message",
							value: message,
							onChange: (e) => setMessage(e.target.value),
							required: true,
							placeholder: "Tell us about the place, the people, or the role."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "lg",
				className: "mt-6",
				children: "Send message"
			})
		]
	});
}
function ContactPage() {
	const { intent } = Route$7.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "Contact",
		title: "Six doors. One team.",
		lede: "Partner, support a project, volunteer, bring a community brief, ask about a career, or just say hello.",
		image: "/images/community-centre.jpg",
		imageAlt: "A civic community building and public square",
		compact: true
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-10 lg:grid-cols-12 lg:gap-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "lg:col-span-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-semibold tracking-tight text-deep",
					children: site.legalName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: site.charityLine
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `mailto:${site.email}`,
					className: "mt-6 inline-block text-base font-medium text-ocean",
					children: site.email
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-ocean",
					children: "Also"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/get-involved",
							className: "text-deep hover:text-ocean",
							children: "Get involved"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/careers",
							className: "text-deep hover:text-ocean",
							children: "Careers"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/events",
							className: "text-deep hover:text-ocean",
							children: "Events"
						}) })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-wrap gap-2",
					children: social.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: s.href,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex h-10 items-center rounded-full bg-snow px-3.5 text-sm font-medium text-deep shadow-[var(--shadow-border)] hover:bg-foam",
						children: s.label
					}, s.label))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:col-span-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, { initialIntent: intent })
		})]
	}) })] });
}
//#endregion
export { ContactPage as component };
