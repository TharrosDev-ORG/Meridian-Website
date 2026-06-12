"use client";

import { useEffect } from "react";

export default function ScrollProgress() {
  useEffect(() => {
    const progressBar = document.getElementById("progressBar");
    if (!progressBar) return;

    let rafId = 0;
    let lastWidth = -1;

    const compute = () => {
      rafId = 0;
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? Math.round((winScroll / height) * 100) : 0;
      if (scrolled === lastWidth) return;
      lastWidth = scrolled;
      // scaleX composites on the GPU; animating width would relayout every frame.
      progressBar.style.transform = `scaleX(${scrolled / 100})`;
      progressBar.setAttribute("aria-valuenow", String(scrolled));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
