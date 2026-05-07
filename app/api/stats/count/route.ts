import { NextResponse } from 'next/server';
import { createServiceClient } from '@/utils/supabase/service';

export const runtime = 'edge';

// Edge bootstrap value for the homepage MemberCounter. Live updates flow
// through Supabase Realtime on the channel `member-stats-global`, so the
// only requirement here is fast initial paint. We cache aggressively at
// the CDN: edge serves a stale value instantly while a background refresh
// fetches the fresh count, with the browser revalidating every 10s.
const SWR_HEADER = 's-maxage=10, stale-while-revalidate=60';

export async function GET() {
  const supabaseService = createServiceClient();

  try {
    const { data, error } = await supabaseService
      .from('site_stats')
      .select('member_count')
      .eq('id', 'meridian_global_stats')
      .single();

    if (error) {
      const { count } = await supabaseService
        .from('members')
        .select('*', { count: 'exact', head: true });

      return NextResponse.json(
        { count: count || 0 },
        { status: 200, headers: { 'Cache-Control': SWR_HEADER } }
      );
    }

    return NextResponse.json(
      { count: data?.member_count || 0 },
      { status: 200, headers: { 'Cache-Control': SWR_HEADER } }
    );
  } catch {
    return NextResponse.json({ count: 0, error: 'Telemetry failure' }, { status: 500 });
  }
}
