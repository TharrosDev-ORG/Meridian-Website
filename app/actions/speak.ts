'use server';

import { z } from 'zod';
import { createServiceClient } from '@/utils/supabase/service';
import { securityDelay, redactEmail, runSecurityChecks } from '@/utils/serverActionSecurity';

// NOTE: Per-instance in-memory store — see utils/serverActionSecurity.ts for details.
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes (more restrictive than registration)
const ipRecords = new Map<string, number>();

const speakerSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required').max(120),
  email: z.string().trim().email('Invalid email address').max(254),
  roleTitle: z.string().trim().min(2, 'Current role/title is required').max(120),
  organization: z.string().trim().max(160).optional(),
  classification: z.enum(['Academic', 'Industry', 'Entrepreneur', 'Policy', 'NGO', 'Other'] as const, {
    message: 'Please select a primary classification',
  }),
  expertise: z.array(z.string()).min(1, 'Select at least one area of expertise'),
  proposedTitle: z.string().trim().min(5, 'Proposal title is too short').max(200),
  topicOverview: z.string().trim().min(30, 'Please provide a more detailed overview').max(3000),
  keyTakeaways: z.string().trim().max(1500).optional(),
  bio: z.string().trim().min(30, 'Please provide a professional bio').max(3000),
  preferredFormat: z.array(z.string()).min(1, 'Select at least one preferred format'),
  availability: z.string().trim().min(2, 'Please select an availability window').max(200),
  locationConstraints: z.string().trim().max(300).optional(),
  previousExperience: z.boolean().optional(),
  portfolioLink: z.string().max(500).optional(),
  linkedinUrl: z.string().max(500).optional(),
  socialMedia: z.string().trim().max(200).optional(),
  referralSource: z.string().trim().min(2, 'Please tell us how you heard about us').max(200),
  additionalNotes: z.string().trim().max(1500).optional(),
  // Honeypot field
  fax_number: z.string().max(200).optional(),
});

export type SpeakerApplicationData = z.infer<typeof speakerSchema>;

export async function submitSpeakerApplication(data: SpeakerApplicationData) {
  // 1. Honeypot check
  if (data.fax_number) {
    await securityDelay();
    console.warn(`[SECURITY] Speaker Honeypot triggered.`);
    return { success: false, error: 'Submission failed. (Security Code: S-HP)' };
  }

  // 2. IP-based Rate Limiting + bot detection
  const secCheck = await runSecurityChecks(ipRecords, RATE_LIMIT_WINDOW);
  if (secCheck.blocked) return secCheck.response;

  // 3. Security Delay (prevents timing attacks)
  await securityDelay();

  // Validate data
  const validated = speakerSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: validated.error.issues[0].message };
  }

  const {
    fullName, email, roleTitle, organization, classification,
    expertise, proposedTitle, topicOverview, keyTakeaways,
    bio, preferredFormat, availability, locationConstraints,
    previousExperience, portfolioLink, linkedinUrl,
    socialMedia, referralSource, additionalNotes
  } = validated.data;

  const normalizedEmail = email.toLowerCase();
  const supabaseService = createServiceClient();

  // Insert into Supabase
  const { error: insertError } = await supabaseService
    .from('speaker_applications')
    .insert([
      {
        full_name: fullName,
        email: normalizedEmail,
        role_title: roleTitle,
        organization,
        classification,
        expertise,
        proposed_title: proposedTitle,
        topic_overview: topicOverview,
        key_takeaways: keyTakeaways,
        bio,
        preferred_format: preferredFormat,
        availability,
        location_constraints: locationConstraints,
        previous_experience: !!previousExperience,
        portfolio_link: portfolioLink,
        linkedin_url: linkedinUrl,
        social_media: socialMedia,
        referral_source: referralSource,
        additional_notes: additionalNotes,
        status: 'pending'
      },
    ]);

  if (insertError) {
    console.error(`[SECURITY] Speaker application failed. Code: ${insertError.code}`);
    // Unique constraint on email — surface a clear, actionable message to the user.
    if (insertError.code === '23505') {
      return {
        success: false,
        error: 'An application already exists for this email address. Please contact us at contact@meridiansociety.ca if you need to update your submission.',
      };
    }
    return { success: false, error: 'Failed to submit application. Please try again later.' };
  }

  console.log(`[SUCCESS] New speaker application from: ${redactEmail(normalizedEmail)}`);
  return { success: true };
}

export async function checkSpeakerEmail(email: string) {
  if (!email || !email.includes('@')) {
    return { exists: false, error: 'Invalid email' };
  }

  // Security Delay to prevent rapid probing
  await securityDelay();

  const supabaseService = createServiceClient();
  const { data, error } = await supabaseService
    .from('speaker_applications')
    .select('id')
    .eq('email', email.toLowerCase())
    .maybeSingle();

  if (error) {
    console.error(`[SECURITY] Email check failed: ${error.message}`);
    return { exists: false, error: 'Connection error' };
  }

  return { exists: !!data };
}
