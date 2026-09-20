"use client";

import { useId, useState } from "react";
import { fmt, r3, seeded, wavelengthToRgb } from "../math";
import { ButtonGroup, Legend, Panel, PlayButton, Readout, Slider, useAnimationFrame, usePlayback } from "../shared";

const BARS = [400, 425, 450, 475, 500, 525, 550, 575, 600, 625, 650, 675, 700];
const rayleigh = (nm: number) => (700 / nm) ** 4; // relative to 700 nm red

// Scattering scene
const W = 480, H = 260;

export function ScatteringDiagram() {
  const [nm, setNm] = useState(450);
  const [when, setWhen] = useState<"noon" | "sunset">("noon");
  const id = useId();
  const factor = rayleigh(nm);
  const colour = wavelengthToRgb(nm);
  const rnd = seeded(nm); // scattered-photon positions change with wavelength, deterministic per value
  const nScatter = Math.round(6 + 26 * (factor / rayleigh(400)));
  const sunset = when === "sunset";
  const beamStart = sunset ? { x: 24, y: 150 } : { x: 300, y: 26 };
  const beamEnd = { x: 380, y: 200 }; // observer
  const scatterPts = Array.from({ length: nScatter }, () => {
    const s = rnd();
    const x = beamStart.x + (beamEnd.x - beamStart.x) * s;
    const y = beamStart.y + (beamEnd.y - beamStart.y) * s;
    const inAtm = y > 70;
    const a = rnd() * Math.PI * 2;
    const l = 16 + rnd() * 22;
    return inAtm ? { x: r3(x), y: r3(y), dx: r3(Math.cos(a) * l), dy: r3(Math.sin(a) * l) } : null;
  }).filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Sunlight scattered by air" caption="atmosphere ~100× too thick">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={sunset ? "At sunset the beam crosses a long stretch of air; blue is scattered away and red reaches the observer." : "At noon the beam crosses little air; scattered blue light reaches the observer from every direction."}>
            <defs>
              <linearGradient id={`${id}-atm`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id={`${id}-beam`} x1={beamStart.x} y1={beamStart.y} x2={beamEnd.x} y2={beamEnd.y} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fff7d6" />
                <stop offset="100%" stopColor={sunset ? "#f97316" : "#fff1b8"} />
              </linearGradient>
            </defs>
            <rect x={0} y={70} width={W} height={H - 100} fill={`url(#${id}-atm)`} />
            <rect x={0} y={70} width={W} height={H - 100} fill={sunset ? "#f97316" : "#3b82f6"} opacity={sunset ? 0.12 : 0.15} />
            {/* scattered light of the chosen colour arriving from other directions */}
            {!sunset &&
              [
                { x: 60, y: 90 },
                { x: 150, y: 110 },
                { x: 240, y: 80 },
                { x: 120, y: 170 },
              ].map((p) => <line key={`${p.x}-${p.y}`} x1={p.x} y1={p.y} x2={beamEnd.x - 6} y2={beamEnd.y + 8} stroke={colour} strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="5 4" />)}
            <text x={8} y={84} fill="#93c5fd" fontSize="10">top of the atmosphere</text>
            <rect x={0} y={H - 30} width={W} height={30} fill="#111a2c" />
            {/* sun and beam */}
            <circle cx={beamStart.x} cy={beamStart.y} r={sunset ? 22 : 20} fill={sunset ? "#fb923c" : "#fde68a"} opacity="0.95" />
            <line x1={beamStart.x} y1={beamStart.y} x2={beamEnd.x} y2={beamEnd.y} stroke={`url(#${id}-beam)`} strokeWidth="7" strokeLinecap="round" opacity="0.9" />
            {/* scattered photons of the chosen wavelength */}
            {scatterPts.map((p, i) => (
              <line key={i} x1={p.x} y1={p.y} x2={r3(p.x + p.dx)} y2={r3(p.y + p.dy)} stroke={colour} strokeWidth="2" strokeLinecap="round" opacity="0.85" />
            ))}
            {/* observer */}
            <circle cx={beamEnd.x} cy={beamEnd.y + 12} r={7} fill="#fbbf24" stroke="#000" strokeWidth="1.5" />
            <text x={beamEnd.x + 14} y={beamEnd.y + 16} fill="#fde68a" fontSize="10" fontWeight="600">you</text>
            <text x={8} y={H - 10} fill="#fff" fontSize="10" opacity="0.65">
              {sunset ? `Long path: ${nm} nm light is scattered out ${fmt(factor, 1)}× more readily than red, leaving orange-red.` : `Short path: scattered ${nm} nm light arrives from all over the sky.`}
            </text>
          </svg>
          <div className="mt-2">
            <ButtonGroup label="Sun" value={when} options={[{ value: "noon", label: "high (noon)" }, { value: "sunset", label: "on the horizon (sunset)" }]} onChange={setWhen} />
          </div>
        </Panel>

        <Panel title="Rayleigh scattering ∝ 1 / λ⁴" caption="relative to 700 nm red">
          <svg viewBox="0 0 480 260" className="h-auto w-full" role="img" aria-label={`Bar chart: ${nm} nm light is scattered ${fmt(factor, 1)} times more than 700 nm red.`}>
            {BARS.map((b, i) => {
              const h = r3((rayleigh(b) / rayleigh(400)) * 190);
              const x = 40 + i * 33;
              const on = Math.abs(b - nm) <= 12.5;
              return (
                <g key={b}>
                  <rect x={x} y={220 - h} width={26} height={h} fill={wavelengthToRgb(b)} opacity={on ? 1 : 0.55} stroke={on ? "#fff" : "none"} />
                  <text x={x + 13} y={236} textAnchor="middle" fill="#fff" fontSize="9" opacity="0.6">{b}</text>
                  {on && (
                    <text x={x + 13} y={214 - h} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">
                      {fmt(rayleigh(b), 1)}×
                    </text>
                  )}
                </g>
              );
            })}
            <line x1={36} y1={220} x2={470} y2={220} stroke="#fff" strokeOpacity="0.3" />
            <text x={252} y={254} textAnchor="middle" fill="#fff" fontSize="10" opacity="0.6">wavelength (nm)</text>
            <text x={12} y={30} fill="#fff" fontSize="10" opacity="0.6">more scattering ↑</text>
          </svg>
          <Slider className="mt-2" label="Wavelength" min={400} max={700} step={5} value={nm} onChange={setNm} display={`${nm} nm · ${fmt(factor, 2)}× red`} ticks={["400 violet", "550 green", "700 red"]} />
        </Panel>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        <Readout label="Chosen light" value={<span className="inline-flex items-center gap-2"><span className="h-3.5 w-3.5 rounded-full" style={{ background: colour }} />{nm} nm</span>} hint={`scattered ${fmt(factor, 2)}× more than 700 nm red`} accent />
        <Readout label="Why not violet?" value="Sunlight has less violet, and our eyes are less sensitive to it" hint="the mix of scattered colours reads as sky blue" />
        <Readout label="Sunset colours" value="Blue removed, red remains" hint="sunlight near the horizon crosses up to ~38× more air than overhead" />
      </div>
      <Legend items={[{ color: colour, label: "scattered photons of the chosen wavelength" }, { color: "#fde68a", label: "direct sunlight" }]} />
    </div>
  );
}

