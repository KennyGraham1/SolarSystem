"use client";

import { useId, useState } from "react";
import { DEG, clamp, clock, fmt, mix, polar, r3, starField } from "../math";
import { Legend, Panel, PlayButton, Readout, Slider, useAnimationFrame, usePlayback } from "../shared";

const LAT = 40; // observer latitude (°N) for the horizon view, at an equinox
const W = 420, H = 380, CX = 240, CY = 190, R = 118, RA = 150; // top-down view
const HW = 420, HH = 380, HY = 236, PX_PER_DEG = 2.3; // horizon view
const STARS = starField(W, H, 60, 11);

/** Kasten & Young (1989) relative air mass for a solar altitude in degrees. */
function airMass(altDeg: number) {
  const z = 90 - altDeg;
  return 1 / (Math.cos(z * DEG) + 0.50572 * Math.pow(96.07995 - z, -1.6364));
}

function twilight(alt: number) {
  if (alt > 0) return { name: "Daylight", note: "The Sun is above the horizon." };
  if (alt > -6) return { name: "Civil twilight", note: "Bright enough to read outdoors; the brightest stars appear." };
  if (alt > -12) return { name: "Nautical twilight", note: "The horizon is still visible against the sky." };
  if (alt > -18) return { name: "Astronomical twilight", note: "Faint sky glow remains; the faintest stars are hidden." };
  return { name: "Night", note: "No sunlight reaches the atmosphere above you." };
}

