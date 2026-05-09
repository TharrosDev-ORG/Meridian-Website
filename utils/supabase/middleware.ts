import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "./database.types";

// Detection: auth-related Supabase cookies start with "sb-" and end with
// "-auth-token" (or its chunked variants). Only when one is present do we
// pay the round-trip to refresh the session. Public pages — which are 100%
// of this site today — short-circuit and skip the Supabase call entirely.
const SB_AUTH_COOKIE = /^sb-.*-auth-token(\.\d+)?$/;

export const createClient = async (request: NextRequest) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase public environment variables");
  }

  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => SB_AUTH_COOKIE.test(c.name));
  if (!hasAuthCookie) {
    return supabaseResponse;
  }

  const supabase = createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set({ name, value, ...options })
          )
        },
      },
    },
  );

  await supabase.auth.getUser();

  return supabaseResponse;
};
