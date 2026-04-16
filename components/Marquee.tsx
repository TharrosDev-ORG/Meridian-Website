'use client';

import React from 'react';

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
