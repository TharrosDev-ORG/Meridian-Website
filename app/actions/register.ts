'use server';

import { z } from 'zod';
import { createServiceClient } from '@/utils/supabase/service';
import { headers } from 'next/headers';

// Simple in-memory rate limit store (Note: In serverless environments, this is per-instance)
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const ipRecords = new Map<string, number>();

async function securityDelay() {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 300));
}

function redactEmail(email: string) {
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  const head = local.slice(0, 1);
  return `${head}***@${domain}`;
}

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
  acceptedTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the Privacy and Terms to register' }),
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

  // 2. IP-based Rate Limiting
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const userAgent = headerList.get('user-agent') || 'unknown';

  // Basic bot detection: check for common non-browser user agents or missing UA
  const isSuspicious = userAgent === 'unknown' || /bot|spider|crawler|curl|python|wget|postman/i.test(userAgent);
  if (isSuspicious) {
    await securityDelay();
    console.warn(`[SECURITY] Suspicious User-Agent blocked: ${userAgent} (IP: ${ip})`);
    return { success: false, error: 'Access denied. (Security Code: UA)' };
  }

  const now = Date.now();
  const lastSubmission = ipRecords.get(ip);

  if (lastSubmission && now - lastSubmission < RATE_LIMIT_WINDOW) {
    const waitTime = Math.ceil((RATE_LIMIT_WINDOW - (now - lastSubmission)) / 60000);
    return {
      success: false,
      error: `Too many attempts from this connection. Please wait ${waitTime} minute(s).`,
    };
  }

  // Record the attempt BEFORE any slow work so concurrent requests from the
  // same IP can't race past the rate-limit check.
  ipRecords.set(ip, now);

  // 3. Security Delay (Prevents timing attacks)
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
    .select('email')
    .eq('email', normalizedEmail)
    .maybeSingle();

  if (checkError) {
    // Audit: Sanitized log — no raw error object in server logs.
    console.error(`[SECURITY] Duplicate check failed. Message: ${checkError.message}`);
    return { success: false, error: 'Database connection issue.' };
  }

  if (existing) {
    // Audit: Log security-relevant duplication attempt.
    console.warn(`[SECURITY] Registration attempt for existing email blocked.`);
    return { success: false, error: 'This email is already registered.' };
  }

  // Insert into Supabase
  const { error: insertError } = await supabaseService
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
    ]);

  if (insertError) {
    // Audit: Sanitized log — preventing raw leak of table metadata.
    console.error(`[SECURITY] Member insertion failed. DB Code: ${insertError.code}`);
    if (insertError.code === '23505') {
      return { success: false, error: 'This email is already registered.' };
    }
    return { success: false, error: 'Failed to register. Please try again later.' };
  }

  console.log(`[SUCCESS] New member registered: ${redactEmail(normalizedEmail)}`);
  return { success: true };
}
