/** Small decorative SVG per topic for the index cards and prev/next links (server-safe, no ids). */
export function Thumbnail({ slug, accent, className = "" }: { slug: string; accent: string; className?: string }) {
  const common = { viewBox: "0 0 96 96", className, "aria-hidden": true as const };
  switch (slug) {
    case "day-and-night":
      return (
        <svg {...common}>
          <circle cx={48} cy={48} r={30} fill="#1a4fb4" />
          <path d="M48 18 A30 30 0 0 1 48 78 Z" fill="#020617" opacity="0.75" />
          <circle cx={48} cy={48} r={38} fill="none" stroke="#4f8dff" strokeOpacity="0.5" strokeDasharray="3 3" />
          {[-16, 0, 16].map((o) => (
            <line key={o} x1={2} y1={48 + o} x2={14} y2={48 + o} stroke={accent} strokeWidth="2" strokeLinecap="round" />
          ))}
          <circle cx={24} cy={30} r={4} fill={accent} stroke="#000" />
        </svg>
      );
    case "seasons":
      return (
        <svg {...common}>
          <ellipse cx={48} cy={50} rx={40} ry={22} fill="none" stroke="#fff" strokeOpacity="0.3" strokeDasharray="3 3" />
          <circle cx={48} cy={50} r={9} fill="#fbbf24" />
          {[{ x: 8, y: 50 }, { x: 88, y: 50 }].map((p, i) => (
            <g key={i} transform={`translate(${p.x} ${p.y})`}>
              <circle r={7} fill="#1a4fb4" />
              <line x1={-4} y1={-11} x2={4} y2={11} stroke="#fff" strokeWidth="1.5" transform="rotate(0)" />
            </g>
          ))}
          <circle cx={88} cy={50} r={7} fill={accent} opacity="0.35" />
        </svg>
      );
    case "moon-phases":
      return (
        <svg {...common}>
          {[0, 1, 2, 3].map((i) => {
            const cx = 16 + i * 21;
            const rx = [10, 5, 0, 5][i];
            const sweep = i < 2 ? 0 : 1;
            return (
              <g key={i} transform={`translate(${cx} 48)`}>
                <circle r={9} fill="#1f2530" />
                <path d={`M 0 -9 A 9 9 0 0 1 0 9 A ${rx} 9 0 0 ${sweep} 0 -9`} fill={i === 0 ? "#1f2530" : "#e5e7eb"} />
              </g>
            );
          })}
        </svg>
      );
    case "solar-eclipses":
      return (
        <svg {...common}>
          <circle cx={48} cy={48} r={34} fill={accent} opacity="0.25" />
          <circle cx={48} cy={48} r={26} fill={accent} opacity="0.5" />
          <circle cx={48} cy={48} r={21} fill="#fde68a" />
          <circle cx={48} cy={48} r={20} fill="#05081a" />
        </svg>
      );
    case "lunar-eclipses":
      return (
        <svg {...common}>
          <circle cx={48} cy={48} r={44} fill="#64748b" opacity="0.18" />
          <circle cx={48} cy={48} r={30} fill="#020617" stroke="#94a3b8" strokeOpacity="0.5" />
          <circle cx={56} cy={44} r={13} fill={accent} />
          <circle cx={52} cy={40} r={4} fill="#fff" opacity="0.15" />
          <circle cx={60} cy={50} r={3} fill="#000" opacity="0.2" />
        </svg>
      );
    case "tides":
      return (
        <svg {...common}>
          <ellipse cx={44} cy={50} rx={38} ry={24} fill={accent} opacity="0.45" />
          <circle cx={44} cy={50} r={22} fill="#1e3a8a" />
          <circle cx={88} cy={50} r={6} fill="#d6d6d6" />
        </svg>
      );
    case "retrograde-motion":
      return (
        <svg {...common}>
          <path d="M8 60 C 30 40, 40 40, 52 48 C 62 56, 60 66, 50 64 C 40 62, 44 48, 60 42 C 72 38, 82 36, 90 34" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={52} cy={48} r={4} fill={accent} />
          {[[14, 22], [70, 18], [84, 70], [26, 80]].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r={1.5} fill="#fff" opacity="0.7" />
          ))}
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x={6} y={40} width={84} height={44} fill={accent} opacity="0.25" />
          <line x1={10} y1={10} x2={70} y2={80} stroke="#fde68a" strokeWidth="3" strokeLinecap="round" />
          {[[38, 50, 0.6], [30, 66, 0.9], [50, 58, 0.5], [44, 74, 0.8], [58, 70, 0.7]].map(([x, y, o]) => (
            <line key={`${x}${y}`} x1={x} y1={y} x2={x + 8} y2={y - 6} stroke={accent} strokeWidth="2" strokeLinecap="round" opacity={o} />
          ))}
          <circle cx={78} cy={22} r={3} fill="#fff" />
        </svg>
      );
  }
}
