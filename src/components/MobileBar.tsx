"use client";

import { telHref } from "@/lib/site";
import { openConcierge } from "./Concierge";
import { PhoneIcon, WhatsAppIcon } from "./icons";

/** Thumb-reach Call / WhatsApp bar, phones only. */
export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-black/5 bg-cream/95 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <a href={telHref()} className="flex items-center justify-center gap-2 rounded-2xl bg-forest py-3.5 font-semibold text-white">
        <PhoneIcon /> Call now
      </a>
      <button
        onClick={() => openConcierge()}
        className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 font-semibold text-white"
      >
        <WhatsAppIcon /> WhatsApp
      </button>
    </div>
  );
}
