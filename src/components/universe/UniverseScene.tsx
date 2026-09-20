"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ComponentType } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useSolarStore } from "@/store/useSolarStore";
import { useDeviceTier } from "@/lib/device";
import { rng, smoothstep } from "./astro";
import { CAMERA, LEVELS, STEP_SECONDS, cameraDistanceFor, innerCentreWorld, levelScale } from "./levels";
import { Cloud } from "./primitives";
import { InnerSolarLevel, SolarSystemLevel, HeliosphereLevel, OortLevel, type LevelProps } from "./levels/SolarLevels";
import { NearestStarsLevel, OrionArmLevel } from "./levels/StarLevels";
import { MilkyWayLevel, LocalGroupLevel } from "./levels/GalaxyLevels";
import { LaniakeaLevel, UniverseLevel } from "./levels/CosmicLevels";

const COMPONENTS: ComponentType<LevelProps>[] = [
  InnerSolarLevel,
  SolarSystemLevel,
  HeliosphereLevel,
  OortLevel,
  NearestStarsLevel,
  OrionArmLevel,
  MilkyWayLevel,
  LocalGroupLevel,
  LaniakeaLevel,
  UniverseLevel,
];

/** Multiply every material's opacity in a level by `f` (base opacity remembered on the material). */
function setFade(group: THREE.Group, f: number) {
  if (group.userData.fade === f) return;
  group.userData.fade = f;
  group.traverse((o) => {
    const m = (o as THREE.Mesh).material as THREE.Material | undefined;
    if (!m || typeof m.opacity !== "number") return;
    if (m.userData.baseOpacity === undefined) m.userData.baseOpacity = m.opacity;
    m.opacity = m.userData.baseOpacity * f;
  });
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Hosts the levels and animates the zoom. The current position is a float
 * `pos`: an integer means one level is shown; between two integers the inner
 * level shrinks toward its place inside the outer one while the outer one
 * settles from an enlarged state — a physically consistent continuous zoom.
 */
function ZoomStage({ low }: { low: boolean }) {
  const target = useSolarStore((s) => s.universeLevel);
  const anim = useRef({ pos: target, from: target, to: target, t0: 0, dur: 0 });
  const groups = useRef<(THREE.Group | null)[]>([]);
  const [settled, setSettled] = useState(true);
  const [span, setSpan] = useState<[number, number]>([target, target]);

  useEffect(() => {
    const a = anim.current;
    if (a.to === target) return;
    a.from = a.pos;
    a.to = target;
    a.t0 = performance.now();
    a.dur = STEP_SECONDS * Math.min(2.2, Math.max(1, Math.abs(a.to - a.from))) * 1000;
    setSettled(false);
    setSpan([Math.floor(Math.min(a.from, a.to)), Math.ceil(Math.max(a.from, a.to))]);
  }, [target]);

  useFrame(() => {
    const a = anim.current;
    if (a.pos !== a.to) {
      const t = Math.min(1, (performance.now() - a.t0) / a.dur);
      a.pos = a.from + (a.to - a.from) * easeInOut(t);
      if (t >= 1) {
        a.pos = a.to;
        setSettled(true);
        setSpan([a.to, a.to]);
      }
    }
    const lo = Math.floor(a.pos), hi = Math.ceil(a.pos), e = a.pos - lo;
    groups.current.forEach((g, i) => {
      if (!g) return;
      if (i < lo || i > hi) {
        g.visible = false;
        return;
      }
      g.visible = true;
      if (lo === hi) {
        g.scale.setScalar(1);
        g.position.set(0, 0, 0);
        setFade(g, 1);
        return;
      }
      const F = LEVELS[hi].radiusLy / LEVELS[lo].radiusLy;
      const [ax, ay, az] = innerCentreWorld(hi);
      const k = Math.pow(F, 1 - e); // scale of the outer level (F → 1)
      if (i === hi) {
        g.scale.setScalar(k);
        g.position.set(-ax * k * (1 - e), -ay * k * (1 - e), -az * k * (1 - e));
        setFade(g, smoothstep(0.12, 0.6, e));
      } else {
        g.scale.setScalar(k / F);
        g.position.set(ax * k * e, ay * k * e, az * k * e);
        setFade(g, 1 - smoothstep(0.4, 0.92, e));
      }
    });
  });

  const mounted: number[] = [];
  for (let i = Math.max(0, span[0] - 1); i <= Math.min(LEVELS.length - 1, span[1] + 1); i++) mounted.push(i);

  return (
    <>
      {mounted.map((i) => {
        const Level = COMPONENTS[i];
        return (
          <group key={LEVELS[i].id} ref={(el) => { groups.current[i] = el; }} visible={false}>
            <group scale={levelScale(i)}>
              <Level labels={settled && i === target} low={low} />
            </group>
          </group>
        );
      })}
    </>
  );
}

/** Distant star field that fades out once the view is larger than the galaxy. */
function BackgroundStars({ low }: { low: boolean }) {
  const positions = useMemo(() => {
    const rand = rng(1234);
    const n = low ? 1500 : 4000;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const z = rand() * 2 - 1, a = rand() * Math.PI * 2, s = Math.sqrt(1 - z * z);
      const r = 1500 + rand() * 300;
      arr[i * 3] = r * s * Math.cos(a);
      arr[i * 3 + 1] = r * z;
      arr[i * 3 + 2] = r * s * Math.sin(a);
    }
    return arr;
  }, [low]);
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const level = useSolarStore.getState().universeLevel;
    const want = level <= 4 ? 1 : level === 5 ? 0.45 : 0;
    if (ref.current) setFade(ref.current, THREE.MathUtils.lerp(ref.current.userData.fade ?? 1, want, 0.04));
  });
  return (
    <group ref={ref}>
      <Cloud positions={positions} color="#dfe7ff" size={2.6} attenuate={false} opacity={0.6} />
    </group>
  );
}

