"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Client, Key, Agent, type Task, type AnyTaskMessage as Message } from "@relevanceai/sdk";

const REGION = process.env.NEXT_PUBLIC_RELEVANCE_REGION || "bcbe5a";
const PROJECT = process.env.NEXT_PUBLIC_RELEVANCE_PROJECT || "";
const AGENT_ID = process.env.NEXT_PUBLIC_RELEVANCE_AGENT_ID || "";

export default function FaqAgent() {
  const [mounted, setMounted] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [task, setTask] = useState<Task<Agent> | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const init = async () => {
      try {
        if (!PROJECT || !AGENT_ID) {
          setIsInitializing(false);
          return;
        }

        const storageKey = `r-${AGENT_ID}`;
        let key: Key;

        const stored = JSON.parse(localStorage.getItem(storageKey) ?? "null");
        if (stored?.embedKey && stored?.conversationPrefix) {
          key = new Key({
            key: stored.embedKey,
            region: REGION as any,
            project: PROJECT,
            agentId: AGENT_ID,
            taskPrefix: stored.conversationPrefix,
          });
        } else {
          key = await Key.generateEmbedKey({
            region: REGION as any,
            project: PROJECT,
            agentId: AGENT_ID,
          });

          const { key: embedKey, taskPrefix } = key.toJSON();
          localStorage.setItem(storageKey, JSON.stringify({
            embedKey: embedKey,
            conversationPrefix: taskPrefix,
          }));
        }

        const newClient = new Client(key);
        setClient(newClient);

        const newAgent = await Agent.get(AGENT_ID, newClient);
        setAgent(newAgent);
        setIsInitializing(false);
      } catch (error) {
        console.error("Relevance AI Initialization Error:", error);
        setIsInitializing(false);
      }
    };

    init();
  }, [mounted]);

  useEffect(() => {
    if (!task) return;

    const onMessage = ({ detail }: any) => {
      const { message } = detail;
      setMessages((prev) => {
        const optimisticIndex = prev.findIndex(m => m.type === 'user-message' && m.id === 'optimistic');
        if (optimisticIndex !== -1) {
          const next = [...prev];
          next[optimisticIndex] = message;
          return next;
        }
        return [...prev, message];
      });

      if (message.type === "agent-message") {
        setIsTyping(false);
      }
    };

    task.addEventListener("message" as any, onMessage);
    return () => {
      task.removeEventListener("message" as any, onMessage);
      task.unsubscribe();
    };
  }, [task]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !client || !agent) return;

    const userText = inputValue.trim();
    setInputValue("");

    const optimisticMsg: any = {
      type: "user-message",
      id: "optimistic",
      content: userText,
      insert_date_: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);
    setIsTyping(true);

    try {
      const updatedTask = task 
        ? await agent.sendMessage(userText, task) 
        : await agent.sendMessage(userText);
      if (!task) setTask(updatedTask);
    } catch (error) {
      console.error("Send message error:", error);
      setIsTyping(false);
    }
  };

  if (!mounted) return null;

  if (isInitializing) {
    return (
      <div className="agent-loading-container">
        <div className="loading-seal">
          <svg viewBox="0 0 100 100">
            <path d="M50 5 L95 27.5 L95 72.5 L50 95 L5 72.5 L5 27.5 Z" fill="none" stroke="var(--gold)" strokeWidth="1" />
            <path d="M50 15 L85 32.5 L85 67.5 L50 85 L15 67.5 L15 32.5 Z" fill="none" stroke="var(--gold-40)" strokeWidth="0.5" />
          </svg>
          <div className="loading-text sans-label">Establishing Link</div>
        </div>
      </div>
    );
  }

  return (
    <div className="agent-overhaul rv" data-d="2">
      <div className="agent-header-bar">
        <div className="agent-identity">
          <div className="agent-status-dot active"></div>
          <span className="sans-label">Tharros Assistant // Operational</span>
        </div>
        <div className="agent-project-tag">PROJECT MERIDIAN</div>
      </div>

      <div className="agent-viewport">
        {messages.length === 0 && (
          <div className="agent-welcome">
            <h2 className="serif-italic">How may I assist you?</h2>
            <div className="welcome-rule"></div>
            <p className="sans-label">Inquiry line established. Awaiting input.</p>
          </div>
        )}

        {messages.map((m, i) => {
          const isAgent = m.type !== 'user-message';
          return (
            <div key={m.id || i} className={`msg-row ${isAgent ? 'agent' : 'user'}`}>
              <div className="msg-box">
                <div className="msg-meta">
                  <span className="msg-sender sans-label">{isAgent ? 'ASSISTANT' : 'MEMBER'}</span>
                  <span className="msg-time">{new Date(m.insert_date_).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="msg-body">
                  {(m as any).content}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="msg-row agent">
            <div className="msg-box typing-box">
              <div className="typing-indicator">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="agent-footer">
        <form className="agent-input-container" onSubmit={handleSendMessage}>
          <div className="input-prefix">CMD></div>
          <input 
            type="text" 
            placeholder="TYPE INQUIRY HERE..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            autoFocus
          />
          <button type="submit" className="send-btn" disabled={isTyping || !inputValue.trim()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </form>
      </div>

      <style jsx>{`
        .agent-overhaul {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          background: var(--cream-deep);
          border: 1px solid var(--ink-20);
          height: 700px;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 40px 100px rgba(0,0,0,0.15);
        }

        .agent-overhaul::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: var(--grain);
          background-size: 200px 200px;
          opacity: 0.03;
          pointer-events: none;
          z-index: 5;
        }

        /* ── Header ── */
        .agent-header-bar {
          background: var(--ink);
          color: var(--cream);
          padding: 12px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--gold-40);
          position: relative;
          z-index: 10;
        }

        .agent-identity {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .agent-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--ink-40);
        }

        .agent-status-dot.active {
          background: var(--gold);
          box-shadow: 0 0 10px var(--gold);
          animation: pulse 2s infinite;
        }

        .agent-identity span {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--cream-75);
        }

        .agent-project-tag {
          font-family: var(--sans);
          font-weight: 900;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: var(--gold);
          opacity: 0.6;
        }

        /* ── Viewport ── */
        .agent-viewport {
          flex: 1;
          overflow-y: auto;
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          background: linear-gradient(to bottom, rgba(244,237,227,0.5), transparent);
          scrollbar-width: thin;
          scrollbar-color: var(--ink-15) transparent;
        }

        .agent-viewport::-webkit-scrollbar { width: 4px; }
        .agent-viewport::-webkit-scrollbar-thumb { background: var(--ink-15); }

        .agent-welcome {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 40px;
        }

        .agent-welcome h2 {
          font-size: 2.5rem;
          color: var(--ink);
          margin-bottom: 24px;
        }

        .welcome-rule {
          width: 40px;
          height: 1px;
          background: var(--gold);
          margin-bottom: 24px;
        }

        .agent-welcome p {
          font-size: 11px;
          letter-spacing: 0.25em;
          color: var(--ink-40);
        }

        /* ── Messages ── */
        .msg-row {
          display: flex;
          width: 100%;
          animation: msgEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .msg-row.user { justify-content: flex-end; }

        .msg-box {
          max-width: 75%;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .msg-meta {
          display: flex;
          align-items: baseline;
          gap: 12px;
          padding: 0 4px;
        }

        .msg-sender {
          font-size: 9px;
          letter-spacing: 0.15em;
          font-weight: 700;
          color: var(--gold);
        }

        .user .msg-sender { color: var(--ink-40); }

        .msg-time {
          font-family: var(--sans);
          font-size: 8px;
          letter-spacing: 0.1em;
          color: var(--ink-30);
        }

        .msg-body {
          font-family: var(--serif);
          font-size: 18px;
          line-height: 1.6;
          color: var(--ink);
          background: white;
          padding: 20px 28px;
          border: 1px solid var(--ink-10);
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          position: relative;
        }

        .user .msg-body {
          background: var(--ink);
          color: var(--cream);
          border-color: var(--ink);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .agent .msg-body::before {
          content: '';
          position: absolute;
          left: -1px;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--gold);
        }

        /* ── Typing ── */
        .typing-box {
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
        }

        .typing-indicator {
          display: flex;
          gap: 6px;
          padding: 12px 24px;
          background: white;
          border: 1px solid var(--ink-10);
          width: fit-content;
        }

        .typing-indicator .dot {
          width: 5px;
          height: 5px;
          background: var(--gold);
          border-radius: 50%;
          animation: typingDot 1.4s infinite ease-in-out;
        }

        .typing-indicator .dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator .dot:nth-child(3) { animation-delay: 0.4s; }

        /* ── Footer ── */
        .agent-footer {
          background: var(--cream);
          padding: 24px 40px 40px;
          border-top: 1px solid var(--ink-15);
          position: relative;
          z-index: 10;
        }

        .agent-input-container {
          background: white;
          border: 1px solid var(--ink-20);
          display: flex;
          align-items: center;
          padding: 4px 8px 4px 24px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .agent-input-container:focus-within {
          border-color: var(--gold);
          box-shadow: 0 10px 40px rgba(184,147,42,0.1);
        }

        .input-prefix {
          font-family: var(--sans);
          font-weight: 900;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--gold);
          margin-right: 16px;
        }

        .agent-input-container input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 16px 0;
          font-family: var(--sans);
          font-size: 14px;
          letter-spacing: 0.05em;
          color: var(--ink);
          outline: none;
          text-transform: uppercase;
        }

        .agent-input-container input::placeholder {
          color: var(--ink-20);
          letter-spacing: 0.2em;
        }

        .send-btn {
          background: var(--ink);
          color: var(--gold);
          border: none;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .send-btn:hover:not(:disabled) {
          background: var(--gold);
          color: var(--ink);
          transform: scale(1.05);
        }

        .send-btn:disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }

        .send-btn svg { width: 18px; height: 18px; }

        /* ── Loading ── */
        .agent-loading-container {
          height: 600px;
          background: var(--cream);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--ink-15);
        }

        .loading-seal {
          width: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .loading-seal svg {
          width: 60px;
          height: 60px;
          animation: spin 10s linear infinite;
        }

        .loading-text {
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--gold);
          animation: blink 2s infinite;
        }

        /* ── Animations ── */
        @keyframes msgEnter {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: none; }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes typingDot {
          0%, 80%, 100% { transform: scale(0.5); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }

        @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .agent-overhaul { height: 80vh; }
          .agent-viewport { padding: 24px; gap: 24px; }
          .msg-box { max-width: 85%; }
          .msg-body { font-size: 16px; padding: 16px 20px; }
          .agent-footer { padding: 20px; }
          .agent-welcome h2 { font-size: 1.8rem; }
        }
      `}</style>
    </div>
  );
}
