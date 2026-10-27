import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lines, Reveal } from "@/components/Reveal";
import { asset, logoOrg, pad, projects } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.subtitle } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const t = p.theme;

  const sections = [
    { label: "Business problem", text: p.problem },
    { label: "My approach", text: p.approach },
    { label: "What I built", text: p.built },
  ];

  return (
    <article
      className="case"
      style={
        {
          "--c-bg1": t.bg1,
          "--c-bg2": t.bg2,
          "--c-accent": t.accent,
          "--c-accent2": t.accent2,
          "--c-ink": t.ink,
        } as React.CSSProperties
      }
    >
      <header className="case__hero">
        <div className="case__glow" aria-hidden="true" />
        <Link href="/#work" className="case__back mono">← All work</Link>
        <p className="eyebrow case__cat">
          {pad(index + 1)} · {p.category}
        </p>
        <h1 className="case__title">
          <Lines lines={[p.title]} />
        </h1>
        <Reveal delay={0.15}>
          <p className="case__subtitle">{p.subtitle}</p>
        </Reveal>
        <Reveal delay={0.25} className="case__meta">
          <ul className="pills" aria-label="Tools">
            {p.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="case__links">
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener" className="btn btn--accent">Open live app ↗</a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener" className="btn">GitHub ↗</a>
            )}
          </div>
        </Reveal>
        {p.logo && (
          <span className="case__brand">
            <img src={asset(`/img/${p.logo}`)} alt="" className="case__logo float" aria-hidden="true" />
            {logoOrg[p.logo] && <span className="case__org">{logoOrg[p.logo]}</span>}
          </span>
        )}
      </header>

      <section className="case__value" aria-label="Business value">
        <Reveal>
          <p className="eyebrow">Business value</p>
          <p className="case__valuetext">{p.value}</p>
        </Reveal>
      </section>

      <section className="case__body" aria-label="Case file">
        {sections.map((s, i) => (
          <Reveal key={s.label} className="case__row">
            <p className="case__label mono">
              {pad(i + 1)} · {s.label}
            </p>
            <p className="case__text">{s.text}</p>
          </Reveal>
        ))}
      </section>

      <section className="twists" aria-labelledby="twists-title">
        <header>
          <p className="eyebrow">What changed my thinking</p>
          <h2 id="twists-title" className="section-title">
            <Lines lines={["The corrections, tradeoffs", "and decisions behind it."]} />
          </h2>
        </header>
        <ol className="twists__list">
          {p.twists.map((tw, i) => (
            <Reveal as="li" key={tw.title} delay={i * 0.08} className="twist">
              <span className="twist__n mono">{pad(i + 1)}</span>
              <h3 className="twist__title">{tw.title}</h3>
              <p className="twist__text">{tw.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <Link
        href={`/projects/${next.slug}/`}
        className="next"
        style={{ "--n-accent": next.theme.accent, "--n-bg": next.theme.bg2 } as React.CSSProperties}
      >
        <span className="eyebrow">Next case file</span>
        <span className="next__title">{next.title} →</span>
        <span className="muted">{next.subtitle}</span>
      </Link>
    </article>
  );
}
