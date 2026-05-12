"use client";

import React, { useState, useEffect, useCallback } from 'react';

type AgentStatus = {
  initStatus: 'idle' | 'loading' | 'ready' | 'failed';
  isTyping: boolean;
  hasMessages: boolean;
};

const SUGGESTIONS: { label: string; prompt: string }[] = [
  { label: 'How do I become a member?', prompt: 'How do I become a member?' },
  { label: 'Why should I join?', prompt: 'Why should I join the society?' },
  { label: 'What does the Society host?', prompt: 'What kind of events does The Meridian Society host?' },
];

export default function QaBriefing() {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<AgentStatus>({
    initStatus: 'loading',
    isTyping: false,
    hasMessages: false,
  });

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onStatus = (e: Event) => {
      const detail = (e as CustomEvent<AgentStatus>).detail;
      if (detail) setStatus(detail);
    };
    window.addEventListener('qa-status', onStatus);
    return () => window.removeEventListener('qa-status', onStatus);
  }, []);

  const handlePrompt = useCallback((prompt: string) => {
    if (typeof window === 'undefined' || !mounted) return;
    window.dispatchEvent(new CustomEvent('qa-prompt', { detail: prompt }));
    if (window.matchMedia('(max-width: 1100px)').matches) {
      document.querySelector('.qa-console')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [mounted]);

  const statusLabel =
    status.initStatus === 'ready'
      ? status.isTyping
        ? 'Composing Response'
        : 'Operational'
      : status.initStatus === 'failed'
      ? 'Offline'
      : 'Synchronizing';

  const statusKey =
    status.initStatus === 'ready' ? 'ready' : status.initStatus === 'failed' ? 'failed' : 'loading';

  const suggestionsDisabled = !mounted || status.initStatus !== 'ready' || status.isTyping;
  const compact = status.hasMessages;

  return (
    <aside className={`qa-briefing ${compact ? 'is-compact' : ''}`} suppressHydrationWarning>
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
          <span className="meta-value">The Meridian Society Archive</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Status</span>
          <span className="meta-value live-status" data-status={statusKey}>
            {statusLabel}
          </span>
        </div>
      </div>

      <div className="suggested-questions">
        <p className="suggested-title">Common Questions</p>
        <div className="suggested-list">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.prompt}
              type="button"
              className="suggested-btn"
              onClick={() => handlePrompt(s.prompt)}
              disabled={suggestionsDisabled}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
