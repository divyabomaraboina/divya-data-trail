"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { asset, logoOrg, pad, type Project } from "@/lib/site";

type Item = { project: Project; number: number };

export default function WorkList({ items }: { items: Item[] }) {
  const [hover, setHover] = useState<Item | null>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28 });
  const sy = useSpring(y, { stiffness: 260, damping: 28 });

  const onMove = (e: React.MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <div className="work" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      <ul className="work__list">
        {items.map((item, i) => {
          const p = item.project;
          return (
            <motion.li
              key={p.slug}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.8, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/projects/${p.slug}/`}
                className="row"
                style={{ "--accent": p.theme.accent, "--tint": p.theme.bg2, "--ink-p": p.theme.ink } as React.CSSProperties}
                onMouseEnter={(e) => {
                  if (!hover) {
                    sx.jump(e.clientX);
                    sy.jump(e.clientY);
                  }
                  x.set(e.clientX);
                  y.set(e.clientY);
                  setHover(item);
                }}
                onFocus={() => setHover(null)}
              >
                <span className="row__num mono">{pad(item.number)}</span>
                <span className="row__brand">
                  {p.logo && (
                    <>
                      <img src={asset(`/img/${p.logo}`)} alt={logoOrg[p.logo] ?? ""} className="row__logo" loading="lazy" />
                      {logoOrg[p.logo] && <span className="row__org">{logoOrg[p.logo]}</span>}
                    </>
                  )}
                </span>
                <span className="row__main">
                  <span className="row__title">{p.title}</span>
                  <span className="row__sub">{p.subtitle}</span>
                </span>
                <span className="row__stack mono">{p.stack.slice(0, 3).join(" · ")}</span>
                <span className="row__arrow" aria-hidden="true">→</span>
              </Link>
            </motion.li>
          );
        })}
      </ul>

      <AnimatePresence>
        {hover && !reduce && (
          <motion.div
            className="preview"
            aria-hidden="true"
            style={{
              x: sx,
              y: sy,
              background: `linear-gradient(150deg, ${hover.project.theme.bg1}, ${hover.project.theme.bg2})`,
              color: hover.project.theme.ink,
            }}
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3 }}
          >
            <span className="preview__top mono" style={{ color: hover.project.theme.accent }}>
              {pad(hover.number)} · {hover.project.category}
            </span>
            {hover.project.logo ? (
              <span className="preview__brand">
                <img src={asset(`/img/${hover.project.logo}`)} alt="" className="preview__logo" />
                {logoOrg[hover.project.logo] && <span>{logoOrg[hover.project.logo]}</span>}
              </span>
            ) : (
              <span className="preview__big" style={{ color: hover.project.theme.accent }}>
                {pad(hover.number)}
              </span>
            )}
            <span className="preview__value">{hover.project.value}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
