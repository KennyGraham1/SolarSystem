"use client";

import { useId, useState } from "react";
import { fmt, starField } from "../math";
import { Legend, Panel, PlayButton, Readout, Slider, useAnimationFrame, usePlayback } from "../shared";

// Earth's shadow at the Moon's mean distance, in lunar radii (with the usual ~2% atmospheric enlargement).
const UMBRA = 2.7; // radius ≈ 4,700 km vs Moon 1,737 km
const PENUMBRA = 4.7; // radius ≈ 8,200 km
const SPEED = 2.1; // Moon radii per hour relative to the shadow (≈ 0.55°/h)

const W = 640, H = 260, AX = 130;
const SUN = { x: 56, r: 56 }, EARTH = { x: 300, r: 37 }, MOON = { x: 540, r: 10 };
const STARS = starField(W, H, 60, 33);

export function LunarEclipseDiagram() {
  const [hour, setHour] = useState(0);
  const [offset, setOffset] = useState(0.6);
  const { playing, reduced, toggle } = usePlayback();
  const id = useId();
  useAnimationFrame(playing, (dt) => setHour((h) => (h + dt * 1.2 > 4 ? -4 : h + dt * 1.2)));

  const x = hour * SPEED; // Moon centre along its path, lunar radii from the shadow axis
  const d = Math.hypot(x, offset); // distance from the shadow centre
  const inUmbra = d <= UMBRA - 1; // totally inside the umbra
  const touchesUmbra = d < UMBRA + 1;
  const touchesPen = d < PENUMBRA + 1;
  const type = inUmbra ? "Total" : touchesUmbra ? "Partial" : touchesPen ? "Penumbral" : "No eclipse";
  const umbralMag = Math.max(0, (UMBRA + 1 - d) / 2);
  const closest = Math.abs(offset);
  const maxType = closest <= UMBRA - 1 ? "total" : closest < UMBRA + 1 ? "partial" : closest < PENUMBRA + 1 ? "penumbral" : "none";
  const halfChord = (r: number) => (closest < r + 1 ? Math.sqrt((r + 1) ** 2 - closest ** 2) / SPEED : 0);
  const umbralHours = 2 * halfChord(UMBRA);
  const totalHours = closest < UMBRA - 1 ? (2 * Math.sqrt((UMBRA - 1) ** 2 - closest ** 2)) / SPEED : 0;

  // side view geometry (Earth and Moon share one scale; the gap is compressed)
  const kmPerPx = 1737.4 / MOON.r;
  const umbraAtMoon = UMBRA * MOON.r;
  const penAtMoon = PENUMBRA * MOON.r;
  const moonY = AX - hour * SPEED * MOON.r; // moving "up" the orbit in this view

  // cross-section
  const CW = 300, CH = 300, CC = 150, S = 26; // px per lunar radius

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
        <Panel title="Earth's shadow, from above" caption={`Earth and Moon to scale with each other; gap compressed ${fmt((384_400 / kmPerPx) / (MOON.x - EARTH.x))}×`}>
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`The Moon passes through Earth's shadow. Currently: ${type}.`}>
            <defs>
              <radialGradient id={`${id}-sun`}>
                <stop offset="0%" stopColor="#fff7d6" />
                <stop offset="60%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </radialGradient>
              <clipPath id={`${id}-earth`}>
                <circle cx={EARTH.x} cy={AX} r={EARTH.r} />
              </clipPath>
              <linearGradient id={`${id}-red`} x1="0" x2="1">
                <stop offset="0%" stopColor="#fff7d6" />
                <stop offset="35%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
            {STARS.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o * 0.5} />
            ))}
            {/* beam Sun → Earth */}
            <polygon points={`${SUN.x},${AX - SUN.r} ${EARTH.x},${AX - EARTH.r} ${EARTH.x},${AX + EARTH.r} ${SUN.x},${AX + SUN.r}`} fill="#fbbf24" opacity="0.14" />
            {/* light that misses Earth carries on past it, so the shadow reads as a gap in the glow */}
            <polygon points={`${SUN.x},${AX - SUN.r} ${W},${AX - SUN.r - 10} ${W},${AX - penAtMoon - 4} ${EARTH.x},${AX - EARTH.r}`} fill="#fbbf24" opacity="0.09" />
            <polygon points={`${SUN.x},${AX + SUN.r} ${W},${AX + SUN.r + 10} ${W},${AX + penAtMoon + 4} ${EARTH.x},${AX + EARTH.r}`} fill="#fbbf24" opacity="0.09" />
            {/* penumbra and umbra behind Earth, tapering to the real widths at the Moon */}
            <polygon points={`${EARTH.x},${AX - EARTH.r} ${W},${AX - penAtMoon - 4} ${W},${AX + penAtMoon + 4} ${EARTH.x},${AX + EARTH.r}`} fill="#475569" opacity="0.35" />
            <polygon points={`${EARTH.x},${AX - EARTH.r} ${W},${AX - umbraAtMoon + 3} ${W},${AX + umbraAtMoon - 3} ${EARTH.x},${AX + EARTH.r}`} fill="#070312" />
            <line x1={EARTH.x} y1={AX - EARTH.r} x2={W} y2={AX - umbraAtMoon + 3} stroke="#94a3b8" strokeOpacity="0.35" />
            <line x1={EARTH.x} y1={AX + EARTH.r} x2={W} y2={AX + umbraAtMoon - 3} stroke="#94a3b8" strokeOpacity="0.35" />
            {/* refracted, reddened rays bending into the umbra */}
            {[-1, 1].map((sgn) => (
              <path
                key={sgn}
                d={`M ${EARTH.x - 60} ${AX + sgn * (EARTH.r + 4)} L ${EARTH.x} ${AX + sgn * (EARTH.r + 3)} Q ${EARTH.x + 90} ${AX + sgn * (EARTH.r - 2)} ${MOON.x} ${AX + sgn * 2}`}
                fill="none"
                stroke={`url(#${id}-red)`}
                strokeWidth="2"
                strokeOpacity="0.9"
              />
            ))}
            <text x={EARTH.x - 90} y={AX + EARTH.r + 46} fill="#fca5a5" fontSize="10">red rays: sunlight refracted ≈1° by Earth&apos;s atmosphere, its blue scattered out</text>
            {/* Sun */}
            <circle cx={SUN.x} cy={AX} r={SUN.r + 30} fill={`url(#${id}-sun)`} opacity="0.6" />
            <circle cx={SUN.x} cy={AX} r={SUN.r} fill="#fde68a" />
            <text x={SUN.x} y={AX + SUN.r + 20} textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="600">Sun</text>
            {/* Earth with atmosphere */}
            <circle cx={EARTH.x} cy={AX} r={EARTH.r + 4} fill="none" stroke="#7dd3fc" strokeOpacity="0.5" strokeWidth="3" />
            <circle cx={EARTH.x} cy={AX} r={EARTH.r} fill="#1a4fb4" />
            <g clipPath={`url(#${id}-earth)`}>
              <ellipse cx={EARTH.x - 8} cy={AX - 12} rx={14} ry={9} fill="#2f8f4e" opacity="0.8" />
              <ellipse cx={EARTH.x + 10} cy={AX + 14} rx={15} ry={8} fill="#2f8f4e" opacity="0.8" />
              <rect x={EARTH.x} y={AX - EARTH.r} width={EARTH.r} height={2 * EARTH.r} fill="#020617" opacity="0.7" />
            </g>
            <text x={EARTH.x} y={AX + EARTH.r + 22} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">Earth</text>
            {/* Moon's path and Moon */}
            <line x1={MOON.x} y1={20} x2={MOON.x} y2={H - 20} stroke="#fff" strokeOpacity="0.2" strokeDasharray="3 3" />
            <circle cx={MOON.x} cy={moonY} r={MOON.r} fill={type === "Total" ? "#b91c1c" : type === "Partial" ? "#9a3412" : type === "Penumbral" ? "#a8a29e" : "#e5e7eb"} stroke="#fff" strokeOpacity="0.5" />
            <text x={MOON.x + 16} y={moonY + 4} fill="#fff" fontSize="10" opacity="0.8">Moon · {fmt(hour, 1)} h</text>
            <text x={(EARTH.x + MOON.x) / 2 + 30} y={AX + 4} textAnchor="middle" fill="#fff" fontSize="10" opacity="0.7">umbra</text>
            <text x={(EARTH.x + MOON.x) / 2 + 30} y={AX - umbraAtMoon - 14} textAnchor="middle" fill="#cbd5e1" fontSize="10" opacity="0.7">penumbra</text>
          </svg>
        </Panel>

        <Panel title="Looking at the Moon" caption="cross-section of the shadow at the Moon">
          <svg viewBox={`0 0 ${CW} ${CH}`} className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`Cross-section: ${type}, umbral magnitude ${fmt(umbralMag, 2)}.`}>
            <defs>
              <clipPath id={`${id}-md`}>
                <circle cx={CC + x * S} cy={CC + offset * S} r={S} />
              </clipPath>
              <radialGradient id={`${id}-um`}>
                <stop offset="0%" stopColor="#7f1d1d" />
                <stop offset="75%" stopColor="#b91c1c" />
                <stop offset="100%" stopColor="#f97316" />
              </radialGradient>
            </defs>
            <rect width={CW} height={CH} fill="#05081a" />
            <circle cx={CC} cy={CC} r={PENUMBRA * S} fill="#64748b" opacity="0.18" stroke="#94a3b8" strokeOpacity="0.4" strokeDasharray="3 3" />
            <circle cx={CC} cy={CC} r={UMBRA * S} fill="#020617" opacity="0.9" stroke="#94a3b8" strokeOpacity="0.5" />
            <text x={CC} y={CC - UMBRA * S - 6} textAnchor="middle" fill="#cbd5e1" fontSize="9" opacity="0.7">umbra</text>
            <text x={CC} y={CC - PENUMBRA * S + 12} textAnchor="middle" fill="#cbd5e1" fontSize="9" opacity="0.5">penumbra</text>
            <line x1={10} y1={CC + offset * S} x2={CW - 10} y2={CC + offset * S} stroke="#fff" strokeOpacity="0.2" strokeDasharray="2 4" />
            {/* Moon: full disk, then shadow overlays clipped to it */}
            <circle cx={CC + x * S} cy={CC + offset * S} r={S} fill="#e5e7eb" />
            <g clipPath={`url(#${id}-md)`}>
              <circle cx={CC} cy={CC} r={PENUMBRA * S} fill="#000" opacity="0.35" />
              <circle cx={CC} cy={CC} r={UMBRA * S} fill={`url(#${id}-um)`} opacity="0.97" />
            </g>
            <text x={CC} y={CH - 12} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600">{type}</text>
          </svg>
        </Panel>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:items-end">
        <Slider label="Time from mid-eclipse" min={-4} max={4} step={0.05} value={hour} onChange={setHour} display={`${hour >= 0 ? "+" : "−"}${fmt(Math.abs(hour), 2)} h`} ticks={["−4 h", "−2 h", "0", "+2 h", "+4 h"]} />
        <Slider label="How far the full Moon is from the node (offset from the shadow's centre)" min={0} max={6} step={0.05} value={offset} onChange={setOffset} display={`${fmt(offset, 2)} Moon radii`} ticks={["central", "1.7 total limit", "3.7 partial limit", "5.7 penumbral limit", ""]} />
      </div>
      <PlayButton playing={playing} onToggle={toggle} reduced={reduced} label="the eclipse" />

      <div className="grid gap-2 sm:grid-cols-4">
        <Readout label="Right now" value={type} hint={touchesUmbra ? `umbral magnitude ${fmt(umbralMag, 2)}` : "magnitude counts how deep into the umbra"} accent />
        <Readout label="This eclipse at best" value={maxType === "none" ? "No eclipse" : `${maxType[0].toUpperCase()}${maxType.slice(1)}`} hint="depends only on the offset" />
        <Readout label="Time in the umbra" value={umbralHours > 0 ? `${fmt(umbralHours, 1)} h` : "—"} hint="partial phases included" />
        <Readout label="Totality" value={totalHours > 0 ? `${fmt(totalHours * 60)} min` : "—"} hint="up to ≈ 1 h 45 min for a central eclipse" />
      </div>
      <Legend items={[{ color: "#020617", label: "umbra (≈ 2.7 Moon radii)" }, { color: "#64748b", label: "penumbra (≈ 4.7 Moon radii)" }, { color: "#b91c1c", label: "Moon lit only by refracted red light" }]} />
    </div>
  );
}
