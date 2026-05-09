import { createClient } from "@supabase/supabase-js";
// Database types are available from "./database.types" for opt-in typing
// at individual call sites.

/**
 * Service client using the SUPABASE_SERVICE_ROLE_KEY.
 * This client bypasses Row Level Security (RLS) and is intended for 
 * privileged backend operations like registration and status updates.
 * 
 * IMPORTANT: This client should ONLY be used in Server Actions,
 * API routes, or other server-side contexts. NEVER expose the
 * service role key to the client.
 */
export const createServiceClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Missing Supabase service role environment variables");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
