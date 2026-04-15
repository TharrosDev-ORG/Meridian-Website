"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMemberCount } from "@/app/actions/getMemberCount";
import { createClient } from "@/utils/supabase/client";

export default function Footer() {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState("");

  useEffect(() => {
    // 1. Clock Logic (Ottawa Time)
    const updateTime = () => {
      const ottawaTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Toronto",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(ottawaTime);
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    // 2. Member Count Logic
    const supabase = createClient();
    async function loadCount() {
      const initialCount = await getMemberCount();
      setCount(initialCount);
      setIsLoading(false);
    }
    loadCount();

    const channel = supabase
      .channel('footer_stats_updates')
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
      clearInterval(clockInterval);
      channel.unsubscribe().catch(console.error);
    };
  }, []);

  return (
    <footer>
      <span className="footer-ghost" aria-hidden="true">MERIDIAN</span>
      <div className="wrap">
        <div className="footer-grid">
          
          {/* Column 1: Brand & Time */}
          <div className="footer-brand">
            <div className="footer-wordmark">The Meridian Society</div>
            <div className="footer-tagline">Independent Student Organization</div>
            <div className="footer-time">
              <span className="time-dot"></span>
              Ottawa, CA — {time || "--:--:--"}
            </div>
          </div>

          {/* Column 2: Index */}
          <div className="footer-nav-col">
            <h4 className="footer-col-h">Index</h4>
            <div className="footer-nav-list">
              <Link href="/">Home</Link>
              <Link href="/events">Events</Link>
              <Link href="/social">Social</Link>
              <Link href="/membership">Membership</Link>
              <Link href="/team">Team</Link>
              <Link href="/speak">Speak</Link>
            </div>
          </div>

          {/* Column 3: Connect */}
          <div className="footer-connect-col">
            <h4 className="footer-col-h">Connect</h4>
            <div className="footer-social-list">
              <a href="https://www.instagram.com/Meridian.Society" target="_blank" rel="noopener noreferrer" className="footer-social-link">Instagram</a>
              <a href="mailto:meridiansocietycanada@gmail.com" className="footer-social-link">Email Inquiries</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">LinkedIn</a>
            </div>
          </div>

          {/* Column 4: Stats */}
          <div className="footer-stats-wrap">
            <div className="footer-stat-item">
              <span className="footer-stat-val">
                {isLoading ? <span className="member-count-shimmer" style={{height:'32px', width:'48px'}} /> : count}
              </span>
              <span className="footer-stat-lbl">Live Member Count</span>
            </div>
            <div className="footer-status">
              <div className="status-pulse"></div>
              <span>Status: Active Registration</span>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            © {new Date().getFullYear()} The Meridian Society. All Rights Reserved.
          </span>
          <div className="footer-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
