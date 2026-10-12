"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryVideos, socials, type GalleryVideo } from "@/lib/site";
import { PlayIcon, YouTubeIcon } from "./icons";

const tabs = ["The resort", "Around Shimla", "Snow season"] as const;
const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** One big player plus a strip of thumbnails. YouTube only loads once someone presses play. */
export default function VideoGallery() {
  const [tab, setTab] = useState<GalleryVideo["tag"]>("The resort");
  const list = galleryVideos.filter((v) => v.tag === tab);
  const [current, setCurrent] = useState<GalleryVideo>(list[0]);
  const [playing, setPlaying] = useState(false);

  const pick = (v: GalleryVideo) => {
    setCurrent(v);
    setPlaying(true);
  };

  return (
    <section id="videos" className="bg-forest py-16 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-10" data-reveal>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Video gallery</p>
            <h2 className="font-display text-4xl font-light md:text-6xl">Watch before you go.</h2>
          </div>
          <div className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full bg-white/10 p-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setCurrent(galleryVideos.find((v) => v.tag === t)!);
                  setPlaying(false);
                }}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  tab === t ? "bg-cream text-forest" : "text-white/75 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Main player */}
        <div className="relative aspect-video overflow-hidden rounded-3xl bg-black" data-reveal>
          {playing ? (
            <iframe
              key={current.id}
              src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={current.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          ) : (
            <button onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play: ${current.title}`}>
              <Image src={thumb(current.id)} alt="" fill sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />
              <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-forest shadow-2xl transition group-hover:scale-110 md:size-20">
                <PlayIcon className="size-7 translate-x-0.5" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-5 text-left font-display text-xl md:p-8 md:text-3xl">{current.title}</span>
            </button>
          )}
        </div>

        {/* Thumbnails */}
        <ul className="no-scrollbar mt-4 flex snap-x gap-3 overflow-x-auto pb-1 md:mt-5 md:gap-4">
          {list.map((v) => (
            <li key={v.id} className="w-[46%] shrink-0 snap-start sm:w-[30%] lg:w-[23%]">
              <button
                onClick={() => pick(v)}
                aria-current={v.id === current.id}
                className={`group block w-full text-left transition ${v.id === current.id ? "" : "opacity-70 hover:opacity-100"}`}
              >
                <span
                  className={`relative block aspect-video overflow-hidden rounded-xl ring-2 ${
                    v.id === current.id ? "ring-sunset" : "ring-transparent"
                  }`}
                >
                  <Image src={thumb(v.id)} alt="" fill sizes="(min-width: 1024px) 23vw, (min-width: 640px) 30vw, 46vw" className="object-cover" />
                  <span className="absolute inset-0 grid place-items-center bg-black/20">
                    <span className="grid size-9 place-items-center rounded-full bg-white/90 text-forest">
                      <PlayIcon className="size-4 translate-x-px" />
                    </span>
                  </span>
                </span>
                <span className="mt-2 line-clamp-2 block text-sm text-white/85">{v.title}</span>
              </button>
            </li>
          ))}
        </ul>

        <a
          href={socials.youtube.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ff0033] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          <YouTubeIcon /> More on YouTube {socials.youtube.handle}
        </a>
      </div>
    </section>
  );
}
