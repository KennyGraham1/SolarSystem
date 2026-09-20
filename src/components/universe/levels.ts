import { LY_IN_AU } from "./astro";

/** World-space radius (scene units) that each level's "radius of view" maps to. */
export const FRAME_R = 9;
/** Camera parameters shared by the scene and the HUD scale bar. */
export const CAMERA = { position: [0, 13.5, 17.5] as [number, number, number], fov: 50 };
export const CAMERA_DIST = Math.hypot(...CAMERA.position);
/** Scene units per screen pixel at the origin for a 900 px tall viewport — lets point sizes be specified in pixels. */
export const px = (n: number) => (n * CAMERA_DIST * Math.tan((CAMERA.fov / 2) * (Math.PI / 180))) / 450;
/** Below this viewport width the caption becomes a bottom sheet and the canvas is confined to the top of the screen. */
export const MOBILE_MAX_WIDTH = 640;
/** Fraction of the viewport height the canvas keeps on phones (the rest is the bottom sheet). */
export const MOBILE_CANVAS_FRACTION = 0.58;
/** Canvas height for a given viewport. */
export const canvasHeight = (w: number, h: number) => (w < MOBILE_MAX_WIDTH ? h * MOBILE_CANVAS_FRACTION : h);
/** Camera distance for a canvas aspect ratio: pulled back on portrait screens so the frame still fits horizontally. */
export const cameraDistanceFor = (w: number, h: number) => CAMERA_DIST * Math.max(1, (1.05 * h) / w);
/** Seconds per level step when animating the zoom. */
export const STEP_SECONDS = 1.2;

export type Unit = "AU" | "ly" | "Mly";

export interface LevelDef {
  id: string;
  title: string;
  /** Short name for the ladder. */
  short: string;
  /** Radius of view in `unit`. */
  radius: number;
  unit: Unit;
  /** Same radius expressed in light-years (for the zoom factor between levels). */
  radiusLy: number;
  /** Human-readable span ("2 AU across", "20 light-years"). */
  span: string;
  /** One sentence: what is on screen. */
  seeing: string;
  facts: string[];
  /** Scale bar length in level units plus its label. */
  scaleBar: { value: number; label: string };
  /**
   * Where the previous (inner) level's centre sits inside this level, in level
   * units and scene axes. Only the Milky Way level is off-centre (the Sun is
   * 26,000 ly from the galactic centre).
   */
  innerCentre?: [number, number, number];
}

const ly = (n: number) => n;
const au = (n: number) => n / LY_IN_AU;
const mly = (n: number) => n * 1e6;

