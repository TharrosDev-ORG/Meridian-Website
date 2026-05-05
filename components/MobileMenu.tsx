"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSiteContext } from "./Providers";
import { usePathname } from "next/navigation";

const SWIPE_CLOSE_THRESHOLD = 64;
const SWIPE_INTENT_PX = 8;
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
  const touching = useRef(false);
  const dragging = useRef(false);

  // Body scroll lock + Escape + simple Tab loop
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => drawerRef.current?.focus(), 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
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

  // Auto-close on route change. Blur the active element first so we never
  // hide the drawer (via inert) while a descendant link still holds focus —
  // that triggers Chromium's aria-hidden / inert focus-retention warning.
  useEffect(() => {
    if (!menuOpen) return;
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Swipe-to-close (only horizontal, only after intent threshold is crossed)
  useEffect(() => {
    const el = drawerRef.current;
    if (!el || !menuOpen) return;

    const reset = () => {
      touching.current = false;
      dragging.current = false;
      el.style.transition = "";
      el.style.transform = "";
      el.style.opacity = "";
    };

    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
      touching.current = true;
      dragging.current = false;
    };

    const onMove = (e: TouchEvent) => {
      if (!touching.current) return;
      const dx = e.touches[0].clientX - startX.current;
      const dy = Math.abs(e.touches[0].clientY - startY.current);
      if (!dragging.current) {
        // Wait until we know intent: horizontal swipe vs vertical scroll vs tap
        if (dy > SWIPE_INTENT_PX && dy > Math.abs(dx)) {
          // Vertical scroll — let the drawer scroll naturally
          touching.current = false;
          return;
        }
        if (dx > SWIPE_INTENT_PX && dx > dy) {
          dragging.current = true;
          el.style.transition = "none";
        } else {
          return;
        }
      }
      if (dx > 0) {
        el.style.transform = `translateX(${dx}px)`;
        el.style.opacity = String(Math.max(0.55, 1 - dx / 280));
      }
    };

    const onEnd = (e: TouchEvent) => {
      if (!touching.current) {
        reset();
        return;
      }
      const wasDragging = dragging.current;
      const dx = e.changedTouches[0].clientX - startX.current;
      reset();
      if (wasDragging && dx > SWIPE_CLOSE_THRESHOLD) setMenuOpen(false);
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

  const handleLinkClick = () => {
    // Blur immediately so the impending inert flip doesn't fight focus
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setMenuOpen(false);
  };

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
        inert={!menuOpen}
      >
        <div className="mob-wordmark">THE MERIDIAN SOCIETY</div>

        <div className="mob-seal" aria-hidden="true">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <text x="50" y="55" fontSize="8" textAnchor="middle" fontFamily="var(--sans)" letterSpacing="0.2em">M</text>
          </svg>
        </div>

        <nav className="mob-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
              onClick={handleLinkClick}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
