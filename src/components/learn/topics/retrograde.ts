import type { LearnTopic } from "../types";
import { RetrogradeDiagram } from "../diagrams/RetrogradeDiagram";

export const retrograde: LearnTopic = {
  slug: "retrograde-motion",
  title: "Retrograde motion",
  short: "Retrograde",
  tagline: "Every 26 months Mars appears to stop, reverse and loop back against the stars. Nothing about Mars changes — Earth is overtaking it.",
  accent: "#c1562d",
  intro: [
    "Night after night the planets drift slowly eastward through the constellations. But every so often a planet slows, stops, and crawls westward for weeks before resuming its eastward path, drawing a loop or an S on the sky. This 'retrograde' motion puzzled astronomers for two thousand years.",
    "The explanation is simple once you see it from above. Earth orbits faster and on an inner track. When it catches up with and passes Mars, the line of sight from Earth to Mars swings backwards — just as a slower car seems to drift backwards as you overtake it on the motorway.",
  ],
  diagrams: [
    {
      title: "Overtaking Mars",
      lead: "Drag through one Earth–Mars cycle. The dotted line of sight shows where Mars appears among the distant stars; the right panel plots that position night after night.",
      Component: RetrogradeDiagram,
    },
  ],
  steps: [
    {
      title: "Inner planets move faster",
      body: "Earth orbits at 30 km/s and completes a circuit in 365 days; Mars, 52% farther out, moves at 24 km/s and takes 687 days. Earth therefore gains a lap on Mars every 780 days (2 years 50 days) — the synodic period.",
    },
    {
      title: "Approaching: Mars drifts east",
      body: "Most of the time, the line from Earth to Mars sweeps eastward against the stars, in the same direction both planets orbit. That is Mars's normal, prograde motion.",
    },
    {
      title: "Overtaking: the line of sight swings back",
      body: "As Earth closes in from behind and passes Mars on the inside, the line of sight pivots the other way. For about 60–80 days centred on opposition, Mars appears to move westward — retrograde — typically covering 10–20° of sky before it stops and turns back.",
    },
    {
      title: "Opposition: closest and brightest",
      body: "At the midpoint, the Sun, Earth and Mars are in a line and Mars is opposite the Sun in our sky: it rises at sunset, is up all night, and is closest and brightest. Because Mars's orbit is noticeably elliptical, some oppositions are far better than others — 56 million km in 2003 versus 101 million km in 2027.",
    },
    {
      title: "Loops and zigzags",
      body: "Mars's orbit is tilted 1.85° to Earth's, so during the reversal Mars is usually slightly above or below its outbound track. When opposition happens far from where the orbits cross, the path is an open loop; when it happens near the crossing, it is a flattened S. Toggle the geometry buttons to see both.",
    },
    {
      title: "Why the ancients needed epicycles",
      body: "In an Earth-centred cosmos a planet should just circle us. To reproduce the loops, Ptolemy (2nd century AD) had each planet ride a small circle (epicycle) whose centre moved along a large one (deferent). It matched the sky remarkably well for 1,400 years. Copernicus (1543) showed that putting the Sun at the centre made the loops an automatic consequence of Earth overtaking the outer planets — and the epicycle for each planet was really just Earth's own orbit in disguise.",
    },
  ],
  tryThis: [
    "Move the slider slowly from day 330 to day 450 and watch the sky panel: Mars drifts east, stops (white ring), runs west through opposition, stops again and resumes. The stationary points are about 36 days either side of opposition.",
    "Compare the Earth–Mars distance readout at day 0 and at opposition: it drops from about 2.5 AU to 0.52 AU. That is why Mars swings from a dim ember to one of the brightest objects in the sky.",
    "Switch between the loop and the S-shape. Real oppositions alternate between these shapes as they move around the orbit.",
    "The next Mars oppositions are 19 February 2027 and 25 March 2029 — check the dates against the 780-day cycle.",
  ],
  misconceptions: [
    { myth: "During retrograde Mars actually reverses direction.", truth: "Mars never changes direction. Only our viewpoint does, because Earth is passing it. Every outer planet shows retrograde motion around its opposition; the inner planets show it around inferior conjunction." },
    { myth: "Retrograde motion is rare or unpredictable.", truth: "Mars does it like clockwork every 25.6 months; Jupiter and Saturn every 13 and 12.4 months. It has no effect on anything on Earth." },
    { myth: "Ptolemy's model was stupid.", truth: "It predicted planetary positions to within a degree or so for over a millennium, better than Copernicus's first circular-orbit model. What finally beat it was Kepler's ellipses and Newton's gravity." },
    { myth: "Mars is closest to Earth at the same distance every time.", truth: "Opposition distances range from 56 to 101 million km because Mars's orbit is quite elliptical (eccentricity 0.093)." },
  ],
  related: ["mars", "earth", "jupiter", "saturn"],
  sources: [
    { title: "NASA — Mars facts", url: "https://science.nasa.gov/mars/facts/" },
    { title: "NASA Mars Fact Sheet (orbital period, inclination, eccentricity, synodic period)", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html" },
    { title: "In-The-Sky.org — Mars at opposition, 19 February 2027", url: "https://in-the-sky.org/news.php?id=20270219_12_100" },
    { title: "ALPO — The 2026–2027 apparition of Mars (opposition dates 2027 and 2029)", url: "https://www.alpo-astronomy.org/jbeish/2027_MARS.htm" },
  ],
};
