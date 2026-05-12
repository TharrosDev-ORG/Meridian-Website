"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Client, Key, Agent, REGION_US, type Task, type AnyTaskMessage as Message } from "@relevanceai/sdk";

const REGION = process.env.NEXT_PUBLIC_RELEVANCE_REGION?.trim();
const PROJECT = process.env.NEXT_PUBLIC_RELEVANCE_PROJECT?.trim();
const AGENT_ID = process.env.NEXT_PUBLIC_RELEVANCE_AGENT_ID?.trim();

/**
 * Optimized Message Component
 * Prevents unnecessary re-renders and handles industrial message styling.
 */
const MessageBlock = memo(({ m, isAgent }: { m: Message, isAgent: boolean }) => {
  const content = (m as any).text || (m as any).content || (m as any).body || (m as any).message?.text || "";
  const displayContent = typeof content === 'object' ? (content.text || JSON.stringify(content)) : content;

  // Stable timestamp
  const timestamp = useRef(new Date((m as any).insert_date_ || Date.now()).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  }).toLowerCase());

  const renderContent = (text: string) => {
    const rawText = text || "";
    let processed = rawText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');
    processed = processed.replace(/`(.*?)`/g, '<code class="inline-code">$1</code>');
    processed = processed.replace(/\n/g, '<br />');
    return <div dangerouslySetInnerHTML={{ __html: processed }} />;
  };

  return (
    <div className={`msg-block ${isAgent ? 'agent' : 'user'}`} role="log" aria-live="polite">
      <div className="msg-content-wrap">
        <div className="msg-header">
          <span className="sender-name">{isAgent ? 'Tharros Intelligence' : 'Member Request'}</span>
          <span className="header-sep">:</span>
          <span className="msg-time">{timestamp.current}</span>
        </div>
        <div className="msg-text">
          {renderContent(displayContent)}
        </div>
      </div>
    </div>
  );
});

MessageBlock.displayName = "MessageBlock";

export default function FaqAgent() {
  const [mounted, setMounted] = useState(false);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [task, setTask] = useState<Task<Agent> | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize
  useEffect(() => {
    setMounted(true);
    let isSubscribed = true;
    const init = async () => {
      try {
        if (!REGION || !PROJECT || !AGENT_ID) return;
        
        // Use SDK constant if matching, otherwise fallback to trimmed string
        const region = REGION === 'bcbe5a' ? REGION_US : (REGION as any);
        
        // Generate an ephemeral embed key for public access (v3 pattern)
        const key = await Key.generateEmbedKey({
          region,
          project: PROJECT,
          agentId: AGENT_ID
        });
        
        const client = new Client(key);
        
        // Use static get() for robust agent retrieval
        const newAgent = await Agent.get(AGENT_ID, client);
        
        if (isSubscribed) {
          setAgent(newAgent);
          setIsInitializing(false);
        }
      } catch (err) {
        console.error("Init Error:", err);
        if (isSubscribed) setIsInitializing(false);
      }
    };
    init();
    return () => { isSubscribed = false; };
  }, []);

  // Message Listener
  useEffect(() => {
    if (!task) return;
    const onMessage = ({ detail }: any) => {
      const { message } = detail;
      
      // Aggressively filter out any message that has no displayable text and isn't from the user
      const content = (message as any).text || (message as any).content || (message as any).body || (message as any).message?.text || "";
      const isUser = message.type === 'user-message' || (message as any).role === 'user';
      
      if (!content && !isUser) return;

      setMessages((prev) => {
        // Simple optimistic replacement to prevent duplication for user messages
        const optIdx = prev.findIndex(m => (m as any).id === 'optimistic');
        if (optIdx !== -1 && isUser) {
          const next = [...prev];
          next[optIdx] = message;
          return next;
        }
        return [...prev, message];
      });
      
      if (message.type === "agent-message" || (message as any).role === 'assistant') {
        setIsTyping(false);
      }
    };
    task.addEventListener("message" as any, onMessage);
    return () => {
      task.removeEventListener("message" as any, onMessage);
      task.unsubscribe();
    };
  }, [task]);

  // Optimized Auto-Scroll with debouncing to prevent layout thrashing
  useEffect(() => {
    if (messages.length === 0 && !isTyping) return;
    
    let frameId: number;
    const scroll = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    // Use rAF to ensure scroll happens after layout paint
    frameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frameId);
  }, [messages.length, isTyping]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !agent || isTyping) return;

    const optimisticMsg: Message = {
      type: 'user-message',
      content: text,
      id: 'optimistic',
      clientId: `msg-opt-${Date.now()}`
    } as any;
    
    setMessages((prev) => [...prev, optimisticMsg]);
    setIsTyping(true);
    setError(null);

    try {
      // In v3, sendMessage handles task creation or continuation
      const updatedTask = task 
        ? await agent.sendMessage(text, task) 
        : await agent.sendMessage(text);
      
      setTask(updatedTask);
      setTimeout(() => inputRef.current?.focus(), 10);
    } catch (err) {
      console.error("Send error:", err);
      setError("Failed to transmit inquiry.");
      setIsTyping(false);
      // Remove optimistic message on error
      setMessages((prev) => prev.filter(m => (m as any).id !== 'optimistic'));
    }
  }, [agent, isTyping, task]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping || isInitializing) return;
    const text = inputValue.trim();
    sendMessage(text);
    setInputValue("");
  };

  // Listen for suggested prompts
  useEffect(() => {
    const handlePrompt = (e: any) => {
      if (e.detail) sendMessage(e.detail);
    };
    window.addEventListener('qa-prompt', handlePrompt);
    return () => window.removeEventListener('qa-prompt', handlePrompt);
  }, [sendMessage]);

  if (!mounted) return null;

  return (
    <div className="qa-console">
      <div className="chat-viewport">
        {isInitializing && messages.length === 0 && (
          <div className="msg-block agent initializing">
            <div className="msg-content-wrap">
              <div className="msg-header">
                <span className="sender-name">Tharros Intelligence</span>
                <span className="header-sep">:</span>
                <span className="msg-time">system boot</span>
              </div>
              <div className="msg-text">
                <div className="init-loading">
                  <div className="init-spinner"></div>
                  <span>Synchronizing Society Archive...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isInitializing && messages.length === 0 && (
          <div className="terminal-ready-indicator">
            <p className="sans-label">Dossier Active. Awaiting Inquiry.</p>
          </div>
        )}

        {messages.map((m, i) => (
          <MessageBlock 
            key={i} 
            m={m} 
            isAgent={m.type !== 'user-message' && (m as any).role !== 'user'} 
          />
        ))}

        {isTyping && !isInitializing && (
          <div className="msg-block agent typing" aria-label="Assistant is thinking">
            <div className="msg-content-wrap">
              <div className="msg-header">
                <span className="sender-name">Tharros Intelligence</span>
                <span className="header-sep">:</span>
              </div>
              <div className="msg-text">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} style={{ height: '1px' }} />
      </div>

      <div className="input-area-wrap">
        <form className="input-form" onSubmit={handleSendMessage}>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Inquire the archive..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            aria-label="Your question"
          />
          <button type="submit" className="submit-btn" disabled={isTyping || !inputValue.trim()} aria-label="Send message">
            <span>Transmit</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
        {error && <p className="inline-error">{error}</p>}
      </div>
    </div>
  );
}
