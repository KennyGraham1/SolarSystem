import type { LearnTopic } from "../types";
import { TidesDiagram } from "../diagrams/TidesDiagram";

export const tides: LearnTopic = {
  slug: "tides",
  title: "Tides",
  short: "Tides",
  tagline: "The Moon does not lift the sea toward itself — it stretches the whole Earth, so the water rises on both sides.",
  accent: "#3b82f6",
  intro: [
    "Twice a day the sea rises and falls at most coasts. The cause is the Moon's gravity — but not simply its pull. Gravity weakens with distance, so the Moon pulls the near side of Earth harder than the centre, and the centre harder than the far side. The difference stretches the planet along the Earth–Moon line, raising two bulges of water: one facing the Moon and one facing away. Earth then rotates beneath them.",
    "Drag the time-of-day slider to spin Earth under the bulges, and the day-of-month slider to move the Moon and see the Sun's smaller tide add to or subtract from the Moon's.",
  ],
  diagrams: [
    {
      title: "Bulges, spring and neap tides",
      lead: "The ocean envelope is drawn hugely exaggerated — real open-ocean tides are under a metre high. Coastal shapes and shallow seas amplify them to several metres in places.",
      Component: TidesDiagram,
    },
  ],
  steps: [
    {
      title: "Differential gravity",
      body: "Use the 'Where the bulges come from' panel. The Moon pulls every part of Earth, but the near side (about 6,400 km closer) feels roughly 7% more pull than the far side. Subtract the pull on the centre — which is what makes Earth as a whole orbit — and what is left is a stretch: toward the Moon on the near side, away from it on the far side. This tidal force is only about one ten-millionth of Earth's surface gravity, but the oceans are free to flow, so they respond.",
    },
    {
      title: "Two high tides a day",
      body: "The bulges stay lined up with the Moon while Earth rotates beneath them. A point on the coast passes through both bulges each day — two high tides and two low tides. Because the Moon moves on along its orbit, Earth needs an extra ~50 minutes to catch up: high tides come every 12 h 25 min, and the tide table shifts later each day like moonrise does.",
    },
    {
      title: "The Sun helps — a little",
      body: "The Sun is enormously more massive but 390 times farther away, and tidal force falls off with the cube of distance, so its tide is about 46% of the Moon's. When Sun, Earth and Moon line up (New and Full Moon) the two tides add: spring tides, with the highest highs and lowest lows. At the quarter Moons the Sun's bulge sits at right angles and partly fills the Moon's low: neap tides, with the smallest range. 'Spring' here means 'to spring up', not the season.",
    },
    {
      title: "Real coasts complicate it",
      body: "The ideal two-bulge picture applies to a water-covered planet. Continents block the bulges, so the tide actually sloshes around ocean basins as huge rotating waves. Funnel-shaped bays amplify it — the Bay of Fundy in Canada sees a 16 m range — while some places (parts of the Gulf of Mexico) get only one high tide a day.",
    },
    {
      title: "Tidal locking: the long game",
      body: "Friction between the tides and the seabed slightly drags the bulges ahead of the Moon. The Moon's pull on that offset bulge slows Earth's spin (our day lengthens by about 2 milliseconds per century) and, in return, pushes the Moon outward by 3.8 cm a year. Earth once did the same to the Moon, and far faster — the Moon's spin was braked until one rotation matched one orbit. That is tidal locking, and it is why we see only one face.",
    },
  ],
  tryThis: [
    "Set the day to 0 (New Moon) and read the tidal range: spring tides. Then set day 7.4 (first quarter) and watch the range shrink to neap.",
    "Notice at New Moon the Moon and Sun are on the same side of Earth, yet the tide is high on both sides. Distance from the Moon is not what lifts the water.",
    "Press Play and watch the tide curve: two humps per day. Then work out why high tide at a given beach comes about 50 minutes later each day.",
    "Look at the bulge with the 'difference from the centre' view. The far-side arrow points away from the Moon: that is the second bulge.",
  ],
  misconceptions: [
    { myth: "The Moon pulls the water up toward itself, so there should be one bulge.", truth: "There are two. The Moon pulls the solid Earth away from the far-side water almost as much as it pulls the near-side water toward it. Both sides end up higher relative to the centre." },
    { myth: "Tides are caused by the Moon's gravity being strong.", truth: "The Moon's pull on you is far weaker than the Sun's. Tides come from the difference in pull across Earth's width, which favours the nearby Moon over the distant Sun." },
    { myth: "High tide happens when the Moon is overhead.", truth: "Friction and coastline shape delay the real tide by hours after the Moon crosses the meridian — the 'lunitidal interval', which differs from port to port." },
    { myth: "Only the oceans have tides.", truth: "The solid Earth flexes about 30 cm twice a day, and the atmosphere has tides too. Jupiter's tides on Io are strong enough to melt its interior." },
  ],
  related: ["moon", "earth", "sun", "io"],
  sources: [
    { title: "NOAA — What causes tides?", url: "https://oceanservice.noaa.gov/facts/tides.html" },
    { title: "NOAA Tides & Currents — Tidal forces (differential gravity, Sun ≈ 46% of Moon)", url: "https://tidesandcurrents.noaa.gov/restles3.html" },
    { title: "NASA — Tides and the Moon", url: "https://science.nasa.gov/moon/tides/" },
    { title: "NASA — Top Moon questions (is the Moon moving away?)", url: "https://science.nasa.gov/moon/top-moon-questions/" },
  ],
};
