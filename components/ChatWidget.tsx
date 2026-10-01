"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CHAT_LIMIT, faqReply, type ChatMessage } from "@/lib/chat";

const questions = [
  "What is your stack?",
  "Available for hire?",
  "Tell me about your projects",
  "What tools do you use?",
];

export function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState("portfolio FAQ");
  const controller = useRef<AbortController | null>(null);
  const log = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages, busy]);
  useEffect(() => () => controller.current?.abort(), []);

  async function send(text: string) {
    const question = text.trim();
    if (!question || controller.current || question.length > CHAT_LIMIT) return;
    const next: ChatMessage[] = [
      ...messages,
      { role: "user" as const, content: question },
    ].slice(-9);
    const abort = new AbortController();
    controller.current = abort;
    setMessages(next);
    setInput("");
    setBusy(true);
    const timer = setTimeout(() => abort.abort(), 16000);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
        signal: abort.signal,
      });
      const data = await res.json();
      if (controller.current !== abort) return;
      setMessages([
        ...next,
        {
          role: "model",
          content:
            typeof data.reply === "string" ? data.reply : faqReply(question),
        },
      ]);
      setMode(res.ok && data.mode === "ai" ? "AI assistant" : "portfolio FAQ");
    } catch {
      if (controller.current !== abort) return;
      setMessages([...next, { role: "model", content: faqReply(question) }]);
      setMode("portfolio FAQ · local answer");
    } finally {
      clearTimeout(timer);
      if (controller.current === abort) {
        controller.current = null;
        setBusy(false);
        inputRef.current?.focus();
      }
    }
  }
  function stop() {
    controller.current?.abort();
    controller.current = null;
    setBusy(false);
    setMode("response stopped");
    inputRef.current?.focus();
  }
  function clear() {
    stop();
    setMessages([]);
    setInput("");
    setMode("portfolio FAQ");
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <div className="glass relative flex min-w-0 flex-col rounded-xl p-4 sm:p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-3 border-b border-dashed border-[var(--border)] pb-3 font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-dim)]">
        <div className="flex gap-1.5" aria-hidden="true">
          <i className="h-2 w-2 rounded-full bg-[var(--border-strong)]" />
          <i className="h-2 w-2 rounded-full bg-[var(--border-strong)]" />
          <i className="h-2 w-2 rounded-full bg-[var(--accent)]" />
        </div>
        <span>~/ask-kean</span>
        <button
          type="button"
          onClick={clear}
          className="cursor-pointer hover:text-[var(--accent)]"
        >
          clear ↺
        </button>
      </div>
      <div
        ref={log}
        role="log"
        aria-label="Conversation with portfolio assistant"
        aria-live="polite"
        className="h-[260px] overflow-y-auto py-5 pr-2 text-[13px] leading-relaxed sm:h-[280px]"
      >
        <div className="mb-5">
          <p className="mb-1 font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent)]">
            {"// hello, world"}
          </p>
          <p className="text-[var(--text)]">
            Curious about my work? Ask about my stack, projects, or background.
          </p>
          <p className="mt-2 text-[11px] text-[var(--text-dim)]">
            Answers grounded in this portfolio.
          </p>
        </div>
        {messages.map((message, index) => (
          <div key={index} className="mb-4 break-words">
            <p className="mb-1 font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-dim)]">
              {message.role === "user" ? "// you" : "// portfolio assistant"}
            </p>
            <p className="whitespace-pre-wrap text-[var(--text)]">
              {message.content}
            </p>
          </div>
        ))}
        {busy && (
          <p
            className="font-[family-name:var(--font-mono)] text-[var(--accent)]"
            role="status"
          >
            Finding an answer<span className="animate-pulse">…</span>
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-dashed border-[var(--border)] py-3">
        {questions.map((q) => (
          <button
            key={q}
            type="button"
            disabled={busy}
            onClick={() => void send(q)}
            className="cursor-pointer rounded border border-[var(--border)] bg-[var(--surface-2)] px-2 py-1.5 font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-40"
          >
            {q}
          </button>
        ))}
      </div>
      <form
        onSubmit={submit}
        className="flex items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--bg)] p-2.5 focus-within:border-[var(--accent)]"
      >
        <span aria-hidden="true" className="text-[var(--accent)]">
          ›
        </span>
        <input
          ref={inputRef}
          aria-label="Ask about Kean"
          placeholder="Ask a question…"
          value={input}
          maxLength={CHAT_LIMIT}
          onChange={(e) => setInput(e.target.value)}
          className="min-w-0 flex-1 bg-transparent font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-bright)] outline-none placeholder:text-[var(--text-faint)]"
        />
        {busy ? (
          <button
            type="button"
            onClick={stop}
            className="cursor-pointer text-xs text-[var(--accent)]"
          >
            stop ■
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="cursor-pointer rounded border border-[var(--border)] px-2 py-1 text-xs text-[var(--text)] disabled:opacity-40"
            aria-label="Send question"
          >
            ↵
          </button>
        )}
      </form>
      <p
        className="mt-2 font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-faint)]"
        aria-live="polite"
      >
        {mode} · {input.length}/{CHAT_LIMIT}
      </p>
    </div>
  );
}
