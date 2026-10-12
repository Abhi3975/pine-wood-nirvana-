// Generates tiny blurred previews for every photo so images fade in
// instead of popping in on slow connections. Run after adding photos:
//   node scripts/gen-blur.mjs
import { readdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const dir = "public/images";
const out = {};
for (const f of (await readdir(dir)).sort()) {
  if (!f.endsWith(".webp") || f.startsWith("logo")) continue;
  const buf = await sharp(`${dir}/${f}`).resize(16).webp({ quality: 40 }).toBuffer();
  out[`/images/${f}`] = `data:image/webp;base64,${buf.toString("base64")}`;
}
await writeFile("src/lib/blur.json", JSON.stringify(out, null, 1) + "\n");
console.log(`wrote ${Object.keys(out).length} placeholders`);
