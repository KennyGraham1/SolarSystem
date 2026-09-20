"use client";

import { useId, useState } from "react";
import { DEG, clock, fmt, mod, polar, r3, starField } from "../math";
import { ButtonGroup, Legend, Panel, PlayButton, Readout, Slider, useAnimationFrame, usePlayback } from "../shared";

export const SYNODIC = 29.53;
const W = 440, H = 400, CX = 240, CY = 200, ORBIT = 150, RE = 30, RM = 15;
const STARS = starField(W, H, 70, 5);

export const PHASES = ["New Moon", "Waxing crescent", "First quarter", "Waxing gibbous", "Full Moon", "Waning gibbous", "Third quarter", "Waning crescent"];
export const phaseName = (deg: number) => PHASES[Math.round(mod(deg, 360) / 45) % 8];

/**
 * SVG path of the lit part of a Moon disk of radius r, for an elongation angle
 * (0 = new, 90 = first quarter, 180 = full, 270 = third quarter), as seen from
 * the northern hemisphere: waxing phases are lit on the right.
 */
export function phasePath(r: number, elongationDeg: number) {
  const e = mod(elongationDeg, 360);
  const waxing = e <= 180;
  const rx = r3(Math.abs(Math.cos(e * DEG)) * r);
  const gibbous = e > 90 && e < 270;
  // Outer semicircle on the lit side, then the terminator ellipse back to the top.
  const side = waxing ? 1 : 0; // sweep flag for the outer arc: 1 = clockwise = right side
  const termSweep = waxing ? (gibbous ? 1 : 0) : gibbous ? 0 : 1;
  return `M 0 ${-r} A ${r} ${r} 0 0 ${side} 0 ${r} A ${rx} ${r} 0 0 ${termSweep} 0 ${-r}`;
}

