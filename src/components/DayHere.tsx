"use client";

import { useEffect, useRef, useState } from "react";
import { dayHere } from "@/lib/site";
import Img from "./Img";

/**
 * "A day at Pine Wood Nirvana": on desktop a sticky photo cross-fades as you
 * scroll through the timeline; on phones each moment carries its own photo.
 */
export default function DayHere() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="day" className="bg-forest px-4 py-16 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-2xl md:mb-16" data-reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">A day here</p>
          <h2 className="font-display text-[1.6rem] font-light md:text-[2.125rem]">From misty mornings to firelit nights.</h2>
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-20">
          {/* Sticky photo stack — desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              {dayHere.map((d, i) => (
                <Img
                  key={d.img}
                  src={d.img}
                  alt={d.title}
                  fill
                  sizes="45vw"
                  className={`object-cover transition-all duration-1000 ease-out ${
                    i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                  }`}
                />
              ))}
              <span className="absolute left-5 top-5 rounded-full bg-black/40 px-4 py-1.5 font-display text-[15px] backdrop-blur">
                  {dayHere[active].time}
                </span>
              </div>
            </div>
          </div>

          {/* Phones: a swipeable row of moments */}
          <ol className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 lg:hidden">
            {dayHere.map((d) => (
              <li key={d.title} className="w-[82%] shrink-0 snap-start overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 sm:w-[60%]">
                <div className="relative aspect-[4/3]">
                  <Img src={d.img} alt={d.title} fill sizes="(min-width: 640px) 60vw, 82vw" className="object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 text-sm font-semibold backdrop-blur">
                    {d.time}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{d.text}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Desktop: scrolling timeline beside the sticky photo */}
          <ol className="relative hidden border-l border-white/15 pl-8 py-[10vh] lg:block">
            {dayHere.map((d, i) => (
              <li
                key={d.title}
                ref={(el) => {
                  steps.current[i] = el;
                }}
                data-index={i}
                className="relative flex min-h-[55vh] flex-col justify-center"
              >
                <span
                  className={`absolute -left-[41px] size-4 rounded-full ring-4 ring-forest transition-colors duration-500 ${
                    i === active ? "bg-sunset" : "bg-white/30"
                  }`}
                />
                <p className="font-display text-xl text-sunset">{d.time}</p>
                <h3
                  className={`mt-1 font-display text-3xl transition-opacity duration-500 ${
                    i === active ? "opacity-100" : "opacity-40"
                  }`}
                >
                  {d.title}
                </h3>
                <p className="mt-3 max-w-md text-white/70">{d.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
