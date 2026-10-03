import { n as format, t as parseISO } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dates-BG5zqnfI.js
function formatDate(iso, pattern = "d MMMM yyyy") {
	return format(parseISO(iso), pattern);
}
//#endregion
export { formatDate as t };
