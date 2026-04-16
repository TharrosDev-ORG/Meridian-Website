"use client";

import { useState, useTransition, useEffect } from "react";
import { registerMember, RegistrationData } from "@/app/actions/register";
import Link from "next/link";

const REG_KEY = "meridian_registered_v1";

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
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);
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
            href="https://www.instagram.com/Meridian.Society" 
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

      <form action={clientAction} className="reg-form-container">
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
          <div className="reg-field reg-field--full">
            <label className="reg-label">Your Role *</label>
            <div className="reg-options-grid">
              {ROLES.map((r) => (
                <label key={r} className="reg-choice reg-choice--radio">
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    required
                    onChange={(e) => setRole(e.target.value)}
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
                  required
                  disabled={isPending}
                />
              </div>
            )}
          </div>

          {/* ── Institution ── */}
          <div className="reg-field reg-field--full">
            <label className="reg-label">Current or Most Recent Institution (If applicable)</label>
            <div className="reg-options-grid">
              {INSTITUTIONS.map((inst) => (
                <label key={inst} className="reg-choice reg-choice--radio">
                  <input
                    type="radio"
                    name="institution"
                    value={inst}
                    required
                    onChange={(e) => setInstitution(e.target.value)}
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
                  required
                  disabled={isPending}
                />
              </div>
            )}
          </div>

          {/* ── Interests ── */}
          <div className="reg-field reg-field--full">
            <label className="reg-label">Areas of interest? (Select all that apply) *</label>
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
          </div>

          {/* ── Referral ── */}
          <div className="reg-field reg-field--full">
            <label className="reg-label">How did you hear about The Meridian Society? *</label>
            <div className="reg-options-grid">
              {HEARD_SOURCES.map((source) => (
                <label key={source} className="reg-choice reg-choice--radio">
                  <input
                    type="radio"
                    name="heardFrom"
                    value={source}
                    required
                    disabled={isPending}
                  />
                  <span className="reg-choice-ui"></span>
                  <span>{source}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ── Volunteering ── */}
          <div className="reg-field reg-field--full">
            <label className="reg-label">Would you be interested in volunteering or supporting future events? *</label>
            <div className="reg-options-grid">
              {VOLUNTEER_OPTIONS.map((opt) => (
                <label key={opt} className="reg-choice reg-choice--radio">
                  <input
                    type="radio"
                    name="volunteerInterest"
                    value={opt}
                    required
                    disabled={isPending}
                  />
                  <span className="reg-choice-ui"></span>
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
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
