"use client";

import { useState, useTransition, useEffect } from "react";
import { registerMember, RegistrationData, checkMemberStatus } from "@/app/actions/register";
import Link from "next/link";
import { INSTAGRAM_URL } from "@/utils/social";

const REG_KEY = "meridian_registered_v1";
const NUM_KEY = "meridian_member_number_v1";
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
  const [result, setResult] = useState<{ success?: boolean; error?: string; alreadyRegistered?: boolean; memberNumber?: string } | null>(null);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [memberNumber, setMemberNumber] = useState<string>("");
  const [memberCount, setMemberCount] = useState<number>(0);
  const [displayCount, setDisplayCount] = useState<number>(0);
  const [role, setRole] = useState("");
  const [institution, setInstitution] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [lookupError, setLookupError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  // Fetch count for the registry display
  useEffect(() => {
    async function loadInitialCount() {
      try {
        const res = await fetch("/api/stats/count");
        if (res.ok) {
          const data = await res.json();
          if (typeof data.count === "number") {
            setMemberCount(data.count);
            setDisplayCount(data.count);
          }
        }
      } catch (e) {}
    }
    loadInitialCount();
  }, []);

  // Animate count on success and trigger reveal
  useEffect(() => {
    if (result?.success && !result.alreadyRegistered && !isAlreadyRegistered) {
      // Small delay before starting the "joining" animation
      const timer = setTimeout(() => {
        setDisplayCount(prev => prev + 1);
        
        // Trigger animations for dynamically rendered success content
        const win = window as any;
        if (win.__observeReveal) win.__observeReveal();
        
        // Fallback: manually add 'on' class to success container
        const successEl = document.querySelector('.success-overhaul');
        if (successEl) successEl.classList.add('reveal', 'on');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [result, isAlreadyRegistered]);

  // Check registration status on mount
  useEffect(() => {
    const checkRegistration = () => {
      const localReg = localStorage.getItem(REG_KEY);
      const cookieReg = document.cookie.split("; ").find((row) => row.startsWith(`${REG_KEY}=`));
      
      if (localReg === "true" || !!cookieReg) {
        setIsAlreadyRegistered(true);
        const localNum = localStorage.getItem(NUM_KEY);
        if (localNum) setMemberNumber(localNum);
      }
      setMounted(true);
    };

    // Small delay to ensure browser environment is ready
    const timer = setTimeout(checkRegistration, 0);
    return () => clearTimeout(timer);
  }, []);

  // Load draft on mount (Initial Load)
  useEffect(() => {
    if (!mounted) return;
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        requestAnimationFrame(() => {
          if (data.role) setRole(data.role);
          if (data.institution) setInstitution(data.institution);
        });
      } catch (e) {
        console.error("Failed to load initial draft", e);
      }
    }
  }, [mounted]);

  // Load draft on mount (DOM Population)
  useEffect(() => {
    if (!mounted) return;
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const form = document.querySelector(".reg-form-container") as HTMLFormElement;
        if (form) {
          Object.entries(data).forEach(([name, value]) => {
            const input = form.elements.namedItem(name);
            if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement || input instanceof HTMLSelectElement) {
              if (input.type === "checkbox" || input.type === "radio") {
                const group = form.querySelectorAll(`[name="${name}"]`);
                group.forEach((el) => {
                  const inputEl = el as HTMLInputElement;
                  if (inputEl.value === value) inputEl.checked = true;
                  if (name.startsWith("interest-") && value === "on") inputEl.checked = true;
                });
              } else {
                input.value = value as string;
              }
            }
          });
        }
      } catch (e) {
        console.error("Failed to sync draft to DOM", e);
      }
    }
  }, [mounted]);

  // Save draft on change
  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fd.forEach((value, key) => {
      if (typeof value === "string" && key !== "fax_number") data[key] = value;
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
      group.forEach((el) => {
        (el as HTMLInputElement).dataset.checked = "false";
      });
      input.dataset.checked = "true";
    }
  };

  const handleEmailCheck = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setLookupError("Please enter a valid email address.");
      return;
    }

    setLookupError("");
    setIsCheckingEmail(true);
    try {
      const status = await checkMemberStatus(email);
      if (status.registered) {
        setIsAlreadyRegistered(true);
        if (status.memberNumber) {
          setMemberNumber(status.memberNumber);
          localStorage.setItem(NUM_KEY, status.memberNumber);
          localStorage.setItem(REG_KEY, "true");
        }
      } else {
        setEmailChecked(true);
      }
    } catch (err) {
      console.error("Email check failed", err);
      setLookupError("The registry is temporarily unreachable. Please try again.");
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    // Reset lookup state if they start editing again after a fail/check
    if (emailChecked) setEmailChecked(false);
    if (lookupError) setLookupError("");
  };

  const downloadMemberCard = async () => {
    setIsDownloading(true);
    // Ensure fonts are ready before drawing
    if (document.fonts) {
      await document.fonts.load('italic 48px Cormorant Garamond');
      await document.fonts.load('700 140px Cormorant Garamond');
    }
    
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 750;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Background (Cream)
    ctx.fillStyle = "#fffcf5"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Border System
    // Outer Ink Border
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Inner Gold Frame
    ctx.strokeStyle = "#c5a059";
    ctx.lineWidth = 1;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    // 3. Typography Setup
    ctx.fillStyle = "#1a1a1a";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const serifStack = "'Cormorant Garamond', 'Georgia', serif";
    const sansStack = "'Barlow Condensed', 'Helvetica', sans-serif";

    // Header: The Society Title
    ctx.font = `italic 48px ${serifStack}`;
    ctx.fillText("The Meridian Society", canvas.width / 2, 180);

    // Subheader: Registry Label
    ctx.font = `700 20px ${sansStack}`;
    const label = "OFFICIAL MEMBER NUMBER";
    ctx.fillText(label, canvas.width / 2, 240);

    // 4. Central Identity: Member Number
    // Decorative lines around number
    ctx.strokeStyle = "rgba(26,26,26,0.1)";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 150, 350);
    ctx.lineTo(canvas.width / 2 + 150, 350);
    ctx.stroke();

    ctx.font = `700 140px serif`;
    ctx.fillText(memberNumber || "M26-XXXX", canvas.width / 2, 460);

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 150, 570);
    ctx.lineTo(canvas.width / 2 + 150, 570);
    ctx.stroke();

    // 5. Footer Metadata
    ctx.fillStyle = "rgba(26,26,26,0.5)";
    ctx.font = `500 16px ${sansStack}`;
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase();
    ctx.fillText(`REGISTERED ${today}`, canvas.width / 2, 640);
    
    ctx.font = `italic 14px ${serifStack}`;
    ctx.fillText("A dialogue built on shared curiosity.", canvas.width / 2, 675);

    // 6. Trigger Robust Download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `Meridian_Member_Card_${memberNumber || 'Society'}.png`;
      link.href = url;
      // Append to body is required for some mobile browsers
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Clean up memory
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      // Reset state after a brief success message
      setTimeout(() => setIsDownloading(false), 2000);
    }, "image/png");
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
        if (res.memberNumber) {
          setMemberNumber(res.memberNumber);
          localStorage.setItem(NUM_KEY, res.memberNumber);
        }
        localStorage.removeItem(DRAFT_KEY);
      }
    });
  }

  if (!mounted) {
    return (
      <div className="reg-form-container" style={{ textAlign: 'center', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(244, 237, 227, 0.4)' }}>
        <div className="skeleton-loader rv-stagger-item" style={{ opacity: 0.2 }}>
          <h1 className="register-title" style={{ fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.02em', margin: 0 }}>
            Initializing <em>Registry...</em>
          </h1>
        </div>
      </div>
    );
  }

  if ((isAlreadyRegistered && memberNumber) || result?.success) {
    return (
      <div className="success-overhaul reveal on" role="status" aria-live="polite">
        <div className="success-header">
          <div className="success-eyebrow rv-stagger-item">Registration Confirmed</div>
          <h1 className="success-title rv-stagger-item">
            Welcome to the <em>Society.</em>
          </h1>
          <div className="success-rule rv-stagger-item"></div>
        </div>

        <div className="success-registry rv-stagger-item" data-d="1">
          <div className="registry-box">
            <div className="registry-label">Official Member Number</div>
            <div className="registry-id">
              <span className="registry-prefix">MEMBER NO.</span>
              <span className="registry-val">
                {memberNumber || "---"}
              </span>
            </div>
            <div className="registry-status">
              <span className="status-dot"></span>
              <span className="status-text">Active Member Status</span>
            </div>
            <p className="registry-disclaimer">
              This is your official Society ID. Please keep it private and save it for future event check-ins.
            </p>
            <button 
              onClick={downloadMemberCard}
              disabled={isDownloading}
              className="action-btn"
              style={{ 
                marginTop: '24px', 
                background: isDownloading ? '#2d8a4e' : 'var(--ink)', 
                color: 'var(--cream)',
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isDownloading ? 'scale(0.98)' : 'scale(1)',
                opacity: isDownloading ? 0.9 : 1
              }}
            >
              <span>{isDownloading ? "Download Started" : "Download Member Card"}</span>
            </button>
          </div>
        </div>

        <p className="success-lead rv-stagger-item" data-d="2">
          Your presence in the dialogue is now official. The Meridian Society is built on the shared curiosity of its members.
        </p>

        <div className="success-actions-grid">
          <div className="action-card rv-stagger-item" data-d="3">
            <div className="action-num">01</div>
            <h4 className="action-h">Follow the Dialogue</h4>
            <p className="action-p">Join our community on Instagram for event highlights and updates.</p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="action-btn">
              <span>Instagram</span>
            </a>
          </div>

          <div className="action-card rv-stagger-item" data-d="4">
            <div className="action-num">02</div>
            <h4 className="action-h">Nominate a Speaker</h4>
            <p className="action-p">Help shape our future events by nominating speakers or professionals you&apos;d like to hear from.</p>
            <Link href="/speak" className="action-btn">
              <span>Nominate</span>
            </Link>
          </div>

          <div className="action-card rv-stagger-item" data-d="5">
            <div className="action-num">03</div>
            <h4 className="action-h">Meet the Team</h4>
            <p className="action-p">Learn about the student team behind the society.</p>
            <Link href="/team" className="action-btn">
              <span>About Us</span>
            </Link>
          </div>
        </div>

        <div className="success-footer rv-stagger-item" data-d="6">
          <Link href="/" className="success-home-link">
            <span>Return to Home Index</span>
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
          {/* ── Email Field (Always visible phase 1) ── */}
          <div className={`reg-field ${!emailChecked ? 'reg-field--full' : ''}`}>
            <label htmlFor="email" className="reg-label">Email Address *</label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="reg-input"
                style={{ flex: 1 }}
                placeholder="e.g. john.smith@example.com"
                disabled={isPending || isCheckingEmail || emailChecked}
                value={email}
                onChange={handleEmailChange}
              />
              {!emailChecked && (
                <button 
                  onClick={handleEmailCheck}
                  disabled={isCheckingEmail || !email || !email.includes('@')}
                  className="reg-submit"
                  style={{ 
                    padding: '12px 32px', 
                    marginTop: 0, 
                    fontSize: '10px',
                    height: '46px'
                  }}
                >
                  <span>{isCheckingEmail ? "Checking..." : "Apply"}</span>
                </button>
              )}
            </div>
            {lookupError && (
              <div className="reg-feedback reg-error" style={{ marginTop: '8px', fontSize: '12px' }}>
                {lookupError}
              </div>
            )}
          </div>

          {emailChecked && (
            <>
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

              {/* Honeypot field */}
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
                <legend className="reg-label">Current or Most Recent Institution</legend>
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
                <legend className="reg-label">Areas of interest? *</legend>
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
                <legend className="reg-label">How did you hear about us? *</legend>
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
                <legend className="reg-label">Interested in volunteering? *</legend>
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
            </>
          )}
        </div>

        {emailChecked && (
          <>
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
                <span>{isPending ? "Recording Entry..." : "Complete Registration"}</span>
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
}
