import type { LearnTopic } from "../types";
import { SolarEclipseDiagram, SolarNodeSeason } from "../diagrams/SolarEclipseDiagram";

export const solarEclipses: LearnTopic = {
  slug: "solar-eclipses",
  title: "Solar eclipses",
  short: "Solar eclipses",
  tagline: "A cosmic coincidence: the Moon is 400 times smaller than the Sun and 400 times closer, so it can cover it exactly.",
  accent: "#fbbf24",
  intro: [
    "A solar eclipse happens when the Moon passes between Earth and the Sun and its shadow touches the ground. Inside the dark inner shadow (the umbra) the Sun is completely hidden and the corona — the Sun's faint outer atmosphere — appears: a total eclipse. Inside the wider, lighter outer shadow (the penumbra) only part of the Sun is covered: a partial eclipse.",
    "The Sun's diameter is about 400 times the Moon's, and the Sun is about 400 times farther away — so both look about half a degree wide in our sky. But the Moon's distance varies by 13%, and sometimes it looks slightly too small to cover the Sun: a ring of sunlight remains, an annular eclipse.",
  ],
  diagrams: [
    {
      title: "Total or annular?",
      lead: "Slide the Moon between perigee and apogee. The umbra's tip is drawn where the real numbers put it; when it falls short of the ground, the eclipse is annular.",
      Component: SolarEclipseDiagram,
    },
    {
      title: "Why not every New Moon?",
      lead: "The Moon's orbit is tilted 5.1° to Earth's orbit. Eclipses can only happen when a New Moon occurs near one of the two points where the orbits cross — the nodes. Those alignments come in 'eclipse seasons' about every 173 days.",
      Component: SolarNodeSeason,
    },
  ],
  steps: [
    {
      title: "Umbra, penumbra and antumbra",
      body: "Because the Sun is far bigger than the Moon, the Moon's full shadow (umbra) is a narrowing cone about 374,000 km long — almost exactly the Moon's distance from Earth. If the cone tip reaches the ground, observers inside it see a total eclipse. Beyond the tip the cone continues as the antumbra: from there the Moon looks smaller than the Sun and you see a ring. The penumbra is the much wider zone where the Moon hides only part of the Sun.",
    },
    {
      title: "You need a New Moon...",
      body: "The Moon can only pass in front of the Sun at New Moon, once every 29.5 days. That alone would give a solar eclipse every month.",
    },
    {
      title: "...near a node",
      body: "But the Moon's orbit is tilted 5.1° to the ecliptic, and 5° is ten times the Sun's apparent width. Most months the New Moon passes above or below the Sun. Only when a New Moon happens within about 15–18° of a node (the crossing points) does its shadow hit Earth. The nodes line up with the Sun twice a year, so there are two eclipse seasons roughly 173 days apart — at least two and up to five solar eclipses each year, most of them partial or annular.",
    },
    {
      title: "Why totality is rare where you live",
      body: "The umbra is at most about 270 km wide when it reaches the ground, and it races across the surface at over 1,600 km/h, tracing a narrow path. Totality lasts at most 7½ minutes and usually two to four. Averaged over the whole planet, any given spot sees a total eclipse only about once every 375 years — while a partial eclipse is visible from somewhere on Earth about every six months.",
    },
    {
      title: "The 18-month rhythm and the saros",
      body: "Total (or annular) eclipses somewhere on Earth come roughly every 18 months on average. After 18 years 11 days 8 hours — the saros — the Sun, Moon and nodes return to nearly the same alignment and a near-copy of each eclipse repeats, shifted one-third of the way around the world.",
    },
    {
      title: "Safety",
      body: "Never look at the partially eclipsed Sun without certified eclipse glasses (ISO 12312-2) or a proper solar filter. Only during the brief total phase, with the Sun's disk fully covered, is it safe to look directly.",
    },
  ],
  tryThis: [
    "Set the Moon to perigee (356,500 km) with Earth at aphelion (July): the largest possible Moon against the smallest Sun. That is the recipe for the 2 August 2027 eclipse and its 6 min 23 s of totality.",
    "Now slide to apogee. The umbra tip stops well short of the ground and the view from the centre line becomes a ring of fire.",
    "Find the distance where the tip lands exactly on the surface (≈ 380,000 km with Earth at perihelion). Real eclipses near this limit are 'hybrid': annular along part of the path and total along the rest, because Earth's curvature changes the distance to the ground.",
    "In the nodes diagram, press Play and watch how the amber eclipse-season wedges slowly rotate: after 18.6 years the nodes complete a full turn.",
  ],
  misconceptions: [
    { myth: "Solar eclipses are rare.", truth: "Two to five happen every year. What is rare is a total eclipse over your home — on average once in several centuries for a given town." },
    { myth: "The Moon is the same size as the Sun.", truth: "The Sun is ~400 times wider (1.39 million km vs 3,475 km). It only looks the same size because it is ~400 times farther away — a coincidence of our era: the Moon recedes 3.8 cm per year, and in about 600 million years total eclipses will no longer happen." },
    { myth: "It is safe to look at the Sun during any eclipse.", truth: "Only the total phase is safe to view unaided. Even a 99% partial Sun can damage your retina, without pain." },
    { myth: "Eclipses happen every New Moon.", truth: "Only when the New Moon is near a node of the Moon's tilted orbit — about twice a year." },
  ],
  upcoming: {
    title: "Upcoming central solar eclipses",
    lead: "Dates from NASA's eclipse catalogue (Fred Espenak). Regions are where the total or annular phase can be seen; a partial eclipse is visible over a much wider area.",
    events: [
      { date: "6 Feb 2027", kind: "Annular", where: "Chile, Argentina, Uruguay, southern Brazil, then Ivory Coast, Ghana, Togo, Benin, Nigeria", note: "up to 7 min 51 s of annularity" },
      { date: "2 Aug 2027", kind: "Total", where: "Spain, Morocco, Algeria, Tunisia, Libya, Egypt, Saudi Arabia, Yemen, Somalia", note: "6 min 23 s near Luxor — the longest on land this century" },
      { date: "26 Jan 2028", kind: "Annular", where: "Ecuador, Peru, northern Brazil, French Guiana, Madeira, Portugal, Spain, Morocco", note: "up to 9 min 58 s of annularity" },
      { date: "22 Jul 2028", kind: "Total", where: "Australia (Kimberley to Sydney), New Zealand (South Island)", note: "5 min 10 s maximum; 3 min 49 s over Sydney" },
      { date: "25 Nov 2030", kind: "Total", where: "Namibia, Botswana, South Africa, Lesotho, southern Australia", note: "3 min 44 s maximum" },
    ],
  },
  related: ["moon", "sun", "earth"],
  sources: [
    { title: "NASA Eclipse Web Site — Solar eclipses: 2021–2030", url: "https://eclipse.gsfc.nasa.gov/solar.html" },
    { title: "NASA — Total Solar Eclipse of 2027 Aug 02", url: "https://eclipse.gsfc.nasa.gov/SEgoogle/SEgoogle2001/SE2027Aug02Tgoogle.html" },
    { title: "NASA — Total Solar Eclipse of 2030 Nov 25", url: "https://eclipse.gsfc.nasa.gov/SEgoogle/SEgoogle2001/SE2030Nov25Tgoogle.html" },
    { title: "NASA — Types of solar eclipses", url: "https://science.nasa.gov/eclipses/types/" },
    { title: "NASA Moon Fact Sheet (perigee, apogee, radius)", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html" },
    { title: "timeanddate — 22 July 2028 total solar eclipse in Sydney", url: "https://www.timeanddate.com/eclipse/in/australia/sydney?iso=20280722" },
  ],
};
