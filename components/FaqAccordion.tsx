"use client";

import { useRef, useCallback, useEffect } from "react";

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

function openItem(item: HTMLDetailsElement) {
  const body = item.querySelector<HTMLElement>(".faq-body");
  const answer = item.querySelector<HTMLElement>(".faq-answer");
  if (!body || !answer) return;
  item.open = true;
  body.style.maxHeight = answer.offsetHeight + 32 + "px";
}

function closeItem(item: HTMLDetailsElement) {
  const body = item.querySelector<HTMLElement>(".faq-body");
  if (!body) return;
  body.style.maxHeight = "0";
  // Delay removing open attribute until CSS transition finishes
  setTimeout(() => {
    // Only close if maxHeight is still 0 (user didn't re-open)
    if (body.style.maxHeight === "0" || body.style.maxHeight === "0px") {
      item.open = false;
    }
  }, 400);
}

export default function FaqAccordion() {
  const listRef = useRef<HTMLDivElement>(null);

  const init = useCallback(() => {
    if (!listRef.current) return;
    const canHover = window.matchMedia("(hover: hover)").matches;
    const items = listRef.current.querySelectorAll<HTMLDetailsElement>(".faq-item");

    items.forEach((item) => {
      const summary = item.querySelector("summary");
      const body = item.querySelector<HTMLElement>(".faq-body");
      if (!summary || !body) return;

      // Track if this item was opened via hover (so we only auto-close hover-opened ones)
      let hoverOpened = false;
      let closeTimeout: NodeJS.Timeout | null = null;

      // Ensure closed initially
      item.open = false;
      body.style.maxHeight = "0";

      summary.addEventListener("click", (e) => {
        e.preventDefault();
        hoverOpened = false;
        if (closeTimeout) clearTimeout(closeTimeout);
        
        if (item.open) {
          closeItem(item);
        } else {
          openItem(item);
        }
      });

      if (canHover) {
        item.addEventListener("mouseenter", () => {
          if (window.innerWidth <= 700) return;
          if (closeTimeout) {
            clearTimeout(closeTimeout);
            closeTimeout = null;
          }
          if (!item.open) {
            openItem(item);
            hoverOpened = true;
          }
        });

        item.addEventListener("mouseleave", () => {
          if (window.innerWidth <= 700) return;
          if (hoverOpened && item.open) {
            // Standard closeItem logic but with a manual timeout we can track
            body.style.maxHeight = "0";
            closeTimeout = setTimeout(() => {
              if (body.style.maxHeight === "0" || body.style.maxHeight === "0px") {
                item.open = false;
              }
              closeTimeout = null;
            }, 400);
            hoverOpened = false;
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(init, 80);
    return () => clearTimeout(timer);
  }, [init]);

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
