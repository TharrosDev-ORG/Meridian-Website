"use client";

import React, { useRef, useState, useEffect, ReactElement } from 'react';

interface Props {
  children: ReactElement;
  strength?: number;
}

/**
 * Magnetic component adds a "pull" effect to any child button/link.
 * It calculates the distance between the mouse and the center of the element.
 */
export default function Magnetic({ children, strength = 0.3 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Apply strength and set position
    setPosition({ x: x * strength, y: y * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      style={{
        display: 'inline-block',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }}
      onMouseMove={(e) => handleMouseMove(e.nativeEvent)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
