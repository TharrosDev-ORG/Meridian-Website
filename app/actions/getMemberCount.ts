'use server';

import { createServiceClient } from '@/utils/supabase/service';

export async function getMemberCount(): Promise<number> {
  const supabaseService = createServiceClient();

  try {
    const { data, error } = await supabaseService
      .from('site_stats')
      .select('member_count')
      .eq('id', 'meridian_global_stats')
      .single();

    if (error) {
      // Audit: Sanitized log — removing raw error object.
      console.error(`[SECURITY] Stats fetch failed. Using head-count fallback.`);
      // Fallback to direct count if site_stats fails
      const { count } = await supabaseService
        .from('members')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    }

    return data?.member_count || 0;
  } catch (_err) {
    // Audit: Sanitized exception trail.
    console.error('[SECURITY] Unexpected telemetry failure.');
    return 0;
  }
}
