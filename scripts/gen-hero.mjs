// Pre-sizes the hero photos so the first screen is served straight from the CDN — no
// on-demand image resizing on the very first view. Run after changing a hero photo:
//   node scripts/gen-hero.mjs
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const jobs = [
  { src: "public/images/hero-valley.webp", name: "valley", widths: [960, 1440, 1920] },
  { src: "public/images/hero-cottage.webp", name: "cottage", widths: [480, 750, 1080] },
];
await mkdir("public/images/hero", { recursive: true });
for (const j of jobs) {
  for (const w of j.widths) {
    const out = `public/images/hero/${j.name}-${w}.webp`;
    const info = await sharp(j.src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 68 }).toFile(out);
    console.log(out, Math.round(info.size / 1024) + "KB");
  }
}
