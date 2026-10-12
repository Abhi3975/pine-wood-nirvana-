"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site, socials, telHref } from "@/lib/site";
import { openConcierge } from "./Concierge";
import { CloseIcon, InstagramIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "./icons";

// phoneOnly links appear in the full-screen menu but not in the (already full) desktop bar.
const links: { href: string; label: string; phoneOnly?: boolean }[] = [
  { href: "#stays", label: "Stays" },
  { href: "#pricing", label: "Pricing" },
  { href: "#day", label: "A day here", phoneOnly: true },
  { href: "#experiences", label: "Experiences" },
  { href: "#plan", label: "Plan a trip" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#nearby", label: "Nearby" },
  { href: "#location", label: "Location" },
  { href: "#founder", label: "Founder" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the open menu.
  useEffect(() => {
    if (!menu) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const dark = solid || menu;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[46] transition-[background-color,box-shadow] duration-300 ${
          dark ? "bg-cream/95 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur" : "bg-gradient-to-b from-black/50 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:h-18 md:px-8">
          <a href="#top" onClick={() => setMenu(false)} className="flex items-center gap-3" aria-label="Pine Wood Nirvana — home">
            <Image src="/images/logo.webp" alt="GhumoG Bharke" width={84} height={52} priority className="h-10 w-auto md:h-11" />
            <span className={`hidden leading-tight sm:block ${dark ? "text-forest" : "text-white"}`}>
              <span className="block font-display text-base md:text-lg">Pine Wood Nirvana</span>
              <span className={`block text-[11px] uppercase tracking-[0.2em] ${dark ? "text-ink/50" : "text-white/70"}`}>
                Jungle Resort · Shimla
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-5 xl:flex">
            {links.filter((l) => !l.phoneOnly).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition hover:text-sunset ${dark ? "text-ink/80" : "text-white/90"}`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setMenu(false);
                openConcierge();
              }}
              className="flex items-center gap-2 rounded-full bg-sunset px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sunset/30 transition hover:bg-ember active:scale-95"
            >
              <WhatsAppIcon className="size-4" /> <span>Book now</span>
            </button>
            <button
              onClick={() => setMenu((m) => !m)}
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              className={`grid size-11 place-items-center rounded-full transition active:scale-90 xl:hidden ${
                dark ? "text-forest" : "text-white"
              }`}
            >
              {menu ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu for phones and tablets. Lives outside <header>: its backdrop-blur
          would otherwise trap this fixed panel inside the header bar. */}
      <div
        className={`fixed inset-0 z-[45] flex flex-col bg-cream pt-16 transition-[opacity,visibility] duration-300 md:pt-18 xl:hidden ${
          menu ? "visible opacity-100" : "invisible opacity-0"
        }`}
        data-lenis-prevent
      >
        <nav className="flex-1 overflow-y-auto px-6 pt-4">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenu(false)}
              className={`block border-b border-forest/10 py-3.5 font-display text-2xl text-forest transition-all duration-500 ${
                menu ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: menu ? `${60 + i * 35}ms` : "0ms" }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="grid grid-cols-2 gap-3 border-t border-forest/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a href={telHref()} className="flex items-center justify-center gap-2 rounded-2xl bg-forest py-4 font-semibold text-white">
            <PhoneIcon /> Call
          </a>
          <button
            onClick={() => {
              setMenu(false);
              openConcierge();
            }}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 font-semibold text-white"
          >
            <WhatsAppIcon /> WhatsApp
          </button>
          <a
            href={socials.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 flex items-center justify-center gap-2 py-1 text-sm font-semibold text-forest"
          >
            <InstagramIcon className="size-4" /> Follow us on Instagram
          </a>
          <p className="col-span-2 text-center text-xs text-ink/50">{site.address}</p>
        </div>
      </div>
    </>
  );
}
