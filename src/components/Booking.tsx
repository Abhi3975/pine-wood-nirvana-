"use client";

import { useEffect, useMemo, useState } from "react";
import { PREFILL_EVENT, type Prefill } from "./AvailabilityCalendar";
import { bookingRules, mealPlanName, quote, suggestRooms } from "@/lib/booking";
import { inr, mealPlans, site, stays, waHref } from "@/lib/site";
import { CheckIcon, WhatsAppIcon } from "./icons";
import Img from "./Img";

type RazorpayResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayCtor = new (opts: Record<string, unknown>) => { open: () => void; on: (e: string, cb: () => void) => void };
declare global {
  interface Window {
    Razorpay?: RazorpayCtor;
  }
}

const loadCheckout = () =>
  new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

const localIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const pretty = (s: string) =>
  new Date(s + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

type Done = { ref: string; demo: boolean; paid: number };

export default function Booking() {
  const [stayId, setStayId] = useState(stays[0].id);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [meal, setMeal] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [payFull, setPayFull] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [demoOpen, setDemoOpen] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  // "Today" is read in the browser when a date field is used, not during the static prerender.
  const [today, setToday] = useState("");
  const markToday = () => setToday(localIso(new Date()));

  // Dates picked on the availability calendar land here.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { stayId: id, checkIn: a, checkOut: b } = (e as CustomEvent<Prefill>).detail;
      setStayId(id);
      setCheckIn(a);
      setCheckOut(b);
      setError("");
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const minRooms = suggestRooms(stayId, adults + kids);
  const roomsUsed = Math.max(rooms, minRooms);
  const q = useMemo(
    () => (checkIn && checkOut ? quote({ stayId, checkIn, checkOut, rooms: roomsUsed, payFull }) : null),
    [stayId, checkIn, checkOut, roomsUsed, payFull],
  );
  const ok = q && !("error" in q) ? q : null;
  const stay = stays.find((s) => s.id === stayId)!;

  const summaryText = (ref?: string) =>
    [
      `Hi ${site.name}! 🙏 Booking ${ref ? `confirmed (ref ${ref})` : "request"} from your website:`,
      "",
      `🏡 ${stay.name} × ${roomsUsed} room${roomsUsed > 1 ? "s" : ""}`,
      checkIn && checkOut ? `📅 ${pretty(checkIn)} → ${pretty(checkOut)}${ok ? ` (${ok.nights} night${ok.nights > 1 ? "s" : ""})` : ""}` : "",
      `👥 ${adults} adult${adults > 1 ? "s" : ""}${kids ? `, ${kids} child${kids > 1 ? "ren" : ""}` : ""}`,
      meal ? `🍽️ Meal plan: ${mealPlanName(meal)} (${meal})` : "",
      name ? `🙋 ${name} · 📞 ${phone}${email ? ` · ✉️ ${email}` : ""}` : "",
      ok ? `💳 ${ref ? "Paid" : "To pay"} online: ${inr(done?.paid ?? ok.payNow)} of ${inr(ok.total)}` : "",
    ]
      .filter(Boolean)
      .join("\n");

  const pay = async () => {
    setError("");
    if (!ok) return setError(q && "error" in q ? q.error : "Please choose your dates.");
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 10)
      return setError("Please enter your name and a 10-digit mobile number.");

    setBusy(true);
    try {
      const res = await fetch("/api/booking/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stayId, checkIn, checkOut, rooms: roomsUsed, payFull, name, phone, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      if (data.mode === "demo") {
        setDemoOpen(true);
        return;
      }

      if (!(await loadCheckout()) || !window.Razorpay) throw new Error("Couldn't load the payment window. Check your connection.");
      const rzp = new window.Razorpay({
        key: data.keyId,
        order_id: data.orderId,
        amount: data.amount,
        currency: "INR",
        name: site.fullName,
        description: `${data.quote.stayName} · ${data.quote.nights} night(s)`,
        prefill: { name, contact: phone, email },
        theme: { color: "#16301f" },
        handler: async (r: RazorpayResponse) => {
          const v = await fetch("/api/booking/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(r),
          }).then((x) => x.json());
          if (v.ok) setDone({ ref: r.razorpay_payment_id, demo: false, paid: data.quote.payNow });
          else setError("We couldn't verify the payment. If money was deducted, message us with your payment ID: " + r.razorpay_payment_id);
        },
      });
      rzp.on("payment.failed", () => setError("Payment didn't go through. You can try again, or book on WhatsApp."));
      rzp.open();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const field = "mt-1.5 w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-base outline-none focus:border-pine focus:ring-4 focus:ring-pine/10";

  return (
    <section id="book" className="bg-sand/60 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8 max-w-2xl md:mb-12" data-reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Book online</p>
          <h2 className="font-display text-3xl font-light text-forest md:text-5xl">Reserve your cottage.</h2>
          <p className="mt-3 text-base text-ink/70 md:text-lg">
            Pick your dates, pay a {bookingRules.advancePercent}% advance securely by UPI, card or netbanking, and pay the
            rest at the resort.
          </p>
        </div>

        {done ? (
          <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 text-center shadow-xl ring-1 ring-forest/10 md:p-10">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#25D366] text-white">
              <CheckIcon className="size-8" />
            </span>
            <h3 className="mt-5 font-display text-2xl text-forest md:text-3xl">
              {done.demo ? "Demo booking complete" : "Booking confirmed!"}
            </h3>
            <p className="mt-2 text-ink/70">
              {done.demo
                ? "This was a demo — no money was charged. With live payments on, the guest would now be booked."
                : `We've received ${inr(done.paid)}. Your payment reference is ${done.ref}.`}
            </p>
            <a
              href={waHref(summaryText(done.ref))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-white"
            >
              <WhatsAppIcon /> Send booking details to the resort
            </a>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
            {/* Form */}
            <div className="space-y-6 rounded-3xl bg-white p-5 ring-1 ring-forest/10 sm:p-8" data-reveal>
              <fieldset>
                <legend className="font-semibold text-forest">1. Choose your cottage</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {stays.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStayId(s.id)}
                      aria-pressed={stayId === s.id}
                      className={`flex items-center gap-3 rounded-2xl p-2 text-left ring-2 transition sm:flex-col sm:items-stretch ${
                        stayId === s.id ? "bg-forest/5 ring-forest" : "ring-forest/10 hover:ring-forest/30"
                      }`}
                    >
                      <span className="relative block aspect-square w-16 shrink-0 overflow-hidden rounded-xl sm:aspect-[4/3] sm:w-full">
                        <Img src={s.images[0].src} alt="" fill sizes="(min-width: 640px) 200px, 64px" className="object-cover" />
                      </span>
                      <span className="sm:px-1 sm:pb-1">
                        <span className="block text-sm font-semibold text-forest">{s.name}</span>
                        <span className="block text-xs text-ink/55">{s.guests}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-semibold text-forest">2. Your dates</legend>
                <div className="mt-1 grid gap-3 min-[420px]:grid-cols-2">
                  <label className="block text-sm text-ink/60">
                    Check-in
                    <input
                      type="date"
                      value={checkIn}
                      min={today || undefined}
                      onFocus={markToday}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        if (!checkOut || checkOut <= e.target.value) {
                          const d = new Date(e.target.value + "T00:00:00");
                          d.setDate(d.getDate() + 1);
                          setCheckOut(localIso(d));
                        }
                      }}
                      className={field}
                    />
                  </label>
                  <label className="block text-sm text-ink/60">
                    Check-out
                    <input type="date" value={checkOut} min={checkIn || today || undefined} onFocus={markToday} onChange={(e) => setCheckOut(e.target.value)} className={field} />
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-semibold text-forest">3. Guests & rooms</legend>
                <div className="mt-2 grid gap-x-6 sm:grid-cols-3">
                  <Stepper label="Adults" value={adults} min={1} max={30} onChange={setAdults} />
                  <Stepper label="Children" value={kids} min={0} max={20} onChange={setKids} />
                  <Stepper label="Rooms" value={roomsUsed} min={minRooms} max={bookingRules.maxRooms} onChange={setRooms} />
                </div>
                {minRooms > 1 && (
                  <p className="mt-1 text-xs text-ink/55">
                    {adults + kids} guests need at least {minRooms} {stay.short}s.
                  </p>
                )}
              </fieldset>

              <label className="block">
                <span className="font-semibold text-forest">4. Meal plan</span>
                <select value={meal} onChange={(e) => setMeal(e.target.value)} className={field}>
                  <option value="">Decide later</option>
                  {mealPlans.map((m) => (
                    <option key={m.code} value={m.code}>
                      {m.name} ({m.code})
                    </option>
                  ))}
                </select>
                <span className="mt-1 block text-xs text-ink/55">Meals are confirmed and paid at the resort.</span>
              </label>

              <fieldset>
                <legend className="font-semibold text-forest">5. Your details</legend>
                <div className="mt-1 grid gap-3 sm:grid-cols-2">
                  <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Full name *" className={field} />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="Mobile number *" className={field} />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" inputMode="email" autoComplete="email" placeholder="Email (for the receipt)" className={`${field} sm:col-span-2`} />
                </div>
              </fieldset>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-24 lg:self-start" data-reveal>
              <div className="rounded-3xl bg-forest p-6 text-white md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sunset">Your stay</p>
                <h3 className="mt-2 font-display text-2xl">{stay.name}</h3>
                {ok ? (
                  <>
                    <p className="mt-1 text-sm text-white/65">
                      {pretty(checkIn)} → {pretty(checkOut)} · {ok.nights} night{ok.nights > 1 ? "s" : ""} · {ok.rooms} room
                      {ok.rooms > 1 ? "s" : ""}
                    </p>
                    <dl className="mt-5 space-y-2 border-t border-white/15 pt-5 text-sm">
                      <Row k={`${inr(ok.roomRate)} × ${ok.nights} night${ok.nights > 1 ? "s" : ""} × ${ok.rooms}`} v={inr(ok.subtotal)} />
                      <Row k="Taxes & fees" v={inr(ok.taxes)} />
                      <Row k="Total" v={inr(ok.total)} strong />
                    </dl>

                    <div className="mt-5 grid grid-cols-2 gap-1 rounded-2xl bg-white/10 p-1 text-sm font-semibold">
                      {[false, true].map((full) => (
                        <button
                          key={String(full)}
                          onClick={() => setPayFull(full)}
                          aria-pressed={payFull === full}
                          className={`min-h-11 rounded-xl px-2 transition ${payFull === full ? "bg-cream text-forest" : "text-white/75"}`}
                        >
                          {full ? "Pay in full" : `${bookingRules.advancePercent}% advance`}
                        </button>
                      ))}
                    </div>
                    <dl className="mt-4 space-y-2 text-sm">
                      <Row k="Pay now" v={inr(ok.payNow)} strong />
                      {ok.payAtResort > 0 && <Row k="Pay at the resort" v={inr(ok.payAtResort)} />}
                    </dl>
                  </>
                ) : (
                  <p className="mt-3 text-sm text-white/65">
                    {q && "error" in q ? q.error : "Choose your dates to see the price."}
                  </p>
                )}

                {error && <p className="mt-4 rounded-xl bg-ember/20 px-3 py-2 text-sm text-white">{error}</p>}

                <button
                  onClick={pay}
                  disabled={busy}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-sunset px-6 py-4 font-semibold transition hover:bg-ember disabled:opacity-60"
                >
                  {busy ? "Starting secure payment…" : ok ? `Pay ${inr(ok.payNow)} securely` : "Pay securely"}
                </button>
                <p className="mt-3 text-center text-xs text-white/50">
                  🔒 UPI · Cards · Netbanking · Wallets — powered by Razorpay
                </p>
              </div>
              <p className="mt-4 text-center text-xs text-ink/55">
                Rates shown are our indicative starting rates; weekends and peak season can differ. Rather talk first?{" "}
                <a href={waHref(summaryText())} target="_blank" rel="noopener noreferrer" className="font-semibold text-forest underline">
                  Book on WhatsApp
                </a>
              </p>
            </aside>
          </div>
        )}
      </div>

      {/* Demo payment window — shown only while live keys aren't configured */}
      {demoOpen && ok && (
        <div className="fixed inset-0 z-[70] grid place-items-end bg-black/60 p-3 sm:place-items-center" role="dialog" aria-label="Demo payment" data-lenis-prevent>
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-ink shadow-2xl">
            <p className="inline-block rounded-full bg-sunset/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ember">
              Demo mode — no money is charged
            </p>
            <h3 className="mt-4 font-display text-2xl text-forest">Pay {inr(ok.payNow)}</h3>
            <p className="mt-1 text-sm text-ink/60">
              {stay.name} · {ok.nights} night{ok.nights > 1 ? "s" : ""} · {ok.rooms} room{ok.rooms > 1 ? "s" : ""}
            </p>
            <p className="mt-4 text-sm text-ink/70">
              Once the resort&apos;s Razorpay account is connected, guests will see Razorpay&apos;s secure checkout here
              (UPI, cards, netbanking).
            </p>
            <div className="mt-6 grid gap-2">
              <button
                onClick={() => {
                  setDemoOpen(false);
                  setDone({ ref: `DEMO-${Date.now().toString(36).toUpperCase()}`, demo: true, paid: ok.payNow });
                }}
                className="min-h-12 rounded-2xl bg-forest font-semibold text-white"
              >
                Simulate successful payment
              </button>
              <button onClick={() => setDemoOpen(false)} className="min-h-12 rounded-2xl font-semibold text-forest ring-1 ring-forest/15">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${strong ? "text-base font-semibold" : "text-white/75"}`}>
      <dt>{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-ink/70">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Fewer ${label.toLowerCase()}`}
          className="grid size-10 place-items-center rounded-full text-lg ring-1 ring-forest/15 disabled:opacity-30"
        >
          −
        </button>
        <span className="w-6 text-center font-semibold tabular-nums">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`More ${label.toLowerCase()}`}
          className="grid size-10 place-items-center rounded-full text-lg ring-1 ring-forest/15 disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  );
}
