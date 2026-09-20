"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { MOON, spinStep, visualRadius, type Body, type BodyId } from "@/lib/planets";
import { heliocentricPosition, orbitPath, toScene } from "@/lib/orbits";
import { makeBodyTexture, makeRingTexture } from "@/lib/textures";
import { currentJD, getTransform, useSolarStore } from "@/store/useSolarStore";
import { Label } from "./Label";

const TWO_PI = Math.PI * 2;

type PlanetId = Exclude<BodyId, "sun">;

function OrbitPath({ id, trueDistances }: { id: PlanetId; trueDistances: boolean }) {
  // The ellipse drifts by a negligible amount over decades, so sample it once at the start epoch.
  const points = useMemo(() => {
    const jd = currentJD({ epochMs: useSolarStore.getState().epochMs, simDays: 0 });
    return orbitPath(id, jd).map((p) => new THREE.Vector3(...toScene(p, trueDistances)));
  }, [id, trueDistances]);
  return <Line points={points} color="#ffffff" transparent opacity={0.18} lineWidth={1} />;
}

function Rings({ body, radius }: { body: Body; radius: number }) {
  const rings = body.rings!;
  const texture = useMemo(
    () => makeRingTexture(body.id, rings.color, rings.inner / rings.outer),
    [body.id, rings.color, rings.inner, rings.outer],
  );
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius * rings.inner, radius * rings.outer, 128]} />
      <meshBasicMaterial map={texture} transparent opacity={rings.opacity} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function Moon({ parentRadius }: { parentRadius: number }) {
  const ref = useRef<THREE.Group>(null);
  const texture = useMemo(() => makeBodyTexture("moon", MOON.texture, MOON.color, MOON.accent), []);
  const r = parentRadius * (MOON.radiusKm / 6_371); // true size ratio to Earth
  const d = parentRadius * 2.6;
  useFrame(() => {
    const { simDays } = useSolarStore.getState();
    const a = (TWO_PI * simDays) / MOON.orbitalPeriodDays;
    ref.current?.position.set(Math.cos(a) * d, 0, -Math.sin(a) * d);
  });
  return (
    <group ref={ref}>
      <mesh>
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
  const texture = useMemo(() => makeBodyTexture(body.id, body.texture, body.color, body.accent), [body]);

  const trueDistances = useSolarStore((s) => s.trueDistances);
  const showOrbits = useSolarStore((s) => s.showOrbits);
  const showLabels = useSolarStore((s) => s.showLabels);
  const selected = useSolarStore((s) => s.selected);
  const select = useSolarStore((s) => s.select);

  const radius = visualRadius(body.radiusKm);
  const tilt = THREE.MathUtils.degToRad(body.axialTiltDeg);

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
      {showOrbits && <OrbitPath id={id} trueDistances={trueDistances} />}
      <group ref={orbitRef}>
        <group rotation={[0, 0, tilt]}>
          <mesh
            ref={meshRef}
            onClick={(e) => {
              e.stopPropagation();
              select(body.id);
            }}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "auto")}
          >
            <sphereGeometry args={[radius, 48, 48]} />
            <meshStandardMaterial map={texture} roughness={0.85} metalness={0.05} />
          </mesh>
          {body.rings && <Rings body={body} radius={radius} />}
        </group>
        {body.id === "earth" && <Moon parentRadius={radius} />}
        {showLabels && !isActive && <Label text={body.name} y={radius * (body.rings ? 1.6 : 1.3) + 0.25} />}
      </group>
    </group>
  );
}
