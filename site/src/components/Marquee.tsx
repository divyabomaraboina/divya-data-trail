import { profile } from "@/lib/site";

export default function Marquee() {
  const items = [...profile.tools, ...profile.tools];
  return (
    <div className="marquee" aria-label={`Tools: ${profile.tools.join(", ")}`}>
      <div className="marquee__track" aria-hidden="true">
        {items.map((t, i) => (
          <span key={i} className="marquee__item">
            {t}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
