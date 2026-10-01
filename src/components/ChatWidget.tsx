"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Copy,
  Check,
  RotateCcw,
  Loader2,
} from "lucide-react";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const STORAGE_KEY = "shubham-chat-messages-v1";

const SUGGESTED_QUESTIONS = [
  "What are your skills?",
  "Tell me about your IBM internship",
  "Show me your best project",
  "How can I contact you?",
];

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function loadStoredMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (m): m is ChatMessage =>
          typeof m === "object" &&
          m !== null &&
          ((m as ChatMessage).role === "user" ||
            (m as ChatMessage).role === "assistant") &&
          typeof (m as ChatMessage).content === "string" &&
          typeof (m as ChatMessage).id === "string"
      )
      .slice(-50);
  } catch {
    return [];
  }
}

// Minimal chat hook (messages, input, streaming send, retry) backed by /api/chat.
function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadStoredMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* storage unavailable */
    }
  }, [messages]);

  const runConversation = async (history: ChatMessage[]) => {
    setIsLoading(true);
    setError(null);
    const assistantId = newId();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!res.ok || !res.body) {
        let detail = "";
        try {
          const data = (await res.json()) as { error?: string };
          if (typeof data.error === "string") detail = data.error;
        } catch {
          /* non-JSON error */
        }
        throw new Error(
          res.status === 429
            ? detail || "Rate limit exceeded. Please try again in a minute."
            : detail || "Something went wrong. Please try again."
        );
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const snapshot = acc;
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: snapshot } : m))
        );
      }
      if (!acc.trim()) throw new Error("Empty response. Please try again.");
    } catch (e) {
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || isLoading) return;
    const userMsg: ChatMessage = { id: newId(), role: "user", content: clean };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    void runConversation(history);
  };

  const retry = () => {
    if (isLoading || messages.length === 0) return;
    const last = messages[messages.length - 1];
    if (last?.role === "user") void runConversation(messages);
    else {
      const lastUser = [...messages].reverse().find((m) => m.role === "user");
      if (lastUser) void runConversation([...messages, lastUser]);
    }
  };

  return { messages, input, setInput, isLoading, error, send, retry };
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const { messages, input, setInput, isLoading, error, send, retry } = useChat();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to newest message
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading, open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  const copyMessage = async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <>
      {/* Floating button (bottom-right, clear of other floating UI) */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
        className="fixed bottom-5 right-5 z-[65] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-white via-zinc-200 to-emerald-300 text-black shadow-[0_8px_30px_-6px_rgba(255,255,255,0.35)] sm:bottom-6 sm:right-6"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      {/* Chat panel: fullscreen on mobile, 400x600 bottom-right on desktop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Chat with Shubham's assistant"
            className="fixed inset-0 z-[75] flex flex-col bg-[#0b0b0e]/95 backdrop-blur-xl sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[600px] sm:w-[400px] sm:rounded-2xl sm:border sm:border-white/10 sm:shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                S
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  Ask me anything about Shubham
                </p>
                <p className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online — replies instantly
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <div>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    Hi! I can answer questions about Shubham&apos;s skills,
                    projects, internship and how to reach him. Try one of these:
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => send(q)}
                        disabled={isLoading}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[13px] text-zinc-300 transition-colors hover:border-white/25 hover:text-white disabled:opacity-50"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-sm text-black">
                      {m.content}
                    </p>
                  </div>
                ) : (
                  <div key={m.id} className="flex flex-col items-start">
                    <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-2.5 text-sm leading-relaxed text-zinc-200">
                      {m.content || (isLoading ? "…" : "")}
                    </p>
                    {m.content && (
                      <button
                        type="button"
                        onClick={() => copyMessage(m.id, m.content)}
                        aria-label="Copy message"
                        className="mt-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] text-zinc-500 transition-colors hover:text-zinc-200"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )
              )}

              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-red-400/20 bg-red-950/40 px-4 py-3">
                  <p className="text-sm text-red-200">{error}</p>
                  <button
                    type="button"
                    onClick={retry}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-red-400/30 px-3.5 py-1.5 text-[13px] font-medium text-red-100 transition-colors hover:bg-red-400/10"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Retry
                  </button>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-white/[0.07] p-3"
            >
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects..."
                  aria-label="Chat message"
                  maxLength={2000}
                  className="h-11 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/30"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all hover:bg-zinc-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
