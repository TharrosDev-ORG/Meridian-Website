"use client";

import { useEffect } from "react";

export default function ScrollProgress() {
  useEffect(() => {
    const handleScroll = () => {
      const progressBar = document.getElementById("progressBar");
      if (!progressBar) return;

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? Math.round((winScroll / height) * 100) : 0;

      progressBar.style.width = scrolled + "%";
      progressBar.setAttribute("aria-valuenow", String(scrolled));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
