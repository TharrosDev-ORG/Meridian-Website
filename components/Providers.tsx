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

interface MeridianWindow extends Window {
  __observeReveal?: () => void;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const win = window as unknown as MeridianWindow;

    // On touch devices (mobile/tablet) skip the IntersectionObserver entirely:
    // immediately mark every reveal element as "on" so content renders without
    // scroll-driven animations. This avoids per-scroll work and cognitive load
    // on small screens where the staggered reveals add little value.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      const reveal = () => {
        document.querySelectorAll(".rv:not(.on)").forEach((el) => el.classList.add("on"));
      };
      reveal();
      win.__observeReveal = reveal;
      return () => {
        if (win.__observeReveal) delete win.__observeReveal;
      };
    }

    // Intersection Observer for .rv elements (Scroll Reveal) — desktop only
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("on");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px 100px 0px" });

    // Only observe elements not already revealed by the DOMContentLoaded script
    document.querySelectorAll(".rv:not(.on)").forEach((el) => obs.observe(el));

    // Expose a global hook for dynamically added elements (like pages)
    win.__observeReveal = () => {
      const candidates = document.querySelectorAll(".rv:not(.on)");
      if (candidates.length > 0) {
        candidates.forEach((el) => {
          if (el instanceof HTMLElement) obs.observe(el);
        });
      }
    };

    return () => {
      if (win.__observeReveal) {
        delete win.__observeReveal;
      }
      obs.disconnect();
    };
  }, []);

  return (
    <SiteContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </SiteContext.Provider>
  );
}
