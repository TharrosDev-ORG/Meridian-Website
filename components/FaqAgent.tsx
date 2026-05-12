"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import {
  Client,
  Key,
  Agent,
  REGION_US,
  REGION_EU,
  REGION_AU,
  type Region,
  type Task,
  type AnyTaskMessage,
} from "@relevanceai/sdk";

const REGION_RAW = process.env.NEXT_PUBLIC_RELEVANCE_REGION?.trim();
const PROJECT = process.env.NEXT_PUBLIC_RELEVANCE_PROJECT?.trim();
const AGENT_ID = process.env.NEXT_PUBLIC_RELEVANCE_AGENT_ID?.trim();

// Accept either a region alias ("US"/"EU"/"AU") or the raw region hash.
function resolveRegion(raw: string | undefined): Region | null {
  if (!raw) return REGION_US; // default to US — Meridian's deployed agent.
  const upper = raw.toUpperCase();
  if (upper === "US") return REGION_US;
  if (upper === "EU") return REGION_EU;
  if (upper === "AU") return REGION_AU;
  if (raw === REGION_US || raw === REGION_EU || raw === REGION_AU) {
    return raw as Region;
  }
  return null;
}

// Stable text extraction from any SDK message subclass.
function getMessageText(m: AnyTaskMessage): string {
  const anyMsg = m as { text?: unknown; errors?: unknown };
  if (typeof anyMsg.text === "string") return anyMsg.text;
  // agent-error surfaces an `errors` array of strings.
  if (Array.isArray(anyMsg.errors) && anyMsg.errors.length > 0) {
    const last = anyMsg.errors[anyMsg.errors.length - 1];
    if (typeof last === "string") return last;
  }
  return "";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderMarkdown(raw: string): string {
  // Escape first, THEN apply a tiny markdown subset so we can't be XSS'd.
  let out = escapeHtml(raw);
  out = out.replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,!?:;]|$)/g, "$1<em>$2</em>");
  out = out.replace(/\n/g, "<br />");
  return out;
}

type DisplayMessage = {
  id: string;
  role: "user" | "agent" | "error";
  text: string;
  createdAt: Date;
};

const MessageBlock = memo(function MessageBlock({ m }: { m: DisplayMessage }) {
  const time = m.createdAt
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
    .toLowerCase();
  const label =
    m.role === "user"
      ? "Member Request"
      : m.role === "error"
      ? "Transmission Error"
      : "Tharros Intelligence";
  const klass = m.role === "user" ? "user" : "agent";

  return (
    <div className={`msg-block ${klass}`}>
      <div className="msg-content-wrap">
        <div className="msg-header">
          <span className="sender-name">{label}</span>
          <span className="header-sep">:</span>
          <span className="msg-time">{time}</span>
        </div>
        <div
          className="msg-text"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(m.text) }}
        />
      </div>
    </div>
  );
});

