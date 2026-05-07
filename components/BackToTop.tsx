"use client";

import { useState, useEffect, useRef } from "react";

const CIRC = 2 * Math.PI * 22;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const arcFillRef = useRef<SVGCircleElement>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    let rafId = 0;

    const compute = () => {
      rafId = 0;
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (arcFillRef.current && height > 0) {
        const progress = Math.min(Math.max(winScroll / height, 0), 1);
        arcFillRef.current.style.strokeDashoffset = String(CIRC * (1 - progress));
      }

      const nowVisible = winScroll > 300;
      if (nowVisible !== visibleRef.current) {
        visibleRef.current = nowVisible;
        setVisible(nowVisible);
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    compute();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`arc-btn ${visible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <svg viewBox="0 0 52 52">
        <circle className="arc-track" cx="26" cy="26" r="22" />
        <circle
          ref={arcFillRef}
          className="arc-fill"
          cx="26"
          cy="26"
          r="22"
          style={{ strokeDashoffset: String(CIRC) }}
        />
      </svg>
      <div className="arc-inner">
        <span className="arc-icon" aria-hidden="true">↑</span>
      </div>
    </button>
  );
}
