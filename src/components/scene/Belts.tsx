"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { orbitRadius } from "@/lib/planets";
import { useSolarStore } from "@/store/useSolarStore";
import { useDeviceTier } from "@/lib/device";
import { Label } from "./Label";

/** Seeded PRNG so the belts look the same on every load. */
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface BeltProps {
  name: string;
  innerAU: number;
  outerAU: number;
  count: number;
  /** Typical inclination spread (degrees). */
  spreadDeg: number;
  /** Mean orbital period in days, for the slow drift. */
  periodDays: number;
  color: string;
  seed: number;
}

/**
 * A ring of small bodies drawn as points. Distances use the same compression
 * as the planets, so the belt always sits between the right orbits.
 */
function Belt({ name, innerAU, outerAU, count, spreadDeg, periodDays, color, seed }: BeltProps) {
  const trueDistances = useSolarStore((s) => s.trueDistances);
  const ref = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const rand = rng(seed);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Concentrate toward the middle of the belt; spread in inclination like the real population.
      const au = innerAU + (outerAU - innerAU) * (0.5 + 0.5 * (rand() + rand() - 1));
      const r = orbitRadius(au, trueDistances);
      const a = rand() * Math.PI * 2;
      const inc = ((rand() + rand() - 1) * spreadDeg * Math.PI) / 180;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = Math.sin(inc) * r * Math.sin(a + rand() * 0.3);
      arr[i * 3 + 2] = -Math.sin(a) * r;
    }
    return arr;
  }, [count, innerAU, outerAU, spreadDeg, seed, trueDistances]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame(() => {
    const { simDays } = useSolarStore.getState();
    if (ref.current) ref.current.rotation.y = (Math.PI * 2 * simDays) / periodDays;
  });

  const labelR = orbitRadius((innerAU + outerAU) / 2, trueDistances);

  return (
    <group>
      <group ref={ref}>
        <points geometry={geometry}>
          <pointsMaterial color={color} size={trueDistances ? 0.9 : 0.12} sizeAttenuation transparent opacity={0.4} depthWrite={false} />
        </points>
      </group>
      <group position={[labelR * Math.cos(-0.6), 0, -labelR * Math.sin(-0.6)]}>
        {name && <Label text={name} sub={`${innerAU}–${outerAU} AU`} y={0.4} />}
      </group>
    </group>
  );
}

export function Belts() {
  const show = useSolarStore((s) => s.showBelts);
  const showLabels = useSolarStore((s) => s.showLabels);
  const k = useDeviceTier() === "low" ? 0.4 : 1;
  if (!show) return null;
  return (
    <>
      <Belt name={showLabels ? "Asteroid belt" : ""} innerAU={2.1} outerAU={3.3} count={Math.round(3000 * k)} spreadDeg={8} periodDays={1_650} color="#c9bfae" seed={7} />
      <Belt name={showLabels ? "Kuiper belt" : ""} innerAU={30} outerAU={50} count={Math.round(4500 * k)} spreadDeg={12} periodDays={90_000} color="#9fb4d8" seed={11} />
    </>
  );
}
