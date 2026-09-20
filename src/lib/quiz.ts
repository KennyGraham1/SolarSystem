import { DWARF_PLANETS, MOONS, PLANETS, bodyById, bodyHref, formatPeriod, type Body, type BodyId } from "./planets";

/** Where to read more after a question — a body page or a Learn explainer. */
export interface LearnLink {
  label: string;
  href: string;
}

interface Base {
  prompt: string;
  explanation: string;
  /** Shown after a first wrong answer, before the learner tries again. */
  hint?: string;
  learn?: LearnLink;
  /** Category used for the end-of-quiz breakdown. */
  topic: string;
}
export type ChoiceQuestion = Base & { kind: "choice"; options: string[]; answer: string };
export type BooleanQuestion = Base & { kind: "boolean"; answer: boolean };
export type OrderQuestion = Base & { kind: "order"; items: string[]; /** e.g. "closest to the Sun first" */ rule: string };
export type Question = ChoiceQuestion | BooleanQuestion | OrderQuestion;

const ORDINALS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const pick = <T,>(arr: T[], n: number) => shuffle(arr).slice(0, n);
const one = <T,>(arr: T[]) => shuffle(arr)[0];
const learnBody = (b: Body): LearnLink => ({ label: `Explore ${b.name}`, href: bodyHref(b) });
const learnTopic = (label: string, slug: string): LearnLink => ({ label, href: `/learn/${slug}` });

/** 4-option question where `correct` is the answer and the rest are distractors from `pool`. */
function choice(prompt: string, correct: Body, pool: Body[], explanation: string, topic: string, hint?: string): ChoiceQuestion {
  const distractors = pick(pool.filter((p) => p.id !== correct.id), 3);
  return { kind: "choice", prompt, options: shuffle([correct, ...distractors]).map((p) => p.name), answer: correct.name, explanation, topic, hint, learn: learnBody(correct) };
}

/** "Which of these ..." with the winner chosen by a numeric key. */
function superlative(prompt: string, pool: Body[], key: (b: Body) => number, explain: (b: Body) => string, topic: string, hint?: string): ChoiceQuestion {
  const four = pick(pool, 4);
  const best = four.reduce((a, b) => (key(a) > key(b) ? a : b));
  return { kind: "choice", prompt, options: shuffle(four).map((p) => p.name), answer: best.name, explanation: explain(best), topic, hint, learn: learnBody(best) };
}

function order(prompt: string, pool: Body[], key: (b: Body) => number, rule: string, explanation: string, topic: string, learn?: LearnLink): OrderQuestion {
  const four = pick(pool, 4).sort((a, b) => key(a) - key(b));
  return { kind: "order", prompt, items: four.map((b) => b.name), rule, explanation, topic, learn };
}

const bool = (prompt: string, answer: boolean, explanation: string, topic: string, learn?: LearnLink): BooleanQuestion => ({ kind: "boolean", prompt, answer, explanation, topic, learn });

const byId = (id: BodyId) => bodyById(id);

// ---------------------------------------------------------------------------

