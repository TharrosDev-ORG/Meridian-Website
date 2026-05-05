"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { INSTAGRAM_URL, CONTACT_MAILTO } from "@/utils/social";

export default function Footer() {
  const [_count, setCount] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(2025);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;
    let channel: ReturnType<ReturnType<typeof createClient>["channel"]> | null = null;
    let supabase: ReturnType<typeof createClient> | null = null;

    const yearTimer = setTimeout(() => {
      setCurrentYear(new Date().getFullYear());
    }, 0);

    // Defer Supabase client creation, count fetch, and realtime subscription
    // until the browser is idle. This keeps the footer off the critical path
    // on mobile, where the realtime channel is the most expensive thing here.
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | null = null;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

    const boot = async () => {
      if (cancelled) return;
      supabase = createClient();

      try {
        const response = await fetch("/api/stats/count", { signal: controller.signal });
        if (response.ok) {
          const data = await response.json();
          if (!cancelled && typeof data?.count === "number") setCount(data.count);
        }
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          console.error("[Footer] Stats API failed. Realtime channel will populate count.");
        }
      }

      if (cancelled) return;
      channel = supabase
        .channel("footer_stats_updates")
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
        .subscribe((_status: string, err?: Error) => {
          if (err) console.warn("[Footer] Realtime channel error:", err.message);
        });
    };

    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(() => { void boot(); }, { timeout: 2500 });
    } else {
      fallbackTimer = setTimeout(() => { void boot(); }, 1500);
    }

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(yearTimer);
      if (idleId !== null && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (channel && supabase) void supabase.removeChannel(channel);
    };
  }, []);

  return (
    <footer>
      <div className="wrap">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-wordmark">The Meridian Society</div>
            <div className="footer-tagline">Independent Student Organization</div>
            <div className="footer-est">Ottawa, ON · Est. 2025</div>
          </div>

          <nav className="footer-col" aria-label="Society navigation">
            <h4 className="footer-col-h">Society</h4>
            <ul className="footer-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/team">Team</Link></li>
              <li><Link href="/membership">Membership</Link></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Engage navigation">
            <h4 className="footer-col-h">Engage</h4>
            <ul className="footer-list">
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/calendar">Calendar</Link></li>
              <li><Link href="/speak">Speak</Link></li>
              <li><Link href="/social">Social</Link></li>
            </ul>
          </nav>

          <div className="footer-col">
            <h4 className="footer-col-h">Connect</h4>
            <ul className="footer-list">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href={CONTACT_MAILTO}>Email Inquiries</a>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <nav className="footer-col" aria-label="Footer legal">
            <h4 className="footer-col-h">Info</h4>
            <ul className="footer-list">
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>

            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            © {currentYear} The Meridian Society. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
