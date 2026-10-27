"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { asset, journey, pad, type Stop } from "@/lib/site";
import { Lines, Reveal } from "./Reveal";

const stopLogo = (s: Stop) =>
  s.sub.includes("Infosys")
    ? "infosys-mark.png"
    : s.title.startsWith("Nexodus")
      ? "nexodus-mark.png"
      : s.title === "Northeastern"
        ? "northeastern-mark.png"
        : s.title === "Living Stones"
          ? "livingstones-mark.png"
          : "";

function StopBlock({ stop, index, active, onActive }: { stop: Stop; index: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <article ref={ref} className={`stop ${active ? "stop--active" : ""}`} aria-labelledby={`stop-${index}`}>
      <p className="stop__count mono">{pad(index + 1)} / {pad(journey.length)}</p>
      <h3 id={`stop-${index}`} className="stop__title">
        {stop.title} <span>{stop.sub}</span>
      </h3>
      <Reveal>
        <p className="stop__mission mono">Mission · {stop.mission}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="stop__story">{stop.story}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <blockquote className="stop__thought">“{stop.thought}”</blockquote>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="stop__reward">Unlocked · <b>{stop.reward}</b></p>
      </Reveal>
      {stop.title === "Graduation" && <GradPhoto />}
    </article>
  );
}

function GradPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);
  const clip = useTransform(scrollYProgress, [0, 0.35], reduce ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(18% 10% 18% 10% round 28px)", "inset(0% 0% 0% 0% round 28px)"]);
  return (
    <motion.div ref={ref} className="grad" style={{ clipPath: clip }}>
      <motion.img
        src={asset("/img/graduation.jpg")}
        alt="Divya at graduation on the Boston waterfront, raising her cap"
        style={{ y, scale: 1.25 }}
      />
    </motion.div>
  );
}

export default function Journey({ asPage = false }: { asPage?: boolean }) {
  const Title = asPage ? "h1" : "h2";
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const current = journey[active];

  return (
    <section ref={ref} id="journey" className={`journey ${asPage ? "journey--page" : ""}`} aria-labelledby="journey-title">
      <header className="section-head">
        <p className="eyebrow">My journey</p>
        <Title id="journey-title" className={asPage ? "page-title" : "section-title"}>
          <Lines lines={["Ten stops that changed", "how I work with data."]} />
        </Title>
      </header>

      <div className="journey__grid">
        <aside className="journey__panel" aria-hidden="true">
          <div className="journey__sticky">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="journey__num">{pad(active + 1)}</p>
                {stopLogo(current) && (
                  <img src={asset(`/img/${stopLogo(current)}`)} alt="" className="journey__logo" />
                )}
                <p className="journey__place">{current.title}</p>
                <p className="journey__sub mono">{current.sub}</p>
              </motion.div>
            </AnimatePresence>
            <div className="journey__rail">
              <motion.i style={{ scaleY: progress }} />
            </div>
          </div>
        </aside>

        <div className="journey__stops">
          <div className="journey__mobilebar" aria-hidden="true">
            <motion.i style={{ scaleX: progress }} />
          </div>
          {journey.map((s, i) => (
            <StopBlock key={i} stop={s} index={i} active={i === active} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}
