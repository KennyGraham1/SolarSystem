"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { heliocentricPosition, orbitPath, type AUPosition } from "@/lib/orbits";
import type { BodyId } from "@/lib/planets";
import { currentJD, useSolarStore } from "@/store/useSolarStore";
import { DEG, LY_IN_AU, gauss, radecToEclScene, rng, type Vec3 } from "../astro";
import { px } from "../levels";
import { SPACECRAFT } from "../data";
import { Circle, Cloud, Glow, Marker, Polyline, ULabel } from "../primitives";

export interface LevelProps {
  labels: boolean;
  low: boolean;
}

/** Ecliptic AU position → scene axes (x, z→y, y→−z), uncompressed. */
const ecl = (p: AUPosition): Vec3 => [p.x, p.z, -p.y];

const PLANETS: { id: BodyId; name: string; color: string; au: number }[] = [
  { id: "mercury", name: "Mercury", color: "#c9c2b8", au: 0.387 },
  { id: "venus", name: "Venus", color: "#f0d29a", au: 0.723 },
  { id: "earth", name: "Earth", color: "#6fb0ff", au: 1 },
  { id: "mars", name: "Mars", color: "#ff8a5a", au: 1.524 },
  { id: "jupiter", name: "Jupiter", color: "#f3c9a0", au: 5.203 },
  { id: "saturn", name: "Saturn", color: "#f6e3b0", au: 9.537 },
  { id: "uranus", name: "Uranus", color: "#9fe8f0", au: 19.19 },
  { id: "neptune", name: "Neptune", color: "#6f8fff", au: 30.07 },
  { id: "pluto", name: "Pluto", color: "#d9c9b8", au: 39.5 },
];

/** Real orbit paths and today's positions from the JPL elements in lib/orbits (`ids` must be a stable array). */
function useEphemeris(ids: readonly BodyId[]) {
  return useMemo(() => {
    const jd = currentJD(useSolarStore.getState());
    return ids.map((id) => ({
      id,
      path: orbitPath(id, jd, 180).map(ecl),
      pos: ecl(heliocentricPosition(id, jd)),
    }));
  }, [ids]);
}

const INNER_IDS: BodyId[] = ["mercury", "venus", "earth", "mars"];
const ALL_IDS: BodyId[] = PLANETS.map((p) => p.id);
const OUTER_IDS: BodyId[] = ["neptune", "pluto"];

/** Belt of small bodies between two radii (AU) with an inclination spread. */
function useBelt(inner: number, outer: number, count: number, spreadDeg: number, seed: number, power = 0) {
  return useMemo(() => {
    const rand = rng(seed);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // power < 0 concentrates toward the inner edge (scattered-disc style).
      const u = rand();
      const r = power === 0 ? inner + (outer - inner) * (0.5 + 0.5 * (rand() + rand() - 1)) : inner * Math.pow(1 - u * (1 - Math.pow(outer / inner, power)), 1 / power);
      const a = rand() * Math.PI * 2;
      const inc = gauss(rand) * spreadDeg * DEG * 0.5;
      arr[i * 3] = Math.cos(a) * r * Math.cos(inc);
      arr[i * 3 + 1] = Math.sin(inc) * r;
      arr[i * 3 + 2] = -Math.sin(a) * r * Math.cos(inc);
    }
    return arr;
  }, [inner, outer, count, spreadDeg, seed, power]);
}

function SunGlow({ size, label, labels, sub, below, dy }: { size: number; label?: string; labels: boolean; sub?: string; below?: boolean; dy?: number }) {
  return (
    <group>
      <Glow size={size} color="#ffd27a" opacity={0.9} />
      <Glow size={size * 0.28} color="#fff6d8" opacity={1} wide={false} />
      {labels && label && <ULabel text={label} sub={sub} dy={dy ?? (below ? 18 : -18)} accent />}
    </group>
  );
}

/* ---- Level 0: inner solar system (2 AU) --------------------------------- */

export function InnerSolarLevel({ labels, low }: LevelProps) {
  const eph = useEphemeris(INNER_IDS);
  const belt = useBelt(2.1, 3.3, low ? 900 : 2400, 10, 21);
  return (
    <group>
      <SunGlow size={0.7} label="Sun" labels={labels} />
      {eph.map((e, i) => {
        const p = PLANETS[i];
        return (
          <group key={p.id}>
            <Polyline points={e.path} color={p.color} opacity={p.id === "earth" ? 0.55 : 0.32} closed />
            <Marker position={e.pos} color={p.color} size={p.id === "earth" ? 0.14 : 0.1} labels={labels} text={p.name} sub={`${p.au} AU`} accent={p.id === "earth"} />
          </group>
        );
      })}
      <Cloud positions={belt} color="#d8cdb8" size={px(3)} opacity={0.7} />
      {labels && <ULabel position={[2.55, 0, -0.9]} text="Asteroid belt" sub="2.1–3.3 AU" dim />}
    </group>
  );
}

