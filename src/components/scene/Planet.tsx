"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { MOON, orbitRadius, startAngle, visualRadius, type Body } from "@/lib/planets";
import { makeBodyTexture, makeRingTexture } from "@/lib/textures";
import { getTransform, useSolarStore } from "@/store/useSolarStore";
import { Label } from "./Label";

const TWO_PI = Math.PI * 2;

function OrbitPath({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 256; i++) {
      const a = (i / 256) * TWO_PI;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, -Math.sin(a) * radius));
    }
    return pts;
  }, [radius]);
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

export function Planet({ body, index }: { body: Body; index: number }) {
  const orbitRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => makeBodyTexture(body.id, body.texture, body.color, body.accent), [body]);

  const trueDistances = useSolarStore((s) => s.trueDistances);
  const showOrbits = useSolarStore((s) => s.showOrbits);
  const showLabels = useSolarStore((s) => s.showLabels);
  const selected = useSolarStore((s) => s.selected);
  const select = useSolarStore((s) => s.select);

  const radius = visualRadius(body.radiusKm);
  const distance = orbitRadius(body.distanceAU, trueDistances);
  const phase = startAngle(index);
  const tilt = THREE.MathUtils.degToRad(body.axialTiltDeg);

  useFrame(() => {
    const { simDays } = useSolarStore.getState();
    const a = phase + (TWO_PI * simDays) / body.orbitalPeriodDays;
    const g = orbitRef.current;
    if (!g) return;
    g.position.set(Math.cos(a) * distance, 0, -Math.sin(a) * distance);
    if (meshRef.current) meshRef.current.rotation.y = (TWO_PI * simDays) / body.rotationPeriodDays;
    const t = getTransform(body.id);
    t.position.copy(g.position);
    t.radius = body.rings ? radius * body.rings.outer : radius;
  });

  const isActive = selected === body.id;
  return (
    <group>
      {showOrbits && <OrbitPath radius={distance} />}
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
