import React from 'react';
import Link from 'next/link';
import { REGISTER_URL } from '@/components/NavBar';

interface RegisterSectionProps {
  title?: string;
  body?: string;
  btnText?: string;
  id?: string;
}

const RegisterSection: React.FC<RegisterSectionProps> = ({
  title = "Become a Member.",
  body = "Membership puts you in the room. Register to stay informed, attend events, and become part of a community built around curiosity and conversation.",
  btnText = "Register for Updates",
  id = "register"
}) => {
  // Extracting the emphasis part for the title if it contains a dot or specific pattern
  const renderTitle = () => {
    if (title.endsWith('.')) {
      const base = title.slice(0, -1);
      // Find the last word to italicize it? AGENTS.md says "Become a Member."
      // The current implementation uses "Become a <em>Member.</em>"
      return (
        <span dangerouslySetInnerHTML={{ __html: title.replace('Member.', '<em>Member.</em>') }} />
      );
    }
    return title;
  };

  return (
    <section className="register" id={id} aria-labelledby={`${id}-heading`}>
      <div className="register-ghost" aria-hidden="true">MERIDIAN</div>
      <div className="wrap">
        <div className="register-rule-top" aria-hidden="true"></div>
        <p className="register-eyebrow rv">Independent  ·  Student-Run  ·  Ottawa  ·  Est. 2025</p>
        <h2 className="register-title rv" data-d="1" id={`${id}-heading`}>
          {renderTitle()}
        </h2>
        <p className="register-body rv" data-d="2">
          {body}
        </p>
        <div className="register-actions rv" data-d="3">
          <Link href={REGISTER_URL} className="register-btn" data-register>
            <span>{btnText}</span>
          </Link>
        </div>
        <div className="register-rule-btm" aria-hidden="true"></div>
      </div>
    </section>
  );
};

export default RegisterSection;