/* ---- Level 1: solar system (50 AU) -------------------------------------- */

export function SolarSystemLevel({ labels, low }: LevelProps) {
  const eph = useEphemeris(ALL_IDS);
  const asteroids = useBelt(2.1, 3.3, low ? 600 : 1500, 10, 21);
  const kuiper = useBelt(30, 50, low ? 1800 : 5000, 14, 11);
  return (
    <group>
      <SunGlow size={4} label="Sun & inner planets" labels={labels} below />
      {eph.map((e, i) => {
        const p = PLANETS[i];
        const outer = p.au > 4;
        return (
          <group key={p.id}>
            <Polyline points={e.path} color={p.color} opacity={outer ? 0.4 : 0.25} closed />
            <Marker position={e.pos} color={p.color} size={outer ? 1.6 : 0.8} labels={labels && outer} text={p.name} sub={`${p.au} AU`} accent={p.id === "pluto"} />
          </group>
        );
      })}
      <Cloud positions={asteroids} color="#d8cdb8" size={px(2.5)} opacity={0.6} />
      <Cloud positions={kuiper} color="#aac0e6" size={px(3)} opacity={0.65} />
      {labels && <ULabel position={[0, 0, 44]} text="Kuiper belt" sub="30–50 AU" dim />}
    </group>
  );
}

/* ---- Level 2: heliosphere & scattered disc (1,500 AU) ------------------- */

