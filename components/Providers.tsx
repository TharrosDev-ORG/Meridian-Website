"use client";

import { createContext, useContext, useState } from "react";

interface SiteContextType {
  menuOpen: boolean;
  setMenuOpen: (val: boolean) => void;
}

const SiteContext = createContext<SiteContextType>({
  menuOpen: false,
  setMenuOpen: () => {},
});

export const useSiteContext = () => useContext(SiteContext);

// Scroll reveals now live in components/motion/MotionProvider.tsx (GSAP).
// Providers keeps only the menu state shared by NavBar/MobileMenu/MobileDock.
export default function Providers({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SiteContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </SiteContext.Provider>
  );
}
