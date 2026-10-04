/** Server-only: store and read admin-uploaded images (see migrations/0003_images.sql). */
import { createHash } from "node:crypto";
import sharp from "sharp";
import { getSql } from "@/lib/db";

const MAX_INPUT_BYTES = 6 * 1024 * 1024;

/** Resize, compress and store one picture. Returns the public address, e.g. /media/ab12cd... */
export async function saveImage(name: string, base64: string): Promise<{ url: string; id: string }> {
  const input = Buffer.from(base64, "base64");
  if (!input.length) throw new Error("That file is empty");
  if (input.length > MAX_INPUT_BYTES) throw new Error("That picture is too large. Try one under 6 MB");

  let out: { data: Buffer; info: { width: number; height: number } };
  try {
    out = await sharp(input)
      .rotate() // respect the phone's orientation
      .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer({ resolveWithObject: true });
  } catch {
    throw new Error("That file isn't a picture we can read. Use a JPG, PNG or WebP image");
  }

  const id = createHash("sha256").update(out.data).digest("hex").slice(0, 24);
  const sql = await getSql();
  await sql`
    insert into images (id, name, mime, width, height, bytes, data_b64)
    values (${id}, ${name.slice(0, 120)}, 'image/webp', ${out.info.width}, ${out.info.height},
            ${out.data.length}, ${out.data.toString("base64")})
    on conflict (id) do nothing`;
  return { id, url: `/media/${id}` };
}

export async function readImage(id: string): Promise<{ mime: string; data: Buffer } | null> {
  if (!/^[a-f0-9]{24}$/.test(id)) return null;
  const sql = await getSql();
  const rows = await sql<{ mime: string; data_b64: string }>`
    select mime, data_b64 from images where id = ${id} limit 1`;
  return rows[0] ? { mime: rows[0].mime, data: Buffer.from(rows[0].data_b64, "base64") } : null;
}
