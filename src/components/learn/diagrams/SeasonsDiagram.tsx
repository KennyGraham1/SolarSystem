"use client";

import { useId, useState } from "react";
import { DEG, clamp, dayLabel, fmt, r3, starField } from "../math";
import { ButtonGroup, Legend, Panel, PlayButton, Readout, Slider, useAnimationFrame, usePlayback } from "../shared";

const TILT = 23.44;
const OW = 520, OH = 330, SX = 260, SY = 165, ORX = 160, ORY = 95; // orbit view
const EW = 320, EH = 320, EX = 172, EY = 160, ER = 100; // side view
const STARS = starField(OW, OH, 70, 3);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Solar declination (°) for a day of year, 0 = 1 Jan. Equinox ≈ day 80, June solstice ≈ 171. */
export const declination = (day: number) => r3(TILT * Math.sin(((360 * (day - 80)) / 365) * DEG));

/** Hours of daylight at latitude φ for declination δ (both in degrees). */
export function dayLength(latDeg: number, decDeg: number) {
  const x = -Math.tan(latDeg * DEG) * Math.tan(decDeg * DEG);
  if (x <= -1) return 24;
  if (x >= 1) return 0;
  return r3((2 * Math.acos(x)) / DEG / 15);
}

/** Earth–Sun distance in million km (Kepler-lite: perihelion on 3 Jan). */
const sunDistance = (day: number) => r3(149.6 * (1 - 0.0167 * Math.cos(((2 * Math.PI) * (day - 2)) / 365.25)));

/** Orbital angle: June solstice on the left of the Sun, motion counter-clockwise seen from north. */
const orbitAngle = (day: number) => ((day - 171) / 365.25) * 2 * Math.PI;
const earthPos = (day: number) => ({ x: r3(SX - ORX * Math.cos(orbitAngle(day))), y: r3(SY + ORY * Math.sin(orbitAngle(day))) });

function season(day: number, north: boolean) {
  const d = day % 365;
  const n = d < 79 ? "Winter" : d < 171 ? "Spring" : d < 265 ? "Summer" : d < 355 ? "Autumn" : "Winter";
  if (north) return n;
  return { Winter: "Summer", Spring: "Autumn", Summer: "Winter", Autumn: "Spring" }[n]!;
}

const LAT_PRESETS: { value: string; label: string; lat: number }[] = [
  { value: "equator", label: "Equator 0°", lat: 0 },
  { value: "cairo", label: "Cairo 30°N", lat: 30 },
  { value: "london", label: "London 51.5°N", lat: 51.5 },
  { value: "tromso", label: "Tromsø 69.6°N", lat: 69.6 },
  { value: "capetown", label: "Cape Town 34°S", lat: -34 },
];

