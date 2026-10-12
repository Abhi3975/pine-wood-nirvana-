import { ghumog, site } from "@/lib/site";
import Img from "./Img";

const directPerks = [
  { title: "Best rate, direct", text: "No middlemen or booking fees — the price you agree on WhatsApp is the price you pay." },
  { title: "A real person replies", text: "Our team answers on WhatsApp within minutes, not a call-centre queue." },
  { title: "Local, on the ground", text: "Our corporate office is right here in Shoghi — help is never far away." },
];

export default function About() {
  return (
    <section id="about" className="overflow-hidden bg-forest px-4 py-16 text-white md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative" data-reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl md:aspect-[5/4] lg:aspect-[4/5]">
            <Img src="/images/evening-cottages.webp" alt="Cottages lit up in the evening" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute bottom-4 right-4 rounded-2xl bg-cream px-5 py-4 text-forest shadow-2xl">
            <p className="font-display text-3xl">{ghumog.years}</p>
            <p className="text-sm text-ink/60">in travel & hospitality</p>
          </div>
        </div>

        <div data-reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">About {site.brand}</p>
          <h2 className="font-display text-3xl font-light md:text-4xl">Hosted by people who love the hills.</h2>
          <p className="mt-5 text-base md:text-lg text-white/75">
            Pine Wood Nirvana is part of <b className="text-white">GhumoG Stay</b> by GhumoG Tour Planners — founded by{" "}
            {ghumog.founder}, with {ghumog.years} in travel and hospitality. <i>Har Safar Kuch Khass…</i> isn&apos;t
            just our tagline; it&apos;s how we look after every guest.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4">
            {ghumog.stats.map((s) => (
              <div key={s.label} className="bg-forest p-4 text-center">
                <dt className="font-display text-3xl text-sunset">{s.value}</dt>
                <dd className="mt-1 text-xs text-white/60">{s.label}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-10 space-y-5">
            {directPerks.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-sunset" />
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm text-white/65">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
