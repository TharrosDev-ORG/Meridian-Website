"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Client, Key, Agent, type Task, type AnyTaskMessage as Message } from "@relevanceai/sdk";

const REGION = process.env.NEXT_PUBLIC_RELEVANCE_REGION;
const PROJECT = process.env.NEXT_PUBLIC_RELEVANCE_PROJECT;
const AGENT_ID = process.env.NEXT_PUBLIC_RELEVANCE_AGENT_ID;

/**
 * Optimized Message Component
 * Prevents unnecessary re-renders of the entire message list.
 */
const MessageBlock = memo(({ m, isAgent }: { m: Message, isAgent: boolean }) => {
  // Robustly extract content from various SDK message formats
  const content = (m as any).content;
  const displayContent = typeof content === 'string' 
    ? content 
    : content && typeof content === 'object'
      ? JSON.stringify(content)
      : (m as any).text || "";

  return (
    <div className={`msg-block ${isAgent ? 'agent' : 'user'}`} role="log" aria-live="polite">
      <div className="msg-content-wrap">
        <div className="msg-header">
          <span className="sender-name sans-label">{isAgent ? 'The Assistant' : 'Member'}</span>
        </div>
        <div className="msg-text">
          {displayContent}
        </div>
      </div>
    </div>
  );
});

MessageBlock.displayName = "MessageBlock";

