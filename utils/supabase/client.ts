import { createBrowserClient } from "@supabase/ssr";
import { type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

let client: SupabaseClient<Database> | undefined;

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase public environment variables");
  }

  const isBrowser = typeof window !== "undefined";

  if (!isBrowser) {
    // Return a Proxy that throws on any access to prevent accidental SSR leaks
    return new Proxy({} as SupabaseClient<Database>, {
      get() {
        throw new Error(
          "Supabase browser client accessed on server. Use createServiceClient or createMiddlewareClient instead."
        );
      },
    });
  }

  if (!client) {
    client = createBrowserClient<Database>(supabaseUrl, supabaseKey);
  }

  return client;
};
