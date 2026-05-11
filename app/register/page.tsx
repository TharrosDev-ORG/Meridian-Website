import type { Metadata } from "next";
import RegistrationForm from "@/components/RegistrationForm";
import PageStyles from "@/components/PageStyles";
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
    min-height: 100dvh;
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
    max-width: 1000px;
  }
  .reg-form-container {
    margin-top: 0 !important;
    background: rgba(244, 237, 227, 0.6) !important;
  }

  @media (min-width: 1101px) {
    .register-page-minimal { padding: 88px 40px 120px; }
    .register-nav { max-width: 1100px; margin-bottom: 72px; }
    .register-form-wrapper { max-width: 1100px; }
    .return-link { font-size: 12px; letter-spacing: 0.28em; }
  }

  @media (max-width: 700px) {
    .register-page-minimal {
      padding: 32px 18px calc(40px + env(safe-area-inset-bottom, 0px));
    }
    .register-nav {
      margin-bottom: 28px;
    }
    .return-link {
      font-size: 11px;
      letter-spacing: 0.22em;
      padding: 8px 0;
      min-height: 40px;
    }
  }
`;

export default function RegisterPage() {
  return (
    <TransitionWrapper>
      <main className="register-page-minimal">
        <PageStyles css={membershipCss + registerPageCss} />
        <div className="register-header rv">
        </div>
        <div className="register-form-wrapper rv" data-d="1">
          <RegistrationForm />
        </div>
      </main>
    </TransitionWrapper>
  );
}