export function SeasonsDiagram() {
  const [day, setDay] = useState(171);
  const [lat, setLat] = useState(51.5);
  const { playing, reduced, toggle } = usePlayback();
  const id = useId();
  useAnimationFrame(playing, (dt) => setDay((d) => (d + dt * 40) % 365));

  const dec = declination(day);
  const hours = dayLength(lat, dec);
  const earth = earthPos(day);
  const dist = sunDistance(day);
  const preset = LAT_PRESETS.find((p) => Math.abs(p.lat - lat) < 0.01)?.value ?? "custom";

  // Side view: Sun on the left; the axis leans toward the Sun by the declination.
  const ax = { x: r3(-Math.sin(dec * DEG)), y: r3(-Math.cos(dec * DEG)) }; // unit vector toward the north pole
  const px = { x: r3(-Math.cos(dec * DEG)), y: r3(Math.sin(dec * DEG)) }; // toward local noon on a latitude circle
  const latLine = (phi: number) => {
    const s = r3(Math.sin(phi * DEG));
    const h = r3(ER * Math.cos(phi * DEG));
    const c = { x: EX + ax.x * ER * s, y: EY + ax.y * ER * s };
    return { noon: { x: r3(c.x + px.x * h), y: r3(c.y + px.y * h) }, mid: { x: r3(c.x - px.x * h), y: r3(c.y - px.y * h) } };
  };
  const L = latLine(lat);
  // Where the latitude line crosses the terminator (x = EX): parameter along noon→midnight.
  const tCross = L.mid.x !== L.noon.x ? clamp((EX - L.noon.x) / (L.mid.x - L.noon.x), 0, 1) : hours > 12 ? 1 : 0;
  const cross = { x: r3(L.noon.x + (L.mid.x - L.noon.x) * tCross), y: r3(L.noon.y + (L.mid.y - L.noon.y) * tCross) };
  const lit = L.noon.x < EX; // noon point on the day side

  // Orbit-view Earth: lit half faces the Sun.
  const toSun = r3(Math.atan2(SY - earth.y, SX - earth.x) / DEG);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[3fr_2fr]">
        <Panel title="Earth's orbit, seen from above" caption="sizes not to scale · axis always points the same way">
          <svg viewBox={`0 0 ${OW} ${OH}`} className="h-auto w-full" role="img" aria-label={`Earth on ${dayLabel(day)}: the ${dec >= 0 ? "northern" : "southern"} hemisphere leans toward the Sun.`}>
            <defs>
              <radialGradient id={`${id}-sun`}>
                <stop offset="0%" stopColor="#fff7d6" />
                <stop offset="45%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </radialGradient>
              <clipPath id={`${id}-e`}>
                <circle r={13} />
              </clipPath>
            </defs>
            {STARS.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o * 0.5} />
            ))}
            <ellipse cx={SX} cy={SY} rx={ORX} ry={ORY} fill="none" stroke="#fff" strokeOpacity="0.25" strokeDasharray="4 4" />
            <circle cx={SX} cy={SY} r={40} fill={`url(#${id}-sun)`} />
            <circle cx={SX} cy={SY} r={18} fill="#fde68a" />
            {/* landmarks on the orbit */}
            {[
              { d: 171, label: "June solstice", dx: -14, dy: 4, anchor: "end" },
              { d: 354, label: "December solstice", dx: 14, dy: 4, anchor: "start" },
              { d: 79, label: "March equinox", dx: 0, dy: -14, anchor: "middle" },
              { d: 265, label: "September equinox", dx: 0, dy: 24, anchor: "middle" },
            ].map((m) => {
              const p = earthPos(m.d);
              return (
                <g key={m.label}>
                  <circle cx={p.x} cy={p.y} r={2.5} fill="#fff" opacity="0.6" />
                  <text x={p.x + m.dx} y={p.y + m.dy} textAnchor={m.anchor as "end"} fill="#fff" fontSize="9.5" opacity="0.65">
                    {m.label}
                  </text>
                </g>
              );
            })}
            {[
              { d: 2, label: "perihelion 3 Jan · 147.1 M km", dy: -12 },
              { d: 185, label: "aphelion 5 Jul · 152.1 M km", dy: 16 },
            ].map((m) => {
              const p = earthPos(m.d);
              return (
                <g key={m.label}>
                  <circle cx={p.x} cy={p.y} r={3} fill="none" stroke="#fbbf24" strokeWidth="1.2" />
                  <text x={p.x + (p.x > SX ? -10 : 10)} y={p.y + m.dy} textAnchor={p.x > SX ? "end" : "start"} fill="#fde68a" fontSize="9" opacity="0.85">
                    {m.label}
                  </text>
                </g>
              );
            })}
            {/* Earth with tilted axis (leans right on screen, always) */}
            <g transform={`translate(${earth.x} ${earth.y})`}>
              <g clipPath={`url(#${id}-e)`}>
                <circle r={13} fill="#1a4fb4" />
                <g transform={`rotate(${toSun})`}>
                  <rect x={-13} y={-13} width={13} height={26} fill="#020617" opacity="0.7" />
                </g>
              </g>
              <g transform={`rotate(${TILT})`}>
                <line x1={0} y1={-24} x2={0} y2={24} stroke="#fff" strokeWidth="1.5" strokeOpacity="0.9" />
                <text x={4} y={-26} fill="#fff" fontSize="9" opacity="0.8">N</text>
              </g>
            </g>
            <text x={earth.x} y={earth.y - 34} textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="600">
              {dayLabel(day)}
            </text>
          </svg>
        </Panel>

        <Panel title="Side view: who faces the Sun?" caption="sunlight from the left">
          <svg viewBox={`0 0 ${EW} ${EH}`} className="h-auto w-full" role="img" aria-label={`Side view of Earth. Declination ${fmt(dec, 1)} degrees; at latitude ${fmt(lat, 1)} the day lasts ${fmt(hours, 1)} hours.`}>
            <defs>
              <clipPath id={`${id}-s`}>
                <circle cx={EX} cy={EY} r={ER} />
              </clipPath>
            </defs>
            {[-70, -35, 0, 35, 70].map((off) => (
              <line key={off} x1={6} y1={EY + off} x2={EX - Math.sqrt(ER * ER - off * off) - 6} y2={EY + off} stroke="#fbbf24" strokeOpacity="0.4" strokeDasharray="5 4" />
            ))}
            <circle cx={EX} cy={EY} r={ER} fill="#1a4fb4" />
            <g clipPath={`url(#${id}-s)`}>
              <rect x={EX} y={EY - ER} width={ER} height={2 * ER} fill="#020617" opacity="0.72" />
            </g>
            {/* axis and reference circles (all seen edge-on as straight lines) */}
            <line x1={EX - ax.x * (ER + 22)} y1={EY - ax.y * (ER + 22)} x2={EX + ax.x * (ER + 22)} y2={EY + ax.y * (ER + 22)} stroke="#fff" strokeOpacity="0.8" strokeWidth="1.5" />
            <text x={EX + ax.x * (ER + 32)} y={EY + ax.y * (ER + 32) + 4} textAnchor="middle" fill="#fff" fontSize="10">N</text>
            <text x={EX - ax.x * (ER + 32)} y={EY - ax.y * (ER + 32) + 4} textAnchor="middle" fill="#fff" fontSize="10">S</text>
            {[{ phi: 0, label: "equator" }, { phi: 66.56, label: "Arctic circle" }, { phi: -66.56, label: "Antarctic circle" }].map((c) => {
              const l = latLine(c.phi);
              return (
                <g key={c.label}>
                  <line x1={l.noon.x} y1={l.noon.y} x2={l.mid.x} y2={l.mid.y} stroke="#fff" strokeOpacity="0.3" strokeDasharray="2 3" />
                  <text x={l.mid.x + 4} y={l.mid.y + 3} fill="#fff" fontSize="8.5" opacity="0.5">{c.label}</text>
                </g>
              );
            })}
            {/* chosen latitude: lit part amber, dark part grey */}
            <line x1={L.noon.x} y1={L.noon.y} x2={L.mid.x} y2={L.mid.y} stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
            {lit && <line x1={L.noon.x} y1={L.noon.y} x2={cross.x} y2={cross.y} stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />}
            <circle cx={L.noon.x} cy={L.noon.y} r={4.5} fill="#fff" stroke="#000" />
            <text x={L.noon.x - 8} y={L.noon.y - 8} textAnchor="end" fill="#fde68a" fontSize="10" fontWeight="600">
              {fmt(Math.abs(lat), 1)}°{lat >= 0 ? "N" : "S"} at noon
            </text>
            <line x1={EX} y1={EY - ER - 6} x2={EX} y2={EY + ER + 6} stroke="#fff" strokeOpacity="0.35" strokeDasharray="2 3" />
            <text x={EX + 4} y={EY + ER + 18} fill="#fff" fontSize="9" opacity="0.55">terminator</text>
            <text x={10} y={16} fill="#fde68a" fontSize="11" fontWeight="600">SUN →</text>
            <text x={EW - 8} y={16} textAnchor="end" fill="#fff" fontSize="10" opacity="0.7">
              axis leans {fmt(Math.abs(dec), 1)}° {dec >= 0 ? "toward" : "away from"} the Sun (north)
            </text>
          </svg>
        </Panel>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <Slider label="Date" min={0} max={364} step={1} value={day} onChange={setDay} display={dayLabel(day)} ticks={MONTHS.filter((_, i) => i % 2 === 0)} />
        <PlayButton playing={playing} onToggle={toggle} reduced={reduced} label="the year" />
      </div>
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <Slider label="Your latitude" min={-90} max={90} step={0.5} value={lat} onChange={setLat} display={`${fmt(Math.abs(lat), 1)}° ${lat >= 0 ? "N" : "S"}`} ticks={["90°S", "45°S", "0°", "45°N", "90°N"]} />
        <ButtonGroup label="Presets" value={preset} options={LAT_PRESETS} onChange={(v) => setLat(LAT_PRESETS.find((p) => p.value === v)?.lat ?? lat)} />
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Readout label="Daylight at your latitude" value={hours === 24 ? "24 h — midnight Sun" : hours === 0 ? "0 h — polar night" : `${Math.floor(hours)} h ${fmt((hours % 1) * 60)} min`} hint={`night: ${fmt(24 - hours, 1)} h`} accent />
        <Readout label="Sun's declination" value={`${fmt(dec, 1)}°`} hint={`Sun overhead at ${fmt(Math.abs(dec), 1)}°${dec >= 0 ? "N" : "S"} at noon`} />
        <Readout label="Season" value={`${season(day, true)} in the north`} hint={`${season(day, false)} in the south`} />
        <Readout label="Distance to the Sun" value={`${fmt(dist, 1)} million km`} hint={dist < 148.5 ? "Closest in early January — yet it is northern winter" : dist > 151.5 ? "Farthest in early July — northern summer" : "Only ±1.7% change over the year"} />
      </div>
      <p className="text-xs text-white/45">
        Sun&apos;s declination δ = 23.44° · sin(360° · (day − 81) / 365); daylight = 2 · arccos(−tan φ · tan δ) / 15 hours, where φ is your latitude. Both formulas are simplifications used in the diagram (no refraction, circular orbit for timing), good to about 10 minutes.
      </p>
      <Legend items={[{ color: "#fbbf24", label: "daylight on your latitude circle" }, { color: "#64748b", label: "night on your latitude circle" }, { color: "#020617", label: "night side" }]} />
    </div>
  );
}
