import type { LearnTopic } from "../types";
import { DayNightDiagram } from "../diagrams/DayNightDiagram";

export const dayNight: LearnTopic = {
  slug: "day-and-night",
  title: "Day, night and sunsets",
  short: "Day & night",
  tagline: "Why the Sun rises in the east, why it sets in the west, and why it turns red on the way down.",
  accent: "#f97316",
  intro: [
    "Every 24 hours the Earth turns once on its axis, carrying you with it. The Sun does not move across the sky at all — you do. Half the planet is always in sunlight and half in shadow, and the line between them, the terminator, sweeps around the globe at about 1,670 km/h at the equator.",
    "Drag the time slider to ride along with the observer. The left panel shows Earth from above the North Pole; the right panel shows what that observer sees looking south at the same moment.",
  ],
  diagrams: [
    {
      title: "Ride along for a day",
      lead: "Seen from above the North Pole, Earth turns anticlockwise. Follow the amber observer from sunrise to sunset and watch how the Sun's height and colour change.",
      Component: DayNightDiagram,
    },
  ],
  steps: [
    {
      title: "Earth spins west to east",
      body: "Viewed from above the North Pole, the planet rotates anticlockwise. The ground under your feet is moving eastward, so anything fixed in space — the Sun, the Moon, the stars — appears to drift westward. Things come into view over the eastern horizon and drop out of view over the western one.",
    },
    {
      title: "Sunrise is you rotating into the light",
      body: "At about 06:00 (on an equinox) the observer crosses the terminator into the sunlit half. From the ground it looks as if the Sun is climbing over the eastern horizon, but it is really the horizon dipping away from the Sun as the planet turns.",
    },
    {
      title: "Noon: shortest path through the air",
      body: "At local noon you face the Sun most directly. Its light crosses the least amount of atmosphere — the diagram calls this 1× — so little of it is scattered away and the Sun looks white or pale yellow.",
    },
    {
      title: "Sunset: the long, red path",
      body: "Near the horizon sunlight skims through the atmosphere at a grazing angle and travels through up to ~38 times more air than at noon. Air molecules scatter short (blue) wavelengths about 5.5 times more strongly than long (red) ones — Rayleigh scattering, proportional to 1/λ⁴ — so by the time the light reaches you most of the blue has been scattered out sideways and the Sun looks orange-red. Dust, smoke and haze redden it further.",
    },
    {
      title: "Twilight: light from a Sun you can't see",
      body: "After the Sun drops below the horizon the sky stays bright because the upper atmosphere above you is still sunlit and scatters light down. Astronomers define three stages by how far the Sun is below the horizon: civil twilight (0° to −6°, bright enough to read outdoors), nautical (−6° to −12°, the horizon is still visible at sea) and astronomical (−12° to −18°, faint sky glow). Beyond −18° it is fully night. Near the equator the Sun sinks steeply and twilight is short; at high latitudes it can last all night in summer.",
    },
  ],
  tryThis: [
    "Set the time to 17:30 and watch the light-path readout: sunlight is crossing several times more air than at noon. Step forward minute by minute and watch the Sun redden before it disappears.",
    "Compare 18:20 and 19:10. The Sun is below the horizon in both, yet one is civil twilight and the other nautical — this is why streetlights come on well after sunset.",
    "Press Play and count how long the sky stays lit after sunset in the horizon view. Then think about why the sky brightens before sunrise for exactly the same length of time.",
  ],
  misconceptions: [
    { myth: "The Sun moves around the Earth once a day.", truth: "Earth rotates once a day. The Sun's daily arc is a reflection of our own motion — the same reason trees seem to slide past a train window." },
    { myth: "The Sun is red at sunset because it is farther away or cooler.", truth: "The Sun is the same colour and distance all day. Its light is filtered by a much longer path through air, which removes the blue by scattering." },
    { myth: "When the Sun sets, it gets dark immediately.", truth: "Twilight lasts 20 minutes to well over an hour depending on latitude and season, because the atmosphere high above you is still lit." },
    { myth: "The Sun rises exactly in the east every day.", truth: "Only on the equinoxes. In northern summer it rises north of east and sets north of west; in winter, south of east and south of west (see Seasons)." },
  ],
  related: ["earth", "sun"],
  sources: [
    { title: "NASA — Earth facts (rotation and orbit)", url: "https://science.nasa.gov/earth/facts/" },
    { title: "NOAA — Twilight definitions", url: "https://www.weather.gov/fsd/twilight" },
    { title: "Kasten & Young (1989), relative optical air mass formula", url: "https://doi.org/10.1364/AO.28.004735" },
    { title: "NASA Earth Fact Sheet (rotation period, equatorial speed)", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html" },
  ],
};
