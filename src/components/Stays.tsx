"use client";

import { useRef, useState } from "react";
import Img from "@/components/Img";
import { inr, pricing, stays, type Stay } from "@/lib/site";
import { openConcierge } from "./Concierge";
import { CheckIcon, ChevronIcon, UsersIcon, WhatsAppIcon } from "./icons";

export default function Stays() {
  // Phones show one cottage at a time (tabs); desktop shows all three.
  const [active, setActive] = useState(stays[0].id);
  return (
    <section id="stays" className="px-4 py-16 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 max-w-2xl md:mb-14" data-reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Stays</p>
          <h2 className="font-display text-[1.6rem] font-light text-forest md:text-[2.125rem]">Three ways to stay in the forest.</h2>
          <p className="mt-3 text-[15px] text-ink/70 md:mt-5 md:text-base">
            Every cottage sits among tall pines with its own path, its own view and nothing but birdsong for company.
            Pick one — we&apos;ll confirm availability on WhatsApp.
          </p>
        </div>

        <div className="no-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 md:hidden" role="tablist" aria-label="Choose a cottage">
          {stays.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={active === s.id}
              onClick={() => setActive(s.id)}
              className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold ring-1 transition ${
                active === s.id ? "bg-forest text-white ring-forest" : "bg-white text-forest ring-forest/15"
              }`}
            >
              {s.short} <span className="font-normal opacity-70">· {s.guests}</span>
            </button>
          ))}
        </div>

        <div className="md:space-y-24">
          {stays.map((s, i) => (
            <div key={s.id} className={active === s.id ? "" : "hidden md:block"}>
              <StayCard stay={s} flip={i % 2 === 1} />
            </div>
          ))}
        </div>

        <div
          className="mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl bg-sand p-6 md:mt-20 md:flex-row md:items-center md:gap-6 md:p-10"
          data-reveal
        >
          <div>
            <h3 className="font-display text-xl text-forest md:text-2xl">Coming with a big group?</h3>
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

const fromPrice = (id: string) => pricing.plans.find((p) => p.stayId === id)?.from;

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
    <article className="grid items-center gap-5 md:grid-cols-12 md:gap-12" data-reveal>
      <div className={`relative md:col-span-7 ${flip ? "md:order-2" : ""}`}>
        <div
          ref={track}
          onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          className="no-scrollbar flex aspect-[4/3] snap-x snap-mandatory overflow-x-auto rounded-3xl bg-sand md:aspect-[16/10]"
        >
          {stay.images.map((img) => (
            <div key={img.src} className="relative h-full w-full shrink-0 snap-center">
              <Img
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => go(index - 1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 hidden size-10 md:grid -translate-y-1/2 rotate-180 place-items-center rounded-full bg-white/90 text-forest shadow-lg hover:bg-white"
        >
          <ChevronIcon />
        </button>
        <button
          onClick={() => go(index + 1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 hidden size-10 md:grid -translate-y-1/2 place-items-center rounded-full bg-white/90 text-forest shadow-lg hover:bg-white"
        >
          <ChevronIcon />
        </button>
        <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          {index + 1} / {stay.images.length}
        </span>
        <div className="absolute inset-x-0 bottom-1 flex justify-center">
          {stay.images.map((img, i) => (
            // Tiny dot, but a full 40px finger-sized tap area around it.
            <button key={img.src} onClick={() => go(i)} aria-label={`Photo ${i + 1}`} className="grid h-10 min-w-7 place-items-center px-1">
              <span className={`block h-1.5 rounded-full bg-white transition-all ${i === index ? "w-6" : "w-1.5 opacity-60"}`} />
            </button>
          ))}
        </div>
      </div>

      <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-pine/10 px-3 py-1 text-xs font-semibold text-pine">
          <UsersIcon className="size-4" /> {stay.guests}
        </p>
        <h3 className="font-display text-xl text-forest md:text-3xl">{stay.name}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink/70 md:mt-4 md:text-base">{stay.blurb}</p>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 md:mt-6 md:gap-y-2.5">
          {stay.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-sm text-ink/80">
              <CheckIcon className="size-4 shrink-0 text-moss" /> {h}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-8">
          <button
            onClick={() => openConcierge(stay.id)}
            className="flex items-center justify-center gap-2 rounded-full bg-sunset px-6 py-3.5 font-semibold text-white shadow-lg shadow-sunset/25 transition hover:-translate-y-0.5 hover:bg-ember"
          >
            <WhatsAppIcon /> Check dates
          </button>
          <a href="#pricing" className="py-1 text-sm text-ink/55 hover:text-forest">
            {fromPrice(stay.id) ? (
              <>
                from <b className="font-display text-xl font-normal text-forest">{inr(fromPrice(stay.id)!)}</b> / night
              </>
            ) : (
              "Best rates when you book direct"
            )}
          </a>
        </div>
      </div>
    </article>
  );
}
