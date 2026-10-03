import { Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as cn } from "./site-data-kXW2ODfP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-ymJJhtLM.js
var import_jsx_runtime = require_jsx_runtime();
function Media({ src, alt, className, framed = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt,
		className: cn("object-cover", framed && "media-frame", className)
	});
}
//#endregion
export { Media as t };
