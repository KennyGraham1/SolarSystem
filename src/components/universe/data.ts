/**
 * Astronomical catalogue data for the cosmic zoom.
 *
 * Sources
 *  - Nearest stars: Wikipedia "List of nearest stars" (RECONS / Gaia DR3 parallaxes), fetched Sept 2026.
 *  - Spacecraft: heavens-above.com "Spacecraft escaping the Solar System" (JPL Horizons), Sept 2026;
 *    heliopause crossings from NASA/JPL Voyager mission pages (121 AU in 2012, 119.7 AU in 2018).
 *  - Deep-sky objects: SIMBAD / Wikipedia object pages (J2000 positions; distances rounded).
 *  - Local Group: Wikipedia "List of nearest galaxies" (distances) and NED (galactic l, b).
 *  - Clusters and superclusters: NED / Wikipedia cluster pages; Laniakea from Tully et al. 2014 (Nature 513, 71).
 */

export interface StarSystem {
  name: string;
  ra: string;
  dec: string;
  /** Distance in light-years. */
  ly: number;
  /** Spectral class of the primary (drives colour + size). */
  spectral: string;
  /** Companions, e.g. "A/B" — shown in the label. */
  note?: string;
}

/** Star systems within ~13 light-years of the Sun. */
export const NEAREST_STARS: StarSystem[] = [
  { name: "Proxima Centauri", ra: "14h 29m 43.0s", dec: "-62 40 46", ly: 4.2465, spectral: "M5.5" },
  { name: "Alpha Centauri A/B", ra: "14h 39m 36.5s", dec: "-60 50 02", ly: 4.3441, spectral: "G2", note: "G2 + K1" },
  { name: "Barnard's Star", ra: "17h 57m 48.5s", dec: "+04 41 36", ly: 5.9629, spectral: "M4" },
  { name: "Luhman 16", ra: "10h 49m 18.9s", dec: "-53 19 10", ly: 6.5102, spectral: "L8", note: "brown dwarf pair" },
  { name: "WISE 0855−0714", ra: "08h 55m 10.8s", dec: "-07 14 43", ly: 7.43, spectral: "Y4", note: "brown dwarf" },
  { name: "Wolf 359", ra: "10h 56m 29.2s", dec: "+07 00 53", ly: 7.856, spectral: "M6" },
  { name: "Lalande 21185", ra: "11h 03m 20.2s", dec: "+35 58 12", ly: 8.3044, spectral: "M2" },
  { name: "Sirius A/B", ra: "06h 45m 08.9s", dec: "-16 42 58", ly: 8.7094, spectral: "A1", note: "A1 + white dwarf" },
  { name: "Luyten 726-8", ra: "01h 39m 01.3s", dec: "-17 57 01", ly: 8.77, spectral: "M5.5", note: "UV Ceti" },
  { name: "Ross 154", ra: "18h 49m 49.4s", dec: "-23 50 10", ly: 9.7063, spectral: "M3.5" },
  { name: "Ross 248", ra: "23h 41m 54.7s", dec: "+44 10 30", ly: 10.3057, spectral: "M5.5" },
  { name: "Epsilon Eridani", ra: "03h 32m 55.8s", dec: "-09 27 30", ly: 10.4749, spectral: "K2" },
  { name: "Lacaille 9352", ra: "23h 05m 52.0s", dec: "-35 51 11", ly: 10.7241, spectral: "M0.5" },
  { name: "Ross 128", ra: "11h 47m 44.4s", dec: "+00 48 16", ly: 11.0074, spectral: "M4" },
  { name: "EZ Aquarii", ra: "22h 38m 33.4s", dec: "-15 17 57", ly: 11.109, spectral: "M5", note: "triple" },
  { name: "61 Cygni A/B", ra: "21h 06m 53.9s", dec: "+38 44 58", ly: 11.4039, spectral: "K5" },
  { name: "Procyon A/B", ra: "07h 39m 18.1s", dec: "+05 13 30", ly: 11.463, spectral: "F5", note: "F5 + white dwarf" },
  { name: "Struve 2398", ra: "18h 42m 46.7s", dec: "+59 37 49", ly: 11.4908, spectral: "M3" },
  { name: "Groombridge 34", ra: "00h 18m 22.9s", dec: "+44 01 23", ly: 11.6191, spectral: "M1.5" },
  { name: "DX Cancri", ra: "08h 29m 49.5s", dec: "+26 46 37", ly: 11.6797, spectral: "M6.5" },
  { name: "Epsilon Indi", ra: "22h 03m 21.7s", dec: "-56 47 10", ly: 11.867, spectral: "K5" },
  { name: "Tau Ceti", ra: "01h 44m 04.1s", dec: "-15 56 15", ly: 11.9118, spectral: "G8.5" },
  { name: "Gliese 1061", ra: "03h 35m 59.7s", dec: "-44 30 45", ly: 11.9839, spectral: "M5.5" },
  { name: "YZ Ceti", ra: "01h 12m 30.6s", dec: "-16 59 56", ly: 12.1222, spectral: "M4.5" },
  { name: "Luyten's Star", ra: "07h 27m 24.5s", dec: "+05 13 33", ly: 12.3485, spectral: "M3.5" },
  { name: "Teegarden's Star", ra: "02h 53m 00.9s", dec: "+16 52 53", ly: 12.497, spectral: "M6.5" },
  { name: "Kapteyn's Star", ra: "05h 11m 40.6s", dec: "-45 01 06", ly: 12.8308, spectral: "M1.5" },
  { name: "Lacaille 8760", ra: "21h 17m 15.3s", dec: "-38 52 03", ly: 12.9472, spectral: "M0" },
];

