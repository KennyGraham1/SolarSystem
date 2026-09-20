/**
 * Procedural barred-spiral model of the Milky Way, in light-years, galactocentric.
 * Frame: x toward the Sun→centre direction reversed (the Sun sits at x = -SUN_R),
 * y toward galactic longitude 90° (direction of rotation), z toward the north
 * galactic pole. Converted to scene coordinates [x, z, -y] at the end.
 *
 * Arm geometry is a four-arm logarithmic spiral with pitch 12° arranged so the
 * arms cross the Sun's azimuth at the observed galactocentric radii (Reid et al.
 * 2019, ApJ 885, 131): Norma ~10 kly, Scutum–Centaurus ~14.5 kly, Sagittarius–
 * Carina ~20 kly, Local/Orion spur through the Sun at 26 kly, Perseus ~32 kly,
 * Outer ~40 kly. The bar is ~27 kly long at ~30° to the Sun–centre line.
 */
import { DEG, gauss, rng, type Vec3 } from "./astro";

/** Sun's distance from Sagittarius A* (8.2 kpc ≈ 26,700 ly; rounded). */
export const SUN_R = 26_000;
export const DISC_R = 52_000;
const PITCH_TAN = Math.tan(12 * DEG);

export interface Arm {
  name: string;
  /** Radius (ly) where the arm crosses the Sun's azimuth (theta = 180°). */
  r180: number;
  /** Start and end azimuth (deg), increasing outward. */
  t0: number;
  t1: number;
  /** Gaussian half-width (ly). */
  width: number;
  /** Relative point density. */
  amp: number;
}

export const ARMS: Arm[] = [
  { name: "Scutum–Centaurus", r180: 14_500, t0: 150, t1: 560, width: 1500, amp: 1 },
  { name: "Perseus", r180: 32_000, t0: -30, t1: 330, width: 1500, amp: 1 },
  { name: "Sagittarius–Carina", r180: 20_300, t0: 60, t1: 420, width: 1200, amp: 0.65 },
  { name: "Norma–Outer", r180: 10_400, t0: 100, t1: 600, width: 1300, amp: 0.6 },
  { name: "Orion Spur", r180: SUN_R, t0: 140, t1: 220, width: 900, amp: 0.5 },
];

export const armRadius = (arm: Arm, thetaDeg: number) => arm.r180 * Math.exp((thetaDeg - 180) * DEG * PITCH_TAN);

/** Galactocentric (x, y) of an arm's ridge at azimuth theta (deg). */
export function armPoint(arm: Arm, thetaDeg: number): [number, number] {
  const r = armRadius(arm, thetaDeg);
  return [r * Math.cos(thetaDeg * DEG), r * Math.sin(thetaDeg * DEG)];
}

/**
 * Relative stellar density of the arms at galactocentric (x, y), summing a
 * Gaussian across each arm. Used to shade the local star field (level 5).
 */
export function armDensity(x: number, y: number) {
  const r = Math.hypot(x, y);
  const theta = Math.atan2(y, x) / DEG;
  let d = 0;
  for (const arm of ARMS) {
    // The spiral repeats every 360°; test the nearest winding(s).
    for (let k = -2; k <= 2; k++) {
      const t = theta + k * 360;
      if (t < arm.t0 - 15 || t > arm.t1 + 15) continue;
      const dr = r - armRadius(arm, t);
      const taper = Math.min(1, (t - arm.t0 + 15) / 40, (arm.t1 + 15 - t) / 40);
      d += arm.amp * taper * Math.exp(-(dr * dr) / (2 * arm.width * arm.width));
    }
  }
  return d;
}

export interface GalaxyBuffers {
  positions: Float32Array;
  colors: Float32Array;
  count: number;
  /** Dust-lane points (drawn with normal blending to darken the arms). */
  dust: Float32Array;
  /** Bright HII knots along the arms. */
  knots: Float32Array;
  knotColors: Float32Array;
}

