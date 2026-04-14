'use server';

import { supabaseAdmin } from '@/lib/supabase';

export async function getMemberCount(): Promise<number> {
  if (!supabaseAdmin) {
    console.error('Supabase admin client not initialized');
    return 0;
  }

  try {
    const { count, error } = await supabaseAdmin
      .from('members')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error fetching member count:', error);
      return 0;
    }

    return count || 0;
  } catch (err) {
    console.error('Unexpected error fetching count:', err);
    return 0;
  }
}
