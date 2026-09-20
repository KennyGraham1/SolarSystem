"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BODIES, DWARF_PLANETS, HELIOCENTRIC_BODIES, MOONS, PLANETS, SUN, poleTilt, type Body } from "@/lib/planets";
import { metricById, normalise } from "@/lib/compare";
import { getTransform, useSolarStore, type CompareGroup, type CompareMetric } from "@/store/useSolarStore";
import { Label } from "./Label";
import { usePoleQuaternion } from "./Planet";
import { BodyMesh } from "./BodyMesh";

const EARTH_UNIT = 0.5; // Earth radius in scene units for the size lineup
const BAR_UNIT = 1.5; // uniform sphere radius when comparing another metric
const BAR_MAX = 16; // tallest bar

/** Where the camera should look for the current layout; read by CameraRig every frame. */
export const compareFrame = { centerX: 0, distance: 128 };

interface Entry {
  body: Body;
  r: number;
  x: number;
  /** Bar height in scene units (0 in size mode). */
  bar: number;
  sub: string;
  /** Extra label lift so neighbouring labels don't collide. */
  lift: number;
}

function groupBodies(group: CompareGroup): Body[] {
  if (group === "planets") return [SUN, ...PLANETS];
  if (group === "moons") return [...DWARF_PLANETS, ...MOONS];
  return BODIES;
}

function layout(group: CompareGroup, metricId: CompareMetric): Entry[] {
  const metric = metricById(metricId);
  const bodies = groupBodies(group).filter((b) => metric.value(b) !== null);
  if (metricId === "size") {
    let x = -16; // right edge of the previous body
    const helio = new Set(HELIOCENTRIC_BODIES.map((b) => b.id));
    return bodies.map((body, i) => {
      const r = (body.radiusKm / 6_371) * EARTH_UNIT;
      const extent = body.rings ? r * body.rings.outer : r; // rings need room too
      const sub = metric.format(body.radiusKm, body);
      if (body.id === "sun") return { body, r, x: x - r, bar: 0, sub, lift: 0 }; // Sun: only its right limb is in view
      const gap = r < 1 ? 7 : 2.5;
      if (body.kind === "moon" && i > 0 && helio.has(bodies[i - 1].id)) x += 6; // breathing room before the moons
      x += gap + extent;
      const entry = { body, r, x, bar: 0, sub, lift: 0 };
      x += extent;
      return entry;
    });
  }
  // Other metrics: equal-sized spheres sorted by value, each with a bar above it.
  const values = bodies.map((b) => metric.value(b)!);
  const sorted = bodies.map((b, i) => ({ b, v: values[i] })).sort((p, q) => q.v - p.v);
  const spacing = 5;
  return sorted.map(({ b, v }, i) => ({
    body: b,
    r: BAR_UNIT,
    x: i * spacing,
    bar: 0.4 + normalise(values, v, metric.log) * BAR_MAX,
    sub: metric.format(v, b),
    lift: sorted.length > 12 ? (i % 2) * 2.2 : 0,
  }));
}

/** Every body at its true relative size, or ranked by another metric with bars. */
export function CompareView() {
  const group = useSolarStore((s) => s.compareGroup);
  const metric = useSolarStore((s) => s.compareMetric);
  const resetView = useSolarStore((s) => s.resetView);
  const entries = useMemo(() => layout(group, metric), [group, metric]);

  // Re-frame the camera whenever the row changes.
  useEffect(() => {
    const xs = entries.filter((e) => e.body.id !== "sun" || metric !== "size").map((e) => e.x);
    const span = Math.max(...xs) - Math.min(...xs);
    compareFrame.centerX = (Math.min(...xs) + Math.max(...xs)) / 2;
    compareFrame.distance = Math.max(60, span * 0.85 + 24);
    resetView();
  }, [entries, metric, resetView]);

  return (
    <group>
      <directionalLight position={[30, 20, 40]} intensity={2.2} />
      <ambientLight intensity={0.25} />
      {entries.map((e) => (
        <CompareBody key={e.body.id} entry={e} />
      ))}
    </group>
  );
}

function CompareBody({ entry: { body, r: radius, x, bar, sub, lift } }: { entry: Entry }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const barRef = useRef<THREE.Mesh>(null);
  const showLabels = useSolarStore((s) => s.showLabels);
  const selected = useSolarStore((s) => s.selected);
  const select = useSolarStore((s) => s.select);
  const pole = usePoleQuaternion(poleTilt(body), body.poleLonDeg);
  const ringExtent = body.rings ? radius * body.rings.outer : radius;

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
    // Grow the bar in from zero when it first appears.
    if (barRef.current && bar > 0) {
      const s = THREE.MathUtils.damp(barRef.current.scale.y, 1, 4, delta);
      barRef.current.scale.y = s;
      barRef.current.position.y = ringExtent + 0.6 + (bar * s) / 2;
    }
    const t = getTransform(body.id);
    t.position.set(x, 0, 0);
    t.radius = ringExtent;
  });

  return (
    <group position={[x, 0, 0]}>
      <group quaternion={pole}>
        <BodyMesh body={body} radius={radius} meshRef={meshRef} onSelect={() => select(body.id)} segments={bar > 0 ? 40 : 64} sunBoost={1.7} />
      </group>
      {bar > 0 && (
        <mesh ref={barRef} scale={[1, 0.001, 1]} position={[0, ringExtent + 0.6, 0]}>
          <boxGeometry args={[1.1, bar, 1.1]} />
          <meshStandardMaterial color={body.color} emissive={body.color} emissiveIntensity={0.35} transparent opacity={0.85} />
        </mesh>
      )}
      {showLabels && (
        <Label text={body.name} sub={sub} y={bar > 0 ? ringExtent + 0.6 + bar + 0.9 + lift : ringExtent * (body.rings ? 1.0 : 1.35) + 0.7} active={selected === body.id} />
      )}
    </group>
  );
}
