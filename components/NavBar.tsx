"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSiteContext } from "./Providers";

export const REGISTER_URL = "/register";
export const SPEAK_URL = "https://docs.google.com/forms/d/e/1FAIpQLScP7jkZ_M1EXIYnxu7ERnCBRpDDmBNPpT3BWruAoyGnPtN6IA/viewform?usp=dialog";

import Magnetic from "./Magnetic";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useSiteContext();

  const isHome = pathname === "/" || pathname === "";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: isHome ? "#about" : "/#about" },
    { name: "Events", href: "/events" },
    { name: "Social", href: "/social" },
    { name: "Speak", href: "/speak" },
    { name: "Membership", href: "/membership" },
  ];

  return (
    <nav id="mainNav" className={scrolled ? "scrolled" : ""} role="navigation" aria-label="Main navigation">
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
          <span className="nav-wordmark">The Meridian Society</span>
        </Link>
        
        <ul className="nav-links" role="list">
          {navLinks.map((link) => {
            const isActive = !isHome && pathname === link.href;
            return (
              <li key={link.name}>
                <Link href={link.href} className={isActive ? "nav-active" : ""}>
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
