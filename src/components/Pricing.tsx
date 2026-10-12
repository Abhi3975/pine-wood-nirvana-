"use client";

import { inr, pricing, waHref } from "@/lib/site";
import { openConcierge } from "./Concierge";
import { CheckIcon, WhatsAppIcon } from "./icons";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-sand/60 py-16 md:py-28">
      <div className="mx-auto mb-10 max-w-7xl px-4 md:mb-14 md:px-8" data-reveal>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Pricing</p>
        <div className="grid gap-5 md:grid-cols-2 md:items-end">
          <h2 className="font-display text-[1.75rem] font-light text-forest md:text-4xl">Simple, honest rates.</h2>
          <p className="text-[15px] md:text-base text-ink/70 md:pb-2">
            Book direct on WhatsApp for our best price — no booking fees, no middlemen. Rates start from:
          </p>
        </div>
      </div>

      {/* Swipeable on phones, three columns from tablet up */}
      <ul
        className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 pt-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-8"
        data-reveal
      >
        {pricing.plans.map((p) => (
          <li
            key={p.name}
            className={`relative flex w-[82%] shrink-0 snap-start flex-col rounded-3xl p-6 sm:w-[55%] md:w-auto md:p-8 ${
              p.featured ? "bg-forest text-white shadow-2xl shadow-forest/30 md:-translate-y-3" : "bg-white ring-1 ring-forest/10"
            }`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-sunset px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Signature stay
              </span>
            )}
            <h3 className={`font-display text-xl md:text-2xl ${p.featured ? "" : "text-forest"}`}>{p.name}</h3>
            <p className={`text-sm ${p.featured ? "text-white/60" : "text-ink/55"}`}>{p.guests}</p>

            <div className="mt-6 flex items-end gap-1.5">
              <span className={`text-sm ${p.featured ? "text-white/60" : "text-ink/55"}`}>from</span>
              <span className="font-display text-3xl leading-none">{inr(p.from)}</span>
            </div>
            <p className={`mt-1.5 text-sm ${p.featured ? "text-white/60" : "text-ink/55"}`}>
              per night · + {inr(p.taxes)} taxes
            </p>

            <ul className={`mt-6 flex-1 space-y-2.5 border-t pt-6 text-sm ${p.featured ? "border-white/15" : "border-forest/10"}`}>
              {p.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <CheckIcon className={`mt-0.5 size-4 shrink-0 ${p.featured ? "text-sunset" : "text-moss"}`} /> {perk}
                </li>
              ))}
            </ul>

            <button
              onClick={() => openConcierge(p.stayId)}
              className={`mt-8 flex items-center justify-center gap-2 rounded-2xl py-3.5 font-semibold transition active:scale-[0.98] ${
                p.featured ? "bg-sunset text-white hover:bg-ember" : "bg-forest text-white hover:bg-pine"
              }`}
            >
              <WhatsAppIcon /> Check dates & rate
            </button>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-12 max-w-7xl px-4 md:mt-16 md:px-8" data-reveal>
        <h3 className="mb-5 font-display text-xl md:text-2xl text-forest">Make it yours</h3>
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {pricing.extras.map((x) => (
            <li key={x.title} className="rounded-2xl bg-white p-4 ring-1 ring-forest/10 md:p-5">
              <p className="font-semibold text-forest">{x.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink/65 md:text-sm">{x.text}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-sunset">On request</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-dashed border-forest/25 p-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-ink/60">
            {pricing.note} <span className="text-ink/40">Rates as of {pricing.updated}.</span>
          </p>
          <a
            href={waHref("Hi! Could you share your current rate card for Pine Wood Nirvana, including meal plans?")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1ebe5a]"
          >
            <WhatsAppIcon className="size-4" /> Get full rate card
          </a>
          <a
            href="#book"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-pine"
          >
            Book & pay online →
          </a>
        </div>
      </div>
    </section>
  );
}
