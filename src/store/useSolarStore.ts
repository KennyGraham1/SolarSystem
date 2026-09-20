import { create } from "zustand";
import * as THREE from "three";
import type { BodyId } from "@/lib/planets";

export type ViewMode = "orbit" | "compare" | "universe";
export type CompareMetric = "size" | "mass" | "gravity" | "day" | "year" | "temperature" | "distance" | "moons";
export type CompareGroup = "planets" | "moons" | "all";

interface SolarState {
  /** Simulated days per real second. */
  speed: number;
  paused: boolean;
  showOrbits: boolean;
  showLabels: boolean;
  showBelts: boolean;
  trueDistances: boolean;
  view: ViewMode;
  compareMetric: CompareMetric;
  compareGroup: CompareGroup;
  /** Cosmic zoom level index (0 = solar system) for the universe view. */
  universeLevel: number;
  selected: BodyId | null;
  quizOpen: boolean;
  /** Real-world instant the simulation started from (ms since epoch). */
  epochMs: number;
  /** Elapsed simulation time in Earth days since `epochMs`. Written every frame by the scene. */
  simDays: number;
  /** Incremented to ask the camera rig to fly back to the overview. */
  resetToken: number;
  /** Index into TOUR when the guided tour is running, otherwise null. */
  tourStep: number | null;
  /** True once the WebGL scene has rendered its first frame (hides the loading screen). */
  sceneReady: boolean;

  setSpeed: (speed: number) => void;
  togglePaused: () => void;
  toggle: (key: "showOrbits" | "showLabels" | "trueDistances" | "showBelts") => void;
  setView: (view: ViewMode) => void;
  setCompareMetric: (m: CompareMetric) => void;
  setCompareGroup: (g: CompareGroup) => void;
  setUniverseLevel: (level: number) => void;
  select: (id: BodyId | null) => void;
  setQuizOpen: (open: boolean) => void;
  resetView: () => void;
  /** Jump the simulation clock to a real date. */
  jumpToDate: (date: Date) => void;
  setTourStep: (step: number | null) => void;
  setSceneReady: (ready: boolean) => void;
}

export const useSolarStore = create<SolarState>((set) => ({
  speed: 1,
  paused: false,
  showOrbits: true,
  showLabels: true,
  showBelts: true,
  trueDistances: false,
  view: "orbit",
  compareMetric: "size",
  compareGroup: "planets",
  universeLevel: 0,
  selected: null,
  quizOpen: false,
  epochMs: Date.now(),
  simDays: 0,
  resetToken: 0,
  tourStep: null,
  sceneReady: false,

  setSpeed: (speed) => set({ speed }),
  togglePaused: () => set((s) => ({ paused: !s.paused })),
  toggle: (key) => set((s) => ({ [key]: !s[key] })),
  setView: (view) => set({ view, selected: null }),
  setCompareMetric: (compareMetric) => set({ compareMetric }),
  setCompareGroup: (compareGroup) => set({ compareGroup }),
  setUniverseLevel: (universeLevel) => set({ universeLevel }),
  select: (id) => set({ selected: id }),
  setQuizOpen: (quizOpen) => set({ quizOpen }),
  resetView: () => set((s) => ({ selected: null, resetToken: s.resetToken + 1, tourStep: null })),
  jumpToDate: (date) => set((s) => ({ simDays: (date.getTime() - s.epochMs) / 86_400_000 })),
  setTourStep: (tourStep) => set({ tourStep }),
  setSceneReady: (sceneReady) => set({ sceneReady }),
}));

/** Julian date of the current simulation instant. */
export function currentJD(s: Pick<SolarState, "epochMs" | "simDays">) {
  return s.epochMs / 86_400_000 + 2440587.5 + s.simDays;
}

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