export const LEVELS: LevelDef[] = [
  {
    id: "inner",
    title: "Inner solar system",
    short: "Inner planets",
    radius: 2,
    unit: "AU",
    radiusLy: au(2),
    span: "4 AU across",
    seeing: "The Sun and the four rocky planets on their real orbits for today's date, with the inner edge of the asteroid belt beyond Mars.",
    facts: [
      "One astronomical unit (AU) is the average Earth–Sun distance: 150 million km, or 8.3 light-minutes.",
      "Mercury's orbit is the most stretched of the eight planets, swinging between 0.31 and 0.47 AU from the Sun.",
      "Sunlight takes 12.7 minutes to reach Mars, and the asteroid belt begins about 2.1 AU out.",
    ],
    scaleBar: { value: 1, label: "1 AU · 8.3 light-minutes" },
  },
  {
    id: "solar",
    title: "The solar system",
    short: "Solar system",
    radius: 50,
    unit: "AU",
    radiusLy: au(50),
    span: "100 AU across",
    seeing: "All eight planets, Pluto's tilted egg-shaped orbit, and the Kuiper belt of icy bodies beyond Neptune. The inner planets have shrunk to a dot.",
    facts: [
      "Neptune orbits at 30 AU — 4.2 light-hours from the Sun — and takes 165 Earth years to go round once.",
      "Pluto's orbit is tilted 17° and so elongated that from 1979 to 1999 it was closer to the Sun than Neptune.",
      "The Kuiper belt (30–50 AU) holds Pluto, other dwarf planets and the source of short-period comets.",
    ],
    scaleBar: { value: 20, label: "20 AU · 2.8 light-hours" },
  },
  {
    id: "heliosphere",
    title: "Heliosphere & scattered disc",
    short: "Heliosphere",
    radius: 500,
    unit: "AU",
    radiusLy: au(500),
    span: "1,000 AU across",
    seeing: "The bubble of solar wind that shields the planets, the five spacecraft leaving it, and the scattered disc of icy worlds beyond. Sedna's orbit stretches far past the edge of this view.",
    facts: [
      "The heliopause, where the solar wind stops, lies about 120 AU out. Voyager 1 crossed it in 2012 and Voyager 2 in 2018.",
      "Voyager 1 is now ~172 AU away (24 light-hours) — the most distant human-made object — travelling 3.6 AU a year.",
      "Sedna swings from 76 AU out to ~940 AU and back every ~11,400 years; the inner Oort cloud begins near 2,000 AU.",
    ],
    scaleBar: { value: 100, label: "100 AU · 14 light-hours" },
  },
  {
    id: "oort",
    title: "The Oort cloud",
    short: "Oort cloud",
    radius: 100_000,
    unit: "AU",
    radiusLy: au(100_000),
    span: "200,000 AU · 3.2 light-years across",
    seeing: "The vast spherical reservoir of trillions of icy bodies surrounding the Sun. The whole planetary system, out to the heliosphere, is a dot at the centre.",
    facts: [
      "The Oort cloud is thought to stretch from ~2,000 AU to ~100,000 AU — nearly halfway to the nearest star.",
      "Long-period comets fall in from here when passing stars or the tide of the galaxy nudge them.",
      "Voyager 1 will reach the inner edge in ~300 years and take another ~30,000 years to cross it.",
    ],
    scaleBar: { value: LY_IN_AU, label: "1 light-year · 63,241 AU" },
  },
  {
    id: "stars",
    title: "The nearest stars",
    short: "Nearest stars",
    radius: 14,
    unit: "ly",
    radiusLy: ly(14),
    span: "28 light-years across",
    seeing: "Every star system within 13 light-years of the Sun, at its real 3D position and coloured by spectral type. The arrow shows where Voyager 1 is heading.",
    facts: [
      "Proxima Centauri, 4.24 light-years away, is the closest star. Voyager 1 would take ~73,000 years to travel that far.",
      "Most of our neighbours are dim red dwarfs invisible to the naked eye; Sirius, Procyon and Alpha Centauri are the bright exceptions.",
      "One light-year is 63,241 AU — 9.46 trillion km. Light from Alpha Centauri left it in 2022.",
    ],
    scaleBar: { value: 5, label: "5 light-years" },
  },
  {
    id: "arm",
    title: "The Orion Arm neighbourhood",
    short: "Orion Arm",
    radius: 5000,
    unit: "ly",
    radiusLy: ly(5000),
    span: "10,000 light-years across",
    seeing: "Our patch of the galactic disc: the Sun sits inside the Orion Spur, between the Sagittarius and Perseus arms, in a hot cavity called the Local Bubble.",
    facts: [
      "The Local Bubble is a ~1,000 ly wide cavity of hot, thin gas blown by supernovae starting ~14 million years ago; the Sun drifted into it ~5 million years ago.",
      "The Orion Nebula, 1,344 ly away, is the nearest large star-forming region — young stars still light its gas.",
      "Betelgeuse, Rigel, Antares and Deneb shine across hundreds or thousands of light-years. Sirius and Vega are too close to separate from the Sun here.",
    ],
    scaleBar: { value: 2000, label: "2,000 light-years" },
  },
  {
    id: "galaxy",
    title: "The Milky Way",
    short: "Milky Way",
    radius: 60_000,
    unit: "ly",
    radiusLy: ly(60_000),
    span: "120,000 light-years across",
    seeing: "A barred spiral of 100–400 billion stars. The Sun orbits 26,000 light-years from the centre in the Orion Spur; Sagittarius A* marks the core.",
    facts: [
      "The central bar is ~27,000 ly long, and the black hole Sagittarius A* at its heart weighs 4 million Suns.",
      "The disc is ~100,000 ly across but only ~1,000 ly thick — proportionally thinner than a sheet of paper.",
      "The Sun takes ~230 million years to orbit once; it has gone round about 20 times since it formed.",
    ],
    scaleBar: { value: 20_000, label: "20,000 light-years" },
    innerCentre: [-26_000, 0, 0],
  },
  {
    id: "localgroup",
    title: "The Local Group",
    short: "Local Group",
    radius: 3_500_000,
    unit: "ly",
    radiusLy: ly(3_500_000),
    span: "7 million light-years across",
    seeing: "The Milky Way, Andromeda and Triangulum plus dozens of dwarf galaxies, all bound together by gravity. Galaxies are drawn 3× their true size so you can see them — the space between is even emptier than this.",
    facts: [
      "Andromeda (M31), 2.5 million ly away, is approaching at 110 km/s and will merge with the Milky Way in ~4.5 billion years.",
      "The Magellanic Clouds, 163,000 and 200,000 ly away, are our brightest satellites, visible to the naked eye from the southern hemisphere.",
      "The Local Group is ~10 million ly across, holds ~80 known galaxies and weighs about 2 trillion Suns.",
    ],
    scaleBar: { value: 1_000_000, label: "1 million light-years" },
  },
  {
    id: "laniakea",
    title: "Laniakea Supercluster",
    short: "Laniakea",
    radius: 500,
    unit: "Mly",
    radiusLy: mly(500),
    span: "1 billion light-years across",
    seeing: "Our home supercluster: 100,000 galaxies strung along filaments that flow toward the Great Attractor. The Local Group sits near its outer edge, at the centre of this view.",
    facts: [
      "The Virgo Cluster, 54 million ly away with ~1,500 galaxies, is the nearest big cluster and our local hub.",
      "Laniakea (Hawaiian for 'immense heaven') spans ~520 million ly and was mapped in 2014 from galaxy motions.",
      "The Coma Cluster, 320 million ly away, is where Fritz Zwicky first found evidence of dark matter in 1933.",
    ],
    scaleBar: { value: 200, label: "200 million light-years" },
  },
  {
    id: "universe",
    title: "The observable universe",
    short: "Universe",
    radius: 46_500,
    unit: "Mly",
    radiusLy: mly(46_500),
    span: "93 billion light-years across",
    seeing: "The cosmic web: galaxies threaded along filaments around vast voids, out to the cosmic microwave background — the oldest light we can see. Laniakea is the dot at the centre.",
    facts: [
      "The universe is 13.8 billion years old, but expansion has carried the most distant regions we can see 46.5 billion ly away.",
      "It holds somewhere between 200 billion and 2 trillion galaxies, most of them small dwarfs.",
      "Beyond the microwave background the universe continues — very likely far further than we can ever observe.",
    ],
    scaleBar: { value: 20_000, label: "20 billion light-years" },
  },
];

/** Multiplication factor of the field of view from level i-1 to level i. */
export function zoomFactor(i: number) {
  if (i <= 0) return 1;
  return LEVELS[i].radiusLy / LEVELS[i - 1].radiusLy;
}

export const formatFactor = (f: number) => `×${f >= 100 ? Math.round(f / 10) * 10 : f >= 20 ? Math.round(f) : f.toFixed(0)}`;

/** Scene units per level unit at a given level. */
export const levelScale = (i: number) => FRAME_R / LEVELS[i].radius;

/** Scene-unit position of the inner level's centre within level i. */
export function innerCentreWorld(i: number): [number, number, number] {
  const c = LEVELS[i].innerCentre;
  if (!c) return [0, 0, 0];
  const k = levelScale(i);
  return [c[0] * k, c[1] * k, c[2] * k];
}
