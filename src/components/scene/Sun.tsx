"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SUN, SUN_VISUAL_RADIUS, spinStep } from "@/lib/planets";
import { makeGlowTexture } from "@/lib/textures";
import { getTransform, useSolarStore } from "@/store/useSolarStore";
import { Label } from "./Label";
import { usePoleQuaternion } from "./Planet";
import { BodyMesh } from "./BodyMesh";

export function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glow = useMemo(() => makeGlowTexture(), []);
  const showLabels = useSolarStore((s) => s.showLabels);
  const selected = useSolarStore((s) => s.selected);
  const select = useSolarStore((s) => s.select);
  const pole = usePoleQuaternion(SUN.axialTiltDeg, SUN.poleLonDeg);

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
      <group quaternion={pole}>
        <BodyMesh body={SUN} radius={SUN_VISUAL_RADIUS} meshRef={meshRef} onSelect={() => select("sun")} segments={64} sunBoost={1.7} />
      </group>
      <sprite scale={[SUN_VISUAL_RADIUS * 4.2, SUN_VISUAL_RADIUS * 4.2, 1]}>
        <spriteMaterial map={glow} transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      {showLabels && selected !== "sun" && <Label text="Sun" y={SUN_VISUAL_RADIUS * 1.25} />}
    </group>
  );
}
