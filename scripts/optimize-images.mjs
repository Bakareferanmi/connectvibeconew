// Converts every .jpg/.jpeg/.png in public/images to WebP (max 1600px wide)
// and removes the original. Run: node scripts/optimize-images.mjs
import { readdir, stat, unlink } from "node:fs/promises";
import { extname, join, basename } from "node:path";
import sharp from "sharp";

const dir = "public/images";
const MAX_WIDTH = 1600;
const QUALITY = 78;

let before = 0;
let after = 0;

for (const file of await readdir(dir)) {
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
  const input = join(dir, file);
  const output = join(dir, `${basename(file, extname(file))}.webp`);
  await sharp(input)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(output);
  const a = (await stat(input)).size;
  const b = (await stat(output)).size;
  before += a;
  after += b;
  await unlink(input);
  console.log(`${file}  ${(a / 1024).toFixed(0)} KB  ->  ${basename(output)}  ${(b / 1024).toFixed(0)} KB`);
}

console.log(`\nTotal: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);