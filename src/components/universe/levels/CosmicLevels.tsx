"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { gauss, radecToSGScene, rng, type Vec3 } from "../astro";
import { CLUSTERS, FILAMENTS } from "../data";
import { px } from "../levels";
import { Cloud, Marker, ULabel } from "../primitives";
import type { LevelProps } from "./SolarLevels";

/* ---- Level 8: Laniakea (500 Mly) ---------------------------------------- */

export function LaniakeaLevel({ labels, low }: LevelProps) {
  const nodes = useMemo(() => CLUSTERS.map((c) => ({ ...c, pos: radecToSGScene(c.ra, c.dec, c.mly) })), []);
  const byName = useMemo(() => new Map(nodes.map((n) => [n.name, n])), [nodes]);

  const { clumps, filaments, field } = useMemo(() => {
    const rand = rng(88);
    const k = low ? 0.4 : 1;
    // Cluster cores: Gaussian clumps sized by richness.
    const clumpList: number[] = [];
    for (const n of nodes) {
      const count = Math.round((60 + 340 * n.richness) * k);
      const s = 4 + 9 * n.richness;
      for (let i = 0; i < count; i++) clumpList.push(n.pos[0] + gauss(rand) * s, n.pos[1] + gauss(rand) * s, n.pos[2] + gauss(rand) * s);
    }
    // Filaments: scattered points along gently bowed segments between clusters.
    const filList: number[] = [];
    for (const [a, b] of FILAMENTS) {
      const A = byName.get(a)!.pos, B = byName.get(b)!.pos;
      const len = Math.hypot(B[0] - A[0], B[1] - A[1], B[2] - A[2]);
      const count = Math.round(Math.max(40, len * 1.6) * k);
      const bow: Vec3 = [gauss(rand) * len * 0.12, gauss(rand) * len * 0.12, gauss(rand) * len * 0.12];
      for (let i = 0; i < count; i++) {
        const t = rand();
        const w = Math.sin(t * Math.PI);
        const sigma = 5 + 6 * w;
        filList.push(
          A[0] + (B[0] - A[0]) * t + bow[0] * w + gauss(rand) * sigma,
          A[1] + (B[1] - A[1]) * t + bow[1] * w + gauss(rand) * sigma,
          A[2] + (B[2] - A[2]) * t + bow[2] * w + gauss(rand) * sigma,
        );
      }
    }
    // Field galaxies, concentrated toward the supergalactic plane.
    const nField = Math.round(7000 * k);
    const fieldArr = new Float32Array(nField * 3);
    for (let i = 0; i < nField; i++) {
      const r = 520 * Math.cbrt(rand());
      const a = rand() * Math.PI * 2;
      const y = gauss(rand) * 90;
      const s = Math.sqrt(Math.max(0, r * r - y * y));
      fieldArr[i * 3] = s * Math.cos(a);
      fieldArr[i * 3 + 1] = y;
      fieldArr[i * 3 + 2] = s * Math.sin(a);
    }
    return { clumps: new Float32Array(clumpList), filaments: new Float32Array(filList), field: fieldArr };
  }, [nodes, byName, low]);

  // Laniakea's basin of attraction: ~520 Mly across, centred roughly toward the Great Attractor.
  const ga = byName.get("Norma Cluster (Great Attractor)")!.pos;
  const centre: Vec3 = [ga[0] * 0.55, ga[1] * 0.55, ga[2] * 0.55];
  const blob = useMemo(() => {
    const g = new THREE.SphereGeometry(250, 26, 18);
    const pos = g.getAttribute("position") as THREE.BufferAttribute;
    const rand = rng(3);
    const bumps = Array.from({ length: 5 }, () => [rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1, 0.08 + rand() * 0.14]);
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      let f = 1;
      for (const [a, b, c, amp] of bumps) f += amp * Math.sin((a * v.x + b * v.y + c * v.z) * 0.012);
      v.multiplyScalar(f);
      pos.setXYZ(i, v.x, v.y * 0.7, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  const shapley = useMemo(() => radecToSGScene("13h 25m", "-30 00", 470), []);

  return (
    <group>
      <Cloud positions={field} color="#9fb0d8" size={px(2.2)} opacity={0.55} />
      <Cloud positions={filaments} color="#c7d3f2" size={px(2.8)} opacity={0.8} />
      <Cloud positions={clumps} color="#ffe6c0" size={px(2.8)} opacity={0.7} />
      <mesh geometry={blob} position={centre}>
        <meshBasicMaterial color="#fbbf24" wireframe transparent opacity={0.03} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {nodes.map((n) => (
        <Marker key={n.name} position={n.pos} color={n.name === "Local Group" ? "#fde68a" : "#ffe9c8"} size={n.name === "Local Group" ? 14 : 8 + 26 * n.richness} labels={labels && !!n.label} text={n.name} sub={n.mly ? `${n.mly} Mly` : "you are here"} accent={n.name === "Local Group"} dy={n.name === "Local Group" ? 16 : -14} />
      ))}
      {labels && (
        <>
          <ULabel position={[centre[0], centre[1] + 200, centre[2]]} text="Laniakea Supercluster" sub="~520 million ly across" accent />
          <ULabel position={shapley} text="Shapley Supercluster →" sub="650 Mly, the densest region nearby" dim />
        </>
      )}
    </group>
  );
}

/* ---- Level 9: the observable universe (46,500 Mly) ---------------------- */

const R_UNIVERSE = 46_500;

/** Mottled orange/blue "CMB" texture painted on a canvas. */
function makeCmbTexture() {
  const S = 512;
  const c = document.createElement("canvas");
  c.width = S;
  c.height = S / 2;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#7a4a2a";
  ctx.fillRect(0, 0, S, S / 2);
  const rand = rng(2020);
  for (let i = 0; i < 2600; i++) {
    const hot = rand() > 0.5;
    ctx.fillStyle = hot ? `rgba(255,150,60,${0.15 + rand() * 0.3})` : `rgba(60,110,255,${0.15 + rand() * 0.3})`;
    const r = 3 + rand() * 12;
    ctx.beginPath();
    ctx.ellipse(rand() * S, rand() * (S / 2), r, r * (0.6 + rand() * 0.6), rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function UniverseLevel({ labels, low }: LevelProps) {
  const { web, knots, colors } = useMemo(() => {
    const rand = rng(1999);
    const nNodes = low ? 220 : 520;
    const nodes: Vec3[] = [];
    for (let i = 0; i < nNodes; i++) {
      const r = R_UNIVERSE * Math.cbrt(rand());
      const z = rand() * 2 - 1, a = rand() * Math.PI * 2, s = Math.sqrt(1 - z * z);
      nodes.push([r * s * Math.cos(a), r * z, r * s * Math.sin(a)]);
    }
    // Connect each node to its three nearest neighbours: filaments around empty voids.
    const edges: [number, number][] = [];
    const seen = new Set<string>();
    for (let i = 0; i < nNodes; i++) {
      const d = nodes.map((p, j) => [j === i ? Infinity : Math.hypot(p[0] - nodes[i][0], p[1] - nodes[i][1], p[2] - nodes[i][2]), j] as const).sort((x, y) => x[0] - y[0]);
      for (let k = 0; k < 3; k++) {
        const j = d[k][1];
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, j]);
        }
      }
    }
    const perEdge = low ? 50 : 90;
    const web = new Float32Array(edges.length * perEdge * 3);
    const colors = new Float32Array(edges.length * perEdge * 3);
    let p = 0;
    for (const [i, j] of edges) {
      const A = nodes[i], B = nodes[j];
      const len = Math.hypot(B[0] - A[0], B[1] - A[1], B[2] - A[2]);
      const bow: Vec3 = [gauss(rand) * len * 0.1, gauss(rand) * len * 0.1, gauss(rand) * len * 0.1];
      for (let k = 0; k < perEdge; k++) {
        const t = rand();
        const w = Math.sin(t * Math.PI);
        const sigma = len * (0.02 + 0.05 * w);
        web[p * 3] = A[0] + (B[0] - A[0]) * t + bow[0] * w + gauss(rand) * sigma;
        web[p * 3 + 1] = A[1] + (B[1] - A[1]) * t + bow[1] * w + gauss(rand) * sigma;
        web[p * 3 + 2] = A[2] + (B[2] - A[2]) * t + bow[2] * w + gauss(rand) * sigma;
        // Bluer, fainter toward the ends (younger light from farther away).
        const dist = Math.hypot(web[p * 3], web[p * 3 + 1], web[p * 3 + 2]) / R_UNIVERSE;
        colors[p * 3] = 0.85 - 0.3 * dist;
        colors[p * 3 + 1] = 0.85 - 0.2 * dist;
        colors[p * 3 + 2] = 1;
        p++;
      }
    }
    const perNode = low ? 14 : 26;
    const knots = new Float32Array(nNodes * perNode * 3);
    nodes.forEach((n, i) => {
      for (let k = 0; k < perNode; k++) {
        const q = (i * perNode + k) * 3;
        knots[q] = n[0] + gauss(rand) * 600;
        knots[q + 1] = n[1] + gauss(rand) * 600;
        knots[q + 2] = n[2] + gauss(rand) * 600;
      }
    });
    return { web, knots, colors };
  }, [low]);
  const cmb = useMemo(() => makeCmbTexture(), []);
  return (
    <group>
      <Cloud positions={web} colors={colors} size={px(3)} opacity={1} />
      <Cloud positions={knots} color="#ffe9c8" size={px(3.4)} opacity={1} />
      {/* The CMB "surface of last scattering" as a faint mottled shell at the edge of the observable universe. */}
      <mesh renderOrder={2}>
        <sphereGeometry args={[R_UNIVERSE, 64, 40]} />
        <meshBasicMaterial map={cmb} transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <Marker position={[0, 0, 0]} color="#fde68a" size={1400} labels={labels} text="Laniakea · the Milky Way · you" sub="at the centre only because we look outward from here" accent dy={-16} />
      {labels && <ULabel position={[0, R_UNIVERSE, 0]} text="Cosmic microwave background" sub="light from 13.8 billion years ago · 46.5 billion ly away today" dy={-12} />}
    </group>
  );
}
