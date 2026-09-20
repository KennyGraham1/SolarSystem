import type { PlanetContent } from "./types";

export const io: PlanetContent = {
  id: "io",
  tagline: "The most volcanically active world in the solar system, kneaded by Jupiter's tides until it melts.",
  intro: [
    "Io is the innermost of Jupiter's four large Galilean moons and, with a radius of 1,822 km, is slightly bigger than our own Moon. It circles Jupiter every 1.77 days at a distance of about 421,800 km, deep inside the planet's radiation belts. It is the densest moon in the solar system, made of silicate rock around an iron-rich core, and it looks like nothing else: a mottled globe of yellow, orange, red, white and black, painted by sulphur and sulphur dioxide frost from hundreds of active volcanoes.",
    "Io is volcanic because of where it orbits. Its path around Jupiter is kept slightly elliptical by a gravitational resonance with Europa and Ganymede, so the planet's enormous tidal pull varies on every orbit, flexing the moon's surface up and down by as much as 100 m. The friction of that flexing generates roughly a hundred trillion watts of heat, and the result is more than 400 volcanoes, plumes of gas and dust that rise hundreds of kilometres into space, lava lakes hotter than any on Earth, and a surface so quickly renewed that not a single impact crater has ever been found on it.",
    "Io was the first world beyond Earth where active volcanism was seen, by Voyager 1 in 1979, and it remains a natural laboratory for tidal heating. NASA's Juno spacecraft made two close flybys in December 2023 and February 2024, and analysis of its data has since overturned one long-held idea, that Io hides a global magma ocean just beneath its crust, and in July 2026 delivered the first measurements of the heat leaking out of the moon's shallow subsurface.",
  ],
  sections: [
    {
      title: "Structure and interior: a hot, mostly solid moon",
      paragraphs: [
        "Io's high density of 3.53 g/cm³ and the gravity measurements made by NASA's Galileo orbiter show that it has separated into a metallic core and a rocky mantle. The core, made of iron or a mix of iron and iron sulphide, is thought to hold about 20% of the moon's mass, with a radius somewhere between 350 and 650 km depending on how much sulphur it contains. Around it lies a silicate mantle rich in magnesium, and above that a crust of basaltic rock and sulphur compounds estimated to be 12 to 40 km thick.",
        "Where the magma comes from has been debated for decades. In 2011 a reanalysis of Galileo's magnetometer data suggested that Jupiter's field was inducing a response in a global layer of molten rock, a magma ocean at least 50 km thick beneath the crust. But when Juno's gravity data from its 2023 and 2024 flybys were combined with the older measurements, the moon's tidal deformation turned out to be far too small for a shallow magma ocean. The results, published in Nature in December 2024, favour a mostly solid mantle that is partially molten, with magma rising through interconnected chambers rather than from a single global sea.",
        "In July 2026 the Juno team reported the first measurements of temperature below Io's surface, made with the spacecraft's microwave radiometer. Everywhere it looked, the temperature rose by more than 20 °C within the first few metres of depth, a gradient far steeper than sunlight can explain. The pattern is consistent with heat conducting steadily up through the crust at 1 to 3 watts per square metre, up to 30 times Earth's average, or with cooling lava flows buried under about 10 m of solid rock over a tenth of the surface. The same data showed that much of Io's surface is remarkably smooth at large scales and has the low density of volcanic ash or pumice.",
      ],
      highlight: "Juno's gravity data ruled out a shallow global magma ocean: Io's volcanoes are fed from a hot, partially molten but mostly solid mantle.",
    },
    {
      title: "Surface and volcanoes",
      paragraphs: [
        "Io's surface is a volcanic landscape of paterae, the broad, flat-floored calderas that number in the hundreds. The largest, Loki Patera, is about 200 km across and holds a lava lake whose crust periodically founders and sinks, brightening the whole feature in infrared light. Others, such as Pele, Prometheus and Tvashtar, produce towering plumes: umbrella-shaped fountains of sulphur dioxide gas and dust that can rise 300 to 500 km before falling back as frost, leaving rings of red and white deposits around the vent.",
        "Temperatures measured by Galileo and later by Juno's infrared instrument show that the lavas are silicate, like basalt on Earth, and hot, well above 1,000 °C and in some eruptions estimated at 1,300 °C or more. Between eruptions the surface is bitterly cold, around −130 to −160 °C, so the moon is a patchwork of cold sulphur plains and glowing hotspots. In December 2024 Juno's infrared mapper recorded the most powerful volcanic event ever seen on Io, a hotspot in the southern hemisphere larger than Lake Superior radiating more than 80 trillion watts.",
        "Io also has mountains, and they are not volcanoes. More than a hundred isolated peaks, averaging 6 km high, rise from the plains; Boösaule Montes reaches about 17.5 km, nearly twice the height of Everest. They appear to be blocks of crust tilted and thrust upward as the surface is buried by fresh volcanic deposits at perhaps a centimetre per year and pushed down into the moon. That constant resurfacing is why Io has no impact craters at all: anything that hits it is buried within a geological instant.",
      ],
      highlight: "Io's volcanic plumes rise up to 500 km, and the surface is repaved so fast that not one impact crater survives.",
    },
    {
      title: "A thin sulphur dioxide atmosphere and the plasma torus",
      paragraphs: [
        "Io has an atmosphere, but a patchy and extraordinarily thin one, made mostly of sulphur dioxide with traces of sulphur monoxide, sodium chloride and other volcanic gases. Its surface pressure is around a billionth to a hundred-millionth of Earth's. Part of it is fed directly by the volcanic plumes and part by sulphur dioxide frost that sublimates when the surface warms in sunlight. When Io passes into Jupiter's shadow every orbit, the surface cools, the frost re-forms and most of the atmosphere collapses onto the ground, only to rise again at dawn.",
        "Io sits in the most intense radiation environment of any large moon, and Jupiter's magnetic field sweeps past it at about 57 km per second, stripping away roughly a tonne of material every second. The lost sulphur and oxygen become ionised and form a doughnut-shaped cloud along Io's orbit, the Io plasma torus, which is the main source of the charged particles that fill Jupiter's magnetosphere. A neutral cloud of sodium atoms extends even further, and a current of millions of amperes flows along magnetic field lines between Io and Jupiter's poles, where it produces a distinct auroral footprint.",
        "The radiation dose at Io's surface is lethal: roughly 36 sieverts a day, enough to kill an unprotected person within hours. This is the main reason no spacecraft has orbited Io and why Galileo and Juno visited it only in brief flybys.",
      ],
    },
    {
      title: "Orbit, tides and the Laplace resonance",
      paragraphs: [
        "Io orbits Jupiter in 1.769 days, and it is locked in a chain of resonances with its neighbours: for every four orbits Io makes, Europa makes exactly two and Ganymede exactly one. This 4:2:1 relationship, called the Laplace resonance after the French mathematician who explained it in the 18th century, means the three moons line up with each other in a repeating pattern. Their mutual tugs keep Io's orbit slightly elliptical, with an eccentricity of about 0.004, when tidal friction would otherwise have circularised it long ago.",
        "That small eccentricity has enormous consequences. Io is tidally locked, always presenting the same face to Jupiter, and the planet's gravity raises a tidal bulge on it several kilometres high. As Io moves between the near and far points of its orbit, the strength and direction of the pull change, so the bulge rises and falls by up to about 100 m every 42 hours. The resulting flexing dissipates an estimated 60 to 160 trillion watts inside the moon, an average heat flow of around 2 watts per square metre, far more than Earth's radioactive decay provides.",
        "Tidal heating on this scale makes Io the archetype for a process that operates, more gently, on Europa and Enceladus and possibly in many exoplanet systems. Io also raises tides on Jupiter, which slowly push the moon outward and feed energy into the whole resonant chain, so the three moons' orbits evolve together.",
      ],
      highlight: "Io, Europa and Ganymede orbit in a 4:2:1 resonance that keeps Io's orbit slightly elliptical and its interior molten.",
    },
    {
      title: "Exploration and missions",
      paragraphs: [
        "Pioneer 10 and 11 passed through the Jupiter system in 1973 and 1974, measuring Io's mass and density and discovering its ionosphere. The transformation in our understanding came with Voyager 1 in March 1979. Days before the encounter, Stanton Peale and colleagues published a paper predicting that tidal heating should make Io volcanically active, and on 9 March, while examining a navigation image taken after the 5 March flyby, engineer Linda Morabito noticed a huge plume rising from the limb. Voyager 1 and 2 eventually identified nine eruptions, the first active volcanism ever seen beyond Earth.",
        "NASA's Galileo orbiter, in the Jupiter system from 1995 to 2003, made several close flybys of Io between late 1999 and early 2002, some at altitudes under 200 km. It measured the moon's gravity field, revealing the iron core, imaged lava lakes and mountains in detail and recorded lava temperatures higher than any on modern Earth. Cassini in 2000 and New Horizons in 2007 observed Io from a distance during their flybys of Jupiter; New Horizons caught the 330-km-high Tvashtar plume in a famous sequence of images.",
        "NASA's Juno, orbiting Jupiter since 2016, approached Io progressively during its extended mission and made two close passes at about 1,500 km on 30 December 2023 and 3 February 2024, the closest since Galileo. Its gravity, infrared and microwave data have produced the recent results on the interior, the December 2024 super-eruption and the July 2026 subsurface temperatures, and analysis continues. Juno's formal extended mission ran to September 2025; no dedicated Io mission is currently approved, though ESA's Juice and NASA's Europa Clipper will observe Io from a distance after they arrive at Jupiter in 2031 and 2030. A NASA Discovery-class proposal, the Io Volcano Observer, was not selected in 2021.",
      ],
      highlight: "Voyager 1 discovered Io's volcanoes in March 1979, days after a paper predicted them; Juno's 2023 and 2024 flybys are still yielding results.",
    },
    {
      title: "Name and discovery",
      paragraphs: [
        "Io was discovered by Galileo Galilei in January 1610, when he turned his new telescope on Jupiter. On the night of 7 January he saw what he took to be three small stars in a line with the planet; Io and Europa were so close together that they appeared as one, and Galileo first told them apart on 8 January. Over the following nights he realised the points of light were moving with Jupiter and circling it, and he announced the discovery in his book Sidereus Nuncius that March.",
        "The German astronomer Simon Marius claimed to have observed the moons independently at about the same time, and it was Marius, on a suggestion from Johannes Kepler, who proposed naming them after lovers of Zeus. In Greek mythology Io was a priestess of Hera whom Zeus seduced and then turned into a white heifer to hide her from his wife; the Ionian Sea and the Bosphorus, the ox-ford, are named for her wanderings. Galileo called the moons the Medicean Stars after his patrons and numbered them, and Io was known as Jupiter I well into the 20th century.",
        "The discovery of four bodies plainly orbiting something other than Earth was one of the decisive blows against the Earth-centred model of the cosmos.",
      ],
    },
    {
      title: "What you'd experience there",
      paragraphs: [
        "Io's surface gravity is 1.8 m/s², about 18% of Earth's, a little more than the Moon's, so you would weigh roughly a fifth of your Earth weight and bound easily across the sulphur plains. Underfoot the ground would be frozen sulphur dioxide frost and volcanic ash at around −130 to −160 °C, but a short walk could bring you to a lava lake or a fresh flow radiating heat at well over 1,000 °C. The colours would be vivid even in the weak sunlight: yellows and oranges of sulphur, black silicate lavas, red plume deposits and white frost.",
        "Jupiter would be the overwhelming feature of the sky from the hemisphere that faces it. It would span nearly 20 degrees, some 40 times the width of the full Moon as seen from Earth, and hang fixed in place because Io is tidally locked, its cloud bands turning visibly over a few hours. A day on Io lasts 42.5 hours, and once each day Jupiter would eclipse the Sun for about two hours, during which the thin atmosphere would freeze out onto the ground and volcanic plumes would glow blue and green in the dark.",
        "None of this could be enjoyed for long. The radiation dose at the surface, roughly 36 sieverts a day, would be fatal within hours without extraordinary shielding, and the ground itself is unstable, with plumes erupting without warning and lava lakes whose crusts founder and overturn. Of all the worlds in the solar system, Io may be the most spectacular and the least survivable.",
      ],
      highlight: "From Io, Jupiter fills 20 degrees of sky and never moves, while radiation would kill an unshielded visitor within hours.",
    },
  ],
  layers: [
    {
      name: "Iron core",
      description: "A core of iron or iron and iron sulphide, inferred from Galileo's gravity measurements. Io has no magnetic field of its own, so the core may not be convecting.",
      color: "#c9a26a",
      radiusFraction: 0.27,
      detail: "Iron or iron sulphide, radius roughly 350 to 650 km, about 20% of Io's mass",
    },
    {
      name: "Silicate mantle",
      description: "A hot, magnesium-rich rocky mantle that is partially molten but, according to Juno's gravity data, mostly solid, with magma rising through interconnected chambers.",
      color: "#9c4a2a",
      radiusFraction: 0.95,
      detail: "Silicate rock, partially molten, about 1,100 to 1,400 km thick",
    },
    {
      name: "Partially molten asthenosphere",
      description: "A softer, more melt-rich zone beneath the crust. An older interpretation as a global magma ocean at least 50 km thick was ruled out in 2024.",
      color: "#d9682e",
      radiusFraction: 0.985,
      detail: "Melt-rich rock, tens of kilometres thick; extent uncertain",
    },
    {
      name: "Crust",
      description: "A crust of basaltic rock coated with sulphur and sulphur dioxide frost, pierced by more than 400 volcanoes and buried under fresh deposits at up to a centimetre a year.",
      color: "#e8c95c",
      radiusFraction: 1,
      detail: "Basalt and sulphur, 12 to 40 km thick; surface −130 °C to −160 °C away from hotspots",
    },
  ],
  timeline: [
    { year: "1610", title: "Discovery", detail: "Galileo Galilei identifies Io on 7 to 8 January as one of four moons circling Jupiter; Simon Marius later proposes the name." },
    { year: "1973–74", title: "Pioneer flybys", detail: "Pioneer 10 and 11 pass through the Jupiter system, measuring Io's high density and detecting its ionosphere." },
    { year: "1979", title: "Volcanoes discovered", detail: "Voyager 1 flies past on 5 March; on 9 March Linda Morabito spots a 300-km plume in a navigation image, the first active volcanism seen beyond Earth." },
    { year: "1995–2003", title: "Galileo at Jupiter", detail: "NASA's Galileo orbiter makes close Io flybys between 1999 and 2002, revealing the iron core, lava lakes, mountains and lava temperatures above 1,000 °C." },
    { year: "2007", title: "New Horizons", detail: "On its way to Pluto, New Horizons images the Tvashtar plume rising 330 km above Io's limb." },
    { year: "2011", title: "Magma ocean proposed", detail: "A reanalysis of Galileo magnetometer data suggests a global layer of molten rock beneath the crust." },
    { year: "2023–24", title: "Juno close flybys", detail: "Juno passes about 1,500 km above Io on 30 December 2023 and 3 February 2024, the closest approaches in over 20 years." },
    { year: "2024", title: "Magma ocean ruled out", detail: "Juno gravity data published in Nature in December show Io's tidal response is far too stiff for a shallow global magma ocean." },
    { year: "2025", title: "Record eruption reported", detail: "In January NASA reports a hotspot larger than Lake Superior seen by Juno on 27 December 2024, the most powerful volcanic event yet recorded on Io." },
    { year: "2026", title: "Subsurface heat measured", detail: "Juno's microwave radiometer results, published 22 July, show temperatures rising by more than 20 °C within metres of the surface everywhere sampled." },
  ],
  comparisons: [
    { label: "Diameter", value: 3643.2, earth: 12742, unit: "km" },
    { label: "Mass", value: 0.015, earth: 1, unit: "× Earth" },
    { label: "Surface gravity", value: 1.796, earth: 9.81, unit: "m/s²" },
    { label: "Rotation period", value: 42.46, earth: 23.93, unit: "hours" },
    { label: "Mean temperature", value: -143, earth: 15, unit: "°C" },
    { label: "Escape velocity", value: 2.56, earth: 11.19, unit: "km/s" },
    { label: "Surface pressure", value: 1e-8, earth: 1.013, unit: "bar" },
  ],
  moons: [],
  quiz: [
    {
      prompt: "What is the main source of the heat that drives Io's volcanoes?",
      options: ["Radioactive decay in its core", "Sunlight absorbed by its dark surface", "Tidal flexing caused by Jupiter's gravity and the resonance with Europa and Ganymede", "Heat left over from its formation"],
      answer: "Tidal flexing caused by Jupiter's gravity and the resonance with Europa and Ganymede",
      explanation: "Io's slightly elliptical orbit, maintained by the 4:2:1 Laplace resonance, means Jupiter's pull varies every orbit, flexing the moon and generating around a hundred trillion watts of frictional heat.",
    },
    {
      prompt: "Which spacecraft first discovered active volcanoes on Io, and when?",
      options: ["Galileo in 1996", "Voyager 1 in 1979", "Pioneer 10 in 1973", "Juno in 2023"],
      answer: "Voyager 1 in 1979",
      explanation: "Days after Voyager 1's flyby on 5 March 1979, engineer Linda Morabito noticed a huge plume on the moon's limb in a navigation image.",
    },
    {
      prompt: "Why does Io have no impact craters?",
      options: ["Its atmosphere burns up all meteoroids", "Jupiter's gravity deflects every impactor", "Volcanic deposits bury the surface faster than craters can accumulate", "Its surface is liquid"],
      answer: "Volcanic deposits bury the surface faster than craters can accumulate",
      explanation: "Io is resurfaced at perhaps a centimetre a year by lava and plume fallout, so any crater is erased within a geological instant.",
    },
    {
      prompt: "What did Juno's gravity measurements, published in December 2024, reveal about Io's interior?",
      options: ["It has a global ocean of liquid water", "It does not have a shallow global magma ocean", "Its core is made of ice", "It is hollow"],
      answer: "It does not have a shallow global magma ocean",
      explanation: "Io's tidal deformation is far smaller than a global magma ocean would allow, pointing instead to a mostly solid, partially molten mantle.",
    },
    {
      prompt: "In the Laplace resonance, how many orbits does Io complete for each orbit of Ganymede?",
      options: ["Two", "Three", "Four", "Eight"],
      answer: "Four",
      explanation: "Io, Europa and Ganymede orbit in a 4:2:1 ratio: Io goes round four times and Europa twice for every single orbit of Ganymede.",
    },
  ],
  glossary: [
    { term: "Tidal heating", definition: "Heat generated inside a moon by friction as its planet's varying gravitational pull flexes it during an elliptical orbit. Io is the most extreme example known." },
    { term: "Laplace resonance", definition: "The 4:2:1 orbital lock between Io, Europa and Ganymede, which keeps their orbits slightly elliptical and drives tidal heating." },
    { term: "Patera", definition: "A broad, flat-floored volcanic depression, the typical form of Io's volcanoes. Loki Patera is about 200 km across." },
    { term: "Plume", definition: "An umbrella-shaped fountain of gas and dust erupted from a volcano; on Io plumes can reach 500 km into space." },
    { term: "Plasma torus", definition: "A doughnut-shaped cloud of charged sulphur and oxygen ions along Io's orbit, fed by about a tonne of material stripped from the moon every second." },
    { term: "Magma ocean", definition: "A global layer of molten rock. Once proposed for Io beneath its crust, it was ruled out by Juno's gravity data in 2024." },
    { term: "Microwave radiometer", definition: "An instrument that senses microwave emission from below a surface; Juno's measured Io's temperature down to tens of metres in 2026." },
    { term: "Galilean moons", definition: "Jupiter's four largest moons, Io, Europa, Ganymede and Callisto, discovered by Galileo in 1610." },
  ],
  sources: [
    { title: "NASA Science: Io", url: "https://science.nasa.gov/jupiter/moons/io/" },
    { title: "NSSDC Jovian Satellite Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/joviansatfact.html" },
    { title: "NASA JPL: Juno takes temperature of Jupiter's fiery moon Io (July 2026)", url: "https://www.jpl.nasa.gov/news/nasas-juno-takes-temperature-of-jupiters-fiery-moon-io/" },
    { title: "NASA JPL: Juno spots most powerful volcanic activity on Io to date (January 2025)", url: "https://www.jpl.nasa.gov/news/nasa-juno-mission-spots-most-powerful-volcanic-activity-on-io-to-date/" },
    { title: "Nature: Io's tidal response precludes a shallow magma ocean (Park et al., 2024)", url: "https://www.nature.com/articles/s41586-024-08442-5" },
    { title: "NASA JPL: Juno to get close look at Io on 30 December 2023", url: "https://www.jpl.nasa.gov/news/nasas-juno-to-get-close-look-at-jupiters-volcanic-moon-io-on-dec-30/" },
  ],
};