const mix = (a: number[], b: number[], t: number) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const OLD = [1.0, 0.9, 0.74];
const YOUNG = [0.72, 0.8, 1.0];
const WHITE = [0.95, 0.95, 1.0];
const BULGE = [1.0, 0.82, 0.58];
const HII = [1.0, 0.55, 0.68];

/**
 * Build the galaxy point cloud. `count` is the total number of stars; the
 * layout is fully determined by `seed`. Positions are in light-years, scene frame.
 */
export function buildGalaxy(count: number, seed = 42): GalaxyBuffers {
  const rand = rng(seed);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  let i = 0;
  const put = (x: number, y: number, z: number, c: number[]) => {
    if (i >= count) return;
    positions[i * 3] = x;
    positions[i * 3 + 1] = z; // galactic z → scene y
    positions[i * 3 + 2] = -y; // galactic y → scene -z
    colors[i * 3] = c[0];
    colors[i * 3 + 1] = c[1];
    colors[i * 3 + 2] = c[2];
    i++;
  };

  // Bulge: 12 %
  const nBulge = Math.round(count * 0.07);
  for (let k = 0; k < nBulge; k++) {
    const x = gauss(rand) * 3200, y = gauss(rand) * 3200, z = gauss(rand) * 2200;
    put(x, y, z, mix(BULGE, OLD, rand() * 0.5));
  }
  // Bar: 10 %, axis at 30° to the Sun–centre line, near end at positive longitudes.
  const nBar = Math.round(count * 0.08);
  const cb = Math.cos(150 * DEG), sb = Math.sin(150 * DEG);
  for (let k = 0; k < nBar; k++) {
    const a = gauss(rand) * 6200, b = gauss(rand) * 1700, z = gauss(rand) * 1100;
    put(a * cb - b * sb, a * sb + b * cb, z, mix(BULGE, OLD, rand() * 0.6));
  }
  // Exponential disc: 33 % (Gamma(2, L) radial law), scale length 9,000 ly.
  const nDisc = Math.round(count * 0.36);
  for (let k = 0; k < nDisc; k++) {
    let r = -9000 * (Math.log(rand() + 1e-9) + Math.log(rand() + 1e-9));
    if (r > DISC_R) r = DISC_R * Math.sqrt(rand());
    const t = rand() * Math.PI * 2;
    const flare = 700 + 900 * (r / DISC_R);
    put(r * Math.cos(t), r * Math.sin(t), gauss(rand) * flare, mix(OLD, WHITE, rand() * 0.6));
  }
  // Halo: 3 %
  const nHalo = Math.round(count * 0.03);
  for (let k = 0; k < nHalo; k++) {
    put(gauss(rand) * 22000, gauss(rand) * 22000, gauss(rand) * 18000, mix(OLD, BULGE, rand()));
  }
  // Arms: the rest, split by amp × arc length.
  const nArms = count - i;
  const weights = ARMS.map((a) => a.amp * (a.t1 - a.t0) * (armRadius(a, a.t0) + armRadius(a, a.t1)));
  const wSum = weights.reduce((s, w) => s + w, 0);
  ARMS.forEach((arm, ai) => {
    const n = Math.round((nArms * weights[ai]) / wSum);
    for (let k = 0; k < n; k++) {
      // Arc-length weighting: bias toward the (longer) outer parts of the spiral.
      const u = rand();
      const t = arm.t0 + (arm.t1 - arm.t0) * Math.sqrt(u);
      const taper = Math.min(1, (t - arm.t0) / 30, (arm.t1 - t) / 40);
      if (rand() > 0.25 + 0.75 * taper) continue;
      const r0 = armRadius(arm, t);
      if (r0 > DISC_R) continue;
      const w = arm.width * (0.7 + 0.6 * (r0 / DISC_R));
      const r = r0 + gauss(rand) * w;
      const th = (t + gauss(rand) * 1.2) * DEG;
      const z = gauss(rand) * (450 + 500 * (r0 / DISC_R));
      const young = Math.exp(-((r - r0) * (r - r0)) / (2 * w * w * 0.35));
      put(r * Math.cos(th), r * Math.sin(th), z, mix(OLD, YOUNG, 0.35 + 0.65 * young * rand()));
    }
  });
  // Top up with disc stars if rounding left slots empty.
  while (i < count) {
    const r = DISC_R * Math.sqrt(rand()), t = rand() * Math.PI * 2;
    put(r * Math.cos(t), r * Math.sin(t), gauss(rand) * 1200, OLD);
  }

  // Dust lanes: hug the inner (concave) edge of each major arm.
  const nDust = Math.round(count * 0.06);
  const dust = new Float32Array(nDust * 3);
  for (let k = 0; k < nDust; k++) {
    const arm = ARMS[k % 4];
    const t = arm.t0 + (arm.t1 - arm.t0) * Math.sqrt(rand());
    const r0 = armRadius(arm, t);
    if (r0 > DISC_R * 0.9 || r0 < 9000) {
      k--;
      continue;
    }
    const r = r0 - arm.width * 0.55 + gauss(rand) * arm.width * 0.3;
    const th = (t + gauss(rand) * 0.8) * DEG;
    dust[k * 3] = r * Math.cos(th);
    dust[k * 3 + 1] = gauss(rand) * 200;
    dust[k * 3 + 2] = -r * Math.sin(th);
  }

  // HII knots: bright pink star-forming regions strung along the arms.
  const nKnots = Math.max(60, Math.round(count / 400));
  const knots = new Float32Array(nKnots * 3);
  const knotColors = new Float32Array(nKnots * 3);
  for (let k = 0; k < nKnots; k++) {
    const arm = ARMS[k % ARMS.length];
    const t = arm.t0 + 20 + (arm.t1 - arm.t0 - 40) * rand();
    const r = armRadius(arm, t) + gauss(rand) * arm.width * 0.4;
    if (r > DISC_R) {
      k--;
      continue;
    }
    const th = t * DEG;
    knots[k * 3] = r * Math.cos(th);
    knots[k * 3 + 1] = gauss(rand) * 150;
    knots[k * 3 + 2] = -r * Math.sin(th);
    const c = mix(HII, YOUNG, rand() * 0.5);
    knotColors[k * 3] = c[0];
    knotColors[k * 3 + 1] = c[1];
    knotColors[k * 3 + 2] = c[2];
  }

  return { positions, colors, count, dust, knots, knotColors };
}

