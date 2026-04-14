'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase';

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
});

export type RegistrationData = z.infer<typeof registrationSchema>;

export async function registerMember(data: RegistrationData) {
  // Validate data
  const validated = registrationSchema.safeParse(data);
  
  if (!validated.success) {
    return { 
      success: false, 
      error: validated.error.issues[0].message 
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
    volunteerInterest 
  } = validated.data;

  // Insert into Supabase
  const { error } = await supabase
    .from('members')
    .insert([
      {
        full_name: fullName,
        email,
        role,
        role_other: roleOther,
        institution,
        institution_other: institutionOther,
        interests,
        heard_from: heardFrom,
        volunteer_interest: volunteerInterest,
      },
    ]);

  if (error) {
    console.error('Registration error:', error);
    if (error.code === '23505') {
      return { success: false, error: 'This email is already registered.' };
    }
    return { success: false, error: 'Failed to register. Please try again later.' };
  }

  return { success: true };
}
