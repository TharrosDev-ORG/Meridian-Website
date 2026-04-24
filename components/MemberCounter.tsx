"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface MemberCounterProps {
  className?: string;
}

export default function MemberCounter({ className }: MemberCounterProps) {
  const [count, setCount] = useState<number>(0);

  // Trigger reveal when count becomes available
  useEffect(() => {
    if (count > 0 && typeof window !== "undefined") {
      const win = window as any;
      if (win.__observeReveal) {
        setTimeout(() => win.__observeReveal(), 100);
      }
    }
  }, [count]);

  useEffect(() => {
    const supabase = createClient();
    const controller = new AbortController();
    let cancelled = false;

    async function loadCount() {
      try {
        const response = await fetch("/api/stats/count", { signal: controller.signal });
        if (!response.ok) return;
        const data = await response.json();
        if (cancelled) return;
        if (typeof data?.count === "number") setCount(data.count);
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return;
        console.error("[MemberCounter] Stats API failed.");
      }
    }
    loadCount();

    const channel = supabase
      .channel("member_count_updates")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "site_stats",
          filter: `id=eq.meridian_global_stats`,
        },
        (payload) => {
          if (payload.new && typeof payload.new.member_count === "number") {
            setCount(payload.new.member_count);
          }
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      controller.abort();
      void supabase.removeChannel(channel);
    };
  }, []);

  if (count === 0) return null;

  return (
    <div className={className}>
      <div className="count-box">
        <span className="count-num">{count}</span>
        <span className="count-lbl">Society Members</span>
      </div>
    </div>
  );
}
