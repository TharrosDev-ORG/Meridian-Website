import { createClient } from "@supabase/supabase-js";

/**
 * Admin client using the SUPABASE_SERVICE_ROLE_KEY.
 * This client bypasses Row Level Security (RLS).
 * 
 * IMPORTANT: This client should ONLY be used in Server Actions,
 * API routes, or other server-side contexts. NEVER expose the
 * service role key to the client.
 */
export const createAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Missing Supabase admin environment variables");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
