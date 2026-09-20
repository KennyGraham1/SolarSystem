"use client";

import { useId, useState } from "react";
import { DEG, fmt, mod, polar, r3, starField } from "../math";
import { ButtonGroup, Legend, Panel, PlayButton, Readout, Slider, useAnimationFrame, usePlayback } from "../shared";

const R_SUN = 695_700, R_MOON = 1737.4, R_EARTH = 6371; // km
const PERIGEE = 356_500, APOGEE = 406_700, MEAN = 384_400;
const SUN_DIST = { jan: 147.1e6, jul: 152.1e6 };

const W = 640, H = 270, AX = 135; // schematic side view
const SUN = { x: 60, r: 62 }, MOON = { x: 320, r: 15 }, EARTH = { x: 566, r: 46 };
const STARS = starField(W, H, 60, 21);

export function SolarEclipseDiagram() {
  const [dist, setDist] = useState(MEAN);
  const [season, setSeason] = useState<"jan" | "jul">("jul");
  const id = useId();

  const dSun = SUN_DIST[season];
  const umbraLen = (dSun * R_MOON) / (R_SUN - R_MOON); // Moon's umbra length, km
  const toSurface = dist - R_EARTH; // Moon centre → sub-lunar point on Earth
  const reaches = umbraLen >= toSurface;
  const umbraRadiusKm = R_MOON * (1 - toSurface / umbraLen); // negative → antumbra
  const moonArcmin = r3((2 * Math.atan(R_MOON / toSurface)) / DEG * 60); // as seen from the ground beneath the Moon
  const sunArcmin = r3((2 * Math.atan(R_SUN / dSun)) / DEG * 60);
  const ratio = moonArcmin / sunArcmin;

  // Schematic: the stretch Moon→Earth's surface maps to the real (dist − R_EARTH).
  const surfaceX = EARTH.x - EARTH.r;
  const pxPerKm = (surfaceX - MOON.x) / toSurface;
  const tipX = MOON.x + umbraLen * pxPerKm;
  // penumbra edges: from the Sun's limbs through the opposite Moon limbs
  const penSlope = (MOON.r + SUN.r) / (MOON.x - SUN.x);
  const penAtEarth = MOON.r + penSlope * (EARTH.x + EARTH.r - MOON.x);
  const umbSlope = MOON.r / (tipX - MOON.x);
  const farX = EARTH.x + EARTH.r + 20;

  // "What you would see" disks
  const VR = 62;
  const sunR = VR;
  const moonR = r3(VR * ratio);

  return (
    <div className="space-y-4">
      <Panel title="The Moon's shadow" caption="sizes and distances not to scale; the shadow's reach is">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Moon at ${fmt(dist)} km: its umbra ${reaches ? "reaches Earth, giving a total eclipse" : "ends before Earth, giving an annular eclipse"}.`}>
          <defs>
            <radialGradient id={`${id}-sun`}>
              <stop offset="0%" stopColor="#fff7d6" />
              <stop offset="60%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </radialGradient>
            <clipPath id={`${id}-earth`}>
              <circle cx={EARTH.x} cy={AX} r={EARTH.r} />
            </clipPath>
            <clipPath id={`${id}-moon`}>
              <circle cx={MOON.x} cy={AX} r={MOON.r} />
            </clipPath>
          </defs>
          {STARS.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o * 0.5} />
          ))}
          {/* sunlight beam to the Moon (internal tangents) */}
          <polygon points={`${SUN.x},${AX - SUN.r} ${MOON.x},${AX + MOON.r} ${MOON.x},${AX - MOON.r} ${SUN.x},${AX + SUN.r}`} fill="#fbbf24" opacity="0.08" />
          <polygon points={`${SUN.x},${AX - SUN.r} ${MOON.x},${AX - MOON.r} ${MOON.x},${AX + MOON.r} ${SUN.x},${AX + SUN.r}`} fill="#fbbf24" opacity="0.08" />
          {/* penumbra */}
          <polygon points={`${MOON.x},${AX - MOON.r} ${farX},${AX - penAtEarth - penSlope * 20} ${farX},${AX + penAtEarth + penSlope * 20} ${MOON.x},${AX + MOON.r}`} fill="#64748b" opacity="0.22" />
          {/* umbra */}
          <polygon points={`${MOON.x},${AX - MOON.r} ${tipX},${AX} ${MOON.x},${AX + MOON.r}`} fill="#020617" opacity="0.95" />
          {!reaches && (
            <polygon points={`${tipX},${AX} ${surfaceX},${AX - umbSlope * (surfaceX - tipX)} ${surfaceX},${AX + umbSlope * (surfaceX - tipX)}`} fill="#f97316" fillOpacity="0.08" stroke="#f97316" strokeOpacity="0.7" strokeDasharray="4 3" />
          )}
          <line x1={SUN.x} y1={AX - SUN.r} x2={farX} y2={AX - penAtEarth - penSlope * 20} stroke="#fbbf24" strokeOpacity="0.35" />
          <line x1={SUN.x} y1={AX + SUN.r} x2={farX} y2={AX + penAtEarth + penSlope * 20} stroke="#fbbf24" strokeOpacity="0.35" />
          {/* Sun */}
          <circle cx={SUN.x} cy={AX} r={SUN.r + 30} fill={`url(#${id}-sun)`} opacity="0.6" />
          <circle cx={SUN.x} cy={AX} r={SUN.r} fill="#fde68a" />
          <text x={SUN.x} y={AX + SUN.r + 20} textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="600">Sun</text>
          {/* Moon */}
          <circle cx={MOON.x} cy={AX} r={MOON.r} fill="#cbd5e1" />
          <g clipPath={`url(#${id}-moon)`}>
            <rect x={MOON.x} y={AX - MOON.r} width={MOON.r} height={2 * MOON.r} fill="#111827" opacity="0.9" />
          </g>
          <text x={MOON.x} y={AX - MOON.r - 10} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">Moon</text>
          {/* Earth */}
          <circle cx={EARTH.x} cy={AX} r={EARTH.r} fill="#1a4fb4" />
          <g clipPath={`url(#${id}-earth)`}>
            <ellipse cx={EARTH.x - 10} cy={AX - 14} rx={16} ry={11} fill="#2f8f4e" opacity="0.8" />
            <ellipse cx={EARTH.x + 12} cy={AX + 16} rx={18} ry={10} fill="#2f8f4e" opacity="0.8" />
            <rect x={EARTH.x} y={AX - EARTH.r} width={EARTH.r} height={2 * EARTH.r} fill="#020617" opacity="0.7" />
            {/* the shadow's footprint: penumbra band and (if it reaches) the umbra spot */}
            <rect x={EARTH.x - EARTH.r} y={AX - penAtEarth * 0.8} width={EARTH.r} height={penAtEarth * 1.6} fill="#000" opacity="0.25" />
            {reaches && <ellipse cx={surfaceX + 2} cy={AX} rx={4} ry={Math.max(2, umbraRadiusKm * 0.03)} fill="#000" />}
          </g>
          <text x={EARTH.x} y={AX + EARTH.r + 20} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">Earth</text>
          {/* labels */}
          <text x={(MOON.x + Math.min(tipX, surfaceX)) / 2} y={AX - 2} textAnchor="middle" fill="#fff" fontSize="10" opacity="0.8">umbra</text>
          <text x={(MOON.x + surfaceX) / 2} y={AX - MOON.r - 34} textAnchor="middle" fill="#cbd5e1" fontSize="10" opacity="0.8">penumbra</text>
          {!reaches && (
            <text x={Math.min(tipX + 4, surfaceX - 56)} y={AX - 10} fill="#fdba74" fontSize="10">antumbra</text>
          )}
          <line x1={tipX} y1={AX - 40} x2={tipX} y2={AX + 40} stroke={reaches ? "#22c55e" : "#f97316"} strokeOpacity="0.8" strokeDasharray="3 3" />
          <text x={tipX} y={AX + 54} textAnchor="middle" fill={reaches ? "#86efac" : "#fdba74"} fontSize="10">
            umbra tip {reaches ? `${fmt(umbraLen - toSurface)} km past the surface` : `${fmt(toSurface - umbraLen)} km short of it`}
          </text>
        </svg>
      </Panel>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <Slider label="Earth–Moon distance" min={PERIGEE} max={APOGEE} step={100} value={dist} onChange={setDist} display={`${fmt(dist)} km`} ticks={["perigee 356,500", "mean 384,400", "apogee 406,700"]} />
        <ButtonGroup label="Earth is at" value={season} options={[{ value: "jan", label: "perihelion (Jan)" }, { value: "jul", label: "aphelion (Jul)" }]} onChange={setSeason} />
      </div>

      <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)] md:items-start">
        <Panel title="What you would see from the centre line">
          <svg viewBox="0 0 200 200" className="mx-auto h-auto w-40" role="img" aria-label={reaches ? "Total eclipse: the Moon covers the whole Sun and the corona shows" : "Annular eclipse: a ring of Sun remains around the Moon"}>
            <defs>
              <radialGradient id={`${id}-corona`}>
                <stop offset="45%" stopColor="#fff" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#fff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="200" height="200" fill="#05081a" />
            {reaches && <circle cx={100} cy={100} r={sunR + 34} fill={`url(#${id}-corona)`} />}
            <circle cx={100} cy={100} r={sunR} fill="#fde68a" />
            <circle cx={100} cy={100} r={moonR} fill="#05081a" />
            <text x={100} y={186} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">{reaches ? "Total" : "Annular"}</text>
          </svg>
        </Panel>
        <div className="grid gap-2 sm:grid-cols-2">
          <Readout label="Eclipse type on the centre line" value={reaches ? "Total" : "Annular (ring of fire)"} hint={reaches ? "The umbra reaches the ground" : "The Moon looks too small to cover the Sun"} accent />
          <Readout label="Moon's umbra length" value={`${fmt(umbraLen)} km`} hint={`needs ≤ ${fmt(toSurface)} km to the surface`} />
          <Readout label="Apparent sizes from the ground" value={`Moon ${fmt(moonArcmin, 1)}′ · Sun ${fmt(sunArcmin, 1)}′`} hint={`Moon/Sun = ${fmt(ratio, 3)} (arcminutes; 60′ = 1°)`} />
          <Readout label="Shadow width on the ground" value={reaches ? `≈ ${fmt(2 * umbraRadiusKm)} km` : `ring ${fmt(2 * -umbraRadiusKm)} km wide`} hint="directly beneath the Moon; wider near sunrise/sunset" />
        </div>
      </div>
      <Legend items={[{ color: "#020617", label: "umbra — whole Sun hidden (total)" }, { color: "#64748b", label: "penumbra — part of the Sun hidden (partial)" }, { color: "#f97316", label: "antumbra — Moon smaller than the Sun (annular)", dashed: true }]} />
    </div>
  );
}

