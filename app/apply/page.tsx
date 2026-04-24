import type { Metadata } from "next";
import SpeakerForm from "@/components/SpeakerForm";
import PageStyles from "@/components/PageStyles";
import BackButton from "@/components/BackButton";
import TransitionWrapper from "@/components/TransitionWrapper";
import { speakCss } from "../(site)/speak/pageCss";
import { getMetadata } from "@/utils/metadata-shared";

export const metadata: Metadata = getMetadata({
  title: "Speaker Application",
  description: "Apply to speak at The Meridian Society. Share your expertise with motivated students in Ottawa.",
  urlPath: "/apply"
});

const applyPageCss = `
  .apply-page-minimal {
    background: var(--cream);
    min-height: 100vh;
    padding: 60px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .apply-nav {
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
  .apply-form-wrapper {
    width: 100%;
    max-width: 1000px;
  }
  .reg-form-container {
    margin-top: 0 !important;
    background: rgba(244, 237, 227, 0.6) !important;
  }

  @media (min-width: 1101px) {
    .apply-page-minimal { padding: 88px 40px 120px; }
    .apply-nav { max-width: 1100px; margin-bottom: 72px; }
    .apply-form-wrapper { max-width: 1100px; }
    .return-link { font-size: 12px; letter-spacing: 0.28em; }
  }

  @media (max-width: 700px) {
    .apply-page-minimal {
      padding: 32px 18px calc(40px + env(safe-area-inset-bottom, 0px));
    }
    .apply-nav {
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

export default function ApplyPage() {
  return (
    <TransitionWrapper>
      <main className="apply-page-minimal">
        <PageStyles css={speakCss + applyPageCss} />
        <div className="apply-nav rv">
          <BackButton className="return-link" />
        </div>
        <div className="apply-form-wrapper rv" data-d="1">
          <SpeakerForm />
        </div>
      </main>
    </TransitionWrapper>
  );
}
