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
        <div className="mb-12 max-w-2xl md:mb-16" data-reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">A day here</p>
          <h2 className="font-display text-4xl font-light md:text-6xl">From misty mornings to firelit nights.</h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Sticky photo stack — desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
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
              <span className="absolute left-5 top-5 rounded-full bg-black/40 px-4 py-1.5 font-display text-lg backdrop-blur">
                  {dayHere[active].time}
                </span>
              </div>
            </div>
          </div>

          <ol className="relative space-y-12 border-l border-white/15 pl-8 lg:space-y-0 lg:py-[10vh]">
            {dayHere.map((d, i) => (
              <li
                key={d.title}
                ref={(el) => {
                  steps.current[i] = el;
                }}
                data-index={i}
                className="relative lg:flex lg:min-h-[55vh] lg:flex-col lg:justify-center"
              >
                <span
                  className={`absolute -left-[41px] top-1.5 size-4 rounded-full ring-4 ring-forest transition-colors duration-500 lg:top-auto ${
                    i === active ? "bg-sunset" : "bg-white/30"
                  }`}
                />
                <p className="font-display text-xl text-sunset">{d.time}</p>
                <h3
                  className={`mt-1 font-display text-3xl transition-opacity duration-500 md:text-4xl ${
                    i === active ? "opacity-100" : "lg:opacity-40"
                  }`}
                >
                  {d.title}
                </h3>
                <p className="mt-3 max-w-md text-white/70">{d.text}</p>
                <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl lg:hidden">
                  <Img src={d.img} alt={d.title} fill sizes="(min-width: 1024px) 1px, 90vw" className="object-cover" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
