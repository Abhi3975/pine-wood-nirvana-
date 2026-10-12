import Image from "next/image";
import { blogPosts, site } from "@/lib/site";
import { ArrowIcon } from "./icons";

export default function Blog() {
  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="mx-auto mb-8 flex max-w-7xl flex-wrap items-end justify-between gap-5 px-4 md:mb-12 md:px-8" data-reveal>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">From our blog</p>
          <h2 className="font-display text-[1.6rem] font-light text-forest md:text-[2.125rem]">Travel stories & guides.</h2>
        </div>
        <a
          href={`${site.parentSite}/blogs/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-pine"
        >
          All articles <ArrowIcon className="size-4" />
        </a>
      </div>

      {/* Swipeable on phones, a grid from tablet up */}
      <ul
        className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-8"
        data-reveal
      >
        {blogPosts.map((b) => (
          <li
            key={b.href}
            className="w-[70%] shrink-0 snap-start sm:w-[45%] md:w-auto"
          >
            <a
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-forest/10 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="relative block aspect-[2/1] overflow-hidden">
                <Image
                  src={b.img}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 80vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold text-forest">
                  {b.tag}
                </span>
              </span>
              <span className="flex flex-col p-4 md:p-5">
                <span className="font-display text-base text-forest md:text-lg">{b.title}</span>
                <span className="mt-2 line-clamp-2 text-sm text-ink/65">{b.excerpt}</span>
                <span className="mt-4 flex items-center justify-between text-xs font-semibold text-sunset">
                  <span>Read on ghumog.in →</span>
                  <span className="font-normal text-ink/45">{b.lang}</span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
