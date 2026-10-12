"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { gallery, type GalleryItem } from "@/lib/site";
import { ChevronIcon, CloseIcon } from "./icons";

const tabs = ["All", "Resort", "Rooms", "Evenings"] as const;

export default function Gallery() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
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
    <section id="gallery" className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6" data-reveal>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Gallery</p>
            <h2 className="font-display text-4xl font-light text-forest md:text-6xl">A look around.</h2>
          </div>
          <div className="flex gap-1 rounded-full bg-sand p-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  tab === t ? "bg-forest text-white" : "text-ink/70 hover:text-forest"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
          {items.map((g, i) => (
            <button
              key={g.src}
              onClick={() => setLightbox(i)}
              className="group relative mb-3 block w-full overflow-hidden rounded-2xl md:mb-4"
            >
              <Image
                src={g.src}
                alt={g.alt}
                width={700}
                height={i % 3 === 0 ? 900 : 560}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                  i % 3 === 0 ? "aspect-[4/5]" : "aspect-[5/4]"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && items[lightbox] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Photo viewer"
        >
          <button className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white" aria-label="Close">
            <CloseIcon className="size-6" />
          </button>
          <button
            onClick={(e) => (e.stopPropagation(), step(-1))}
            className="absolute left-3 z-10 rotate-180 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronIcon />
          </button>
          <div className="relative h-[80vh] w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image src={items[lightbox].src} alt={items[lightbox].alt} fill sizes="100vw" className="object-contain" />
          </div>
          <button
            onClick={(e) => (e.stopPropagation(), step(1))}
            className="absolute right-3 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronIcon />
          </button>
          <p className="absolute inset-x-0 bottom-5 text-center text-sm text-white/70">
            {items[lightbox].alt} · {lightbox + 1}/{items.length}
          </p>
        </div>
      )}
    </section>
  );
}