// ---- Why not every month: the tilted orbit -------------------------------

const NW = 480, NH = 330, NSX = 240, NSY = 165, NR = 118, MR = 30;
const INCLINATION = 5.145;
const NODE_REGRESSION_DAYS = 6798.4; // 18.6 years
const ECLIPSE_YEAR = 346.62;

export function NodeSeasonDiagram({ mode }: { mode: "solar" | "lunar" }) {
  const [t, setT] = useState(30);
  const { playing, reduced, toggle } = usePlayback();
  const id = useId();
  useAnimationFrame(playing, (dt) => setT((v) => (v + dt * 60) % 730));

  const earthAng = (t / 365.25) * 2 * Math.PI;
  const earth = polar(NSX, NSY, NR, earthAng);
  const sunDir = mod(earthAng / DEG + 180, 360); // direction of the Sun as seen from Earth (screen degrees)
  const nodeAng = mod(-(t / NODE_REGRESSION_DAYS) * 360, 360); // line of nodes, regressing slowly
  const diff = Math.abs(mod(sunDir - nodeAng + 90, 180) - 90); // angle between Sun direction and node line
  const limit = mode === "solar" ? 15.4 : 9.5; // conservative "eclipse certain" limits
  const outer = mode === "solar" ? 18.5 : 12.2; // beyond this no eclipse is possible
  const status = diff <= limit ? "in season" : diff <= outer ? "edge of season" : "no eclipse possible";
  const rel = mod(sunDir - nodeAng, 180); // degrees the Sun has moved past the last node alignment
  const daysToNext = fmt((180 - rel) / (360 / ECLIPSE_YEAR));
  const alignedAng = mode === "solar" ? sunDir : sunDir + 180; // where the eclipse Moon must sit
  const moon = polar(earth.x, earth.y, MR, alignedAng * DEG);
  const nodeA = polar(earth.x, earth.y, MR + 10, nodeAng * DEG);
  const nodeB = polar(earth.x, earth.y, MR + 10, nodeAng * DEG + Math.PI);
  const n1 = polar(earth.x, earth.y, MR, nodeAng * DEG);
  const n2 = polar(earth.x, earth.y, MR, nodeAng * DEG + Math.PI);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[3fr_2fr]">
      <Panel title={`Why ${mode === "solar" ? "new" : "full"} Moons usually miss`} caption="Moon's orbit enlarged ~100×; view from above">
        <svg viewBox={`0 0 ${NW} ${NH}`} className="h-auto w-full" role="img" aria-label={`Day ${fmt(t)}: the Sun is ${fmt(diff)} degrees from the line of nodes — ${status}.`}>
          <defs>
            <radialGradient id={`${id}-s`}>
              <stop offset="0%" stopColor="#fff7d6" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </radialGradient>
          </defs>
          {STARS.map((s, i) => (
            <circle key={i} cx={(s.x / W) * NW} cy={(s.y / H) * NH} r={s.r} fill="#fff" opacity={s.o * 0.5} />
          ))}
          <circle cx={NSX} cy={NSY} r={NR} fill="none" stroke="#fff" strokeOpacity="0.2" strokeDasharray="4 4" />
          <circle cx={NSX} cy={NSY} r={30} fill={`url(#${id}-s)`} />
          <circle cx={NSX} cy={NSY} r={14} fill="#fde68a" />
          {/* eclipse-season wedges: directions from the Sun along the node line */}
          {[0, 180].map((k) => {
            const a1 = (nodeAng + k - outer) * DEG;
            const a2 = (nodeAng + k + outer) * DEG;
            const p1 = polar(NSX, NSY, NR + 22, a1);
            const p2 = polar(NSX, NSY, NR + 22, a2);
            return <path key={k} d={`M ${NSX} ${NSY} L ${p1.x} ${p1.y} A ${NR + 22} ${NR + 22} 0 0 1 ${p2.x} ${p2.y} Z`} fill="#fbbf24" opacity="0.1" />;
          })}
          <text x={NSX} y={NSY - NR - 26} textAnchor="middle" fill="#fde68a" fontSize="10" opacity="0.8">amber wedges: Earth positions where the node line points at the Sun</text>
          {/* Earth–Sun line */}
          <line x1={NSX} y1={NSY} x2={earth.x} y2={earth.y} stroke="#fbbf24" strokeOpacity="0.4" strokeDasharray="3 3" />
          {/* Moon's orbit around Earth: half above the ecliptic (light), half below (dark) */}
          <g>
            <path d={`M ${n1.x} ${n1.y} A ${MR} ${MR} 0 0 1 ${n2.x} ${n2.y}`} fill="none" stroke="#7dd3fc" strokeWidth="2.5" />
            <path d={`M ${n2.x} ${n2.y} A ${MR} ${MR} 0 0 1 ${n1.x} ${n1.y}`} fill="none" stroke="#7dd3fc" strokeWidth="2.5" strokeOpacity="0.35" strokeDasharray="3 3" />
            <line x1={nodeA.x} y1={nodeA.y} x2={nodeB.x} y2={nodeB.y} stroke="#fff" strokeWidth="1.5" strokeOpacity="0.85" />
            <circle cx={n1.x} cy={n1.y} r={3} fill="#fff" />
            <circle cx={n2.x} cy={n2.y} r={3} fill="#fff" />
            <circle cx={earth.x} cy={earth.y} r={8} fill="#1a4fb4" stroke="#fff" strokeOpacity="0.4" />
            <circle cx={moon.x} cy={moon.y} r={4.5} fill={mode === "solar" ? "#111827" : "#e5e7eb"} stroke="#fff" strokeWidth="1" />
          </g>
          <text x={earth.x} y={earth.y + MR + 24} textAnchor="middle" fill="#fff" fontSize="10" opacity="0.8">
            {mode === "solar" ? "new" : "full"} Moon · {fmt(diff)}° from a node
          </text>
          <text x={12} y={NH - 12} fill="#fff" fontSize="10" opacity="0.6">The white line of nodes keeps its direction in space (turning only 19° per year).</text>
        </svg>
      </Panel>
      <Panel title="The tilt, seen edge-on" caption="tilt exaggerated 3×">
        <TiltSideView mode={mode} />
        <div className="mt-3 grid gap-2">
          <Readout label="Eclipse season?" value={status === "in season" ? "Yes — an eclipse is certain this month" : status === "edge of season" ? "Maybe — a small partial at best" : "No"} hint={`Sun is ${fmt(diff)}° from the node line (limit ${limit}–${outer}°)`} accent={status !== "no eclipse possible"} />
          <Readout label="Orbit tilt" value={`${INCLINATION}°`} hint="Moon's orbit vs Earth's orbit plane (the ecliptic)" />
          <Readout label="Seasons repeat every" value={`${fmt(ECLIPSE_YEAR / 2, 1)} days`} hint={status === "no eclipse possible" ? `next season in ≈ ${daysToNext} days` : "half an eclipse year of 346.6 days"} />
        </div>
      </Panel>
      </div>
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <Slider label="Time" min={0} max={730} step={1} value={t} onChange={setT} display={`day ${fmt(t)} (month ${fmt(t / 30.44, 1)})`} ticks={["0", "6 mo", "1 yr", "18 mo", "2 yr"]} />
        <PlayButton playing={playing} onToggle={toggle} reduced={reduced} label="the years" />
      </div>
    </div>
  );
}

