import About from "@/components/About";
import Concierge from "@/components/Concierge";
import DayHere from "@/components/DayHere";
import Experiences from "@/components/Experiences";
import FAQ from "@/components/FAQ";
import Film from "@/components/Film";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Img from "@/components/Img";
import Location from "@/components/Location";
import MobileBar from "@/components/MobileBar";
import Nearby from "@/components/Nearby";
import Reveal from "@/components/Reveal";
import SmoothScroll from "@/components/SmoothScroll";
import Stays from "@/components/Stays";
import WaysToStay from "@/components/WaysToStay";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Welcome />
        <Stays />
        <DayHere />
        <Experiences />
        <WaysToStay />
        <Film />
        <Gallery />
        <Nearby />
        <Location />
        <About />
        <FAQ />
      </main>
      <Footer />
      <MobileBar />
      <Concierge />
      <Reveal />
      <SmoothScroll />
    </>
  );
}

function Welcome() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div data-reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sunset">Welcome</p>
          <h2 className="font-display text-4xl leading-tight font-light text-forest md:text-5xl">
            A private pine forest above Shimla, with cottages hidden among the trees.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Lantern-lit stone paths wind between red-roofed cottages and timber cabins. Mornings smell of pine; evenings
            end around the bonfire under fairy lights. Pine Wood Nirvana is where you come to slow down — fresh mountain
            air, the hum of the forest and a valley view from almost everywhere.
          </p>
          <p className="mt-6 font-display text-xl text-bark italic">— Warmly, the GhumoG Stay family</p>
        </div>
        <div className="grid grid-cols-2 gap-4" data-reveal>
          <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-3xl">
            <Img src="/images/path-cottage.webp" alt="Lantern-lit stone walkway to a cottage" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
            <Img src="/images/pool-sunset.webp" alt="Pool at sunset beneath the pines" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
