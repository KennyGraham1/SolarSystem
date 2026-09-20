"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { MOON, poleDirection, spinStep, visualRadius, type Body, type BodyId } from "@/lib/planets";
import { heliocentricPosition, orbitPath, toScene } from "@/lib/orbits";
import { makeBodyTexture } from "@/lib/textures";
import { TEXTURE_FILES, useTextureWithFallback } from "@/lib/textureLoader";
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

function Moon({ parentRadius }: { parentRadius: number }) {
  const ref = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTextureWithFallback(TEXTURE_FILES.moon, "moon", () => makeBodyTexture("moon", MOON.texture, MOON.color, MOON.accent));
  const r = parentRadius * (MOON.radiusKm / 6_371); // true size ratio to Earth
  const d = parentRadius * 2.6;
  useFrame(() => {
    const { simDays } = useSolarStore.getState();
    const a = (TWO_PI * simDays) / MOON.orbitalPeriodDays;
    ref.current?.position.set(Math.cos(a) * d, 0, -Math.sin(a) * d);
    // Tidally locked: one rotation per orbit keeps the same face toward Earth.
    if (meshRef.current) meshRef.current.rotation.y = a;
  });
  return (
    <group ref={ref}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[r, 24, 24]} />
        <meshStandardMaterial map={texture} roughness={1} />
      </mesh>
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
  const pole = usePoleQuaternion(body.axialTiltDeg, body.poleLonDeg);

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
          <BodyMesh body={body} radius={radius} meshRef={meshRef} onSelect={() => select(body.id)} segments={48} />
        </group>
        {body.id === "earth" && <Moon parentRadius={radius} />}
        {showLabels && !isActive && <Label text={body.name} y={radius * (body.rings ? 1.6 : 1.3) + 0.25} />}
      </group>
    </group>
  );
}
