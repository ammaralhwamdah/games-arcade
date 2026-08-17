import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/games";
import { SITE_NAME, SITE_EDITOR, SITE_FOUNDED_YEAR } from "@/lib/site";

export function generateMetadata(): Metadata {
  return {
    title: "About Us",
    description: "Learn about GameVerse — a growing collection of original, instant-play free online games. Our mission, our story and the team behind our browser games.",
    alternates: { canonical: "/about" },
  };
}

export default function AboutPage() {
  const catCount = getCategories().length;
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="mb-10 text-center">
        <span className="text-5xl" aria-hidden>🎮</span>
        <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">About GameVerse</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
          We believe the best games should be one click away — free, fast and fun for everyone.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-2xl border border-white/5 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white">Our Mission</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            GameVerse was created to solve a simple problem: finding good games online is often a
            maze of downloads, sign-ups and endless waiting. We built a single place where you can
            play <strong className="text-slate-200">free games</strong> instantly — directly in your browser,
            on any device, with zero friction.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            From arcade action to brain-teasing puzzles and head-to-head sports duels,
            our library spans <strong className="text-slate-200">{catCount} categories</strong> and is growing
            all the time.
          </p>
        </section>

        <section className="rounded-2xl border border-white/5 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white">Why Play on GameVerse?</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {[
              { icon: "⚡", t: "Instant Play", d: "Games load right in your browser. No downloads, no installs, no waiting." },
              { icon: "🎮", t: "Growing Library", d: "Original, hand-built games and counting — with more genres on the way." },
              { icon: "📱", t: "Any Device", d: "Play smoothly on desktop, tablet or phone — it just works." },
              { icon: "💯", t: "Always Free", d: "Every game is completely free. No paywalls, no hidden fees, ever." },
              { icon: "🛡️", t: "Safe & Simple", d: "Clean, ad-light experience with a focus on your safety and privacy." },
              { icon: "🔍", t: "Easy Discovery", d: "Smart search and category filters help you find your next favorite in seconds." },
            ].map((f) => (
              <div key={f.t} className="flex gap-3">
                <span className="text-2xl" aria-hidden>{f.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-white">{f.t}</h3>
                  <p className="mt-1 text-xs leading-6 text-slate-400">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/5 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white">Behind the Site</h2>
          <div className="mt-5 flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/40 to-cyan-500/40 text-2xl" aria-hidden>
              🧑‍💻
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">{SITE_EDITOR}</h3>
              <p className="text-xs text-slate-500">Founder &amp; Editor-in-Chief — GameVerse</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            {SITE_NAME} is run by {SITE_EDITOR}, who founded it in {SITE_FOUNDED_YEAR}. Every game in
            our library is hand-checked before it goes live: we test that it loads, that the controls
            work, and that it is suitable for all ages.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            To keep the catalog fresh, some game descriptions are drafted with the help of AI tools and
            then reviewed and edited by {SITE_EDITOR} before publishing. The information you see is
            verified against the game itself wherever possible, and anything reported as inaccurate is
            corrected quickly — just use the{" "}
            <Link href="/contact" className="font-semibold text-violet-300 underline underline-offset-2 hover:text-violet-200">
              contact page
            </Link>{" "}
            to tell us.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Every game on {SITE_NAME} is built in-house — original, exclusive and designed for
            instant browser play. We never host or claim ownership of third-party games, and we
            respond to all takedown requests through our{" "}
            <Link href="/dmca" className="font-semibold text-violet-300 underline underline-offset-2 hover:text-violet-200">
              DMCA page
            </Link>{" "}
            promptly.
          </p>
        </section>

        <section className="rounded-2xl border border-white/5 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white">How It Works</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-400">
            <li>Search or browse the library to find a game you like.</li>
            <li>Click any game — it loads instantly inside your browser.</li>
            <li>Play! Use the fullscreen button for an immersive experience.</li>
            <li>Discover similar games at the bottom of every game page.</li>
          </ol>
        </section>

        <section className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 to-cyan-600/10 p-6 text-center sm:p-8">
          <h2 className="text-xl font-bold text-white">Questions or Feedback?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            We&apos;d love to hear from you. Reach out any time — we read every message.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-bold text-[#fff] shadow-lg shadow-violet-500/25 transition-transform hover:scale-[1.02]"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
}
