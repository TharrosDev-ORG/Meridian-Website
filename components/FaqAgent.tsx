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
      <div className="agent-elegant-loading">
        <div className="seal-shimmer">
          <svg viewBox="0 0 100 100">
            <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        <p className="sans-label">Initializing Intelligence</p>
      </div>
    );
  }

  return (
    <div className="agent-minimal rv" data-d="2">
      <div className="chat-viewport">
        {messages.length === 0 && (
          <div className="empty-state">
            <div className="meridian-seal-bg">M</div>
            <h2 className="serif-title">How can we assist your <em>journey?</em></h2>
            <p className="sans-label">Awaiting your inquiry</p>
          </div>
        )}

        {messages.map((m, i) => {
          const isAgent = m.type !== 'user-message';
          return (
            <div key={m.id || i} className={`msg-block ${isAgent ? 'agent' : 'user'}`}>
              <div className="msg-content-wrap">
                <div className="msg-header">
                  <span className="sender-name sans-label">{isAgent ? 'The Assistant' : 'Member'}</span>
                </div>
                <div className="msg-text">
                  {(m as any).content}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="msg-block agent typing">
            <div className="msg-content-wrap">
              <div className="msg-text">
                <div className="typing-dots-gold">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area-wrap">
        <form className="input-form" onSubmit={handleSendMessage}>
          <input 
            type="text" 
            placeholder="Describe your inquiry..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            autoFocus
          />
          <button type="submit" className="submit-btn" disabled={isTyping || !inputValue.trim()}>
            <span>Submit</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>

      <style jsx>{`
        .agent-minimal {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          background: var(--cream);
          height: 650px;
          display: flex;
          flex-direction: column;
          position: relative;
          border-top: 1px solid var(--ink-10);
        }

        .chat-viewport {
          flex: 1;
          overflow-y: auto;
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          scrollbar-width: none;
        }
        .chat-viewport::-webkit-scrollbar { display: none; }

        .empty-state {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
        }

        .meridian-seal-bg {
          position: absolute;
          font-family: var(--sans);
          font-size: 30vw;
          font-weight: 900;
          color: var(--ink);
          opacity: 0.02;
          z-index: 0;
          pointer-events: none;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .serif-title {
          font-family: var(--serif);
          font-size: clamp(32px, 4vw, 52px);
          color: var(--ink);
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        .serif-title em { font-style: italic; color: var(--gold); }

        .empty-state .sans-label {
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--ink-30);
          position: relative;
          z-index: 1;
        }

        /* ── Messages ── */
        .msg-block {
          display: flex;
          width: 100%;
          animation: elegantFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .msg-block.user { justify-content: flex-end; }

        .msg-content-wrap {
          max-width: 700px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .user .msg-content-wrap { align-items: flex-end; text-align: right; }

        .sender-name {
          font-size: 9px;
          letter-spacing: 0.2em;
          color: var(--ink-30);
        }

        .agent .sender-name { color: var(--gold); }

        .msg-text {
          font-family: var(--serif);
          font-size: 21px;
          line-height: 1.6;
          color: var(--ink);
          position: relative;
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
          padding: 40px;
          background: var(--cream);
          border-top: 1px solid var(--ink-05);
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
        .submit-btn:disabled { opacity: 0.1; cursor: not-allowed; }

        /* ── Typing ── */
        .typing-dots-gold { display: flex; gap: 6px; padding: 10px 0; }
        .typing-dots-gold span {
          width: 4px;
          height: 4px;
          background: var(--gold);
          border-radius: 50%;
          animation: dotFloat 1.8s infinite ease-in-out;
        }
        .typing-dots-gold span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots-gold span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dotFloat {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
          40% { transform: translateY(-6px); opacity: 1; }
        }

        @keyframes elegantFade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }

        /* ── Loading ── */
        .agent-elegant-loading {
          height: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          color: var(--gold);
        }

        .seal-shimmer {
          width: 60px;
          height: 60px;
          animation: sealRotate 20s linear infinite;
        }

        @keyframes sealRotate { from { transform: rotate(0); } to { transform: rotate(360deg); } }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .agent-minimal { height: 85vh; }
          .chat-viewport { padding: 32px 20px; gap: 32px; }
          .msg-text { font-size: 18px; }
          .input-form input { font-size: 18px; }
          .submit-btn span { display: none; }
        }
      `}</style>
    </div>
  );
}
