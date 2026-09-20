import type { PlanetContent } from "./types";

export const enceladus: PlanetContent = {
  id: "enceladus",
  tagline: "A tiny, brilliant-white moon that sprays its hidden ocean into space through cracks at its south pole.",
  intro: [
    "Enceladus is Saturn's sixth-largest moon, a ball of ice just 504 km across, small enough to fit inside the state of Arizona. It orbits Saturn every 32.9 hours at a distance of about 238,000 km, inside the planet's faint E ring, keeping one face permanently towards Saturn. Its surface is coated in fresh, clean water ice that reflects almost all of the sunlight that reaches it, making Enceladus the most reflective body in the solar system and, because so little sunlight is absorbed, one of the coldest, with a typical surface temperature around −200 °C.",
    "For most of the space age Enceladus was expected to be a frozen, dead world. Instead, in 2005 NASA's Cassini spacecraft found that the moon's south pole is warm, cracked by four long fractures nicknamed the tiger stripes, and venting more than a hundred jets of water vapour and ice grains into space. The jets merge into a plume that rises thousands of kilometres above the surface and feeds Saturn's E ring. Cassini flew through that plume repeatedly, tasting salt, silica, molecular hydrogen, phosphates and organic molecules that point to hydrothermal vents on the floor of a global ocean beneath the ice.",
    "That combination of liquid water, chemical energy and the building blocks of life has made Enceladus one of the top targets in the search for life beyond Earth. Both NASA and ESA are now studying missions that would return to sample the plume and land near the tiger stripes, although as of September 2026 neither has yet been built.",
  ],
  sections: [
    {
      title: "Structure and interior: a global ocean under thin ice",
      paragraphs: [
        "Enceladus has a mean density of 1.61 g/cm³, meaning it is a mix of rock and water ice rather than pure ice. The standard model of its interior, built from Cassini's gravity and rotation measurements, has a rocky core about 190 km in radius, which is thought to be porous and soaked with water, overlain by a global liquid-water ocean and then an outer shell of ice. Estimates of the ocean's thickness fall in the range of roughly 26 to 38 km depending on the model, and the ice shell above it averages about 20 to 25 km.",
        "The decisive evidence came from a wobble. Between 2005 and 2012 Cassini tracked hundreds of surface features across many flybys, and in 2015 a team led by Peter Thomas showed that Enceladus rocks back and forth as it orbits, a libration far too large for a moon whose ice was frozen to its core. The only explanation is that the shell floats free on a global ocean. Subsequent modelling found the shell is far from uniform: it is thickest near the equator and thins to only a few kilometres over the south pole, which is why the tiger stripes are there and nowhere else.",
        "Heat to keep the ocean liquid comes from tides. Enceladus is locked in a 2:1 orbital resonance with the larger moon Dione, completing two orbits for every one of Dione's. Dione's regular tugs keep Enceladus's orbit slightly eccentric, so Saturn's gravity flexes the moon and its ice a little differently at each point of the orbit, generating friction and heat. Cassini measured several gigawatts of heat escaping from the south polar terrain alone, with published estimates ranging from about 5 to 16 gigawatts, and models in which the porous core is kneaded and heated by tides can supply that much power over billions of years.",
      ],
      highlight: "Cassini's measurement of Enceladus's rocking motion in 2015 proved that its ice shell floats on a global ocean, thinnest at the south pole.",
    },
    {
      title: "The tiger stripes and the plume",
      paragraphs: [
        "The south polar region is crossed by four roughly parallel fractures, each about 130 km long, 2 km wide and 500 m deep, spaced about 35 km apart. Named Alexandria, Cairo, Baghdad and Damascus Sulci after cities of the ancient world, they are lined with fresh crystalline ice and are far warmer than their surroundings: Cassini's infrared spectrometer measured temperatures of up to about −116 °C along the stripes, compared with around −200 °C elsewhere. Baghdad and Damascus are the most active.",
        "More than 100 individual geysers have been mapped along the stripes. Water vapour and tiny ice grains rush out at up to around 400 m/s, well above Enceladus's escape velocity of 0.24 km/s, and together they eject roughly 200 kg of material every second. Most of the ice falls back to whiten the surface, but a fraction escapes to form Saturn's broad, tenuous E ring; Enceladus is the only moon known to build a planetary ring out of its own ocean. In 2023 the James Webb Space Telescope watched the plume stretch nearly 10,000 km from the moon, some 20 times its own diameter.",
        "The plume is not constant. Its strength rises and falls with the moon's position in its orbit, brightest when Enceladus is farthest from Saturn and the fractures are pulled open by tidal stress, a pattern that Cassini confirmed and that supports the idea of a direct connection from the ocean to the surface.",
      ],
      highlight: "About 200 kg of ocean water escapes Enceladus every second through more than 100 geysers, and some of it becomes Saturn's E ring.",
    },
    {
      title: "Surface, geology and a plume-fed exosphere",
      paragraphs: [
        "Enceladus has at least five distinct types of terrain, first recognised in Voyager 2's images from 1981. Parts of the northern hemisphere are old and heavily cratered, with craters up to about 35 km across, some of them softened and relaxed as the warm ice beneath slowly flowed. Elsewhere the surface is nearly crater-free and criss-crossed by ridges, grooves and fractures, showing that large areas were resurfaced in the geologically recent past.",
        "The south polar terrain is the youngest of all. Crater counts suggest it is less than a few million years old, and perhaps far younger, and it is bounded by a chain of ridges and Y-shaped fractures that mark where the thin, warm crust meets older ground. Fine ice grains falling back from the plume blanket the region in a layer of fresh snow, which is part of the reason the whole moon is so bright.",
        "Enceladus's geometric albedo is greater than 1, reflecting more light at full phase than a perfect white disc, and its Bond albedo, the fraction of all incoming sunlight reflected, is about 0.8. Almost no sunlight is absorbed, so the surface stays bitterly cold even though Enceladus receives about a hundredth of the sunlight that falls on Earth.",
        "Enceladus has no atmosphere in the everyday sense; its gravity is far too weak to hold one. What it has instead is a thin, uneven veil of gas fed by the geysers, first sensed by Cassini's magnetometer in February 2005 when Saturn's magnetic field was seen bending around the moon. By mass the plume gas is about 91% water vapour, with a few percent each of nitrogen, carbon dioxide and methane plus traces of ammonia, hydrogen cyanide, molecular hydrogen and heavier organic molecules. Most of it escapes to space or spreads into a doughnut-shaped cloud of neutral gas around Saturn, so the pressure at the surface away from the vents is effectively zero.",
      ],
    },
    {
      title: "Habitability: hot springs on the seafloor",
      paragraphs: [
        "Cassini's plume samples gradually assembled a case for a habitable ocean. In 2009 the dust analyser found sodium salts in E-ring grains, showing the water had been in contact with rock. In 2015 nanometre-sized grains of silica were traced to hot water, at least 90 °C, reacting with rock on the seafloor, the first evidence of hydrothermal activity beyond Earth. In 2017 the mass spectrometer measured molecular hydrogen in the plume, a chemical fuel that microbes on Earth use in similar vent systems.",
        "The list has kept growing since the mission ended. In 2023 a re-analysis of Cassini dust data revealed phosphates, supplying the phosphorus that life needs for DNA and cell membranes, and later that year hydrogen cyanide and other reactive organic compounds were identified in the plume gas. Enceladus therefore appears to have liquid water, the elements carbon, hydrogen, nitrogen, oxygen, phosphorus and sulphur, and a source of chemical energy, the three requirements usually listed for life.",
        "None of this means life exists there. Cassini's instruments were built in the 1990s to study Saturn's system, not to detect life, and the plume samples were tiny. The question is whether anything is using that energy, and answering it needs a spacecraft designed for the job.",
      ],
      highlight: "Salt, silica, hydrogen, phosphates and organic molecules in the plume make Enceladus's ocean one of the most promising habitats known beyond Earth.",
    },
    {
      title: "Exploration and missions",
      paragraphs: [
        "Voyager 1 passed Enceladus at a distance of about 200,000 km in November 1980 and Voyager 2 at about 87,000 km on 26 August 1981, revealing a puzzling mix of cratered and smooth terrain and hinting at recent activity. Cassini arrived at Saturn in 2004 and made 22 close flybys of Enceladus between 2005 and 2015. The flybys of 17 February, 9 March and 14 July 2005 found the disturbed magnetic field, the warm south pole and the escaping gas; the plume itself was imaged backlit by the Sun in November 2005. Cassini's closest pass, at just 25 km, came on 9 October 2008, and on 28 October 2015 it made its deepest dive through the plume, skimming 49 km above the south pole to sample the densest part of the spray. The final close flyby, on 19 December 2015 at about 5,000 km, measured the heat flowing from the tiger stripes before the spacecraft was deliberately plunged into Saturn in September 2017.",
        "In the United States, the 2023 to 2032 planetary science decadal survey ranked an Enceladus Orbilander as its second-priority flagship mission, after a Uranus orbiter. The concept, developed at the Johns Hopkins Applied Physics Laboratory, is a single spacecraft that would orbit Enceladus for about a year and a half, sampling the plume, then land near the south pole for two years of life-detection experiments, at an estimated cost of around 4.9 billion dollars. A revised JPL study in 2025 proposed a launch on a Falcon Heavy in November 2038. As of September 2026 it remains a concept; NASA has not started development.",
        "Europe is moving too. ESA selected a mission to the moons of Saturn, with Enceladus as the target, as the first large-class mission of its Voyage 2050 programme, known for now as L4. Following the ESA Council at ministerial level in Bremen in November 2025, which increased the science budget, the project is in a definition phase running from 2026 to about 2034, with adoption planned around 2034, launch around 2042, arrival at Saturn in the early 2050s and a landing at the south pole in the late 2050s. It would carry an orbiter and a lander to sample plume material both in flight and on the ground.",
      ],
      highlight: "Cassini made 22 close flybys of Enceladus, several of them through the plume; NASA's Orbilander and ESA's L4 are the concepts hoping to go back and land there.",
    },
    {
      title: "Name and discovery",
      paragraphs: [
        "Enceladus was discovered by William Herschel on 28 August 1789, during the first night he used his new 40-foot telescope, then the largest in the world. He may have glimpsed it two years earlier with a smaller telescope, but could not be sure of what he had seen. Because Saturn's moons were then simply numbered by distance, it was long known as Saturn II.",
        "The name was proposed in 1847 by Herschel's son John, who suggested calling Saturn's seven then-known moons after the Titans and Giants of Greek myth, the siblings and kin of Cronus, whom the Romans called Saturn. Enceladus was one of the Giants who fought the Olympian gods and was buried beneath Mount Etna in Sicily; the volcano's rumblings were said to be his breath, a curiously fitting name for a moon that turned out to erupt.",
        "Surface features on Enceladus are named after people and places from The Book of One Thousand and One Nights, which is why the tiger stripes carry the names of Alexandria, Cairo, Baghdad and Damascus.",
      ],
    },
    {
      title: "What you'd experience there",
      paragraphs: [
        "Standing on Enceladus you would weigh about one-eightieth of what you weigh on Earth: surface gravity is only 0.11 m/s². A gentle standing jump would carry you 40 m or more into the black sky and take well over a minute to come down, and a good throw could send a ball into orbit, since escape velocity is only about 240 m/s. There is no air to breathe or to carry sound, so a full pressure suit is essential, and the ground under your boots would be fresh, powdery ice at around −200 °C.",
        "Saturn dominates the view. From the near side it hangs motionless in the sky about 28 degrees across, more than 50 times the width of the full Moon from Earth, with the rings seen almost edge-on as a thin bright line because Enceladus orbits in the ring plane. The Sun is a dazzling but small disc, providing about one percent of the light it gives Earth, still hundreds of times brighter than a full moon at home.",
        "The place to go is the south pole. From the rim of Damascus Sulcus you would see curtains of ice crystals rising silently from the fracture, glittering in sunlight, falling back as the finest snow or climbing away for ever to join the E ring. Each day and night lasts 16.4 hours, half of the 32.9-hour orbit, and directly beneath your feet, through 20 km or less of ice, lies an ocean of salty, mineral-laden water.",
      ],
      highlight: "With gravity one-eightieth of Earth's, a good throw on Enceladus could put a ball into orbit, while curtains of ice rise from the tiger stripes.",
    },
  ],
  layers: [
    {
      name: "Porous rocky core",
      description: "A core of loosely packed, water-soaked rock whose tidal kneading is thought to heat the ocean and drive hydrothermal vents.",
      color: "#8a5a3c",
      radiusFraction: 0.75,
      detail: "Silicate rock, about 190 km in radius; hot water at 90 °C or more circulates within it",
    },
    {
      name: "Global ocean",
      description: "A salty liquid-water ocean in contact with the rocky seafloor, the source of the plume and the reason the moon librates as it orbits.",
      color: "#2f6fb5",
      radiusFraction: 0.9,
      detail: "Salty water, roughly 26 to 38 km deep depending on the model",
    },
    {
      name: "Ice shell",
      description: "An outer shell of water ice that averages 20 to 25 km thick but thins to only a few kilometres beneath the south polar tiger stripes.",
      color: "#e8f1f8",
      radiusFraction: 1,
      detail: "Water ice, about 20 to 25 km on average, 1 to 5 km at the south pole; surface about −200 °C",
    },
  ],
  timeline: [
    { year: "1789", title: "Discovery", detail: "William Herschel finds Enceladus on 28 August, on the first night of observing with his 40-foot telescope." },
    { year: "1847", title: "Named after a Giant", detail: "John Herschel proposes naming Saturn's moons after the Titans and Giants of Greek myth." },
    { year: "1981", title: "Voyager 2 flyby", detail: "Voyager 2 passes about 87,000 km away on 26 August and photographs a surprisingly varied surface of craters and smooth plains." },
    { year: "2005", title: "Cassini finds the plume", detail: "Flybys in February, March and July reveal a warm, cracked south pole venting water; the plume is imaged backlit in November." },
    { year: "2008", title: "Closest flyby", detail: "On 9 October Cassini skims just 25 km above the surface, its closest pass of the mission." },
    { year: "2009", title: "Salt in the spray", detail: "Sodium salts found in E-ring grains show the plume comes from water that has touched rock." },
    { year: "2014", title: "Gravity reveals a sea", detail: "Cassini gravity data show a large body of liquid water beneath the south pole." },
    { year: "2015", title: "Global ocean and hot springs", detail: "Enceladus's libration proves the ice shell floats on a global ocean; silica grains point to hydrothermal vents. On 28 October Cassini makes its deepest plume dive, 49 km up, and the last close flyby follows on 19 December." },
    { year: "2017", title: "Hydrogen fuel", detail: "Molecular hydrogen is reported in the plume in April, a possible energy source for life; Cassini ends its mission in Saturn's atmosphere on 15 September." },
    { year: "2022", title: "Orbilander recommended", detail: "The US planetary decadal survey ranks an Enceladus Orbilander as the second-priority flagship mission of the 2023 to 2032 decade." },
    { year: "2023", title: "Phosphorus and a giant plume", detail: "Phosphates are found in Cassini dust data in June, and JWST sees the plume extending nearly 10,000 km from the moon." },
    { year: "2025", title: "Europe commits to L4", detail: "ESA's November ministerial council funds the science programme that carries the L4 Enceladus orbiter and lander into its definition phase from 2026, aiming at launch around 2042." },
  ],
  comparisons: [
    { label: "Diameter", value: 504.2, earth: 12742, unit: "km" },
    { label: "Mass", value: 0.000018, earth: 1, unit: "× Earth" },
    { label: "Surface gravity", value: 0.113, earth: 9.81, unit: "m/s²" },
    { label: "Rotation period", value: 32.88, earth: 23.93, unit: "hours" },
    { label: "Mean temperature", value: -198, earth: 15, unit: "°C" },
    { label: "Escape velocity", value: 0.24, earth: 11.19, unit: "km/s" },
    { label: "Surface pressure (effectively none; plume gas only)", value: 1e-12, earth: 1.013, unit: "bar" },
  ],
  moons: [],
  quiz: [
    {
      prompt: "What did Cassini discover erupting from Enceladus's south pole?",
      options: ["Molten sulphur lava", "Jets of water vapour and ice grains", "Methane rain clouds", "Nitrogen frost geysers driven by sunlight"],
      answer: "Jets of water vapour and ice grains",
      explanation: "More than 100 geysers along the four tiger-stripe fractures eject about 200 kg of water vapour and ice per second, forming a plume that feeds Saturn's E ring.",
    },
    {
      prompt: "How do scientists know Enceladus's ice shell floats on a global ocean?",
      options: [
        "A submarine probe drilled through the ice",
        "Radar sounded the ocean floor",
        "Cassini measured the moon rocking back and forth by more than a solid moon could",
        "The E ring is visibly liquid",
      ],
      answer: "Cassini measured the moon rocking back and forth by more than a solid moon could",
      explanation: "In 2015 Cassini's tracking of surface features revealed a libration too large for a moon frozen to its core, proving the shell is decoupled from the rock by a global ocean.",
    },
    {
      prompt: "Which moon keeps Enceladus's orbit eccentric, driving the tidal heating?",
      options: ["Titan", "Dione", "Mimas", "Iapetus"],
      answer: "Dione",
      explanation: "Enceladus orbits Saturn twice for every orbit of Dione. This 2:1 resonance prevents its orbit from circularising, so Saturn's tides keep flexing and heating the moon.",
    },
    {
      prompt: "Which of these was NOT detected in Enceladus's plume?",
      options: ["Sodium salts", "Silica grains from hydrothermal vents", "Phosphates", "Liquid iron droplets"],
      answer: "Liquid iron droplets",
      explanation: "Cassini found salts, silica nanograins, molecular hydrogen, phosphates and organic molecules including hydrogen cyanide, but nothing like liquid iron.",
    },
    {
      prompt: "What is the status of missions to return to Enceladus as of 2026?",
      options: [
        "A lander is already on the surface",
        "NASA's Orbilander launched in 2024",
        "NASA's Orbilander and ESA's L4 are studies, with L4 in a definition phase aiming at a launch around 2042",
        "All plans were cancelled after Cassini",
      ],
      answer: "NASA's Orbilander and ESA's L4 are studies, with L4 in a definition phase aiming at a launch around 2042",
      explanation: "The Orbilander is the decadal survey's second-priority flagship concept but has not been started; ESA's L4 entered definition in 2026 with launch targeted around 2042 and a landing in the late 2050s.",
    },
  ],
  glossary: [
    { term: "Tiger stripes", definition: "Four parallel fractures, each about 130 km long, in Enceladus's south polar terrain: Alexandria, Cairo, Baghdad and Damascus Sulci. The geysers erupt from them." },
    { term: "Plume", definition: "The combined spray of water vapour and ice grains from the south polar geysers, which rises thousands of kilometres and supplies Saturn's E ring." },
    { term: "Libration", definition: "A small rocking of a moon's rotation as it orbits. Enceladus's libration is too large for a solid body, revealing its floating ice shell." },
    { term: "Orbital resonance", definition: "A repeating gravitational relationship between orbits. Enceladus completes exactly two orbits for each one of Dione, which keeps its orbit slightly eccentric." },
    { term: "Tidal heating", definition: "Heat generated by friction as a moon is flexed by its planet's gravity along an eccentric orbit. It keeps Enceladus's ocean liquid." },
    { term: "Hydrothermal vent", definition: "A place where hot, mineral-rich water emerges from the rocky seafloor. Silica grains in the plume show they exist on Enceladus's ocean floor." },
    { term: "E ring", definition: "Saturn's broad, faint outermost main ring, made of microscopic ice grains supplied by Enceladus's plume." },
    { term: "Orbilander", definition: "A proposed NASA flagship spacecraft that would orbit Enceladus, sample its plume, then land near the south pole to search for signs of life." },
  ],
  sources: [
    { title: "NASA Science: Enceladus", url: "https://science.nasa.gov/saturn/moons/enceladus/" },
    { title: "NSSDC Saturnian Satellite Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/saturniansatfact.html" },
    { title: "NASA Science: Cassini Enceladus flyby E-21, deepest dive through the plume", url: "https://science.nasa.gov/missions/cassini/enceladus-flyby-21-e-21-deepest-dive-through-the-plume/" },
    { title: "NASA JPL: Cassini completes final close Enceladus flyby", url: "https://www.jpl.nasa.gov/news/cassini-completes-final-close-enceladus-flyby/" },
    { title: "ESA Cosmos: L4 mission to Enceladus, timeline and status", url: "https://www.cosmos.esa.int/web/l4/timeline-and-status" },
    { title: "NASA: Enceladus Orbilander mission concept study (decadal survey)", url: "https://science.nasa.gov/wp-content/uploads/2023/11/enceladus-orbilander-short.pdf" },
  ],
};
