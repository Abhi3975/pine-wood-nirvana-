import { mapPin, mapsDirectionsHref, mapsEmbedSrc, mapsOpenHref, site, stayTimes, waHref } from "@/lib/site";
import { ArrowIcon, PinIcon, WhatsAppIcon } from "./icons";

export default function MapSection() {
  return (
    <section id="map" aria-label="Map" className="relative bg-forest">
      <iframe
        title={`Google Map — ${site.fullName}`}
        src={mapsEmbedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="block h-[300px] w-full border-0 md:h-[560px]"
      />

      {/* Info card: floats over the map on desktop, sits under it on phones */}
      <div className="px-4 py-6 md:pointer-events-none md:absolute md:inset-0 md:flex md:items-end md:px-8 md:py-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-3xl bg-cream p-6 shadow-2xl md:pointer-events-auto md:max-w-md md:p-8" data-reveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Find us on Google Maps</p>
            <h2 className="font-display text-2xl text-forest md:text-2xl">{site.fullName}</h2>
            <p className="mt-3 flex items-start gap-2 text-ink/70">
              <PinIcon className="mt-0.5 size-5 shrink-0 text-sunset" />
              Paughat, Shoghi, off NH-5, Shimla, Himachal Pradesh 171006
            </p>
            {!mapPin.exact && (
              <p className="mt-3 rounded-xl bg-sand px-3 py-2 text-sm text-ink/70">
                The map shows <b>{mapPin.label}</b>. From the Shoghi Police Check Post, take the slip road down about
                2.5 km — or ask us for a live location pin.
              </p>
            )}

            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-white p-3 ring-1 ring-forest/10">
                <dt className="text-xs uppercase tracking-wider text-ink/50">Check-in</dt>
                <dd className="text-lg font-semibold text-forest">{stayTimes.checkIn}</dd>
              </div>
              <div className="rounded-xl bg-white p-3 ring-1 ring-forest/10">
                <dt className="text-xs uppercase tracking-wider text-ink/50">Check-out</dt>
                <dd className="text-lg font-semibold text-forest">{stayTimes.checkOut}</dd>
              </div>
            </dl>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              <a
                href={mapsDirectionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-forest px-4 py-3.5 font-semibold text-white hover:bg-pine"
              >
                Directions <ArrowIcon className="size-4" />
              </a>
              <a
                href={waHref("Hi! Please share the live location pin of Pine Wood Nirvana.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3.5 font-semibold text-white hover:bg-[#1ebe5a]"
              >
                <WhatsAppIcon className="size-4" /> Live location
              </a>
              <a
                href={mapsOpenHref}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 text-center text-sm font-medium text-forest underline-offset-4 hover:underline sm:col-span-2"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
