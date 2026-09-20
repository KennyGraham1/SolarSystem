"use client";

import { useId, useMemo, useState, type KeyboardEvent } from "react";
import type { Layer } from "@/lib/content";

const SIZE = 360;
const R = 164;
const MIN_BAND = 9; // px — keeps thin layers (crusts, cloud decks) selectable

interface Props {
  name: string;
  radiusKm: number;
  layers: Layer[];
}

/** Concentric cross-section: hover, click or tab through the layers. */
export function InteriorDiagram({ name, radiusKm, layers }: Props) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const gradId = useId();

  // Outer radius per layer, inflated so every band is at least MIN_BAND wide, then re-fitted to R.
  const radii = useMemo(() => {
    const out: number[] = [];
    let prev = 0;
    for (const l of layers) {
      const r = Math.max(l.radiusFraction * R, prev + MIN_BAND);
      out.push(r);
      prev = r;
    }
    const scale = R / (out[out.length - 1] || R);
    return out.map((r) => r * scale);
  }, [layers]);

  if (layers.length === 0) {
    return <p className="text-sm text-white/50">Interior structure for {name} is coming soon.</p>;
  }

  const shown = hover ?? active;
  const layer = layers[shown];
  const innerFrac = shown === 0 ? 0 : layers[shown - 1].radiusFraction;
  const c = SIZE / 2;

  const onKey = (e: KeyboardEvent<SVGElement>, i: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(i);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    }
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActive((a) => Math.min(layers.length - 1, a + 1));
    }
  };

  return (
    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-auto w-full max-w-[360px]" role="group" aria-label={`Cross-section of ${name}`}>
        <defs>
          <radialGradient id={`${gradId}-shade`} cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
          </radialGradient>
        </defs>
        {/* outermost first so inner layers paint on top */}
        {layers
          .map((l, i) => ({ l, i }))
          .reverse()
          .map(({ l, i }) => {
            const on = i === shown;
            return (
              <circle
                key={l.name}
                cx={c}
                cy={c}
                r={radii[i]}
                fill={l.color}
                stroke={on ? "#fff" : "rgba(0,0,0,0.35)"}
                strokeWidth={on ? 2.5 : 1}
                opacity={hover !== null && !on ? 0.55 : 1}
                style={{ cursor: "pointer", transition: "opacity 0.2s, stroke 0.2s" }}
                tabIndex={0}
                role="button"
                aria-label={`${l.name}: ${l.description}`}
                aria-pressed={i === active}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
              />
            );
          })}
        <circle cx={c} cy={c} r={R} fill={`url(#${gradId}-shade)`} pointerEvents="none" />
        {/* leader line + label for the highlighted layer */}
        {(() => {
          const rOuter = radii[shown];
          const rInner = shown === 0 ? 0 : radii[shown - 1];
          const rm = (rOuter + rInner) / 2;
          const ang = -Math.PI / 4;
          const x = c + Math.cos(ang) * rm;
          const y = c + Math.sin(ang) * rm;
          return (
            <g pointerEvents="none">
              <circle cx={x} cy={y} r={3.5} fill="#fff" />
              <line x1={x} y1={y} x2={SIZE - 8} y2={18} stroke="#fff" strokeOpacity="0.6" strokeWidth={1} />
              <text x={SIZE - 8} y={13} textAnchor="end" fill="#fff" fontSize="12" fontWeight="600">
                {layer.name}
              </text>
            </g>
          );
        })()}
      </svg>

      <div>
        <ol className="mb-5 flex flex-wrap gap-1.5" aria-label="Layers, from the centre outward">
          {layers.map((l, i) => (
            <li key={l.name}>
              <button
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition ${
                  i === shown ? "border-white/40 bg-white/15 text-white" : "border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full ring-1 ring-black/40" style={{ background: l.color }} />
                {l.name}
              </button>
            </li>
          ))}
        </ol>
        <div key={shown} className="animate-fade-in glass rounded-2xl p-5">
          <div className="eyebrow mb-1">Layer {shown + 1} of {layers.length}</div>
          <h3 className="font-display text-xl font-semibold text-white">{layer.name}</h3>
          {layer.detail && <p className="mt-1 text-sm text-amber-200/90">{layer.detail}</p>}
          <p className="mt-3 text-sm leading-relaxed text-white/75">{layer.description || "Details for this layer are coming soon."}</p>
          <p className="mt-3 text-xs text-white/45">
            Spans {Math.round(innerFrac * 100)}%–{Math.round(layer.radiusFraction * 100)}% of the radius · outer edge ≈{" "}
            {Math.round(layer.radiusFraction * radiusKm).toLocaleString("en-US")} km from the centre
          </p>
        </div>
      </div>
    </div>
  );
}
