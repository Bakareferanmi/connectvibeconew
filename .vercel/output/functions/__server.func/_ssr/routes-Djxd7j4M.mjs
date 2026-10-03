import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as upcomingEvents, g as site, h as projects, m as pillars, n as approach, t as Button, v as stats, y as stories } from "./site-data-kXW2ODfP.mjs";
import { a as Stagger, i as Section, n as PageHero, o as StaggerItem, r as Reveal, t as Kicker } from "./section-DvpWWL1W.mjs";
import { d as Building2, m as ArrowRight, n as Users, o as Leaf, p as ArrowUpRight, u as Earth } from "../_libs/lucide-react.mjs";
import { t as CtaBand } from "./cta-band-BDJ_V0su.mjs";
import { t as Media } from "./media-ymJJhtLM.mjs";
import { t as formatDate } from "./dates-BG5zqnfI.mjs";
import { t as CountUp } from "./count-up-OdPfvjEt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Djxd7j4M.js
var import_jsx_runtime = require_jsx_runtime();
var approachIcons = {
	Build: Building2,
	Connect: Users,
	Empower: Leaf,
	Sustain: Earth
};
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Sustainable infrastructure · Community · Opportunity",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Building what",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-teal",
					children: "communities"
				}),
				" need."
			] }),
			lede: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Sustainable infrastructure. Stronger communities. Better opportunities.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-3 block text-snow/70",
				children: site.description
			})] }),
			image: "/images/hero.jpg",
			imageAlt: "A sustainable mixed-use neighbourhood at golden hour, with timber buildings, gardens and a city skyline beyond",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "onDarkSolid",
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/projects",
					children: ["Explore our work", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "onDark",
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/get-involved",
					children: "Get involved"
				})
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Our approach" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-5xl",
			children: "Infrastructure should do more than stand. It should create opportunity."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
			className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			delay: .1,
			children: approach.map((item) => {
				const Icon = approachIcons[item.key];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StaggerItem, {
					className: "rounded-2xl bg-snow p-6 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-300 ease-[var(--ease-out-smooth)] hover:-translate-y-1 hover:shadow-[var(--shadow-border-hover)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex size-11 items-center justify-center rounded-xl bg-foam text-ocean",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: 1.75
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 text-lg font-semibold uppercase tracking-[0.14em] text-deep",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: item.text
						})
					]
				}, item.key);
			})
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			className: "bg-snow pt-0 lg:pt-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "What we do" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl",
					children: "Four ways we show up."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/what-we-do",
							children: ["See what we do", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4",
				children: pillars.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * .06,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/what-we-do",
						hash: p.slug,
						className: "group flex h-full flex-col overflow-hidden rounded-2xl bg-paper shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-300 ease-[var(--ease-out-smooth)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[5/4] overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
								src: p.image,
								alt: "",
								framed: false,
								className: "size-full transition-transform duration-700 ease-[var(--ease-out-smooth)] group-hover:scale-105"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-4 top-4 rounded-full bg-deep/80 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-snow backdrop-blur-sm",
								children: p.kicker
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-semibold text-deep",
									children: p.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 flex-1 text-sm leading-relaxed text-muted",
									children: p.summary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-ocean",
									children: ["Learn more", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" })]
								})
							]
						})]
					})
				}, p.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative isolate overflow-hidden bg-deep py-20 text-snow lg:py-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/aerial.jpg",
					alt: "",
					className: "absolute inset-0 size-full object-cover opacity-40"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-navy/90 via-deep/80 to-deep/70" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, {
							className: "text-teal",
							children: "Impact that can be seen"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 max-w-xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl",
							children: "Numbers we will still be proud of in ten years."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4",
							children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-snow/20 pt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-4xl font-semibold tracking-tight text-snow sm:text-5xl",
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "onDark",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/impact",
									children: ["Read the impact", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							})
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Featured projects" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 max-w-xl text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl",
				children: "From ideas to places people can use."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/projects",
					children: ["View all projects", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-4 md:grid-cols-2",
			children: projects.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * .05,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/projects/$slug",
					params: { slug: p.slug },
					className: "group relative isolate block overflow-hidden rounded-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
							src: p.image,
							alt: p.title,
							framed: false,
							className: "aspect-[16/10] w-full transition-transform duration-700 ease-[var(--ease-out-smooth)] group-hover:scale-105"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 p-6 text-snow",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-teal",
									children: [
										p.number,
										" · ",
										p.theme
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 text-2xl font-semibold tracking-tight",
									children: p.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-snow/75",
									children: [
										p.place,
										" · ",
										p.year
									]
								})
							]
						})
					]
				})
			}, p.slug))
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			className: "bg-snow",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
						src: "/images/skills.jpg",
						alt: "Adults in a community skills workshop",
						className: "h-64 w-full rounded-2xl sm:h-80"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
						src: "/images/housing.jpg",
						alt: "Climate-resilient community housing",
						className: "mt-8 h-64 w-full rounded-2xl sm:h-80"
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: .1,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Community & people" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl",
							children: "Community at the heart of everything."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-base leading-relaxed text-muted",
							children: "Programmes, volunteering, youth, women, skills and local enterprise. The building is never the whole story — the people who will run it write the brief."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 flex flex-wrap gap-2",
							children: [
								"Community programmes",
								"Volunteering",
								"Youth",
								"Women",
								"Skills",
								"Local enterprise"
							].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-full bg-foam px-3 py-1.5 text-sm font-medium text-deep",
								children: t
							}, t))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/community",
								children: ["Join the community", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Upcoming events" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl",
				children: "Rooms you can walk into."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/events",
					children: ["View all events", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-4 md:grid-cols-3",
			children: upcomingEvents.slice(0, 3).map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * .06,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/events/$slug",
					params: { slug: e.slug },
					className: "group flex h-full flex-col rounded-2xl bg-snow p-2 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-border-hover)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
						src: e.image,
						alt: "",
						className: "aspect-[16/10] w-full rounded-xl"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col px-3 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-[0.16em] text-ocean",
								children: formatDate(e.date, "d MMM yyyy")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-lg font-semibold text-deep",
								children: e.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									e.city,
									" · ",
									e.place
								]
							})
						]
					})]
				})
			}, e.slug))
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative isolate overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/careers.jpg",
					alt: "A construction professional looking out over a timber building site at dusk",
					className: "absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-navy/92 via-deep/80 to-deep/40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mx-auto grid min-h-[28rem] max-w-[88rem] items-center px-4 py-20 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						className: "max-w-xl text-snow",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, {
								className: "text-teal",
								children: "Careers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl",
								children: "Build your career. Build a better future."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-snow/75",
								children: "Engineering · Project management · Community · and more. Paid roles, apprenticeships and volunteering — all of it real work."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "onDarkSolid",
								className: "mt-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/careers",
									children: ["View opportunities", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
								})
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			className: "bg-paper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Stories & updates" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-3xl font-semibold tracking-[-0.03em] text-deep sm:text-4xl",
				children: "Field notes from the work."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 md:grid-cols-3",
				children: stories.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * .06,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex h-full flex-col overflow-hidden rounded-2xl bg-snow shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
							src: s.image,
							alt: "",
							className: "aspect-[16/10] w-full"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col p-5",
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
					})
				}, s.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { Home as component };
