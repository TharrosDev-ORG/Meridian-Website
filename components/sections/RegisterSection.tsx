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
  const renderTitle = () => {
    const lastWord = title.split(' ').pop() ?? '';
    const prefix = title.slice(0, title.length - lastWord.length);
    if (title.endsWith('.')) {
      return <><span>{prefix}</span><em>{lastWord}</em></>;
    }
    return <>{title}</>;
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
