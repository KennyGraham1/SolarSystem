"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { DEG, galScene, gauss, rng, type Vec3 } from "../astro";
import { ARM_LABELS, LOCAL_GROUP } from "../data";
import { SUN_R, armScene, buildGalaxy, type GalaxyBuffers } from "../galaxy";
import { px } from "../levels";
import { Cloud, DiscGlow, Glow, Marker, ULabel } from "../primitives";
import type { LevelProps } from "./SolarLevels";

/** Galaxy point buffers are expensive, so they are built once per (count, seed) and shared between levels. */
const cache = new Map<string, GalaxyBuffers>();
function useGalaxy(count: number, seed: number) {
  return useMemo(() => {
    const key = `${count}:${seed}`;
    let g = cache.get(key);
    if (!g) {
      g = buildGalaxy(count, seed);
      cache.set(key, g);
    }
    return g;
  }, [count, seed]);
}

interface SpiralProps {
  buffers: GalaxyBuffers;
  /** Point size in world units. */
  size: number;
  opacity?: number;
  dust?: boolean;
}

/** Renders a galaxy point cloud (stars, HII knots, optional dust lanes). */
function Spiral({ buffers, size, opacity = 0.85, dust = true }: SpiralProps) {
  return (
    <group>
      <Cloud positions={buffers.positions} colors={buffers.colors} size={size} opacity={opacity} />
      <Cloud positions={buffers.knots} colors={buffers.knotColors} size={size * 2.6} opacity={0.6} />
      {dust && <Cloud positions={buffers.dust} color="#04050a" size={size * 4} opacity={0.5} additive={false} renderOrder={1} />}
    </group>
  );
}

/* ---- Level 6: the Milky Way (60,000 ly) --------------------------------- */

export function MilkyWayLevel({ labels, low }: LevelProps) {
  const galaxy = useGalaxy(low ? 45000 : 140000, 42);
  const armLabels = useMemo(() => ARM_LABELS.map((a) => ({ ...a, pos: armScene(a.arm, a.theta) })), []);
  return (
    <group>
      <DiscGlow radius={52000} color="#7f8fe0" opacity={0.28} />
      <Spiral buffers={galaxy} size={px(3.6)} opacity={0.6} />
      {/* Bulge and halo glow */}
      <Glow size={20000} color="#ffd9a6" opacity={0.5} />
      <Glow size={130000} color="#5c6cff" opacity={0.1} />
      <Marker position={[0, 0, 0]} color="#fff3d0" size={1800} labels={labels} text="Sagittarius A*" sub="4-million-solar-mass black hole" dy={18} />
      <Marker position={[-SUN_R, 0, 0]} color="#fde68a" size={2400} labels={labels} text="Sun" sub="26,000 ly from the centre" accent dy={-16} />
      {labels && armLabels.map((a) => <ULabel key={a.name} position={a.pos} text={a.name} dim />)}
      {labels && <ULabel position={[0, 0, 52000]} text="Disc edge · ~50,000 ly" dim />}
    </group>
  );
}

/* ---- Level 7: the Local Group (5 Mly) ----------------------------------- */

/** North celestial pole in the galactic frame, used to turn a sky position angle into a 3D orientation. */
const NCP = new THREE.Vector3(...galScene(122.93, 27.13, 1));

/**
 * Orientation for a galaxy disc seen from the Milky Way with the given
 * inclination and position angle (PA measured from celestial north through east).
 */
function discQuaternion(dir: Vec3, inclinationDeg: number, paDeg: number) {
  const u = new THREE.Vector3(...dir).normalize();
  const north = NCP.clone().sub(u.clone().multiplyScalar(NCP.dot(u))).normalize();
  const east = north.clone().cross(u).normalize();
  const minor = north.clone().multiplyScalar(-Math.sin(paDeg * DEG)).add(east.multiplyScalar(Math.cos(paDeg * DEG)));
  const normal = u.multiplyScalar(Math.cos(inclinationDeg * DEG)).add(minor.multiplyScalar(Math.sin(inclinationDeg * DEG))).normalize();
  return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
}

