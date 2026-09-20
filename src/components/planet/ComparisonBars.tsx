import type { Comparison } from "@/lib/content";
import { formatNumber, formatRatio } from "@/lib/format";

const EARTH_COLOR = "#3b82f6";

/** Bar length as a fraction of the row width; log scale once the two values differ by more than 25×. */
function widths(value: number, earth: number) {
  const lo = Math.min(value, earth);
  const hi = Math.max(value, earth);
  if (lo <= 0) {
    // Temperatures and other signed quantities: size by magnitude, no log scale.
    const m = Math.max(Math.abs(value), Math.abs(earth)) || 1;
    return { body: Math.abs(value) / m, earth: Math.abs(earth) / m, log: false };
  }
  if (hi / lo <= 25) return { body: value / hi, earth: earth / hi, log: false };
  const span = Math.log10(hi / lo) + 1;
  return { body: (Math.log10(value / lo) + 1) / span, earth: (Math.log10(earth / lo) + 1) / span, log: true };
}

/** "9.14× Earth", or a signed difference when a ratio makes no sense (°C, negatives). */
function headline(c: Comparison) {
  const signed = c.value <= 0 || c.earth <= 0 || /°/.test(c.unit);
  if (!signed) return `${formatRatio(c.value / c.earth)} Earth`;
  const d = c.value - c.earth;
  if (d === 0) return "Same as Earth";
  return `${d > 0 ? "+" : "−"}${formatNumber(Math.abs(d))} ${c.unit} vs Earth`;
}

export function ComparisonBars({ name, color, comparisons }: { name: string; color: string; comparisons: Comparison[] }) {
  if (comparisons.length === 0) return <p className="text-sm text-white/50">Comparison data is coming soon.</p>;
  const isEarth = name === "Earth";
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-6 rounded-full" style={{ background: color }} /> {name}
        </span>
        {!isEarth && (
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-6 rounded-full" style={{ background: EARTH_COLOR }} /> Earth
          </span>
        )}
      </div>
      <ul className="space-y-4">
        {comparisons.map((c) => {
          const w = widths(c.value, c.earth);
          return (
            <li key={c.label} className="glass rounded-2xl p-4">
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium text-white">{c.label}</span>
                <span className="font-display text-base font-semibold text-amber-200" title={`${name} compared with Earth`}>
                  {headline(c)}
                  {w.log && <span className="ml-2 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-normal text-white/50">log scale</span>}
                </span>
              </div>
              <Bar label={name} width={w.body} color={color} value={`${formatNumber(c.value)} ${c.unit}`} />
              {!isEarth && <Bar label="Earth" width={w.earth} color={EARTH_COLOR} value={`${formatNumber(c.earth)} ${c.unit}`} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Bar({ label, width, color, value }: { label: string; width: number; color: string; value: string }) {
  return (
    <div className="mt-1.5 grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-3 text-xs">
      <span className="truncate text-white/50">{label}</span>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
        <div className="h-full rounded-full" style={{ width: `${Math.max(1.5, width * 100)}%`, background: color, boxShadow: `0 0 12px ${color}66` }} />
      </div>
      <span className="font-mono tabular-nums text-white/80">{value}</span>
    </div>
  );
}
