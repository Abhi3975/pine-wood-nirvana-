import { nearby } from "@/lib/site";
import { PinIcon } from "./icons";

export default function Nearby() {
  return (
    <section id="nearby" className="px-4 py-16 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-2 md:items-end" data-reveal>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Explore nearby</p>
            <h2 className="font-display text-4xl font-light text-forest md:text-6xl">Shimla on your doorstep.</h2>
          </div>
          <p className="text-lg text-ink/70 md:pb-2">
            Stay in the quiet of the forest and still reach Shimla&apos;s favourite spots for a day out. Ask us and
            we&apos;ll arrange a cab.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nearby.map((n, i) => (
            <li
              key={n.name}
              className="flex gap-4 rounded-3xl bg-white p-5 ring-1 ring-forest/10 md:p-6"
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
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
