'use server';

import { z } from 'zod';
import { createServiceClient } from '@/utils/supabase/service';
import { headers } from 'next/headers';

// Simple in-memory rate limit store
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes for speaker apps (more restrictive)
const ipRecords = new Map<string, number>();

async function securityDelay() {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 400));
}

function redactEmail(email: string) {
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  const head = local.slice(0, 1);
  return `${head}***@${domain}`;
}

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
  availability: z.string().trim().max(200).optional(),
  locationConstraints: z.string().trim().min(2, 'Location constraints are required').max(300),
  previousExperience: z.boolean().optional(),
  portfolioLink: z.string().max(500).optional(),
  linkedinUrl: z.string().max(500).optional(),
  socialMedia: z.string().trim().max(200).optional(),
  referralSource: z.string().trim().max(200).optional(),
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

  // 2. IP-based Rate Limiting
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const userAgent = headerList.get('user-agent') || 'unknown';

  const isSuspicious = userAgent === 'unknown' || /bot|spider|crawler|curl|python|wget|postman/i.test(userAgent);
  if (isSuspicious) {
    await securityDelay();
    return { success: false, error: 'Access denied. (Security Code: S-UA)' };
  }

  const now = Date.now();
  const lastSubmission = ipRecords.get(ip);
  if (lastSubmission && now - lastSubmission < RATE_LIMIT_WINDOW) {
    const waitTime = Math.ceil((RATE_LIMIT_WINDOW - (now - lastSubmission)) / 60000);
    return { success: false, error: `Rate limit exceeded. Please wait ${waitTime} minute(s).` };
  }
  ipRecords.set(ip, now);

  // 3. Security Delay
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
    return { success: false, error: 'Failed to submit application. Please try again later.' };
  }

  console.log(`[SUCCESS] New speaker application from: ${redactEmail(normalizedEmail)}`);
  return { success: true };
}
