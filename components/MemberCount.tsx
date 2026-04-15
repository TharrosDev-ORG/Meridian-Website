"use client";

import { useEffect, useState } from "react";
import { getMemberCount } from "@/app/actions/getMemberCount";
import { createClient } from "@/utils/supabase/client";

export default function MemberCount() {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // 1. Initial Load
    async function loadCount() {
      const initialCount = await getMemberCount();
      setCount(initialCount);
      setIsLoading(false);
    }
    loadCount();

    // 2. Real-time Subscription
    // Listens for CHANGES to the site_stats table to update the count live
    const channel = supabase
      .channel('site_stats_updates')
      .on(
        'postgres_changes',
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'site_stats',
          filter: `id=eq.meridian_global_stats`
        },
        (payload) => {
          if (payload.new && typeof payload.new.member_count === 'number') {
            setCount(payload.new.member_count);
          }
        }
      )
      .subscribe();

    return () => {
      // Clean up the subscription specifically
      channel.unsubscribe().catch(console.error);
    };
  }, []);

  return (
    <div
      className="member-count-box rv"
      data-d="1"
      id="memberCountBox"
      aria-live="polite"
    >
      <span className="member-count-num" id="memberCountNum">
        {isLoading ? <span className="member-count-shimmer" aria-hidden="true" /> : count}
      </span>
      <span className="member-count-lbl">Members Registered</span>
    </div>
  );
}
