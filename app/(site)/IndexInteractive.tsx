"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DESKTOP_MOTION } from "@/components/motion/MotionProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * IndexInteractive — GSAP choreography for the homepage.
 *
 * 1. Hero intro timeline (rule draw, title line-rise, ledger stats)
 * 2. Scrubbed hero exit + register-ghost parallax
 * 3. Hero mouse-tilt and 3D card tilt via gsap.quickTo
 *
 * Touch and reduced-motion devices get none of this; content is already
 * fully visible (reveal contract lives in MotionProvider).
 */
export default function IndexInteractive() {
  useEffect(() => {
    const win = window as unknown as { __observeReveal?: () => void };
    if (win.__observeReveal) setTimeout(() => win.__observeReveal!(), 50);

    if (!window.matchMedia(DESKTOP_MOTION).matches) return;

    const removers: Array<() => void> = [];
    const ctx = gsap.context(() => {
      // ── 1. Hero intro timeline ──
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-eyebrow-rule", { scaleX: 0, duration: 1.1, stagger: 0.05 }, 0)
        .from(".hero-eyebrow-text", { autoAlpha: 0, y: 10, duration: 0.8 }, 0.1)
        .from(".hero-pre", { autoAlpha: 0, y: 18, duration: 0.9 }, 0.25)
        .from(".hero-title .rv-stagger-item", { yPercent: 110, duration: 1.3, stagger: 0.12 }, 0.35)
        .from(".hero-hr", { scaleX: 0, duration: 0.9 }, 0.85)
        .from(".hero-sub", { autoAlpha: 0, y: 22, duration: 0.9 }, 0.95)
        .from(".hero-main-ctas, .hero-actions-divider, .hero-actions .btn-ghost-link", { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.07 }, 1.1)
        .from(".hero-stats .stat", { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.08 }, 1.2)
        .set([".hero-eyebrow-rule", ".hero-eyebrow-text", ".hero-pre", ".hero-title .rv-stagger-item", ".hero-hr", ".hero-sub", ".hero-main-ctas", ".hero-actions-divider", ".hero-actions .btn-ghost-link", ".hero-stats .stat"], { clearProps: "all" });

      // ── 2. Scrubbed hero exit: content recedes as the marquee approaches ──
      gsap.to(".hero-content", {
        autoAlpha: 0.25,
        y: -60,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "40% top", end: "bottom top", scrub: 0.6 },
      });
      gsap.to(".hero-ghost-mark", {
        y: -110,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 },
      });

      // Register-ghost parallax (final CTA section)
      const registerGhost = document.querySelector(".register-ghost");
      if (registerGhost) {
        gsap.fromTo(
          registerGhost,
          { y: 70 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: { trigger: ".register", start: "top bottom", end: "bottom top", scrub: 0.8 },
          }
        );
      }

      // ── 3. Hero mouse-tilt (quickTo) ──
      const hero = document.querySelector<HTMLElement>(".hero");
      const title = document.getElementById("heroTitle");
      if (hero && title) {
        const rotX = gsap.quickTo(title, "rotationX", { duration: 0.6, ease: "power3.out" });
        const rotY = gsap.quickTo(title, "rotationY", { duration: 0.6, ease: "power3.out" });
        gsap.set(title, { transformPerspective: 1200 });
        const onMove = (e: MouseEvent) => {
          const r = hero.getBoundingClientRect();
          const dx = (e.clientX - r.left - r.width / 2) / r.width;
          const dy = (e.clientY - r.top - r.height / 2) / r.height;
          rotY(dx * 4);
          rotX(-dy * 3);
        };
        const onLeave = () => {
          rotX(0);
          rotY(0);
        };
        hero.addEventListener("mousemove", onMove);
        hero.addEventListener("mouseleave", onLeave);
        removers.push(() => {
          hero.removeEventListener("mousemove", onMove);
          hero.removeEventListener("mouseleave", onLeave);
        });
      }

      // ── 4. 3D card tilt (quickTo per card) ──
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
        const rotX = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
        const rotY = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
        const scale = gsap.quickTo(card, "scale", { duration: 0.5, ease: "power3.out" });
        gsap.set(card, { transformPerspective: 1000 });
        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          rotX((y - 0.5) * 12);
          rotY((x - 0.5) * -12);
          scale(1.02);
        };
        const onLeave = () => {
          rotX(0);
          rotY(0);
          scale(1);
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        removers.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    });

    return () => {
      removers.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return null;
}