/** Approximate colour for a spectral class letter (O B A F G K M L T Y). */
export function spectralColor(spectral: string): string {
  switch (spectral[0]) {
    case "O": return "#9bb0ff";
    case "B": return "#aabfff";
    case "A": return "#cad7ff";
    case "F": return "#f8f7ff";
    case "G": return "#fff4e8";
    case "K": return "#ffd2a1";
    case "M": return "#ffb56c";
    case "L": return "#e0684b";
    case "T": return "#b0407a";
    case "Y": return "#7a3a8a";
    default: return "#ffffff";
  }
}

/** Relative brightness of a marker for a spectral class (bigger = brighter/hotter). */
export function spectralSize(spectral: string): number {
  switch (spectral[0]) {
    case "O": case "B": return 1.6;
    case "A": return 1.5;
    case "F": return 1.3;
    case "G": return 1.15;
    case "K": return 1.0;
    case "M": return 0.8;
    default: return 0.6;
  }
}

export interface Spacecraft {
  name: string;
  ra: string;
  dec: string;
  /** Heliocentric distance in AU (Sept 2026). */
  au: number;
  launched: number;
}

/** Spacecraft on solar-escape trajectories, positions from JPL Horizons via heavens-above.com (Sept 2026). */
export const SPACECRAFT: Spacecraft[] = [
  { name: "Voyager 1", ra: "17h 15m", dec: "+12 14", au: 171.9, launched: 1977 },
  { name: "Voyager 2", ra: "20h 06m", dec: "-59 55", au: 143.9, launched: 1977 },
  { name: "Pioneer 10", ra: "05h 15m", dec: "+26 01", au: 141.9, launched: 1972 },
  { name: "Pioneer 11", ra: "18h 54m", dec: "-08 55", au: 119.3, launched: 1973 },
  { name: "New Horizons", ra: "19h 15m", dec: "-20 17", au: 65.6, launched: 2006 },
];

export interface DeepSky {
  name: string;
  ra: string;
  dec: string;
  ly: number;
  kind: "nebula" | "cluster" | "star" | "remnant";
  /** Rough physical diameter in light-years (sprite size). */
  size: number;
  color: string;
  label?: boolean;
}

