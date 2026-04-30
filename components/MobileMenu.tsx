"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSiteContext } from "./Providers";
import { usePathname } from "next/navigation";

const SWIPE_CLOSE_THRESHOLD = 64;
const NAV_LINKS = [
  { name: "Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Calendar", href: "/calendar" },
  { name: "Social", href: "/social" },
  { name: "Speak", href: "/speak" },
  { name: "Membership", href: "/membership" },
];

export default function MobileMenu() {
  const { menuOpen, setMenuOpen } = useSiteContext();
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const dragging = useRef(false);

  // Body scroll lock + Escape + simple focus containment
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Defer focus so it doesn't fight the open transition
    const focusTimer = window.setTimeout(() => drawerRef.current?.focus(), 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      // Keep focus within the drawer (basic trap)
      const drawer = drawerRef.current;
      if (!drawer) return;
      const focusables = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen, setMenuOpen]);

  // Close on route change (covers programmatic / browser-history navigation)
  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Swipe-to-close
  useEffect(() => {
    const el = drawerRef.current;
    if (!el || !menuOpen) return;

    const reset = () => {
      dragging.current = false;
      el.style.transition = "";
      el.style.transform = "";
    };

    const onStart = (e: TouchEvent) => {
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
      const dx = e.changedTouches[0].clientX - startX.current;
      reset();
      if (dx > SWIPE_CLOSE_THRESHOLD) setMenuOpen(false);
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("touchcancel", reset, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", reset);
      reset();
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
        aria-hidden={!menuOpen}
        tabIndex={-1}
        ref={drawerRef}
      >
        <div className="mob-wordmark">THE MERIDIAN SOCIETY</div>

        <div className="mob-seal" aria-hidden="true">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <text x="50" y="55" fontSize="8" textAnchor="middle" fontFamily="var(--sans)" letterSpacing="0.2em">M</text>
          </svg>
        </div>

        <nav className="mob-links">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              style={menuOpen ? { transitionDelay: `${0.1 + i * 0.06}s` } : undefined}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
