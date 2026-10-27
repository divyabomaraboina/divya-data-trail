"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { asset } from "@/lib/site";

const orgs = [
  { name: "Living Stones Foundation", symbol: true, role: "Geospatial Analyst", logo: "livingstones-mark.png", href: "/projects/aquawatch-water-risk/" },
  { name: "Nexodus Inc.", symbol: true, role: "Data Analytics Intern → AI & Data Analyst Co-op", logo: "nexodus-mark.png", href: "/projects/nexodus-automation/" },
  { name: "AnaChart", role: "Industry-sponsored capstone", logo: "anachart-mark.png", wide: true, href: "/projects/anachart/" },
  { name: "Traxidy", symbol: true, role: "Industry-sponsored project", logo: "traxidy-mark.png", href: "/projects/traxidy/" },
  { name: "Infosys", role: "Quality Assurance Analyst", logo: "infosys-mark.png", wide: true, href: "/#journey" },
  { name: "Northeastern University", symbol: true, role: "MPS Analytics", logo: "northeastern-mark.png", href: "/#journey" },
];

export default function LogoStrip() {
  const reduce = useReducedMotion();
  return (
    <section className="logos" aria-labelledby="logos-title">
      <p id="logos-title" className="eyebrow logos__title">Where I’ve worked, studied &amp; built</p>
      <ul className="logos__grid">
        {orgs.map((o, i) => (
          <motion.li
            key={o.name}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={o.href} className="logo" title={o.name}>
              <span className={`logo__mark ${o.wide ? "logo__mark--wide" : ""}`}>
                <img src={asset(`/img/${o.logo}`)} alt={o.name} loading="lazy" />
              </span>
              {"symbol" in o && o.symbol && <span className="logo__name">{o.name}</span>}
              <span className="logo__role">{o.role}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
