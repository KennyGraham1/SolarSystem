"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { moonsOf, poleDirection, poleTilt, spinStep, visualRadius, type Body, type BodyId } from "@/lib/planets";
import { heliocentricPosition, orbitPath, toScene } from "@/lib/orbits";
import { currentJD, getTransform, useSolarStore } from "@/store/useSolarStore";
import { Label } from "./Label";
import { BodyMesh } from "./BodyMesh";

const TWO_PI = Math.PI * 2;

type PlanetId = Exclude<BodyId, "sun">;

function OrbitPath({ id, trueDistances, color, active }: { id: PlanetId; trueDistances: boolean; color: string; active: boolean }) {
  // The ellipse drifts by a negligible amount over decades, so sample it once at the start epoch.
  const points = useMemo(() => {
    const jd = currentJD({ epochMs: useSolarStore.getState().epochMs, simDays: 0 });
    return orbitPath(id, jd).map((p) => new THREE.Vector3(...toScene(p, trueDistances)));
  }, [id, trueDistances]);
  return <Line points={points} color={active ? color : "#ffffff"} transparent opacity={active ? 0.55 : 0.16} lineWidth={active ? 1.5 : 1} />;
}

/** Quaternion that takes the mesh's +Y axis onto the body's real rotation pole. */
export function usePoleQuaternion(obliquityDeg: number, poleLonDeg: number) {
  return useMemo(() => {
    const pole = new THREE.Vector3(...poleDirection(obliquityDeg, poleLonDeg)).normalize();
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), pole);
  }, [obliquityDeg, poleLonDeg]);
}

/** Fastest a moon is allowed to circle its planet on screen (revolutions per real second). */
const MAX_MOON_REV_PER_SEC = 0.35;

/**
 * A moon orbiting its planet. Orbits are drawn far closer than reality so the
 * system fits on screen; periods are real (capped for readability like planet
 * spin), retrograde moons go the other way, and all are tidally locked.
 */
function MoonOrbit({ moon, index, parent, parentRadius, parentPosition }: { moon: Body; index: number; parent: Body; parentRadius: number; parentPosition: React.RefObject<THREE.Group | null> }) {
  const ref = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = useRef((index * 2.4) % TWO_PI); // spread the moons out
  const select = useSolarStore((s) => s.select);
  const selected = useSolarStore((s) => s.selected);
  const showLabels = useSolarStore((s) => s.showLabels);
  const pole = usePoleQuaternion(poleTilt(moon), moon.poleLonDeg);

  // Size: square-root compressed relative to the parent, with a floor so tiny moons stay clickable.
  const r = Math.max(0.09, parentRadius * Math.sqrt(moon.radiusKm / parent.radiusKm) * 0.5);
  // Distance: just outside the rings, then one lane per moon.
  const first = parent.rings ? parent.rings.outer + 0.5 : 2.4;
  const d = parentRadius * (first + index * 0.85) + r;
  const period = moon.orbitalPeriodDays; // negative = retrograde
  const orbitPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 96; i++) pts.push(new THREE.Vector3(Math.cos((i / 96) * TWO_PI) * d, 0, -Math.sin((i / 96) * TWO_PI) * d));
    return pts;
  }, [d]);

  useFrame((_, delta) => {
    const { speed, paused } = useSolarStore.getState();
    if (!paused) {
      const rev = Math.min(speed / Math.abs(period), MAX_MOON_REV_PER_SEC);
      angle.current += Math.sign(period) * rev * TWO_PI * delta;
    }
    const a = angle.current;
    ref.current?.position.set(Math.cos(a) * d, 0, -Math.sin(a) * d);
    if (meshRef.current) meshRef.current.rotation.y = a; // tidally locked
    if (ref.current && parentPosition.current) {
      const t = getTransform(moon.id);
      t.position.copy(parentPosition.current.position).add(ref.current.position);
      t.radius = Math.max(r, 0.3); // keep the fly-in from getting too close to a tiny moon
    }
  });

  const family = selected === moon.id || selected === parent.id || moonsOf(parent.id).some((m) => m.id === selected);
  return (
    <group>
      {family && <Line points={orbitPoints} color={moon.color} transparent opacity={selected === moon.id ? 0.5 : 0.18} lineWidth={1} />}
      <group ref={ref}>
        <group quaternion={pole}>
          <BodyMesh body={moon} radius={r} meshRef={meshRef} onSelect={() => select(moon.id)} segments={24} />
        </group>
        {showLabels && family && selected !== moon.id && <Label text={moon.name} y={r * 1.3 + 0.12} />}
      </group>
    </group>
  );
}

export function Planet({ body }: { body: Body }) {
  const id = body.id as PlanetId;
  const orbitRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const trueDistances = useSolarStore((s) => s.trueDistances);
  const showOrbits = useSolarStore((s) => s.showOrbits);
  const showLabels = useSolarStore((s) => s.showLabels);
  const selected = useSolarStore((s) => s.selected);
  const select = useSolarStore((s) => s.select);

  const radius = visualRadius(body.radiusKm);
  const pole = usePoleQuaternion(poleTilt(body), body.poleLonDeg);

  useFrame((_, delta) => {
    const state = useSolarStore.getState();
    const { speed, paused } = state;
    const g = orbitRef.current;
    if (!g) return;
    g.position.set(...toScene(heliocentricPosition(id, currentJD(state)), trueDistances));
    if (meshRef.current && !paused) meshRef.current.rotation.y += spinStep(body.rotationPeriodDays, speed, delta);
    const t = getTransform(body.id);
    t.position.copy(g.position);
    t.radius = body.rings ? radius * body.rings.outer : radius;
  });

  const isActive = selected === body.id;
  return (
    <group>
      {showOrbits && <OrbitPath id={id} trueDistances={trueDistances} color={body.color} active={isActive} />}
      <group ref={orbitRef}>
        <group quaternion={pole}>
          <BodyMesh body={body} radius={radius} meshRef={meshRef} onSelect={() => select(body.id)} segments={body.kind === "dwarf" ? 24 : 48} />
        </group>
        {moonsOf(body.id).map((m, i) => (
          <MoonOrbit key={m.id} moon={m} index={i} parent={body} parentRadius={radius} parentPosition={orbitRef} />
        ))}
        {showLabels && !isActive && <Label text={body.name} y={radius * (body.rings ? 1.6 : 1.3) + 0.25} />}
      </group>
    </group>
  );
}
