/**
 * Approximate heliocentric planet positions from Keplerian elements.
 * Elements and method: JPL "Approximate Positions of the Planets"
 * (Standish), valid 1800–2050 AD to within a fraction of a degree.
 */
import type { BodyId } from "./planets";
import { orbitRadius } from "./planets";

// [a (AU), e, I (deg), L (deg), long. perihelion (deg), long. asc. node (deg)]
// followed by the per-Julian-century rates of change of the same six values.
type Elements = [number, number, number, number, number, number];
const ELEMENTS: Record<Exclude<BodyId, "sun">, { base: Elements; rate: Elements }> = {
  mercury: {
    base: [0.38709927, 0.20563593, 7.00497902, 252.2503235, 77.45779628, 48.33076593],
    rate: [0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081],
  },
  venus: {
    base: [0.72333566, 0.00677672, 3.39467605, 181.9790995, 131.60246718, 76.67984255],
    rate: [0.0000039, -0.00004107, -0.0007889, 58517.81538729, 0.00268329, -0.27769418],
  },
  earth: {
    base: [1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0.0],
    rate: [0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0.0],
  },
  mars: {
    base: [1.52371034, 0.0933941, 1.84969142, -4.55343205, -23.94362959, 49.55953891],
    rate: [0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343],
  },
  jupiter: {
    base: [5.202887, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909],
    rate: [-0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106],
  },
  saturn: {
    base: [9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448],
    rate: [-0.0012506, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794],
  },
  uranus: {
    base: [19.18916464, 0.04725744, 0.77263783, 313.23810451, 170.9542763, 74.01692503],
    rate: [-0.00196176, -0.00004397, -0.00242939, 428.48202785, 0.40805281, 0.04240589],
  },
  neptune: {
    base: [30.06992276, 0.00859048, 1.77004347, -55.12002969, 44.96476227, 131.78422574],
    rate: [0.00026291, 0.00005105, 0.00035372, 218.45945325, -0.32241464, -0.00508664],
  },
};

const J2000 = 2451545.0;
const DEG = Math.PI / 180;

export function dateToJD(date: Date) {
  return date.getTime() / 86_400_000 + 2440587.5;
}

export function jdToDate(jd: number) {
  return new Date((jd - 2440587.5) * 86_400_000);
}

export interface AUPosition {
  x: number;
  y: number;
  z: number;
}

/** Solve Kepler's equation M = E - e sin E for E (all in radians). */
function eccentricAnomaly(M: number, e: number) {
  let E = M + e * Math.sin(M);
  for (let i = 0; i < 8; i++) {
    const dE = (M - (E - e * Math.sin(E))) / (1 - e * Math.cos(E));
    E += dE;
    if (Math.abs(dE) < 1e-7) break;
  }
  return E;
}

function elementsAt(id: Exclude<BodyId, "sun">, jd: number) {
  const T = (jd - J2000) / 36525;
  const { base, rate } = ELEMENTS[id];
  return base.map((v, i) => v + rate[i] * T) as Elements;
}

/** Position on the orbit for a given mean anomaly, in heliocentric ecliptic AU. */
function positionFromElements(el: Elements, meanAnomalyDeg: number): AUPosition {
  const [a, e, I, , longPeri, node] = el;
  const omega = (longPeri - node) * DEG; // argument of perihelion
  const M = ((((meanAnomalyDeg + 180) % 360) + 360) % 360) - 180;
  const E = eccentricAnomaly(M * DEG, e);

  const xp = a * (Math.cos(E) - e);
  const yp = a * Math.sqrt(1 - e * e) * Math.sin(E);

  const cw = Math.cos(omega), sw = Math.sin(omega);
  const cO = Math.cos(node * DEG), sO = Math.sin(node * DEG);
  const cI = Math.cos(I * DEG), sI = Math.sin(I * DEG);

  return {
    x: (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
    y: (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
    z: sw * sI * xp + cw * sI * yp,
  };
}

/** Heliocentric ecliptic position (AU) of a planet at a Julian date. */
export function heliocentricPosition(id: Exclude<BodyId, "sun">, jd: number): AUPosition {
  const el = elementsAt(id, jd);
  const [, , , L, longPeri] = el;
  return positionFromElements(el, L - longPeri);
}

/** Points along the full ellipse at the given epoch, for drawing the orbit path. */
export function orbitPath(id: Exclude<BodyId, "sun">, jd: number, segments = 256): AUPosition[] {
  const el = elementsAt(id, jd);
  const pts: AUPosition[] = [];
  for (let i = 0; i <= segments; i++) pts.push(positionFromElements(el, (i / segments) * 360));
  return pts;
}

/**
 * Map an AU position to scene coordinates. Ecliptic x→x, y→−z (so planets
 * move counter-clockwise seen from above), z→y. In the compressed view the
 * radial distance is squashed by `orbitRadius` but the direction is kept.
 */
export function toScene(p: AUPosition, trueDistances: boolean): [number, number, number] {
  const r = Math.hypot(p.x, p.y, p.z);
  const f = r === 0 ? 0 : orbitRadius(r, trueDistances) / r;
  return [p.x * f, p.z * f, -p.y * f];
}

/** Mean orbital speed in km/s: ellipse perimeter (Ramanujan) over the period. */
export function orbitalSpeedKmS(id: Exclude<BodyId, "sun">, periodDays: number) {
  const [a, e] = ELEMENTS[id].base;
  const b = a * Math.sqrt(1 - e * e);
  const h = ((a - b) / (a + b)) ** 2;
  const perimeterAU = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
  return (perimeterAU * 149_597_870.7) / (periodDays * 86_400);
}

/** Light travel time from the Sun in seconds. */
export function lightTimeSeconds(au: number) {
  return au * 499.005;
}
