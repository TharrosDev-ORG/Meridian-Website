"use client";

import { useState, useEffect } from "react";

const CIRC = 2 * Math.PI * 22;

export default function BackToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollProgress(winScroll / height);
      }
      setVisible(winScroll > 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount to handle pre-scrolled pages
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
          className="arc-fill"
          cx="26"
          cy="26"
          r="22"
          style={{ 
            strokeDashoffset: String(CIRC * (1 - Math.min(Math.max(scrollProgress, 0), 1))) 
          }}
        />
      </svg>
      <div className="arc-inner">
        <span className="arc-icon" aria-hidden="true">↑</span>
      </div>
    </button>
  );
}
