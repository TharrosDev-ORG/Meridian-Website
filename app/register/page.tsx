"use client";

import RegistrationForm from "@/components/RegistrationForm";
import Link from "next/link";
import PageStyles from "@/components/PageStyles";
import { membershipCss } from "../(site)/membership/pageCss";

export default function RegisterPage() {
  return (
    <main className="register-page-minimal">
      <PageStyles css={membershipCss} />
      <style jsx global>{`
        .register-page-minimal {
          background: var(--cream);
          min-height: 100vh;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .register-nav {
          width: 100%;
          max-width: 800px;
          margin-bottom: 60px;
        }
        .return-link {
          font-family: var(--sans);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-55);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: color 0.2s;
        }
        .return-link:hover {
          color: var(--gold);
        }
        .register-form-wrapper {
          width: 100%;
          max-width: 800px;
          animation: riseIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        /* Override some membership styles for the standalone page */
        .reg-form-container {
          margin-top: 0 !important;
          background: rgba(244, 237, 227, 0.6) !important;
        }
      `}</style>

      <div className="register-nav">
        <Link href="/" className="return-link">
          <span style={{ fontSize: '14px' }}>←</span> Return Home
        </Link>
      </div>

      <div className="register-form-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 className="register-title" style={{ fontSize: 'clamp(40px, 6vw, 72px)', marginBottom: '16px' }}>
            Become a <em>Member.</em>
          </h1>
          <p className="register-body" style={{ margin: '0 auto', maxWidth: '440px' }}>
            Registration puts you in the room. Stay informed, attend events, and join our community of curiosity.
          </p>
        </div>
        
        <RegistrationForm />
      </div>
    </main>
  );
}
