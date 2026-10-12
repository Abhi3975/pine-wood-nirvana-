"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Img from "@/components/Img";
import { gallery, socials, type GalleryItem } from "@/lib/site";
import { ChevronIcon, CloseIcon, InstagramIcon } from "./icons";

const tabs = ["All", "Resort", "Rooms", "Evenings"] as const;

export default function Gallery() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false); // phones start with 6 photos
  const touchX = useRef<number | null>(null);
  const items: GalleryItem[] = tab === "All" ? gallery : gallery.filter((g) => g.tag === tab);

  const step = useCallback(
    (d: number) => setLightbox((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, step]);

  return (
    <section id="gallery" className="px-4 py-16 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6" data-reveal>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Gallery</p>
            <h2 className="font-display text-3xl font-light text-forest md:text-5xl">A look around.</h2>
            <a
              href={socials.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            >
              <InstagramIcon className="size-4" /> Follow {socials.instagram.handle}
            </a>
          </div>
          <div className="flex gap-1 rounded-full bg-sand p-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`min-h-10 rounded-full px-4 py-2 text-sm font-medium transition ${
                  tab === t ? "bg-forest text-white" : "text-ink/70 hover:text-forest"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {items.map((g, i) => (
            <button
              key={g.src}
              onClick={() => setLightbox(i)}
              className={`group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl ${
                !showAll && i >= 6 ? "hidden md:block" : ""
              }`}
            >
              <Img
                src={g.src}
                alt={g.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
        {!showAll && items.length > 6 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-5 w-full rounded-2xl bg-white py-3.5 font-semibold text-forest ring-1 ring-forest/15 md:hidden"
          >
            Show all {items.length} photos
          </button>
        )}
      </div>

      {lightbox !== null && items[lightbox] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Photo viewer"
          data-lenis-prevent
          // Swipe left/right to move between photos on phones.
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
        >
          <button className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white" aria-label="Close">
            <CloseIcon className="size-6" />
          </button>
          <button
            onClick={(e) => (e.stopPropagation(), step(-1))}
            className="absolute left-3 z-10 hidden rotate-180 rounded-full md:block bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronIcon />
          </button>
          <div className="relative h-[75vh] w-full max-w-6xl md:h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Img src={items[lightbox].src} alt={items[lightbox].alt} fill sizes="100vw" className="object-contain" />
          </div>
          <button
            onClick={(e) => (e.stopPropagation(), step(1))}
            className="absolute right-3 z-10 hidden rounded-full md:block bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronIcon />
          </button>
          <p className="absolute inset-x-0 bottom-5 text-center text-sm text-white/70">
            {items[lightbox].alt} · {lightbox + 1}/{items.length}
            <span className="block text-xs text-white/40 md:hidden">Swipe for more</span>
          </p>
        </div>
      )}
    </section>
  );
}
