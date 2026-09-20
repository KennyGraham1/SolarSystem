"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";
import type { BodyId } from "./planets";

/**
 * Photographic textures (Solar System Scope, CC BY 4.0) served from
 * /public/textures. Every lookup is optional: if a file is missing or fails to
 * decode, callers keep using the procedural canvas texture instead.
 */
export const TEXTURE_FILES: Record<BodyId | "moon" | "earthClouds" | "saturnRing" | "milkyWay", string> = {
  sun: "/textures/2k_sun.jpg",
  mercury: "/textures/2k_mercury.jpg",
  venus: "/textures/2k_venus_atmosphere.jpg",
  earth: "/textures/2k_earth_daymap.jpg",
  mars: "/textures/2k_mars.jpg",
  jupiter: "/textures/2k_jupiter.jpg",
  saturn: "/textures/2k_saturn.jpg",
  uranus: "/textures/2k_uranus.jpg",
  neptune: "/textures/2k_neptune.jpg",
  moon: "/textures/2k_moon.jpg",
  earthClouds: "/textures/2k_earth_clouds.jpg",
  saturnRing: "/textures/2k_saturn_ring_alpha.png",
  milkyWay: "/textures/2k_stars_milky_way.jpg",
};

const loader = typeof window !== "undefined" ? new THREE.TextureLoader() : null;
const pending = new Map<string, Promise<THREE.Texture | null>>();

/** Loads a texture once and caches it; resolves to null (never rejects) on any failure. */
export function loadTexture(url: string): Promise<THREE.Texture | null> {
  if (!loader) return Promise.resolve(null);
  let p = pending.get(url);
  if (!p) {
    p = new Promise<THREE.Texture | null>((resolve) => {
      loader.load(
        url,
        (tex) => {
          const img = tex.image as { width?: number; height?: number } | undefined;
          if (!img || !img.width || !img.height) return resolve(null);
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = 8;
          tex.needsUpdate = true;
          resolve(tex);
        },
        undefined,
        () => resolve(null),
      );
    });
    pending.set(url, p);
  }
  return p;
}

const procedural = new Map<string, THREE.Texture>();

/**
 * Returns the photographic texture at `url` once it has loaded, and the
 * procedural fallback (built lazily, cached by `key`) before then or if the
 * file is unusable. Pass `url = null` to always use the fallback.
 */
export function useTextureWithFallback(url: string | null, key: string, makeFallback: () => THREE.Texture): THREE.Texture {
  const [loaded, setLoaded] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    if (!url) return;
    let alive = true;
    loadTexture(url).then((t) => alive && setLoaded(t));
    return () => {
      alive = false;
    };
  }, [url]);
  if (loaded) return loaded;
  let fb = procedural.get(key);
  if (!fb) {
    fb = makeFallback();
    procedural.set(key, fb);
  }
  return fb;
}

/** Like useTextureWithFallback but with no fallback: null until (and unless) the file loads. */
export function useOptionalTexture(url: string): THREE.Texture | null {
  const [tex, setTex] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    let alive = true;
    loadTexture(url).then((t) => alive && setTex(t));
    return () => {
      alive = false;
    };
  }, [url]);
  return tex;
}
