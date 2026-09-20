import { create } from "zustand";
import * as THREE from "three";
import type { BodyId } from "@/lib/planets";

export type ViewMode = "orbit" | "compare";

interface SolarState {
  /** Simulated days per real second. */
  speed: number;
  paused: boolean;
  showOrbits: boolean;
  showLabels: boolean;
  trueDistances: boolean;
  view: ViewMode;
  selected: BodyId | null;
  quizOpen: boolean;
  /** Elapsed simulation time in Earth days. Written every frame by the scene. */
  simDays: number;
  /** Incremented to ask the camera rig to fly back to the overview. */
  resetToken: number;

  setSpeed: (speed: number) => void;
  togglePaused: () => void;
  toggle: (key: "showOrbits" | "showLabels" | "trueDistances") => void;
  setView: (view: ViewMode) => void;
  select: (id: BodyId | null) => void;
  setQuizOpen: (open: boolean) => void;
  resetView: () => void;
}

export const useSolarStore = create<SolarState>((set) => ({
  speed: 1,
  paused: false,
  showOrbits: true,
  showLabels: true,
  trueDistances: false,
  view: "orbit",
  selected: null,
  quizOpen: false,
  simDays: 0,
  resetToken: 0,

  setSpeed: (speed) => set({ speed }),
  togglePaused: () => set((s) => ({ paused: !s.paused })),
  toggle: (key) => set((s) => ({ [key]: !s[key] })),
  setView: (view) => set({ view, selected: null }),
  select: (id) => set({ selected: id }),
  setQuizOpen: (quizOpen) => set({ quizOpen }),
  resetView: () => set((s) => ({ selected: null, resetToken: s.resetToken + 1 })),
}));

/**
 * Live world positions and radii of every body, written by the scene each
 * frame and read by the camera rig. Kept outside React state on purpose so
 * it never triggers re-renders.
 */
export interface BodyTransform {
  position: THREE.Vector3;
  radius: number;
}
export const bodyTransforms = new Map<BodyId, BodyTransform>();

export function getTransform(id: BodyId): BodyTransform {
  let t = bodyTransforms.get(id);
  if (!t) {
    t = { position: new THREE.Vector3(), radius: 1 };
    bodyTransforms.set(id, t);
  }
  return t;
}
