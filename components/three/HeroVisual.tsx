"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { DESKTOP_MOTION } from "@/components/motion/MotionProvider";

const HeroParticles = dynamic(() => import("./HeroParticles"), { ssr: false });

interface NavigatorWithSaveData extends Navigator {
  connection?: { saveData?: boolean };
}

/**
 * HeroVisual — the hero's atmospheric layer.
 *
 * Always renders the static fallback (gold glow + grain + ghost "M") so the
 * server payload, mobile, reduced-motion, and low-power devices all get a
 * complete hero with zero CLS. Eligible desktops additionally lazy-load the
 * WebGL particle field, which crossfades in over the fallback after its
 * first rendered frame.
 */
export default function HeroVisual() {
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const nav = navigator as NavigatorWithSaveData;
    const eligible =
      window.matchMedia(DESKTOP_MOTION).matches &&
      (navigator.hardwareConcurrency ?? 8) >= 4 &&
      !nav.connection?.saveData;
    if (!eligible) return;
    // Defer the chunk fetch past first paint — the headline wins LCP.
    const idle = window.setTimeout(() => setWebgl(true), 600);
    return () => window.clearTimeout(idle);
  }, []);

  return (
    <div className="hero-visual" aria-hidden="true">
      <div className={`hero-visual-static${ready ? " is-muted" : ""}`}>
        <div className="hero-glow" />
        <div className="hero-ghost-mark">M</div>
      </div>
      {webgl && (
        <div className={`hero-visual-webgl${ready ? " is-ready" : ""}`}>
          <HeroParticles onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
