"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { asset } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blobA = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "25%"]);

  const up = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: "110%" },
          animate: { y: "0%" },
          transition: { duration: 1, delay, ease },
        };
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease },
        };

  return (
    <section ref={ref} className="hero" aria-label="Introduction">
      <div className="hero__bg" aria-hidden="true" data-depth="0">
        <motion.div className="blob blob--clay" style={{ y: blobA }} />
        <div className="blob blob--sage" />
      </div>

      <motion.div className="hero__inner" style={{ y: lift, opacity: fade }} data-depth="4">
        <h1 className="hero__title">
          <span className="sr-only">Hi, I’m Divya Bomaraboina</span>
          <span className="hero__row" aria-hidden="true">
            <span className="line-mask">
              <motion.span className="line-inner" {...up(0.1)}><span className="wave">👋</span></motion.span>
            </span>
            <span className="line-mask">
              <motion.span className="line-inner hero__hi" {...up(0.18)}>Hi!</motion.span>
            </span>
            <span className="line-mask">
              <motion.span className="line-inner" {...up(0.26)}>I’m</motion.span>
            </span>
            <motion.span
              className="hero__avatar"
              initial={reduce ? false : { scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.45 }}
            >
              <img src={asset("/img/divya.png")} alt="" />
              <span className="spark" />
            </motion.span>
            <span className="line-mask">
              <motion.span className="line-inner" {...up(0.34)}>Divya</motion.span>
            </span>
          </span>
        </h1>


        <motion.ul className="hero__facts" {...rise(0.85)}>
          <li><span aria-hidden="true">♡</span> Currently in the United States</li>
        </motion.ul>

        <motion.div className="hero__ctas" {...rise(1)}>
          <Link href="/#work" className="btn btn--solid">See my work</Link>
          <Link href="/#contact" className="btn btn--pink">Contact me</Link>
        </motion.div>
      </motion.div>

    </section>
  );
}
