"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface MemberCounterProps {
  className?: string;
}

export default function MemberCounter({ className }: MemberCounterProps) {
  const [count, setCount] = useState<number>(0);
  const [prevCount, setPrevCount] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle animation sequence
  useEffect(() => {
    if (count > 0 && prevCount !== count) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setPrevCount(count);
      }, 1000); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [count]);

  // Initial set
  useEffect(() => {
    if (count > 0 && prevCount === 0) setPrevCount(count);
  }, [count]);

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
      .channel("member-stats")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "site_stats",
        },
        (payload) => {
          if (payload.new && typeof payload.new.member_count === "number") {
            setCount(payload.new.member_count);
          }
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("[Realtime] Subscribed to member count updates.");
        }
      });

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
        <div className="count-num-overflow">
          <div className={`count-num-reel ${isAnimating ? "is-rolling" : ""}`}>
            <span className="count-num prev">{prevCount}</span>
            <span className="count-num next">{count}</span>
          </div>
        </div>
        <span className="count-lbl">Society Members</span>
      </div>
    </div>
  );
}