/** Keeps the camera at the distance that fits the frame for the current canvas aspect ratio. */
function CameraFit() {
  const { size, camera } = useThree();
  useEffect(() => {
    camera.position.setLength(cameraDistanceFor(size.width, size.height));
    camera.updateProjectionMatrix();
  }, [size.width, size.height, camera]);
  return null;
}

/** Flags the first rendered frame so the loading screen can fade away (if this view loads first). */
function Ready() {
  const setSceneReady = useSolarStore((s) => s.setSceneReady);
  useEffect(() => {
    const id = requestAnimationFrame(() => setSceneReady(true));
    return () => cancelAnimationFrame(id);
  }, [setSceneReady]);
  return null;
}

const subscribeMotion = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useReducedMotion = () => useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);

export default function UniverseScene() {
  const low = useDeviceTier() === "low";
  const reducedMotion = useReducedMotion();
  return (
    // On phones the canvas keeps the top 58 % of the screen (MOBILE_CANVAS_FRACTION) and the caption sheet the rest.
    <div className="absolute inset-x-0 top-0 h-[58dvh] sm:inset-0 sm:h-auto">
      <div className="h-full w-full">
        <Canvas camera={{ position: CAMERA.position, fov: CAMERA.fov, near: 0.1, far: 60000 }} dpr={low ? 1 : [1, 1.5]} gl={{ antialias: !low, powerPreference: "high-performance" }}>
          <color attach="background" args={["#03050c"]} />
          <BackgroundStars low={low} />
          <ZoomStage low={low} />
          <OrbitControls makeDefault enableDamping dampingFactor={0.08} enableZoom={false} enablePan={false} autoRotate={!reducedMotion} autoRotateSpeed={0.35} minPolarAngle={0.25} maxPolarAngle={Math.PI - 0.25} />
          <CameraFit />
          <Ready />
        </Canvas>
      </div>
    </div>
  );
}
