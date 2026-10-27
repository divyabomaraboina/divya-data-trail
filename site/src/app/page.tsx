import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import ProjectTiles from "@/components/ProjectTiles";
import Marquee from "@/components/Marquee";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import { Lines, Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />

      <section id="work" className="section" aria-labelledby="work-title">
        <header className="section-head section-head--split">
          <div>
            <p className="eyebrow">My work</p>
            <h2 id="work-title" className="section-title">
              <Lines lines={["Real data, messy problems,", "honest results."]} />
            </h2>
          </div>
          <Reveal className="section-head__aside">
            <p>
              Each case file starts with the business problem, then the approach, what I built, and the twists that
              changed my thinking.
            </p>
          </Reveal>
        </header>
        <ProjectTiles />
      </section>

      <Marquee />
      <Journey />
      <Contact />
    </>
  );
}
