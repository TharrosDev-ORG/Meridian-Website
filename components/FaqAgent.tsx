"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Client, Key, Agent, type Task, type AnyTaskMessage as Message } from "@relevanceai/sdk";

// Constants - these should ideally be in .env.local
const REGION = process.env.NEXT_PUBLIC_RELEVANCE_REGION || "us-east-1";
const PROJECT = process.env.NEXT_PUBLIC_RELEVANCE_PROJECT || "";
const AGENT_ID = process.env.NEXT_PUBLIC_RELEVANCE_AGENT_ID || "";

export default function FaqAgent() {
  const [mounted, setMounted] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mounted Guard pattern
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize Client and Agent
  useEffect(() => {
    if (!mounted) return;

    const init = async () => {
      try {
        if (!PROJECT || !AGENT_ID) {
          console.warn("Relevance AI: Missing PROJECT or AGENT_ID in environment variables.");
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
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              embedKey: embedKey,
              conversationPrefix: taskPrefix,
            }),
          );
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

  // Handle task and messages
  useEffect(() => {
    if (!task) return;

    const onMessage = ({ detail }: any) => {
      const { message } = detail;
      setMessages((prev) => {
        // Replace optimistic message if it exists
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

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !client || !agent) return;

    const userText = inputValue.trim();
    setInputValue("");

    // Optimistic user message
    const optimisticMsg: any = {
      type: "user-message",
      id: "optimistic",
      content: userText,
      toJSON: () => ({ type: "user-message", content: userText }),
      isAgent: () => false,
      isUser: () => true,
    };
    setMessages((prev) => [...prev, optimisticMsg]);
    setIsTyping(true);

    try {
      let currentTask = task;
      if (!currentTask) {
        currentTask = await agent.createTask();
        setTask(currentTask);
      }
      await currentTask.send(userText);
    } catch (error) {
      console.error("Send message error:", error);
      setIsTyping(false);
    }
  };

  if (!mounted) return null;

  if (isInitializing) {
    return (
      <div className="agent-loading">
        <div className="spinner"></div>
        <p>Connecting to Tharros Intelligence...</p>
      </div>
    );
  }

  if (!PROJECT || !AGENT_ID) {
    return (
      <div className="agent-error">
        <p>Configuration Error: Relevance AI Project or Agent ID not set.</p>
      </div>
    );
  }

  return (
    <div className="faq-agent-shell">
      <div className="agent-messages-viewport">
        {messages.length === 0 && (
          <div className="agent-empty">
            <h3 className="serif-italic">The Meridian Assistant</h3>
            <p className="sans-label">How can we assist your journey today?</p>
          </div>
        )}
        
        {messages.map((m, i) => {
          const isAgent = m.type !== 'user-message';
          return (
            <div key={m.id || i} className={`message-row ${m.type}`}>
              <div className="message-bubble">
                <div className="message-sender sans-label">{isAgent ? 'Assistant' : 'Member'}</div>
                <div className="message-content">{(m as any).content}</div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="message-row agent-message typing">
            <div className="message-bubble">
              <div className="typing-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="agent-input-row" onSubmit={handleSendMessage}>
        <input 
          type="text" 
          placeholder="Ask a question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isTyping}
        />
        <button type="submit" disabled={isTyping || !inputValue.trim()}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>

      <style jsx>{`
        .faq-agent-shell {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          background: var(--cream-mid);
          border: 1px solid var(--ink-15);
          height: 600px;
          display: flex;
          flex-direction: column;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
        }

        .agent-messages-viewport {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .agent-empty {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          opacity: 0.4;
        }

        .agent-empty h3 { font-size: 2rem; margin-bottom: 0.5rem; }

        .message-row { display: flex; width: 100%; }
        .message-row.user-message { justify-content: flex-end; }

        .message-bubble {
          max-width: 80%;
          padding: 1rem 1.25rem;
          background: white;
          border: 1px solid var(--ink-08);
          position: relative;
        }

        .user-message .message-bubble {
          background: var(--ink);
          color: var(--cream);
          border-color: var(--ink);
        }

        .message-sender {
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          opacity: 0.5;
        }

        .user-message .message-sender { color: var(--gold); }

        .message-content {
          font-family: var(--sans);
          font-size: 15px;
          line-height: 1.5;
        }

        .agent-input-row {
          padding: 1.5rem;
          background: white;
          border-top: 1px solid var(--ink-15);
          display: flex;
          gap: 1rem;
        }

        .agent-input-row input {
          flex: 1;
          border: none;
          background: var(--cream);
          padding: 12px 20px;
          font-family: var(--sans);
          font-size: 15px;
          outline: none;
        }

        .agent-input-row button {
          background: var(--gold);
          color: white;
          border: none;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .agent-input-row button:hover:not(:disabled) { transform: scale(1.05); }
        .agent-input-row button:disabled { opacity: 0.3; cursor: not-allowed; }

        .typing-dots { display: flex; gap: 4px; padding: 4px 0; }
        .typing-dots span {
          width: 6px;
          height: 6px;
          background: var(--ink-30);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        .agent-loading {
          height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 2px solid var(--ink-08);
          border-top-color: var(--gold);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .serif-italic { font-family: var(--serif); font-style: italic; }
        .sans-label { font-family: var(--sans); font-weight: 700; text-transform: uppercase; }
      `}</style>
    </div>
  );
}
