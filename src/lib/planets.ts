export type BodyId =
  | "sun"
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune";

export type TextureKind = "star" | "rocky" | "earth" | "banded" | "smooth";

export interface Body {
  id: BodyId;
  name: string;
  type: "Star" | "Terrestrial planet" | "Gas giant" | "Ice giant";
  color: string;
  accent: string;
  texture: TextureKind;
  radiusKm: number;
  distanceAU: number;
  /** Sidereal orbital period in Earth days (0 for the Sun). */
  orbitalPeriodDays: number;
  /** Sidereal rotation period in Earth days. Negative = retrograde spin. */
  rotationPeriodDays: number;
  axialTiltDeg: number;
  moons: number;
  gravity: number;
  meanTempC: number;
  massEarths: number;
  description: string;
  facts: string[];
  /** One teaching point shown during the guided tour. */
  lesson: string;
  rings?: { inner: number; outer: number; color: string; opacity: number };
}

export const BODIES: Body[] = [
  {
    id: "sun",
    name: "Sun",
    type: "Star",
    color: "#ffb347",
    accent: "#ff6a00",
    texture: "star",
    radiusKm: 696_340,
    distanceAU: 0,
    orbitalPeriodDays: 0,
    rotationPeriodDays: 25.4,
    axialTiltDeg: 7.25,
    moons: 0,
    gravity: 274,
    meanTempC: 5505,
    massEarths: 333_000,
    description:
      "A G-type main-sequence star at the centre of our solar system. It holds 99.8% of the system's mass and its light takes about 8 minutes to reach Earth.",
    facts: [
      "About 1.3 million Earths could fit inside the Sun.",
      "The core reaches roughly 15 million °C, fusing 600 million tonnes of hydrogen every second.",
      "The Sun is about 4.6 billion years old and roughly halfway through its life.",
    ],
    lesson:
      "Everything here orbits the Sun because it holds 99.8% of the system's mass. Watch the planets: the closer they are, the faster they move. That is Kepler's third law — the Sun's gravity is stronger up close, so inner planets must move faster to stay in orbit.",
  },
  {
    id: "mercury",
    name: "Mercury",
    type: "Terrestrial planet",
    color: "#9c9a92",
    accent: "#5d5a55",
    texture: "rocky",
    radiusKm: 2_439.7,
    distanceAU: 0.387,
    orbitalPeriodDays: 87.97,
    rotationPeriodDays: 58.65,
    axialTiltDeg: 0.03,
    moons: 0,
    gravity: 3.7,
    meanTempC: 167,
    massEarths: 0.055,
    description:
      "The smallest planet and the closest to the Sun. With almost no atmosphere, its surface swings from 430 °C in daylight to −180 °C at night.",
    facts: [
      "A year on Mercury lasts only 88 Earth days, but one day-night cycle takes 176 Earth days.",
      "Despite being closest to the Sun, it is not the hottest planet — Venus is.",
      "Its heavily cratered surface looks a lot like our Moon.",
    ],
    lesson:
      "Look at Mercury's orbit — it is visibly off-centre. Its path is the most elliptical of the planets, so it speeds up near the Sun and slows down far away. Speed the clock up to 1 mo/s and you will see it lap Earth four times a year.",
  },
  {
    id: "venus",
    name: "Venus",
    type: "Terrestrial planet",
    color: "#e6c98a",
    accent: "#b8894a",
    texture: "smooth",
    radiusKm: 6_051.8,
    distanceAU: 0.723,
    orbitalPeriodDays: 224.7,
    rotationPeriodDays: -243.0,
    axialTiltDeg: 177.4,
    moons: 0,
    gravity: 8.87,
    meanTempC: 464,
    massEarths: 0.815,
    description:
      "Earth's 'twin' in size, but wrapped in a thick carbon-dioxide atmosphere with sulphuric-acid clouds. A runaway greenhouse effect makes it the hottest planet.",
    facts: [
      "Venus spins backwards (retrograde) and a single rotation takes longer than its year.",
      "Surface pressure is about 92 times that of Earth — like being 900 m underwater.",
      "It is the brightest natural object in our night sky after the Moon.",
    ],
    lesson:
      "Venus is almost Earth's size, yet it is the hottest planet. Its thick CO₂ atmosphere traps heat like a blanket — the greenhouse effect at full strength. It also spins backwards, so on Venus the Sun rises in the west.",
  },
  {
    id: "earth",
    name: "Earth",
    type: "Terrestrial planet",
    color: "#2468d6",
    accent: "#3f9b4a",
    texture: "earth",
    radiusKm: 6_371,
    distanceAU: 1.0,
    orbitalPeriodDays: 365.25,
    rotationPeriodDays: 0.9973,
    axialTiltDeg: 23.44,
    moons: 1,
    gravity: 9.81,
    meanTempC: 15,
    massEarths: 1,
    description:
      "Our home — the only world known to harbour life. About 71% of the surface is covered by liquid water, and its 23.4° axial tilt gives us the seasons.",
    facts: [
      "Earth is the densest planet in the solar system.",
      "The Moon is slowly drifting away from Earth at about 3.8 cm per year.",
      "Earth's magnetic field shields us from the solar wind and creates the auroras.",
    ],
    lesson:
      "The only planet we know with liquid oceans and life. Notice the 23.4° tilt of its axis: as Earth travels around the Sun, first one hemisphere and then the other leans toward the Sun. That tilt, not distance, is what causes the seasons.",
  },
  {
    id: "mars",
    name: "Mars",
    type: "Terrestrial planet",
    color: "#c1562d",
    accent: "#7a3418",
    texture: "rocky",
    radiusKm: 3_389.5,
    distanceAU: 1.524,
    orbitalPeriodDays: 686.98,
    rotationPeriodDays: 1.026,
    axialTiltDeg: 25.19,
    moons: 2,
    gravity: 3.71,
    meanTempC: -65,
    massEarths: 0.107,
    description:
      "The Red Planet, coloured by iron oxide dust. It has polar ice caps, ancient river valleys, and the tallest volcano in the solar system, Olympus Mons.",
    facts: [
      "Olympus Mons is about 22 km high — nearly three times the height of Mount Everest.",
      "A Martian day (a 'sol') is only 40 minutes longer than an Earth day.",
      "Its two tiny moons, Phobos and Deimos, may be captured asteroids.",
    ],
    lesson:
      "Mars is half Earth's size and lost most of its air long ago. Its day is almost the same length as ours, but its year is nearly twice as long — so every 26 months Earth 'catches up' to Mars, which is when we launch missions there.",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    type: "Gas giant",
    color: "#d8b48a",
    accent: "#9c6b45",
    texture: "banded",
    radiusKm: 69_911,
    distanceAU: 5.203,
    orbitalPeriodDays: 4_332.6,
    rotationPeriodDays: 0.4135,
    axialTiltDeg: 3.13,
    moons: 95,
    gravity: 24.79,
    meanTempC: -110,
    massEarths: 317.8,
    description:
      "The largest planet — more than twice as massive as all the other planets combined. Its swirling bands of clouds host the Great Red Spot, a storm bigger than Earth.",
    facts: [
      "Jupiter has the shortest day of any planet: under 10 hours.",
      "The Great Red Spot has been raging for at least 350 years.",
      "Its moon Ganymede is larger than the planet Mercury.",
    ],
    lesson:
      "Jupiter is the giant: 11 Earths wide and spinning so fast its day is under 10 hours. The bands are clouds moving in opposite directions, and the Great Red Spot is a storm larger than Earth that has raged for centuries.",
  },
  {
    id: "saturn",
    name: "Saturn",
    type: "Gas giant",
    color: "#e3cf9a",
    accent: "#b39a63",
    texture: "banded",
    radiusKm: 58_232,
    distanceAU: 9.537,
    orbitalPeriodDays: 10_759,
    rotationPeriodDays: 0.444,
    axialTiltDeg: 26.73,
    moons: 146,
    gravity: 10.44,
    meanTempC: -140,
    massEarths: 95.2,
    description:
      "Famous for its spectacular ring system made of ice and rock, Saturn is a gas giant so light it would float in a big enough bathtub.",
    facts: [
      "Saturn's rings are enormous in width (280,000 km) yet mostly less than 1 km thick.",
      "It is the least dense planet — its average density is lower than water.",
      "Its moon Titan has a thick atmosphere and lakes of liquid methane.",
    ],
    lesson:
      "Saturn's rings are billions of chunks of ice and rock, each on its own tiny orbit. They stretch 280,000 km across but are mostly less than a kilometre thick. Saturn is so light it would float in water — if you could find a big enough bath.",
    rings: { inner: 1.3, outer: 2.3, color: "#d9c69a", opacity: 0.85 },
  },
  {
    id: "uranus",
    name: "Uranus",
    type: "Ice giant",
    color: "#9fdbe6",
    accent: "#6fb9cc",
    texture: "smooth",
    radiusKm: 25_362,
    distanceAU: 19.19,
    orbitalPeriodDays: 30_687,
    rotationPeriodDays: -0.718,
    axialTiltDeg: 97.77,
    moons: 28,
    gravity: 8.87,
    meanTempC: -195,
    massEarths: 14.5,
    description:
      "An ice giant tipped on its side — its axis is tilted almost 98°, so it essentially rolls around the Sun. Methane in its atmosphere gives it a pale cyan colour.",
    facts: [
      "Each pole gets 42 years of continuous sunlight followed by 42 years of darkness.",
      "It has the coldest atmosphere of any planet, reaching −224 °C.",
      "Uranus has 13 faint rings and was the first planet discovered with a telescope (1781).",
    ],
    lesson:
      "Uranus is knocked on its side, with a 98° tilt. It rolls around the Sun, so each pole gets 42 years of daylight and 42 years of night. Its cyan colour comes from methane, which absorbs red light.",
    rings: { inner: 1.6, outer: 1.9, color: "#bfe6ee", opacity: 0.35 },
  },
  {
    id: "neptune",
    name: "Neptune",
    type: "Ice giant",
    color: "#3b5fd9",
    accent: "#2a3fa8",
    texture: "smooth",
    radiusKm: 24_622,
    distanceAU: 30.07,
    orbitalPeriodDays: 60_190,
    rotationPeriodDays: 0.671,
    axialTiltDeg: 28.32,
    moons: 16,
    gravity: 11.15,
    meanTempC: -200,
    massEarths: 17.1,
    description:
      "The most distant planet, a deep-blue ice giant with the fastest winds in the solar system — over 2,000 km/h. It was found by mathematics before it was seen.",
    facts: [
      "Neptune has completed only one orbit since its discovery in 1846.",
      "Its largest moon, Triton, orbits backwards and is probably a captured Kuiper Belt object.",
      "Sunlight at Neptune is about 900 times fainter than on Earth.",
    ],
    lesson:
      "The outermost planet takes 165 years to orbit — it has completed only one lap since it was discovered in 1846. Switch on 'True distances' to see how far out it really is: light from the Sun takes over 4 hours to reach it.",
  },
];