/** Points on a Keplerian ellipse (ecliptic elements, degrees) → scene axes. */
function ellipse(a: number, e: number, inc: number, node: number, peri: number, segments = 180): Vec3[] {
  const pts: Vec3[] = [];
  const cO = Math.cos(node * DEG), sO = Math.sin(node * DEG);
  const cI = Math.cos(inc * DEG), sI = Math.sin(inc * DEG);
  const cw = Math.cos(peri * DEG), sw = Math.sin(peri * DEG);
  for (let i = 0; i <= segments; i++) {
    const E = (i / segments) * Math.PI * 2;
    const xp = a * (Math.cos(E) - e), yp = a * Math.sqrt(1 - e * e) * Math.sin(E);
    const x = (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp;
    const y = (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp;
    const z = sw * sI * xp + cw * sI * yp;
    pts.push([x, z, -y]);
  }
  return pts;
}

/** Interstellar upwind direction (IBEX): ecliptic λ = 255.4°, β = +5.1° — the heliosphere's nose. */
const NOSE = new THREE.Vector3(Math.cos(255.4 * DEG) * Math.cos(5.1 * DEG), Math.sin(5.1 * DEG), -Math.sin(255.4 * DEG) * Math.cos(5.1 * DEG)).normalize();

/** Comet-shaped heliopause: a 120 AU sphere stretched into a tail away from the nose. */
function Heliosphere() {
  const geometry = useMemo(() => {
    const g = new THREE.SphereGeometry(120, 48, 32);
    const pos = g.getAttribute("position") as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const d = v.clone().normalize().dot(NOSE);
      if (d < 0) v.addScaledVector(NOSE, d * 120 * 2.2); // stretch downwind
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  return (
    <group>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#5f9cff" transparent opacity={0.07} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#8fbcff" wireframe transparent opacity={0.09} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Termination shock, where the solar wind first slows, ~90 AU. */}
      <mesh>
        <sphereGeometry args={[90, 32, 24]} />
        <meshBasicMaterial color="#ffb070" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

// Sedna: a = 506 AU, e = 0.85, i = 11.9°, Ω = 144.4°, ω = 311.3° (JPL SBDB); ~83 AU from the Sun in 2026, nearing its 2076 perihelion.
const SEDNA = ellipse(506, 0.85, 11.9, 144.4, 311.3);

export function HeliosphereLevel({ labels, low }: LevelProps) {
  const eph = useEphemeris(OUTER_IDS);
  const kuiper = useBelt(30, 50, low ? 800 : 2000, 14, 11);
  const scattered = useBelt(48, 1000, low ? 1500 : 4000, 40, 31, -0.5);
  const sedna = useMemo<Vec3>(() => {
    // Point on the ellipse currently ~83 AU from the Sun on the inbound side.
    let best = SEDNA[0], bestD = Infinity;
    for (let i = Math.floor(SEDNA.length / 2); i < SEDNA.length; i++) {
      const d = Math.abs(Math.hypot(...SEDNA[i]) - 83);
      if (d < bestD) { bestD = d; best = SEDNA[i]; }
    }
    return best;
  }, []);
  const craft = useMemo(() => SPACECRAFT.map((s) => ({ ...s, pos: radecToEclScene(s.ra, s.dec, s.au) })), []);
  return (
    <group>
      <SunGlow size={60} label="Sun & planets" labels={labels} sub="Neptune's orbit is the ring, 30 AU" below dy={34} />
      {eph.map((e) => (
        <Polyline key={e.id} points={e.path} color="#8fa8ff" opacity={0.35} closed />
      ))}
      <Cloud positions={kuiper} color="#aac0e6" size={px(2)} opacity={0.6} />
      <Heliosphere />
      {labels && <ULabel position={NOSE.clone().multiplyScalar(-400).toArray() as Vec3} text="Heliopause" sub="where the solar wind stops · ~120 AU, tail ~400 AU" dim />}
      {craft.map((c) => (
        <Marker key={c.name} position={c.pos} color={c.name.startsWith("Voyager") ? "#fde68a" : "#cbd5e1"} size={c.name.startsWith("Voyager") ? 14 : 9} labels={labels} text={c.name} sub={c.name.startsWith("Pioneer") ? undefined : `${Math.round(c.au)} AU · launched ${c.launched}`} dim={!c.name.startsWith("Voyager")} align={c.pos[0] < 0 ? "right" : "left"} dx={c.pos[0] < 0 ? -10 : 10} dy={c.pos[1] < 0 ? 12 : -12} />
      ))}
      <Cloud positions={scattered} color="#b9c8e8" size={px(3)} opacity={0.7} />
      <Polyline points={SEDNA} color="#f0a0c0" opacity={0.6} />
      <Marker position={sedna} color="#f7b3cf" size={11} labels={labels} text="Sedna" sub="83 AU now · out to 940 AU" align="left" dx={10} dy={18} />
      {labels && <ULabel position={SEDNA[0]} text="Sedna's far point" sub="~940 AU" dim />}
    </group>
  );
}

/* ---- Level 3: Oort cloud (100,000 AU) ----------------------------------- */

export function OortLevel({ labels, low }: LevelProps) {
  const cloud = useMemo(() => {
    // Rendering choice: 1/r² density (equal counts per shell) so the whole
    // sphere is visible; the real cloud is thought to thin out faster (~r^-3.5).
    const rand = rng(77);
    const n = low ? 8000 : 22000;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 2000 * Math.pow(50, Math.pow(rand(), 0.6));
      const z = rand() * 2 - 1, a = rand() * Math.PI * 2, s = Math.sqrt(1 - z * z);
      arr[i * 3] = r * s * Math.cos(a);
      arr[i * 3 + 1] = r * z;
      arr[i * 3 + 2] = r * s * Math.sin(a);
    }
    return arr;
  }, [low]);
  const hills = useMemo(() => {
    // Inner (Hills) cloud: denser, flattened toward the ecliptic, 2,000–20,000 AU.
    const rand = rng(78);
    const n = low ? 1500 : 4000;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 2000 * Math.pow(10, rand());
      const a = rand() * Math.PI * 2;
      const inc = gauss(rand) * 0.35;
      arr[i * 3] = r * Math.cos(inc) * Math.cos(a);
      arr[i * 3 + 1] = r * Math.sin(inc);
      arr[i * 3 + 2] = r * Math.cos(inc) * Math.sin(a);
    }
    return arr;
  }, [low]);
  // Proxima Centauri lies 268,000 AU away toward RA 14h29m, Dec −62°40′.
  const proxima = useMemo(() => radecToEclScene("14h 29m 43s", "-62 40 46", 1), []);
  const arrow = useMemo<Vec3[]>(() => [[proxima[0] * 88000, proxima[1] * 88000, proxima[2] * 88000], [proxima[0] * 100000, proxima[1] * 100000, proxima[2] * 100000]], [proxima]);
  return (
    <group>
      <SunGlow size={2500} label="Sun, planets & heliosphere" labels={labels} sub="all inside this dot" below />
      <Cloud positions={hills} color="#c8d6ee" size={px(2.5)} opacity={0.55} />
      <Cloud positions={cloud} color="#dbe4f4" size={px(3.2)} opacity={0.75} />
      <Circle radius={LY_IN_AU} color="#fbbf24" opacity={0.28} />
      {labels && <ULabel position={[0, 0, LY_IN_AU]} text="1 light-year" sub="63,241 AU" dim />}
      <Polyline points={arrow} color="#fde68a" opacity={0.8} />
      {labels && <ULabel position={arrow[1]} text="Proxima Centauri →" sub="268,000 AU · 4.24 ly" accent />}
    </group>
  );
}
