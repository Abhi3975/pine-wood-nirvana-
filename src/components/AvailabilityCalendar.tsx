"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { nightsOf, type Blocked } from "@/lib/availability";
import { stays } from "@/lib/site";
import { ChevronIcon } from "./icons";

export const PREFILL_EVENT = "booking:prefill";
export type Prefill = { stayId: string; checkIn: string; checkOut: string };

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
// Today's date, read in the browser only ("" during the static prerender).
const useToday = () =>
  useSyncExternalStore(
    () => () => {},
    () => iso(new Date()),
    () => "",
  );

const WEEK = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function monthDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7; // Monday-first
  const count = new Date(year, month + 1, 0).getDate();
  return { lead, days: Array.from({ length: count }, (_, i) => iso(new Date(year, month, i + 1))) };
}

export default function AvailabilityCalendar() {
  const today = useToday();
  const [stayId, setStayId] = useState(stays[0].id);
  const [blocked, setBlocked] = useState<Blocked>({});
  const [live, setLive] = useState<boolean | null>(null);
  const [offset, setOffset] = useState(0); // months from the current one
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then((d: { source: string; blocked: Blocked }) => {
        setBlocked(d.blocked);
        setLive(d.source === "sheet");
      })
      .catch(() => setLive(false));
  }, []);

  const full = useMemo(() => new Set(blocked[stayId] ?? []), [blocked, stayId]);
  const now = today ? new Date(today + "T00:00:00") : null;
  const months = now
    ? [0, 1].map((k) => {
        const d = new Date(now.getFullYear(), now.getMonth() + offset + k, 1);
        return { label: d.toLocaleDateString("en-IN", { month: "long", year: "numeric" }), ...monthDays(d.getFullYear(), d.getMonth()) };
      })
    : [];

  const fmt = (s: string) => new Date(s + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  const pick = (day: string) => {
    setMsg("");
    if (!checkIn || checkOut || day <= checkIn) {
      if (full.has(day)) return setMsg("That night is fully booked — pick another check-in date.");
      setCheckIn(day);
      setCheckOut("");
      return;
    }
    const clash = nightsOf(checkIn, day).filter((n) => full.has(n));
    if (clash.length) {
      setMsg(`Your stay would include a fully booked night (${fmt(clash[0])}). Try shorter dates or another cottage.`);
      setCheckIn("");
      return;
    }
    setCheckOut(day);
  };

  const book = () => {
    window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail: { stayId, checkIn, checkOut } }));
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  };

  const nights = checkIn && checkOut ? nightsOf(checkIn, checkOut).length : 0;
  return (
    <section id="availability" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-10" data-reveal>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Availability</p>
            <h2 className="font-display text-3xl font-light text-forest md:text-5xl">Check dates at a glance.</h2>
          </div>
          <div className="no-scrollbar -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 sm:mx-0 sm:w-auto sm:px-0" role="tablist">
            {stays.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={stayId === s.id}
                onClick={() => {
                  setStayId(s.id);
                  setCheckIn("");
                  setCheckOut("");
                  setMsg("");
                }}
                className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold ring-1 transition ${
                  stayId === s.id ? "bg-forest text-white ring-forest" : "bg-white text-forest ring-forest/15"
                }`}
              >
                {s.short}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 ring-1 ring-forest/10 sm:p-6 md:p-8" data-reveal>
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => setOffset((o) => Math.max(0, o - 1))}
              disabled={offset === 0}
              aria-label="Previous month"
              className="grid size-11 rotate-180 place-items-center rounded-full ring-1 ring-forest/15 disabled:opacity-30"
            >
              <ChevronIcon />
            </button>
            <p className="px-2 text-center text-xs text-ink/60 sm:text-sm">Tap check-in, then check-out</p>
            <button
              onClick={() => setOffset((o) => Math.min(11, o + 1))}
              disabled={offset >= 11}
              aria-label="Next month"
              className="grid size-11 place-items-center rounded-full ring-1 ring-forest/15 disabled:opacity-30"
            >
              <ChevronIcon />
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {months.map((m, mi) => (
              <div key={m.label} className={mi === 1 ? "hidden md:block" : ""}>
                <p className="mb-3 text-center font-display text-xl text-forest">{m.label}</p>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {WEEK.map((w) => (
                    <span key={w} className="py-1 text-xs font-semibold text-ink/45">
                      {w}
                    </span>
                  ))}
                  {Array.from({ length: m.lead }, (_, i) => (
                    <span key={`l${i}`} />
                  ))}
                  {m.days.map((d) => {
                    const past = d < today;
                    const isFull = full.has(d);
                    const inRange = checkIn && checkOut && d > checkIn && d < checkOut;
                    const isEdge = d === checkIn || d === checkOut;
                    return (
                      <button
                        key={d}
                        disabled={past}
                        onClick={() => pick(d)}
                        aria-label={`${d}${isFull ? ", fully booked" : past ? "" : ", available"}`}
                        className={`relative aspect-square min-h-10 rounded-xl text-sm font-medium transition ${
                          isEdge
                            ? "bg-forest text-white"
                            : inRange
                              ? "bg-forest/15 text-forest"
                              : past
                                ? "text-ink/25"
                                : isFull
                                  ? "bg-ember/10 text-ember line-through"
                                  : "text-forest hover:bg-sand"
                        }`}
                      >
                        {Number(d.slice(8))}
                        {!past && !isFull && !isEdge && !inRange && (
                          <span className="absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-moss" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-forest/10 pt-5 text-xs text-ink/60">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-moss" /> Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded bg-ember/20" /> Fully booked
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded bg-forest" /> Your dates
            </span>
            {live === false && (
              <span className="basis-full text-ink/45 sm:basis-auto">Open dates are confirmed when you book.</span>
            )}
          </div>

          {msg && <p className="mt-4 rounded-xl bg-ember/10 px-4 py-3 text-sm text-ember">{msg}</p>}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-forest">
              {checkIn && checkOut ? (
                <>
                  <b>{fmt(checkIn)} → {fmt(checkOut)}</b> · {nights} night{nights > 1 ? "s" : ""} — available
                </>
              ) : checkIn ? (
                <>Check-in <b>{fmt(checkIn)}</b> — now tap your check-out</>
              ) : (
                "No dates selected yet"
              )}
            </p>
            <button
              onClick={book}
              disabled={!checkOut}
              className="min-h-12 rounded-2xl bg-sunset px-6 font-semibold text-white transition hover:bg-ember disabled:bg-black/15"
            >
              Book these dates →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
