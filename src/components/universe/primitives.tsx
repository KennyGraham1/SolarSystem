"use client";

import { useMemo, type ReactNode } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import type { Vec3 } from "./astro";

/* ---- Textures ----------------------------------------------------------- */

let starTex: THREE.Texture | null = null;
/** Soft white disc used for star points and glows (tinted by material colour). */
export function getStarTexture() {
  if (starTex) return starTex;
  const S = 64;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.3, "rgba(255,255,255,0.7)");
  g.addColorStop(0.7, "rgba(255,255,255,0.12)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  starTex = new THREE.CanvasTexture(c);
  return starTex;
}

let glowTex: THREE.Texture | null = null;
/** Wider, softer halo for sprites (sun glow, galaxy cores, nebulae). */
export function getGlowTexture() {
  if (glowTex) return glowTex;
  const S = 128;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.15, "rgba(255,255,255,0.55)");
  g.addColorStop(0.45, "rgba(255,255,255,0.12)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  glowTex = new THREE.CanvasTexture(c);
  return glowTex;
}

/* ---- Point clouds ------------------------------------------------------- */

interface CloudProps {
  positions: Float32Array;
  colors?: Float32Array;
  color?: string;
  /** Point size (world units when attenuated, pixels otherwise). */
  size: number;
  opacity?: number;
  attenuate?: boolean;
  additive?: boolean;
  /** Draw as soft discs (default) or hard squares. */
  soft?: boolean;
  renderOrder?: number;
}

/** Memoised point cloud; the geometry is only rebuilt when the buffers change. */
export function Cloud({ positions, colors, color = "#ffffff", size, opacity = 1, attenuate = true, additive = true, soft = true, renderOrder }: CloudProps) {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    if (colors) g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);
  const map = useMemo(() => (soft ? getStarTexture() : null), [soft]);
  return (
    <points geometry={geometry} renderOrder={renderOrder} frustumCulled={false}>
      <pointsMaterial
        color={color}
        vertexColors={!!colors}
        size={size}
        sizeAttenuation={attenuate}
        map={map ?? undefined}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

/* ---- Lines -------------------------------------------------------------- */

interface PolylineProps {
  points: Vec3[];
  color?: string;
  opacity?: number;
  closed?: boolean;
}

/** Thin line through the given points (1 px, like the orbit lines in the main scene). */
export function Polyline({ points, color = "#ffffff", opacity = 0.4, closed = false }: PolylineProps) {
  const geometry = useMemo(() => {
    const arr = new Float32Array((points.length + (closed ? 1 : 0)) * 3);
    points.forEach((p, i) => arr.set(p, i * 3));
    if (closed) arr.set(points[0], points.length * 3);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [points, closed]);
  // R3F's <line> collides with the SVG element type, so build the object directly.
  const line = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
    const l = new THREE.Line(geometry, mat);
    l.frustumCulled = false;
    return l;
  }, [geometry, color, opacity]);
  return <primitive object={line} />;
}

interface CircleProps {
  radius: number;
  color?: string;
  opacity?: number;
  segments?: number;
  /** Rotation (radians) applied to the ring: [x, y, z]. */
  rotation?: [number, number, number];
}

/** Circle in the XZ plane, e.g. a circular orbit or a scale ring. */
export function Circle({ radius, color, opacity, segments = 128, rotation }: CircleProps) {
  const points = useMemo<Vec3[]>(() => {
    const pts: Vec3[] = [];
    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
    }
    return pts;
  }, [radius, segments]);
  return (
    <group rotation={rotation}>
      <Polyline points={points} color={color} opacity={opacity} closed />
    </group>
  );
}

/* ---- Sprites and labels ------------------------------------------------- */

interface GlowProps {
  position?: Vec3;
  size: number;
  color?: string;
  opacity?: number;
  wide?: boolean;
}

/** Additive halo sprite. `size` is the full width in the parent's units. */
export function Glow({ position, size, color = "#ffffff", opacity = 1, wide = true }: GlowProps) {
  const map = useMemo(() => (wide ? getGlowTexture() : getStarTexture()), [wide]);
  return (
    <sprite position={position} scale={[size, size, 1]}>
      <spriteMaterial map={map} color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} depthWrite={false} />
    </sprite>
  );
}

/** Soft luminous disc lying in the XZ plane (a galaxy's diffuse glow). */
export function DiscGlow({ radius, color = "#8f9ce8", opacity = 0.3 }: { radius: number; color?: string; opacity?: number }) {
  const map = useMemo(() => getGlowTexture(), []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[radius * 2.4, radius * 2.4]} />
      <meshBasicMaterial map={map} color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

interface LabelProps {
  position?: Vec3;
  text: string;
  sub?: string;
  /** Screen offset in px. */
  dx?: number;
  dy?: number;
  accent?: boolean;
  dim?: boolean;
  /** Anchor the text to the left of the point instead of centred. */
  align?: "center" | "left" | "right";
}

/** Screen-space label (drei Html), pointer-events none, fades in on mount. */
export function ULabel({ position, text, sub, dx = 0, dy = -14, accent, dim, align = "center" }: LabelProps) {
  const justify = align === "left" ? "items-start" : align === "right" ? "items-end" : "items-center";
  const tx = align === "left" ? "0" : align === "right" ? "-100%" : "-50%";
  return (
    <Html position={position} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
      <div
        className={`animate-fade-in flex flex-col ${justify} whitespace-nowrap text-[11px] leading-tight tracking-wide select-none ${
          accent ? "text-amber-200" : dim ? "text-white/45" : "text-white/80"
        }`}
        style={{ transform: `translate(calc(${tx} + ${dx}px), calc(-50% + ${dy}px))` }}
      >
        <span className="font-medium drop-shadow-[0_0_4px_rgba(0,0,0,0.95)]">{text}</span>
        {sub && <span className="text-[10px] text-white/50 drop-shadow-[0_0_4px_rgba(0,0,0,0.95)]">{sub}</span>}
      </div>
    </Html>
  );
}

interface MarkerProps extends Omit<LabelProps, "position"> {
  position: Vec3;
  color: string;
  /** Glow width in parent units. */
  size: number;
  labels: boolean;
  children?: ReactNode;
}

/** Glowing dot with an optional label. */
export function Marker({ position, color, size, labels, children, ...label }: MarkerProps) {
  return (
    <group position={position}>
      <Glow size={size} color={color} wide={false} />
      {labels && <ULabel {...label} />}
      {children}
    </group>
  );
}
