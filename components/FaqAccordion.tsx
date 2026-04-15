"use client";

import { useState, useEffect } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: "Is membership free?",
    answer: "Yes. Membership is completely free. There is no cost to join The Meridian Society.",
  },
  {
    question: "Who can join?",
    answer: "Any motivated, curious student in the Ottawa area is welcome to register. You don&apos;t need to be from a specific school or program.",
  },
  {
    question: "What happens after I register?",
    answer: 'You&apos;ll receive event announcements and invitations as they go out. No spam, no commitments. You can also follow us on <a href="https://www.instagram.com/Meridian.Society" target="_blank" rel="noopener noreferrer">Instagram</a> for updates.',
  },
  {
    question: "Do I have to attend every event?",
    answer: "No. Register once, come to what interests you. There is no attendance requirement. Membership is yours to use how it suits you.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isHoverEnabled, setIsHoverEnabled] = useState(false);

  useEffect(() => {
    // Defer state update to avoid 'cascading renders' lint error
    const timer = setTimeout(() => {
      if (window.matchMedia("(hover: hover)").matches) {
        setIsHoverEnabled(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseEnter = (index: number) => {
    if (isHoverEnabled && window.innerWidth > 700) {
      setOpenIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (isHoverEnabled && window.innerWidth > 700) {
      setOpenIndex(null);
    }
  };

  return (
    <div className="faq-list rv" data-d="2">
      {FAQ_DATA.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <details 
            className="faq-item" 
            key={i} 
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
              {item.question} <span className="faq-icon">{isOpen ? "−" : "+"}</span>
            </summary>
            <div 
              className="faq-body" 
              style={{
                maxHeight: isOpen ? "200px" : "0px", // Approximate height; transitioned in CSS
                overflow: "hidden",
                transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              <p
                className="faq-answer"
                dangerouslySetInnerHTML={{ __html: item.answer }}
                style={{ paddingBottom: '24px' }}
              />
            </div>
          </details>
        );
      })}
    </div>
  );
}
