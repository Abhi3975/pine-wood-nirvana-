"use client";

import { preload } from "react-dom";
import blur from "@/lib/blur.json";
import { openConcierge } from "./Concierge";
import { openFilm } from "./Film";
import { PinIcon, PlayIcon, StarIcon, WhatsAppIcon } from "./icons";

const previews = blur as Record<string, string>;
const heroAlt = "Sunset over the Shimla hills seen through the pines at Pine Wood Nirvana";

// Pre-sized files (scripts/gen-hero.mjs) served straight from the CDN, so the first screen
// never waits on on-demand image resizing.
const desktopSet = "/images/hero/valley-960.webp 960w, /images/hero/valley-1440.webp 1440w, /images/hero/valley-1920.webp 1920w";
const mobileSet = "/images/hero/cottage-480.webp 480w, /images/hero/cottage-750.webp 750w, /images/hero/cottage-1080.webp 1080w";

/** Landscape valley view on wide screens, the red-roof cottage at sunset on phones. */
function HeroPicture() {
  // Ask the browser to fetch the right hero photo before anything else on the page.
  preload("/images/hero/valley-1440.webp", { as: "image", imageSrcSet: desktopSet, imageSizes: "100vw", media: "(min-width: 768px)", fetchPriority: "high" });
  preload("/images/hero/cottage-750.webp", { as: "image", imageSrcSet: mobileSet, imageSizes: "100vw", media: "(max-width: 767px)", fetchPriority: "high" });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSet} sizes="100vw" />
      <source srcSet={mobileSet} sizes="100vw" />
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
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest text-white">
      <HeroPicture />
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-black/35 md:via-forest/40 md:to-black/20" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-32 md:px-8 md:pb-20">
        <p className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium tracking-wide ring-1 ring-white/20 backdrop-blur">
          <PinIcon className="size-3.5" /> Village Paughat · Shoghi · Shimla
        </p>
        <h1
          className="animate-fade-up max-w-4xl font-display text-[2.4rem] leading-[0.95] font-light tracking-tight sm:text-5xl md:text-6xl"
          style={{ animationDelay: "120ms" }}
        >
          Wake up <em className="font-normal text-sunset">in the pines.</em>
        </h1>
        <p
          className="animate-fade-up mt-6 max-w-xl text-[15px] md:text-base text-white/85 md:text-xl"
          style={{ animationDelay: "240ms" }}
        >
          Luxury cottages, a forest-edge pool and bonfire nights — tucked 2.5 km off the Shoghi highway, away from the
          noise of the city.
        </p>

        <div className="animate-fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
          <button
            onClick={() => openConcierge()}
            className="flex items-center gap-2.5 rounded-full bg-sunset px-7 py-4 font-semibold shadow-xl shadow-sunset/30 transition hover:-translate-y-0.5 hover:bg-ember"
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
          className="animate-fade-up mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/15 pt-7 sm:grid-cols-4"
          style={{ animationDelay: "480ms" }}
        >
          {[
            ["3", "cottage styles"],
            ["Pool", "with valley views"],
            ["Pet", "friendly stays"],
          ].map(([k, v]) => (
            <div key={v}>
              <dt className="font-display text-3xl">{k}</dt>
              <dd className="text-sm text-white/65">{v}</dd>
            </div>
          ))}
          <div>
            <dt className="flex items-center gap-1 font-display text-3xl">
              4.8 <StarIcon className="size-5 text-sunset" />
            </dt>
            <dd className="text-sm text-white/65">GhumoG guest rating</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
