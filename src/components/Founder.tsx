import { founder, socials, waHref } from "@/lib/site";
import { InstagramIcon, QuoteIcon, WhatsAppIcon } from "./icons";
import Img from "./Img";

export default function Founder() {
  return (
    <section id="founder" className="px-4 py-16 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
        {/* Portrait */}
        <div className="relative mx-auto w-44 sm:w-52 md:w-60" data-reveal>
          <div className="absolute -inset-3 -rotate-3 rounded-[2rem] bg-sunset/15" aria-hidden />
          <div className="relative aspect-[328/606] overflow-hidden rounded-[2rem] shadow-2xl ring-4 ring-white">
            <Img src={founder.photo} alt={`${founder.name}, founder of GhumoG Stay`} fill sizes="288px" className="object-cover" />
          </div>
          <div className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full bg-forest px-5 py-2.5 text-center text-white shadow-xl">
            <p className="font-display text-[15px] leading-tight">{founder.name}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-white/60">Founder</p>
          </div>
        </div>

        {/* Story */}
        <div className="pt-4 md:pt-0" data-reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Meet the founder</p>
          <h2 className="font-display text-[1.6rem] font-light text-forest md:text-3xl">{founder.name}</h2>
          <p className="mt-2 text-sm font-medium text-ink/55">{founder.roles.join(" · ")}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {founder.tags.map((t) => (
              <li key={t} className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-forest">
                {t}
              </li>
            ))}
          </ul>

          {founder.bio.map((p) => (
            <p key={p.slice(0, 20)} className="mt-5 text-[15px] leading-relaxed text-ink/70">
              {p}
            </p>
          ))}

          <figure className="mt-8 rounded-3xl bg-forest p-6 text-white md:p-8">
            <QuoteIcon className="size-7 text-sunset" />
            <blockquote className="mt-3 font-display text-xl leading-snug md:text-2xl">{founder.vision}</blockquote>
            <figcaption className="mt-4 text-sm text-white/60">
              — {founder.name}&apos;s vision for GhumoG Stay · <i>Ghumog Bharke</i>
            </figcaption>
          </figure>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={socials.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
            >
              <InstagramIcon /> Follow {socials.instagram.handle}
            </a>
            <a
              href={waHref(`Hi ${founder.name.split(" ")[0]} ji! I'd love to plan a stay at Pine Wood Nirvana.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-forest ring-1 ring-forest/15 hover:ring-forest"
            >
              <WhatsAppIcon /> Message the team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