export const SUN = BODIES[0];
export const PLANETS = BODIES.filter((b) => b.id !== "sun");

export const MOON = {
  name: "Moon",
  color: "#b9b6ae",
  accent: "#6e6a63",
  texture: "rocky" as TextureKind,
  radiusKm: 1_737.4,
  orbitalPeriodDays: 27.32,
};

export const bodyById = (id: BodyId) => BODIES.find((b) => b.id === id)!;

// ---- Scene scaling helpers -------------------------------------------------

export const SUN_VISUAL_RADIUS = 3.2;

/** Visual (square-root compressed) radius so every planet is visible. */
export function visualRadius(radiusKm: number) {
  return 0.7 * Math.sqrt(radiusKm / 6_371);
}

/** Orbit radius in scene units. `trueDistances` keeps real AU ratios. */
export function orbitRadius(au: number, trueDistances: boolean) {
  if (au === 0) return 0;
  return trueDistances ? au * 18 : 6 + 12 * Math.log(1 + 3 * au);
}

/** Max visible spin (revolutions per real second). Orbits stay exact; spin is
 *  capped so a fast clock doesn't turn planets into a blur. */
export const MAX_SPIN_REV_PER_SEC = 0.25;

/** Spin increment (radians) for this frame, honouring direction and the cap. */
export function spinStep(rotationPeriodDays: number, speed: number, delta: number) {
  const revPerSec = Math.min(speed / Math.abs(rotationPeriodDays), MAX_SPIN_REV_PER_SEC);
  return Math.sign(rotationPeriodDays) * revPerSec * Math.PI * 2 * delta;
}

export function formatPeriod(days: number) {
  const abs = Math.abs(days);
  if (abs >= 365) return `${(abs / 365.25).toFixed(1)} years`;
  if (abs >= 2) return `${abs.toFixed(1)} days`;
  return `${(abs * 24).toFixed(1)} hours`;
}

export function formatKm(km: number) {
  return `${Math.round(km).toLocaleString("en-US")} km`;
}