export function DayNightDiagram() {
  const [hour, setHour] = useState(15);
  const { playing, reduced, toggle } = usePlayback();
  const id = useId();
  useAnimationFrame(playing, (dt) => setHour((h) => (h + dt * 2) % 24));

  // Hour angle: 0 at local noon, +15° per hour. Earth turns counter-clockwise seen from above the north pole.
  const Hdeg = (hour - 12) * 15;
  const a = Math.PI - Hdeg * DEG;
  const obs = polar(CX, CY, R, a);
  const onDaySide = Math.cos(a) < 0;
  // Sunlight travelling horizontally to the observer: the stretch inside the atmosphere ring.
  const dy = obs.y - CY;
  const entryX = r3(CX - Math.sqrt(Math.max(0, RA * RA - dy * dy)));
  const altitude = r3(Math.asin(Math.cos(LAT * DEG) * Math.cos(Hdeg * DEG)) / DEG); // equinox, δ = 0
  const am = altitude > 0 ? airMass(altitude) : null;
  const tw = twilight(altitude);

  // Horizon view geometry: east on the left, west on the right; the Sun returns beneath the horizon at night.
  const day = hour >= 6 && hour <= 18;
  const sx = r3(day ? 40 + ((hour - 6) / 12) * 340 : 380 - (((hour + 6) % 24) / 12) * 340);
  const sy = r3(HY - altitude * PX_PER_DEG);
  const skyTop = mix("#05081a", "#2f6fdc", (altitude + 12) / 22);
  const horizonCol =
    altitude > 12 ? mix("#ff9a3c", "#a9d3ff", (altitude - 12) / 25) : altitude > 0 ? mix("#ff6a2a", "#ff9a3c", altitude / 12) : altitude > -8 ? mix("#1b1440", "#ff6a2a", (altitude + 8) / 8) : mix("#05081a", "#1b1440", (altitude + 18) / 10);
  const sunCol = mix("#ff5a1f", "#fff6d5", clamp(altitude / 18, 0, 1));
  const starAlpha = clamp((-altitude - 4) / 12, 0, 1);

  const dayPath = Array.from({ length: 49 }, (_, i) => {
    const h = 6 + (i / 48) * 12;
    const alt = Math.asin(Math.cos(LAT * DEG) * Math.cos((h - 12) * 15 * DEG)) / DEG;
    return `${r3(40 + ((h - 6) / 12) * 340)},${r3(HY - alt * PX_PER_DEG)}`;
  }).join(" ");

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Earth from above the North Pole" caption="atmosphere drawn ~100× too thick">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Top-down view of Earth at ${clock(hour)} local time for the observer; the observer is on the ${onDaySide ? "day" : "night"} side.`}>
            <defs>
              <radialGradient id={`${id}-atm`}>
                <stop offset="78%" stopColor="#4f8dff" stopOpacity="0" />
                <stop offset="82%" stopColor="#4f8dff" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#4f8dff" stopOpacity="0.05" />
              </radialGradient>
              <linearGradient id={`${id}-ray`} x1="0" x2="1">
                <stop offset="0%" stopColor="#fff7d6" />
                <stop offset="100%" stopColor={onDaySide && altitude < 12 ? "#ff6a2a" : "#fff1b8"} />
              </linearGradient>
              <clipPath id={`${id}-earth`}>
                <circle cx={CX} cy={CY} r={R} />
              </clipPath>
            </defs>
            {STARS.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o * 0.5} />
            ))}
            {/* incoming sunlight */}
            {[-100, -60, -20, 20, 60, 100].map((off) => (
              <line key={off} x1={8} y1={CY + off} x2={CX - Math.sqrt(RA * RA - off * off) - 4} y2={CY + off} stroke="#fbbf24" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="6 5" />
            ))}
            <text x={12} y={CY - 118} fill="#fde68a" fontSize="11" fontWeight="600">SUNLIGHT</text>
            <circle cx={CX} cy={CY} r={RA} fill={`url(#${id}-atm)`} />
            <circle cx={CX} cy={CY} r={RA} fill="none" stroke="#4f8dff" strokeOpacity="0.35" strokeDasharray="3 4" />
            {/* Earth */}
            <circle cx={CX} cy={CY} r={R} fill="#1a4fb4" />
            <g clipPath={`url(#${id}-earth)`}>
              <ellipse cx={CX - 30} cy={CY - 40} rx={38} ry={26} fill="#2f8f4e" opacity="0.8" />
              <ellipse cx={CX + 20} cy={CY + 35} rx={44} ry={22} fill="#2f8f4e" opacity="0.8" />
              <ellipse cx={CX + 45} cy={CY - 55} rx={18} ry={30} fill="#2f8f4e" opacity="0.8" />
              <rect x={CX} y={CY - R} width={R} height={2 * R} fill="#020617" opacity="0.72" />
            </g>
            <line x1={CX} y1={CY - R} x2={CX} y2={CY + R} stroke="#fff" strokeOpacity="0.35" strokeDasharray="2 3" />
            <text x={CX + 8} y={CY - R + 14} fill="#fff" fontSize="10" opacity="0.5">terminator</text>
            <circle cx={CX} cy={CY} r={3} fill="#fff" opacity="0.7" />
            <text x={CX + 6} y={CY + 4} fill="#fff" fontSize="10" opacity="0.6">N pole</text>
            {/* rotation arrow (counter-clockwise on screen) */}
            <path d={`M ${CX + R + 18} ${CY} A ${R + 18} ${R + 18} 0 0 0 ${CX} ${CY - R - 18}`} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" />
            <path d={`M ${CX - 6} ${CY - R - 24} L ${CX} ${CY - R - 18} L ${CX - 6} ${CY - R - 12}`} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" />
            <text x={CX + 96} y={CY - R - 42} textAnchor="middle" fill="#fff" fontSize="10" opacity="0.6">spins west → east</text>
            {/* light path to the observer */}
            {onDaySide && (
              <>
                <line x1={8} y1={obs.y} x2={entryX} y2={obs.y} stroke="#fff7d6" strokeOpacity="0.55" strokeWidth="1.5" />
                <line x1={entryX} y1={obs.y} x2={obs.x} y2={obs.y} stroke={`url(#${id}-ray)`} strokeWidth="3" strokeLinecap="round" />
              </>
            )}
            {/* observer */}
            <line x1={CX} y1={CY} x2={obs.x} y2={obs.y} stroke="#fbbf24" strokeOpacity="0.5" strokeDasharray="3 3" />
            <circle cx={obs.x} cy={obs.y} r={6} fill="#fbbf24" stroke="#000" strokeWidth="1.5" />
            <text x={obs.x + (obs.x > CX ? 10 : -10)} y={obs.y + 4} textAnchor={obs.x > CX ? "start" : "end"} fill="#fde68a" fontSize="11" fontWeight="600">
              you · {clock(hour)}
            </text>
            <text x={CX - R - 6} y={CY + 4} textAnchor="end" fill="#fff" fontSize="10" opacity="0.6">noon</text>
            <text x={CX + R + 6} y={CY + 4} fill="#fff" fontSize="10" opacity="0.6">midnight</text>
            <text x={CX} y={CY - R - 30} textAnchor="middle" fill="#fff" fontSize="10" opacity="0.6">06:00 sunrise</text>
            <text x={CX} y={CY + R + 32} textAnchor="middle" fill="#fff" fontSize="10" opacity="0.6">18:00 sunset</text>
          </svg>
        </Panel>

        <Panel title={`Your sky, facing south (${LAT}°N, equinox)`} caption="east on the left, west on the right">
          <svg viewBox={`0 0 ${HW} ${HH}`} className="h-auto w-full" role="img" aria-label={`Horizon view: the Sun is ${altitude >= 0 ? `${fmt(altitude)}° above` : `${fmt(-altitude)}° below`} the horizon. ${tw.name}.`}>
            <defs>
              <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={skyTop} />
                <stop offset="100%" stopColor={horizonCol} />
              </linearGradient>
              <radialGradient id={`${id}-sun`}>
                <stop offset="0%" stopColor={sunCol} />
                <stop offset="45%" stopColor={sunCol} />
                <stop offset="100%" stopColor={sunCol} stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect x={0} y={0} width={HW} height={HY} fill={`url(#${id}-sky)`} />
            {STARS.slice(0, 40).map((s, i) => (
              <circle key={i} cx={s.x} cy={(s.y / H) * (HY - 10)} r={s.r} fill="#fff" opacity={s.o * starAlpha} />
            ))}
            <polyline points={dayPath} fill="none" stroke="#fff" strokeOpacity="0.25" strokeDasharray="3 4" />
            {/* Sun (drawn even below the horizon, faded, so its path is readable) */}
            <circle cx={sx} cy={sy} r={26} fill={`url(#${id}-sun)`} opacity={altitude > -2 ? 0.9 : 0.25} />
            <circle cx={sx} cy={sy} r={9} fill={sunCol} opacity={altitude > -2 ? 1 : 0.35} />
            {/* ground, drawn translucent so the Sun's path below the horizon stays readable */}
            <rect x={0} y={HY} width={HW} height={HH - HY} fill="#0b1220" opacity="0.85" />
            <path d={`M0 ${HY} Q 60 ${HY - 10} 120 ${HY} T 240 ${HY} T 360 ${HY} T 480 ${HY} V ${HY + 14} H 0 Z`} fill="#111a2c" />
            <line x1={0} y1={HY} x2={HW} y2={HY} stroke="#fff" strokeOpacity="0.35" />
            {/* twilight thresholds: how far below the horizon the Sun is */}
            {[
              { d: -6, label: "−6° civil twilight ends" },
              { d: -12, label: "−12° nautical twilight ends" },
              { d: -18, label: "−18° astronomical twilight ends · night" },
            ].map((l) => (
              <g key={l.d}>
                <line x1={0} y1={HY - l.d * PX_PER_DEG} x2={HW} y2={HY - l.d * PX_PER_DEG} stroke="#fff" strokeOpacity="0.18" strokeDasharray="3 4" />
                <text x={HW - 8} y={HY - l.d * PX_PER_DEG - 3} textAnchor="end" fill="#fff" fontSize="9" opacity="0.45">{l.label}</text>
              </g>
            ))}
            <text x={14} y={HY - 6} fill="#fff" fontSize="11" opacity="0.7">E</text>
            <text x={HW / 2} y={HY - 6} textAnchor="middle" fill="#fff" fontSize="11" opacity="0.7">S</text>
            <text x={HW - 14} y={HY - 6} textAnchor="end" fill="#fff" fontSize="11" opacity="0.7">W</text>
            <text x={12} y={18} fill="#fff" fontSize="12" fontWeight="600">{tw.name}</text>
            <text x={12} y={34} fill="#fff" fontSize="10" opacity="0.7">
              Sun {altitude >= 0 ? `${fmt(altitude)}° above` : `${fmt(-altitude)}° below`} the horizon
            </text>
            <text x={12} y={HH - 10} fill="#fff" fontSize="10" opacity="0.5">{clock(hour)} · the Sun continues beneath the horizon at night</text>
          </svg>
        </Panel>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <Slider label="Local time" min={0} max={24} step={0.05} value={hour} onChange={setHour} display={clock(hour)} ticks={["00:00", "06:00", "12:00", "18:00", "24:00"]} />
        <PlayButton playing={playing} onToggle={toggle} reduced={reduced} label="the day" />
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        <Readout label="Sky right now" value={tw.name} hint={tw.note} accent={altitude <= 0 && altitude > -18} />
        <Readout label="Air the sunlight crosses" value={am ? `${fmt(am, 1)}× the overhead amount` : "no direct sunlight"} hint={am ? (am > 5 ? "Long path: blue is scattered out, red gets through" : "Short path: most blue reaches you") : "The Sun is below your horizon"} />
        <Readout label="Sun colour you'd see" value={<span className="inline-flex items-center gap-2"><span className="h-3.5 w-3.5 rounded-full" style={{ background: sunCol }} />{altitude > 18 ? "white" : altitude > 6 ? "yellow-white" : altitude > 0 ? "orange-red" : "—"}</span>} />
      </div>
      <Legend items={[{ color: "#fbbf24", label: "observer" }, { color: "#4f8dff", label: "atmosphere" }, { color: "#020617", label: "night side" }]} />
    </div>
  );
}
