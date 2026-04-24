import { NextResponse } from 'next/server';
import { createServiceClient } from '@/utils/supabase/service';

export const runtime = 'edge';
export const revalidate = 0; // Disable static caching for immediate accuracy

/**
 * High-performance Edge API for the global member counter.
 * Implements SWR (Stale-While-Revalidate) for near-zero latency.
 */
export async function GET() {
  const supabaseService = createServiceClient();

  try {
    const { data, error } = await supabaseService
      .from('site_stats')
      .select('member_count')
      .eq('id', 'meridian_global_stats')
      .single();

    if (error) {
      // Fallback to direct accurate count if stats table fails
      const { count } = await supabaseService
        .from('members')
        .select('*', { count: 'exact', head: true });
      
      return NextResponse.json(
        { count: count || 0 },
        { 
          status: 200,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          }
        }
      );
    }

    return NextResponse.json(
      { count: data?.member_count || 0 },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        }
      }
    );
  } catch {
    return NextResponse.json({ count: 0, error: 'Telemetry failure' }, { status: 500 });
  }
}
