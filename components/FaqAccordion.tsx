"use client";

import { useEffect, useRef, useCallback } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: "Is membership free?",
    answer:
      "Yes. Membership is completely free. There is no cost to join The Meridian Society.",
  },
  {
    question: "Who can join?",
    answer:
      "Any motivated, curious student in the Ottawa area is welcome to register. You don&apos;t need to be from a specific school or program.",
  },
  {
    question: "What happens after I register?",
    answer:
      'You&apos;ll receive event announcements and invitations as they go out. No spam, no commitments. You can also follow us on <a href="https://www.instagram.com/Meridian.Society" target="_blank" rel="noopener noreferrer">Instagram</a> for updates.',
  },
  {
    question: "Do I have to attend every event?",
    answer:
      "No. Register once, come to what interests you. There is no attendance requirement. Membership is yours to use how it suits you.",
  },
];

export default function FaqAccordion() {
  const listRef = useRef<HTMLDivElement>(null);

  const initAccordion = useCallback(() => {
    if (!listRef.current) return;
    const canHover = window.matchMedia("(hover: hover)").matches;
    const items = listRef.current.querySelectorAll<HTMLDetailsElement>(".faq-item");

    items.forEach((item) => {
      const summary = item.querySelector("summary");
      const body = item.querySelector<HTMLElement>(".faq-body");
      const answer = item.querySelector<HTMLElement>(".faq-answer");
      if (!summary || !body || !answer) return;

      let isAnimating = false;
      let hoverOpened = false;

      // Initialize closed state
      item.open = false;
      body.style.maxHeight = "0";

      function setOpen(shouldOpen: boolean) {
        if (shouldOpen === item.open) return;
        item.open = shouldOpen;
        if (shouldOpen) {
          body!.style.maxHeight = answer!.offsetHeight + 32 + "px";
        } else {
          body!.style.maxHeight = "0";
        }
      }

      summary.addEventListener("click", (e) => {
        if (isAnimating) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        hoverOpened = false;
        isAnimating = true;
        setOpen(!item.open);
        setTimeout(() => {
          isAnimating = false;
        }, 650);
      });

      item.addEventListener("mouseenter", () => {
        if (!canHover || window.innerWidth <= 700 || isAnimating) return;
        if (!item.open) {
          setOpen(true);
          hoverOpened = true;
        }
      });

      item.addEventListener("mouseleave", () => {
        if (!canHover || window.innerWidth <= 700 || isAnimating) return;
        if (hoverOpened && item.open) {
          isAnimating = true;
          setOpen(false);
          setTimeout(() => {
            isAnimating = false;
          }, 650);
          hoverOpened = false;
        }
      });
    });
  }, []);

  useEffect(() => {
    // Small delay to ensure the DOM and styles are ready
    const timer = setTimeout(initAccordion, 100);
    return () => clearTimeout(timer);
  }, [initAccordion]);

  return (
    <div className="faq-list rv" data-d="2" ref={listRef}>
      {FAQ_DATA.map((item, i) => (
        <details className="faq-item" key={i}>
          <summary>
            {item.question} <span className="faq-icon">+</span>
          </summary>
          <div className="faq-body">
            <p
              className="faq-answer"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </div>
        </details>
      ))}
    </div>
  );
}
