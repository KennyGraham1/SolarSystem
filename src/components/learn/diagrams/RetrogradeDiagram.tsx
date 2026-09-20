"use client";

import { useId, useMemo, useState } from "react";
import { DEG, fmt, mod, r3, starField } from "../math";
import { ButtonGroup, Legend, Panel, PlayButton, Readout, Slider, useAnimationFrame, usePlayback } from "../shared";

const P_EARTH = 365.25, P_MARS = 686.98, A_MARS = 1.5237, INCL = 1.85;
export const SYNODIC_MARS = 1 / (1 / P_EARTH - 1 / P_MARS); // ≈ 779.9 days
const T_OPP = 390; // day of opposition in the slider range
const W = 440, H = 440, CX = 220, CY = 220, RE = 100, RM = RE * A_MARS, RSTAR = 200;
const SW = 460, SH = 460, SCX = 230, SCY = 110, PX_LON = 4.6, PX_LAT = 9; // sky strip (top) + longitude graph (bottom)
const GX0 = 44, GX1 = 448, GY0 = 262, GY1 = 430; // graph box
const STARS = starField(W, H, 90, 8);
const SKY_STARS = starField(SW, 230, 50, 9);

interface Sample {
  t: number;
  earth: { x: number; y: number };
  mars: { x: number; y: number; z: number };
  lon: number; // geocentric ecliptic longitude, degrees (screen-math frame)
  lat: number; // geocentric ecliptic latitude, degrees
  dist: number; // AU
}

/** Positions in a math frame (x right, y up), circular orbits, opposition at T_OPP toward +y. */
function sample(t: number, nodeOffset: number): Sample {
  const aE = (2 * Math.PI * (t - T_OPP)) / P_EARTH + Math.PI / 2;
  const aM = (2 * Math.PI * (t - T_OPP)) / P_MARS + Math.PI / 2;
  const earth = { x: Math.cos(aE), y: Math.sin(aE) };
  const flat = A_MARS * Math.cos(INCL * DEG);
  const mars = { x: flat * Math.cos(aM), y: flat * Math.sin(aM), z: A_MARS * Math.sin(INCL * DEG) * Math.sin(aM - nodeOffset) };
  const dx = mars.x - earth.x, dy = mars.y - earth.y;
  const rho = Math.hypot(dx, dy);
  return { t, earth, mars, lon: r3(Math.atan2(dy, dx) / DEG), lat: r3(Math.atan2(mars.z, rho) / DEG), dist: r3(Math.hypot(rho, mars.z)) };
}

const toScreen = (p: { x: number; y: number }, scale: number) => ({ x: r3(CX + p.x * scale), y: r3(CY - p.y * scale) });

