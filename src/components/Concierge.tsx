"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { site, stays, telHref, waHref } from "@/lib/site";
import { CloseIcon, PhoneIcon, WhatsAppIcon } from "./icons";

const OPEN_EVENT = "concierge:open";

/** Open the booking concierge from anywhere, optionally with a stay preselected. */
export function openConcierge(stayId?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { stayId } }));
}

const quickQuestions = [
  { label: "📍 Send me the location", text: "Hi! Please share the Google Maps location of Pine Wood Nirvana." },
  { label: "💰 Today's room rates", text: "Hi! Could you share today's room rates at Pine Wood Nirvana?" },
  { label: "🐶 Can I bring my pet?", text: "Hi! I'd like to bring my pet to Pine Wood Nirvana — is that okay?" },
  { label: "🎉 Plan a celebration", text: "Hi! I'm planning a celebration / group stay at Pine Wood Nirvana. Can we talk?" },
];

// Local YYYY-MM-DD (toISOString would shift to UTC and can land on yesterday in IST).
const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const daysFromNow = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return iso(d);
};
const pretty = (s: string) =>
  s ? new Date(s + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "";

export default function Concierge() {
  const [open, setOpen] = useState(false);
  const [stay, setStay] = useState<string>(stays[0].id);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [name, setName] = useState("");
  const [nudge, setNudge] = useState(false);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<{ stayId?: string }>).detail?.stayId;
      if (id) setStay(id);
      // Suggest tomorrow → +2 nights on first open (computed here, not during SSR).
      setCheckIn((v) => v || daysFromNow(1));
      setCheckOut((v) => v || daysFromNow(3));
      setOpen(true);
      setNudge(false);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    // A gentle greeting bubble after the guest has had a look around; it bows out on its own.
    const show = setTimeout(() => setNudge(true), 9000);
    const hide = setTimeout(() => setNudge(false), 19000);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(0, Math.round((+new Date(checkOut) - +new Date(checkIn)) / 86_400_000));
  }, [checkIn, checkOut]);

  const selected = stays.find((s) => s.id === stay) ?? stays[0];

  const details = [
    `📅 ${pretty(checkIn)} → ${pretty(checkOut)}${nights ? ` (${nights} night${nights > 1 ? "s" : ""})` : ""}`,
    `👥 ${adults} adult${adults > 1 ? "s" : ""}${kids ? `, ${kids} child${kids > 1 ? "ren" : ""}` : ""}`,
  ];
  if (name.trim()) details.push(`🙋 Name: ${name.trim()}`);
  const message = [
    `Hi ${site.name}! 👋`,
    `I'd like to book the *${selected.name}*.`,
    "",
    ...details,
    "",
    "Is it available? Please share the best rate.",
  ].join("\n");

  const datesValid = nights > 0;

  return (
    <>
      {/* Launcher */}
      <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
        {nudge && !open && (
          <div className="animate-pop relative">
            <button
              onClick={() => openConcierge()}
              className="max-w-60 rounded-2xl rounded-br-sm bg-white py-3 pl-4 pr-8 text-left text-sm text-ink shadow-xl ring-1 ring-black/5"
            >
              <span className="font-semibold">Namaste! 🙏</span> Planning a trip to Shoghi? Check availability in 30
              seconds.
            </button>
            <button
              onClick={() => setNudge(false)}
              aria-label="Dismiss"
              className="absolute right-1 top-1 grid size-7 place-items-center rounded-full text-ink/40 hover:text-ink"
            >
              <CloseIcon className="size-3.5" />
            </button>
          </div>
        )}
        <button
          onClick={() => (open ? setOpen(false) : openConcierge())}
          aria-label={open ? "Close booking assistant" : "Chat with us on WhatsApp"}
          className="group relative hidden size-15 place-items-center md:grid rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] transition hover:scale-105"
        >
          {!open && <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />}
          {open ? <CloseIcon className="size-6" /> : <WhatsAppIcon className="size-8" />}
        </button>
      </div>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Booking assistant"
          className="animate-pop fixed inset-x-3 bottom-[5.5rem] z-50 flex max-h-[calc(100dvh-7rem)] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 md:inset-x-auto md:bottom-28 md:right-6 md:w-[400px]"
        >
          <header className="flex items-center gap-3 bg-forest px-5 py-4 text-white">
            <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-white">
              <Image src="/images/logo.webp" alt="" fill sizes="44px" className="object-contain p-1" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg leading-tight">{site.name} Concierge</p>
              <p className="flex items-center gap-1.5 text-xs text-white/70">
                <span className="size-2 rounded-full bg-[#25D366]" /> Usually replies within minutes
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1.5 hover:bg-white/10">
              <CloseIcon />
            </button>
          </header>

          <div data-lenis-prevent className="flex-1 space-y-4 overflow-y-auto overscroll-contain bg-[#efeae2] px-4 py-5 text-sm">
            <Bubble>
              Namaste! 🙏 Welcome to <b>{site.fullName}</b>. Tell me what you&apos;re looking for and I&apos;ll send your
              request straight to our team on WhatsApp.
            </Bubble>

            <Bubble>
              <p className="mb-2 font-semibold">Which stay would you like?</p>
              <div className="flex flex-wrap gap-2">
                {stays.map((s) => (
                  <Chip key={s.id} active={stay === s.id} onClick={() => setStay(s.id)}>
                    {s.short} <span className="opacity-60">· {s.guests}</span>
                  </Chip>
                ))}
              </div>
            </Bubble>

            <Bubble>
              <p className="mb-2 font-semibold">When are you coming?</p>
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="text-xs text-ink/60">Check-in</span>
                  <input
                    type="date"
                    value={checkIn}
                    min={daysFromNow(0)}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (checkOut <= e.target.value) {
                        const o = new Date(e.target.value + "T00:00:00");
                        o.setDate(o.getDate() + 1);
                        setCheckOut(iso(o));
                      }
                    }}
                    className="mt-1 w-full rounded-xl border border-black/10 px-2.5 py-2 outline-none focus:border-pine"
                  />
                </label>
                <label className="block">
                  <span className="text-xs text-ink/60">Check-out</span>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-black/10 px-2.5 py-2 outline-none focus:border-pine"
                  />
                </label>
              </div>
              {!datesValid && checkIn && <p className="mt-2 text-xs text-ember">Check-out must be after check-in.</p>}
            </Bubble>

            <Bubble>
              <p className="mb-2 font-semibold">How many guests?</p>
              <Stepper label="Adults" value={adults} min={1} max={12} onChange={setAdults} />
              <Stepper label="Children" value={kids} min={0} max={8} onChange={setKids} />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="mt-3 w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:border-pine"
              />
            </Bubble>

            {/* Preview of what will be sent */}
            <div className="ml-auto max-w-[88%] whitespace-pre-line rounded-2xl rounded-tr-sm bg-[#d9fdd3] px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm">
              {message.replace(/\*/g, "")}
            </div>

            <div>
              <p className="mb-2 text-center text-xs text-ink/50">or just ask</p>
              <div className="flex flex-wrap justify-center gap-2">
                {quickQuestions.map((q) => (
                  <a
                    key={q.label}
                    href={waHref(q.text)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-pine shadow-sm ring-1 ring-pine/20 hover:bg-pine hover:text-white"
                  >
                    {q.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <footer className="grid grid-cols-[1fr_auto] gap-2 border-t border-black/5 bg-white p-3">
            <a
              href={datesValid ? waHref(message) : undefined}
              aria-disabled={!datesValid}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold text-white transition ${
                datesValid ? "bg-[#25D366] hover:bg-[#1ebe5a]" : "pointer-events-none bg-black/20"
              }`}
            >
              <WhatsAppIcon /> Send on WhatsApp
            </a>
            <a
              href={telHref()}
              aria-label={`Call ${site.phones[0]}`}
              className="flex items-center justify-center gap-2 rounded-2xl bg-forest px-4 py-3 font-semibold text-white hover:bg-pine"
            >
              <PhoneIcon /> <span className="hidden sm:inline">Call</span>
            </a>
          </footer>
        </div>
      )}
    </>
  );
}

function Bubble({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm">{children}</div>;
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition ${
        active ? "bg-pine text-white ring-pine" : "bg-white text-ink ring-black/15 hover:ring-pine"
      }`}
    >
      {children}
    </button>
  );
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <span>{label}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Fewer ${label.toLowerCase()}`}
          className="grid size-8 place-items-center rounded-full ring-1 ring-black/15 disabled:opacity-30"
        >
          −
        </button>
        <span className="w-4 text-center font-semibold tabular-nums">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`More ${label.toLowerCase()}`}
          className="grid size-8 place-items-center rounded-full ring-1 ring-black/15 disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  );
}
