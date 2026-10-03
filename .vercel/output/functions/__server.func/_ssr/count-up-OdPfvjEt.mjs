import { i as __toESM } from "../_runtime.mjs";
import { Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as cn } from "./site-data-kXW2ODfP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/count-up-OdPfvjEt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CountUp({ value, prefix = "", suffix = "", decimals = 0, pad, className }) {
	const ref = (0, import_react.useRef)(null);
	const [shown, setShown] = (0, import_react.useState)(0);
	const [start, setStart] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([entry]) => {
			if (entry?.isIntersecting) {
				setStart(true);
				io.disconnect();
			}
		}, { threshold: .4 });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!start) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setShown(value);
			return;
		}
		const duration = 1400;
		const t0 = performance.now();
		let frame = 0;
		const tick = (now) => {
			const t = Math.min(1, (now - t0) / duration);
			const eased = 1 - Math.pow(1 - t, 3);
			setShown(value * eased);
			if (t < 1) frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [start, value]);
	const formatted = decimals > 0 ? shown.toFixed(decimals) : pad ? Math.round(shown).toString().padStart(pad, "0") : Math.round(shown).toString();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		className: cn("tabular-nums", className),
		children: [
			prefix,
			formatted,
			suffix
		]
	});
}
//#endregion
export { CountUp as t };
