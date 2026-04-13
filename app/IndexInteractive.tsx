"use client";
import { useEffect } from "react";

export default function IndexInteractive() {
  useEffect(() => {
    // Hero mouse-tilt
    const hero = document.querySelector('.hero') as HTMLElement;
    const title = document.getElementById('heroTitle') as HTMLElement;
    
    if (hero && title) {
      const handleMouseMove = (e: MouseEvent) => {
        const r = hero.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) / r.width;
        const dy = (e.clientY - r.top - r.height / 2) / r.height;
        title.style.transform = `perspective(1200px) rotateY(${dx * 3}deg) rotateX(${-dy * 2}deg)`;
        title.style.transition = 'transform 0.1s linear';
      };
      
      const handleMouseLeave = () => {
        title.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
        title.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
      };

      hero.addEventListener('mousemove', handleMouseMove);
      hero.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        hero.removeEventListener('mousemove', handleMouseMove);
        hero.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);



  useEffect(() => {
    // Register ghost parallax
    const ghost = document.querySelector('.register-ghost') as HTMLElement;
    if (!ghost || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const onScroll = () => {
      ghost.style.transform = `translateX(-50%) translateY(${window.scrollY * 0.08}px)`;
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Reveal homepage elements on load
    const win = window as unknown as { __observeReveal?: () => void };
    if (win.__observeReveal) {
      setTimeout(() => win.__observeReveal!(), 50);
    }
  }, []);

  useEffect(() => {
    // Global 3D Tilt for cards
    const cards = document.querySelectorAll('[data-tilt]');
    const handleMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rotX = (y - 0.5) * 10;
      const rotY = (x - 0.5) * -10;
      card.style.transition = 'transform 0.1s ease-out';
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    const handleLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transition = '';
      card.style.transform = '';
    };

    cards.forEach(card => {
      card.addEventListener('mousemove', handleMove as EventListener);
      card.addEventListener('mouseleave', handleLeave as EventListener);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMove as EventListener);
        card.removeEventListener('mouseleave', handleLeave as EventListener);
      });
    };
  }, []);

  return null;
}
