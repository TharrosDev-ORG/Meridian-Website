"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

/**
 * TransitionWrapper handles the "sweep" animation when navigating between pages.
 * By using the pathname as a key, React re-mounts the wrapper on every navigation,
 * triggering the CSS 'pageSweep' animation defined in globals.css.
 */
export default function TransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-transition-wrapper">
      {children}
    </div>
  );
}
