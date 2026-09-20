import type { LearnTopic } from "../types";
import { MoonPhasesDiagram } from "../diagrams/MoonPhasesDiagram";

export const moonPhases: LearnTopic = {
  slug: "moon-phases",
  title: "Phases of the Moon",
  short: "Moon phases",
  tagline: "The Moon is always half lit. Phases are just how much of that lit half is turned toward us.",
  accent: "#cbd5e1",
  intro: [
    "The Moon makes no light of its own; it reflects sunlight, and like Earth it always has one sunlit half and one dark half. As it orbits Earth every 29.5 days we see that lit half from changing angles — a sliver when the Moon lies roughly between us and the Sun, the full disk when it lies opposite.",
    "Drag the slider around one lunar month. The left panel shows the geometry from above; the right panel shows the Moon exactly as it would look from the northern hemisphere.",
  ],
  diagrams: [
    {
      title: "One lunar month",
      lead: "Notice that the Moon's lit half always faces the Sun (left), while the orange dot — a fixed spot on the surface — always faces Earth.",
      Component: MoonPhasesDiagram,
    },
  ],
  steps: [
    {
      title: "New Moon",
      body: "The Moon sits between Earth and the Sun (not usually exactly in line — see Solar eclipses). Its lit half faces away from us, so we see nothing. It rises and sets with the Sun, lost in the daytime sky.",
    },
    {
      title: "Waxing: crescent, first quarter, gibbous",
      body: "Each day the Moon moves about 12° further along its orbit and we see a bit more of its lit side, on the right-hand edge (for northern observers). After 7.4 days we see exactly half the disk lit — the first quarter, a quarter of the way round the orbit. It rises around noon and is high in the sky at sunset.",
    },
    {
      title: "Full Moon",
      body: "Halfway round, the Moon is opposite the Sun. Its entire lit half faces us. It rises at sunset, is up all night, and sets at sunrise — the only phase visible all night long.",
    },
    {
      title: "Waning: gibbous, third quarter, crescent",
      body: "The lit portion now shrinks from the right, leaving the left side lit. The third-quarter Moon rises around midnight and is high in the morning sky; the waning crescent is a thin arc in the east before dawn.",
    },
    {
      title: "Why the Moon rises ~50 minutes later each day",
      body: "In the 24 hours it takes Earth to spin once, the Moon has moved about 12° eastward along its orbit. Earth has to turn that extra 12° — about 49 minutes — before the Moon is back over your horizon. That is why moonrise drifts later day by day, and why the tides do too.",
    },
    {
      title: "Why we always see the same face",
      body: "The Moon rotates on its axis exactly once per orbit (27.3 days). This synchronous rotation is the result of tidal locking: Earth's gravity raised bulges on the young Moon that acted as a brake until its spin matched its orbit. Small wobbles (librations) let us glimpse 59% of the surface over time, but never the whole far side from the ground.",
    },
  ],
  tryThis: [
    "Set the slider to day 7.4 (first quarter). In the top view the Moon's lit half faces the Sun on the left, yet in the sky view the right half is lit. Work out why: from Earth you are looking at the Moon 'side-on'.",
    "Jump to Full Moon and look at the far side (the side away from Earth). It is completely dark. Now jump to New Moon: the far side is in full sunshine.",
    "Use the moonrise readout to plan: when does a waning crescent rise? Why can you never see a thin crescent at midnight?",
  ],
  misconceptions: [
    { myth: "Phases are caused by Earth's shadow falling on the Moon.", truth: "Earth's shadow only touches the Moon during a lunar eclipse, at most a couple of times a year. Phases are simply the angle between the Sun, the Moon and you." },
    { myth: "The far side of the Moon is the dark side.", truth: "The far side gets exactly as much sunlight as the near side. At New Moon it is fully lit. 'Dark' only ever meant 'unknown' — until Luna 3 photographed it in 1959." },
    { myth: "The Moon does not rotate, which is why we see one face.", truth: "It rotates once every 27.3 days — precisely once per orbit. If it did not rotate at all we would see every side over a month." },
    { myth: "A full Moon can be seen in the daytime.", truth: "The full Moon is opposite the Sun, so it is up when the Sun is down. Daytime Moons are always partial phases, most obviously the first and third quarters." },
  ],
  related: ["moon", "earth", "sun"],
  sources: [
    { title: "NASA — Moon phases", url: "https://science.nasa.gov/moon/moon-phases/" },
    { title: "NASA Moon Fact Sheet (synodic month 29.53 d, sidereal 27.32 d)", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html" },
    { title: "NASA — Top Moon questions (same face, far side, moonrise)", url: "https://science.nasa.gov/moon/top-moon-questions/" },
    { title: "NASA — Lunar phases and eclipses", url: "https://science.nasa.gov/moon/lunar-phases-and-eclipses/" },
  ],
};
