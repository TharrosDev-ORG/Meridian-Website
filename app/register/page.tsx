import type { Metadata } from "next";
import RegistrationForm from "@/components/RegistrationForm";
import PageStyles from "@/components/PageStyles";
import BackButton from "@/components/BackButton";
import TransitionWrapper from "@/components/TransitionWrapper";
import { membershipCss } from "../(site)/membership/pageCss";
import { getMetadata } from "@/utils/metadata-shared";

export const metadata: Metadata = getMetadata({
  title: "Register",
  description: "Register as a member of The Meridian Society. Free membership for Ottawa students — no commitment required.",
  urlPath: "/register"
});

const registerPageCss = `
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
    color: var(--gold);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: opacity 0.2s;
  }
  .return-link:hover {
    opacity: 0.7;
  }
  .register-form-wrapper {
    width: 100%;
    max-width: 800px;
    animation: riseIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reg-form-container {
    margin-top: 0 !important;
    background: rgba(244, 237, 227, 0.6) !important;
  }
`;

export default function RegisterPage() {
  return (
    <TransitionWrapper>
      <main className="register-page-minimal">
        <PageStyles css={membershipCss + registerPageCss} />
        <div className="register-nav">
          <BackButton className="return-link" />
        </div>
        <div className="register-form-wrapper">
          <RegistrationForm />
        </div>
      </main>
    </TransitionWrapper>
  );
}
