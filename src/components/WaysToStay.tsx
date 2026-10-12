import { waHref, waysToStay } from "@/lib/site";
import { ArrowIcon, CheckIcon } from "./icons";
import Img from "./Img";

export default function WaysToStay() {
  return (
    <section id="plan" className="py-16 md:py-28">
      <div className="mx-auto mb-10 max-w-7xl px-4 md:mb-14 md:px-8" data-reveal>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Plan your trip</p>
        <h2 className="max-w-2xl font-display text-[1.6rem] font-light text-forest md:text-[2.125rem]">Who&apos;s coming along?</h2>
        <p className="mt-4 max-w-xl text-[15px] text-ink/70">
          Tell us who you&apos;re travelling with and we&apos;ll suggest the right cottages and set things up before
          you arrive.
        </p>
      </div>

      {/* Swipeable on phones, a grid from tablet up */}
      <ul className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-8 lg:grid-cols-4" data-reveal>
        {waysToStay.map((w) => (
          <li
            key={w.title}
            className="flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-forest/10 sm:w-[46%] md:w-auto"
          >
            <div className="relative aspect-[4/3]">
              <Img src={w.img} alt={w.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 82vw" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-lg md:text-xl text-forest">{w.title}</h3>
              <p className="mt-1 text-ink/65">{w.pitch}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {w.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-ink/80">
                    <CheckIcon className="size-4 shrink-0 text-moss" /> {p}
                  </li>
                ))}
              </ul>
              <a
                href={waHref(w.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-pine"
              >
                Plan this trip <ArrowIcon className="size-4" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
