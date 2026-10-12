"use client";

import { useState } from "react";
import Image from "next/image";
import { resortReels, videoTestimonials, waHref } from "@/lib/site";
import { PlayIcon, QuoteIcon, WhatsAppIcon } from "./icons";

type Card = { id: string; heading: string; sub: string; quote?: string; guest: boolean };

const cards: Card[] = [
  ...videoTestimonials.map((v) => ({ id: v.id, heading: v.name, sub: v.trip, quote: v.quote, guest: true })),
  ...resortReels.map((r) => ({ id: r.id, heading: r.title, sub: r.caption, guest: false })),
];

/** Vertical, phone-style video cards. The YouTube player only loads when someone taps play. */
export default function VideoStories() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section id="stories" className="bg-forest py-16 text-white md:py-28">
      <div className="mx-auto mb-10 grid max-w-7xl gap-5 px-4 md:mb-14 md:grid-cols-2 md:items-end md:px-8" data-reveal>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Guest stories</p>
          <h2 className="font-display text-4xl font-light md:text-6xl">See it, hear it, feel it.</h2>
        </div>
        <p className="text-lg text-white/70 md:pb-2">
          {videoTestimonials.length
            ? "Short videos from Pine Wood Nirvana — and from the guests who've stayed with us. Tap to play."
            : "Short videos from Pine Wood Nirvana — tap to play. Stayed with us? Your story could be next."}
        </p>
      </div>

      <ul
        className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:gap-6 md:px-8"
        data-reveal
      >
        {cards.map((c) => (
          <li key={c.id} className="w-[72%] shrink-0 snap-start sm:w-[45%] md:w-[300px]">
            <div className="relative aspect-[9/16] overflow-hidden rounded-3xl bg-black ring-1 ring-white/10">
              {playing === c.id ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${c.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={c.heading}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 size-full"
                />
              ) : (
                <button onClick={() => setPlaying(c.id)} className="group absolute inset-0 text-left" aria-label={`Play: ${c.heading}`}>
                  <Image
                    src={`https://i.ytimg.com/vi/${c.id}/hqdefault.jpg`}
                    alt=""
                    fill
                    sizes="300px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
                  <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-forest shadow-2xl transition group-hover:scale-110">
                    <PlayIcon className="size-6 translate-x-0.5" />
                  </span>
                  {c.guest && (
                    <span className="absolute left-4 top-4 rounded-full bg-sunset px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      Guest
                    </span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 p-5">
                    {c.quote && <span className="mb-2 block font-display text-lg leading-snug">&ldquo;{c.quote}&rdquo;</span>}
                    <span className="block font-semibold">{c.heading}</span>
                    <span className="block text-sm text-white/65">{c.sub}</span>
                  </span>
                </button>
              )}
            </div>
          </li>
        ))}

        {/* Invite guests to add their own story */}
        <li className="w-[72%] shrink-0 snap-start sm:w-[45%] md:w-[300px]">
          <div className="flex aspect-[9/16] flex-col justify-between rounded-3xl border border-dashed border-white/25 bg-white/5 p-6">
            <QuoteIcon className="size-10 text-sunset" />
            <div>
              <h3 className="font-display text-2xl leading-snug">Stayed with us? Share your story.</h3>
              <p className="mt-3 text-sm text-white/65">
                Send us a short video from your stay — the pool, the bonfire, your favourite moment — and we&apos;ll
                feature it here.
              </p>
              <a
                href={waHref("Hi! I stayed at Pine Wood Nirvana and I'd love to share a video of my stay.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold hover:bg-[#1ebe5a]"
              >
                <WhatsAppIcon className="size-4" /> Send your video
              </a>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}
