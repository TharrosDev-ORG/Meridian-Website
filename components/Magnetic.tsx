"use client";

import React, { useRef, useEffect, ReactElement, useCallback } from 'react';

interface Props {
  children: ReactElement<React.HTMLAttributes<HTMLElement>>;
  strength?: number;
}

/**
 * Magnetic wraps a child button/link in a span and adds a "pull" effect.
 * Uses CSS variables on the wrapper to avoid React re-renders on mousemove.
 * Disabled on touch devices to conserve CPU/battery.
 */
export default function Magnetic({ children, strength = 0.3 }: Props) {
  const wrapperRef = useRef<HTMLSpanElement>(null);

  const handleRef = useCallback((node: HTMLSpanElement | null) => {
    wrapperRef.current = node;
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

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

  return (
    <span
      ref={handleRef}
      style={{
        display: 'inline-block',
        ['--mag-x' as string]: '0px',
        ['--mag-y' as string]: '0px',
        transform: 'translate3d(var(--mag-x), var(--mag-y), 0)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      } as React.CSSProperties}
    >
      {children}
    </span>
  );
}
