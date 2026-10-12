import { nearby } from "@/lib/site";
import { PinIcon } from "./icons";

export default function Nearby() {
  return (
    <section id="nearby" className="px-4 py-16 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-2 md:items-end" data-reveal>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Explore nearby</p>
            <h2 className="font-display text-[1.6rem] font-light text-forest md:text-[2.125rem]">Shimla on your doorstep.</h2>
          </div>
          <p className="text-[15px] text-ink/70 md:pb-2">
            Stay in the quiet of the forest and still reach Shimla&apos;s favourite spots for a day out. Ask us and
            we&apos;ll arrange a cab.
          </p>
        </div>

        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {nearby.map((n) => (
            <li
              key={n.name}
              className="flex w-[78%] shrink-0 snap-start gap-4 rounded-3xl bg-white p-5 ring-1 ring-forest/10 sm:w-auto md:p-6"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sand text-forest">
                <PinIcon />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-display text-xl text-forest">{n.name}</h3>
                  <span className="text-sm font-semibold text-sunset">~{n.time}</span>
                </div>
                <p className="mt-1 text-sm text-ink/65">{n.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-center text-xs text-ink/45">Approximate drive times from the resort; traffic and season vary.</p>
      </div>
    </section>
  );
}