export function MoonPhasesDiagram() {
  const [day, setDay] = useState(7.4);
  const { playing, reduced, toggle } = usePlayback();
  const id = useId();
  useAnimationFrame(playing, (dt) => setDay((d) => (d + dt * 3) % SYNODIC));

  const elong = (day / SYNODIC) * 360; // angle Sun–Earth–Moon, measured along the orbit
  const a = Math.PI - elong * DEG; // new Moon on the Sun's side (left); counter-clockwise on screen
  const moon = polar(CX, CY, ORBIT, a);
  const illuminated = r3((1 - Math.cos(elong * DEG)) / 2);
  const name = phaseName(elong);
  const riseHour = 6 + (day / SYNODIC) * 24;
  const near = polar(moon.x, moon.y, RM - 5, Math.atan2(CY - moon.y, CX - moon.x));

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[1.15fr_1fr]">
        <Panel title="Sun, Earth and Moon from above" caption="distances not to scale">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Day ${fmt(day, 1)} of the lunar month: ${name}, ${fmt(illuminated * 100)}% of the near side lit.`}>
            <defs>
              <clipPath id={`${id}-e`}>
                <circle cx={CX} cy={CY} r={RE} />
              </clipPath>
              <clipPath id={`${id}-m`}>
                <circle cx={moon.x} cy={moon.y} r={RM} />
              </clipPath>
            </defs>
            {STARS.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o * 0.5} />
            ))}
            {[-150, -100, -50, 0, 50, 100, 150].map((off) => (
              <line key={off} x1={6} y1={CY + off} x2={CX - ORBIT - 30} y2={CY + off} stroke="#fbbf24" strokeOpacity="0.35" strokeDasharray="6 5" />
            ))}
            <text x={10} y={CY - 165} fill="#fde68a" fontSize="11" fontWeight="600">SUNLIGHT</text>
            <circle cx={CX} cy={CY} r={ORBIT} fill="none" stroke="#fff" strokeOpacity="0.2" strokeDasharray="3 4" />
            {/* Earth */}
            <circle cx={CX} cy={CY} r={RE} fill="#1a4fb4" />
            <g clipPath={`url(#${id}-e)`}>
              <ellipse cx={CX - 8} cy={CY - 10} rx={12} ry={8} fill="#2f8f4e" opacity="0.8" />
              <ellipse cx={CX + 8} cy={CY + 10} rx={10} ry={7} fill="#2f8f4e" opacity="0.8" />
              <rect x={CX} y={CY - RE} width={RE} height={2 * RE} fill="#020617" opacity="0.72" />
            </g>
            <text x={CX} y={CY + RE + 14} textAnchor="middle" fill="#fff" fontSize="10" opacity="0.7">Earth (N pole up)</text>
            {/* orbit direction */}
            <path d={`M ${CX + ORBIT + 14} ${CY + 30} A ${ORBIT + 14} ${ORBIT + 14} 0 0 0 ${CX + ORBIT + 14} ${CY - 30}`} fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.5" />
            <path d={`M ${CX + ORBIT + 8} ${CY - 24} L ${CX + ORBIT + 14} ${CY - 30} L ${CX + ORBIT + 20} ${CY - 24}`} fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.5" />
            {/* eight phase positions */}
            {PHASES.map((p, i) => {
              const pos = polar(CX, CY, ORBIT, Math.PI - i * 45 * DEG);
              return <circle key={p} cx={pos.x} cy={pos.y} r={2} fill="#fff" opacity="0.35" />;
            })}
            {/* Moon: lit half always faces the Sun */}
            <circle cx={moon.x} cy={moon.y} r={RM} fill="#d6d6d6" />
            <g clipPath={`url(#${id}-m)`}>
              <rect x={moon.x} y={moon.y - RM} width={RM} height={2 * RM} fill="#111827" opacity="0.9" />
            </g>
            <circle cx={near.x} cy={near.y} r={2.5} fill="#f97316" stroke="#000" strokeWidth="0.5" />
            <line x1={CX} y1={CY} x2={moon.x} y2={moon.y} stroke="#fff" strokeOpacity="0.2" strokeDasharray="2 3" />
            <text x={moon.x} y={moon.y - RM - 8} textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="600">
              Moon · day {fmt(day, 1)}
            </text>
            <text x={CX - ORBIT - 8} y={CY + 4} textAnchor="end" fill="#fff" fontSize="9" opacity="0.5">new</text>
            <text x={CX} y={CY + ORBIT + 26} textAnchor="middle" fill="#fff" fontSize="9" opacity="0.5">first quarter</text>
            <text x={CX + ORBIT + 22} y={CY + 4} fill="#fff" fontSize="9" opacity="0.5">full</text>
            <text x={CX} y={CY - ORBIT - 12} textAnchor="middle" fill="#fff" fontSize="9" opacity="0.5">third quarter</text>
          </svg>
        </Panel>

        <Panel title="The Moon from Earth" caption="northern-hemisphere view">
          <svg viewBox="0 0 300 300" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`${name}: ${fmt(illuminated * 100)}% illuminated.`}>
            <defs>
              <radialGradient id={`${id}-glow`}>
                <stop offset="60%" stopColor="#fff" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
            </defs>
            {STARS.slice(0, 45).map((s, i) => (
              <circle key={i} cx={(s.x / W) * 300} cy={(s.y / H) * 300} r={s.r} fill="#fff" opacity={s.o * 0.6} />
            ))}
            <circle cx={150} cy={140} r={120} fill={`url(#${id}-glow)`} opacity={illuminated} />
            <g transform="translate(150 140)">
              <circle r={90} fill="#1f2530" />
              <circle r={90} fill="none" stroke="#fff" strokeOpacity="0.15" />
              {/* maria for orientation: the same face always points at us */}
              <path d={phasePath(90, elong)} fill="#e5e7eb" />
              <g opacity="0.55">
                <circle cx={-28} cy={-26} r={20} fill="#6b7280" />
                <circle cx={12} cy={-34} r={13} fill="#6b7280" />
                <circle cx={-8} cy={12} r={26} fill="#6b7280" />
                <circle cx={34} cy={20} r={12} fill="#6b7280" />
              </g>
              <path d={phasePath(90, elong)} fill="#fff" opacity="0.18" />
            </g>
            <text x={150} y={262} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="600" className="font-display">
              {name}
            </text>
            <text x={150} y={282} textAnchor="middle" fill="#fff" fontSize="11" opacity="0.6">
              {fmt(illuminated * 100)}% lit · rises ≈ {clock(riseHour)}
            </text>
          </svg>
        </Panel>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <Slider label="Day of the lunar month" min={0} max={SYNODIC} step={0.05} value={day} onChange={setDay} display={`day ${fmt(day, 1)}`} ticks={["0 new", "7.4", "14.8 full", "22.1", "29.5"]} />
        <PlayButton playing={playing} onToggle={toggle} reduced={reduced} label="the month" />
      </div>
      <ButtonGroup label="Jump to" value={name} options={PHASES.map((p) => ({ value: p, label: p }))} onChange={(p) => setDay((PHASES.indexOf(p) / 8) * SYNODIC)} />

      <div className="grid gap-2 sm:grid-cols-3">
        <Readout label="Phase" value={name} hint={`${fmt(illuminated * 100)}% of the near side is sunlit`} accent />
        <Readout label="Approximate moonrise" value={clock(riseHour)} hint="About 50 minutes later than yesterday" />
        <Readout label="Far side" value={`${fmt((1 - illuminated) * 100)}% sunlit`} hint="Half of the whole Moon is always in daylight" />
      </div>
      <Legend items={[{ color: "#f97316", label: "the same spot on the Moon, always facing Earth" }, { color: "#111827", label: "the Moon's night side" }, { color: "#6b7280", label: "dark maria (for orientation)" }]} />
    </div>
  );
}