export function RetrogradeDiagram() {
  const [t, setT] = useState(300);
  const [shape, setShape] = useState<"loop" | "zigzag">("loop");
  const { playing, reduced, toggle } = usePlayback();
  const id = useId();
  useAnimationFrame(playing, (dt) => setT((v) => (v + dt * 60) % 780));

  const nodeOffset = shape === "loop" ? 0 : Math.PI / 2;
  const { series, lonOpp, stationary, rel, relMin, relMax } = useMemo(() => {
    const series = Array.from({ length: 196 }, (_, i) => sample(i * 4, nodeOffset));
    const lonOpp = series[Math.round(T_OPP / 4)].lon;
    // cumulative (unwrapped) longitude: the graph, and the stationary points where its slope reverses
    const cum: number[] = [0];
    for (let i = 1; i < series.length; i++) {
      const d = mod(series[i].lon - series[i - 1].lon + 180, 360) - 180;
      cum.push(cum[i - 1] + d);
    }
    const stationary: number[] = [];
    for (let i = 1; i < series.length - 1; i++) {
      if (Math.sign(cum[i] - cum[i - 1]) !== Math.sign(cum[i + 1] - cum[i])) stationary.push(series[i].t);
    }
    const cumOpp = cum[Math.round(T_OPP / 4)];
    const rel = cum.map((c) => c - cumOpp);
    return { series, lonOpp, stationary, rel, relMin: Math.min(...rel), relMax: Math.max(...rel) };
  }, [nodeOffset]);
  const unwrap = (lon: number) => mod(lon - lonOpp + 180, 360) - 180; // relative to the opposition longitude
  const now = sample(t, nodeOffset);
  const prev = sample(t - 2, nodeOffset);
  const retro = unwrap(now.lon) < unwrap(prev.lon); // longitude decreasing = westward = retrograde

  const e = toScreen(now.earth, RE);
  const m = toScreen(now.mars, RE);
  // line of sight from Earth through Mars, extended to the star ring
  const ang = Math.atan2(m.y - e.y, m.x - e.x);
  const star = { x: r3(e.x + Math.cos(ang) * RSTAR * 1.6), y: r3(e.y + Math.sin(ang) * RSTAR * 1.6) };
  const ringHit = { x: r3(CX + RSTAR * Math.cos(now.lon * -DEG)), y: r3(CY + RSTAR * Math.sin(now.lon * -DEG)) };
  const trail = series.filter((s) => s.t <= t);
  const skyX = (lon: number) => r3(SCX - unwrap(lon) * PX_LON); // facing south: east on the left
  const skyY = (lat: number) => r3(SCY - lat * PX_LAT);
  const skyPath = trail.map((s) => `${skyX(s.lon).toFixed(1)},${skyY(s.lat).toFixed(1)}`).join(" ");
  const daysToOpp = T_OPP - t;
  const gx = (day: number) => r3(GX0 + (day / 780) * (GX1 - GX0));
  const gy = (deg: number) => r3(GY1 - ((deg - relMin) / (relMax - relMin)) * (GY1 - GY0));
  const graph = series.map((s, i) => `${gx(s.t)},${gy(rel[i])}`).join(" ");
  const idxNow = Math.min(series.length - 1, Math.round(t / 4));
  const relNow = rel[idxNow];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[1fr_1.05fr]">
        <Panel title="Earth laps Mars on the inside track" caption="orbits to scale (circular)">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Day ${fmt(t)}: Mars appears to move ${retro ? "backwards (retrograde)" : "forwards (prograde)"} against the stars.`}>
            <defs>
              <radialGradient id={`${id}-sun`}>
                <stop offset="0%" stopColor="#fff7d6" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </radialGradient>
            </defs>
            {STARS.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o * 0.5} />
            ))}
            <circle cx={CX} cy={CY} r={RSTAR} fill="none" stroke="#fff" strokeOpacity="0.25" />
            <text x={CX} y={CY - RSTAR - 6} textAnchor="middle" fill="#fff" fontSize="9" opacity="0.5">distant background stars</text>
            <circle cx={CX} cy={CY} r={RE} fill="none" stroke="#3b82f6" strokeOpacity="0.5" strokeDasharray="3 4" />
            <circle cx={CX} cy={CY} r={RM} fill="none" stroke="#c1562d" strokeOpacity="0.5" strokeDasharray="3 4" />
            <circle cx={CX} cy={CY} r={22} fill={`url(#${id}-sun)`} />
            <circle cx={CX} cy={CY} r={9} fill="#fde68a" />
            {/* where Mars has appeared on the star ring so far */}
            {trail.map((s, i) => {
              const p = { x: r3(CX + RSTAR * Math.cos(-s.lon * DEG)), y: r3(CY + RSTAR * Math.sin(-s.lon * DEG)) };
              return <circle key={s.t} cx={p.x} cy={p.y} r={1.8} fill="#f97316" opacity={0.25 + (0.7 * i) / Math.max(1, trail.length)} />;
            })}
            <line x1={e.x} y1={e.y} x2={star.x} y2={star.y} stroke="#fff" strokeOpacity="0.45" strokeDasharray="4 3" />
            <circle cx={ringHit.x} cy={ringHit.y} r={4} fill="none" stroke="#fff" strokeWidth="1.5" />
            <circle cx={e.x} cy={e.y} r={7} fill="#2468d6" stroke="#fff" strokeOpacity="0.6" />
            <circle cx={m.x} cy={m.y} r={5} fill="#c1562d" stroke="#fff" strokeOpacity="0.6" />
            <text x={e.x + 10} y={e.y + 4} fill="#93c5fd" fontSize="10">Earth</text>
            <text x={m.x + 9} y={m.y + 4} fill="#fdba74" fontSize="10">Mars</text>
            <text x={12} y={H - 12} fill="#fff" fontSize="10" opacity="0.6">Both orbit counter-clockwise; Earth is faster (30 km/s vs 24 km/s).</text>
          </svg>
        </Panel>

        <Panel title="Mars against the stars, night after night" caption="longitude and latitude at different scales">
          <svg viewBox={`0 0 ${SW} ${SH}`} className="h-auto w-full" role="img" aria-label={`Sky track of Mars: it drifts east, stops, moves west for about two months around opposition, then resumes eastward.`}>
            <rect width={SW} height={SH} fill="#05081a" />
            <rect x={0} y={0} width={SW} height={232} fill="#0a1024" />
            {SKY_STARS.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o * 0.6} />
            ))}
            <line x1={20} y1={SCY} x2={SW - 20} y2={SCY} stroke="#fff" strokeOpacity="0.2" />
            <text x={SW - 22} y={SCY - 6} textAnchor="end" fill="#fff" fontSize="9" opacity="0.5">ecliptic</text>
            {[-40, -20, 0, 20, 40].map((d) => (
              <g key={d}>
                <line x1={SCX - d * PX_LON} y1={SCY - 4} x2={SCX - d * PX_LON} y2={SCY + 4} stroke="#fff" strokeOpacity="0.4" />
                <text x={SCX - d * PX_LON} y={222} textAnchor="middle" fill="#fff" fontSize="9" opacity="0.5">{d === 0 ? "opposition" : `${d > 0 ? "+" : ""}${d}°`}</text>
              </g>
            ))}
            {[-5, 5].map((d) => (
              <text key={d} x={8} y={skyY(d) + 3} fill="#fff" fontSize="9" opacity="0.5">{d > 0 ? "+" : ""}{d}°</text>
            ))}
            <text x={SW - 12} y={16} textAnchor="end" fill="#fff" fontSize="9" opacity="0.6">← east · west → (facing south)</text>
            {skyPath && <polyline points={skyPath} fill="none" stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.8" />}
            {stationary.map((st) => {
              const s = sample(st, nodeOffset);
              return st <= t && <circle key={st} cx={skyX(s.lon)} cy={skyY(s.lat)} r={3.5} fill="none" stroke="#fff" strokeWidth="1.2" />;
            })}
            <circle cx={skyX(now.lon)} cy={skyY(now.lat)} r={5} fill="#c1562d" stroke="#fff" />
            {/* longitude vs time */}
            <text x={GX0} y={GY0 - 14} fill="#fff" fontSize="10" fontWeight="600" opacity="0.85">Mars&apos;s position along the ecliptic, day by day</text>
            <line x1={GX0} y1={GY1} x2={GX1} y2={GY1} stroke="#fff" strokeOpacity="0.25" />
            <line x1={GX0} y1={GY0} x2={GX0} y2={GY1} stroke="#fff" strokeOpacity="0.25" />
            {[0, 195, 390, 585, 780].map((d) => (
              <text key={d} x={gx(d)} y={GY1 + 13} textAnchor={d === 0 ? "start" : d === 780 ? "end" : "middle"} fill="#fff" fontSize="9" opacity="0.5">{d === 390 ? "opposition" : `day ${d}`}</text>
            ))}
            <text x={GX0 - 4} y={GY0 + 8} textAnchor="end" fill="#fff" fontSize="9" opacity="0.5">east</text>
            <text x={GX0 - 4} y={GY1} textAnchor="end" fill="#fff" fontSize="9" opacity="0.5">west</text>
            <polyline points={graph} fill="none" stroke="#f97316" strokeOpacity="0.35" strokeWidth="1.5" />
            <polyline points={series.filter((s) => s.t <= t).map((s, i) => `${gx(s.t)},${gy(rel[i])}`).join(" ")} fill="none" stroke="#f97316" strokeWidth="2" />
            {stationary.map((st) => (
              <circle key={st} cx={gx(st)} cy={gy(rel[Math.round(st / 4)])} r={3.5} fill="none" stroke="#fff" strokeWidth="1.2" />
            ))}
            <line x1={gx(t)} y1={GY0} x2={gx(t)} y2={GY1} stroke="#fbbf24" strokeOpacity="0.5" />
            <circle cx={gx(t)} cy={gy(relNow)} r={4.5} fill="#c1562d" stroke="#fff" />
            <text x={gx(T_OPP)} y={gy(rel[Math.round(T_OPP / 4)]) + 46} textAnchor="middle" fill="#fff" fontSize="9" opacity="0.6">the dip is the retrograde loop: ~{fmt(stationary.length === 2 ? stationary[1] - stationary[0] : 72)} days</text>
          </svg>
        </Panel>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <Slider label="Days (one Earth–Mars cycle ≈ 780 days)" min={0} max={780} step={1} value={t} onChange={setT} display={`day ${fmt(t)}`} ticks={["0", "opposition day 390", "780"]} />
        <PlayButton playing={playing} onToggle={toggle} reduced={reduced} label="the orbits" />
      </div>
      <ButtonGroup label="Geometry" value={shape} options={[{ value: "loop", label: "opposition far from Mars's node → loop" }, { value: "zigzag", label: "opposition near the node → S-shape" }]} onChange={setShape} />

      <div className="grid gap-2 sm:grid-cols-3">
        <Readout label="Mars is moving" value={retro ? "Westward — retrograde" : "Eastward — prograde"} hint={retro ? "Earth is overtaking it" : "its normal drift against the stars"} accent={retro} />
        <Readout label="Opposition" value={daysToOpp > 0 ? `in ${fmt(daysToOpp)} days` : daysToOpp < 0 ? `${fmt(-daysToOpp)} days ago` : "today"} hint="Sun, Earth and Mars in a line; Mars at its brightest" />
        <Readout label="Earth–Mars distance" value={`${fmt(now.dist, 2)} AU`} hint={`${fmt(now.dist * 149.6, 0)} million km`} />
      </div>
      <Legend items={[{ color: "#2468d6", label: "Earth" }, { color: "#c1562d", label: "Mars" }, { color: "#f97316", label: "where Mars appears among the stars" }, { color: "#fff", label: "stationary points" }]} />
    </div>
  );
}
