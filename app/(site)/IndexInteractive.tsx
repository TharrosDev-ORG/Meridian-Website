"use client";

import { useEffect } from "react";
import { DESKTOP_MOTION, loadMotion } from "@/components/motion/motionCore";

/**
 * IndexInteractive — GSAP choreography for "THE RECORD" homepage.
 *
 * 1. Hero intro timeline (masthead → pre → title → meta → sub → actions → stats).
 *    The headline's decode is owned by <ScrambleText>; here the title just fades.
 * 2. Folio rule-draws — each "[ 0X ]" header rule wipes in on scroll.
 * 3. Scrubbed hero recede + register-ghost parallax.
 *
 * Touch and reduced-motion devices get none of this; content is already fully
 * visible (reveal contract lives in MotionProvider).
 */
export default function IndexInteractive() {
  useEffect(() => {
    const win = window as unknown as { __observeReveal?: () => void };
    if (win.__observeReveal) setTimeout(() => win.__observeReveal!(), 50);

    if (!window.matchMedia(DESKTOP_MOTION).matches) return;

    let disposed = false;
    let ctxRevert: (() => void) | null = null;

    loadMotion().then(({ gsap }) => {
      if (disposed) return;
      const ctx = gsap.context(() => {
        // ── 1. Hero intro timeline ──
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".hero-masthead", { autoAlpha: 0, y: 12, duration: 0.9 }, 0)
          .from(".hero-pre", { autoAlpha: 0, y: 16, duration: 0.9 }, 0.15)
          .from(".hero-title", { autoAlpha: 0, y: 22, duration: 1.0 }, 0.25)
          .from(".hero-meta", { autoAlpha: 0, y: 14, duration: 0.8 }, 0.55)
          .from(".hero-sub", { autoAlpha: 0, y: 16, duration: 0.8 }, 0.65)
          .from(".hero-actions", { autoAlpha: 0, y: 16, duration: 0.8 }, 0.75)
          .from(".hero-stats .stat", { autoAlpha: 0, y: 22, duration: 0.85, stagger: 0.07 }, 0.85)
          .set(
            [".hero-masthead", ".hero-pre", ".hero-title", ".hero-meta",
             ".hero-sub", ".hero-actions", ".hero-stats .stat"],
            { clearProps: "all" }
          );

        // ── 2. Folio rule-draws ──
        gsap.utils.toArray<HTMLElement>(".folio-head").forEach((head) => {
          const fill = head.querySelector(".rule-fill");
          if (!fill) return;
          gsap.from(fill, {
            scaleX: 0, transformOrigin: "left center", duration: 1.0, ease: "power3.out",
            scrollTrigger: { trigger: head, start: "top 88%" },
          });
        });

        // ── 3. Scrubbed hero recede + ghost drift ──
        gsap.to(".hero-content", {
          autoAlpha: 0.2, y: -50, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "45% top", end: "bottom top", scrub: 0.6 },
        });
        gsap.to(".hero-ghost-mark", {
          y: -120, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 },
        });

        const registerGhost = document.querySelector(".register-ghost");
        if (registerGhost) {
          gsap.fromTo(
            registerGhost,
            { y: 70 },
            {
              y: -40, ease: "none",
              scrollTrigger: { trigger: ".register", start: "top bottom", end: "bottom top", scrub: 0.8 },
            }
          );
        }
      });
      ctxRevert = () => ctx.revert();
    });

    return () => {
      disposed = true;
      ctxRevert?.();
    };
  }, []);

  return null;
}
