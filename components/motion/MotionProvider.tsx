"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Desktop fine-pointer, motion-tolerant context. Everything heavy (Lenis,
 * scrubbed triggers, staggered reveals) lives behind this query. Touch and
 * reduced-motion users get instant, fully-visible content — same as before.
 */
export const DESKTOP_MOTION =
  "(min-width: 1101px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const NAV_OFFSET = -68;

interface MeridianWindow extends Window {
  __observeReveal?: () => void;
  __lenis?: Lenis | null;
}

/** Mark every reveal element revealed instantly (touch / reduced-motion path). */
function revealAllInstantly() {
  document.querySelectorAll(".rv:not(.on)").forEach((el) => el.classList.add("on"));
}

/**
 * MotionProvider — central GSAP/Lenis wiring for the whole site.
 *
 * Contract (do not break): content is visible by default. GSAP applies
 * from-states at runtime only, the moment an element enters the viewport.
 * Nothing is ever hidden waiting for JS; headless renderers and JS-off
 * visitors see the complete page.
 */
export default function MotionProvider() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // ── Mount-once: Lenis + ticker wiring (desktop fine-pointer only) ──
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(DESKTOP_MOTION, () => {
      document.documentElement.classList.add("gsap-motion");

      const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
      lenisRef.current = lenis;
      (window as unknown as MeridianWindow).__lenis = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Smooth-scroll same-page hash anchors through Lenis so the 68px
      // fixed-nav offset is preserved (scroll-padding-top is bypassed by Lenis).
      const onClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
        if (!anchor || anchor.target === "_blank") return;
        const url = new URL(anchor.href, window.location.href);
        if (url.pathname !== window.location.pathname || !url.hash) return;
        const target = document.querySelector<HTMLElement>(url.hash);
        if (!target) return;
        e.preventDefault();
        history.pushState(null, "", url.hash);
        // Numeric target: Lenis double-applies `offset` for element targets.
        lenis.scrollTo(target.getBoundingClientRect().top + window.scrollY + NAV_OFFSET);
      };
      document.addEventListener("click", onClick);

      return () => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
        lenisRef.current = null;
        (window as unknown as MeridianWindow).__lenis = null;
        document.documentElement.classList.remove("gsap-motion");
      };
    });

    return () => mm.revert();
  }, []);

  // ── Per-route: reveals + nav surface detection ──
  useEffect(() => {
    const win = window as unknown as MeridianWindow;
    const motionOk = window.matchMedia(DESKTOP_MOTION).matches;

    if (!motionOk) {
      // Touch / reduced-motion / small screens: reveal everything instantly,
      // keep the __observeReveal hook semantics for dynamically added content.
      revealAllInstantly();
      win.__observeReveal = revealAllInstantly;

      // Nav surface detection without GSAP: cheap rAF-throttled scroll check.
      const nav = document.querySelector(".site-nav");
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-theme='dark']"));
      let rafId = 0;
      const check = () => {
        rafId = 0;
        const onDark = sections.some((sec) => {
          const r = sec.getBoundingClientRect();
          return r.top <= 68 && r.bottom >= 68;
        });
        nav?.classList.toggle("site-nav--on-dark", onDark);
      };
      const onScroll = () => {
        if (!rafId) rafId = requestAnimationFrame(check);
      };
      check();
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onScroll);
        if (rafId) cancelAnimationFrame(rafId);
        nav?.classList.remove("site-nav--on-dark");
        delete win.__observeReveal;
      };
    }

    const ctx = gsap.context(() => {
      // Batched scroll reveals. Elements are visible until the moment they
      // enter; the from-state is applied per-batch at enter time only.
      const scan = () => {
        const fresh = Array.from(
          document.querySelectorAll<HTMLElement>(".rv:not(.on):not([data-rv-tracked])")
        );
        if (!fresh.length) return;
        fresh.forEach((el) => (el.dataset.rvTracked = "1"));
        ScrollTrigger.batch(fresh, {
          start: "top 92%",
          once: true,
          onEnter: (els) => {
            gsap.fromTo(
              els,
              { autoAlpha: 0, y: 28 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: "expo.out",
                stagger: 0.08,
                overwrite: true,
                clearProps: "opacity,visibility,transform",
                onComplete: () => els.forEach((el) => el.classList.add("on")),
              }
            );
          },
        });
      };
      scan();
      win.__observeReveal = scan;

      // Nav surface detection: while any dark section sits under the fixed
      // nav, flip it to the on-dark variant.
      let darkCount = 0;
      const nav = document.querySelector(".site-nav");
      const applyNav = () => nav?.classList.toggle("site-nav--on-dark", darkCount > 0);
      document.querySelectorAll<HTMLElement>("[data-theme='dark']").forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 68px",
          end: "bottom 68px",
          onToggle: (self) => {
            darkCount += self.isActive ? 1 : -1;
            if (darkCount < 0) darkCount = 0;
            applyNav();
          },
        });
      });
      applyNav();
    });

    // New DOM after a route change: recalc trigger positions once painted.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        // Deep-link hash arrival (e.g. /membership#faq from the /qa redirect).
        if (window.location.hash) {
          const target = document.querySelector<HTMLElement>(window.location.hash);
          if (target)
            lenisRef.current?.scrollTo(
              target.getBoundingClientRect().top + window.scrollY + NAV_OFFSET,
              { immediate: true }
            );
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      document.querySelector(".site-nav")?.classList.remove("site-nav--on-dark");
      if (win.__observeReveal) delete win.__observeReveal;
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
