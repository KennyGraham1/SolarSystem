"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Body } from "@/lib/planets";
import { makeBodyTexture, makeRingStripTexture, ringStripGeometry } from "@/lib/textures";
import { TEXTURE_FILES, useTextureWithFallback } from "@/lib/textureLoader";

/** Soft fresnel halo that reads as an atmosphere. */
const ATMOSPHERE: Partial<Record<Body["id"], { color: string; intensity: number }>> = {
  earth: { color: "#6ab8ff", intensity: 0.9 },
  venus: { color: "#f3dca6", intensity: 0.7 },
  mars: { color: "#e8a273", intensity: 0.35 },
  uranus: { color: "#bfeaf2", intensity: 0.5 },
  neptune: { color: "#6b8dff", intensity: 0.55 },
  jupiter: { color: "#f0d9b8", intensity: 0.18 },
  saturn: { color: "#f5e6b8", intensity: 0.18 },
};

const ATMO_VERT = /* glsl */ `
  varying float vFacing;
  void main() {
    vec3 n = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vFacing = abs(dot(n, normalize(-mv.xyz)));
    gl_Position = projectionMatrix * mv;
  }`;
// Rendered on the back faces of a sphere slightly larger than the body, so only
// a thin annulus outside the planet's disk is visible. `uLimb` is the facing
// value at the planet's limb; the glow peaks there and fades to the outer edge.
const ATMO_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uLimb;
  varying float vFacing;
  void main() {
    float t = clamp(vFacing / uLimb, 0.0, 1.0);
    float glow = pow(t, 2.2) * uIntensity;
    gl_FragColor = vec4(uColor, clamp(glow, 0.0, 1.0));
  }`;
const ATMO_SCALE = 1.08;

function Atmosphere({ radius, segments, color, intensity }: { radius: number; segments: number; color: string; intensity: number }) {
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: intensity },
      uLimb: { value: Math.sqrt(1 - 1 / (ATMO_SCALE * ATMO_SCALE)) },
    }),
    [color, intensity],
  );
  return (
    <mesh>
      <sphereGeometry args={[radius * ATMO_SCALE, segments, segments]} />
      <shaderMaterial
        vertexShader={ATMO_VERT}
        fragmentShader={ATMO_FRAG}
        uniforms={uniforms}
        transparent
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

interface Props {
  body: Body;
  radius: number;
  /** Receives the spinning mesh so the parent can drive rotation. */
  meshRef?: RefObject<THREE.Mesh | null>;
  onSelect?: () => void;
  segments?: number;
  /** >1 pushes the Sun's colour into HDR so bloom picks it up. */
  sunBoost?: number;
  /** Draw the atmosphere rim (off for the tiny orbit-view spheres). */
  atmosphere?: boolean;
}

function Rings({ body, radius }: { body: Body; radius: number }) {
  const rings = body.rings!;
  const texture = useTextureWithFallback(
    body.id === "saturn" ? TEXTURE_FILES.saturnRing : null,
    `${body.id}-ring-strip`,
    () => makeRingStripTexture(body.id, rings.color),
  );
  const geometry = useMemo(() => ringStripGeometry(radius * rings.inner, radius * rings.outer), [radius, rings.inner, rings.outer]);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={geometry}>
      <meshBasicMaterial map={texture} transparent opacity={rings.opacity} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function Clouds({ radius, segments }: { radius: number; segments: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const clouds = useTextureWithFallback(TEXTURE_FILES.earthClouds, "earth-clouds", () => new THREE.Texture());
  const ready = !!(clouds.image as { width?: number } | undefined)?.width;
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012;
  });
  if (!ready) return null;
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius * 1.012, segments, segments]} />
      <meshStandardMaterial color="#ffffff" alphaMap={clouds} transparent opacity={0.85} depthWrite={false} roughness={1} />
    </mesh>
  );
}

/**
 * A planet or the Sun: photographic texture when available (procedural
 * fallback otherwise), rings, Earth's cloud deck and a soft atmosphere rim.
 * Wrap it in a group carrying the pole quaternion for the correct tilt.
 */
export function BodyMesh({ body, radius, meshRef, onSelect, segments = 48, sunBoost = 1, atmosphere = true }: Props) {
  const texture = useTextureWithFallback(TEXTURE_FILES[body.id], body.id, () =>
    makeBodyTexture(body.id, body.texture, body.color, body.accent),
  );
  const isStar = body.id === "sun";
  const sunColor = useMemo(() => new THREE.Color(sunBoost, sunBoost, sunBoost), [sunBoost]);
  const atmo = atmosphere ? ATMOSPHERE[body.id] : undefined;

  return (
    <>
      <mesh
        ref={meshRef}
        onClick={
          onSelect &&
          ((e) => {
            e.stopPropagation();
            onSelect();
          })
        }
        onPointerOver={onSelect && (() => (document.body.style.cursor = "pointer"))}
        onPointerOut={onSelect && (() => (document.body.style.cursor = "auto"))}
      >
        <sphereGeometry args={[radius, segments, segments]} />
        {isStar ? (
          <meshBasicMaterial map={texture} color={sunColor} toneMapped={false} />
        ) : (
          <meshStandardMaterial map={texture} roughness={0.9} metalness={0} />
        )}
        {body.id === "earth" && <Clouds radius={radius} segments={segments} />}
      </mesh>
      {atmo && <Atmosphere radius={radius} segments={segments} color={atmo.color} intensity={atmo.intensity} />}
      {body.rings && <Rings body={body} radius={radius} />}
    </>
  );
}
