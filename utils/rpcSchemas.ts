import { z } from 'zod';

/**
 * Runtime-validated shapes for Supabase RPC responses.
 * The DB returns JSONB which TypeScript types only at compile time;
 * Zod gives us a defensive boundary so a schema drift produces a clear error
 * instead of an undefined-property crash inside a UI component.
 */

export const CreateEventResultSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  event_id: z.string().uuid().optional(),
});
export type CreateEventResult = z.infer<typeof CreateEventResultSchema>;

export const PublicRegisterResultSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z
    .object({
      id: z.string().uuid(),
      token: z.string(),
      member_name: z.string(),
    })
    .optional(),
});
export type PublicRegisterResult = z.infer<typeof PublicRegisterResultSchema>;

export const SimpleResultSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
export type SimpleResult = z.infer<typeof SimpleResultSchema>;

export const IssueTicketResultSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z
    .object({
      id: z.string().uuid(),
      token: z.string(),
      member_name: z.string(),
      member_number: z.string(),
    })
    .optional(),
});
export type IssueTicketResult = z.infer<typeof IssueTicketResultSchema>;

export const ForceCheckInResultSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  already_checked_in: z.boolean().optional(),
  name: z.string().optional(),
  attendedAt: z.string().optional(),
});
export type ForceCheckInResult = z.infer<typeof ForceCheckInResultSchema>;

export const RegistrationSchema = z.object({
  id: z.string().uuid(),
  member_name: z.string(),
  member_number: z.string().nullable(),
  email: z.string(),
  attended: z.boolean(),
  created_at: z.string(),
  qr_code_token: z.string(),
  current_verified_status: z.boolean(),
});
export type RegistrationRow = z.infer<typeof RegistrationSchema>;

export const MemberRowSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string(),
  email: z.string(),
  member_number: z.string().nullable(),
  is_verified: z.boolean(),
  created_at: z.string(),
});
export type MemberRow = z.infer<typeof MemberRowSchema>;



export const CheckInResultSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  already_checked_in: z.boolean().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  memberNumber: z.string().optional(),
  memberSince: z.string().optional(),
  memberStatus: z.string().optional(),
  eventName: z.string().optional(),
  isVerified: z.boolean().optional(),
  attendedAt: z.string().optional(),
});
export type CheckInResult = z.infer<typeof CheckInResultSchema>;

/** Parse RPC payloads safely; returns the structured result or a synthetic failure. */
export function parseOrFail<T extends { success: boolean; message?: string }>(
  schema: z.ZodType<T>,
  raw: unknown,
  fallbackMessage = 'Archive returned an unexpected response.',
): T {
  const parsed = schema.safeParse(raw);
  if (parsed.success) return parsed.data;
  console.error('[RPC_SCHEMA] Unexpected payload:', parsed.error.issues);
  return { success: false, message: fallbackMessage } as T;
}
