"use client";

import { useEffect } from "react";

export default function ScrollProgress() {
  useEffect(() => {
    const handleScroll = () => {
      const progressBar = document.getElementById("progressBar");
      if (!progressBar) return;

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;

      progressBar.style.width = scrolled + "%";
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
