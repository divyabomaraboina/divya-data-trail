import { profile } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span className="mono">Get the data right, then make it useful.</span>
      <span className="footer__links">
        <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
        <a href={profile.github} target="_blank" rel="noopener">GitHub</a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </span>
    </footer>
  );
}
