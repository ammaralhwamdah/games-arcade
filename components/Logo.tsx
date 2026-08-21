export function GamepadMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="pk-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="pk-btn1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
        <linearGradient id="pk-btn2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>
        <filter id="pk-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Outer shield shape */}
      <path
        d="M32 3L58 16v20c0 14-11.2 22-26 25C17.2 58 6 50 6 36V16L32 3z"
        fill="url(#pk-bg)"
        opacity="0.15"
      />
      <path
        d="M32 5L56 17v19c0 13-10.5 21-24 24C18.5 57 8 49 8 36V17L32 5z"
        fill="url(#pk-bg)"
      />
      {/* Top gloss */}
      <path
        d="M32 5L56 17v12c0 8-4.5 14-12 17l-12 5-12-5c-7.5-3-12-9-12-17V17L32 5z"
        fill="url(#pk-btn2)"
        opacity="0.15"
      />
      {/* Controller body */}
      <rect x="14" y="24" width="36" height="16" rx="8" fill="#0f172a" />
      {/* Left grip */}
      <ellipse cx="16" cy="32" rx="5" ry="7" fill="#0f172a" />
      {/* Right grip */}
      <ellipse cx="48" cy="32" rx="5" ry="7" fill="#0f172a" />
      {/* D-pad */}
      <rect x="20" y="29" width="6" height="2" rx="1" fill="#334155" />
      <rect x="22" y="27" width="2" height="6" rx="1" fill="#334155" />
      {/* Action buttons - diamond layout */}
      <circle cx="43" cy="28.5" r="2" fill="url(#pk-btn1)" filter="url(#pk-glow)" />
      <circle cx="46.5" cy="32" r="2" fill="url(#pk-btn2)" filter="url(#pk-glow)" />
      <circle cx="43" cy="35.5" r="2" fill="#fbbf24" filter="url(#pk-glow)" />
      <circle cx="39.5" cy="32" r="2" fill="#34d399" filter="url(#pk-glow)" />
      {/* Center indicator */}
      <circle cx="32" cy="32" r="1.5" fill="#8b5cf6" filter="url(#pk-glow)" />
    </svg>
  );
}

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <GamepadMark />
      {!compact && (
        <span className="text-xl font-extrabold tracking-tight text-white">
          Play<span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Krux</span>
        </span>
      )}
    </span>
  );
}
