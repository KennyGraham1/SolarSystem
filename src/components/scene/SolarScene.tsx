"use client";

import { useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { ORBITING_BODIES } from "@/lib/planets";
import { Belts } from "./Belts";
import { useSolarStore } from "@/store/useSolarStore";
import { Sun } from "./Sun";
import { Planet } from "./Planet";
import { CameraRig, DEFAULT_CAMERA } from "./CameraRig";
import { CompareView } from "./CompareView";
import { MilkyWay } from "./MilkyWay";
import { Effects } from "./Effects";
import { useDeviceTier } from "@/lib/device";

/** Advances the simulation clock. */
function Clock() {
  useFrame((_, delta) => {
    const { paused, speed, simDays } = useSolarStore.getState();
    if (!paused) useSolarStore.setState({ simDays: simDays + delta * speed });
  });
  return null;
}

function OrbitView() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <Sun />
      {ORBITING_BODIES.map((p) => (
        <Planet key={p.id} body={p} />
      ))}
      <Belts />
    </>
  );
}

/** Flags the first rendered frame so the loading screen can fade away. */
function Ready() {
  const setSceneReady = useSolarStore((s) => s.setSceneReady);
  useEffect(() => {
    const id = requestAnimationFrame(() => setSceneReady(true));
    return () => cancelAnimationFrame(id);
  }, [setSceneReady]);
  return null;
}

export default function SolarScene() {
  const view = useSolarStore((s) => s.view);
  const select = useSolarStore((s) => s.select);
  // Phones and low-core machines skip post-processing and render at 1× to keep 60 fps.
  const low = useDeviceTier() === "low";

  return (
    <Canvas
      camera={{ position: DEFAULT_CAMERA.toArray(), fov: 50, near: 0.1, far: 8000 }}
      dpr={low ? 1 : [1, 1.5]}
      gl={{ antialias: !low, powerPreference: "high-performance" }}
      onPointerMissed={() => select(null)}
    >
      <color attach="background" args={["#03050c"]} />
      <MilkyWay />
      <Stars radius={900} depth={300} count={low ? 2000 : 5000} factor={4} saturation={0} fade speed={0.3} />
      <Clock />
      {view === "orbit" ? <OrbitView /> : <CompareView />}
      <OrbitControls makeDefault enableDamping dampingFactor={0.08} minDistance={1.5} maxDistance={2500} />
      <CameraRig />
      {!low && <Effects />}
      <Ready />
    </Canvas>
  );
}