/** Landmarks within ~7,000 ly of the Sun (J2000, distances rounded). */
export const DEEP_SKY: DeepSky[] = [
  { name: "Orion Nebula", ra: "05h 35m 17s", dec: "-05 23 28", ly: 1344, kind: "nebula", size: 24, color: "#ff8fb0", label: true },
  { name: "Pleiades", ra: "03h 47m 24s", dec: "+24 07 00", ly: 444, kind: "cluster", size: 16, color: "#9fc4ff", label: true },
  { name: "Hyades", ra: "04h 27m 00s", dec: "+15 52 00", ly: 153, kind: "cluster", size: 20, color: "#ffe0b0", label: true },
  { name: "Beehive (M44)", ra: "08h 40m 24s", dec: "+19 59 00", ly: 610, kind: "cluster", size: 16, color: "#ffe9c8" },
  { name: "Betelgeuse", ra: "05h 55m 10s", dec: "+07 24 25", ly: 550, kind: "star", size: 0, color: "#ff9a5a", label: true },
  { name: "Rigel", ra: "05h 14m 32s", dec: "-08 12 06", ly: 860, kind: "star", size: 0, color: "#b7cbff", label: true },
  { name: "Antares", ra: "16h 29m 24s", dec: "-26 25 55", ly: 550, kind: "star", size: 0, color: "#ff8a5a", label: true },
  { name: "Deneb", ra: "20h 41m 26s", dec: "+45 16 49", ly: 2600, kind: "star", size: 0, color: "#e2ecff", label: true },
  { name: "Polaris", ra: "02h 31m 49s", dec: "+89 15 51", ly: 433, kind: "star", size: 0, color: "#fff3d6", label: true },
  { name: "Canopus", ra: "06h 23m 57s", dec: "-52 41 44", ly: 310, kind: "star", size: 0, color: "#fff8ea" },
  { name: "Spica", ra: "13h 25m 12s", dec: "-11 09 41", ly: 250, kind: "star", size: 0, color: "#b7cbff" },
  { name: "Vega", ra: "18h 36m 56s", dec: "+38 47 01", ly: 25, kind: "star", size: 0, color: "#cad7ff" },
  { name: "Sirius", ra: "06h 45m 09s", dec: "-16 42 58", ly: 8.6, kind: "star", size: 0, color: "#cad7ff" },
  { name: "Arcturus", ra: "14h 15m 40s", dec: "+19 10 56", ly: 36.7, kind: "star", size: 0, color: "#ffd2a1" },
  { name: "Lagoon Nebula", ra: "18h 03m 37s", dec: "-24 23 12", ly: 4100, kind: "nebula", size: 110, color: "#ff9db8", label: true },
  { name: "North America Nebula", ra: "20h 59m 17s", dec: "+44 31 44", ly: 2590, kind: "nebula", size: 100, color: "#ff9db8", label: true },
  { name: "Rosette Nebula", ra: "06h 33m 45s", dec: "+04 59 54", ly: 5200, kind: "nebula", size: 130, color: "#ff9db8", label: true },
  { name: "Helix Nebula", ra: "22h 29m 38s", dec: "-20 50 14", ly: 655, kind: "nebula", size: 6, color: "#9ff0ff" },
  { name: "Crab Nebula", ra: "05h 34m 32s", dec: "+22 00 52", ly: 6500, kind: "remnant", size: 11, color: "#ffd08a", label: true },
  { name: "Cygnus X", ra: "20h 33m 00s", dec: "+41 19 00", ly: 4600, kind: "nebula", size: 200, color: "#ffb0c4", label: true },
];

export interface Galaxy {
  name: string;
  /** Galactic longitude / latitude (degrees). */
  l: number;
  b: number;
  /** Distance from the Milky Way in light-years. */
  ly: number;
  /** Rough diameter in light-years. */
  size: number;
  type: "spiral" | "irregular" | "elliptical" | "dwarf";
  label?: boolean;
}

