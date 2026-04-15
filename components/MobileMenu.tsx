"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSiteContext } from "./Providers";
import { REGISTER_URL } from "./NavBar";

const SWIPE_CLOSE_THRESHOLD = 72;

export default function MobileMenu() {
  const { menuOpen, setMenuOpen } = useSiteContext();
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  
  const isHome = pathname === "/" || pathname === "";

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, setMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !menuOpen || !drawerRef.current) return;
      const focusableElements = drawerRef.current.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
      const first = focusableElements[0] as HTMLElement;
      const last = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    };

    const drawer = drawerRef.current;
    drawer?.addEventListener("keydown", handleKeyDown);
    return () => drawer?.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    let startX = 0;
    let startY = 0;
    let dragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (!menuOpen) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      dragging = true;
      drawer.style.transition = "none";
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging) return;
      const dx = e.touches[0].clientX - startX;
      const dy = Math.abs(e.touches[0].clientY - startY);
      if (dx > 0 && dx > dy) drawer.style.transform = `translateX(${dx}px)`;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!dragging) return;
      const dx = e.changedTouches[0].clientX - startX;
      dragging = false;
      drawer.style.transition = "";
      if (dx > SWIPE_CLOSE_THRESHOLD) {
        drawer.style.transform = "";
        setMenuOpen(false);
      } else {
        drawer.style.transform = "";
      }
    };

    const handleTouchCancel = () => {
      dragging = false;
      drawer.style.transition = "";
      drawer.style.transform = "";
    };

    drawer.addEventListener("touchstart", handleTouchStart, { passive: true });
    drawer.addEventListener("touchmove", handleTouchMove, { passive: true });
    drawer.addEventListener("touchend", handleTouchEnd, { passive: true });
    drawer.addEventListener("touchcancel", handleTouchCancel, { passive: true });

    return () => {
      drawer.removeEventListener("touchstart", handleTouchStart);
      drawer.removeEventListener("touchmove", handleTouchMove);
      drawer.removeEventListener("touchend", handleTouchEnd);
      drawer.removeEventListener("touchcancel", handleTouchCancel);
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <>
      <div 
        className={`mob-backdrop ${menuOpen ? "open" : ""}`} 
        id="menuBackdrop"
        onClick={() => setMenuOpen(false)}
      ></div>
      <div 
        className={`mob-drawer ${menuOpen ? "open" : ""}`} 
        id="mobileMenu" 
        role="dialog" 
        aria-label="Navigation" 
        aria-modal="true"
        ref={drawerRef}
      >
        <div className="mob-wordmark">The Meridian Society</div>
        <nav className="mob-links" aria-label="Mobile navigation">
          <Link href="/team" onClick={() => setMenuOpen(false)}>
            Team <span className="mob-arrow">→</span>
          </Link>
          <Link href="/events" onClick={() => setMenuOpen(false)}>Events <span className="mob-arrow">→</span></Link>
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
