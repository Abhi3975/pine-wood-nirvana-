"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { openConcierge } from "./Concierge";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./icons";

const links = [
  { href: "#stays", label: "Stays" },
  { href: "#experiences", label: "Experiences" },
  { href: "#gallery", label: "Gallery" },
  { href: "#film", label: "Film" },
  { href: "#location", label: "Location" },
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

  const dark = solid || menu;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        dark ? "bg-cream/95 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur" : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="Pine Wood Nirvana — home">
          <Image src="/images/logo.webp" alt="GhumoG Bharke" width={84} height={52} priority className="h-11 w-auto" />
          <span className={`hidden leading-tight sm:block ${dark ? "text-forest" : "text-white"}`}>
            <span className="block font-display text-lg">Pine Wood Nirvana</span>
            <span className={`block text-[11px] uppercase tracking-[0.2em] ${dark ? "text-ink/50" : "text-white/70"}`}>
              Jungle Resort · Shimla
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition hover:text-sunset ${dark ? "text-ink/80" : "text-white/90"}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openConcierge()}
            className="flex items-center gap-2 rounded-full bg-sunset px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sunset/30 transition hover:bg-ember"
          >
            <WhatsAppIcon className="size-4" /> <span>Book now</span>
          </button>
          <button
            onClick={() => setMenu((m) => !m)}
            aria-label="Menu"
            aria-expanded={menu}
            className={`rounded-full p-2 lg:hidden ${dark ? "text-forest" : "text-white"}`}
          >
            {menu ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      {menu && (
        <nav className="border-t border-black/5 bg-cream px-4 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenu(false)}
              className="block border-b border-black/5 py-3.5 font-display text-2xl text-forest"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