export default function FaqAgent() {
  const [mounted, setMounted] = useState(false);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [task, setTask] = useState<Task<Agent> | null>(null);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initStatus, setInitStatus] = useState<"idle" | "loading" | "ready" | "failed">("loading");
  const [hasUnread, setHasUnread] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const atBottomRef = useRef(true);
  const pendingUserIdRef = useRef<string | null>(null);

  const autoGrow = useCallback((el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = "auto";
    const next = Math.min(el.scrollHeight, 160);
    el.style.height = `${next}px`;
  }, []);

  const scrollToEnd = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "end",
    });
    setHasUnread(false);
  }, []);

  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 0);
    let alive = true;

    (async () => {
      if (!PROJECT || !AGENT_ID) {
        if (alive) {
          setInitStatus("failed");
          setError(
            "Agent is not configured. Missing NEXT_PUBLIC_RELEVANCE_PROJECT / NEXT_PUBLIC_RELEVANCE_AGENT_ID."
          );
        }
        return;
      }
      const region = resolveRegion(REGION_RAW);
      if (!region) {
        if (alive) {
          setInitStatus("failed");
          setError(`Invalid NEXT_PUBLIC_RELEVANCE_REGION "${REGION_RAW}". Use US, EU, or AU.`);
        }
        return;
      }

      try {
        const key = await Key.generateEmbedKey({
          region,
          project: PROJECT,
          agentId: AGENT_ID,
        });
        const client = new Client(key);
        const a = await Agent.get(AGENT_ID, client);
        if (!alive) return;
        setAgent(a);
        setInitStatus("ready");
        // Focus the input once we're live.
        setTimeout(() => inputRef.current?.focus(), 0);
      } catch (err) {
        console.error("[FaqAgent] init failed:", err);
        if (!alive) return;
        setInitStatus("failed");
        setError("Unable to reach the intelligence archive. Please try again shortly.");
      }
    })();

    return () => {
      alive = false;
      clearTimeout(mountTimer);
    };
  }, []);

  // Subscribe to the active task — emits a `message` event for every new or
  // updated message (user + agent + tool + error).
  useEffect(() => {
    if (!task) return;

    const onMessage = (ev: CustomEvent<{ message: AnyTaskMessage }>) => {
      const m = ev.detail.message;
      const id = m.id;
      const createdAt = m.createdAt ?? new Date();

      // Surface real user messages — replacing the optimistic placeholder.
      if (m.type === "user-message") {
        const text = getMessageText(m);
        if (!text) return;
        setMessages((prev) => {
          const optId = pendingUserIdRef.current;
          if (optId) {
            const idx = prev.findIndex((x) => x.id === optId);
            if (idx !== -1) {
              const next = [...prev];
              next[idx] = { id, role: "user", text, createdAt };
              pendingUserIdRef.current = null;
              return next;
            }
          }
          if (prev.some((x) => x.id === id)) return prev;
          return [...prev, { id, role: "user", text, createdAt }];
        });
        return;
      }

      if (m.type === "agent-message") {
        const text = getMessageText(m);
        const generatingFn = (m as unknown as { isGenerating?: () => boolean }).isGenerating;
        const stillGenerating =
          typeof generatingFn === "function" ? generatingFn.call(m) : false;
        if (!text) return;
        setMessages((prev) => {
          const idx = prev.findIndex((x) => x.id === id);
          if (idx === -1) return [...prev, { id, role: "agent", text, createdAt }];
          const next = [...prev];
          next[idx] = { ...next[idx], text, createdAt };
          return next;
        });
        if (!stillGenerating) setIsTyping(false);
        return;
      }

      if (m.type === "agent-error") {
        const text = getMessageText(m) || "The agent encountered an error processing your inquiry.";
        setMessages((prev) => {
          if (prev.some((x) => x.id === id)) return prev;
          return [...prev, { id, role: "error", text, createdAt }];
        });
        setIsTyping(false);
        return;
      }
      // tool-run / agent-thinking / agent-typing / workforce events are ignored
      // for this public Q&A surface.
    };

    const onError = () => {
      setIsTyping(false);
    };

    task.addEventListener("message", onMessage as EventListener);
    task.addEventListener("error", onError as EventListener);

    return () => {
      task.removeEventListener("message", onMessage as EventListener);
      task.removeEventListener("error", onError as EventListener);
      task.unsubscribe();
    };
  }, [task]);

  // Track whether the user is parked near the bottom of the viewport. Only
  // auto-follow new content if they are; otherwise surface a "Jump to latest"
  // affordance so we don't yank them away from prior context.
  useEffect(() => {
    const v = viewportRef.current;
    if (!v) return;
    const onScroll = () => {
      const slack = 64; // px tolerance
      atBottomRef.current = v.scrollHeight - v.scrollTop - v.clientHeight < slack;
      if (atBottomRef.current) setHasUnread(false);
    };
    v.addEventListener("scroll", onScroll, { passive: true });
    return () => v.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (messages.length === 0 && !isTyping) return;
    if (atBottomRef.current) {
      const id = requestAnimationFrame(() => scrollToEnd(true));
      return () => cancelAnimationFrame(id);
    }
    // New content arrived while the user was scrolled up.
    const t = setTimeout(() => setHasUnread(true), 0);
    return () => clearTimeout(t);
  }, [messages, isTyping, scrollToEnd]);

  const sendMessage = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || !agent || isTyping) return;

      const optimisticId = `optimistic-${Date.now()}`;
      pendingUserIdRef.current = optimisticId;
      setMessages((prev) => [
        ...prev,
        { id: optimisticId, role: "user", text, createdAt: new Date() },
      ]);
      setIsTyping(true);
      setError(null);

      try {
        const updated = task ? await agent.sendMessage(text, task) : await agent.sendMessage(text);
        setTask(updated);
        setTimeout(() => inputRef.current?.focus(), 0);
      } catch (err) {
        console.error("[FaqAgent] send failed:", err);
        setIsTyping(false);
        setError("Failed to transmit inquiry. Please retry.");
        setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
        pendingUserIdRef.current = null;
      }
    },
    [agent, isTyping, task],
  );

  const submit = useCallback(() => {
    if (initStatus !== "ready" || isTyping || !inputValue.trim()) return;
    const text = inputValue.trim();
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
    sendMessage(text);
  }, [initStatus, isTyping, inputValue, sendMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter submits; Shift+Enter inserts a newline.
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  };

  const resetConversation = useCallback(() => {
    if (isTyping) return;
    if (task) task.unsubscribe();
    setTask(null);
    setMessages([]);
    setError(null);
    setHasUnread(false);
    pendingUserIdRef.current = null;
    atBottomRef.current = true;
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [isTyping, task]);

  // Publish status to sibling islands (briefing) so they can reflect the
  // real init state and whether the conversation has begun.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("qa-status", {
        detail: {
          initStatus,
          isTyping,
          hasMessages: messages.length > 0,
        },
      }),
    );
  }, [initStatus, isTyping, messages.length]);

  // Suggested-prompt bridge from QaBriefing.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === "string" && detail.trim()) sendMessage(detail);
    };
    window.addEventListener("qa-prompt", handler);
    return () => window.removeEventListener("qa-prompt", handler);
  }, [sendMessage]);

  if (!mounted) return null;

  const showInitLoader = initStatus === "loading" && messages.length === 0;
  const showReady = initStatus === "ready" && messages.length === 0;
  const inputDisabled = initStatus !== "ready" || isTyping;

  const statusLabel =
    initStatus === "ready"
      ? isTyping
        ? "Composing Response"
        : "Operational"
      : initStatus === "failed"
      ? "Offline"
      : "Synchronizing";
  const statusClass = initStatus === "failed" ? "offline" : "";

  return (
    <div className="qa-console" data-d="2">
      <div className="console-toolbar">
        <span className={`toolbar-status ${statusClass}`}>
          <span className="dot" aria-hidden="true" />
          {statusLabel}
        </span>
        <button
          type="button"
          className="new-chat-btn"
          onClick={resetConversation}
          disabled={isTyping || messages.length === 0}
          aria-label="Start a new conversation"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>New</span>
        </button>
      </div>
      <div className="chat-viewport" ref={viewportRef} role="log" aria-live="polite" aria-relevant="additions">
        {showInitLoader && (
          <div className="msg-block agent initializing">
            <div className="msg-content-wrap">
              <div className="msg-header">
                <span className="sender-name">Tharros Intelligence</span>
                <span className="header-sep">:</span>
                <span className="msg-time">system boot</span>
              </div>
              <div className="msg-text">
                <div className="init-loading">
                  <div className="init-spinner" aria-hidden="true"></div>
                  <span>Synchronizing Society Archive...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {initStatus === "failed" && (
          <div className="msg-block agent error" role="alert">
            <div className="msg-content-wrap">
              <div className="msg-header">
                <span className="sender-name">Archive Offline</span>
                <span className="header-sep">:</span>
              </div>
              <div className="msg-text">
                <p>{error ?? "The intelligence agent is currently unavailable."}</p>
              </div>
            </div>
          </div>
        )}

        {showReady && (
          <div className="terminal-ready-indicator">
            <p className="sans-label">Dossier Active</p>
            <p className="ready-greeting">
              Ask me about the society — <em>events, membership, application, or anything in the archive.</em>
            </p>
            <p className="ready-hint">
              I&apos;m trained on the public Meridian Society materials. Try a prompt from the
              briefing on the left, or type your own question below.
            </p>
          </div>
        )}

        {messages.map((m) => (
          <MessageBlock key={m.id} m={m} />
        ))}

        {isTyping && initStatus === "ready" && (
          <div className="msg-block agent typing" aria-label="Assistant is thinking">
            <div className="msg-content-wrap">
              <div className="msg-header">
                <span className="sender-name">Tharros Intelligence</span>
                <span className="header-sep">:</span>
              </div>
              <div className="msg-text">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} style={{ height: 1 }} />
      </div>

      <div className="input-area-wrap">
        <button
          type="button"
          className={`jump-latest ${hasUnread ? "visible" : ""}`}
          onClick={() => scrollToEnd(true)}
          aria-hidden={!hasUnread}
          tabIndex={hasUnread ? 0 : -1}
        >
          <span>Jump to latest</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <form className="input-form" onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            rows={1}
            placeholder={
              initStatus === "ready" ? "Inquire the archive..." : "Awaiting archive sync..."
            }
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              autoGrow(e.currentTarget);
            }}
            onKeyDown={handleKeyDown}
            disabled={initStatus !== "ready"}
            aria-label="Your question"
            autoComplete="off"
            spellCheck
          />
          <button
            type="submit"
            className="submit-btn"
            disabled={inputDisabled || !inputValue.trim()}
            aria-label="Send message"
          >
            <span>Transmit</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
        <div className="input-hint">
          <span>
            <kbd>Enter</kbd> to send · <kbd>Shift</kbd>+<kbd>Enter</kbd> for new line
          </span>
          {error && initStatus === "ready" && <span className="inline-error">{error}</span>}
        </div>
      </div>
    </div>
  );
}
