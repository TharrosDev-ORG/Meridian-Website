"use client";
import { useEffect } from "react";

export default function IndexInteractive() {
  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Hero mouse-tilt
    const hero = document.querySelector(".hero") as HTMLElement;
    const title = document.getElementById("heroTitle") as HTMLElement;
    
    let handleHeroMove: ((e: MouseEvent) => void) | undefined;
    let handleHeroLeave: (() => void) | undefined;
    let heroRafId: number | null = null;

    if (hero && title) {
      handleHeroMove = (e: MouseEvent) => {
        if (heroRafId) cancelAnimationFrame(heroRafId);
        heroRafId = requestAnimationFrame(() => {
          const r = hero.getBoundingClientRect();
          const dx = (e.clientX - r.left - r.width / 2) / r.width;
          const dy = (e.clientY - r.top - r.height / 2) / r.height;
          title.style.transform = `perspective(1200px) rotateY(${dx * 3}deg) rotateX(${-dy * 2}deg)`;
          title.style.transition = "transform 0.1s linear";
        });
      };
      
      handleHeroLeave = () => {
        if (heroRafId) cancelAnimationFrame(heroRafId);
        title.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)";
        title.style.transition = "transform 0.4s cubic-bezier(0.16,1,0.3,1)";
      };

      hero.addEventListener("mousemove", handleHeroMove);
      hero.addEventListener("mouseleave", handleHeroLeave);
    }

    // 2. Register ghost parallax
    const ghost = document.querySelector(".register-ghost") as HTMLElement;
    let onScroll: (() => void) | undefined;
    let scrollRafId: number | null = null;

    if (ghost && !isReducedMotion) {
      onScroll = () => {
        if (scrollRafId) cancelAnimationFrame(scrollRafId);
        scrollRafId = requestAnimationFrame(() => {
          ghost.style.transform = `translateX(-50%) translateY(${window.scrollY * 0.08}px)`;
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // 3. Global 3D Tilt for cards
    const cards = document.querySelectorAll("[data-tilt]");
    let cardRafId: number | null = null;

    const handleCardMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      if (cardRafId) cancelAnimationFrame(cardRafId);
      cardRafId = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const rotX = (y - 0.5) * 10;
        const rotY = (x - 0.5) * -10;
        card.style.transition = "transform 0.1s ease-out";
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
    };
    const handleCardLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      if (cardRafId) cancelAnimationFrame(cardRafId);
      card.style.transition = "";
      card.style.transform = "";
    };

    cards.forEach(card => {
      card.addEventListener("mousemove", handleCardMove as EventListener);
      card.addEventListener("mouseleave", handleCardLeave as EventListener);
    });

    // 4. Reveal homepage elements
    const win = window as unknown as { __observeReveal?: () => void };
    if (win.__observeReveal) {
      setTimeout(() => win.__observeReveal!(), 50);
    }

    return () => {
      if (heroRafId) cancelAnimationFrame(heroRafId);
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      if (cardRafId) cancelAnimationFrame(cardRafId);
      
      if (hero && handleHeroMove && handleHeroLeave) {
        hero.removeEventListener("mousemove", handleHeroMove);
        hero.removeEventListener("mouseleave", handleHeroLeave);
      }
      if (onScroll) {
        window.removeEventListener("scroll", onScroll);
      }
      cards.forEach(card => {
        card.removeEventListener("mousemove", handleCardMove as EventListener);
        card.removeEventListener("mouseleave", handleCardLeave as EventListener);
      });
    };
  }, []);

  return null;
}
