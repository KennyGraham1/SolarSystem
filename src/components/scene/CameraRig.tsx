"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { bodyTransforms, getTransform, useSolarStore } from "@/store/useSolarStore";
import { bodyById } from "@/lib/planets";
import { compareFrame } from "./CompareView";

interface ControlsLike {
  target: THREE.Vector3;
  update: () => void;
}

export const DEFAULT_CAMERA = new THREE.Vector3(0, 62, 118);
export const TRUE_DISTANCE_CAMERA = new THREE.Vector3(0, 480, 820);
const compareCamera = new THREE.Vector3();

/** Moons that aren't drawn in the current view fly to their parent instead. */
function targetTransform(id: Parameters<typeof getTransform>[0]) {
  const own = bodyTransforms.get(id);
  if (own) return own;
  const b = bodyById(id);
  return getTransform(b.kind === "moon" && b.parent ? b.parent : id);
}

const tmp = new THREE.Vector3();
const goal = new THREE.Vector3();
const dir = new THREE.Vector3();
const side = new THREE.Vector3();
const UP = new THREE.Vector3(0, 1, 0);

/**
 * Follows the selected body: keeps the orbit-controls target locked on it and
 * shifts the camera by the same amount the body moved, so the user can still
 * orbit around a moving planet. Also flies the camera in on selection and
 * back out on reset.
 */
export function CameraRig() {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as unknown as ControlsLike | null;
  const selected = useSolarStore((s) => s.selected);
  const view = useSolarStore((s) => s.view);
  const trueDistances = useSolarStore((s) => s.trueDistances);
  const resetToken = useSolarStore((s) => s.resetToken);

  const prevPos = useRef(new THREE.Vector3());
  const flyIn = useRef(0);
  const flyHome = useRef(0);

  useEffect(() => {
    if (selected) {
      prevPos.current.copy(targetTransform(selected).position);
      flyIn.current = 1.6;
      flyHome.current = 0;
    }
  }, [selected]);

  useEffect(() => {
    flyHome.current = 1.6;
    flyIn.current = 0;
  }, [resetToken, view, trueDistances]);

  useFrame((_, delta) => {
    if (!controls) return;
    const k = 1 - Math.pow(0.002, delta); // frame-rate independent easing

    if (selected) {
      const { position, radius } = targetTransform(selected);
      tmp.copy(position).sub(prevPos.current);
      camera.position.add(tmp);
      prevPos.current.copy(position);
      controls.target.copy(position);

      if (flyIn.current > 0) {
        // Portrait screens need more distance for the body to fit the narrow viewport.
        const aspect = (camera as THREE.PerspectiveCamera).aspect ?? 1;
        const fit = aspect < 1 ? 1.7 : 1;
        if (view === "orbit" && position.lengthSq() > 1) {
          // Approach from the sunlit side so the planet isn't in shadow.
          dir.copy(position).normalize();
          side.crossVectors(UP, dir).normalize();
          goal
            .copy(position)
            .addScaledVector(dir, -radius * 3.6 * fit)
            .addScaledVector(UP, radius * 1.3 * fit)
            .addScaledVector(side, radius * 2 * fit);
        } else {
          goal.set(radius * 0.6 * fit, radius * 0.9 * fit, radius * 4.4 * fit).add(position);
        }
        camera.position.lerp(goal, k);
        flyIn.current -= delta;
      }
    } else if (flyHome.current > 0) {
      const home = view === "compare" ? compareCamera.set(compareFrame.centerX, compareFrame.distance * 0.12, compareFrame.distance) : trueDistances ? TRUE_DISTANCE_CAMERA : DEFAULT_CAMERA;
      camera.position.lerp(home, k);
      controls.target.lerp(view === "compare" ? goal.set(compareFrame.centerX, 4, 0) : goal.set(0, 0, 0), k);
      flyHome.current -= delta;
    }
    controls.update();
  });

  return null;
}
