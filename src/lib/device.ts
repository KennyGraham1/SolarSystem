"use client";

import { useSyncExternalStore } from "react";

export type DeviceTier = "low" | "high";

/**
 * Rough capability tier used to scale rendering work. "low" = phone-sized
 * viewport, few CPU cores, or a user preference for reduced motion.
 */
export function detectTier(): DeviceTier {
  if (typeof window === "undefined") return "high";
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;
  const cores = navigator.hardwareConcurrency ?? 8;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  return small || cores <= 4 || reduced ? "low" : "high";
}

let tier: DeviceTier | null = null;
const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  const onResize = () => {
    const next = detectTier();
    if (next !== tier) {
      tier = next;
      listeners.forEach((l) => l());
    }
  };
  window.addEventListener("resize", onResize);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("resize", onResize);
  };
}
const getSnapshot = () => (tier ??= detectTier());
const getServerSnapshot = (): DeviceTier => "high";

export function useDeviceTier(): DeviceTier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Non-hook access for code outside React (e.g. the texture loader). */
export const currentTier = () => (typeof window === "undefined" ? "high" : (tier ??= detectTier()));
