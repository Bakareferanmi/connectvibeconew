/**
 * Server-only: builds a 1200x630 share image for an event or project.
 * Photo (cover) + dark gradient + logo + title, drawn with satori (text to
 * vector paths, so no system fonts are needed) and composited with sharp.
 */
import satori from "satori";
import sharp from "sharp";
import fontBoldUri from "@fontsource/poppins/files/poppins-latin-700-normal.woff?inline";
import fontMediumUri from "@fontsource/poppins/files/poppins-latin-500-normal.woff?inline";

const W = 1200;
const H = 630;

const toBuffer = (dataUri: string) => Buffer.from(dataUri.slice(dataUri.indexOf(",") + 1), "base64");
const fontBold = toBuffer(fontBoldUri);
const fontMedium = toBuffer(fontMediumUri);

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
<path d="M58.8 18.2C51.4 11.2 40.6 9.8 31.6 14.8C20.2 21.2 14.8 35.2 19.8 47.2C24.6 58.4 37.2 64.8 49.6 61.2" stroke="#7FD9FF" stroke-width="9.5" stroke-linecap="round"/>
<rect x="27.5" y="42" width="7" height="14" rx="1.6" fill="#F4F7FA"/>
<rect x="36" y="34.5" width="7" height="21.5" rx="1.6" fill="#F4F7FA"/>
<rect x="44.5" y="27" width="7" height="29" rx="1.6" fill="#F4F7FA"/>
<path d="M55.2 25.8c3.2 4.6 2.8 10.6-1 14.4-4.4-1.8-8.2-5.4-9.8-10.2 3.6-3.6 7.2-5 10.8-4.2z" fill="#2ECC71"/>
</svg>`;
const LOGO_URI = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString("base64")}`;

type Style = Record<string, string | number>;
type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Style, ...children: (Node | string)[]): Node => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children },
});

export type ShareImageInput = {
  kicker: string;
  title: string;
  meta: string;
  /** Absolute URL of the photo to use as background (optional). */
  photoUrl?: string;
};

async function fetchPhoto(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

export async function buildShareImage(input: ShareImageInput): Promise<Buffer> {
  const title = input.title.length > 90 ? `${input.title.slice(0, 87)}...` : input.title;
  const titleSize = title.length <= 28 ? 78 : title.length <= 48 ? 66 : 54;

  const tree = h(
    "div",
    {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: W,
      height: H,
      padding: 64,
      fontFamily: "Poppins",
      backgroundImage:
        "linear-gradient(100deg, rgba(0,26,69,0.94) 0%, rgba(0,45,107,0.80) 58%, rgba(0,45,107,0.30) 100%)",
    },
    h(
      "div",
      { display: "flex", alignItems: "center" },
      { type: "img", props: { src: LOGO_URI, width: 60, height: 60 } },
      h(
        "div",
        { display: "flex", marginLeft: 16, fontSize: 36, fontWeight: 700, color: "#ffffff" },
        "connectvibe",
        h("span", { color: "#00bfa6" }, "co"),
      ),
    ),
    h(
      "div",
      { display: "flex", flexDirection: "column", maxWidth: 940 },
      h(
        "div",
        { display: "flex", fontSize: 26, fontWeight: 500, color: "#00bfa6", letterSpacing: 4, textTransform: "uppercase" },
        input.kicker,
      ),
      h(
        "div",
        { display: "flex", marginTop: 18, fontSize: titleSize, fontWeight: 700, color: "#ffffff", lineHeight: 1.08 },
        title,
      ),
      h(
        "div",
        { display: "flex", marginTop: 22, fontSize: 28, fontWeight: 500, color: "rgba(255,255,255,0.82)" },
        input.meta,
      ),
    ),
  );

  const svg = await satori(tree as never, {
    width: W,
    height: H,
    fonts: [
      { name: "Poppins", data: fontBold, weight: 700, style: "normal" },
      { name: "Poppins", data: fontMedium, weight: 500, style: "normal" },
    ],
  });
  const overlay = await sharp(Buffer.from(svg)).png().toBuffer();

  const photo = input.photoUrl ? await fetchPhoto(input.photoUrl) : null;
  const base = photo
    ? sharp(photo).resize(W, H, { fit: "cover" })
    : sharp({ create: { width: W, height: H, channels: 3, background: "#002d6b" } });

  return base.composite([{ input: overlay }]).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}
