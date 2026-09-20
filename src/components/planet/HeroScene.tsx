"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import type { Body } from "@/lib/planets";
import { makeGlowTexture } from "@/lib/textures";
import { BodyMesh } from "@/components/scene/BodyMesh";
import { MilkyWay } from "@/components/scene/MilkyWay";
import { Effects } from "@/components/scene/Effects";

function SpinningBody({ body }: { body: Body }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isStar = body.id === "sun";
  const glow = useMemo(() => (isStar ? makeGlowTexture() : null), [isStar]);
  // Lean the axis by the obliquity in the screen plane so the tilt is visible from the camera.
  const tilt = -THREE.MathUtils.degToRad(body.axialTiltDeg);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * (isStar ? 0.05 : 0.12);
  });
  const axis = useMemo(
    () => [new THREE.Vector3(0, -1.55, 0), new THREE.Vector3(0, 1.55, 0)],
    [],
  );
  // Ringed bodies also get a little yaw so the ring plane isn't seen edge-on.
  const yaw = body.rings ? -0.55 : 0;
  return (
    <group rotation={[0, yaw, tilt, "YZX"]}>
      <BodyMesh body={body} radius={1} meshRef={meshRef} segments={96} sunBoost={isStar ? 1.7 : 1} />
      {!isStar && <Line points={axis} color="#ffffff" transparent opacity={0.28} lineWidth={1} dashed dashSize={0.08} gapSize={0.06} />}
      {glow && (
        <sprite scale={[4.6, 4.6, 1]}>
          <spriteMaterial map={glow} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      )}
    </group>
  );
}

/** Slowly spinning close-up of one body for the top of its page. */
export default function HeroScene({ body }: { body: Body }) {
  const isStar = body.id === "sun";
  const cam: [number, number, number] = body.rings ? [0, 1.1, 5.6] : [0, 0.35, 3.6];
  return (
    <Canvas camera={{ position: cam, fov: 38, near: 0.1, far: 8000 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
      <color attach="background" args={["#03050c"]} />
      <MilkyWay dim={0.45} />
      <Stars radius={600} depth={200} count={3000} factor={4} saturation={0} fade speed={0.2} />
      <ambientLight intensity={isStar ? 0.6 : 0.18} />
      <directionalLight position={[-6, 3, 5]} intensity={2.4} color="#fff4dc" />
      <SpinningBody body={body} />
      <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.08} rotateSpeed={0.6} />
      {isStar && <Effects />}
    </Canvas>
  );
}
