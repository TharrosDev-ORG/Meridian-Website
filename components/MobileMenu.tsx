"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSiteContext } from "./Providers";
import { usePathname } from "next/navigation";

const SWIPE_CLOSE_THRESHOLD = 64;

export default function MobileMenu() {
  const { menuOpen, setMenuOpen } = useSiteContext();
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const dragging = useRef(false);
  // 1. Body Scroll Lock & Escape Key
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      drawerRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, setMenuOpen]);

  // 3. Swipe to Close
  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;

    const onStart = (e: TouchEvent) => {
      if (!menuOpen) return;
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
      dragging.current = true;
      el.style.transition = "none";
    };

    const onMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      const dx = e.touches[0].clientX - startX.current;
      const dy = Math.abs(e.touches[0].clientY - startY.current);
      if (dx > 0 && dx > dy) {
        el.style.transform = `translateX(${dx}px)`;
      }
    };

    const onEnd = (e: TouchEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      const dx = e.changedTouches[0].clientX - startX.current;
      el.style.transition = "";
      el.style.transform = "";
      if (dx > SWIPE_CLOSE_THRESHOLD) setMenuOpen(false);
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [menuOpen, setMenuOpen]);

  const navLinks = [
    { name: "Team", href: "/team" },
    { name: "Events", href: "/events" },
    { name: "Calendar", href: "/calendar" },
    { name: "Social", href: "/social" },
    { name: "Speak", href: "/speak" },
    { name: "Membership", href: "/membership" },
  ];

  return (
    <>
      <div 
        className={`mob-backdrop ${menuOpen ? "open" : ""}`} 
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <div 
        className={`mob-drawer ${menuOpen ? "open" : ""}`} 
        id="mobileMenu" 
        role="dialog" 
        aria-label="Navigation Menu" 
        aria-modal="true"
        tabIndex={-1}
        ref={drawerRef}
      >
        <div className="mob-wordmark">THE MERIDIAN SOCIETY</div>
        
        {/* Cinematic Seal Background */}
        <div className="mob-seal" aria-hidden="true">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <text x="50" y="55" fontSize="8" textAnchor="middle" fontFamily="var(--sans)" letterSpacing="0.2em">M</text>
          </svg>
        </div>

        <nav className="mob-links">
          {navLinks.map((link, i) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={pathname === link.href ? "active" : ""}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: `${0.1 + i * 0.06}s` }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
