"use client";

import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import type LenisType from "lenis";

/**
 * Desktop fine-pointer, motion-tolerant context. Everything heavy (the GSAP
 * bundle itself, Lenis, scrubbed triggers, staggered reveals) lives behind
 * this query. Touch and reduced-motion users never download the libraries.
 */
export const DESKTOP_MOTION =
  "(min-width: 1101px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export interface MotionCore {
  gsap: typeof GsapType;
  ScrollTrigger: typeof ScrollTriggerType;
  Lenis: typeof LenisType;
}

let corePromise: Promise<MotionCore> | null = null;

/**
 * Lazily load gsap + ScrollTrigger + Lenis as a shared async chunk.
 * Callers gate on DESKTOP_MOTION before calling; the promise is cached so
 * MotionProvider and per-page choreography share one download.
 */
export function loadMotion(): Promise<MotionCore> {
  corePromise ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("lenis"),
  ]).then(([gsapMod, stMod, lenisMod]) => {
    gsapMod.gsap.registerPlugin(stMod.ScrollTrigger);
    return { gsap: gsapMod.gsap, ScrollTrigger: stMod.ScrollTrigger, Lenis: lenisMod.default };
  });
  return corePromise;
}
