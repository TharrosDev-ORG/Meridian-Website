"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function Footer() {
  const [count, setCount] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(2025);

  useEffect(() => {
    const supabase = createClient();

    async function loadCount() {
      try {
        const response = await fetch("/api/stats/count");
        const data = await response.json();
        setCount(data.count || 0);
      } catch {
        console.error("[SECURITY] Stats API failed. Falling back.");
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
      clearTimeout(yearTimer);
      channel.unsubscribe().catch(console.error);
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

          <div className="footer-col" role="navigation" aria-label="Footer navigation">
            <h4 className="footer-col-h">Index</h4>
            <ul className="footer-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/social">Social</Link></li>
              <li><Link href="/membership">Membership</Link></li>
              <li><Link href="/team">Team</Link></li>
              <li><Link href="/speak">Speak</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-h">Connect</h4>
            <ul className="footer-list">
              <li>
                <a
                  href="https://www.instagram.com/Meridian.Society"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href="mailto:meridiansocietycanada@gmail.com">
                  Email Inquiries
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-live" aria-live="polite">
            <span className="footer-live-dot" aria-hidden="true"></span>
            <span className="footer-live-val">{count}</span>
            <span className="footer-live-lbl">Live Members</span>
          </div>
          <span className="footer-copy">
            © {currentYear} The Meridian Society. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
