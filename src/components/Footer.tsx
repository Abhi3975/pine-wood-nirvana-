"use client";

import Img from "@/components/Img";
import { site, telHref, waHref } from "@/lib/site";
import { openConcierge } from "./Concierge";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      {/* Closing call to action */}
      <div className="relative overflow-hidden">
        <Img src="/images/evening-cottages.webp" alt="" fill sizes="100vw" className="object-cover opacity-35" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center md:py-32" data-reveal>
          <h2 className="font-display text-4xl font-light md:text-6xl">The pines are waiting.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
            Message us your dates and we&apos;ll confirm your cottage in minutes — no forms, no booking fees.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => openConcierge()}
              className="flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-semibold hover:bg-[#1ebe5a]"
            >
              <WhatsAppIcon /> Book on WhatsApp
            </button>
            <a
              href={telHref()}
              className="flex items-center gap-2 rounded-full bg-white/10 px-7 py-4 font-semibold ring-1 ring-white/30 hover:bg-white/20"
            >
              <PhoneIcon /> Call {site.phones[0]}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 px-4 py-14 md:grid-cols-3 md:px-8">
        <div>
          <Img src="/images/logo.webp" alt="GhumoG Bharke" width={160} height={100} className="h-20 w-auto" />
          <p className="mt-4 font-display text-xl">{site.fullName}</p>
          <p className="text-sm text-white/60">By {site.brand} · {site.tagline}</p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Contact</p>
          {site.phones.map((p) => (
            <a key={p} href={telHref(p)} className="flex items-center gap-2 text-white/85 hover:text-sunset">
              <PhoneIcon className="size-4" /> {p}
            </a>
          ))}
          <a
            href={waHref("Hi! I have a question about Pine Wood Nirvana.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/85 hover:text-sunset"
          >
            <WhatsAppIcon className="size-4" /> WhatsApp us
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-white/85 hover:text-sunset">
            <MailIcon className="size-4" /> {site.email}
          </a>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Find us</p>
          <p className="flex items-start gap-2 text-white/85">
            <PinIcon className="mt-0.5 size-4 shrink-0" /> {site.address}
          </p>
          <a href={site.parentSite} target="_blank" rel="noopener noreferrer" className="block text-white/85 hover:text-sunset">
            More GhumoG stays → ghumog.in
          </a>
        </div>
      </div>
      <p className="border-t border-white/10 px-4 py-5 pb-24 text-center text-xs text-white/40 md:pb-5">
        © 2026 GhumoG Tour Planners Pvt. Ltd. · Har Safar Kuch Khass…
      </p>
    </footer>
  );
}