/** Irregular galaxy: an elongated clump of points. */
function Irregular({ count, size, seed, color }: { count: number; size: number; seed: number; color: string }) {
  const positions = useMemo(() => {
    const rand = rng(seed);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = gauss(rand) * size * 0.3;
      arr[i * 3 + 1] = gauss(rand) * size * 0.12;
      arr[i * 3 + 2] = gauss(rand) * size * 0.2;
    }
    return arr;
  }, [count, size, seed]);
  return <Cloud positions={positions} color={color} size={px(2.4)} opacity={0.8} />;
}

/** Galaxies are drawn this many times larger than life at the Local Group scale (stated in the caption). */
const EXAGGERATE = 3;

export function LocalGroupLevel({ labels, low }: LevelProps) {
  const mw = useGalaxy(low ? 45000 : 140000, 42);
  const m31 = useGalaxy(low ? 12000 : 40000, 9);
  const m33 = useGalaxy(low ? 4000 : 10000, 11);
  const members = useMemo(() => LOCAL_GROUP.map((g) => ({ ...g, pos: galScene(g.l, g.b, g.ly) })), []);
  const andromeda = members[0], triangulum = members[1];
  // M31: inclination 77°, PA 35°; M33: inclination 54°, PA 23° (de Vaucouleurs values).
  const qM31 = useMemo(() => discQuaternion(andromeda.pos, 77, 35), [andromeda.pos]);
  const qM33 = useMemo(() => discQuaternion(triangulum.pos, 54, 23), [triangulum.pos]);
  return (
    <group>
      {/* Milky Way at the origin, same orientation as the previous level. */}
      <group scale={EXAGGERATE}>
        <DiscGlow radius={52000} color="#8f9ce8" opacity={0.25} />
        <Spiral buffers={mw} size={px(2)} opacity={0.5} dust={false} />
        <Glow size={30000} color="#ffd9a6" opacity={0.4} />
      </group>
      {labels && <ULabel text="Milky Way" sub="you are here" accent dy={-46} />}

      <group position={andromeda.pos} quaternion={qM31} scale={(EXAGGERATE * andromeda.size) / 100000}>
        <DiscGlow radius={52000} color="#8f9ce8" opacity={0.25} />
        <Spiral buffers={m31} size={px(2)} opacity={0.5} dust={false} />
        <Glow size={34000} color="#ffd9a6" opacity={0.4} />
      </group>
      <group position={triangulum.pos} quaternion={qM33} scale={(EXAGGERATE * triangulum.size) / 100000}>
        <DiscGlow radius={52000} color="#9fb4ff" opacity={0.3} />
        <Spiral buffers={m33} size={px(2.2)} opacity={0.7} dust={false} />
        <Glow size={24000} color="#dbe6ff" opacity={0.35} />
      </group>

      {members.slice(2).map((g) =>
        g.type === "irregular" && g.size > 15000 ? (
          <group key={g.name} position={g.pos}>
            <Irregular count={low ? 500 : 1500} size={g.size * EXAGGERATE} seed={g.ly} color="#d6e2ff" />
            <Glow size={g.size * 1.2 * EXAGGERATE} color="#c9d8ff" opacity={0.35} />
          </group>
        ) : (
          <Glow key={g.name} position={g.pos} size={Math.max(g.size * 2.5, 12000) * EXAGGERATE} color={g.type === "elliptical" ? "#ffe2b8" : "#c4d2f0"} opacity={g.type === "dwarf" ? 0.45 : 0.6} wide={false} />
        ),
      )}
      {labels &&
        members
          .filter((g) => g.label)
          .map((g) => <ULabel key={g.name} position={g.pos} text={g.name} sub={g.ly >= 1_000_000 ? `${(g.ly / 1e6).toFixed(2)} Mly` : `${Math.round(g.ly / 1000)},000 ly`} dy={g.name.startsWith("Magellanic") ? 14 : -14} dim={g.type === "dwarf" || g.type === "irregular"} />)}
    </group>
  );
}
