"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";

const links = [
  { id: "top", href: "/", label: "Home" },
  { id: "work", href: "/#work", label: "Work" },
  { id: "journey", href: "/#journey", label: "Journey" },
  { id: "contact", href: "/#contact", label: "Contact" },
];

function useActiveSection(pathname: string) {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const home = (pathname.replace(/\/+$/, "") || "/") === "/";
    if (!home) {
      setActive(pathname.includes("/projects/") ? "work" : "");
      return;
    }
    const ids = ["work", "journey", "contact"];
    const onScroll = () => {
      const probe = window.innerHeight * 0.35;
      let current = "top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
  return active;
}

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = useActiveSection(pathname);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !open);
    setScrolled(y > 24);
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? "nav--scrolled" : ""} ${open ? "nav--open" : ""}`}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href="/" className="nav__brand" aria-label="Divya Bomaraboina, home">
          <span className="nav__dot" aria-hidden="true" />
          Divya Bomaraboina
        </Link>
        <nav className="nav__links" aria-label="Main">
          {links.slice(0, 3).map((l) => (
            <Link
              key={l.id}
              href={l.href}
              className={`nav__link ${active === l.id ? "nav__link--active" : ""}`}
              aria-current={active === l.id ? "true" : undefined}
            >
              <span>{l.label}</span>
            </Link>
          ))}
          <Link href="/#contact" className="btn btn--pink btn--sm" aria-current={active === "contact" ? "true" : undefined}>
            Contact me
          </Link>
        </nav>
        <button className="nav__menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Menu"}
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.id}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.5 }}
              >
                <Link
                  href={l.href}
                  className={`menu__link ${active === l.id ? "menu__link--active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
