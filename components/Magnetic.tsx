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
  const ref = useRef<HTMLElement>(null);
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

  // We clone the child to avoid adding an extra div which can break flexbox layouts
  return React.cloneElement(children, {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: {
      ...(children.props.style || {}),
      display: 'inline-block', // ensure it responds to transforms correctly if it's an inline element like <a>
      transition: position.x === 0 && position.y === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s' : 'none',
      transform: position.x !== 0 || position.y !== 0 ? `translate3d(${position.x}px, ${position.y}px, 0)` : undefined
    }
  });
}
