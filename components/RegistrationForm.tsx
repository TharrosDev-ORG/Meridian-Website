"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerMember, RegistrationData } from "@/app/actions/register";
import Link from "next/link";

const REG_KEY = "meridian_registered_v1";

export default function RegistrationForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  // Check registration status on mount (LocalStorage + Cookies)
  useEffect(() => {
    const localReg = localStorage.getItem(REG_KEY);
    const cookieReg = document.cookie.split("; ").find((row) => row.startsWith(`${REG_KEY}=`));
    
    if (localReg === "true" || cookieReg) {
      setIsAlreadyRegistered(true);
    }
  }, []);

  // Handle auto-redirect
  useEffect(() => {
    if (isAlreadyRegistered || result?.success) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isAlreadyRegistered, result, router]);

  // Form State for dynamic fields
  const [role, setRole] = useState("");
  const [institution, setInstitution] = useState("");

  const roles = ["Student", "Alumni", "Professor / Faculty", "Professional", "Other"];
  const institutions = ["Carleton University", "University of Ottawa", "Algonquin College", "Other"];
  const interestsList = [
    "Politics", "Law", "Business", "Science", "Health Sciences", 
    "Engineering", "Creative Careers (Art, music, film etc )", 
    "Environment", "Psychology"
  ];
  const heardSources = ["Friend or Peer", "Professor", "Social Media", "Campus Event", "Current Member"];
  const volunteerOptions = ["Yes", "Maybe", "Not at this time"];

  async function clientAction(formData: FormData) {
    const selectedInterests = interestsList.filter(i => formData.get(`interest-${i}`) === "on");

    const data: RegistrationData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as any,
      roleOther: formData.get("roleOther") as string || undefined,
      institution: formData.get("institution") as any,
      institutionOther: formData.get("institutionOther") as string || undefined,
      interests: selectedInterests,
      heardFrom: formData.get("heardFrom") as any,
      volunteerInterest: formData.get("volunteerInterest") as any,
    };

    startTransition(async () => {
      const res = await registerMember(data);
      setResult(res);
      if (res.success) {
        // Set persistence
        localStorage.setItem(REG_KEY, "true");
        // Set cookie (1 year expiry)
        const expiry = new Date();
        expiry.setFullYear(expiry.getFullYear() + 1);
        document.cookie = `${REG_KEY}=true; path=/; expires=${expiry.toUTCString()}; SameSite=Lax`;
        
        setIsAlreadyRegistered(true);
      }
    });
  }

  if (isAlreadyRegistered || result?.success) {
    return (
      <div className="success-state" role="status" aria-live="polite">
        <span className="success-icon" aria-hidden="true">◆</span>
        <h3 className="success-title">Welcome to Meridian.</h3>
        <p className="success-body">
          Your registration is complete. You are now part of our community of curiosity. 
          Keep an eye on your inbox for event invitations.
        </p>
        <div style={{ marginTop: "32px" }}>
          <Link href="/" className="reg-submit" style={{ textDecoration: "none", display: "inline-block" }}>
            <span>Return Home Now</span>
          </Link>
          <p style={{ marginTop: "16px", fontSize: "14px", color: "var(--ink-30)", fontStyle: "italic" }}>
            Redirecting to home in 4 seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={clientAction} className="reg-form-container rv" data-d="3">
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
            placeholder="e.g. Julian Vane"
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
            placeholder="e.g. julian@example.com"
            disabled={isPending}
          />
        </div>

        {/* ── Role ── */}
        <div className="reg-field reg-field--full">
          <label className="reg-label">Your Role *</label>
          <div className="reg-options-grid">
            {roles.map((r) => (
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
                autoFocus
              />
            </div>
          )}
        </div>

        {/* ── Institution ── */}
        <div className="reg-field reg-field--full">
          <label className="reg-label">Current or Most Recent Institution (If applicable)</label>
          <div className="reg-options-grid">
            {institutions.map((inst) => (
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
                autoFocus
              />
            </div>
          )}
        </div>

        {/* ── Interests ── */}
        <div className="reg-field reg-field--full">
          <label className="reg-label">Areas of Interest? (select all that apply) *</label>
          <div className="reg-options-grid">
            {interestsList.map((interest) => (
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
            {heardSources.map((source) => (
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
            {volunteerOptions.map((opt) => (
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
  );
}