export default function FaqAgent() {
  const [mounted, setMounted] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [task, setTask] = useState<Task<Agent> | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set mounted state
  useEffect(() => {
    // Debug audit
    if (typeof window !== 'undefined') {
      console.log("FaqAgent Debug:", { 
        region: REGION ? "FOUND" : "MISSING",
        project: PROJECT ? "FOUND" : "MISSING",
        agent: AGENT_ID ? "FOUND" : "MISSING"
      });
    }
    setMounted(true);
  }, []);

  // Initialization Logic
  useEffect(() => {
    if (!mounted) return;

    let isSubscribed = true;

    const init = async () => {
      try {
        if (!PROJECT || !AGENT_ID) {
          console.warn("FaqAgent: Missing Project or Agent ID in environment.");
          if (isSubscribed) setIsInitializing(false);
          return;
        }

        const storageKey = `r-${AGENT_ID}`;
        let key: Key;

        const stored = JSON.parse(localStorage.getItem(storageKey) ?? "null");
        
        try {
          if (stored?.embedKey && stored?.conversationPrefix) {
            key = new Key({
              key: stored.embedKey,
              region: REGION as any,
              project: PROJECT,
              agentId: AGENT_ID,
              taskPrefix: stored.conversationPrefix,
            });
          } else {
            throw new Error("No stored session");
          }
        } catch (storageErr) {
          // Stale or missing session, generate a new one
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

        if (!isSubscribed) return;

        const newClient = new Client(key);
        setClient(newClient);

        const newAgent = await Agent.get(AGENT_ID, newClient);
        setAgent(newAgent);
        setIsInitializing(false);
      } catch (err) {
        console.error("Relevance AI Initialization Error:", err);
        if (isSubscribed) {
          // Clear storage on hard failure to prevent loops
          localStorage.removeItem(`r-${AGENT_ID}`);
          setError("Failed to initialize the intelligence session. Please refresh.");
          setIsInitializing(false);
        }
      }
    };

    init();
    return () => { isSubscribed = false; };
  }, [mounted]);

  // Message Listener
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

  // Smooth Auto-Scroll with RAF for performance
  useEffect(() => {
    if (messages.length > 0 || isTyping) {
      const scroll = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      };
      const raf = requestAnimationFrame(scroll);
      return () => cancelAnimationFrame(raf);
    }
  }, [messages, isTyping]);

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !client || !agent || isTyping) return;

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
      
      // Always sync the task state to ensure persistence and latest SDK state
      setTask(updatedTask);
      
      // Keep focus on input for seamless interaction
      setTimeout(() => inputRef.current?.focus(), 10);
    } catch (err) {
      console.error("Send message error:", err);
      setIsTyping(false);
      setError("Connectivity issue detected. Your last message may not have been received.");
    }
  }, [inputValue, client, agent, task, isTyping]);

  if (!mounted) return null;

  if (isInitializing) {
    return (
      <div className="agent-elegant-loading" aria-busy="true">
        <div className="seal-shimmer">
          <svg viewBox="0 0 100 100">
            <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        <p className="sans-label">Initializing Intelligence</p>
      </div>
    );
  }

  if (error && messages.length === 0) {
    return (
      <div className="agent-error-state">
        <span className="error-icon">!</span>
        <p className="sans-label">{error}</p>
        <button onClick={() => window.location.reload()} className="text-link">Retry Session</button>
      </div>
    );
  }

  return (
    <div className="agent-minimal rv" data-d="2">
      <div className="chat-viewport">
        {messages.length === 0 && (
          <div className="empty-state">
            <div className="meridian-seal-bg">M</div>
            <p className="sans-label">Awaiting your question</p>
          </div>
        )}

        {messages.map((m, i) => (
          <MessageBlock key={m.id || i} m={m} isAgent={m.type !== 'user-message'} />
        ))}

        {isTyping && (
          <div className="msg-block agent typing" aria-label="Assistant is thinking">
            <div className="msg-content-wrap">
              <div className="msg-text">
                <div className="typing-dots-gold">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} style={{ height: '1px' }} />
      </div>

      <div className="input-area-wrap">
        {error && messages.length > 0 && <p className="inline-error">{error}</p>}
        <form className="input-form" onSubmit={handleSendMessage}>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Describe your question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            autoFocus
            aria-label="Your question"
          />
          <button type="submit" className="submit-btn" disabled={isTyping || !inputValue.trim()} aria-label="Send message">
            <span>Submit</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>

      <style jsx>{`
        .agent-minimal {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          background: var(--cream);
          height: auto;
          display: flex;
          flex-direction: column;
          position: relative;
          will-change: transform, opacity;
        }

        .chat-viewport {
          padding: 40px 0;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .empty-state {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          padding: 80px 0;
        }

        .meridian-seal-bg {
          position: absolute;
          font-family: var(--sans);
          font-size: clamp(200px, 30vw, 400px);
          font-weight: 900;
          color: var(--ink);
          opacity: 0.02;
          z-index: 0;
          pointer-events: none;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          user-select: none;
        }

        .empty-state .sans-label {
          font-size: 10px;
          letter-spacing: 0.35em;
          color: var(--ink-30);
          position: relative;
          z-index: 1;
          text-transform: uppercase;
        }

        /* ── Messages ── */
        .msg-block {
          display: flex;
          width: 100%;
          animation: elegantFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        .msg-block.user { justify-content: flex-end; }

        .msg-content-wrap {
          max-width: 85%;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .user .msg-content-wrap { align-items: flex-end; text-align: right; }

        .sender-name {
          font-size: 9px;
          letter-spacing: 0.2em;
          color: var(--ink-55);
          text-transform: uppercase;
          font-weight: 700;
        }

        .agent .sender-name { color: var(--gold); }

        .msg-text {
          font-family: var(--serif);
          font-size: 21px;
          line-height: 1.6;
          color: var(--ink);
          position: relative;
          scroll-margin-bottom: 150px;
          opacity: 1 !important;
        }

        .agent .msg-text {
          font-style: italic;
          font-weight: 300;
          color: var(--ink-85);
        }

        .user .msg-text {
          font-family: var(--sans);
          font-size: 15px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          background: var(--ink);
          color: var(--cream);
          padding: 12px 24px;
          border-radius: 2px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        /* ── Input ── */
        .input-area-wrap {
          padding: 40px 0 100px;
          background: var(--cream);
          z-index: 100;
        }

        .inline-error {
          font-family: var(--sans);
          font-size: 11px;
          color: #d32f2f;
          margin-bottom: 12px;
          letter-spacing: 0.05em;
        }

        .input-form {
          display: flex;
          align-items: center;
          gap: 24px;
          border-bottom: 2px solid var(--ink-10);
          padding-bottom: 12px;
          transition: border-color 0.4s;
        }

        .input-form:focus-within {
          border-color: var(--gold);
        }

        .input-form input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--serif);
          font-size: 24px;
          font-style: italic;
          color: var(--ink);
        }

        .input-form input::placeholder {
          color: var(--ink-15);
        }

        .submit-btn {
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          color: var(--gold);
          transition: color 0.3s, transform 0.3s;
        }

        .submit-btn span {
          font-family: var(--sans);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .submit-btn svg { width: 18px; height: 18px; transition: transform 0.3s; }

        .submit-btn:hover:not(:disabled) { color: var(--ink); }
        .submit-btn:hover:not(:disabled) svg { transform: translateX(4px); }
        .submit-btn:disabled { opacity: 0.15; cursor: not-allowed; }

        /* ── Typing ── */
        .typing-dots-gold { display: flex; gap: 6px; padding: 10px 0; }
        .typing-dots-gold span {
          width: 4px;
          height: 4px;
          background: var(--gold);
          border-radius: 50%;
          animation: dotFloat 1.8s infinite ease-in-out;
          will-change: transform, opacity;
        }
        .typing-dots-gold span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots-gold span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dotFloat {
          0%, 80%, 100% { transform: translate3d(0,0,0); opacity: 0.3; }
          40% { transform: translate3d(0,-6px,0); opacity: 1; }
        }

        @keyframes elegantFade {
          from { opacity: 0; transform: translate3d(0, 20px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        /* ── Loading / Error ── */
        .agent-elegant-loading, .agent-error-state {
          height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }
        
        .agent-error-state { color: var(--ink-55); }
        .error-icon { 
          width: 40px; height: 40px; border: 1px solid var(--ink-15); 
          border-radius: 50%; display: flex; align-items: center; 
          justify-content: center; font-family: var(--serif); font-size: 20px;
        }

        .seal-shimmer {
          width: 60px;
          height: 60px;
          animation: sealRotate 20s linear infinite;
          color: var(--gold);
        }

        @keyframes sealRotate { from { transform: rotate(0); } to { transform: rotate(360deg); } }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .chat-viewport { padding: 32px 16px; gap: 24px; }
          .msg-text { font-size: 18px; }
          .msg-content-wrap { max-width: 92%; }
          .input-form input { font-size: 18px; }
          .submit-btn span { display: none; }
          .input-area-wrap { padding-bottom: 60px; }
        }
      `}</style>
    </div>
  );
}
