import Link from "next/link";
import { asset } from "@/lib/site";

// The intro animates with CSS only, so it shows even if JavaScript is slow or fails (older iOS Safari).
const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__bg" aria-hidden="true" data-depth="0">
        <div className="blob blob--clay" />
        <div className="blob blob--sage" />
      </div>

      <div className="hero__inner" data-depth="4">
        <h1 className="hero__title">
          <span className="sr-only">Hi, I’m Divya Bomaraboina</span>
          <span className="hero__row" aria-hidden="true">
            <span className="line-mask">
              <span className="line-inner hero-up" style={d(0.1)}>
                <span className="wave">👋</span>
              </span>
            </span>
            <span className="line-mask">
              <span className="line-inner hero-up hero__hi" style={d(0.18)}>Hi!</span>
            </span>
            <span className="line-mask">
              <span className="line-inner hero-up" style={d(0.26)}>I’m</span>
            </span>
            <span className="hero__avatar hero-pop">
              <img src={asset("/img/divya.png")} alt="" />
              <span className="spark" />
            </span>
            <span className="line-mask">
              <span className="line-inner hero-up" style={d(0.34)}>Divya</span>
            </span>
          </span>
        </h1>

        <ul className="hero__facts hero-rise" style={d(0.6)}>
          <li><span aria-hidden="true">♡</span> Currently in the United States</li>
        </ul>

        <div className="hero__ctas hero-rise" style={d(0.75)}>
          <Link href="/#work" className="btn btn--solid">See my work</Link>
          <Link href="/#contact" className="btn btn--pink">Contact me</Link>
        </div>
      </div>
    </section>
  );
}
