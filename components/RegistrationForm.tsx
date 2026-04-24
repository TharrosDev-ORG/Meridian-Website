"use client";

import { useState, useTransition, useEffect } from "react";
import { registerMember, RegistrationData } from "@/app/actions/register";
import Link from "next/link";
import { INSTAGRAM_URL } from "@/utils/social";

const REG_KEY = "meridian_registered_v1";
const DRAFT_KEY = "meridian_registration_draft_v1";

const ROLES = ["Student", "Alumni", "Professor / Faculty", "Professional", "Other"];
const INSTITUTIONS = ["Carleton University", "University of Ottawa", "Algonquin College", "Other"];
const INTERESTS_LIST = [
  "Politics", "Law", "Business", "Science", "Health Sciences", 
  "Engineering", "Creative Careers (Art, music, film, etc.)", 
  "Environment", "Psychology"
];
const HEARD_SOURCES = ["Friend or Peer", "Professor", "Social Media", "Campus Event", "Current Member"];
const VOLUNTEER_OPTIONS = ["Yes", "Maybe", "Not at this time"];

export default function RegistrationForm() {
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean; error?: string; alreadyRegistered?: boolean } | null>(null);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  // Check registration status on mount
  useEffect(() => {
    const checkRegistration = () => {
      const localReg = localStorage.getItem(REG_KEY);
      const cookieReg = document.cookie.split("; ").find((row) => row.startsWith(`${REG_KEY}=`));
      
      if (localReg === "true" || !!cookieReg) {
        setIsAlreadyRegistered(true);
      }
      setMounted(true);
    };

    // Small delay to ensure browser environment is ready
    const timer = setTimeout(checkRegistration, 0);
    return () => clearTimeout(timer);
  }, []);

  // Form State for dynamic fields
  const [role, setRole] = useState("");
  const [institution, setInstitution] = useState("");
  const [draftLoaded, setDraftLoaded] = useState(false);

  // Load draft on mount
  useEffect(() => {
    if (!mounted) return;
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.role) setRole(data.role);
        if (data.institution) setInstitution(data.institution);
        
        // Populate inputs manually after a short delay to ensure DOM is ready
        setTimeout(() => {
          const form = document.querySelector(".reg-form-container") as HTMLFormElement;
          if (form) {
            Object.entries(data).forEach(([name, value]) => {
              const input = form.elements.namedItem(name);
              if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement || input instanceof HTMLSelectElement) {
                if (input.type === "checkbox" || input.type === "radio") {
                  // Handle groups
                  const group = form.querySelectorAll(`[name="${name}"]`);
                  group.forEach((el: any) => {
                    if (el.value === value) el.checked = true;
                    if (name.startsWith("interest-") && value === "on") el.checked = true;
                  });
                } else {
                  input.value = value as string;
                }
              }
            });
          }
          setDraftLoaded(true);
        }, 10);
      } catch (e) {
        console.error("Failed to load draft", e);
        setDraftLoaded(true);
      }
    } else {
      setDraftLoaded(true);
    }
  }, [mounted]);

  // Save draft on change
  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fd.forEach((value, key) => {
      if (typeof value === "string") data[key] = value;
    });
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  };

  // Allow deselecting radios
  const handleRadioClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    if (input.dataset.checked === "true") {
      input.checked = false;
      input.dataset.checked = "false";
      // Manually trigger change to update state/draft
      const event = new Event("change", { bubbles: true });
      input.dispatchEvent(event);
      
      // Also reset conditional states if applicable
      if (input.name === "role") setRole("");
      if (input.name === "institution") setInstitution("");
    } else {
      // Mark this one as checked, others in group as unchecked
      const group = document.querySelectorAll(`input[name="${input.name}"]`);
      group.forEach((el: any) => (el.dataset.checked = "false"));
      input.dataset.checked = "true";
    }
  };

  async function clientAction(formData: FormData) {
    const selectedInterests = INTERESTS_LIST.filter(i => formData.get(`interest-${i}`) === "on");

    const data: RegistrationData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as "Student" | "Alumni" | "Professor / Faculty" | "Professional" | "Other",
      roleOther: (formData.get("roleOther") as string) || undefined,
      institution: formData.get("institution") as "Carleton University" | "University of Ottawa" | "Algonquin College" | "Other",
      institutionOther: (formData.get("institutionOther") as string) || undefined,
      interests: selectedInterests,
      heardFrom: formData.get("heardFrom") as "Friend or Peer" | "Professor" | "Social Media" | "Campus Event" | "Current Member",
      volunteerInterest: formData.get("volunteerInterest") as "Yes" | "Maybe" | "Not at this time",
      acceptedTerms: formData.get("consent") === "on",
      fax_number: formData.get("fax_number") as string,
    };

    startTransition(async () => {
      const res = await registerMember(data);
      setResult(res);
      if (res.success) {
        localStorage.setItem(REG_KEY, "true");
        const expiry = new Date();
        expiry.setFullYear(expiry.getFullYear() + 1);
        document.cookie = `${REG_KEY}=true; path=/; expires=${expiry.toUTCString()}; SameSite=Lax`;
        setIsAlreadyRegistered(true);
        localStorage.removeItem(DRAFT_KEY);
      }
    });
  }

  if (!mounted) {
    return (
      <div style={{ textAlign: 'center', minHeight: '400px' }}>
        <h1 className="register-title" style={{ fontSize: 'clamp(40px, 6vw, 72px)', opacity: 0.1 }}>
          Loading...
        </h1>
      </div>
    );
  }

  if (isAlreadyRegistered || result?.success) {
    return (
      <div className="success-state" role="status" aria-live="polite">
        <h1 className="register-title" style={{ fontSize: 'clamp(40px, 6vw, 72px)', marginBottom: '32px', textAlign: 'center' }}>
          You are now a <em>Member.</em>
        </h1>
        <span className="success-icon" aria-hidden="true">◆</span>
        <h3 className="success-title">Welcome to the Meridian Society.</h3>
        <p className="success-body">
          Your registration is complete. You are now a member of our community. 
          Follow us on <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="success-ig-link"
          >
            Instagram
          </a> and 
          keep an eye on your inbox for event invitations.
        </p>
        <div style={{ marginTop: "32px" }}>
          <Link href="/" className="reg-submit" style={{ textDecoration: "none", display: "inline-block" }}>
            <span>Return Home Now</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 className="register-title" style={{ fontSize: 'clamp(40px, 6vw, 72px)', marginBottom: '16px' }}>
          Become a <em>Member.</em>
        </h1>
      </div>

      <form 
        action={clientAction} 
        className="reg-form-container"
        onChange={handleFormChange}
      >
        <div className="reg-grid">
          {/* ── Basic Info ── */}
          <div className="reg-field">
            <label htmlFor="fullName" className="reg-label">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              className="reg-input"
              placeholder="e.g. John Smith"
              disabled={isPending}
            />
          </div>

          <div className="reg-field">
            <label htmlFor="email" className="reg-label">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="reg-input"
              placeholder="e.g. john.smith@example.com"
              disabled={isPending}
            />
          </div>

          {/* Honeypot field - Visually hidden to humans, attractive to bots */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="fax_number">Fax Number</label>
            <input
              type="text"
              id="fax_number"
              name="fax_number"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* ── Role ── */}
          <fieldset className="reg-field reg-field--full reg-fieldset">
            <legend className="reg-label">Your Role *</legend>
            <div className="reg-options-grid">
              {ROLES.map((r) => (
                <label key={r} className="reg-choice reg-choice--radio">
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    required
                    onChange={(e) => setRole(e.target.value)}
                    onClick={handleRadioClick}
                    disabled={isPending}
                  />
                  <span className="reg-choice-ui"></span>
                  <span>{r}</span>
                </label>
              ))}
            </div>
            {role === "Other" && (
              <div className="reg-conditional">
                <input
                  type="text"
                  name="roleOther"
                  className="reg-input"
                  placeholder="Please specify your role"
                  aria-label="Please specify your role"
                  required
                  disabled={isPending}
                />
              </div>
            )}
          </fieldset>

          {/* ── Institution ── */}
          <fieldset className="reg-field reg-field--full reg-fieldset">
            <legend className="reg-label">Current or Most Recent Institution (If applicable)</legend>
            <div className="reg-options-grid">
              {INSTITUTIONS.map((inst) => (
                <label key={inst} className="reg-choice reg-choice--radio">
                  <input
                    type="radio"
                    name="institution"
                    value={inst}
                    onChange={(e) => setInstitution(e.target.value)}
                    onClick={handleRadioClick}
                    disabled={isPending}
                  />
                  <span className="reg-choice-ui"></span>
                  <span>{inst}</span>
                </label>
              ))}
            </div>
            {institution === "Other" && (
              <div className="reg-conditional">
                <input
                  type="text"
                  name="institutionOther"
                  className="reg-input"
                  placeholder="Please specify your institution"
                  aria-label="Please specify your institution"
                  required
                  disabled={isPending}
                />
              </div>
            )}
          </fieldset>

          {/* ── Interests ── */}
          <fieldset className="reg-field reg-field--full reg-fieldset">
            <legend className="reg-label">Areas of interest? (Select all that apply) *</legend>
            <div className="reg-options-grid">
              {INTERESTS_LIST.map((interest) => (
                <label key={interest} className="reg-choice reg-choice--check">
                  <input
                    type="checkbox"
                    name={`interest-${interest}`}
                    disabled={isPending}
                  />
                  <span className="reg-choice-ui"></span>
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* ── Referral ── */}
          <fieldset className="reg-field reg-field--full reg-fieldset">
            <legend className="reg-label">How did you hear about The Meridian Society? *</legend>
            <div className="reg-options-grid">
              {HEARD_SOURCES.map((source) => (
                <label key={source} className="reg-choice reg-choice--radio">
                  <input
                    type="radio"
                    name="heardFrom"
                    value={source}
                    required
                    onClick={handleRadioClick}
                    disabled={isPending}
                  />
                  <span className="reg-choice-ui"></span>
                  <span>{source}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* ── Volunteering ── */}
          <fieldset className="reg-field reg-field--full reg-fieldset">
            <legend className="reg-label">Would you be interested in volunteering or supporting future events? *</legend>
            <div className="reg-options-grid">
              {VOLUNTEER_OPTIONS.map((opt) => (
                <label key={opt} className="reg-choice reg-choice--radio">
                  <input
                    type="radio"
                    name="volunteerInterest"
                    value={opt}
                    required
                    onClick={handleRadioClick}
                    disabled={isPending}
                  />
                  <span className="reg-choice-ui"></span>
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* ── Consent ── */}
        <div className="reg-field reg-field--full" style={{ marginTop: '32px' }}>
          <label className="reg-choice reg-choice--check">
            <input
              type="checkbox"
              name="consent"
              required
              disabled={isPending}
            />
            <span className="reg-choice-ui"></span>
            <span style={{ fontSize: '15px', lineHeight: '1.5' }}>
              I agree to the <Link href="/privacy" className="success-ig-link" style={{ borderBottom: '1px solid var(--gold)', textDecoration: 'none' }}>Privacy Notice</Link> and <Link href="/terms" className="success-ig-link" style={{ borderBottom: '1px solid var(--gold)', textDecoration: 'none' }}>Terms of Use</Link> of The Meridian Society. *
            </span>
          </label>
        </div>

        {result?.error && (
          <div className="reg-feedback reg-error" role="alert">
            {result.error}
          </div>
        )}

        <div className="reg-submit-wrap">
          <button type="submit" className="reg-submit" disabled={isPending}>
            <span>{isPending ? "Registering..." : "Complete Registration"}</span>
          </button>
        </div>
      </form>
    </>
  );
}
