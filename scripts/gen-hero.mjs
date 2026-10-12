// Pre-sizes the hero photos so the first screen is served straight from the CDN — no
// on-demand resizing on the very first view. AVIF (about half the size) with a WebP fallback.
// Run after changing a hero photo:  node scripts/gen-hero.mjs
import { mkdir, rm } from "node:fs/promises";
import sharp from "sharp";

const jobs = [
  { src: "public/images/hero-valley.webp", name: "valley", widths: [960, 1280, 1600] },
  { src: "public/images/hero-cottage.webp", name: "cottage", widths: [480, 750] },
];
await rm("public/images/hero", { recursive: true, force: true });
await mkdir("public/images/hero", { recursive: true });
for (const j of jobs) {
  for (const w of j.widths) {
    const base = sharp(j.src).resize({ width: w, withoutEnlargement: true });
    const a = await base.clone().avif({ quality: 45, effort: 6 }).toFile(`public/images/hero/${j.name}-${w}.avif`);
    const b = await base.clone().webp({ quality: 58 }).toFile(`public/images/hero/${j.name}-${w}.webp`);
    console.log(`${j.name}-${w}: avif ${Math.round(a.size / 1024)}KB · webp ${Math.round(b.size / 1024)}KB`);
  }
}
