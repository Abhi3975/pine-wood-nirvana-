import { faqs, waHref } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

export default function FAQ() {
  return (
    <section id="faq" className="bg-sand/60 px-4 py-16 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div data-reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Good to know</p>
          <h2 className="font-display text-[1.75rem] font-light text-forest md:text-3xl">Questions, answered.</h2>
          <p className="mt-4 text-ink/70">Something else on your mind? We&apos;re one message away.</p>
          <a
            href={waHref("Hi! I have a question about staying at Pine Wood Nirvana.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white hover:bg-[#1ebe5a]"
          >
            <WhatsAppIcon /> Ask on WhatsApp
          </a>
        </div>

        <div className="divide-y divide-forest/10 border-y border-forest/10" data-reveal>
          {faqs.map((f) => (
            <details key={f.q} className="faq group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold text-forest md:text-lg [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sand text-xl leading-none transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-5 pr-10 text-ink/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
