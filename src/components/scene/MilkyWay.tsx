"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { TEXTURE_FILES, useOptionalTexture } from "@/lib/textureLoader";

/** Milky Way panorama on a huge inward-facing sphere; silently absent if the file is missing. */
export function MilkyWay({ radius = 3200, dim = 0.55 }: { radius?: number; dim?: number }) {
  const tex = useOptionalTexture(TEXTURE_FILES.milkyWay);
  const color = useMemo(() => new THREE.Color(dim, dim, dim), [dim]);
  if (!tex) return null;
  return (
    <mesh rotation={[0, 0, THREE.MathUtils.degToRad(-60)]}>
      <sphereGeometry args={[radius, 48, 32]} />
      <meshBasicMaterial map={tex} side={THREE.BackSide} color={color} depthWrite={false} fog={false} />
    </mesh>
  );
}
