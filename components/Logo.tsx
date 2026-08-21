export function GamepadMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gv-logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="gv-logo-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="61" height="61" rx="16" fill="url(#gv-logo-bg)" />
      <rect x="1.5" y="1.5" width="61" height="31" rx="16" fill="url(#gv-logo-glow)" />
      <rect x="7" y="22" width="50" height="22" rx="10" fill="#ffffff" />
      <rect x="20" y="27" width="5" height="15" rx="2" fill="#0f172a" />
      <rect x="13" y="34" width="19" height="5" rx="2" fill="#0f172a" />
      <circle cx="39.5" cy="33" r="3.6" fill="#0f172a" />
      <circle cx="48.5" cy="33" r="3.6" fill="#0f172a" />
      <circle cx="35.8" cy="38.5" r="2" fill="#334155" />
      <circle cx="44.5" cy="39.5" r="2" fill="#334155" />
    </svg>
  );
}

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <GamepadMark />
      {!compact && (
        <span className="text-xl font-extrabold tracking-tight text-white">
          Play<span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Krux</span>
        </span>
      )}
    </span>
  );
}
