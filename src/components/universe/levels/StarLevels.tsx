"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { gauss, radecToGalScene, rng, type Vec3 } from "../astro";
import { DEEP_SKY, NEAREST_STARS, spectralColor, spectralSize } from "../data";
import { SUN_R, armScene, buildNeighbourhood } from "../galaxy";
import { px } from "../levels";
import { Circle, Cloud, Glow, Marker, Polyline, ULabel } from "../primitives";
import type { LevelProps } from "./SolarLevels";

/* ---- Level 4: nearest stars (20 ly) ------------------------------------- */

/** Faint systems (brown dwarfs, dim red dwarfs) get a dimmer label so the bright ones stand out. */
const DIM = new Set(["Luhman 16", "WISE 0855−0714", "EZ Aquarii", "DX Cancri", "YZ Ceti", "Luyten's Star", "Teegarden's Star", "Kapteyn's Star", "Lacaille 8760", "Struve 2398", "Groombridge 34", "Gliese 1061", "Ross 128", "Ross 248"]);

export function NearestStarsLevel({ labels }: LevelProps) {
  const stars = useMemo(() => NEAREST_STARS.map((s) => ({ ...s, pos: radecToGalScene(s.ra, s.dec, s.ly), color: spectralColor(s.spectral), size: spectralSize(s.spectral) })), []);
  // Voyager 1 heads toward RA 17h15m, Dec +12°14′ (Ophiuchus) at 3.6 AU/yr; the arrow is direction only.
  const v1 = useMemo(() => radecToGalScene("17h 15m", "+12 14", 1), []);
  const arrow = useMemo<Vec3[]>(() => [[0, 0, 0], [v1[0] * 3.2, v1[1] * 3.2, v1[2] * 3.2]], [v1]);
  return (
    <group>
      {/* Galactic plane reference: rings at 5, 10, 15 ly plus stems from each star down to the plane. */}
      {[5, 10].map((r) => (
        <Circle key={r} radius={r} color="#8fb0ff" opacity={r === 10 ? 0.22 : 0.12} />
      ))}
      {labels && <ULabel position={[0, 0, 5]} text="5 light-years" dim dy={10} />}
      {labels && <ULabel position={[0, 0, 10]} text="10 light-years" dim dy={10} />}
      <group>
        <Glow size={1.4} color="#fff1c2" opacity={1} wide={false} />
        <Glow size={3.5} color="#ffd27a" opacity={0.5} />
        {labels && <ULabel text="Sun" sub="G2" dy={-16} accent />}
      </group>
      {stars.map((s) => (
        <group key={s.name}>
          <Polyline points={[s.pos, [s.pos[0], 0, s.pos[2]]]} color={s.color} opacity={0.18} />
          <Marker position={s.pos} color={s.color} size={0.6 * s.size} labels={labels && !DIM.has(s.name)} text={s.name} sub={`${s.ly.toFixed(1)} ly · ${s.note ?? s.spectral}`} dy={s.name === "Proxima Centauri" ? 16 : -13} />
        </group>
      ))}
      <Polyline points={arrow} color="#fde68a" opacity={0.75} />
      {labels && <ULabel position={arrow[1]} text="Voyager 1 →" sub="heading for Ophiuchus" accent align="left" dx={8} dy={0} />}
    </group>
  );
}

/* ---- Level 5: Orion Arm neighbourhood (5,000 ly) ------------------------ */

const SUN: Vec3 = [-SUN_R, 0, 0];

export function OrionArmLevel({ labels, low }: LevelProps) {
  const field = useMemo(() => buildNeighbourhood(low ? 14000 : 42000, 5200), [low]);
  const objects = useMemo(() => DEEP_SKY.map((o) => ({ ...o, pos: radecToGalScene(o.ra, o.dec, o.ly) })), []);
  const clusters = useMemo(() => {
    // Little clumps of stars for the open clusters.
    const rand = rng(5);
    const list = objects.filter((o) => o.kind === "cluster");
    const n = 60;
    const arr = new Float32Array(list.length * n * 3);
    list.forEach((o, k) => {
      for (let i = 0; i < n; i++) {
        const j = (k * n + i) * 3;
        arr[j] = o.pos[0] + gauss(rand) * o.size;
        arr[j + 1] = o.pos[1] + gauss(rand) * o.size;
        arr[j + 2] = o.pos[2] + gauss(rand) * o.size;
      }
    });
    return arr;
  }, [objects]);
  // Points along the Orion Spur ridge on either side of the Sun (Sun-centred frame).
  const spur = useMemo<Vec3[]>(() => {
    const pts: Vec3[] = [];
    for (let t = 169; t <= 191; t += 1) {
      const p = armScene(4, t);
      pts.push([p[0] - SUN[0], 0, p[2]]);
    }
    return pts;
  }, []);
  const spurLabel = spur[Math.floor(spur.length * 0.85)];
  return (
    <group>
      <Cloud positions={field.positions} colors={field.colors} size={px(3.8)} opacity={1} />
      <Cloud positions={clusters} color="#cfe0ff" size={px(2.5)} opacity={0.9} />
      <Polyline points={spur} color="#fbbf24" opacity={0.22} />
      {/* Local Bubble: ~500 ly radius cavity of hot, thin gas around the Sun (Zucker et al. 2022). */}
      <mesh>
        <sphereGeometry args={[500, 32, 24]} />
        <meshBasicMaterial color="#7fb2ff" transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <Circle radius={500} color="#8fb8ff" opacity={0.3} />
      <group>
        <Glow size={70} color="#fff1c2" wide={false} />
        <Glow size={260} color="#ffd27a" opacity={0.5} />
        {labels && <ULabel text="Sun" sub="inside the Local Bubble" dy={-16} accent />}
      </group>
      {objects.map((o) => {
        const nebula = o.kind === "nebula" || o.kind === "remnant";
        return (
          <group key={o.name} position={o.pos}>
            {nebula ? <Glow size={Math.max(o.size * 2.5, 480)} color={o.color} opacity={0.9} /> : <Glow size={o.kind === "star" ? 90 : 140} color={o.color} opacity={o.kind === "star" ? 1 : 0.7} wide={o.kind !== "star"} />}
            {labels && o.label && <ULabel text={o.name} sub={`${o.ly.toLocaleString()} ly`} dy={-14} dim={o.kind === "star"} />}
          </group>
        );
      })}
      {labels && (
        <>
          <ULabel position={spurLabel} text="Orion Spur" sub="the Sun's local arm" accent dy={-14} />
          <ULabel position={[4600, 0, 2600]} text="Sagittarius Arm →" sub="galactic centre 26,000 ly this way" dim align="right" dx={-8} dy={0} />
          <ULabel position={[-4600, 0, -2600]} text="← Perseus Arm" sub="~6,000 ly outward" dim align="left" dx={8} dy={0} />
        </>
      )}
    </group>
  );
}
