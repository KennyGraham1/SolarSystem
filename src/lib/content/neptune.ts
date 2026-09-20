import type { PlanetContent } from "./types";

export const neptune: PlanetContent = {
  id: "neptune",
  tagline: "The planet found with a pen: a deep-blue ice giant of supersonic winds at the edge of the planetary system.",
  intro: [
    "Neptune is the eighth and most distant planet, orbiting 30 times further from the Sun than Earth, where sunlight is 900 times weaker and takes more than four hours to arrive. It is an ice giant like Uranus, almost the same size, slightly more massive and coloured a rich blue by methane. It takes 165 years to complete one orbit; since its discovery in 1846 it has gone around the Sun only once, finishing its first observed lap in 2011.",
    "Neptune was the first planet whose existence was predicted by mathematics before anyone saw it. Astronomers noticed that Uranus was straying from its calculated path, worked out where an unknown planet would need to be to explain the discrepancy, and found Neptune within a degree of the prediction on the first night they looked. It was a triumph of Newton's law of gravity.",
    "For a cold, distant world, Neptune is remarkably lively. It generates more than twice the heat it receives from the Sun, its winds are the fastest measured on any planet at up to 2,100 km/h, and its atmosphere spawns dark storms the size of Earth that appear and vanish within years. Its largest moon, Triton, orbits backwards, spews nitrogen geysers, and is almost certainly a captured dwarf planet from the Kuiper Belt.",
  ],
  sections: [
    {
      title: "Structure and interior",
      paragraphs: [
        "Neptune's interior is thought to mirror Uranus's: a rocky core of about one Earth mass, a hot, dense fluid mantle of water, ammonia and methane 'ices' making up most of the planet, and an outer envelope of hydrogen and helium. Neptune is slightly smaller than Uranus but 18% more massive, so it is denser, the densest of the four giant planets. The pressure at its centre may reach 7 million atmospheres and the temperature around 5,000 °C.",
        "The mantle is where the interesting chemistry happens. At depths of a few thousand kilometres, water becomes an ionic or superionic fluid that conducts electricity, and its swirling motion generates Neptune's magnetic field. Like Uranus's, that field is bizarre: tilted 47° from the rotation axis and offset from the centre by more than half the planet's radius, evidence that it is produced in a relatively shallow layer. Experiments compressing methane suggest carbon may separate out as diamonds that sink through the mantle.",
        "Unlike Uranus, Neptune has a strong internal heat source, radiating about 2.6 times the energy it absorbs from sunlight. This leftover heat from formation, still escaping, is what powers its violent weather despite the feeble Sun. Why two such similar planets differ so much in heat output is one of the main questions an ice-giant mission would try to answer.",
      ],
      highlight: "Neptune gives off 2.6 times more energy than it receives from the Sun, fuelling the fastest winds in the solar system.",
    },
    {
      title: "Atmosphere",
      paragraphs: [
        "Neptune's atmosphere is about 80% hydrogen, 19% helium and 1.5% methane, with traces of hydrocarbons produced when sunlight breaks methane apart. The methane absorbs red light and reflects blue. Neptune has traditionally been shown as a much deeper blue than Uranus, but a 2024 study that reprocessed the Voyager images found the two planets are really quite similar in colour, both a pale greenish blue; Neptune is slightly bluer because it has a thinner layer of haze.",
        "Bright, wispy clouds of methane ice ride high in the stratosphere and cast shadows on the deeper cloud deck. Below them lie clouds of hydrogen sulphide and ammonia, and deeper still, water clouds. At the 1-bar level the temperature is about −201 °C, a little warmer than Uranus despite the greater distance, thanks to the internal heat. Neptune's high-altitude cloud cover changes with the solar cycle: between 2019 and 2020 the clouds all but vanished, apparently because a lull in solar ultraviolet light reduced the haze on which they form.",
        "The winds are extraordinary. Near the equator a broad jet blows westward, against the planet's rotation, at up to 2,100 km/h, nearly twice the speed of sound on Earth; further from the equator the winds reverse. Such speeds are possible because the atmosphere is cold and smooth, with very little turbulence to slow it down, and Neptune's fast 16-hour rotation helps organise the flow.",
      ],
    },
    {
      title: "Storms: the Great Dark Spot and its successors",
      paragraphs: [
        "When Voyager 2 arrived in 1989 it found a huge storm in Neptune's southern hemisphere, an anticyclone the size of Earth, which it named the Great Dark Spot, along with a fast-moving white cloud nicknamed 'Scooter' and a smaller storm, the 'Small Dark Spot'. The Great Dark Spot seemed to be a Neptunian version of Jupiter's Great Red Spot. But when Hubble looked five years later, it had gone.",
        "Since then Hubble has watched a series of dark spots appear, drift and dissolve, each lasting only a few years. One that formed in the north in 2018 was seen growing as a bright cloud first, reversed direction in 2020 instead of drifting to the equator and dying as expected, and was eventually joined by a smaller companion. In 2023 the Very Large Telescope observed a dark spot from the ground for the first time. The spots appear to be holes in the methane haze showing a darker layer beneath, held together as vortices by the winds.",
        "Neptune's storms are powered by the temperature difference between its warm interior and its frigid upper atmosphere, and by the very low friction in its cold, smooth air. Even the moon-sized clouds move so fast that they can be seen shifting in a matter of hours, which is why Voyager's parting images were, briefly, animated.",
      ],
      highlight: "The Great Dark Spot seen by Voyager 2 in 1989 had vanished by the time Hubble looked in 1994.",
    },
    {
      title: "Moons and rings",
      paragraphs: [
        "Neptune has 16 known moons, the most recent two, tiny and distant, confirmed in 2024. Triton dominates the system: it is 2,700 km across, larger than Pluto, and contains 99.5% of the mass orbiting Neptune. It circles the planet backwards, against Neptune's spin, on a tilted orbit, which no moon that formed in place would do. Triton is almost certainly a Kuiper Belt object, a cousin of Pluto, captured by Neptune billions of years ago; its arrival would have wrecked any original moon system.",
        "Triton's surface, at −235 °C, is one of the coldest places in the solar system, yet Voyager 2 saw dark plumes of nitrogen gas and dust rising 8 km from it, geysers driven perhaps by sunlight warming nitrogen ice from beneath. The surface is young, wrinkled into 'cantaloupe terrain', and a subsurface ocean of water and ammonia is possible. Tidal forces are slowly dragging Triton inward; in roughly 3.6 billion years it will break apart and form a ring system grander than Saturn's.",
        "The other moons are modest. Proteus, 420 km across, is the second largest and orbits close in, dark and irregular. Nereid has one of the most eccentric orbits of any moon, swinging between 1.4 and 9.7 million km from Neptune. Hippocamp, discovered by Hubble in 2013, is a 35-km fragment possibly chipped off Proteus by an impact. Neptune also has five faint, dusty rings, named after astronomers involved in its discovery: Galle, Le Verrier, Lassell, Arago and Adams. The Adams ring contains bright arcs, Liberté, Égalité, Fraternité and Courage, clumps held in place by the moon Galatea, which appear to be fading over time. The James Webb Space Telescope captured the rings clearly in 2022 for the first time since Voyager.",
      ],
      highlight: "Triton orbits Neptune backwards and is slowly spiralling inward; one day it will be shredded into a ring.",
    },
    {
      title: "Exploration and missions",
      paragraphs: [
        "Only Voyager 2 has visited Neptune. On 25 August 1989, twelve years after launch, it passed 4,950 km above the north pole, the closest any Voyager came to a planet, then swept past Triton five hours later. In that brief encounter it discovered six moons and the ring arcs, measured the winds and magnetic field, photographed the Great Dark Spot and revealed Triton's geysers. Its images remain the only close-up views of Neptune and the last planetary encounter of the Voyager programme.",
        "Since then everything has come from telescopes. Hubble has tracked Neptune's storms and cloud cycles since the 1990s, adaptive-optics systems on the Keck and Very Large Telescopes resolve its bands and spots from the ground, and the James Webb Space Telescope's 2022 infrared portrait showed the rings, seven moons and bright high-altitude clouds in striking clarity. Amateur astronomers can find Neptune with a small telescope, but it appears only as a tiny blue disc.",
        "No mission to Neptune is currently funded. NASA studied a 'Neptune Odyssey' flagship orbiter and a smaller Triton flyby called Trident, which was a finalist for the Discovery programme in 2021 but not selected; China has also outlined an ice-giant probe concept. The Uranus Orbiter and Probe recommended by the 2022 decadal survey took priority mainly because Uranus is easier to reach, but many of its findings would apply to Neptune too. A Neptune orbiter launched in the 2030s would take more than a decade to arrive.",
      ],
    },
    {
      title: "Name, myth and history",
      paragraphs: [
        "Galileo actually recorded Neptune in December 1612 and January 1613, when it happened to sit near Jupiter, but he took it for a fixed star. Its real discovery came from arithmetic. In 1845 and 1846 Urbain Le Verrier in Paris and, independently, John Couch Adams in Cambridge calculated the position of an unknown planet from the wobbles in Uranus's orbit. On 23 September 1846 Johann Galle and Heinrich d'Arrest at the Berlin Observatory, following Le Verrier's instructions, found the planet within an hour, only about one degree from where he said it would be.",
        "The discovery set off an international row over credit between Britain and France, but the name was settled more easily. Le Verrier briefly wanted to name it after himself; instead, following the mythological tradition, the planet became Neptune, the Roman god of the sea, a fitting title for its deep-blue colour. Its moons take the names of lesser sea gods and nymphs: Triton, Nereid, Proteus, Galatea. William Lassell discovered Triton just 17 days after the planet itself.",
        "Neptune finished its first full orbit since discovery on 12 July 2011. Its orbit also defines the edge of the planetary system: beyond it lies the Kuiper Belt of icy bodies, including Pluto, whose orbit crosses inside Neptune's for part of each lap, and whose resonance with Neptune, two orbits for every three of Neptune's, keeps the two from ever colliding.",
      ],
    },
    {
      title: "What you'd experience there",
      paragraphs: [
        "At Neptune's cloud tops gravity is 11.15 m/s², about 14% stronger than Earth's, the only giant planet besides Jupiter where you would feel noticeably heavier. The temperature is about −200 °C and the wind could exceed 2,000 km/h, so any craft would be torn through the sky at supersonic speed. There is nothing to stand on, only ever-thickening hydrogen, helium and methane giving way to a hot, dark ocean of ionic water thousands of kilometres down.",
        "The Sun would be a very bright star, a thirtieth of the width it shows from Earth, with about a thousandth of the light, roughly the brightness of a room lit by a single bulb, still far brighter than a moonlit night. Every other planet would be lost near the Sun's glare. Triton would be the standout in the sky, crossing from west to east over about six days as it circles backwards. A day lasts 16 hours 7 minutes; a year, 165 Earth years, would be longer than any human life.",
        "A radio message home would take over four hours to arrive and another four for a reply. That is the practical challenge of Neptune: it is so far away that Voyager 2 needed twelve years to reach it, and any future orbiter would spend most of its working life just getting there.",
      ],
      highlight: "From Neptune the Sun is a brilliant star giving a thousandth of Earth's daylight, and a radio message home takes four hours.",
    },
  ],
  layers: [
    {
      name: "Rocky core",
      description: "A core of rock and metal about the mass of Earth, under pressures of several million atmospheres.",
      color: "#8a7360",
      radiusFraction: 0.2,
      detail: "Silicate rock and iron, ~5,000 °C",
    },
    {
      name: "Icy mantle",
      description: "A hot, electrically conducting fluid of water, ammonia and methane that makes up most of the planet and generates its tilted magnetic field.",
      color: "#3f6fd0",
      radiusFraction: 0.8,
      detail: "Ionic and superionic water-ammonia-methane fluid, 2,000 to 5,000 °C",
    },
    {
      name: "Gaseous envelope",
      description: "Hydrogen and helium with methane, growing denser and hotter with depth until it merges with the mantle.",
      color: "#4f7fe0",
      radiusFraction: 0.98,
      detail: "Hydrogen, helium and methane",
    },
    {
      name: "Cloud tops",
      description: "High methane-ice clouds over hydrogen sulphide and ammonia clouds, whipped by the fastest winds known.",
      color: "#3b5fd9",
      radiusFraction: 1,
      detail: "About −201 °C at 1 bar; winds up to 2,100 km/h",
    },
  ],
  timeline: [
    { year: "1612–13", title: "Galileo's missed planet", detail: "Galileo sketches Neptune near Jupiter but records it as a fixed star." },
    { year: "1846", title: "Neptune discovered", detail: "On 23 September, Galle and d'Arrest find Neptune where Le Verrier's calculations said it would be; Lassell discovers Triton 17 days later." },
    { year: "1949", title: "Nereid found", detail: "Gerard Kuiper discovers Neptune's third-largest moon, on a wildly eccentric orbit." },
    { year: "1984", title: "Ring arcs detected", detail: "Occultation observations suggest partial rings around Neptune, later confirmed as arcs in the Adams ring." },
    { year: "1989", title: "Voyager 2 flyby", detail: "On 25 August Voyager 2 passes 4,950 km over Neptune's north pole, discovering the Great Dark Spot, six moons, the rings and Triton's geysers." },
    { year: "1994", title: "The spot is gone", detail: "Hubble images show the Great Dark Spot has vanished and a new storm has formed in the north." },
    { year: "2011", title: "One orbit since discovery", detail: "On 12 July, Neptune returns to the position in its orbit where it was discovered in 1846." },
    { year: "2013", title: "Hippocamp discovered", detail: "Hubble reveals a tiny moon that may be a fragment knocked off Proteus by an impact." },
    { year: "2021", title: "Trident not selected", detail: "NASA passes over the proposed Trident flyby of Triton in favour of two Venus missions; no Neptune mission is funded." },
    { year: "2022", title: "Webb's view of the rings", detail: "The James Webb Space Telescope captures Neptune's rings and seven moons in infrared, the clearest view since Voyager." },
    { year: "2024", title: "Sixteen moons", detail: "Two newly confirmed distant moons bring Neptune's total to 16; a reanalysis of Voyager images shows Neptune's true colour is a paler blue, close to Uranus's." },
  ],
  comparisons: [
    { label: "Diameter", value: 49244, earth: 12742, unit: "km" },
    { label: "Mass", value: 17.1, earth: 1, unit: "× Earth" },
    { label: "Surface gravity (cloud tops)", value: 11.15, earth: 9.81, unit: "m/s²" },
    { label: "Rotation period", value: 16.1, earth: 23.93, unit: "hours" },
    { label: "Year length", value: 60190, earth: 365.25, unit: "Earth days" },
    { label: "Mean distance from Sun", value: 4499, earth: 149.6, unit: "million km" },
    { label: "Mean temperature (cloud tops)", value: -200, earth: 15, unit: "°C" },
    { label: "Escape velocity", value: 23.5, earth: 11.19, unit: "km/s" },
  ],
  moons: [
    {
      name: "Triton",
      radiusKm: 1353.4,
      description: "Larger than Pluto and orbiting backwards, Triton is a captured Kuiper Belt object with nitrogen geysers, a −235 °C surface and possibly an internal ocean.",
    },
    {
      name: "Proteus",
      radiusKm: 210,
      description: "Neptune's second-largest moon, a dark, irregular body about as large as an object can be without gravity pulling it into a sphere.",
    },
    {
      name: "Nereid",
      radiusKm: 170,
      description: "Discovered in 1949, it follows one of the most eccentric orbits of any moon, ranging from 1.4 to 9.7 million km from Neptune.",
    },
    {
      name: "Larissa",
      radiusKm: 97,
      description: "An inner moon first glimpsed during a 1981 occultation and confirmed by Voyager 2, slowly spiralling inward toward Neptune.",
    },
    {
      name: "Hippocamp",
      radiusKm: 17,
      description: "A 35-km moon found by Hubble in 2013, probably a chip knocked off Proteus by a comet impact.",
    },
  ],
  quiz: [
    {
      prompt: "How was Neptune discovered?",
      options: [
        "By accident during a comet search",
        "By calculating where an unseen planet must be to explain Uranus's orbit",
        "By Voyager 2 in 1989",
        "By Galileo in 1613",
      ],
      answer: "By calculating where an unseen planet must be to explain Uranus's orbit",
      explanation: "Le Verrier and Adams independently predicted Neptune's position from irregularities in Uranus's orbit. Galle found it within a degree of Le Verrier's prediction on 23 September 1846.",
    },
    {
      prompt: "What is remarkable about Neptune's winds?",
      options: [
        "They are the slowest of any planet",
        "They blow only at the poles",
        "They are the fastest measured on any planet, up to 2,100 km/h",
        "They stop completely at night",
      ],
      answer: "They are the fastest measured on any planet, up to 2,100 km/h",
      explanation: "Neptune's equatorial jet reaches around 2,100 km/h, nearly twice the speed of sound on Earth, powered by the planet's internal heat and helped by its cold, low-friction atmosphere.",
    },
    {
      prompt: "Why do astronomers think Triton was captured rather than formed alongside Neptune?",
      options: [
        "It is made of iron",
        "It orbits backwards, against Neptune's rotation",
        "It has an atmosphere",
        "It is smaller than the other moons",
      ],
      answer: "It orbits backwards, against Neptune's rotation",
      explanation: "A moon that formed from the same disc as its planet would orbit in the same direction. Triton's retrograde, tilted orbit points to capture from the Kuiper Belt.",
    },
    {
      prompt: "How many spacecraft have visited Neptune?",
      options: ["None", "One", "Two", "Five"],
      answer: "One",
      explanation: "Voyager 2 made the only flyby of Neptune on 25 August 1989. No follow-up mission has yet been funded.",
    },
    {
      prompt: "Roughly how long does Neptune take to orbit the Sun?",
      options: ["12 years", "30 years", "84 years", "165 years"],
      answer: "165 years",
      explanation: "Neptune's year is about 165 Earth years. It completed its first full orbit since its 1846 discovery in July 2011.",
    },
  ],
  glossary: [
    { term: "Ice giant", definition: "A giant planet composed mostly of water, ammonia and methane rather than hydrogen and helium. Neptune and Uranus are the solar system's two ice giants." },
    { term: "Retrograde orbit", definition: "An orbit in the opposite direction to the planet's rotation. Triton is the only large moon in the solar system with one." },
    { term: "Kuiper Belt", definition: "A ring of icy bodies beyond Neptune's orbit, home to Pluto and the probable birthplace of Triton." },
    { term: "Great Dark Spot", definition: "An Earth-sized storm seen by Voyager 2 in 1989 that had disappeared by 1994; similar spots have come and gone since." },
    { term: "Ring arc", definition: "A bright clump within a ring rather than a complete circle. Neptune's Adams ring has several, held in place by the moon Galatea." },
    { term: "Orbital resonance", definition: "A repeating gravitational relationship between orbits. Pluto completes two orbits for every three of Neptune's, which keeps them apart." },
    { term: "Cryovolcanism", definition: "Eruptions of volatile material such as nitrogen or water instead of molten rock, as in Triton's geysers." },
    { term: "Adaptive optics", definition: "A telescope technique that corrects for atmospheric blurring in real time, letting ground-based observers see Neptune's storms." },
  ],
  sources: [
    { title: "NASA Neptune Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/neptunefact.html" },
    { title: "NASA Science: Neptune", url: "https://science.nasa.gov/neptune/" },
    { title: "NASA Science: Neptune Moons", url: "https://science.nasa.gov/neptune/moons/" },
    { title: "NASA Science: Voyager", url: "https://science.nasa.gov/mission/voyager/" },
    { title: "NASA Webb: New Webb image captures clearest view of Neptune's rings in decades", url: "https://science.nasa.gov/missions/webb/new-webb-image-captures-clearest-view-of-neptunes-rings-in-decades/" },
  ],
};
