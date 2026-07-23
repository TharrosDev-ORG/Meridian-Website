"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const GLYPHS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type ScrambleTextProps = {
  /** The final, resolved text. Rendered as-is on the server and for no-JS /
   *  reduced-motion / touch — the scramble is a pure enhancement. */
  text: string;
  className?: string;
  /** "mount": decode once after hydration. "hover": decode on pointer-enter. */
  trigger?: "mount" | "hover";
  /** Total decode duration in ms. */
  duration?: number;
  /** Extra delay before a mount decode starts (ms). */
  delay?: number;
};

/**
 * ScrambleText — the signature "decode" effect of THE RECORD system.
 * Characters resolve left-to-right out of random glyphs. Spaces, dashes and
 * punctuation are held stable so the silhouette reads throughout.
 *
 * SSR renders the real text (accessible, zero-CLS). Animation runs only on the
 * client and only when motion is allowed; state is set from interval callbacks,
 * never synchronously inside an effect (react-hooks/set-state-in-effect).
 */
export default function ScrambleText({
  text,
  className,
  trigger = "mount",
  duration = 600,
  delay = 0,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState<string | null>(null);
  const rafCleanup = useRef<(() => void) | null>(null);

  const run = useCallback(() => {
    rafCleanup.current?.();
    const stepMs = 30;
    const totalSteps = Math.max(1, duration / stepMs);
    const increment = text.length / totalSteps;
    let iteration = 0;
    const id = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (i < iteration) return text[i];
            if (ch === " " || ch === "-" || ch === "·" || ch === "/") return ch;
            return GLYPHS[(Math.random() * GLYPHS.length) | 0];
          })
          .join("")
      );
      if (iteration >= text.length) {
        clearInterval(id);
        setDisplay(null);
      }
      iteration += increment;
    }, stepMs);
    rafCleanup.current = () => clearInterval(id);
  }, [text, duration]);

  useEffect(() => {
    if (trigger !== "mount") return;
    const reduce =
      typeof window !== "undefined" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(pointer: coarse)").matches);
    if (reduce) return;
    const t = setTimeout(run, delay);
    return () => {
      clearTimeout(t);
      rafCleanup.current?.();
    };
  }, [trigger, delay, run]);

  const onEnter = trigger === "hover" ? run : undefined;

  return (
    <span className={className} onMouseEnter={onEnter} aria-label={text}>
      <span aria-hidden={display !== null}>{display ?? text}</span>
    </span>
  );
}