// ---- Twinkling ---------------------------------------------------------------

const TW = 480, TH = 230;
const CELLS = 18;

/** Smooth pseudo-random signal in [-1, 1] built from a few incommensurate sines. */
const noise = (t: number, seed: number) => r3((Math.sin(t * 7.1 + seed) + Math.sin(t * 11.3 + seed * 2.1) + Math.sin(t * 17.9 + seed * 3.7)) / 3);

export function TwinkleDiagram() {
  const [strength, setStrength] = useState(0.6);
  const [t, setT] = useState(0);
  const { playing, reduced, toggle } = usePlayback(true);
  useAnimationFrame(playing, (dt) => setT((v) => v + dt));

  const starFlicker = noise(t, 1) * strength; // single point source
  const planetFlicker = (Array.from({ length: 12 }, (_, i) => noise(t, 2 + i * 0.77)).reduce((a, b) => a + b, 0) / 12) * strength; // many points averaged
  const starR = 5 + 2.5 * starFlicker;
  const starDx = 5 * noise(t * 0.7, 5) * strength;
  const starDy = 5 * noise(t * 0.9, 6) * strength;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[3fr_2fr]">
      <Panel title="Twinkling: pockets of moving air bend starlight" caption="turbulence exaggerated">
        <svg viewBox={`0 0 ${TW} ${TH}`} className="h-auto w-full" role="img" aria-label="A star's single ray wobbles through turbulent air cells and flickers; a planet's many rays average out and stay steady.">
          <rect width={TW} height={TH} fill="#05081a" />
          {/* turbulence cells */}
          {Array.from({ length: CELLS }, (_, i) => {
            const x = 150 + (i % 6) * 32 + noise(t * 0.4, i) * 6 * strength;
            const y = 60 + Math.floor(i / 6) * 40 + noise(t * 0.5, i + 40) * 6 * strength;
            return <ellipse key={i} cx={x} cy={y} rx={16} ry={11} fill="none" stroke="#7dd3fc" strokeOpacity={0.15 + 0.25 * strength} />;
          })}
          <text x={230} y={36} textAnchor="middle" fill="#93c5fd" fontSize="10">warm and cool air cells, drifting</text>
          {/* star: one ray, bent by each cell */}
          <path d={`M 40 70 C 160 ${70 + 30 * starFlicker}, 260 ${70 - 30 * starFlicker}, 400 ${88 + starDy}`} fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.5" />
          <circle cx={40} cy={70} r={3} fill="#fff" />
          <text x={40} y={54} textAnchor="middle" fill="#fff" fontSize="10">star (a point)</text>
          {/* planet: many rays from a disk */}
          {[-8, -4, 0, 4, 8].map((o, i) => (
            <path key={o} d={`M 40 ${160 + o} C 160 ${160 + o + 24 * noise(t, 9 + i) * strength}, 260 ${160 + o - 24 * noise(t, 15 + i) * strength}, 400 ${160 + o * 0.6}`} fill="none" stroke="#fdba74" strokeOpacity="0.45" strokeWidth="1.2" />
          ))}
          <circle cx={40} cy={160} r={10} fill="#fdba74" />
          <text x={44} y={188} textAnchor="middle" fill="#fdba74" fontSize="10">planet (a disk)</text>
          {/* what the eye sees */}
          <rect x={400} y={40} width={70} height={170} rx={8} fill="#0b1220" stroke="#fff" strokeOpacity="0.15" />
          <text x={435} y={54} textAnchor="middle" fill="#fff" fontSize="9" opacity="0.6">what you see</text>
          <circle cx={435 + starDx} cy={88 + starDy} r={Math.max(1.5, starR)} fill="#fff" opacity={0.6 + 0.4 * starFlicker} />
          <circle cx={435} cy={160} r={9 + 0.6 * planetFlicker} fill="#fdba74" opacity={0.95 + 0.05 * planetFlicker} />
        </svg>
      </Panel>
      <div className="space-y-3">
        <div className="glass rounded-2xl p-4">
          <Slider label="Turbulence (the astronomer's 'seeing')" min={0} max={1} step={0.02} value={strength} onChange={setStrength} display={strength < 0.25 ? "calm" : strength < 0.6 ? "moderate" : "turbulent"} ticks={["calm, high in the sky", "", "hot, windy, near the horizon"]} />
          <div className="mt-3">
            <PlayButton playing={playing} onToggle={toggle} reduced={reduced} label="the air" />
          </div>
        </div>
        <Readout label="Star" value="Twinkles" hint="one beam, one path: each bend changes its brightness and colour" accent />
        <Readout label="Planet" value="Barely twinkles" hint="its disk sends many beams along slightly different paths; the flickers average out" />
      </div>
      </div>
    </div>
  );
}
