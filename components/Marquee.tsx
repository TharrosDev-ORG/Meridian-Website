'use client';

import React, { useEffect, useState } from 'react';

interface MarqueeProps {
  items?: string[];
  className?: string;
}

const DEFAULT_ITEMS = [
  "The Meridian Society",
  "Ottawa",
  "Est. 2025",
  "Student-Run",
  "Free Membership",
  "Speaker Events",
  "Social Gatherings",
  "Carleton University",
  "uOttawa",
  "Algonquin College"
];

const Marquee: React.FC<MarqueeProps> = ({ items = DEFAULT_ITEMS, className = "" }) => {
  // Skip the marquee on touch devices: 20 always-animating DOM nodes drain
  // battery and add visual noise on small screens with little payoff.
  const [hide, setHide] = useState(false);
  useEffect(() => {
    setTimeout(() => setHide(window.matchMedia("(pointer: coarse)").matches), 0);
  }, []);
  if (hide) return null;

  return (
    <div className={`marquee-wrap ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {/* We map the items twice to ensure a seamless loop */}
        {items.map((item, idx) => (
          <React.Fragment key={`first-${idx}`}>
            <span className="m-item">{item}</span>
            <span className="m-gem">◆</span>
          </React.Fragment>
        ))}
        {items.map((item, idx) => (
          <React.Fragment key={`second-${idx}`}>
            <span className="m-item">{item}</span>
            <span className="m-gem">◆</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
