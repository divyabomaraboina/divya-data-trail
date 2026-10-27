import Link from "next/link";
import { profile } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <p className="footer__name">{profile.name}</p>
        <p className="footer__tag">Get the data right, then make it useful.</p>
      </div>
      <nav className="footer__cols" aria-label="Footer">
        <Link href="/#work">Work</Link>
        <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
        <Link href="/#journey">Journey</Link>
        <a href={profile.github} target="_blank" rel="noopener">GitHub</a>
        <Link href="/#contact">Contact</Link>
        <a href={`mailto:${profile.email}`}>Email</a>
      </nav>
      <div className="footer__base">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <Link href="/">Back to top ↑</Link>
      </div>
    </footer>
  );
}