/**
 * Stars within `radius` ly of the Sun, following the same arm model so the
 * neighbourhood (level 5) matches the galaxy (level 6). Sun-centred scene frame.
 */
export function buildNeighbourhood(count: number, radius: number, seed = 7) {
  const rand = rng(seed);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  let i = 0;
  let guard = 0;
  while (i < count && guard++ < count * 40) {
    const r = radius * Math.sqrt(rand());
    const t = rand() * Math.PI * 2;
    const x = r * Math.cos(t), y = r * Math.sin(t); // Sun-centred, galactic x/y
    const density = 0.18 + armDensity(x - SUN_R, y);
    if (rand() * 1.5 > density) continue;
    const local = armDensity(x - SUN_R, y);
    const z = gauss(rand) * (280 + 320 * (1 - Math.min(1, local)));
    positions[i * 3] = x;
    positions[i * 3 + 1] = z;
    positions[i * 3 + 2] = -y;
    const c = mix(OLD, YOUNG, Math.min(1, local) * rand());
    colors[i * 3] = c[0];
    colors[i * 3 + 1] = c[1];
    colors[i * 3 + 2] = c[2];
    i++;
  }
  return { positions: positions.subarray(0, i * 3), colors: colors.subarray(0, i * 3), count: i };
}

/** Scene-frame position (ly, galactocentric) of an arm ridge point — for arm labels. */
export function armScene(armIndex: number, thetaDeg: number): Vec3 {
  const [x, y] = armPoint(ARMS[armIndex], thetaDeg);
  return [x, 0, -y];
}
