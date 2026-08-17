"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "General inquiry", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    const subject = encodeURIComponent(`[GameVerse] ${form.subject}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors focus:border-violet-500/60";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-slate-300">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className={inputCls}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-slate-300">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            className={inputCls}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold text-slate-300">
          Subject
        </label>
        <select
          id="subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={inputCls}
        >
          <option>General inquiry</option>
          <option>Report a broken game</option>
          <option>Advertising / partnerships</option>
          <option>Copyright / DMCA</option>
          <option>Suggest a game</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-slate-300">
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="How can we help you?"
          className={inputCls}
          required
        />
      </div>

      {error && <p className="text-sm font-medium text-red-400">{error}</p>}
      {sent && (
        <p className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300">
          Your email app is opening — please press send to complete your message. We usually reply within 24–48 hours.
        </p>
      )}

      <button
        type="submit"
        className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-bold text-[#fff] shadow-lg shadow-violet-500/25 transition-transform hover:scale-[1.02]"
      >
        Send Message
      </button>
    </form>
  );
}
