"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { INSTAGRAM_URL, CONTACT_MAILTO } from "@/utils/social";

export default function Footer() {
  const [count, setCount] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(2025);

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
        console.error("[Footer] Stats API failed. Realtime channel will populate count.");
      }
    }
    loadCount();

    const yearTimer = setTimeout(() => {
      setCurrentYear(new Date().getFullYear());
    }, 0);

    const channel = supabase
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
      .subscribe();

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(yearTimer);
      // Best-effort cleanup; failures here are expected during hot-reload teardown.
      void supabase.removeChannel(channel);
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

          <nav className="footer-col" aria-label="Footer navigation">
            <h4 className="footer-col-h">Index</h4>
            <ul className="footer-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/calendar">Calendar</Link></li>
              <li><Link href="/social">Social</Link></li>
              <li><Link href="/membership">Membership</Link></li>
              <li><Link href="/team">Team</Link></li>
              <li><Link href="/speak">Speak</Link></li>
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
