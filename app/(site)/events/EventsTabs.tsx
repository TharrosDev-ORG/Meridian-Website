"use client";

import { useEffect, useState } from "react";

type TabKey = "forum" | "social";

const FORUM_PILLARS = [
  { num: "01", h: "Dialogue Over Noise", p: "Small, curated audiences ensure every student has the chance to ask questions and engage directly with the speaker." },
  { num: "02", h: "Vetted Insight", p: "Our speakers share honest perspectives, practical advice, and knowledge drawn from experience." },
  { num: "03", h: "Beyond the Classroom", p: "Bridge the gap between theory and practice by exploring how ideas are applied in real-world contexts." },
];

const FORUM_FORMAT: ReadonlyArray<[string, string]> = [
  ["Length", "30–45 minute presentation"],
  ["Format", "Followed by a Q&A"],
  ["Audience", "20–30 students"],
  ["Who Attends", "Society Members"],
  ["Location", "Ottawa, Canada"],
  ["Fields", "Policy, academia, entrepreneurship, law, business, politics, and beyond"],
];

const GATHERINGS = [
  { type: "Themed Gatherings", h: "Bar Nights & Lounges", p: "High-impact social environments where students socialize and expand their circles." },
  { type: "Small Format", h: "Coffee & Conversation", p: "Low-pressure meetups designed for smaller groups. Perfect for deeper dialogue and getting to know the community." },
  { type: "Impact Driven", h: "Fundraisers & Galas", p: "Specialized events dedicated to raising support for society missions while bringing the community together for a cause." },
  { type: "Academic Plus", h: "Social Mixers", p: "Post-Speaker Forum gatherings where students and guest speakers continue the conversation in a casual setting." },
];

export default function EventsTabs() {
  const [tab, setTab] = useState<TabKey>("forum");

  // Deep-link support: /events#social or /events#forum switches the tab and
  // scrolls the user to the tab section (the hidden tab panels themselves are
  // not valid scroll targets). setState is deferred via setTimeout per the
  // project's set-state-in-effect rule.
  useEffect(() => {
    const sync = () => {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      const next: TabKey | null =
        hash === "#social" ? "social" :
        hash === "#forum" ? "forum" : null;
      if (!next) return;
      setTimeout(() => setTab(next), 0);
      setTimeout(() => {
        document.getElementById("programs")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const select = (next: TabKey) => {
    setTab(next);
    if (typeof window !== "undefined" && window.location.hash !== `#${next}`) {
      history.replaceState(null, "", `#${next}`);
    }
  };

  return (
    <section className="events-tabs-sec" id="programs" aria-labelledby="programs-heading">
      <div className="wrap">
        <div className="events-tabs-header">
          <div className="sec-label rv">Programs</div>
          <h2 className="events-tabs-title rv" data-d="1" id="programs-heading">
            What we <em>host.</em>
          </h2>
        </div>

        <div className="events-tab-switch rv" data-d="2" role="tablist" aria-label="Event programs">
          <button
            type="button"
            role="tab"
            id="tab-forum"
            aria-selected={tab === "forum"}
            aria-controls="panel-forum"
            tabIndex={tab === "forum" ? 0 : -1}
            className={`events-tab-btn ${tab === "forum" ? "is-active" : ""}`}
            onClick={() => select("forum")}
          >
            <span className="events-tab-num">I</span>
            <span className="events-tab-label">The Speaker Forum</span>
          </button>
          <button
            type="button"
            role="tab"
            id="tab-social"
            aria-selected={tab === "social"}
            aria-controls="panel-social"
            tabIndex={tab === "social" ? 0 : -1}
            className={`events-tab-btn ${tab === "social" ? "is-active" : ""}`}
            onClick={() => select("social")}
          >
            <span className="events-tab-num">II</span>
            <span className="events-tab-label">Social Gatherings</span>
          </button>
        </div>

        {/* FORUM PANEL */}
        <div
          role="tabpanel"
          id="panel-forum"
          aria-labelledby="tab-forum"
          hidden={tab !== "forum"}
          className="events-tab-panel"
        >
          <div className="events-tab-grid">
            <div className="events-tab-intro">
              <div className="events-tab-intro-eyebrow">The Speaker Forum</div>
              <p className="events-tab-lede">
                Our flagship event: a platform for professionals and academics to
                share lived experience with students. Not lectures &mdash; open
                dialogues with the practical insight, ideas, and networks not found
                in the classroom.
              </p>
            </div>
            <ul className="events-pillars">
              {FORUM_PILLARS.map((p) => (
                <li key={p.num} className="events-pillar">
                  <span className="events-pillar-num">{p.num}</span>
                  <div>
                    <h3 className="events-pillar-h">{p.h}</h3>
                    <p className="events-pillar-p">{p.p}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="events-format-card" aria-label="Speaker forum specifications">
            <div className="events-format-cardhead">
              <span className="events-format-cardhead-rule" aria-hidden="true" />
              <span className="events-format-cardhead-mark" aria-hidden="true">✦</span>
              <span className="events-format-cardhead-h">Forum Specifications</span>
              <span className="events-format-cardhead-mark" aria-hidden="true">✦</span>
              <span className="events-format-cardhead-rule" aria-hidden="true" />
            </div>
            <dl className="events-format-list">
              {FORUM_FORMAT.map(([lbl, val]) => (
                <div key={lbl} className="events-format-line">
                  <dt className="events-format-line-lbl">{lbl}</dt>
                  <span className="events-format-line-dots" aria-hidden="true" />
                  <dd className="events-format-line-val">{val}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* SOCIAL PANEL */}
        <div
          role="tabpanel"
          id="panel-social"
          aria-labelledby="tab-social"
          hidden={tab !== "social"}
          className="events-tab-panel"
        >
          <div className="events-tab-grid">
            <div className="events-tab-intro">
              <div className="events-tab-intro-eyebrow">Social Gatherings</div>
              <p className="events-tab-lede">
                Beyond the speaker series. Our socials keep it simple: relaxed
                settings, good energy, and the kind of room where connections
                happen naturally &mdash; driven people, real conversations, fresh
                perspectives, no pressure.
              </p>
            </div>
            <ul className="events-pillars">
              {GATHERINGS.map((g) => (
                <li key={g.h} className="events-pillar">
                  <span className="events-pillar-type">{g.type}</span>
                  <div>
                    <h3 className="events-pillar-h">{g.h}</h3>
                    <p className="events-pillar-p">{g.p}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
