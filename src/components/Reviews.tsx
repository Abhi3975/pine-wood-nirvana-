import { reviews, reviewSources } from "@/lib/site";
import { ArrowIcon, QuoteIcon, StarIcon } from "./icons";

export default function Reviews() {
  const ta = reviewSources.tripadvisor;
  return (
    <section id="reviews" className="bg-sand/60 py-16 md:py-28">
      <div className="mx-auto mb-10 grid max-w-7xl gap-6 px-4 md:mb-14 md:grid-cols-2 md:items-end md:px-8" data-reveal>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Guest reviews</p>
          <h2 className="font-display text-4xl font-light text-forest md:text-6xl">In our guests&apos; words.</h2>
        </div>
        <a
          href={ta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 self-start rounded-2xl bg-white p-4 ring-1 ring-forest/10 transition hover:ring-forest/30 md:justify-self-end"
        >
          <span className="font-display text-5xl text-forest">{ta.rating}</span>
          <span>
            <span className="flex text-sunset">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} />
              ))}
            </span>
            <span className="block text-sm text-ink/60">
              Rated <b className="text-forest">Excellent</b> on Tripadvisor
            </span>
          </span>
        </a>
      </div>

      {/* Swipeable on phones, three columns on desktop */}
      <ul
        className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-8"
        data-reveal
      >
        {reviews.map((r) => (
          <li
            key={r.name}
            className="flex w-[85%] shrink-0 snap-start flex-col rounded-3xl bg-white p-6 ring-1 ring-forest/10 sm:w-[60%] md:w-auto md:p-8"
          >
            <QuoteIcon className="size-8 text-sunset/70" />
            <h3 className="mt-4 font-display text-xl text-forest">{r.title}</h3>
            <blockquote className="mt-3 flex-1 leading-relaxed text-ink/75">&ldquo;{r.text}&rdquo;</blockquote>
            <footer className="mt-6 flex items-center gap-3 border-t border-forest/10 pt-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest font-display text-lg text-white">
                {r.name[0]}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-forest">
                  {r.name}
                  {r.from && <span className="font-normal text-ink/50"> · {r.from}</span>}
                </span>
                <span className="block text-xs text-ink/55">{r.trip} · via Tripadvisor</span>
              </span>
            </footer>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap justify-center gap-3 px-4" data-reveal>
        <a
          href={ta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-pine"
        >
          Read all on Tripadvisor <ArrowIcon className="size-4" />
        </a>
        <a
          href={reviewSources.google}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-forest ring-1 ring-forest/15 hover:ring-forest"
        >
          See Google reviews <ArrowIcon className="size-4" />
        </a>
      </div>
    </section>
  );
}