/** Local Group members (galactic coordinates from NED; distances from Wikipedia "List of nearest galaxies"). */
export const LOCAL_GROUP: Galaxy[] = [
  { name: "Andromeda (M31)", l: 121.17, b: -21.57, ly: 2_538_000, size: 152_000, type: "spiral", label: true },
  { name: "Triangulum (M33)", l: 133.61, b: -31.33, ly: 2_730_000, size: 61_000, type: "spiral", label: true },
  { name: "M32", l: 121.15, b: -21.98, ly: 2_489_000, size: 6_500, type: "elliptical" },
  { name: "M110", l: 120.72, b: -21.14, ly: 2_670_000, size: 17_000, type: "elliptical" },
  { name: "NGC 147", l: 119.82, b: -14.25, ly: 2_530_000, size: 10_000, type: "dwarf" },
  { name: "NGC 185", l: 120.79, b: -14.48, ly: 2_050_000, size: 8_000, type: "dwarf" },
  { name: "IC 10", l: 118.97, b: -3.34, ly: 2_446_000, size: 5_000, type: "irregular", label: true },
  { name: "Magellanic Clouds", l: 280.47, b: -32.89, ly: 163_000, size: 32_200, type: "irregular", label: true },
  { name: "Small Magellanic Cloud", l: 302.8, b: -44.3, ly: 205_000, size: 18_900, type: "irregular" },
  { name: "Sagittarius dSph", l: 5.6, b: -14.2, ly: 78_000, size: 10_000, type: "dwarf" },
  { name: "Draco", l: 86.37, b: 34.72, ly: 258_000, size: 2_700, type: "dwarf" },
  { name: "Ursa Minor", l: 104.97, b: 44.8, ly: 205_000, size: 2_000, type: "dwarf" },
  { name: "Sculptor", l: 287.53, b: -83.16, ly: 287_000, size: 3_000, type: "dwarf" },
  { name: "Sextans", l: 243.5, b: 42.27, ly: 280_000, size: 8_400, type: "dwarf" },
  { name: "Carina", l: 260.11, b: -22.22, ly: 330_000, size: 1_600, type: "dwarf" },
  { name: "Fornax dwarf", l: 237.1, b: -65.65, ly: 466_000, size: 5_000, type: "dwarf" },
  { name: "Leo II", l: 220.17, b: 67.23, ly: 701_000, size: 4_100, type: "dwarf" },
  { name: "Leo I", l: 225.99, b: 49.11, ly: 820_000, size: 4_000, type: "dwarf" },
  { name: "Phoenix dwarf", l: 272.16, b: -68.95, ly: 1_440_000, size: 4_000, type: "dwarf" },
  { name: "NGC 6822", l: 25.34, b: -18.4, ly: 1_859_000, size: 7_000, type: "irregular", label: true },
  { name: "IC 1613", l: 129.74, b: -60.56, ly: 2_240_000, size: 10_000, type: "irregular", label: true },
  { name: "Leo A", l: 196.9, b: 52.41, ly: 2_340_000, size: 5_000, type: "irregular", label: true },
  { name: "Pegasus dSph", l: 94.8, b: -43.55, ly: 2_550_000, size: 4_000, type: "dwarf" },
  { name: "Tucana dwarf", l: 322.91, b: -47.37, ly: 2_870_000, size: 4_000, type: "dwarf" },
  { name: "WLM", l: 75.87, b: -73.63, ly: 3_043_000, size: 11_500, type: "irregular", label: true },
  { name: "Sextans A", l: 246.15, b: 39.88, ly: 4_310_000, size: 5_000, type: "irregular" },
  { name: "Sextans B", l: 233.2, b: 43.78, ly: 4_470_000, size: 6_000, type: "irregular" },
  { name: "NGC 3109", l: 262.1, b: 23.07, ly: 4_338_000, size: 25_000, type: "irregular", label: true },
  { name: "Antlia dwarf", l: 263.1, b: 22.31, ly: 4_280_000, size: 3_000, type: "dwarf" },
];

export interface ClusterNode {
  name: string;
  ra: string;
  dec: string;
  /** Distance in millions of light-years. */
  mly: number;
  /** Relative richness (sprite size / point count). */
  richness: number;
  label?: boolean;
}

