"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSiteContext } from "./Providers";
import { REGISTER_URL } from "./NavBar";

const SWIPE_CLOSE_THRESHOLD = 72;

export default function MobileMenu() {
  const { menuOpen, setMenuOpen } = useSiteContext();
  const drawerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const dragging = useRef(false);

  // 1. Body Scroll Lock & Escape Key
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      // Focus the drawer for screen readers when it opens
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

  // 2. Focus Trap
  useEffect(() => {
    if (!menuOpen || !drawerRef.current) return;

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const elements = drawerRef.current?.querySelectorAll<HTMLElement>(focusableSelectors);
      if (!elements || elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [menuOpen]);

  // 3. Swipe to Close (Improved Delta Handling)
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
      
      // Only drag if moving horizontally and to the right (close direction)
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

      if (dx > SWIPE_CLOSE_THRESHOLD) {
        setMenuOpen(false);
      }
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
        <div className="mob-wordmark">The Meridian Society</div>
        <nav className="mob-links">
          <Link href="/team" onClick={() => setMenuOpen(false)}>Team <span className="mob-arrow">→</span></Link>
          <Link href="/events" onClick={() => setMenuOpen(false)}>Events <span className="mob-arrow">→</span></Link>
          <Link href="/calendar" onClick={() => setMenuOpen(false)}>Calendar <span className="mob-arrow">→</span></Link>
          <Link href="/social" onClick={() => setMenuOpen(false)}>Social <span className="mob-arrow">→</span></Link>
          <Link href="/speak" onClick={() => setMenuOpen(false)}>Speak <span className="mob-arrow">→</span></Link>
          <Link href="/membership" onClick={() => setMenuOpen(false)}>Membership <span className="mob-arrow">→</span></Link>
        </nav>
        <div className="mob-bottom">
          <span className="mob-meta">Ottawa · Est. 2025</span>
          <Link href={REGISTER_URL} className="mob-cta" onClick={() => setMenuOpen(false)}>
            Register as a Member
          </Link>
        </div>
      </div>
    </>
  );
}
