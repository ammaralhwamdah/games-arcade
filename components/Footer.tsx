import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" aria-label="GameVerse home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
              A growing collection of free online games. Play instantly in your browser —
              no downloads, no sign-ups, no hassle. All games are free forever.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Browse</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><Link className="hover:text-white" href="/games">All Games</Link></li>
              <li><Link className="hover:text-white" href="/games?sort=popular">Most Popular</Link></li>
              <li><Link className="hover:text-white" href="/games?sort=newest">Newest Games</Link></li>
              <li><Link className="hover:text-white" href="/games?category=racing">Racing Games</Link></li>
              <li><Link className="hover:text-white" href="/games?category=puzzle">Puzzle Games</Link></li>
              <li><Link className="hover:text-white" href="/blog">Blog &amp; Guides</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><Link className="hover:text-white" href="/about">About Us</Link></li>
              <li><Link className="hover:text-white" href="/rewards">Rewards &amp; Stars</Link></li>
              <li><Link className="hover:text-white" href="/contact">Contact Us</Link></li>
              <li><Link className="hover:text-white" href="/privacy">Privacy Policy</Link></li>
              <li><Link className="hover:text-white" href="/terms">Terms of Service</Link></li>
              <li><Link className="hover:text-white" href="/cookies">Cookie Policy</Link></li>
              <li><Link className="hover:text-white" href="/dmca">DMCA</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Follow Us</h3>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Join our community for updates, new releases and exclusive contests.
            </p>
            <div className="mt-4">
              <SocialLinks />
            </div>
            <Link
              href="https://www.youtube.com/@gameversepro11"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block overflow-hidden rounded-lg border border-white/10 transition hover:border-violet-500/50"
            >
              <img
                src="/youtube-banner.png"
                alt="GameVerse YouTube Channel"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <p>Play responsibly. Free online games for everyone.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
