"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteContext } from "./Providers";
import { REGISTER_URL } from "./NavBar";

const HomeIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const CalendarIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

const RegisterIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);

const MenuIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Calendar", href: "/calendar", icon: CalendarIcon },
  { name: "Register", href: REGISTER_URL, icon: RegisterIcon, isProminent: true },
];

export default function MobileDock() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useSiteContext();

  return (
    <div
      className={`mob-dock ${menuOpen ? "menu-open" : ""}`}
      aria-label="Mobile navigation bar"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`mob-dock-item ${isActive ? "active" : ""} ${item.isProminent ? "prominent" : ""}`}
            onClick={() => setMenuOpen(false)}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="mob-dock-icon">{item.icon}</span>
            <span className="mob-dock-label">{item.name}</span>
          </Link>
        );
      })}
      <button
        type="button"
        className={`mob-dock-item ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-controls="mobileMenu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <span className="mob-dock-icon">{menuOpen ? CloseIcon : MenuIcon}</span>
        <span className="mob-dock-label">{menuOpen ? "Close" : "Menu"}</span>
      </button>
    </div>
  );
}
