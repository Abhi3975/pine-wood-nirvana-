"use client";

import { preload } from "react-dom";
import blur from "@/lib/blur.json";
import { openConcierge } from "./Concierge";
import { openFilm } from "./Film";
import { PinIcon, PlayIcon, StarIcon, WhatsAppIcon } from "./icons";

const previews = blur as Record<string, string>;
const heroAlt = "Sunset over the Shimla hills seen through the pines at Pine Wood Nirvana";

// Pre-sized files (scripts/gen-hero.mjs) served straight from the CDN, so the first screen
// never waits on on-demand resizing. AVIF first (about half the size), WebP as a fallback.
const set = (name: string, widths: number[], ext: string) =>
  widths.map((w) => `/images/hero/${name}-${w}.${ext} ${w}w`).join(", ");
const desktop = { avif: set("valley", [960, 1280, 1600], "avif"), webp: set("valley", [960, 1280, 1600], "webp") };
// Phones top out at 750px: under the dark overlay it looks identical and stays light.
const mobile = { avif: set("cottage", [480, 750], "avif"), webp: set("cottage", [480, 750], "webp") };

/** Landscape valley view on wide screens, the red-roof cottage at sunset on phones. */
function HeroPicture() {
  // Ask the browser to fetch the right hero photo before anything else on the page.
  preload("/images/hero/valley-1280.avif", { as: "image", type: "image/avif", imageSrcSet: desktop.avif, imageSizes: "100vw", media: "(min-width: 768px)", fetchPriority: "high" });
  preload("/images/hero/cottage-750.avif", { as: "image", type: "image/avif", imageSrcSet: mobile.avif, imageSizes: "100vw", media: "(max-width: 767px)", fetchPriority: "high" });
  return (
    <picture>
      <source media="(min-width: 768px)" type="image/avif" srcSet={desktop.avif} sizes="100vw" />
      <source media="(min-width: 768px)" type="image/webp" srcSet={desktop.webp} sizes="100vw" />
      <source type="image/avif" srcSet={mobile.avif} sizes="100vw" />
      <source type="image/webp" srcSet={mobile.webp} sizes="100vw" />
      {/* Blurred previews paint instantly while the full photo downloads. */}
      <img
        src="/images/hero/cottage-750.webp"
        alt={heroAlt}
        fetchPriority="high"
        decoding="async"
        className="animate-kenburns absolute inset-0 size-full bg-[image:var(--blur-m)] bg-cover object-cover md:bg-[image:var(--blur-d)]"
        style={
          {
            "--blur-m": `url(${previews["/images/hero-cottage.webp"]})`,
            "--blur-d": `url(${previews["/images/hero-valley.webp"]})`,
          } as React.CSSProperties
        }
      />
    </picture>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[78svh] items-end overflow-hidden bg-forest text-white md:min-h-[86vh]">
      <HeroPicture />
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-black/35 md:via-forest/40 md:to-black/20" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-28 md:px-8 md:pb-16">
        <p className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium tracking-wide ring-1 ring-white/20 backdrop-blur">
          <PinIcon className="size-3.5" /> Village Paughat · Shoghi · Shimla
        </p>
        <h1
          className="animate-fade-up max-w-4xl font-display text-[2.15rem] leading-[0.95] font-light tracking-tight sm:text-5xl md:text-[3.4rem]"
          style={{ animationDelay: "120ms" }}
        >
          Wake up <em className="font-normal text-sunset">in the pines.</em>
        </h1>
        <p
          className="animate-fade-up mt-4 max-w-xl text-[15px] text-white/85 md:mt-5 md:text-base"
          style={{ animationDelay: "240ms" }}
        >
          Luxury cottages, a forest-edge pool and bonfire nights — tucked 2.5 km off the Shoghi highway, away from the
          noise of the city.
        </p>

        <div className="animate-fade-up mt-7 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
          <button
            onClick={() => openConcierge()}
            className="flex items-center gap-2.5 rounded-full bg-sunset px-6 py-3.5 font-semibold shadow-xl shadow-sunset/30 transition hover:-translate-y-0.5 hover:bg-ember"
          >
            <WhatsAppIcon /> Check availability
          </button>
          <button
            onClick={openFilm}
            className="flex items-center gap-3 rounded-full bg-white/10 py-2 pl-2 pr-6 font-semibold ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20"
          >
            <span className="grid size-10 place-items-center rounded-full bg-white text-forest">
              <PlayIcon className="size-4 translate-x-px" />
            </span>
            Watch the film
          </button>
        </div>

        <dl
          className="animate-fade-up mt-10 hidden max-w-3xl grid-cols-4 gap-x-8 border-t border-white/15 pt-6 sm:grid"
          style={{ animationDelay: "480ms" }}
        >
          {[
            ["3", "cottage styles"],
            ["Pool", "with valley views"],
            ["Pet", "friendly stays"],
          ].map(([k, v]) => (
            <div key={v}>
              <dt className="font-display text-2xl">{k}</dt>
              <dd className="text-sm text-white/65">{v}</dd>
            </div>
          ))}
          <div>
            <dt className="flex items-center gap-1 font-display text-2xl">
              4.8 <StarIcon className="size-5 text-sunset" />
            </dt>
            <dd className="text-sm text-white/65">GhumoG guest rating</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
