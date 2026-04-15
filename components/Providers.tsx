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
    const win = window as unknown as MeridianWindow;
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
