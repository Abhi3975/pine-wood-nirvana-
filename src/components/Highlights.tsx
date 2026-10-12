import { highlights } from "@/lib/site";

/** Quick-scan strip right under the hero; swipes sideways on phones. */
export default function Highlights() {
  return (
    <section aria-label="Highlights" className="border-b border-forest/10 bg-cream">
      <ul className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory gap-3 overflow-x-auto px-4 py-6 md:grid md:grid-cols-6 md:gap-6 md:px-8 md:py-10">
        {highlights.map((h) => (
          <li
            key={h.title}
            className="flex w-[64%] shrink-0 snap-start items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-forest/10 sm:w-[40%] md:w-auto md:flex-col md:bg-transparent md:p-0 md:ring-0"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-xl" aria-hidden>
              {h.icon}
            </span>
            <span>
              <span className="block font-semibold text-forest">{h.title}</span>
              <span className="block text-sm text-ink/60">{h.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