const generators: Array<() => Question> = [
  // --- planets: order & superlatives ---
  () => {
    const i = Math.floor(Math.random() * PLANETS.length);
    const p = PLANETS[i];
    return choice(`Which planet is the ${ORDINALS[i]} from the Sun?`, p, PLANETS, `${p.name} orbits at ${p.distanceAU} AU — ${ORDINALS[i]} out from the Sun.`, "Planets", `Think of the order: Mercury, Venus, Earth, Mars, then the giants.`);
  },
  () => order("Put these planets in order, closest to the Sun first.", PLANETS, (b) => b.distanceAU, "closest first", "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune — a classic mnemonic is 'My Very Educated Mother Just Served Us Noodles'.", "Planets"),
  () => order("Put these planets in order of size, smallest first.", PLANETS, (b) => b.radiusKm, "smallest first", "Mercury is the smallest planet and Jupiter the largest; Uranus and Neptune are close in size, as are Earth and Venus.", "Planets"),
  () => order("Put these in order of year length, shortest year first.", [...PLANETS, ...DWARF_PLANETS], (b) => b.orbitalPeriodDays, "shortest year first", "The farther a body is from the Sun, the longer its year (Kepler's third law): Mercury takes 88 days, Neptune 165 years, Pluto 248 years.", "Orbits", learnTopic("Retrograde motion & orbits", "retrograde-motion")),
  () => superlative("Which of these planets has the strongest surface gravity?", PLANETS, (b) => b.gravity, (b) => `${b.name}: ${b.gravity} m/s² (Earth is 9.81 m/s²). Gravity depends on mass and radius, not distance from the Sun.`, "Planets", "The most massive planet wins, unless it is very puffy."),
  () => superlative("Which of these planets is the largest?", PLANETS, (b) => b.radiusKm, (b) => `${b.name} has a radius of ${Math.round(b.radiusKm).toLocaleString("en-US")} km.`, "Planets"),
  () => superlative("Which of these has the most known moons?", PLANETS.filter((p) => p.moons > 0), (b) => b.moons, (b) => `${b.name} has ${b.moons} known moons (as of 2026). Saturn leads with 293, Jupiter has 115.`, "Moons"),
  () => {
    const p = one(PLANETS);
    return choice(`Which planet takes about ${formatPeriod(p.orbitalPeriodDays)} to orbit the Sun?`, p, PLANETS, `One ${p.name} year is ${formatPeriod(p.orbitalPeriodDays)}. Farther planets move more slowly and have farther to go.`, "Orbits", "Longer years belong to planets farther from the Sun.");
  },
  () => {
    const four = pick(PLANETS.filter((p) => p.id !== "uranus"), 4); // Uranus has the coldest recorded temperature, Neptune the lower mean
    const coldest = four.reduce((a, b) => (a.meanTempC < b.meanTempC ? a : b));
    return { kind: "choice", prompt: "Which of these planets has the lowest average temperature?", options: shuffle(four).map((p) => p.name), answer: coldest.name, explanation: `${coldest.name} averages about ${coldest.meanTempC} °C. In general, farther from the Sun means colder — Venus is the exception, hotter than Mercury because of its greenhouse atmosphere.`, topic: "Planets", learn: learnBody(coldest) };
  },
  () => choice("Which planet is the hottest in the solar system?", byId("venus"), PLANETS, "Venus averages 464 °C. Its thick CO₂ atmosphere traps heat — a runaway greenhouse effect — so it beats Mercury even though Mercury is closer to the Sun.", "Planets", "It is not the closest planet to the Sun."),
  () => {
    const retro = one(PLANETS.filter((p) => p.rotationPeriodDays < 0));
    return choice("Which of these planets spins in the opposite direction to most others (retrograde)?", retro, PLANETS.filter((p) => p.rotationPeriodDays > 0), `${retro.name} rotates retrograde. Venus (tilted 177°) and Uranus (tilted 98°) are the two retrograde planets.`, "Planets");
  },
  () => choice("On which planet is a single day longer than its year?", byId("venus"), PLANETS, "Venus rotates once every 243 Earth days but orbits the Sun in 225 days.", "Planets", "It spins backwards, extremely slowly."),
  () => {
    const p = one(PLANETS);
    const fact = one(p.facts);
    return choice(`Which planet does this describe? "${fact}"`, p, PLANETS, fact, "Planets");
  },
  () => {
    const p = one(PLANETS.filter((b) => b.rings));
    return choice("Which of these planets has a ring system?", p, PLANETS.filter((b) => !b.rings), `${p.name} has rings. All four giant planets do — Saturn's are just by far the brightest.`, "Planets", "All four giant planets have rings, faint or not.");
  },
  () => choice("Which planet is tilted so far that it rolls around the Sun on its side?", byId("uranus"), PLANETS.filter((b) => b.id !== "venus"), "Uranus has an axial tilt of 97.8°. (Venus is tilted 177°, which means it is upside down rather than on its side.)", "Planets"),
  () => superlative("Which of these moves fastest along its orbit?", PLANETS, (b) => -b.distanceAU, (b) => `${b.name} is the closest of these to the Sun, and closer bodies orbit faster (Kepler's third law).`, "Orbits", "The Sun's gravity is strongest up close."),
  // --- moons & dwarfs ---
  () => {
    const m = one(MOONS.filter((m) => m.parent !== "pluto"));
    const parent = byId(m.parent!);
    return choice(`Which planet does ${m.name} orbit?`, parent, PLANETS, `${m.name} is a moon of ${parent.name}. ${m.facts[0]}`, "Moons");
  },
  () => {
    const m = one(MOONS);
    return { kind: "choice", prompt: `Which moon does this describe? "${one(m.facts)}"`, options: shuffle([m, ...pick(MOONS.filter((x) => x.id !== m.id), 3)]).map((x) => x.name), answer: m.name, explanation: m.description, topic: "Moons", learn: learnBody(m) } as ChoiceQuestion;
  },
  () => choice("Which is the largest moon in the solar system?", byId("ganymede"), MOONS, "Ganymede (radius 2,634 km) is bigger than the planet Mercury. Titan is a close second.", "Moons", "It orbits Jupiter."),
  () => choice("Which moon sprays water from geysers at its south pole?", byId("enceladus"), MOONS, "Cassini flew through Enceladus's plumes and found salt and organic molecules from a subsurface ocean.", "Moons", "It is a small, bright white moon of Saturn."),
  () => choice("Which moon has lakes and seas of liquid methane?", byId("titan"), MOONS, "Titan's thick atmosphere lets methane rain, flow and pool at −180 °C.", "Moons"),
  () => choice("Which dwarf planet lives in the asteroid belt?", byId("ceres"), [...DWARF_PLANETS, ...pick(MOONS, 3)], "Ceres is the largest object in the belt between Mars and Jupiter; Pluto lives in the Kuiper belt beyond Neptune.", "Dwarf planets"),
  () => order("Put these moons in order of size, smallest first.", MOONS.filter((m) => m.radiusKm > 100), (b) => b.radiusKm, "smallest first", "Ganymede and Titan are the giants (bigger than Mercury); Enceladus, Miranda and Mimas-sized moons are only a few hundred km across.", "Moons"),
  // --- true / false ---
  () => bool("The seasons happen because Earth is closer to the Sun in summer.", false, "Seasons come from Earth's 23.4° axial tilt. Earth is actually closest to the Sun in early January, during northern winter.", "Phenomena", learnTopic("Why we have seasons", "seasons")),
  () => bool("The far side of the Moon is always dark.", false, "The far side gets just as much sunlight as the near side — we simply never see it from Earth, because the Moon is tidally locked.", "Phenomena", learnTopic("Moon phases", "moon-phases")),
  () => bool("Jupiter has more known moons than any other planet.", false, "Saturn leads with 293 confirmed moons (2026); Jupiter has 115.", "Moons", learnBody(byId("saturn"))),
  () => bool("Mercury is the hottest planet because it is closest to the Sun.", false, "Venus is hotter (464 °C) thanks to its thick greenhouse atmosphere; airless Mercury swings from 430 °C to −180 °C.", "Planets", learnBody(byId("venus"))),
  () => bool("Saturn is the only planet with rings.", false, "Jupiter, Uranus and Neptune have faint rings too — Saturn's are just spectacular.", "Planets", learnBody(byId("uranus"))),
  () => bool("The Great Red Spot is a giant volcano on Jupiter.", false, "It is a storm — an anticyclone wider than Earth that has been observed since 1831.", "Planets", learnBody(byId("jupiter"))),
  () => bool("Pluto is bigger than Earth's Moon.", false, "Pluto's radius is 1,188 km; the Moon's is 1,737 km. Pluto is smaller than seven moons in the solar system.", "Dwarf planets", learnBody(byId("pluto"))),
  () => bool("A total solar eclipse can only happen at new Moon.", true, "The Moon must sit between Earth and the Sun, which is the new Moon position — and it must also be near a node of its tilted orbit.", "Phenomena", learnTopic("Solar eclipses", "solar-eclipses")),
  () => bool("Sunlight takes about 8 minutes to reach Earth.", true, "Light covers 1 AU in 8.3 minutes; it takes over 4 hours to reach Neptune.", "Sun", learnBody(byId("sun"))),
  () => bool("Io is the most volcanically active world in the solar system.", true, "Tidal squeezing by Jupiter powers hundreds of volcanoes on Io.", "Moons", learnBody(byId("io"))),
  () => bool("Earth is the densest planet in the solar system.", true, "Earth's average density is 5.51 g/cm³, just ahead of Mercury.", "Planets", learnBody(byId("earth"))),
  () => bool("The Moon has no gravity.", false, "The Moon's surface gravity is 1.62 m/s², about one-sixth of Earth's — enough to hold astronauts down and raise Earth's tides.", "Moons", learnTopic("Tides", "tides")),
  () => bool("Neptune has the fastest winds in the solar system.", true, "Neptune's winds reach about 2,100 km/h, the fastest measured on any planet.", "Planets", learnBody(byId("neptune"))),
  () => bool("Titan is bigger than the planet Mercury.", true, "Titan's radius is 2,575 km versus Mercury's 2,440 km, though Mercury is far more massive.", "Moons", learnBody(byId("titan"))),
  // --- phenomena ---
  () => ({ kind: "choice", prompt: "What causes Earth's seasons?", options: shuffle(["Earth's axial tilt", "Earth's changing distance from the Sun", "The Moon's shadow", "The Sun getting hotter in summer"]), answer: "Earth's axial tilt", explanation: "As Earth orbits, its 23.4° tilt points each hemisphere toward the Sun for half the year: longer days and higher, more direct sunlight mean summer.", topic: "Phenomena", hint: "Both hemispheres are the same distance from the Sun, yet have opposite seasons.", learn: learnTopic("Why we have seasons", "seasons") }),
  () => ({ kind: "choice", prompt: "Why do we always see the same face of the Moon?", options: shuffle(["The Moon rotates once per orbit (tidal locking)", "The Moon does not rotate at all", "Earth's shadow hides the other side", "The far side is always dark"]), answer: "The Moon rotates once per orbit (tidal locking)", explanation: "Earth's tides slowed the Moon's spin until one rotation matched one orbit, so the same side always faces us.", topic: "Phenomena", learn: learnTopic("Tides & tidal locking", "tides") }),
  () => ({ kind: "choice", prompt: "Why does the Moon turn red during a total lunar eclipse?", options: shuffle(["Sunlight bends through Earth's atmosphere and only red light gets through", "The Moon heats up", "Mars is reflecting light onto it", "Volcanoes on the Moon glow"]), answer: "Sunlight bends through Earth's atmosphere and only red light gets through", explanation: "Earth's atmosphere refracts sunlight into the shadow and scatters away the blue, so the Moon is lit by every sunrise and sunset on Earth at once.", topic: "Phenomena", learn: learnTopic("Lunar eclipses", "lunar-eclipses") }),
  () => ({ kind: "choice", prompt: "Why does Mars sometimes appear to move backwards across the sky?", options: shuffle(["Earth overtakes Mars on its faster inner orbit", "Mars reverses its orbit", "The Sun's gravity pushes it back", "Mars's moons pull it backwards"]), answer: "Earth overtakes Mars on its faster inner orbit", explanation: "Like passing a slower car, when Earth overtakes Mars every 26 months Mars seems to slide backwards against the distant stars for a few weeks.", topic: "Phenomena", learn: learnTopic("Retrograde motion", "retrograde-motion") }),
  () => ({ kind: "choice", prompt: "Why is a sunset red?", options: shuffle(["Sunlight crosses more air, which scatters away the blue", "The Sun cools in the evening", "Dust on the Sun's surface", "Earth's shadow tints it"]), answer: "Sunlight crosses more air, which scatters away the blue", explanation: "Near the horizon light travels through far more atmosphere; short blue wavelengths scatter out (that is also why the sky is blue), leaving the reds.", topic: "Phenomena", learn: learnTopic("Day, night and sunsets", "day-and-night") }),
  () => ({ kind: "choice", prompt: "How long does sunlight take to reach Earth?", options: shuffle(["About 8 minutes", "About 8 seconds", "About 8 hours", "It arrives instantly"]), answer: "About 8 minutes", explanation: "Light travels 300,000 km per second and Earth is 150 million km away: 8 minutes 20 seconds.", topic: "Sun", hint: "Light is fast, but 150 million km is a long way.", learn: learnBody(byId("sun")) }),
  () => ({ kind: "choice", prompt: "How often do total solar eclipses happen somewhere on Earth?", options: shuffle(["Roughly every 18 months", "Every month", "Once a decade", "Once a century"]), answer: "Roughly every 18 months", explanation: "They need a new Moon near a node of the Moon's tilted orbit; that lines up about every 18 months, but each totality path is only ~100 km wide, so any one place waits centuries.", topic: "Phenomena", learn: learnTopic("Solar eclipses", "solar-eclipses") }),
];

/** A mixed set of `count` questions with no generator used twice. */
export function makeQuiz(count = 10): Question[] {
  return pick(generators, Math.min(count, generators.length)).map((g) => g());
}

export const QUIZ_POOL_SIZE = generators.length;

/** Wrap a page's fixed multiple-choice questions in the shared Question shape. */
export function fromContent(name: string, qs: { prompt: string; options: string[]; answer: string; explanation: string }[]): Question[] {
  return qs.map((q) => ({ kind: "choice", topic: name, ...q }));
}


