"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSiteContext } from "./Providers";

export const REGISTER_URL = "/register";

import Magnetic from "./Magnetic";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useSiteContext();

  const isHome = pathname === "/" || pathname === "";

  useEffect(() => {
    let rafId = 0;
    let lastValue = window.scrollY > 40;

    const compute = () => {
      rafId = 0;
      const next = window.scrollY > 40;
      if (next !== lastValue) {
        lastValue = next;
        setScrolled(next);
      }
    };
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(compute);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Sync once after mount via rAF — avoids setState-in-effect-body lint.
    const initialId = requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(initialId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Team", href: "/#team" },
    { name: "Events", href: "/events" },
    { name: "Membership", href: "/membership" },
    { name: "Q&A", href: "/qa" },
  ];

  return (
    <nav id="mainNav" className={`site-nav${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <Link 
          href="/" 
          className="nav-logo" 
          aria-label="The Meridian Society — home"
          onClick={() => {
            if (pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <Magnetic strength={0.15}>
            <span className="nav-wordmark">The Meridian Society</span>
          </Magnetic>
        </Link>

        
        <ul className="nav-links" role="list">
          {navLinks.map((link) => {
            const isActive = !isHome && pathname === link.href;
            return (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className={isActive ? "nav-active" : ""}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>


        <Magnetic strength={0.25}>
          <Link href={REGISTER_URL} className="nav-cta">
            <span>Register</span>
          </Link>
        </Magnetic>

        <button 
          type="button" 
          className={`hamburger ${menuOpen ? "open" : ""}`} 
          id="burgerBtn"
          aria-label="Open navigation" 
          aria-expanded={menuOpen} 
          aria-controls="mobileMenu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
