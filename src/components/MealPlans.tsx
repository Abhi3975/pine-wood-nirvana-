"use client";

import { diningSpots, inr, mealPlans } from "@/lib/site";
import { openConcierge } from "./Concierge";
import { CheckIcon, WhatsAppIcon } from "./icons";
import Img from "./Img";

export default function MealPlans() {
  return (
    <section id="meals" className="py-16 md:py-28">
      <div className="mx-auto mb-10 max-w-7xl px-4 md:mb-14 md:px-8" data-reveal>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Meal plans</p>
        <div className="grid gap-5 md:grid-cols-2 md:items-end">
          <h2 className="font-display text-[1.6rem] font-light text-forest md:text-[2.125rem]">Eat well in the forest.</h2>
          <p className="text-[15px] text-ink/70 md:pb-2">
            Our in-house restaurant cooks fresh, home-style meals. Pick the plan that suits your trip — you can add it
            to any cottage.
          </p>
        </div>
      </div>

      {/* Plans: swipeable on phones, four columns on desktop */}
      <ul
        className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 pt-4 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-8 lg:grid-cols-4"
        data-reveal
      >
        {mealPlans.map((m) => (
          <li
            key={m.code}
            className={`relative flex w-[78%] shrink-0 snap-start flex-col rounded-3xl p-6 sm:w-[48%] md:w-auto ${
              m.featured ? "bg-forest text-white shadow-2xl shadow-forest/30" : "bg-white ring-1 ring-forest/10"
            }`}
          >
            {m.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-sunset px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Great for sightseeing
              </span>
            )}
            <span
              className={`self-start rounded-lg px-2 py-1 font-mono text-xs font-bold tracking-wider ${
                m.featured ? "bg-white/10 text-sunset" : "bg-sand text-forest"
              }`}
            >
              {m.code}
            </span>
            <h3 className={`mt-4 font-display text-lg md:text-xl ${m.featured ? "" : "text-forest"}`}>{m.name}</h3>
            <p className={`mt-2 text-sm ${m.featured ? "text-white/70" : "text-ink/65"}`}>{m.text}</p>

            <ul className={`mt-5 flex-1 space-y-2 border-t pt-5 text-sm ${m.featured ? "border-white/15" : "border-forest/10"}`}>
              {m.includes.map((inc) => (
                <li key={inc} className="flex items-center gap-2">
                  <CheckIcon className={`size-4 shrink-0 ${m.featured ? "text-sunset" : "text-moss"}`} /> {inc}
                </li>
              ))}
            </ul>

            <p className={`mt-5 text-sm ${m.featured ? "text-white/60" : "text-ink/55"}`}>
              {m.code === "EP" ? (
                "Included in the room rate"
              ) : m.addPerPerson ? (
                <>
                  + <b className={`font-display text-xl font-normal ${m.featured ? "text-white" : "text-forest"}`}>{inr(m.addPerPerson)}</b> per
                  adult / night
                </>
              ) : (
                "Add-on · ask for today's rate"
              )}
            </p>
            <button
              onClick={() => openConcierge(undefined, m.code)}
              className={`mt-4 flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold transition active:scale-[0.98] ${
                m.featured ? "bg-sunset text-white hover:bg-ember" : "bg-forest text-white hover:bg-pine"
              }`}
            >
              <WhatsAppIcon className="size-4" /> Book this plan
            </button>
          </li>
        ))}
      </ul>

      {/* Where you'll eat */}
      <div className="mx-auto mt-14 max-w-7xl px-4 md:mt-20 md:px-8">
        <h3 className="mb-5 font-display text-xl text-forest md:text-2xl" data-reveal>
          Where you&apos;ll eat
        </h3>
        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0" data-reveal>
          {diningSpots.map((d) => (
            <li key={d.title} className="group relative aspect-[4/3] w-[80%] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-auto sm:aspect-[4/5] lg:aspect-[4/3]">
              <Img
                src={d.img}
                alt={d.title}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="font-display text-xl">{d.title}</p>
                <p className="text-sm text-white/80">{d.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm text-ink/55">
          Kids&apos; meals, Jain or special diets? Just tell us when you book and we&apos;ll check with our kitchen.
        </p>
      </div>
    </section>
  );
}