/** Galaxy clusters and groups within ~500 Mly (NED / Wikipedia; distances rounded). */
export const CLUSTERS: ClusterNode[] = [
  { name: "Local Group", ra: "00h 42m", dec: "+41 16", mly: 0, richness: 0.35, label: true },
  { name: "M81 group", ra: "09h 55m 33s", dec: "+69 03 55", mly: 11.8, richness: 0.3 },
  { name: "Centaurus A / M83 group", ra: "13h 25m 28s", dec: "-43 01 09", mly: 12, richness: 0.3 },
  { name: "Virgo Cluster", ra: "12h 30m 49s", dec: "+12 23 28", mly: 54, richness: 1.0, label: true },
  { name: "Ursa Major cluster", ra: "11h 57m", dec: "+49 15", mly: 60, richness: 0.45 },
  { name: "Fornax Cluster", ra: "03h 38m 29s", dec: "-35 27 03", mly: 62, richness: 0.6, label: true },
  { name: "Eridanus group", ra: "03h 33m", dec: "-21 30", mly: 75, richness: 0.4 },
  { name: "Antlia Cluster", ra: "10h 30m 03s", dec: "-35 19 24", mly: 133, richness: 0.5 },
  { name: "Centaurus Cluster", ra: "12h 48m 49s", dec: "-41 18 40", mly: 170, richness: 0.75 },
  { name: "Hydra Cluster", ra: "10h 36m 51s", dec: "-27 31 35", mly: 190, richness: 0.7, label: true },
  { name: "Pavo–Indus", ra: "20h 40m", dec: "-50 00", mly: 200, richness: 0.5 },
  { name: "Norma Cluster (Great Attractor)", ra: "16h 15m 32s", dec: "-60 54 30", mly: 222, richness: 0.9, label: true },
  { name: "Perseus Cluster", ra: "03h 19m 48s", dec: "+41 30 42", mly: 240, richness: 0.9, label: true },
  { name: "Pisces cluster", ra: "01h 20m", dec: "+33 00", mly: 230, richness: 0.5 },
  { name: "Leo Cluster", ra: "11h 44m 29s", dec: "+19 50 21", mly: 300, richness: 0.6 },
  { name: "Coma Cluster", ra: "12h 59m 49s", dec: "+27 58 50", mly: 321, richness: 1.0, label: true },
  { name: "Hercules Supercluster", ra: "16h 05m", dec: "+17 45", mly: 490, richness: 0.7, label: true },
];

/** Filaments drawn between cluster nodes (names must match CLUSTERS). */
export const FILAMENTS: [string, string][] = [
  ["Local Group", "M81 group"],
  ["Local Group", "Centaurus A / M83 group"],
  ["Local Group", "Virgo Cluster"],
  ["Local Group", "Fornax Cluster"],
  ["Virgo Cluster", "Ursa Major cluster"],
  ["Virgo Cluster", "Leo Cluster"],
  ["Leo Cluster", "Coma Cluster"],
  ["Virgo Cluster", "Centaurus Cluster"],
  ["Centaurus A / M83 group", "Centaurus Cluster"],
  ["Centaurus Cluster", "Hydra Cluster"],
  ["Hydra Cluster", "Antlia Cluster"],
  ["Antlia Cluster", "Fornax Cluster"],
  ["Fornax Cluster", "Eridanus group"],
  ["Centaurus Cluster", "Norma Cluster (Great Attractor)"],
  ["Norma Cluster (Great Attractor)", "Pavo–Indus"],
  ["Pavo–Indus", "Eridanus group"],
  ["Perseus Cluster", "Pisces cluster"],
  ["Pisces cluster", "Local Group"],
  ["Coma Cluster", "Hercules Supercluster"],
  ["Perseus Cluster", "Coma Cluster"],
];

/** Spiral arms named at the Milky Way level, with the galactocentric azimuth (deg) where the label sits. */
export const ARM_LABELS: { name: string; arm: number; theta: number }[] = [
  { name: "Scutum–Centaurus Arm", arm: 0, theta: 345 },
  { name: "Perseus Arm", arm: 1, theta: 215 },
  { name: "Sagittarius–Carina Arm", arm: 2, theta: 265 },
  { name: "Norma / Outer Arm", arm: 3, theta: 460 },
  { name: "Orion Spur (Local Arm)", arm: 4, theta: 208 },
];
