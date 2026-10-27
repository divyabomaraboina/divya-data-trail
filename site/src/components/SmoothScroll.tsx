"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const findTarget = (hash: string) => {
  if (!hash || hash === "#") return null;
  try {
    return document.querySelector(hash) as HTMLElement | null;
  } catch {
    return null;
  }
};

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    let lenis: Lenis | null = null;
    let id = 0;
    if (!reduce && !touch) {
      lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
      lenisRef.current = lenis;
      const raf = (time: number) => {
        lenis!.raf(time);
        id = requestAnimationFrame(raf);
      };
      id = requestAnimationFrame(raf);
    }

    const scrollTo = (target: HTMLElement | number, immediate = false) => {
      if (lenis) lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : -20, immediate, force: true });
      else if (typeof target === "number") window.scrollTo({ top: target, behavior: immediate || reduce ? "auto" : "smooth" });
      else target.scrollIntoView({ behavior: immediate || reduce ? "auto" : "smooth", block: "start" });
    };

    // same-page links ("/#work", "/") scroll smoothly instead of jumping
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || !a.href) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      e.preventDefault();
      e.stopPropagation();
      const el = findTarget(url.hash);
      history.pushState(null, "", url.hash || url.pathname);
      scrollTo(el ?? 0);
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      cancelAnimationFrame(id);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // arriving from another page: land on the hash, or the top
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const land = () => {
      const el = findTarget(window.location.hash);
      const lenis = lenisRef.current;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 20;
        if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
        else window.scrollTo(0, top);
      } else if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo(0, 0);
      }
    };
    // re-land once fonts, images and entrance animations have settled the layout
    const timers = [60, 350, 900].map((ms) => window.setTimeout(land, ms));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [pathname]);

  return null;
}
