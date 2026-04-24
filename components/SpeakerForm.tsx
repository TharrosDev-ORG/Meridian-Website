"use client";

import { useState, useTransition, useEffect } from "react";
import { submitSpeakerApplication, SpeakerApplicationData } from "@/app/actions/speak";
import Link from "next/link";

const CLASSIFICATIONS = ["Academic", "Industry", "Entrepreneur", "Policy", "NGO", "Other"];
const EXPERTISE_LIST = [
  "International Relations", "Global Health", "Economics", "Tech / AI", 
  "Climate & Environment", "Human Rights", "Business & Finance", 
  "Education", "Law", "Other"
];
const FORMAT_LIST = ["Keynote", "Panel", "Workshop", "Informal Discussion", "Open Forum"];
const AVAILABILITY_LIST = ["Fall 2025", "Winter 2026", "Spring/Summer 2026", "Flexible", "Strict Window"];
const REFERRAL_LIST = ["Website", "Instagram", "Personal Referral", "Campus Event", "Other"];

export default function SpeakerForm() {
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (result?.success) {
      // Scroll to the top of the page (or at least the form area)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [result]);

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
    const selectedExpertise = EXPERTISE_LIST.filter(i => formData.get(`expertise-${i}`) === "on");
    const selectedFormats = FORMAT_LIST.filter(f => formData.get(`format-${f}`) === "on");

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
      availability: formData.get("availability") as string,
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
      <div style={{ textAlign: 'center', minHeight: '400px' }}>
        <h1 className="success-title" style={{ fontSize: 'clamp(40px, 6vw, 72px)', opacity: 0.1 }}>
          Loading...
        </h1>
      </div>
    );
  }

  if (result?.success) {
    return (
      <div className="success-overhaul" role="status" aria-live="polite">
        <div className="success-header">
          <div className="success-eyebrow rv-stagger-item">Proposal Received</div>
          <h1 className="success-title rv-stagger-item">
            Thank you for <em>Contributing.</em>
          </h1>
          <div className="success-rule rv-stagger-item"></div>
        </div>

        <div className="registry-box rv-stagger-item" style={{ marginBottom: '40px' }}>
          <div className="registry-label">Application Status</div>
          <div className="registry-status">
            <span className="status-dot"></span>
            <span className="status-text" style={{ color: 'var(--gold)' }}>Pending Review</span>
          </div>
        </div>

        <p className="success-lead rv-stagger-item">
          Your proposal has been entered into the Meridian speaker registry. Our team reviews applications on a rolling basis and will reach out if your expertise aligns with our upcoming forums.
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
    <form action={clientAction} className="reg-form-container" style={{ background: 'rgba(244, 237, 227, 0.7)' }}>
      <div className="reg-grid">
        {/* Identity */}
        <div className="reg-field">
          <label htmlFor="fullName" className="reg-label">Full Name *</label>
          <input type="text" id="fullName" name="fullName" required className="reg-input" placeholder="e.g. Dr. Helena Vance" disabled={isPending} />
        </div>
        <div className="reg-field">
          <label htmlFor="email" className="reg-label">Email Address *</label>
          <input type="email" id="email" name="email" required className="reg-input" placeholder="e.g. helena@meridian.org" disabled={isPending} />
        </div>

        {/* Honeypot */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <input type="text" name="fax_number" tabIndex={-1} autoComplete="off" />
        </div>

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
          <legend className="reg-label">Availability Window</legend>
          <div className="reg-options-grid" style={{ gridTemplateColumns: '1fr' }}>
            {AVAILABILITY_LIST.map((a) => {
              const choiceId = `avail-${a.toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <label key={a} htmlFor={choiceId} className="reg-choice reg-choice--radio">
                  <input type="radio" id={choiceId} name="availability" value={a} onClick={handleRadioClick} disabled={isPending} />
                  <span className="reg-choice-ui"></span>
                  <span>{a}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
        <div className="reg-field">
          <label htmlFor="locationConstraints" className="reg-label">Location Constraints *</label>
          <input type="text" id="locationConstraints" name="locationConstraints" required className="reg-input" placeholder="e.g. Travel from Toronto / Remote only" disabled={isPending} />
        </div>

        {/* Experience & Links */}
        <fieldset className="reg-field reg-fieldset">
          <legend className="reg-label">Past Speaking Experience?</legend>
          <div className="reg-options-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {["Yes", "No"].map((v) => {
              const choiceId = `prev-${v.toLowerCase()}`;
              return (
                <label key={v} htmlFor={choiceId} className="reg-choice reg-choice--radio">
                  <input type="radio" id={choiceId} name="prevExp" value={v} onClick={handleRadioClick} disabled={isPending} />
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
      </div>

      {result?.error && (
        <div className="reg-feedback reg-error" role="alert">
          {result.error}
        </div>
      )}

      <div className="reg-submit-wrap">
        <button type="submit" className="reg-submit" disabled={isPending}>
          <span>{isPending ? "Submitting..." : "Submit Application"}</span>
        </button>
      </div>
    </form>
  );
}
