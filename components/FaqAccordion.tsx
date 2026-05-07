"use client";

import { useState, useEffect } from "react";
import { FAQ_ITEMS } from "@/constants/membership";

function ChevronIcon({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <svg 
      className={className} 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{ 
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style 
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isHoverEnabled, setIsHoverEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      if (window.matchMedia("(hover: hover)").matches) {
        setIsHoverEnabled(true);
      }
    }, 0);
    // Trigger global reveal observer for dynamically mounted content
    const win = window as unknown as { __observeReveal?: () => void };
    if (win.__observeReveal) {
      setTimeout(() => win.__observeReveal?.(), 200);
    }
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseEnter = (index: number) => {
    if (mounted && isHoverEnabled && window.innerWidth > 1100) {
      setOpenIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (mounted && isHoverEnabled && window.innerWidth > 1100) {
      setOpenIndex(null);
    }
  };

  return (
    <div className="faq-list">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <details
            className={`faq-item ${mounted ? 'is-mounted' : ''}`}
            key={item.question}
            open={isOpen}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            <summary 
              onClick={(e) => {
                e.preventDefault();
                toggleItem(i);
              }}
            >
              <span className="faq-q-text">{item.question}</span>
              <div className="faq-icon-wrap">
                <ChevronIcon className="faq-chevron" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </div>
            </summary>
            <div 
              className="faq-body" 
              style={{
                maxHeight: isOpen ? "400px" : "0px", 
                overflow: "hidden",
                transition: "max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              <div className={`faq-answer-inner ${isOpen ? 'on' : ''}`}>
                <p
                  className="faq-answer"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
