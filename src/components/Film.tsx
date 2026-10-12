"use client";

import { useEffect, useState } from "react";
import Img from "@/components/Img";
import { site } from "@/lib/site";
import { CloseIcon, PlayIcon } from "./icons";

const FILM_EVENT = "film:open";
export const openFilm = () => window.dispatchEvent(new Event(FILM_EVENT));

const embed = `https://www.youtube-nocookie.com/embed/${site.youtubeId}?autoplay=1&rel=0&modestbranding=1`;

/** Section with a poster; the YouTube player only loads when someone presses play. */
export default function Film() {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const on = () => setModal(true);
    window.addEventListener(FILM_EVENT, on);
    return () => window.removeEventListener(FILM_EVENT, on);
  }, []);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModal(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modal]);

  return (
    <section id="film" className="bg-forest px-4 py-16 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6" data-reveal>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">The film</p>
            <h2 className="max-w-xl font-display text-3xl font-light md:text-5xl">Take a walk through the forest.</h2>
          </div>
          <p className="max-w-sm text-white/70">
            Two minutes from the lantern-lit pathways to the pool deck — see the resort before you arrive.
          </p>
        </div>

        <button
          onClick={() => setModal(true)}
          className="group relative block aspect-video w-full overflow-hidden rounded-3xl"
          aria-label="Play resort film"
          data-reveal
        >
          <Img
            src="/images/fairy-lights.webp"
            alt="Fairy-lit forest path at Pine Wood Nirvana"
            fill
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/30 transition group-hover:bg-black/20" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="relative grid size-20 place-items-center rounded-full bg-white text-forest shadow-2xl md:size-24">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
              <PlayIcon className="relative size-8 translate-x-0.5" />
            </span>
          </span>
        </button>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-4"
          onClick={() => setModal(false)}
          role="dialog"
          aria-label="Resort film"
          data-lenis-prevent
        >
          <button
            onClick={() => setModal(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
            aria-label="Close video"
          >
            <CloseIcon className="size-6" />
          </button>
          <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={embed}
              title="Pine Wood Nirvana Jungle Resort"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="size-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
