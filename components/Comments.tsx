"use client";

import { useEffect, useState } from "react";

interface Comment {
  id: string;
  name: string;
  content: string;
  created_at: string;
}

function timeAgo(dateStr: string): string {
  const then = new Date(dateStr).getTime();
  if (!Number.isFinite(then)) return "";
  const diff = Date.now() - then;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  return new Date(then).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  const colors = ["#f43f5e", "#8b5cf6", "#06b6d4", "#f59e0b", "#22c55e", "#3b82f6", "#ec4899", "#14b8a6"];
  return colors[hash % colors.length];
}

export default function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/games/${encodeURIComponent(slug)}/comments`)
      .then((res) => (res.ok ? res.json() : { comments: [] }))
      .then((data) => {
        if (cancelled) return;
        setComments(data.comments ?? []);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSent("");
    if (!content.trim()) {
      setError("Please write a comment.");
      return;
    }
    setPosting(true);
    try {
      const res = await fetch(`/api/games/${encodeURIComponent(slug)}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not post your comment.");
        return;
      }
      setComments((prev) => [data.comment, ...prev]);
      setContent("");
      setSent("Thanks! Your comment has been posted.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPosting(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors focus:border-violet-500/60";

  return (
    <section className="mt-8 rounded-2xl border border-white/5 bg-slate-900/50 p-6" id="comments">
      <h2 className="text-lg font-bold text-white">
        Comments{" "}
        <span className="ml-1 rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-slate-400">
          {loading ? "…" : comments.length}
        </span>
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        Have something to say about this game? Drop a comment below.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            maxLength={50}
            className={inputCls}
          />
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your comment…"
            maxLength={1000}
            className={inputCls}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={posting}
            className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-2.5 text-sm font-bold text-[#fff] shadow-lg shadow-violet-500/25 transition-transform hover:scale-[1.02] disabled:opacity-50"
          >
            {posting ? "Posting…" : "Post Comment"}
          </button>
          {error && <span className="text-sm font-medium text-red-400">{error}</span>}
          {sent && <span className="text-sm font-medium text-green-400">{sent}</span>}
        </div>
      </form>

      {loading && <p className="mt-6 text-sm text-slate-500">Loading comments…</p>}

      {!loading && comments.length === 0 && (
        <p className="mt-6 text-sm text-slate-500">No comments yet. Be the first to share your thoughts!</p>
      )}

      {comments.length > 0 && (
        <ul className="mt-6 space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black text-[#fff]"
                style={{ background: avatarColor(c.name) }}
                aria-hidden
              >
                {(c.name.trim()[0] || "?").toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-sm font-bold text-white">{c.name}</span>
                  <span className="text-[11px] text-slate-500">{timeAgo(c.created_at)}</span>
                </div>
                <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-300">
                  {c.content}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
