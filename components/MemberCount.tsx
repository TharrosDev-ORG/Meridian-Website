"use client";

import { useEffect, useState } from "react";
import { getMemberCount } from "@/app/actions/getMemberCount";
import { supabase } from "@/lib/supabase";

export default function MemberCount() {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Initial Load
    async function loadCount() {
      const initialCount = await getMemberCount();
      setCount(initialCount);
      setIsLoading(false);
    }
    loadCount();

    // 2. Real-time Subscription
    // Listens for NEW rows in the members table to increment the count live
    const channel = supabase
      .channel('member-updates')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'members' },
        () => {
          setCount(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
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
