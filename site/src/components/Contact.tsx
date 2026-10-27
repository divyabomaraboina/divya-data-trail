"use client";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { profile } from "@/lib/site";
import { Lines, Reveal } from "./Reveal";

function Magnetic({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const move = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.a ref={ref} href={href} className="contact__mail" style={{ x, y }} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </motion.a>
  );
}

export default function Contact({ asPage = false }: { asPage?: boolean }) {
  const Title = asPage ? "h1" : "h2";
  return (
    <section id="contact" className={`contact ${asPage ? "contact--page" : ""}`} aria-labelledby="contact-title">
      <div className="contact__bg" aria-hidden="true">
        <div className="blob blob--clay" />
        <div className="blob blob--sage" />
      </div>
      <p className="eyebrow">The next stop</p>
      <Title id="contact-title" className="contact__title">
        <Lines lines={["The trail is", "still growing."]} />
      </Title>
      <Reveal>
        <p className="contact__lede">If this way of thinking resonates with you, reach me at</p>
      </Reveal>
      <Reveal delay={0.1}>
        <Magnetic href={`mailto:${profile.email}`}>{profile.email}</Magnetic>
      </Reveal>
      <Reveal delay={0.2} className="contact__links">
        <a href={profile.linkedin} target="_blank" rel="noopener" className="btn">LinkedIn ↗</a>
        <a href={profile.github} target="_blank" rel="noopener" className="btn">GitHub ↗</a>
      </Reveal>
    </section>
  );
}
