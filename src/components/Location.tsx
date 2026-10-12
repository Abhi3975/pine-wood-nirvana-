import { mapsDirectionsHref, site, stayTimes, telHref, waHref } from "@/lib/site";
import { ArrowIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

const steps = [
  { t: "Reach Shoghi", d: "Drive up the Kalka–Shimla highway (NH-5) to Shoghi." },
  { t: "Take the U-turn", d: "At the Police Check Post, take the left/right U-turn down the slip road." },
  { t: "2.5 km into the forest", d: "Follow the road down to Village Paughat — the resort is 2.5 km from the highway." },
];

export default function Location() {
  return (
    <section id="location" className="bg-sand/60 px-4 py-16 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Getting here</p>
          <h2 className="font-display text-[1.6rem] font-light text-forest md:text-[2.125rem]">Close to Shimla, far from the noise.</h2>
          <p className="mt-5 flex items-start gap-2 text-[15px] text-ink/70">
            <PinIcon className="mt-1 size-5 shrink-0 text-sunset" /> {site.address}
          </p>

          <ol className="mt-8 space-y-5">
            {steps.map((s, i) => (
              <li key={s.t} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-forest font-display text-[15px] text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-forest">{s.t}</h3>
                  <p className="text-sm text-ink/70">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <a
              href={mapsDirectionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-pine"
            >
              Get directions <ArrowIcon className="size-4" />
            </a>
            <a
              href={waHref("Hi! Please share the live location of Pine Wood Nirvana.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1ebe5a]"
            >
              <WhatsAppIcon /> Location on WhatsApp
            </a>
            <a
              href={telHref()}
              className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-forest ring-1 ring-forest/15 hover:ring-forest"
            >
              <PhoneIcon /> {site.phones[0]}
            </a>
          </div>
        </div>

        <div className="self-center rounded-3xl bg-forest p-6 text-white md:p-8" data-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Good to know</p>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
            {[
              ["Check-in", stayTimes.checkIn],
              ["Check-out", stayTimes.checkOut],
              ["From the highway", "2.5 km"],
              ["Parking", "Free, on site"],
              ["Pets", "Welcome 🐾"],
              ["Nearest town", "Shoghi"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs uppercase tracking-wider text-white/50">{k}</dt>
                <dd className="mt-0.5 text-[15px] font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <a href="#map" className="mt-6 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-sunset hover:underline">
            See it on the map ↓
          </a>
        </div>
      </div>
    </section>
  );
}
