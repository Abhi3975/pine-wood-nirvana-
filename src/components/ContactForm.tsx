"use client";

import { useState } from "react";
import { site, stays, telHref, waHref } from "@/lib/site";
import { CheckIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

const topics = ["Booking enquiry", "Group / celebration", "Meal plans", "Directions", "Something else"];

type Form = {
  name: string;
  phone: string;
  email: string;
  topic: string;
  stay: string;
  date: string;
  guests: string;
  message: string;
};

const empty: Form = { name: "", phone: "", email: "", topic: topics[0], stay: "", date: "", guests: "2", message: "" };

/**
 * No backend needed: the enquiry is formatted into one message and handed to WhatsApp
 * (or the guest's mail app), so it lands with the resort team straight away.
 */
export default function ContactForm() {
  const [f, setF] = useState<Form>(empty);
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  const digits = f.phone.replace(/\D/g, "");
  const errors = {
    name: f.name.trim().length < 2 ? "Please tell us your name" : "",
    phone: digits.length < 10 ? "Enter a valid 10-digit mobile number" : "",
    email: f.email && !/^\S+@\S+\.\S+$/.test(f.email) ? "That email doesn't look right" : "",
  };
  const valid = !errors.name && !errors.phone && !errors.email;

  const stayName = stays.find((s) => s.id === f.stay)?.name;
  const details = [
    `📌 ${f.topic}`,
    `🙋 ${f.name.trim()}`,
    `📞 ${f.phone.trim()}`,
    f.email && `✉️ ${f.email.trim()}`,
    stayName && `🏡 Interested in: ${stayName}`,
    f.date && `📅 Around: ${new Date(f.date + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`,
    f.guests && `👥 Guests: ${f.guests}`,
  ].filter(Boolean);
  const text = [
    `Hi ${site.name}! 👋 New enquiry from your website:`,
    "",
    ...details,
    ...(f.message.trim() ? ["", `💬 ${f.message.trim()}`] : []),
  ].join("\n");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    window.open(waHref(text), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Website enquiry: ${f.topic} — ${f.name.trim() || "Guest"}`)}&body=${encodeURIComponent(text)}`;

  const field =
    "mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-base outline-none transition focus:border-pine focus:ring-4 focus:ring-pine/10";
  const ok = "border-forest/15";
  const bad = "border-ember/60";

  return (
    <section id="contact" className="px-4 py-16 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        {/* Left: invitation + direct lines */}
        <div data-reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Contact us</p>
          <h2 className="font-display text-[1.6rem] font-light text-forest md:text-3xl">Send us a message.</h2>
          <p className="mt-4 text-[15px] text-ink/70">
            Tell us a little about your trip and our team will get back to you with availability, rates and anything
            else you need.
          </p>

          <ul className="mt-8 hidden space-y-3 sm:block">
            <li>
              <a href={telHref()} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-forest/10 transition hover:ring-forest/30">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest text-white">
                  <PhoneIcon />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-ink/50">Call us</span>
                  <span className="font-semibold text-forest">{site.phones[0]}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-forest/10 transition hover:ring-forest/30">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sunset text-white">
                  <MailIcon />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-ink/50">Email</span>
                  <span className="block truncate font-semibold text-forest">{site.email}</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-forest/10">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-forest">
                <PinIcon />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-ink/50">Visit</span>
                <span className="font-semibold text-forest">{site.address}</span>
              </span>
            </li>
          </ul>
        </div>

        {/* Right: the form */}
        <div className="rounded-3xl bg-sand/70 p-5 sm:p-8" data-reveal>
          {sent ? (
            <div className="flex min-h-80 flex-col items-center justify-center text-center">
              <span className="grid size-16 place-items-center rounded-full bg-[#25D366] text-white">
                <CheckIcon className="size-8" />
              </span>
              <h3 className="mt-5 font-display text-3xl text-forest">Thank you, {f.name.trim().split(" ")[0]}!</h3>
              <p className="mt-2 max-w-sm text-ink/70">
                Your message is ready in WhatsApp — just tap <b>send</b> there. We usually reply within minutes.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={waHref(text)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
                >
                  <WhatsAppIcon className="size-4" /> Open WhatsApp again
                </a>
                <button
                  onClick={() => {
                    setF(empty);
                    setTouched(false);
                    setSent(false);
                  }}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-forest ring-1 ring-forest/15"
                >
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-forest">Your name *</span>
                <input
                  value={f.name}
                  onChange={set("name")}
                  autoComplete="name"
                  placeholder="e.g. Priya Sharma"
                  aria-invalid={touched && !!errors.name}
                  className={`${field} ${touched && errors.name ? bad : ok}`}
                />
                {touched && errors.name && <span className="mt-1 block text-xs text-ember">{errors.name}</span>}
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-forest">Mobile number *</span>
                <input
                  value={f.phone}
                  onChange={set("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="98765 43210"
                  aria-invalid={touched && !!errors.phone}
                  className={`${field} ${touched && errors.phone ? bad : ok}`}
                />
                {touched && errors.phone && <span className="mt-1 block text-xs text-ember">{errors.phone}</span>}
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold text-forest">
                  Email <span className="font-normal text-ink/45">(optional)</span>
                </span>
                <input
                  value={f.email}
                  onChange={set("email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={touched && !!errors.email}
                  className={`${field} ${touched && errors.email ? bad : ok}`}
                />
                {touched && errors.email && <span className="mt-1 block text-xs text-ember">{errors.email}</span>}
              </label>

              <fieldset className="sm:col-span-2">
                <legend className="text-sm font-semibold text-forest">What&apos;s it about?</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setF((p) => ({ ...p, topic: t }))}
                      aria-pressed={f.topic === t}
                      className={`min-h-10 rounded-full px-3.5 py-2 text-sm font-medium ring-1 transition ${
                        f.topic === t ? "bg-forest text-white ring-forest" : "bg-white text-ink/75 ring-forest/15 hover:ring-forest/40"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className="text-sm font-semibold text-forest">Cottage</span>
                <select value={f.stay} onChange={set("stay")} className={`${field} ${ok}`}>
                  <option value="">Not sure yet</option>
                  {stays.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-[1fr_6rem] gap-3">
                <label className="block">
                  <span className="text-sm font-semibold text-forest">Arrival</span>
                  <input type="date" value={f.date} onChange={set("date")} className={`${field} ${ok}`} />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-forest">Guests</span>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    inputMode="numeric"
                    value={f.guests}
                    onChange={set("guests")}
                    className={`${field} ${ok}`}
                  />
                </label>
              </div>

              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold text-forest">Message</span>
                <textarea
                  value={f.message}
                  onChange={set("message")}
                  rows={4}
                  placeholder="Anything we should know — occasion, pets, food preferences, questions…"
                  className={`${field} ${ok} resize-none`}
                />
              </label>

              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 font-semibold text-white shadow-lg shadow-[#25D366]/25 transition hover:bg-[#1ebe5a] active:scale-[0.99]"
                >
                  <WhatsAppIcon /> Send on WhatsApp
                </button>
                <a
                  href={valid ? mailto : undefined}
                  onClick={(e) => {
                    setTouched(true);
                    if (!valid) e.preventDefault();
                  }}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-forest ring-1 ring-forest/15 transition hover:ring-forest/40"
                >
                  <MailIcon /> Email instead
                </a>
              </div>
              <p className="text-xs text-ink/45 sm:col-span-2">
                We only use your details to reply to this enquiry.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
