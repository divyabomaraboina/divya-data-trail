"use client";
import { useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { categories, projects } from "@/lib/site";
import WorkList from "./WorkList";

const label = (name: string) => categories.find((c) => c.name === name)?.label ?? name;

export default function ProjectTiles() {
  const [filter, setFilter] = useState("All");
  const tabs = ["All", ...categories.map((c) => c.name)];
  const groups = categories
    .filter((c) => filter === "All" || c.name === filter)
    .map((c) => ({
      ...c,
      items: projects.map((p, i) => ({ project: p, number: i + 1 })).filter((x) => x.project.category === c.name),
    }));

  return (
    <>
      <LayoutGroup>
        <div className="tabs" role="tablist" aria-label="Filter projects">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={filter === t}
              className={`tab ${filter === t ? "tab--on" : ""}`}
              onClick={() => setFilter(t)}
            >
              {filter === t && <motion.span layoutId="tab-pill" className="tab__pill" />}
              <span className="tab__label">{t === "All" ? `All · ${projects.length}` : label(t)}</span>
            </button>
          ))}
        </div>
      </LayoutGroup>

      {groups.map((g) => (
        <section key={g.name + filter} className="group" aria-label={label(g.name)}>
          <div className="group__head">
            <h3 className="group__title">{label(g.name)}</h3>
            <p className="muted">{g.blurb}</p>
          </div>
          <WorkList items={g.items} />
        </section>
      ))}
    </>
  );
}
