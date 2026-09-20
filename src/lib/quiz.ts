import { PLANETS, formatPeriod, type Body } from "./planets";

export interface Question {
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

const ORDINALS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[], n: number) {
  return shuffle(arr).slice(0, n);
}

/** Build a 4-option question where `correct` is the answer and the rest are distractors. */
function withOptions(prompt: string, correct: Body, pool: Body[], explanation: string): Question {
  const distractors = pick(pool.filter((p) => p.id !== correct.id), 3);
  return {
    prompt,
    options: shuffle([correct, ...distractors]).map((p) => p.name),
    answer: correct.name,
    explanation,
  };
}

const generators: Array<() => Question> = [
  () => {
    const i = Math.floor(Math.random() * PLANETS.length);
    const p = PLANETS[i];
    return withOptions(`Which planet is the ${ORDINALS[i]} from the Sun?`, p, PLANETS, `${p.name} orbits at ${p.distanceAU} AU.`);
  },
  () => {
    const p = pick(PLANETS.filter((b) => b.moons > 1), 1)[0];
    return withOptions(`Which planet has ${p.moons} known moons?`, p, PLANETS.filter((b) => b.moons !== p.moons), `${p.name} has ${p.moons} confirmed moons.`);
  },
  () => {
    const four = pick(PLANETS, 4);
    const best = four.reduce((a, b) => (a.gravity > b.gravity ? a : b));
    return {
      prompt: "Which of these planets has the strongest surface gravity?",
      options: shuffle(four).map((p) => p.name),
      answer: best.name,
      explanation: `${best.name}: ${best.gravity} m/s² (Earth is 9.81 m/s²).`,
    };
  },
  () => {
    const p = pick(PLANETS, 1)[0];
    return withOptions(`Which planet takes about ${formatPeriod(p.orbitalPeriodDays)} to orbit the Sun?`, p, PLANETS, `One ${p.name} year is ${formatPeriod(p.orbitalPeriodDays)}.`);
  },
  () => {
    const four = pick(PLANETS, 4);
    const biggest = four.reduce((a, b) => (a.radiusKm > b.radiusKm ? a : b));
    return {
      prompt: "Which of these planets is the largest?",
      options: shuffle(four).map((p) => p.name),
      answer: biggest.name,
      explanation: `${biggest.name} has a radius of ${Math.round(biggest.radiusKm).toLocaleString("en-US")} km.`,
    };
  },
  () => {
    const four = pick(PLANETS, 4);
    const coldest = four.reduce((a, b) => (a.meanTempC < b.meanTempC ? a : b));
    return {
      prompt: "Which of these planets has the lowest average temperature?",
      options: shuffle(four).map((p) => p.name),
      answer: coldest.name,
      explanation: `${coldest.name} averages about ${coldest.meanTempC} °C.`,
    };
  },
  () => {
    const venus = PLANETS.find((p) => p.id === "venus")!;
    return withOptions("Which planet is the hottest in the solar system?", venus, PLANETS, "Venus's thick CO₂ atmosphere traps heat: about 464 °C on average.");
  },
  () => {
    const retro = pick(PLANETS.filter((p) => p.rotationPeriodDays < 0), 1)[0];
    return withOptions("Which of these planets spins in the opposite direction to most others (retrograde)?", retro, PLANETS.filter((p) => p.rotationPeriodDays > 0), `${retro.name} rotates retrograde. Venus and Uranus are the two retrograde planets.`);
  },
  () => {
    const venus = PLANETS.find((p) => p.id === "venus")!;
    return withOptions("On which planet is a single day longer than its year?", venus, PLANETS, "Venus rotates once every 243 Earth days but orbits the Sun in 225.");
  },
  () => {
    const p = pick(PLANETS, 1)[0];
    const fact = p.facts[Math.floor(Math.random() * p.facts.length)];
    return withOptions(`Which planet does this describe? "${fact}"`, p, PLANETS, fact);
  },
  () => {
    const four = pick(PLANETS, 4);
    const fastest = four.reduce((a, b) => (a.distanceAU < b.distanceAU ? a : b));
    return {
      prompt: "Which of these planets moves fastest along its orbit?",
      options: shuffle(four).map((p) => p.name),
      answer: fastest.name,
      explanation: `${fastest.name} is the closest of these to the Sun, and closer planets orbit faster (Kepler's third law).`,
    };
  },
  () => {
    const p = pick(PLANETS.filter((b) => b.rings), 1)[0];
    return withOptions("Which of these planets has a ring system?", p, PLANETS.filter((b) => !b.rings), `${p.name} has rings. All four giant planets do, but Saturn's are by far the most prominent.`);
  },
  () => {
    const p = pick(PLANETS.filter((b) => b.axialTiltDeg > 90), 1)[0];
    return withOptions("Which planet is tilted so far that it rolls around the Sun on its side?", p, PLANETS.filter((b) => b.axialTiltDeg < 90), `${p.name} has an axial tilt of ${p.axialTiltDeg}°.`);
  },
];

export function makeQuiz(count = 8): Question[] {
  return pick(generators, count).map((g) => g());
}
