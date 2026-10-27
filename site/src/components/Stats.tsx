"use client";
import { motion, useReducedMotion } from "motion/react";
import { journey, projects } from "@/lib/site";

const stats = [
  { value: String(projects.length), label: "Case files" },
  { value: String(journey.length), label: "Journey stops" },
  { value: "6", label: "Organizations" },
  { value: "3.9", label: "MPS GPA" },
];

export default function Stats() {
  const reduce = useReducedMotion();
  return (
    <section className="stats" aria-label="At a glance">
      <ul className="stats__grid">
        {stats.map((s, i) => (
          <motion.li
            key={s.label}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="stats__value">{s.value}</span>
            <span className="stats__label">{s.label}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
