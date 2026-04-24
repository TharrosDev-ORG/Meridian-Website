"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { submitSpeakerApplication, checkSpeakerEmail, SpeakerApplicationData } from "@/app/actions/speak";
import Link from "next/link";

const CLASSIFICATIONS = ["Academic", "Industry", "Entrepreneur", "Policy", "NGO", "Other"];
const EXPERTISE_LIST = [
  "International Relations", "Global Health", "Economics", "Tech / AI", 
  "Climate & Environment", "Human Rights", "Business & Finance", 
  "Education", "Law", "Other"
];
const FORMAT_LIST = ["Keynote Presentation", "Panel Discussion", "Interactive Workshop", "Informal Fireside Chat", "Open Forum / Q&A"];
const AVAILABILITY_LIST = ["Fall 2026", "Winter 2027", "Spring/Summer 2027", "Flexible / Rolling", "Specific date/window"];
const REFERRAL_LIST = ["Society Website", "Social Media", "Personal Recommendation", "Past Society Event", "Other"];

export default function SpeakerForm() {
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [selectedAvail, setSelectedAvail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (result?.success) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      localStorage.removeItem("speaker_form_draft");
    }
  }, [result]);

  // Drafting Logic
  const autoJumped = useRef(false);
  useEffect(() => {
    if (!mounted) return;
    const saved = localStorage.getItem("speaker_form_draft");
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        if (draft.email) setEmailValue(draft.email);
        if (draft.fullName) setNameValue(draft.fullName);
        
        const form = document.querySelector('form');
        if (form) {
          Object.entries(draft).forEach(([name, value]) => {
            const inputs = form.querySelectorAll(`[name="${name}"]`);
            inputs.forEach((inputEl: any) => {
              if (inputEl.type === 'checkbox' || inputEl.type === 'radio') {
                if (inputEl.value === value || (inputEl.type === 'checkbox' && value === 'on')) {
                  inputEl.checked = true;
                }
              } else if (name !== 'email' && name !== 'fullName') {
                inputEl.value = value as string;
              }
            });
          });

          if (currentStep === 1 && Object.keys(draft).length > 2 && !autoJumped.current) {
            autoJumped.current = true;
            setCurrentStep(2);
          }
        }
      } catch (e) { console.error("Draft load failed", e); }
    }
  }, [mounted, currentStep]);

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const draft: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (key !== 'fax_number') draft[key] = value;
    });
    localStorage.setItem("speaker_form_draft", JSON.stringify(draft));
  };

  const handleRadioClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    if (input.dataset.checked === "true") {
      input.checked = false;
      input.dataset.checked = "false";
      const event = new Event("change", { bubbles: true });
      input.dispatchEvent(event);
    } else {
      const group = document.querySelectorAll(`input[name="${input.name}"]`);
      group.forEach((el: any) => (el.dataset.checked = "false"));
      input.dataset.checked = "true";
    }
  };

  async function clientAction(formData: FormData) {
    if (currentStep === 1) {
      const email = formData.get("email") as string;
      const fullName = formData.get("fullName") as string;

      if (!fullName || fullName.length < 2) {
        setResult({ success: false, error: "Please enter your full name." });
        return;
      }

      if (!email || !email.includes('@')) {
        setResult({ success: false, error: "Please enter a valid email address." });
        return;
      }

      startTransition(async () => {
        const check = await checkSpeakerEmail(email);
        if (check.exists) {
          setResult({ success: true });
        } else if (check.error) {
          setResult({ success: false, error: check.error });
        } else {
          setResult(null);
          setCurrentStep(2);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
      return;
    }

    const selectedExpertise = EXPERTISE_LIST.filter(i => formData.get(`expertise-${i}`) === "on");
    const selectedFormats = FORMAT_LIST.filter(f => formData.get(`format-${f}`) === "on");

    const selectedAvailVal = formData.get("availability") as string;
    let finalAvail = selectedAvailVal;
    if (selectedAvailVal === "Specific date/window") {
      const start = formData.get("availStart");
      const end = formData.get("availEnd");
      if (start && end) finalAvail = `Window: ${start} to ${end}`;
      else if (start) finalAvail = `Date: ${start}`;
    }

    const data: SpeakerApplicationData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      roleTitle: formData.get("roleTitle") as string,
      organization: formData.get("organization") as string,
      classification: formData.get("classification") as any,
      expertise: selectedExpertise,
      proposedTitle: formData.get("proposedTitle") as string,
      topicOverview: formData.get("topicOverview") as string,
      keyTakeaways: formData.get("keyTakeaways") as string,
      bio: formData.get("bio") as string,
      preferredFormat: selectedFormats,
      availability: finalAvail,
      locationConstraints: formData.get("locationConstraints") as string,
      previousExperience: formData.get("prevExp") === "Yes",
      portfolioLink: formData.get("portfolioLink") as string,
      linkedinUrl: formData.get("linkedinUrl") as string,
      socialMedia: formData.get("socialMedia") as string,
      referralSource: formData.get("referralSource") as string,
      additionalNotes: formData.get("additionalNotes") as string,
      fax_number: formData.get("fax_number") as string,
    };

    startTransition(async () => {
      const res = await submitSpeakerApplication(data);
      setResult(res);
      if (res.success) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  if (!mounted) {
    return (
      <div className="reg-form-container" style={{ textAlign: 'center', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(244, 237, 227, 0.4)' }}>
        <div className="skeleton-loader rv-stagger-item" style={{ opacity: 0.2 }}>
          <h1 className="success-title" style={{ fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.02em' }}>
            Initializing <em>Registry...</em>
          </h1>
        </div>
      </div>
    );
  }

  if (result?.success) {
    return (
      <div className="success-overhaul rv" data-d="1" role="status" aria-live="polite">
        <div className="success-header">
          <div className="success-eyebrow rv-stagger-item">Proposal Received</div>
          <h1 className="success-title rv-stagger-item">
            Thank you, <em>{nameValue.split(' ')[0] || "Contributor"}.</em>
          </h1>
          <div className="success-rule rv-stagger-item"></div>
        </div>

        <div className="registry-box rv-stagger-item" style={{ marginBottom: '40px', maxWidth: '520px' }}>
          <div className="registry-label">Selection Process</div>
          <p style={{ 
            fontFamily: 'var(--serif)', 
            fontSize: '18px', 
            color: 'var(--ink-75)', 
            fontStyle: 'italic',
            margin: '0 0 20px 0',
            lineHeight: '1.6',
            textAlign: 'center'
          }}>
            The society team reviews every proposal to ensure a rigorous and diverse dialogue for our members. We prioritize topics that challenge conventional wisdom.
          </p>
          <div className="registry-status">
            <span className="status-dot"></span>
            <span className="status-text" style={{ color: 'var(--gold)' }}>7–10 Day Review Window</span>
          </div>
        </div>

        <p className="success-lead rv-stagger-item">
          We appreciate the depth and intent of your proposal. If your perspective aligns with our upcoming forum sequences, we will reach out to coordinate a preliminary dialogue.
        </p>

        <div className="success-footer rv-stagger-item">
          <Link href="/" className="success-home-link">
            <span>Return to Home Index</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={clientAction} onChange={handleFormChange} className="reg-form-container" style={{ background: 'rgba(244, 237, 227, 0.7)' }}>
      <div className="reg-grid">
        {/* Step 1: Identity */}
        <div className={`reg-field ${currentStep === 2 ? 'reg-field--full' : ''}`} style={currentStep === 2 ? { borderBottom: '1px solid var(--ink-10)', paddingBottom: '24px', marginBottom: '8px' } : {}}>
          <label htmlFor="fullName" className="reg-label">Full Name *</label>
          <input 
            type="text" 
            id="fullName" 
            name="fullName" 
            required 
            className="reg-input" 
            placeholder="e.g. Dr. Helena Vance" 
            disabled={isPending}
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            readOnly={currentStep === 2}
          />
        </div>

        <div className={`reg-field ${currentStep === 2 ? 'reg-field--full' : ''}`} style={currentStep === 2 ? { borderBottom: '1px solid var(--ink-10)', paddingBottom: '20px', marginBottom: '20px' } : {}}>
          <label htmlFor="email" className="reg-label">Email Address *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="reg-input" 
            placeholder="e.g. helena@meridian.org" 
            disabled={isPending} 
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            readOnly={currentStep === 2}
          />
          {currentStep === 2 && (
            <button 
              type="button" 
              onClick={() => { setCurrentStep(1); setResult(null); }} 
              className="text-link" 
              style={{ fontSize: '11px', marginTop: '10px', display: 'inline-block', letterSpacing: '0.05em' }}
            >
              ← Edit identity details
            </button>
          )}
        </div>

        {/* Honeypot (Always present) */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <input type="text" name="fax_number" tabIndex={-1} autoComplete="off" />
        </div>

        {currentStep === 2 && (
          <>
            <div className="reg-field">
              <label htmlFor="roleTitle" className="reg-label">Current Role / Title *</label>
              <input type="text" id="roleTitle" name="roleTitle" required className="reg-input" placeholder="e.g. Senior Fellow / VP Research" disabled={isPending} />
            </div>
            <div className="reg-field">
              <label htmlFor="organization" className="reg-label">Organization / Institution</label>
              <input type="text" id="organization" name="organization" className="reg-input" placeholder="e.g. Global Policy Institute" disabled={isPending} />
            </div>

            {/* Classification */}
            <fieldset className="reg-field reg-field--full reg-fieldset">
              <legend className="reg-label">Primary Classification *</legend>
              <div className="reg-options-grid">
                {CLASSIFICATIONS.map((c) => {
                  const choiceId = `class-${c.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <label key={c} htmlFor={choiceId} className="reg-choice reg-choice--radio">
                      <input type="radio" id={choiceId} name="classification" value={c} required onClick={handleRadioClick} disabled={isPending} />
                      <span className="reg-choice-ui"></span>
                      <span>{c}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Expertise */}
            <fieldset className="reg-field reg-field--full reg-fieldset">
              <legend className="reg-label">Areas of Expertise *</legend>
              <div className="reg-options-grid">
                {EXPERTISE_LIST.map((e) => {
                  const choiceId = `exp-${e.toLowerCase().replace(/[^a-z]/g, '-')}`;
                  return (
                    <label key={e} htmlFor={choiceId} className="reg-choice reg-choice--check">
                      <input type="checkbox" id={choiceId} name={`expertise-${e}`} disabled={isPending} />
                      <span className="reg-choice-ui"></span>
                      <span>{e}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Proposal */}
            <div className="reg-field reg-field--full">
              <label htmlFor="proposedTitle" className="reg-label">Proposed Presentation Title *</label>
              <input type="text" id="proposedTitle" name="proposedTitle" required className="reg-input" placeholder="Give your talk a working title" disabled={isPending} />
            </div>
            <div className="reg-field reg-field--full">
              <label htmlFor="topicOverview" className="reg-label">Topic Overview *</label>
              <textarea id="topicOverview" name="topicOverview" required className="reg-input" style={{ minHeight: '120px' }} placeholder="Provide a detailed summary of what you'd like to discuss..." disabled={isPending} />
            </div>
            <div className="reg-field reg-field--full">
              <label htmlFor="keyTakeaways" className="reg-label">Key Takeaways (3-5 main points)</label>
              <textarea id="keyTakeaways" name="keyTakeaways" className="reg-input" style={{ minHeight: '80px' }} placeholder="What will students walk away with?" disabled={isPending} />
            </div>
            <div className="reg-field reg-field--full">
              <label htmlFor="bio" className="reg-label">Professional Bio *</label>
              <textarea id="bio" name="bio" required className="reg-input" style={{ minHeight: '120px' }} placeholder="Briefly describe your experience and background..." disabled={isPending} />
            </div>

            {/* Formats */}
            <fieldset className="reg-field reg-field--full reg-fieldset">
              <legend className="reg-label">Preferred Format *</legend>
              <div className="reg-options-grid">
                {FORMAT_LIST.map((f) => {
                  const choiceId = `format-${f.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <label key={f} htmlFor={choiceId} className="reg-choice reg-choice--check">
                      <input type="checkbox" id={choiceId} name={`format-${f}`} disabled={isPending} />
                      <span className="reg-choice-ui"></span>
                      <span>{f}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Logistics */}
            <fieldset className="reg-field reg-fieldset">
              <legend className="reg-label">Availability Window *</legend>
              <div className="reg-options-grid" style={{ gridTemplateColumns: '1fr' }}>
                {AVAILABILITY_LIST.map((a) => {
                  const choiceId = `avail-${a.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <label key={a} htmlFor={choiceId} className="reg-choice reg-choice--radio">
                      <input 
                        type="radio" 
                        id={choiceId} 
                        name="availability" 
                        value={a} 
                        required 
                        onClick={(e) => { handleRadioClick(e); setSelectedAvail(a); }} 
                        disabled={isPending} 
                      />
                      <span className="reg-choice-ui"></span>
                      <span>{a}</span>
                    </label>
                  );
                })}
              </div>

              {selectedAvail === "Specific date/window" && (
                <div className="date-picker-sub" style={{ marginTop: '20px', padding: '20px', border: '1px solid var(--ink-10)', borderRadius: '4px', background: 'rgba(255,255,255,0.3)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="reg-field" style={{ marginBottom: 0 }}>
                      <label htmlFor="availStart" className="reg-label" style={{ fontSize: '10px' }}>Start Date</label>
                      <input type="date" id="availStart" name="availStart" required className="reg-input" style={{ fontSize: '12px' }} disabled={isPending} />
                    </div>
                    <div className="reg-field" style={{ marginBottom: 0 }}>
                      <label htmlFor="availEnd" className="reg-label" style={{ fontSize: '10px' }}>End Date (Optional)</label>
                      <input type="date" id="availEnd" name="availEnd" className="reg-input" style={{ fontSize: '12px' }} disabled={isPending} />
                    </div>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--ink-50)', marginTop: '12px', fontStyle: 'italic' }}>Mark a single day or a range of dates.</p>
                </div>
              )}
            </fieldset>
            <div className="reg-field">
              <label htmlFor="locationConstraints" className="reg-label">Location Constraints</label>
              <input type="text" id="locationConstraints" name="locationConstraints" className="reg-input" placeholder="e.g. Based in Ottawa / Travel required" disabled={isPending} />
            </div>

            {/* Experience & Links */}
            <fieldset className="reg-field reg-fieldset">
              <legend className="reg-label">Past Speaking Experience? *</legend>
              <div className="reg-options-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {["Yes", "No"].map((v) => {
                  const choiceId = `prev-${v.toLowerCase()}`;
                  return (
                    <label key={v} htmlFor={choiceId} className="reg-choice reg-choice--radio">
                      <input type="radio" id={choiceId} name="prevExp" value={v} required onClick={handleRadioClick} disabled={isPending} />
                      <span className="reg-choice-ui"></span>
                      <span>{v}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <div className="reg-field">
              <label htmlFor="portfolioLink" className="reg-label">Portfolio / Past Talk Link</label>
              <input type="url" id="portfolioLink" name="portfolioLink" className="reg-input" placeholder="YouTube, Website, etc." disabled={isPending} />
            </div>

            {/* Social */}
            <div className="reg-field">
              <label htmlFor="linkedinUrl" className="reg-label">LinkedIn URL</label>
              <input type="url" id="linkedinUrl" name="linkedinUrl" className="reg-input" placeholder="linkedin.com/in/..." disabled={isPending} />
            </div>
            <div className="reg-field">
              <label htmlFor="socialMedia" className="reg-label">Other Social Media</label>
              <input type="text" id="socialMedia" name="socialMedia" className="reg-input" placeholder="Twitter / IG handle" disabled={isPending} />
            </div>

            {/* Referral */}
            <fieldset className="reg-field reg-field--full reg-fieldset">
              <legend className="reg-label">How did you hear about us? *</legend>
              <div className="reg-options-grid">
                {REFERRAL_LIST.map((r) => {
                  const choiceId = `ref-${r.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <label key={r} htmlFor={choiceId} className="reg-choice reg-choice--radio">
                      <input type="radio" id={choiceId} name="referralSource" value={r} required onClick={handleRadioClick} disabled={isPending} />
                      <span className="reg-choice-ui"></span>
                      <span>{r}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="reg-field reg-field--full">
              <label htmlFor="additionalNotes" className="reg-label">Additional Notes</label>
              <textarea id="additionalNotes" name="additionalNotes" className="reg-input" style={{ minHeight: '80px' }} placeholder="Anything else you'd like us to know?" disabled={isPending} />
            </div>
          </>
        )}
      </div>

      {result?.error && (
        <div className="reg-feedback reg-error" role="alert">
          {result.error}
        </div>
      )}

      <div className="reg-submit-wrap">
        <button type="submit" className="reg-submit" disabled={isPending}>
          <span>
            {isPending 
              ? (currentStep === 1 ? "Verifying..." : "Submitting...") 
              : (currentStep === 1 ? "Check Status / Continue" : "Submit Application")}
          </span>
        </button>
      </div>
    </form>
  );
}
