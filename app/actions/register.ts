'use server';

import { z } from 'zod';
import { createAdminClient } from '@/utils/supabase/admin';
import { headers } from 'next/headers';

// Simple in-memory rate limit store (Note: In serverless environments, this is per-instance)
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const ipRecords = new Map<string, number>();

const registrationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['Student', 'Alumni', 'Professor / Faculty', 'Professional', 'Other'] as const, {
    message: 'Please select your role',
  }),
  roleOther: z.string().optional(),
  institution: z.enum(['Carleton University', 'University of Ottawa', 'Algonquin College', 'Other'] as const, {
    message: 'Please select an institution',
  }),
  institutionOther: z.string().optional(),
  interests: z.array(z.string()).min(1, 'Select at least one area of interest'),
  heardFrom: z.enum(['Friend or Peer', 'Professor', 'Social Media', 'Campus Event', 'Current Member'] as const, {
    message: 'Please tell us how you heard about us',
  }),
  volunteerInterest: z.enum(['Yes', 'Maybe', 'Not at this time'] as const, {
    message: 'Please select a volunteer interest level',
  }),
  // Honeypot field
  fax_number: z.string().optional(),
});

export type RegistrationData = z.infer<typeof registrationSchema>;

export async function registerMember(data: RegistrationData) {
  // 1. Honeypot check (Instant fail if filled)
  if (data.fax_number) {
    console.warn('Honeypot triggered by bot submission.');
    return { success: false, error: 'Registration failed. (Security Code: HP)' };
  }

  // 2. IP-based Rate Limiting
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const now = Date.now();
  const lastSubmission = ipRecords.get(ip);

  if (lastSubmission && now - lastSubmission < RATE_LIMIT_WINDOW) {
    const waitTime = Math.ceil((RATE_LIMIT_WINDOW - (now - lastSubmission)) / 60000);
    return { 
      success: false, 
      error: `Too many attempts from this connection. Please wait ${waitTime} minute(s).` 
    };
  }

  // 3. Security Delay (Optional: Prevents timing attacks)
  await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300));

  // Validate data
  const validated = registrationSchema.safeParse(data);
  
  if (!validated.success) {
    return { 
      success: false, 
      error: validated.error.issues[0].message 
    };
  }

  // Update IP record
  ipRecords.set(ip, now);

  const { 
    fullName, 
    email, 
    role, 
    roleOther, 
    institution, 
    institutionOther, 
    interests, 
    heardFrom, 
    volunteerInterest 
  } = validated.data;

  const normalizedEmail = email.toLowerCase().trim();

  // 4. Database Operations
  // Using admin client (Service Role) to bypass RLS for this specific server-side flow
  const supabaseAdmin = createAdminClient();

  // Explicit duplicate check (Lowercased)
  const { data: existing, error: checkError } = await supabaseAdmin
    .from('members')
    .select('email')
    .eq('email', normalizedEmail)
    .maybeSingle();

  if (checkError) {
    console.error(`[DB ERROR] Duplicate check failed for ${normalizedEmail}:`, checkError.message);
    return { success: false, error: 'Database connection issue.' };
  }

  if (existing) {
    return { success: false, error: 'This email is already registered.' };
  }

  // Insert into Supabase
  const { error: insertError } = await supabaseAdmin
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
      },
    ]);

  if (insertError) {
    console.error(`[DB ERROR] Insert failed for ${normalizedEmail}:`, insertError.message);
    if (insertError.code === '23505') {
      return { success: false, error: 'This email is already registered.' };
    }
    return { success: false, error: 'Failed to register. Please try again later.' };
  }

  console.log(`[SUCCESS] New member registered: ${fullName} (${normalizedEmail})`);
  return { success: true };
}
