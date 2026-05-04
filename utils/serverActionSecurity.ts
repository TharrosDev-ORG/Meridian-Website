'use server';

import { headers } from 'next/headers';

// NOTE: In-memory rate limiting is per-serverless-instance. On Vercel this means
// the same IP can hit different instances and bypass the limit. A database-backed
// rate limiter (e.g. a Supabase table with timestamps) would be globally consistent.
// This in-memory guard is a best-effort protection that works well for single-instance
// deployments and provides defence-in-depth alongside the honeypot + bot UA checks.

export type SecurityCheckResult =
  | { blocked: false; ip: string }
  | { blocked: true; response: { success: false; error: string } };

export async function securityDelay(minMs = 300, maxMs = 800) {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * (maxMs - minMs) + minMs)
  );
}

export function redactEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  return `${local.slice(0, 1)}***@${domain}`;
}

export async function runSecurityChecks(
  ipRecords: Map<string, number>,
  rateLimitWindow: number
): Promise<SecurityCheckResult> {
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  const userAgent = headerList.get('user-agent') || 'unknown';

  const isSuspicious =
    userAgent === 'unknown' ||
    /bot|spider|crawler|curl|python|wget|postman/i.test(userAgent);

  if (isSuspicious) {
    await securityDelay();
    return {
      blocked: true,
      response: { success: false, error: 'Access denied. (Security Code: UA)' },
    };
  }

  const now = Date.now();
  const lastSubmission = ipRecords.get(ip);
  if (lastSubmission && now - lastSubmission < rateLimitWindow) {
    const waitTime = Math.ceil((rateLimitWindow - (now - lastSubmission)) / 60000);
    return {
      blocked: true,
      response: {
        success: false,
        error: `Too many attempts from this connection. Please wait ${waitTime} minute(s).`,
      },
    };
  }

  // Record attempt before slow work so concurrent requests from the same IP
  // cannot race past the rate-limit check.
  ipRecords.set(ip, now);

  return { blocked: false, ip };
}
