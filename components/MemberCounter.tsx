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
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mounted Guard
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle animation sequence (only for subsequent updates)
  useEffect(() => {
    if (count > 0 && prevCount !== 0 && prevCount !== count) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setPrevCount(count);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count, prevCount]);

  // Trigger reveal when count becomes available or component mounts
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      const win = window as unknown as { __observeReveal?: () => void };
      if (win.__observeReveal) {
        const t = setTimeout(() => win.__observeReveal?.(), 100);
        return () => clearTimeout(t);
      }
    }
  }, [count, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const supabase = createClient();
    const controller = new AbortController();
    let cancelled = false;

    async function loadCount() {
      try {
        const response = await fetch("/api/stats/count", { signal: controller.signal });
        if (!response.ok) {
          setIsLoading(false);
          return;
        }
        const data = await response.json();
        if (cancelled) return;
        if (typeof data?.count === "number") {
          const c = Math.max(0, data.count);
          setCount(c);
          setPrevCount(c);
        }
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return;
        console.error("[MemberCounter] Stats API failed.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    loadCount();

    const channel = supabase
      .channel("member-stats-global")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "site_stats",
        },
        (payload) => {
          if (payload.new && payload.new.member_count !== undefined) {
            const newCount = Number(payload.new.member_count);
            if (!isNaN(newCount)) {
              setCount(Math.max(0, newCount));
            }
          }
        }
      )
      .subscribe((status, err) => {
        if (status === "SUBSCRIBED") {
          console.log("[Realtime] Connected to Member Registry.");
        }
        if (status === "CHANNEL_ERROR") {
          console.error("[Realtime] Connection failed:", err);
        }
      });

    return () => {
      cancelled = true;
      controller.abort();
      void supabase.removeChannel(channel);
    };
  }, [mounted]);

  // Always render the container to reserve space and allow reveal observer to register it.
  const showShimmer = !mounted || isLoading;

  return (
    <div className={className}>
      <div className="count-box">
        {showShimmer ? (
          <div className="count-num-overflow">
            <div className="member-count-shimmer" style={{ width: "60px", height: "34px", borderRadius: "4px" }} />
          </div>
        ) : (
          <div className="count-num-overflow">
            <div className={`count-num-reel ${isAnimating ? "is-rolling" : ""}`}>
              <span className="count-num prev">{prevCount}</span>
              <span className="count-num next">{count}</span>
            </div>
          </div>
        )}
        <span className="count-lbl">Society Members</span>
      </div>
    </div>
  );
}
