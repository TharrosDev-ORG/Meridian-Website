'use server';

import { z } from 'zod';
import { createServiceClient } from '@/utils/supabase/service';
import { securityDelay, redactEmail, runSecurityChecks } from '@/utils/serverActionSecurity';

export type MemberStatus = {
  registered: boolean;
  memberNumber?: string;
  createdAt?: string;
  fullName?: string;
};

// Lightweight per-IP throttle for the public lookup below. checkMemberStatus is
// a server action (client-callable) that returns a member's name + number for
// any email/number guess, so an unthrottled caller could enumerate membership /
// harvest PII. A short window still allows the legitimate single on-mount call.
const LOOKUP_WINDOW = 4000; // 4s between lookups per IP
const lookupRecords = new Map<string, number>();

export async function checkMemberStatus(identifier: string): Promise<MemberStatus> {
  // Bound the input and reject obviously abusive lengths before any work.
  if (typeof identifier !== 'string' || identifier.length === 0 || identifier.length > 254) {
    return { registered: false };
  }

  // Bot-UA block + per-IP throttle. On block, reveal nothing.
  const secCheck = await runSecurityChecks(lookupRecords, LOOKUP_WINDOW);
  if (secCheck.blocked) return { registered: false };

  const supabase = createServiceClient();

  // Polymorphic lookup: check if identifier is email or member number
  const isEmail = identifier.includes("@");
  const column = isEmail ? "email" : "member_number";
  const value = isEmail ? identifier.trim().toLowerCase() : identifier.trim().toUpperCase();

  const { data, error } = await supabase
    .from("members")
    .select("member_number, created_at, full_name")
    .eq(column, value)
    .maybeSingle();

  if (error) {
    console.error("[MEMBER_CHECK_ERROR]", error);
    return { registered: false };
  }

  return {
    registered: !!data,
    memberNumber: data?.member_number,
    createdAt: data?.created_at,
    fullName: data?.full_name,
  };
}

// NOTE: Per-instance in-memory store — see utils/serverActionSecurity.ts for details.
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const ipRecords = new Map<string, number>();

const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(120, 'Full name is too long'),
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .max(254, 'Email is too long'),
  role: z.enum(['Student', 'Alumni', 'Professor / Faculty', 'Professional', 'Other'] as const, {
    message: 'Please select your role',
  }),
  roleOther: z.string().trim().max(120, 'Role description is too long').optional(),
  institution: z.enum(['Carleton University', 'University of Ottawa', 'Algonquin College', 'Other'] as const, {
    message: 'Please select an institution',
  }),
  institutionOther: z.string().trim().max(160, 'Institution name is too long').optional(),
  interests: z
    .array(z.string().max(80))
    .min(1, 'Select at least one area of interest')
    .max(20, 'Too many interests selected'),
  heardFrom: z.enum(['Friend or Peer', 'Professor', 'Social Media', 'Campus Event', 'Current Member'] as const, {
    message: 'Please tell us how you heard about us',
  }),
  volunteerInterest: z.enum(['Yes', 'Maybe', 'Not at this time'] as const, {
    message: 'Please select a volunteer interest level',
  }),
  acceptedTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Privacy and Terms to register',
  }),
  // Honeypot field
  fax_number: z.string().max(200).optional(),
});

export type RegistrationData = z.infer<typeof registrationSchema>;

export async function registerMember(data: RegistrationData) {
  // 1. Honeypot check (apply the same timing delay as the success path so the
  //    fail-fast branch doesn't reveal that the honeypot fired).
  if (data.fax_number) {
    await securityDelay();
    console.warn(`[SECURITY] Honeypot triggered by submission.`);
    return { success: false, error: 'Registration failed. (Security Code: HP)' };
  }

  // 2. IP-based Rate Limiting + bot detection
  const secCheck = await runSecurityChecks(ipRecords, RATE_LIMIT_WINDOW);
  if (secCheck.blocked) return secCheck.response;

  // 3. Security Delay (prevents timing attacks)
  await securityDelay();

  // Validate data
  const validated = registrationSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues[0].message,
    };
  }

  const {
    fullName,
    email,
    role,
    roleOther,
    institution,
    institutionOther,
    interests,
    heardFrom,
    volunteerInterest,
    acceptedTerms,
  } = validated.data;

  const normalizedEmail = email.toLowerCase();

  // 4. Database Operations
  // Using service client (Service Role) to bypass RLS for this specific server-side flow
  const supabaseService = createServiceClient();

  // Explicit duplicate check (Lowercased)
  const { data: existing, error: checkError } = await supabaseService
    .from('members')
    .select('email, member_number, created_at, full_name')
    .eq('email', normalizedEmail)
    .maybeSingle();

  if (checkError) {
    // Audit: Sanitized log — no raw error object in server logs.
    console.error(`[SECURITY] Duplicate check failed. Message: ${checkError.message}`);
    return { success: false, error: 'Database connection issue.' };
  }

  if (existing) {
    // Audit: Log security-relevant duplication attempt.
    // Instead of erroring, we allow the frontend to treat this as a success path
    // so the user is "redirected" to the completion state.
    console.warn(`[SECURITY] Registration attempt for existing email — Redirecting to completion.`);
    return { 
      success: true, 
      alreadyRegistered: true, 
      memberNumber: existing.member_number,
      createdAt: existing.created_at,
      fullName: existing.full_name
    };
  }

  // Insert into Supabase
  const { data: inserted, error: insertError } = await supabaseService
    .from('members')
    .insert([
      {
        full_name: fullName,
        email: normalizedEmail,
        role,
        role_other: roleOther,
        institution,
        institution_other: institutionOther,
        interests,
        heard_from: heardFrom,
        volunteer_interest: volunteerInterest,
        accepted_terms: acceptedTerms,
      },
    ])
    .select('member_number, created_at, full_name')
    .single();

  if (insertError) {
    // Audit: Sanitized log — preventing raw leak of table metadata.
    console.error(`[SECURITY] Member insertion failed. DB Code: ${insertError.code}`);
    if (insertError.code === '23505') {
      return { success: true, alreadyRegistered: true };
    }
    return { success: false, error: 'Failed to register. Please try again later.' };
  }

  console.log(`[SUCCESS] New member registered: ${redactEmail(normalizedEmail)}`);
  return { 
    success: true, 
    memberNumber: inserted?.member_number,
    createdAt: inserted?.created_at,
    fullName: inserted?.full_name
  };
}