/** Static edge-on view: the Moon's orbit crossing the ecliptic at the two nodes. */
function TiltSideView({ mode }: { mode: "solar" | "lunar" }) {
  const w = 320, h = 200, cx = 160, cy = 100, r = 120, tilt = 15.4; // 3 × 5.145°
  const dx = r3(r * Math.cos(tilt * DEG)), dy = r3(r * Math.sin(tilt * DEG));
  const solar = mode === "solar";
  const typical = solar ? { x: cx - 40, y: cy + 36 } : { x: cx + 40, y: cy - 36 };
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" role="img" aria-label="Side view: the Moon's orbit is tilted to Earth's orbit plane; the Moon crosses that plane only at the two nodes.">
      <line x1={12} y1={cy} x2={w - 12} y2={cy} stroke="#fbbf24" strokeOpacity="0.6" />
      <text x={w - 12} y={cy + 16} textAnchor="end" fill="#fde68a" fontSize="9" opacity="0.8">ecliptic (Earth&apos;s orbit plane)</text>
      <text x={14} y={cy - 6} fill="#fde68a" fontSize="10" fontWeight="600">SUN →</text>
      <ellipse cx={cx} cy={cy} rx={r} ry={12} fill="none" stroke="#7dd3fc" strokeOpacity="0.25" strokeDasharray="2 3" transform={`rotate(${-tilt} ${cx} ${cy})`} />
      <line x1={cx - dx} y1={cy + dy} x2={cx + dx} y2={cy - dy} stroke="#7dd3fc" strokeWidth="2.5" />
      <text x={14} y={cy - 34} fill="#7dd3fc" fontSize="9.5">Moon&apos;s orbit, tilted 5.1°</text>
      <circle cx={cx} cy={cy} r={9} fill="#1a4fb4" stroke="#fff" strokeOpacity="0.5" />
      <circle cx={cx - dx} cy={cy + dy} r={3.5} fill="#fff" />
      <circle cx={cx + dx} cy={cy - dy} r={3.5} fill="#fff" />
      <text x={cx - dx - 8} y={cy + dy + 4} textAnchor="end" fill="#fff" fontSize="9" opacity="0.7">node</text>
      <text x={cx + dx + 8} y={cy - dy + 4} fill="#fff" fontSize="9" opacity="0.7">node</text>
      {/* a typical syzygy Moon sits well above or below the plane */}
      <circle cx={typical.x} cy={typical.y} r={4.5} fill={solar ? "#111827" : "#e5e7eb"} stroke="#fff" />
      <text x={typical.x} y={typical.y + (solar ? 18 : -12)} textAnchor="middle" fill="#fff" fontSize="9" opacity="0.7">
        {solar ? "typical new Moon: passes below the Sun" : "typical full Moon: passes above the shadow"}
      </text>
      <text x={cx} y={h - 8} textAnchor="middle" fill="#fff" fontSize="9.5" opacity="0.6">
        Only a {solar ? "new" : "full"} Moon close to a node lines up with the Sun{solar ? "" : " and Earth's shadow"}.
      </text>
    </svg>
  );
}

export const SolarNodeSeason = () => <NodeSeasonDiagram mode="solar" />;
export const LunarNodeSeason = () => <NodeSeasonDiagram mode="lunar" />;
