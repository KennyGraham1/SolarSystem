"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SUN, SUN_VISUAL_RADIUS, spinStep } from "@/lib/planets";
import { makeBodyTexture, makeGlowTexture } from "@/lib/textures";
import { getTransform, useSolarStore } from "@/store/useSolarStore";
import { Label } from "./Label";

export function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => makeBodyTexture("sun", "star", SUN.color, SUN.accent), []);
  const glow = useMemo(() => makeGlowTexture(), []);
  const showLabels = useSolarStore((s) => s.showLabels);
  const selected = useSolarStore((s) => s.selected);
  const select = useSolarStore((s) => s.select);

  useFrame((_, delta) => {
    const { speed, paused } = useSolarStore.getState();
    if (meshRef.current && !paused) meshRef.current.rotation.y += spinStep(SUN.rotationPeriodDays, speed, delta);
    const t = getTransform("sun");
    t.position.set(0, 0, 0);
    t.radius = SUN_VISUAL_RADIUS;
  });

  return (
    <group>
      <pointLight intensity={2.6} decay={0} color="#fff4dc" />
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          select("sun");
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <sphereGeometry args={[SUN_VISUAL_RADIUS, 64, 64]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <sprite scale={[SUN_VISUAL_RADIUS * 4.5, SUN_VISUAL_RADIUS * 4.5, 1]}>
        <spriteMaterial map={glow} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      {showLabels && selected !== "sun" && <Label text="Sun" y={SUN_VISUAL_RADIUS * 1.25} />}
    </group>
  );
}
