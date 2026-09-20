"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { PLANETS } from "@/lib/planets";
import { useSolarStore } from "@/store/useSolarStore";
import { Sun } from "./Sun";
import { Planet } from "./Planet";
import { CameraRig, DEFAULT_CAMERA } from "./CameraRig";
import { CompareView } from "./CompareView";

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
      <ambientLight intensity={0.35} />
      <Sun />
      {PLANETS.map((p, i) => (
        <Planet key={p.id} body={p} index={i} />
      ))}
    </>
  );
}

export default function SolarScene() {
  const view = useSolarStore((s) => s.view);
  const select = useSolarStore((s) => s.select);

  return (
    <Canvas
      camera={{ position: DEFAULT_CAMERA.toArray(), fov: 50, near: 0.1, far: 6000 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      onPointerMissed={() => select(null)}
    >
      <color attach="background" args={["#03050c"]} />
      <Stars radius={900} depth={300} count={7000} factor={5} saturation={0} fade speed={0.3} />
      <Clock />
      {view === "orbit" ? <OrbitView /> : <CompareView />}
      <OrbitControls makeDefault enableDamping dampingFactor={0.08} minDistance={1.5} maxDistance={2500} />
      <CameraRig />
    </Canvas>
  );
}
