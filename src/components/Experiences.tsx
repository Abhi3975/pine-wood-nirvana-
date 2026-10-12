import Img from "@/components/Img";
import { amenities, experiences } from "@/lib/site";

export default function Experiences() {
  return (
    <section id="experiences" className="bg-sand/60 py-16 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid px-4 md:mb-14 md:px-8 gap-6 md:grid-cols-2 md:items-end" data-reveal>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Experiences</p>
            <h2 className="font-display text-[1.75rem] font-light text-forest md:text-4xl">Days by the pool, nights by the fire.</h2>
          </div>
          <p className="text-[15px] md:text-base text-ink/70 md:pb-2">
            Fresh mountain air, pine forests all around and everything you need for a slow weekend — without ever
            getting back in the car.
          </p>
        </div>

        {/* Swipeable on phones, a grid from tablet up */}
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible md:px-8 lg:grid-cols-3" data-reveal>
          {experiences.map((x) => (
            <figure
              key={x.title}
              className="group relative aspect-[4/5] w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl bg-forest sm:w-auto sm:aspect-[4/3]"
            >
              <Img
                src={x.img}
                alt={x.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 78vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="font-display text-xl md:text-2xl">{x.title}</h3>
                <p className="mt-1.5 text-sm text-white/80">{x.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-2.5 px-4 md:mt-14 md:gap-3 md:px-8" data-reveal>
          {amenities.map((a) => (
            <li key={a} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-forest ring-1 ring-forest/10">
              {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
