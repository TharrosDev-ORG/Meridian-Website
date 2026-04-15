"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface SiteContextType {
  menuOpen: boolean;
  setMenuOpen: (val: boolean) => void;
}

const SiteContext = createContext<SiteContextType>({
  menuOpen: false,
  setMenuOpen: () => {},
});

export const useSiteContext = () => useContext(SiteContext);

const CIRC = 2 * Math.PI * 22;

export default function Providers({ children }: { children: React.ReactNode }) {
  const [showArc, setShowArc] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const SCROLL_ARC_THRESHOLD = 200;

    const progressBar = document.getElementById("progressBar");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sY = window.scrollY;
          const docH = document.documentElement.scrollHeight;
          const winH = window.innerHeight;
          const h = docH - winH;
          const pct = h > 0 ? sY / h : 0;
          
          setScrollProgress(pct);
          setShowArc(sY > SCROLL_ARC_THRESHOLD);

          if (progressBar) progressBar.style.width = `${pct * 100}%`;

          if (!reducedMotion) {
            const footerGhost = document.querySelector(".footer-ghost") as HTMLElement;
            if (footerGhost) {
              footerGhost.style.transform = `translateX(-50%) translateY(${sY * 0.03}px)`;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Intersection Observer for .rv elements (Scroll Reveal)
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("on");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px 100px 0px" });

    // Initial query
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));

    // Expose a global hook for dynamically added elements (like pages)
    // We use a small timeout to ensure the DOM has actually updated
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__observeReveal = () => {
      // Re-query all .rv elements that aren't yet visible
      document.querySelectorAll(".rv:not(.on)").forEach((el) => obs.observe(el));
    };

    return () => {
      window.removeEventListener("scroll", onScroll);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).__observeReveal;
      obs.disconnect();
    };
  }, []);

  return (
    <SiteContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
      <button 
        className={`arc-btn ${showArc ? "visible" : ""}`} 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 52 52">
          <circle className="arc-track" cx="26" cy="26" r="22" />
          <circle 
            className="arc-fill" 
            cx="26" cy="26" r="22" 
            style={{ strokeDashoffset: String(CIRC * (1 - scrollProgress)) }} 
          />
        </svg>
        <div className="arc-inner">
          <span className="arc-icon">↑</span>
        </div>
      </button>
    </SiteContext.Provider>
  );
}
