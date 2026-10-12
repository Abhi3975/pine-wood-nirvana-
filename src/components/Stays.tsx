"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { stays, type Stay } from "@/lib/site";
import { openConcierge } from "./Concierge";
import { CheckIcon, ChevronIcon, UsersIcon, WhatsAppIcon } from "./icons";

export default function Stays() {
  return (
    <section id="stays" className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl" data-reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Stays</p>
          <h2 className="font-display text-4xl font-light text-forest md:text-6xl">Three ways to stay in the forest.</h2>
          <p className="mt-5 text-lg text-ink/70">
            Every cottage sits among tall pines with its own path, its own view and nothing but birdsong for company.
            Pick one — we&apos;ll confirm availability on WhatsApp.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {stays.map((s, i) => (
            <StayCard key={s.id} stay={s} flip={i % 2 === 1} />
          ))}
        </div>

        <div
          className="mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl bg-sand p-8 md:flex-row md:items-center md:p-10"
          data-reveal
        >
          <div>
            <h3 className="font-display text-2xl text-forest md:text-3xl">Coming with a big group?</h3>
            <p className="mt-2 max-w-xl text-ink/70">
              Ask about our <b>Luxury Villa</b> — ideal for families, friends&apos; getaways and celebrations, with the
              lawn, bonfire and banquet hall at your disposal.
            </p>
          </div>
          <button
            onClick={() => openConcierge()}
            className="flex shrink-0 items-center gap-2 rounded-full bg-forest px-6 py-3.5 font-semibold text-white hover:bg-pine"
          >
            <WhatsAppIcon /> Ask about the villa
          </button>
        </div>
      </div>
    </section>
  );
}

function StayCard({ stay, flip }: { stay: Stay; flip: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const n = (i + stay.images.length) % stay.images.length;
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  };

  return (
    <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12" data-reveal>
      <div className={`relative md:col-span-7 ${flip ? "md:order-2" : ""}`}>
        <div
          ref={track}
          onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          className="no-scrollbar flex aspect-[4/3] snap-x snap-mandatory overflow-x-auto rounded-3xl bg-sand"
        >
          {stay.images.map((img, i) => (
            <div key={img.src} className="relative h-full w-full shrink-0 snap-center">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => go(index - 1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 rotate-180 place-items-center rounded-full bg-white/90 text-forest shadow-lg hover:bg-white"
        >
          <ChevronIcon />
        </button>
        <button
          onClick={() => go(index + 1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-forest shadow-lg hover:bg-white"
        >
          <ChevronIcon />
        </button>
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
          {stay.images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => go(i)}
              aria-label={`Photo ${i + 1}`}
              className={`h-1.5 rounded-full bg-white transition-all ${i === index ? "w-6" : "w-1.5 opacity-60"}`}
            />
          ))}
        </div>
      </div>

      <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-pine/10 px-3 py-1 text-xs font-semibold text-pine">
          <UsersIcon className="size-4" /> {stay.guests}
        </p>
        <h3 className="font-display text-3xl text-forest md:text-5xl">{stay.name}</h3>
        <p className="mt-4 text-lg leading-relaxed text-ink/70">{stay.blurb}</p>
        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
          {stay.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-sm text-ink/80">
              <CheckIcon className="size-4 shrink-0 text-moss" /> {h}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => openConcierge(stay.id)}
            className="flex items-center gap-2 rounded-full bg-sunset px-6 py-3.5 font-semibold text-white shadow-lg shadow-sunset/25 transition hover:-translate-y-0.5 hover:bg-ember"
          >
            <WhatsAppIcon /> Check dates
          </button>
          <span className="text-sm text-ink/55">Best rates when you book direct</span>
        </div>
      </div>
    </article>
  );
}
