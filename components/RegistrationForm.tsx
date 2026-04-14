"use client";

import { useState, useTransition } from "react";
import { registerMember, RegistrationData } from "@/app/actions/register";

export default function RegistrationForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    const data: RegistrationData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      school: formData.get("school") as string,
      program: formData.get("program") as string,
      interests: formData.get("interests") as string,
      howHeard: formData.get("howHeard") as string,
    };

    startTransition(async () => {
      const res = await registerMember(data);
      setResult(res);
      if (res.success) {
        // Optional: Scroll to top of form or success message
      }
    });
  }

  if (result?.success) {
    return (
      <div className="success-state">
        <span className="success-icon" aria-hidden="true">◆</span>
        <h3 className="success-title">Welcome to Meridian.</h3>
        <p className="success-body">
          Your registration is complete. You are now on the list for priority updates and event invitations.
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="reg-form-container rv" data-d="3">
      <div className="reg-grid">
        <div className="reg-field">
          <label htmlFor="fullName" className="reg-label">Full Name</label>
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
          <label htmlFor="email" className="reg-label">Email Address</label>
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

        <div className="reg-field">
          <label htmlFor="school" className="reg-label">School / University</label>
          <input
            type="text"
            id="school"
            name="school"
            required
            className="reg-input"
            placeholder="e.g. Carleton University"
            disabled={isPending}
          />
        </div>

        <div className="reg-field">
          <label htmlFor="program" className="reg-label">Program / Major</label>
          <input
            type="text"
            id="program"
            name="program"
            required
            className="reg-input"
            placeholder="e.g. Architecture"
            disabled={isPending}
          />
        </div>

        <div className="reg-field reg-field--full">
          <label htmlFor="interests" className="reg-label">Interests / Focus</label>
          <input
            type="text"
            id="interests"
            name="interests"
            className="reg-input"
            placeholder="What topics excite you? (e.g. Urbanism, AI, Ethics)"
            disabled={isPending}
          />
        </div>

        <div className="reg-field reg-field--full">
          <label htmlFor="howHeard" className="reg-label">How did you hear about us?</label>
          <input
            type="text"
            id="howHeard"
            name="howHeard"
            className="reg-input"
            placeholder="Instagram, a friend, poster..."
            disabled={isPending}
          />
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
