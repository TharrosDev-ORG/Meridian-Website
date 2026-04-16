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
      console.error('Error fetching member count from site_stats:', error);
      // Fallback to direct count if site_stats fails
      const { count } = await supabaseService
        .from('members')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    }

    return data?.member_count || 0;
  } catch (err) {
    console.error('Unexpected error fetching count:', err);
    return 0;
  }
}
