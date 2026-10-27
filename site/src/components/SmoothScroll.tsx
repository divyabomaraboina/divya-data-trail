"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const OFFSET = 20;

const findTarget = (hash: string) => {
  if (!hash || hash === "#") return null;
  try {
    return document.querySelector(hash) as HTMLElement | null;
  } catch {
    return null;
  }
};

// iPads report a fine pointer when a trackpad is attached, so also check touch points
const isTouchDevice = () =>
  window.matchMedia("(pointer: coarse)").matches || (navigator.maxTouchPoints ?? 0) > 0;

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // the page's JavaScript is running: turn off the CSS reveal safety net
    document.documentElement.classList.add("js-ready");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let id = 0;
    if (!reduce && !isTouchDevice()) {
      lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
      lenisRef.current = lenis;
      const raf = (time: number) => {
        lenis!.raf(time);
        id = requestAnimationFrame(raf);
      };
      id = requestAnimationFrame(raf);
    }

    const scrollTo = (target: HTMLElement | null) => {
      const top = target ? target.getBoundingClientRect().top + window.scrollY - OFFSET : 0;
      if (lenis) lenis.scrollTo(top, { force: true });
      else window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
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
      history.pushState(null, "", url.hash || url.pathname);
      scrollTo(findTarget(url.hash));
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      cancelAnimationFrame(id);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // arriving on a page: land on the hash (or the top), but never fight the visitor's own scrolling
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    let cancelled = false;
    const stop = () => {
      cancelled = true;
    };
    const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    events.forEach((ev) => window.addEventListener(ev, stop, { passive: true, once: true }));

    const land = () => {
      if (cancelled) return;
      const el = findTarget(window.location.hash);
      const top = el ? el.getBoundingClientRect().top + window.scrollY - OFFSET : 0;
      if (Math.abs(window.scrollY - top) < 2) return;
      const lenis = lenisRef.current;
      if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
      else window.scrollTo(0, top);
    };
    // re-check once fonts, images and entrance animations have settled the layout
    const timers = (window.location.hash ? [60, 350, 900] : [60]).map((ms) => window.setTimeout(land, ms));
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      events.forEach((ev) => window.removeEventListener(ev, stop));
    };
  }, [pathname]);

  return null;
}
