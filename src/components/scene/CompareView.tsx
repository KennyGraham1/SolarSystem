"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BODIES, type Body } from "@/lib/planets";
import { makeBodyTexture, makeRingTexture } from "@/lib/textures";
import { getTransform, useSolarStore } from "@/store/useSolarStore";
import { Label } from "./Label";

const EARTH_UNIT = 0.5; // Earth radius in scene units for the lineup

/** Static row layout: each body placed after the previous one with a small gap. */
const LAYOUT = (() => {
  let x = -8; // right edge of the previous body
  return BODIES.map((body, i) => {
    const r = (body.radiusKm / 6_371) * EARTH_UNIT;
    const extent = body.rings ? r * body.rings.outer : r; // rings need room too
    if (i === 0) return { body, r, x: x - r }; // Sun: only its right limb is in view
    const gap = r < 1 ? 6 : 2;
    x += gap + extent;
    const entry = { body, r, x };
    x += extent;
    return entry;
  });
})();
export const COMPARE_CENTER_X = (LAYOUT[1].x + LAYOUT[LAYOUT.length - 1].x) / 2;

/** Every body at its true relative size, lined up in a row. */
export function CompareView() {
  return (
    <group>
      <directionalLight position={[30, 20, 40]} intensity={2.2} />
      <ambientLight intensity={0.25} />
      {LAYOUT.map(({ body, r, x }) => (
        <CompareBody key={body.id} body={body} radius={r} x={x} />
      ))}
    </group>
  );
}

function CompareBody({ body, radius, x }: { body: Body; radius: number; x: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => makeBodyTexture(body.id, body.texture, body.color, body.accent), [body]);
  const ringTexture = useMemo(
    () => (body.rings ? makeRingTexture(body.id, body.rings.color, body.rings.inner / body.rings.outer) : null),
    [body],
  );
  const showLabels = useSolarStore((s) => s.showLabels);
  const selected = useSolarStore((s) => s.selected);
  const select = useSolarStore((s) => s.select);
  const isStar = body.id === "sun";
  const tilt = THREE.MathUtils.degToRad(body.axialTiltDeg);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
    const t = getTransform(body.id);
    t.position.set(x, 0, 0);
    t.radius = body.rings ? radius * body.rings.outer : radius;
  });

  const ratio = body.radiusKm / 6_371;
  const sub = isStar ? `${Math.round(ratio)}× Earth` : ratio >= 1 ? `${ratio.toFixed(1)}× Earth` : `${ratio.toFixed(2)}× Earth`;

  return (
    <group position={[x, 0, 0]}>
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
          <sphereGeometry args={[radius, 64, 64]} />
          {isStar ? (
            <meshBasicMaterial map={texture} toneMapped={false} />
          ) : (
            <meshStandardMaterial map={texture} roughness={0.85} />
          )}
        </mesh>
        {body.rings && ringTexture && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * body.rings.inner, radius * body.rings.outer, 128]} />
            <meshBasicMaterial map={ringTexture} transparent opacity={body.rings.opacity} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
        )}
      </group>
      {showLabels && (
        <Label text={body.name} sub={sub} y={radius * (body.rings ? 1.7 : 1.35) + 0.7} active={selected === body.id} />
      )}
    </group>
  );
}
