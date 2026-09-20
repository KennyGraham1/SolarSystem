/**
 * Coordinate helpers for the cosmic zoom. All frames are right-handed with the
 * scene's Y axis pointing "north" (ecliptic / galactic / supergalactic pole),
 * so [x, y, z]scene = [x, z, -y]frame, matching `toScene` in lib/orbits.ts.
 */

export const DEG = Math.PI / 180;
/** Light-year in astronomical units (IAU: 63,241.077 AU). */
export const LY_IN_AU = 63_241.077;
/** Mean obliquity of the ecliptic, J2000 (degrees). */
const OBLIQUITY = 23.4392911;

export type Vec3 = [number, number, number];

/** Seeded PRNG (mulberry32) so procedural layouts are identical on every load. */
export function rng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Approximately normal (0, 1) variate from a uniform source (sum of three uniforms). */
export const gauss = (rand: () => number) => (rand() + rand() + rand() - 1.5) * 2;

/** Parse "17h 15m 32s" (or "17 15 32", "17.163") into degrees of right ascension. */
export function raDeg(ra: string | number) {
  if (typeof ra === "number") return ra * 15;
  const parts = ra.replace(/[hms]/g, " ").trim().split(/\s+/).map(Number);
  const [h, m = 0, s = 0] = parts;
  return (h + m / 60 + s / 3600) * 15;
}

/** Parse "-62° 40′ 46″" / "-62 40 46" / "+12.44" into degrees of declination. */
export function decDeg(dec: string | number) {
  if (typeof dec === "number") return dec;
  const neg = dec.trim().startsWith("-") || dec.trim().startsWith("−");
  const parts = dec.replace(/[°′″'"+−-]/g, " ").trim().split(/\s+/).map(Number);
  const [d, m = 0, s = 0] = parts;
  const v = d + m / 60 + s / 3600;
  return neg ? -v : v;
}

/** Unit vector for a sky direction (any spherical frame): x toward lon 0, y toward lon 90°, z toward the pole. */
export function unit(lonDeg: number, latDeg: number): Vec3 {
  const cl = Math.cos(latDeg * DEG);
  return [cl * Math.cos(lonDeg * DEG), cl * Math.sin(lonDeg * DEG), Math.sin(latDeg * DEG)];
}

const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

/**
 * ICRS/J2000 equatorial → galactic rotation matrix
 * (ESA Hipparcos Catalogue vol. 1, §1.5.3, eq. 1.5.11).
 */
const EQ_TO_GAL: Vec3[] = [
  [-0.0548755604, -0.8734370902, -0.4838350155],
  [0.4941094279, -0.44482963, 0.7469822445],
  [-0.867666149, -0.1980763734, 0.4559837762],
];

/** Equatorial unit vector → galactic unit vector. */
export const eqToGal = (v: Vec3): Vec3 => [dot(EQ_TO_GAL[0], v), dot(EQ_TO_GAL[1], v), dot(EQ_TO_GAL[2], v)];

/** Equatorial → ecliptic (J2000): rotation about the x axis by the obliquity. */
export function eqToEcl(v: Vec3): Vec3 {
  const c = Math.cos(OBLIQUITY * DEG), s = Math.sin(OBLIQUITY * DEG);
  return [v[0], c * v[1] + s * v[2], -s * v[1] + c * v[2]];
}

/**
 * Galactic → supergalactic (de Vaucouleurs). The supergalactic north pole is at
 * galactic (l, b) = (47.37°, +6.32°) and the SGL = 0 direction at (137.37°, 0°).
 */
const SG_X = unit(137.37, 0);
const SG_Z = unit(47.37, 6.32);
const SG_Y = cross(SG_Z, SG_X);
export const galToSG = (v: Vec3): Vec3 => [dot(SG_X, v), dot(SG_Y, v), dot(SG_Z, v)];

/** Frame vector [x, y, z] (z = pole) → scene coordinates [x, z, -y]. */
export const toScene = (v: Vec3, d = 1): Vec3 => [v[0] * d, v[2] * d, -v[1] * d];

/** Sky position (RA/Dec, distance) → scene coordinates in the galactic frame. */
export function radecToGalScene(ra: string | number, dec: string | number, dist: number): Vec3 {
  return toScene(eqToGal(unit(raDeg(ra), decDeg(dec))), dist);
}

/** Sky position (RA/Dec, distance) → scene coordinates in the ecliptic frame used by the solar-system levels. */
export function radecToEclScene(ra: string | number, dec: string | number, dist: number): Vec3 {
  return toScene(eqToEcl(unit(raDeg(ra), decDeg(dec))), dist);
}

/** Sky position (RA/Dec, distance) → scene coordinates in the supergalactic frame. */
export function radecToSGScene(ra: string | number, dec: string | number, dist: number): Vec3 {
  return toScene(galToSG(eqToGal(unit(raDeg(ra), decDeg(dec)))), dist);
}

/** Galactic (l, b, distance) → scene coordinates in the galactic frame. */
export function galScene(l: number, b: number, dist: number): Vec3 {
  return toScene(unit(l, b), dist);
}

/** Galactic longitude/latitude (degrees) of an equatorial position — used for sanity checks. */
export function galLonLat(ra: string | number, dec: string | number) {
  const g = eqToGal(unit(raDeg(ra), decDeg(dec)));
  const l = ((Math.atan2(g[1], g[0]) / DEG) + 360) % 360;
  const b = Math.asin(g[2]) / DEG;
  return { l, b };
}

export const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
