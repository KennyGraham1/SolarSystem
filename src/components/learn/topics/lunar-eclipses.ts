import type { LearnTopic } from "../types";
import { LunarEclipseDiagram } from "../diagrams/LunarEclipseDiagram";
import { LunarNodeSeason } from "../diagrams/SolarEclipseDiagram";

export const lunarEclipses: LearnTopic = {
  slug: "lunar-eclipses",
  title: "Lunar eclipses",
  short: "Lunar eclipses",
  tagline: "When the full Moon slides into Earth's shadow it does not vanish — it turns the colour of every sunset on Earth at once.",
  accent: "#dc2626",
  intro: [
    "A lunar eclipse happens when the Sun, Earth and Moon line up with Earth in the middle, so the full Moon passes through Earth's shadow. Earth's umbra at the Moon's distance is about 9,000 km across — two and a half Moons wide — so the Moon can spend well over an hour completely inside it, and the whole event lasts several hours.",
    "Unlike a solar eclipse, you do not need to be in a special place: anyone on the night side of Earth sees the same eclipse at the same moment.",
  ],
  diagrams: [
    {
      title: "Through the shadow",
      lead: "Move the Moon through Earth's shadow and change how far the full Moon sits from the node. Deep passages are total; glancing ones are partial or merely penumbral.",
      Component: LunarEclipseDiagram,
    },
    {
      title: "Why not every Full Moon?",
      lead: "The same 5.1° tilt that spoils most solar eclipses spoils most lunar ones. A lunar eclipse needs a Full Moon within about 10–12° of a node.",
      Component: LunarNodeSeason,
    },
  ],
  steps: [
    {
      title: "Earth's two shadows",
      body: "Earth casts a dark central umbra, where the Sun is completely hidden, surrounded by a penumbra, where part of the Sun still shines. The umbra is a cone about 1.4 million km long; at the Moon's distance (384,400 km) it is still ~9,000 km wide. The Moon is 3,475 km across, so it fits inside with room to spare.",
    },
    {
      title: "Penumbral, partial, total",
      body: "If the Moon only passes through the penumbra it dims slightly — hard to notice. If part of it enters the umbra, a dark bite appears: a partial eclipse. When the whole Moon is inside the umbra it is total; totality can last up to about 1 h 45 min for a central passage.",
    },
    {
      title: "Why the Moon turns red",
      body: "Inside the umbra the Sun is hidden by Earth, but sunlight grazing Earth's edge is bent (refracted) by the atmosphere — by about 1°, enough to reach the Moon. On that long path through air the blue light is scattered away, exactly as at sunset (see Why is the sky blue?), so what arrives is deep orange-red. The Moon is lit by the combined glow of every sunrise and sunset on Earth. Volcanic ash or heavy cloud around Earth's rim makes the eclipsed Moon darker.",
    },
    {
      title: "Full Moon near a node",
      body: "Earth's shadow points directly away from the Sun, so only a Full Moon can enter it — and only when that Full Moon happens within about 10–12° of a node of its tilted orbit. This happens during the same eclipse seasons as solar eclipses: a lunar eclipse is usually preceded or followed by a solar eclipse two weeks earlier or later.",
    },
    {
      title: "Visible from half the world",
      body: "The eclipse is happening on the Moon, not on Earth. Everyone who can see the Moon — the entire night hemisphere, plus the twilight edges as the Moon rises or sets — sees the same phases at the same instant (in different local times). That is why a given place sees a lunar eclipse every couple of years, but a total solar eclipse only every few centuries.",
    },
  ],
  tryThis: [
    "Set the offset to 0 (central) and Play: time the total phase. Then set it to 1.5 Moon radii and watch totality shrink to a few minutes with one edge of the Moon staying brighter.",
    "Set the offset to 3 radii: the Moon never fully enters the umbra — a partial eclipse with a permanent dark bite.",
    "Set the offset above 3.7: only the penumbra touches the Moon. Would you notice from your garden? (Most people do not.)",
    "In the nodes diagram, find a date in season and imagine the New Moon two weeks earlier: it was near the other node, so a solar eclipse probably happened then too.",
  ],
  misconceptions: [
    { myth: "The Moon's phases are mini lunar eclipses.", truth: "Phases come from the Moon's own day–night line, seen at an angle. Earth's shadow is involved only during an actual eclipse, and only at Full Moon." },
    { myth: "A 'blood Moon' is a rare or ominous event.", truth: "Any total lunar eclipse looks coppery red for the same reason sunsets are red. There are about two total lunar eclipses every three years somewhere on Earth." },
    { myth: "You need eclipse glasses for a lunar eclipse.", truth: "Never. You are looking at the Moon, which is dimmer than usual. Binoculars make the colours richer." },
    { myth: "Lunar eclipses happen at the same time each month.", truth: "They need a Full Moon at a node, so at most two or three a year, in eclipse seasons roughly six months apart." },
  ],
  upcoming: {
    title: "Upcoming lunar eclipses",
    lead: "Dates from NASA's eclipse catalogue; regions are where the Moon is above the horizon during the eclipse. The most recent were the total eclipse of 3 March 2026 (Pacific, Americas, east Asia, Australia) and the partial eclipse of 28 August 2026 (Americas, Europe, Africa).",
    events: [
      { date: "12 Jan 2028", kind: "Partial", where: "Americas, Europe, Africa" },
      { date: "6 Jul 2028", kind: "Partial", where: "Europe, Africa, Asia, Australia" },
      { date: "31 Dec 2028", kind: "Total", where: "Europe, Africa, Asia, Australia, Pacific", note: "a New Year's Eve blood Moon" },
      { date: "26 Jun 2029", kind: "Total", where: "Americas, Europe, Africa, Middle East" },
      { date: "20 Dec 2029", kind: "Total", where: "Americas, Europe, Africa, Asia" },
      { date: "15 Jun 2030", kind: "Partial", where: "Europe, Africa, Asia, Australia" },
    ],
  },
  related: ["moon", "earth", "sun"],
  sources: [
    { title: "NASA Eclipse Web Site — Lunar eclipses: 2021–2030", url: "https://eclipse.gsfc.nasa.gov/lunar.html" },
    { title: "NASA — Eclipses: lunar and solar", url: "https://science.nasa.gov/moon/eclipses/" },
    { title: "NASA — What is a total lunar eclipse?", url: "https://science.nasa.gov/eclipses/types/" },
    { title: "NASA Moon Fact Sheet (distance, diameter)", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html" },
  ],
};
