"use client";

import { useEffect } from "react";

/**
 * IndexInteractive — Imperative animation logic for the homepage.
 * 
 * Handles:
 * 1. Hero mouse-tilt (3D effect on title)
 * 2. Hero & Register Ghost parallax (scroll based)
 * 3. Global 3D Card Tilt (data-tilt)
 */
export default function IndexInteractive() {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── 1. Hero Mouse-Tilt ──
    const hero = document.querySelector(".hero") as HTMLElement;
    const title = document.getElementById("heroTitle") as HTMLElement;
    
    let heroRafId: number | null = null;

    const handleHeroMove = (e: MouseEvent) => {
      if (heroRafId) cancelAnimationFrame(heroRafId);
      heroRafId = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) / r.width;
        const dy = (e.clientY - r.top - r.height / 2) / r.height;
        // Premium soft tilt
        title.style.transform = `perspective(1200px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg)`;
      });
    };
    
    const handleHeroLeave = () => {
      if (heroRafId) cancelAnimationFrame(heroRafId);
      title.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)";
    };

    if (hero && title && !isTouch) {
      // Set initial transition for the return journey
      title.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
      
      hero.addEventListener("mousemove", handleHeroMove);
      hero.addEventListener("mouseleave", handleHeroLeave);
      
      // Optimization: trigger hardware acceleration
      title.style.willChange = "transform";
    }

    // ── 2. Scroll Parallax (Ghosts) ──
    const registerGhost = document.querySelector(".register-ghost") as HTMLElement;
    const heroGhost = document.getElementById("heroGhost") as HTMLElement;
    let scrollRafId: number | null = null;

    const onScroll = () => {
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      scrollRafId = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (registerGhost) {
          registerGhost.style.transform = `translateX(-50%) translateY(${scrolled * 0.12}px)`;
        }
        if (heroGhost) {
          heroGhost.style.transform = `translateX(-50%) translateY(${scrolled * -0.08}px)`;
        }
      });
    };

    if ((registerGhost || heroGhost) && !isReducedMotion && !isTouch) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // ── 3. Global 3D Tilt for Cards ──
    const cards = document.querySelectorAll("[data-tilt]");
    const cardRafs = new Map<HTMLElement, number>();

    const handleCardMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      if (!cardRafs.has(card)) card.style.willChange = "transform";
      if (cardRafs.has(card)) cancelAnimationFrame(cardRafs.get(card)!);

      const id = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const rotX = (y - 0.5) * 12; // Adjusted for premium feel
        const rotY = (x - 0.5) * -12;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      cardRafs.set(card, id);
    };
    
    const handleCardLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      if (cardRafs.has(card)) {
        cancelAnimationFrame(cardRafs.get(card)!);
        cardRafs.delete(card);
      }
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
      card.style.willChange = "auto";
    };

    if (!isTouch) {
      cards.forEach(card => {
        if (!(card instanceof HTMLElement)) return;
        card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        card.addEventListener("mousemove", handleCardMove as EventListener);
        card.addEventListener("mouseleave", handleCardLeave as EventListener);
      });
    }

    // ── 4. Reveal Observer Hook ──
    const win = window as unknown as { __observeReveal?: () => void };
    if (win.__observeReveal) {
      setTimeout(() => win.__observeReveal!(), 50);
    }

    return () => {
      if (heroRafId) cancelAnimationFrame(heroRafId);
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      cardRafs.forEach(id => cancelAnimationFrame(id));
      
      if (hero) {
        hero.removeEventListener("mousemove", handleHeroMove);
        hero.removeEventListener("mouseleave", handleHeroLeave);
      }
      window.removeEventListener("scroll", onScroll);
      cards.forEach(card => {
        card.removeEventListener("mousemove", handleCardMove as EventListener);
        card.removeEventListener("mouseleave", handleCardLeave as EventListener);
      });
    };
  }, []);

  return null;
}
