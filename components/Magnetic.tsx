"use client";

import React, { useRef, useEffect, ReactElement } from 'react';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any>;
  strength?: number;
}

/**
 * Magnetic component adds a "pull" effect to any child button/link.
 * Uses high-performance CSS variables to avoid React re-renders on mousemove.
 * Automatically disabled on touch devices to conserve CPU/battery.
 */
export default function Magnetic({ children, strength = 0.3 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check for touch device / coarse pointer
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let bounds: DOMRect | null = null;

    const handleMouseEnter = () => {
      bounds = el.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!bounds) bounds = el.getBoundingClientRect();
      const { clientX, clientY } = e;
      const { left, top, width, height } = bounds;
      
      const x = (clientX - (left + width / 2)) * strength;
      const y = (clientY - (top + height / 2)) * strength;
      
      el.style.setProperty('--mag-x', `${x}px`);
      el.style.setProperty('--mag-y', `${y}px`);
    };

    const handleMouseLeave = () => {
      el.style.setProperty('--mag-x', '0px');
      el.style.setProperty('--mag-y', '0px');
      bounds = null;
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return React.cloneElement(children, {
    ref,
    style: {
      ...(children.props.style || {}),
      display: 'inline-block',
      '--mag-x': '0px',
      '--mag-y': '0px',
      transform: 'translate3d(var(--mag-x), var(--mag-y), 0)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s',
    } as React.CSSProperties
  });
}
