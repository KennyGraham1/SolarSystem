import type { LearnTopic } from "../types";
import { SeasonsDiagram } from "../diagrams/SeasonsDiagram";

export const seasons: LearnTopic = {
  slug: "seasons",
  title: "Why we have seasons",
  short: "Seasons",
  tagline: "A 23.4° tilt — not distance — decides how long and how strong the sunshine is where you live.",
  accent: "#22c55e",
  intro: [
    "Earth's axis is tilted 23.44° from the perpendicular to its orbit, and it keeps pointing the same way in space (toward Polaris) all year round. As Earth travels around the Sun, first one hemisphere and then the other is angled toward the sunlight. That changes two things at once: how many hours the Sun is up, and how high it climbs — which sets how concentrated its energy is on the ground.",
    "Drag the date slider and pick a latitude. The side view shows your latitude circle edge-on: the amber part is in daylight, the grey part in night.",
  ],
  diagrams: [
    {
      title: "Tilt, date and day length",
      lead: "The axis never changes direction as Earth orbits. Compare the solstices, then move to the equinoxes and notice that every latitude gets 12 hours of light.",
      Component: SeasonsDiagram,
    },
  ],
  steps: [
    {
      title: "The axis stays put; the Sun's angle changes",
      body: "In June the North Pole leans toward the Sun, so the Sun stands directly overhead at 23.4°N (the Tropic of Cancer). In December the South Pole leans in, and the overhead point is at 23.4°S (the Tropic of Capricorn). The Sun's latitude — its declination — swings between these limits through the year.",
    },
    {
      title: "Longer days...",
      body: "Look at the edge-on latitude circle in the side view. When your hemisphere leans toward the Sun, more than half of your circle is on the lit side, so the Sun is up for more than 12 hours. At 51.5°N (London) the longest day is about 16 h 40 min; north of the Arctic Circle (66.6°) the whole circle is lit and the Sun never sets.",
    },
    {
      title: "...and a higher Sun",
      body: "A high Sun delivers its energy onto a small patch of ground; a low Sun spreads the same beam over a wider area and passes through more atmosphere. At noon in London the Sun reaches 62° in June but only 15° in December — roughly three times less energy per square metre before day length is even counted.",
    },
    {
      title: "Solstices and equinoxes",
      body: "Around 20–21 June the axis leans most directly toward the Sun (June solstice: longest day in the north, shortest in the south). Around 21–22 December it is the reverse. Around 20 March and 22–23 September the tilt is sideways to the Sun: the terminator passes through both poles and every place on Earth gets about 12 hours of daylight — the equinoxes.",
    },
    {
      title: "Why the hottest days come later",
      body: "Land and especially oceans take weeks to warm up and cool down, so temperatures lag behind sunlight. Northern summers peak in July–August, not at the June solstice, and the coldest weeks come in January–February.",
    },
  ],
  tryThis: [
    "Set the date to 21 June and the latitude to 69.6°N (Tromsø). The day-length readout shows 24 hours — the midnight Sun. Now try 21 December: polar night.",
    "Choose Cape Town (34°S) and step through the year. Its seasons are the mirror image of London's: summer in December, winter in June.",
    "Move to the equator. Day length hardly changes all year, but watch the declination readout: the Sun is overhead at noon twice a year, at the equinoxes.",
    "Watch the distance readout in early January. Earth is closest to the Sun while the northern hemisphere shivers.",
  ],
  misconceptions: [
    { myth: "Summer is when Earth is closest to the Sun.", truth: "Earth is closest (perihelion, 147.1 million km) around 3 January and farthest (152.1 million km) around 4–5 July. The 3% difference in distance is tiny compared with the effect of tilt, and both hemispheres would have the same seasons if distance mattered most." },
    { myth: "The tilt makes one hemisphere much nearer the Sun.", truth: "The tilt moves each hemisphere a few thousand kilometres toward or away from the Sun — out of 150 million. What matters is the angle at which sunlight arrives and how long the Sun stays up." },
    { myth: "On the equinox, day and night are exactly 12 hours everywhere.", truth: "Almost. Refraction lifts the Sun's image and 'sunrise' counts the upper edge, so daylight is a few minutes longer than 12 hours — the exact 12-hour day (the 'equilux') falls a few days from the equinox." },
    { myth: "The Sun is overhead at noon everywhere on Earth.", truth: "Only in the tropics, and only twice a year (once at each tropic). London's noon Sun never gets higher than 62°." },
  ],
  related: ["earth", "sun", "mars", "uranus"],
  sources: [
    { title: "NASA — What causes the seasons?", url: "https://spaceplace.nasa.gov/seasons/en/" },
    { title: "NASA Earth Fact Sheet (obliquity 23.44°, perihelion/aphelion)", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html" },
    { title: "US Naval Observatory — Earth's seasons and apsides", url: "https://aa.usno.navy.mil/data/Earth_Seasons" },
    { title: "NOAA — Solar calculator details (declination and day-length formulas)", url: "https://gml.noaa.gov/grad/solcalc/calcdetails.html" },
  ],
};
