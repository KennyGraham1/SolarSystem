"use client";

import { useId, useState } from "react";
import { DEG, clock, fmt, polar, r3, starField } from "../math";
import { ButtonGroup, Legend, Panel, PlayButton, Readout, Slider, useAnimationFrame, usePlayback } from "../shared";

const SYNODIC = 29.53;
const W = 460, H = 400, CX = 230, CY = 200, R = 74, RW = R + 18, ORBIT = 178;
const A_MOON = 11, A_SUN = 5; // bulge amplitudes in px; the Sun's tide is 46% of the Moon's
const STARS = starField(W, H, 60, 44);

/** Water surface radius at angle θ (screen radians) for Moon direction θm; the Sun is on the left (θ = π). */
const surface = (theta: number, thetaM: number) => r3(RW + A_MOON * Math.cos(2 * (theta - thetaM)) + A_SUN * Math.cos(2 * (theta - Math.PI)));

export function TidesDiagram() {
  const [time, setTime] = useState({ day: 3.5, hour: 9 });
  const { day, hour } = time;
  const setDay = (d: number) => setTime((t) => ({ ...t, day: d }));
  const setHour = (h: number) => setTime((t) => ({ ...t, hour: h }));
  const [subtract, setSubtract] = useState<"raw" | "diff">("raw");
  const { playing, reduced, toggle } = usePlayback();
  const id = useId();
  useAnimationFrame(playing, (dt) =>
    setTime((t) => {
      const next = t.hour + dt * 4;
      return next >= 24 ? { day: (t.day + 1) % SYNODIC, hour: next - 24 } : { ...t, hour: next };
    }),
  );

  const thetaM = Math.PI - (day / SYNODIC) * 2 * Math.PI; // new Moon on the Sun's side
  const moon = polar(CX, CY, ORBIT, thetaM);
  // The observer sits on the equator; Earth turns west→east (counter-clockwise on screen), noon faces the Sun (left).
  const thetaObs = Math.PI - (hour - 12) * 15 * DEG;
  const obs = polar(CX, CY, R, thetaObs);
  const water = Array.from({ length: 121 }, (_, i) => {
    const th = (i / 120) * 2 * Math.PI;
    const p = polar(CX, CY, surface(th, thetaM), th);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");
  const heightAt = (h: number) => surface(Math.PI - (h - 12) * 15 * DEG, thetaM) - RW;
  const level = heightAt(hour);
  const range = r3(2 * Math.hypot(A_MOON + A_SUN * Math.cos(2 * (thetaM - Math.PI)), A_SUN * Math.sin(2 * (thetaM - Math.PI))));
  const springNeap = range > 2 * (A_MOON + A_SUN * 0.5) ? "Spring tides" : range < 2 * (A_MOON - A_SUN * 0.5) ? "Neap tides" : "In between";
  const phase = ["New Moon", "waxing", "First quarter", "waxing gibbous", "Full Moon", "waning gibbous", "Third quarter", "waning crescent"][Math.round((day / SYNODIC) * 8) % 8];

  // tide graph
  const GW = 460, GH = 150, GX0 = 40, GY0 = 20, GPW = 400, GPH = 100;
  const gx = (h: number) => r3(GX0 + (h / 24) * GPW);
  const gy = (v: number) => r3(GY0 + GPH / 2 - (v / (A_MOON + A_SUN)) * (GPH / 2) * 0.9);
  const curve = Array.from({ length: 97 }, (_, i) => `${gx(i / 4).toFixed(1)},${gy(heightAt(i / 4)).toFixed(1)}`).join(" ");

  // differential-gravity panel
  const DW = 460, DH = 170, DEX = 120, DEY = 92, DR = 50, DMX = 400;
  const pull = (x: number) => 1 / ((DMX - x) / 180) ** 2; // schematic 1/d² with an exaggerated distance ratio
  const pts = [
    { x: DEX - DR, label: "far side" },
    { x: DEX, label: "centre" },
    { x: DEX + DR, label: "near side" },
  ].map((p) => ({ ...p, f: r3(pull(p.x) * 80) }));
  const centreF = pts[1].f;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
        <Panel title="Two bulges, one spinning Earth" caption="from above the North Pole; bulges hugely exaggerated">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Day ${fmt(day, 1)} of the lunar month, ${clock(hour)}: ${springNeap.toLowerCase()}; the water at your location is ${level >= 0 ? "high" : "low"}.`}>
            <defs>
              <clipPath id={`${id}-e`}>
                <circle cx={CX} cy={CY} r={R} />
              </clipPath>
            </defs>
            {STARS.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o * 0.5} />
            ))}
            {[-60, -20, 20, 60].map((off) => (
              <line key={off} x1={6} y1={CY + off} x2={CX - ORBIT - 16} y2={CY + off} stroke="#fbbf24" strokeOpacity="0.35" strokeDasharray="6 5" />
            ))}
            <text x={10} y={CY - 70} fill="#fde68a" fontSize="11" fontWeight="600">SUN →</text>
            <circle cx={CX} cy={CY} r={ORBIT} fill="none" stroke="#fff" strokeOpacity="0.15" strokeDasharray="3 4" />
            {/* Moon's tidal axis */}
            <line x1={CX - (moon.x - CX) * 0.7} y1={CY - (moon.y - CY) * 0.7} x2={moon.x} y2={moon.y} stroke="#cbd5e1" strokeOpacity="0.3" strokeDasharray="2 4" />
            {/* water envelope */}
            <polygon points={water} fill="#3b82f6" opacity="0.55" stroke="#93c5fd" strokeWidth="1.5" />
            <circle cx={CX} cy={CY} r={R} fill="#1e3a8a" />
            <g clipPath={`url(#${id}-e)`}>
              <ellipse cx={CX - 18} cy={CY - 22} rx={22} ry={15} fill="#2f8f4e" opacity="0.7" />
              <ellipse cx={CX + 14} cy={CY + 22} rx={26} ry={13} fill="#2f8f4e" opacity="0.7" />
              <rect x={CX} y={CY - R} width={R} height={2 * R} fill="#020617" opacity="0.55" />
            </g>
            {/* Moon */}
            <circle cx={moon.x} cy={moon.y} r={12} fill="#d6d6d6" />
            <text x={moon.x} y={moon.y - 18} textAnchor="middle" fill="#fff" fontSize="10" opacity="0.8">Moon</text>
            {/* observer */}
            <line x1={CX} y1={CY} x2={obs.x} y2={obs.y} stroke="#fbbf24" strokeOpacity="0.5" strokeDasharray="3 3" />
            <circle cx={obs.x} cy={obs.y} r={5.5} fill="#fbbf24" stroke="#000" strokeWidth="1.5" />
            <text x={obs.x + (obs.x > CX ? 10 : -10)} y={obs.y + 4} textAnchor={obs.x > CX ? "start" : "end"} fill="#fde68a" fontSize="11" fontWeight="600">you · {clock(hour)}</text>
            <text x={CX} y={H - 14} textAnchor="middle" fill="#fff" fontSize="10" opacity="0.6">{phase} · {springNeap}</text>
          </svg>
        </Panel>

        <div className="space-y-4">
          <Panel title="Water level at your coast today" caption="two highs, two lows">
            <svg viewBox={`0 0 ${GW} ${GH}`} className="h-auto w-full" role="img" aria-label="Tide curve over 24 hours with two high tides and two low tides.">
              <line x1={GX0} y1={gy(0)} x2={GX0 + GPW} y2={gy(0)} stroke="#fff" strokeOpacity="0.2" />
              {[0, 6, 12, 18, 24].map((h) => (
                <g key={h}>
                  <line x1={gx(h)} y1={GY0} x2={gx(h)} y2={GY0 + GPH} stroke="#fff" strokeOpacity="0.08" />
                  <text x={gx(h)} y={GY0 + GPH + 16} textAnchor="middle" fill="#fff" fontSize="9" opacity="0.5">{clock(h)}</text>
                </g>
              ))}
              <text x={GX0 - 6} y={gy(A_MOON + A_SUN) + 4} textAnchor="end" fill="#fff" fontSize="9" opacity="0.5">high</text>
              <text x={GX0 - 6} y={gy(-(A_MOON + A_SUN)) + 4} textAnchor="end" fill="#fff" fontSize="9" opacity="0.5">low</text>
              <polyline points={curve} fill="none" stroke="#60a5fa" strokeWidth="2" />
              <line x1={gx(hour)} y1={GY0} x2={gx(hour)} y2={GY0 + GPH} stroke="#fbbf24" strokeOpacity="0.7" />
              <circle cx={gx(hour)} cy={gy(level)} r={4} fill="#fbbf24" stroke="#000" />
            </svg>
          </Panel>

          <Panel title="Where the bulges come from" caption="the Moon's pull, exaggerated">
            <svg viewBox={`0 0 ${DW} ${DH}`} className="h-auto w-full" role="img" aria-label={subtract === "raw" ? "The Moon pulls the near side hardest, the centre less and the far side least." : "Relative to the centre, the near side is pulled toward the Moon and the far side away from it: two bulges."}>
              <circle cx={DEX} cy={DEY} r={DR} fill="#1e3a8a" stroke="#93c5fd" strokeOpacity="0.5" />
              <circle cx={DMX} cy={DEY} r={14} fill="#d6d6d6" />
              <text x={DMX} y={DEY + 30} textAnchor="middle" fill="#fff" fontSize="10" opacity="0.7">Moon</text>
              {pts.map((p) => {
                const f = subtract === "raw" ? p.f : p.f - centreF;
                const x2 = p.x + f;
                return (
                  <g key={p.label}>
                    <circle cx={p.x} cy={DEY} r={3} fill="#fbbf24" />
                    {Math.abs(f) > 0.5 && (
                      <>
                        <line x1={p.x} y1={DEY} x2={x2} y2={DEY} stroke={f > 0 ? "#fbbf24" : "#f472b6"} strokeWidth="3" strokeLinecap="round" />
                        <polygon points={`${x2 + Math.sign(f) * 8},${DEY} ${x2},${DEY - 5} ${x2},${DEY + 5}`} fill={f > 0 ? "#fbbf24" : "#f472b6"} />
                      </>
                    )}
                    <text x={p.x} y={DEY + (p.label === "centre" ? -14 : 22)} textAnchor="middle" fill="#fff" fontSize="9" opacity="0.7">{p.label}</text>
                  </g>
                );
              })}
              <text x={12} y={DH - 10} fill="#fff" fontSize="10" opacity="0.6">
                {subtract === "raw" ? "Gravity weakens with distance: near side > centre > far side." : "Subtract the centre's pull: water is stretched both toward and away from the Moon."}
              </text>
            </svg>
            <div className="mt-2">
              <ButtonGroup label="Show" value={subtract} options={[{ value: "raw", label: "Moon's pull on each part" }, { value: "diff", label: "difference from the centre" }]} onChange={setSubtract} />
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:items-end">
        <Slider label="Day of the lunar month (spring ↔ neap)" min={0} max={SYNODIC} step={0.1} value={day} onChange={setDay} display={`day ${fmt(day, 1)} · ${phase}`} ticks={["new", "first quarter", "full", "third quarter", ""]} />
        <Slider label="Time of day (Earth turning under the bulges)" min={0} max={24} step={0.1} value={hour} onChange={setHour} display={clock(hour)} ticks={["00:00", "06:00", "12:00", "18:00", "24:00"]} />
      </div>
      <PlayButton playing={playing} onToggle={toggle} reduced={reduced} label="the day" />

      <div className="grid gap-2 sm:grid-cols-3">
        <Readout label="Tide at your location" value={level > (A_MOON + A_SUN) * 0.5 ? "High tide" : level < -(A_MOON + A_SUN) * 0.5 ? "Low tide" : level > 0 ? "Falling / rising, above mean" : "Falling / rising, below mean"} hint={`level ${level >= 0 ? "+" : "−"}${fmt(Math.abs(level) / (A_MOON + A_SUN), 2)} of the maximum`} accent />
        <Readout label="Tidal range now" value={springNeap} hint={`${fmt((range / (2 * (A_MOON + A_SUN))) * 100)}% of the spring-tide range`} />
        <Readout label="Time between high tides" value="12 h 25 min" hint="the Moon moves on while Earth turns, so each high tide comes ~50 min later than yesterday" />
      </div>
      <Legend items={[{ color: "#3b82f6", label: "ocean envelope (both bulges)" }, { color: "#fbbf24", label: "observer / pull toward the Moon" }, { color: "#f472b6", label: "net pull away from the Moon" }]} />
    </div>
  );
}
