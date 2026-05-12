"use client";

import React, { useState, useEffect } from 'react';

export default function QaBriefing() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrompt = (prompt: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('qa-prompt', { detail: prompt }));
    }
  };

  return (
    <aside className="qa-briefing" suppressHydrationWarning>
      <div className="sec-label">Intelligence</div>
      <h1 className="qa-title">Questions & <em>Answers.</em></h1>
      <p className="qa-intro">
        Our intelligence agent is trained on the society&apos;s full archive to assist your navigation.
      </p>

      <div className="briefing-meta">
        <div className="meta-item">
          <span className="meta-label">Agent Class</span>
          <span className="meta-value">Tharros FAQ Assistant</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Knowledge Base</span>
          <span className="meta-value">Meridian Archive v2.4</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Status</span>
          <span className="meta-value" style={{ color: 'var(--gold)' }}>Operational</span>
        </div>
      </div>

      <div className="suggested-questions">
        <p className="suggested-title">Common Questions</p>
        <div className="suggested-list">
          <button 
            className="suggested-btn" 
            onClick={() => handlePrompt('How do I become a member?')}
            disabled={!mounted}
          >
            How do I become a member?
          </button>
          <button 
            className="suggested-btn" 
            onClick={() => handlePrompt('Why should I join the society?')}
            disabled={!mounted}
          >
            Why should I join?
          </button>
          <button 
            className="suggested-btn" 
            onClick={() => handlePrompt('What kind of events does The Meridian Society host?')}
            disabled={!mounted}
          >
            What does the Society host?
          </button>
        </div>
      </div>
    </aside>
  );
}
