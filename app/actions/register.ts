'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const registrationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  school: z.string().min(2, 'School/University is required'),
  program: z.string().min(2, 'Program/Major is required'),
  interests: z.string().optional(),
  howHeard: z.string().optional(),
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

  const { fullName, email, school, program, interests, howHeard } = validated.data;

  // Insert into Supabase
  const { error } = await supabase
    .from('members')
    .insert([
      {
        full_name: fullName,
        email,
        school,
        program,
        interests,
        how_heard: howHeard,
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
