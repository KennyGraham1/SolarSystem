import type { PlanetContent } from "./types";

export const europa: PlanetContent = {
  id: "europa",
  tagline: "A cracked ice shell over a salty ocean: the most promising place to look for life beyond Earth.",
  intro: [
    "Europa is the smallest of Jupiter's four big Galilean moons and the sixth-closest moon to the planet, circling it every 3.55 days at a distance of about 671,000 km. With a radius of 1,561 km it is slightly smaller than our own Moon, but it could hardly look more different. Its surface is a bright shell of water ice, one of the smoothest and youngest in the solar system, crossed by thousands of reddish-brown cracks and ridges and almost free of large craters.",
    "The reason for that youthful face lies beneath it. Measurements by NASA's Galileo spacecraft in the late 1990s showed that Europa's magnetic field is induced by Jupiter's, which requires an electrically conducting layer near the surface: a global ocean of salty liquid water. That ocean is thought to be 60 to 150 km deep and to hold roughly twice as much water as all of Earth's oceans combined, kept liquid not by sunlight, which is 27 times weaker here than at Earth, but by the tidal squeezing Europa receives on every orbit around Jupiter.",
    "Liquid water, a rocky seafloor, chemical energy and billions of years of stability are the ingredients astrobiologists look for, and Europa appears to have them all. Two spacecraft are now on their way to find out: NASA's Europa Clipper, launched on 14 October 2024 and due to arrive at Jupiter in April 2030, and ESA's Juice, which will reach Jupiter in July 2031. Neither can detect life directly, but together they will map the ice, probe the ocean and tell us whether Europa is truly habitable.",
  ],
  sections: [
    {
      title: "Structure and interior: an ocean under the ice",
      paragraphs: [
        "Europa is a layered world much like a rocky planet with an ocean on top. Galileo's gravity measurements showed that it is dense enough to have a metallic core, estimated at 40 to 50% of the moon's radius, surrounded by a rocky mantle. Above the rock lies the water layer, roughly 80 to 170 km thick in total, which is split into a liquid ocean and a frozen shell. NASA's working estimate is an ice shell 15 to 25 km thick floating on an ocean 60 to 150 km deep; the true shell thickness is one of the key numbers Europa Clipper's ice-penetrating radar is designed to measure.",
        "The clinching evidence for the ocean came from Galileo's magnetometer. Jupiter's tilted magnetic field sweeps over Europa in a rhythm that changes every 11 hours, and a salty ocean responds like a giant conductor, generating its own induced field. On a flyby in January 2000, specially timed to catch Jupiter's field at a different angle, the induced field flipped exactly as an ocean model predicted, and a permanently magnetised interior was ruled out.",
        "What keeps the ocean liquid so far from the Sun is tidal heating. Europa's orbit is slightly elliptical, held that way by an orbital resonance with Io and Ganymede, so Jupiter's gravitational pull varies as the moon moves closer and farther away. The ice and rock flex by tens of metres on every 3.55-day orbit, and the friction generates heat. The same flexing may drive hydrothermal activity on the seafloor, where water reacting with hot rock would release the chemical energy that ecosystems around Earth's deep-sea vents live on.",
      ],
      highlight: "Europa's ocean, 60 to 150 km deep, probably holds twice as much water as all of Earth's oceans, under an ice shell perhaps only 15 to 25 km thick.",
    },
    {
      title: "Surface and geology: lineae, chaos and possible plumes",
      paragraphs: [
        "Europa's surface is criss-crossed by lineae, long dark streaks and double ridges that can run for over 1,000 km, with the largest bands more than 20 km wide. They appear to be cracks in the shell that have been pulled apart, filled with slush from below and refrozen, sometimes over and over, building ridges a few hundred metres high. Their curved, scalloped patterns, called cycloids, trace the daily rise and fall of the tidal stresses that open them. The reddish-brown colour along the cracks is probably salts and sulphur compounds brought up from the ocean and altered by Jupiter's radiation.",
        "Elsewhere the surface has been broken into chaos terrain: jumbled regions such as Conamara Chaos, Thera Macula and Tara Regio where blocks of the old icy crust, some kilometres across, have been rafted apart, tilted and refrozen in a matrix of smoother ice, like ice floes in a thawing sea. Chaos regions may form above lakes of meltwater trapped within the shell, or where warm ice rises from below. In 2023 the James Webb Space Telescope found carbon dioxide concentrated in Tara Regio, which suggests that carbon, an essential element for life, is coming up from the ocean.",
        "Crater counts suggest the surface is only about 20 to 180 million years old, meaning it is constantly being renewed. Whether Europa is venting material into space today is still uncertain. The Hubble Space Telescope saw hints of water-vapour plumes near the south pole in December 2012 and again in 2014 and 2016, and a re-analysis of magnetic data from a 1997 Galileo flyby found a signature consistent with the spacecraft passing through a plume. But the detections have never repeated on demand, and Webb found no plume activity in 2022. Europa Clipper will search for plumes on every pass.",
      ],
      highlight: "Europa's icy surface is only about 20 to 180 million years old: it is continually being cracked, flooded and refrozen from below.",
    },
    {
      title: "A tenuous oxygen atmosphere and a deadly radiation belt",
      paragraphs: [
        "Europa has an atmosphere, but an extraordinarily thin one, first detected by Hubble in 1995 and made mostly of molecular oxygen. Its surface pressure is around 0.1 micropascal, about a trillionth of Earth's. This oxygen is not produced by life: charged particles trapped in Jupiter's magnetic field slam into the ice, splitting water molecules. The lighter hydrogen escapes to space and the heavier oxygen lingers close to the surface.",
        "In 2024, analysis of data from NASA's Juno spacecraft, which flew within 352 km of Europa on 29 September 2022, measured this process directly. Juno's particle detector found that Europa's surface generates about 12 kg of oxygen every second, far less than some earlier estimates of over 1,000 kg per second. Some of that oxygen may work its way down through the ice into the ocean, where it could serve as a chemical fuel for any life below, so knowing the rate matters.",
        "The same radiation that makes the oxygen makes Europa's surface one of the most hostile places in the solar system. The dose on the surface, highest on the trailing hemisphere that faces into Jupiter's co-rotating magnetosphere, is about 5 sieverts per day, enough to kill an unprotected human within a day. It is why Europa Clipper orbits Jupiter rather than Europa, dipping in for brief flybys and then retreating, and why its electronics are sealed inside a vault of aluminium and titanium.",
      ],
    },
    {
      title: "Habitability and the search for life",
      paragraphs: [
        "Europa is not a place to look for aliens on the surface; it is far too cold, at around −160 °C at the equator and −220 °C at the poles, and bathed in lethal radiation. The interest lies in the ocean, which has been liquid for perhaps billions of years, sits directly on a rocky floor and may be fed with oxidants from the surface and with hydrogen, sulphur and minerals from the seafloor. On Earth, that combination sustains entire ecosystems in complete darkness.",
        "The open questions are whether the seafloor is warm and chemically active, how salty the water is and how thick the ice is, and whether anything moves between the ocean and the surface. If the ocean's chemistry does reach the surface, whether through cracks, chaos terrain or plumes, then a spacecraft flying past could sample it without ever drilling through the ice. The reddish material in the cracks and the carbon dioxide in Tara Regio are the first hints that this is happening.",
        "Europa Clipper's stated goal is deliberately modest: to determine whether Europa has conditions suitable for life, not to find life itself. A follow-on lander to search for biosignatures on the surface has been studied but is not currently funded.",
      ],
      highlight: "Europa has the three things life needs: liquid water, chemical energy and time. What we do not yet know is whether they meet.",
    },
    {
      title: "Exploration and missions",
      paragraphs: [
        "Pioneer 10 and 11 caught only distant glimpses of Europa in the 1970s. The Voyager spacecraft passed through the Jupiter system in 1979 and returned the first images good enough to show a cracked, nearly craterless ice world, prompting the first serious suggestions of a hidden ocean. NASA's Galileo orbiter arrived in December 1995 and made about a dozen close flybys of Europa before its mission ended in 2003, photographing the chaos terrain and gathering the gravity and magnetic data that made the ocean's existence almost certain. Juno's single close pass in September 2022 added the first new close-up images in more than 20 years.",
        "NASA's Europa Clipper, the largest spacecraft NASA has ever built for a planetary mission, launched on a Falcon Heavy on 14 October 2024. It swung past Mars on 1 March 2025, testing its radar and thermal camera on the way, and will return to Earth for a gravity assist on 3 December 2026 before the long cruise to Jupiter, arriving in April 2030. Once there it will make 49 close flybys of Europa, some as low as 25 km, using nine instruments to measure the ice shell's thickness, map the surface, sample the thin atmosphere and any plumes, and characterise the ocean by its induced magnetic field.",
        "ESA's Juice (Jupiter Icy Moons Explorer) launched on 14 April 2023 and is taking an even longer road, with flybys of the Earth-Moon system in August 2024, Venus in August 2025, and two more of Earth in September 2026 and January 2029. It arrives at Jupiter in July 2031 and, though its main target is Ganymede, it will make two flybys of Europa in July 2032. The two missions have been planned to complement each other, and their teams will share data.",
      ],
      highlight: "Europa Clipper arrives at Jupiter in April 2030 and will make 49 flybys of Europa; ESA's Juice follows in July 2031.",
    },
    {
      title: "Name, myth and discovery",
      paragraphs: [
        "Europa was discovered on 8 January 1610 by Galileo Galilei, who had turned his new telescope on Jupiter the night before and seen what he took to be three small stars in a line; on the 8th he realised that one of them had been two moons close together, and that all of them were moving with the planet. The German astronomer Simon Marius claimed to have seen the moons independently at about the same time, and it was Marius, at the suggestion of Johannes Kepler, who proposed naming them after lovers of Zeus, the Greek Jupiter.",
        "In Greek mythology Europa was a Phoenician princess whom Zeus, disguised as a white bull, carried across the sea to Crete; the continent of Europe takes its name from her. Galileo himself called the moons the Medicean Stars after his patrons and referred to them by number, and for centuries astronomers simply called Europa 'Jupiter II'. The mythological names only came into general use in the 20th century.",
        "The discovery of the Galilean moons was one of the turning points of science. Four bodies clearly orbiting something other than Earth showed that not everything circled our planet, and gave powerful support to the Copernican model of the solar system.",
      ],
    },
    {
      title: "What you'd experience there",
      paragraphs: [
        "Standing on Europa you would weigh about 13% of your Earth weight, a little less than on the Moon, and the ice underfoot would be as hard as rock at −160 °C or colder. Because the moon is tidally locked, Jupiter would hang motionless in the sky from the hemisphere that faces it, an enormous banded globe about 12 degrees across, roughly 24 times the width of the full Moon as seen from Earth. The Sun would be a small, sharp disc giving about one twenty-seventh of the light it does at Earth, and a day, from one sunrise to the next, would last 3.55 Earth days.",
        "With almost no atmosphere the sky would be black even in daylight, and there is no weather, no sound and no wind. What you could not see would kill you: without heavy shielding, the radiation streaming down from Jupiter's magnetosphere would deliver a lethal dose in about a day on the trailing hemisphere. Any real expedition would need to burrow into the ice quickly, which conveniently is also where the science is.",
        "Beneath a few kilometres of ice, the temperature rises towards the melting point and the ocean begins. If you could reach it, you would find yourself floating in dark, salty water tens of kilometres deep, perhaps warmed here and there by seafloor vents, the kind of place where the first life on Earth may have begun.",
      ],
      highlight: "From Europa's surface, Jupiter would fill 12 degrees of sky and never move, while radiation would make an unshielded day outside your last.",
    },
  ],
  layers: [
    {
      name: "Metallic core",
      description: "An iron-rich core inferred from Galileo's gravity measurements. Its size is uncertain, and Europa has no magnetic field of its own.",
      color: "#c9b48a",
      radiusFraction: 0.45,
      detail: "Iron and iron sulphide, roughly 40 to 50% of the radius (about 600 to 800 km)",
    },
    {
      name: "Rocky mantle",
      description: "Silicate rock, possibly with hydrothermal vents where it meets the ocean. Water-rock reactions here could supply chemical energy for life.",
      color: "#8f6a4a",
      radiusFraction: 0.92,
      detail: "Silicate rock, about 700 km thick",
    },
    {
      name: "Salty ocean",
      description: "A global ocean of liquid salt water kept warm by tidal heating; it holds perhaps twice as much water as Earth's oceans.",
      color: "#2f6fb5",
      radiusFraction: 0.987,
      detail: "Liquid water, 60 to 150 km deep, near 0 °C",
    },
    {
      name: "Ice shell",
      description: "A shell of water ice, cracked and refrozen many times; its thickness is a key measurement for Europa Clipper.",
      color: "#e8f0f7",
      radiusFraction: 1,
      detail: "Water ice, 15 to 25 km thick; surface −160 °C to −220 °C",
    },
  ],
  timeline: [
    { year: "1610", title: "Discovery", detail: "Galileo Galilei identifies Europa on 8 January as one of four moons circling Jupiter; Simon Marius later proposes its name." },
    { year: "1979", title: "Voyager flybys", detail: "Voyager 1 and 2 return the first detailed images: a bright, cracked surface with almost no craters, hinting at a hidden ocean." },
    { year: "1995", title: "Oxygen atmosphere found", detail: "The Hubble Space Telescope detects an extremely thin atmosphere of molecular oxygen." },
    { year: "1995–2003", title: "Galileo at Jupiter", detail: "NASA's Galileo orbiter makes about a dozen close flybys, imaging chaos terrain and measuring an induced magnetic field that reveals a salty ocean." },
    { year: "2000", title: "The ocean confirmed", detail: "A flyby on 3 January, timed to catch Jupiter's field at a new angle, shows Europa's magnetic response flips as only a conducting ocean could." },
    { year: "2012", title: "Possible plumes", detail: "Hubble observations in December suggest water-vapour plumes near the south pole; later detections remain sporadic and debated." },
    { year: "2022", title: "Juno flyby", detail: "On 29 September NASA's Juno passes 352 km above the surface, the closest look since Galileo, and later measures oxygen production of about 12 kg per second." },
    { year: "2023", title: "Webb finds carbon", detail: "The James Webb Space Telescope finds carbon dioxide concentrated in Tara Regio, probably sourced from the ocean, but no active plumes." },
    { year: "2024", title: "Europa Clipper launches", detail: "NASA's largest planetary spacecraft lifts off on a Falcon Heavy on 14 October." },
    { year: "2025", title: "Mars gravity assist", detail: "Europa Clipper swings past Mars on 1 March, testing its radar and thermal imager on the Red Planet." },
    { year: "2026", title: "Earth gravity assist", detail: "Juice flies past Earth in late September; Europa Clipper follows on 3 December, gaining the final boost it needs to reach Jupiter." },
    { year: "2030–32", title: "Arrival at Jupiter", detail: "Europa Clipper enters orbit around Jupiter in April 2030 and begins 49 flybys of Europa; Juice arrives in July 2031 and makes two Europa flybys in July 2032." },
  ],
  comparisons: [
    { label: "Diameter", value: 3121.6, earth: 12742, unit: "km" },
    { label: "Mass", value: 0.008, earth: 1, unit: "× Earth" },
    { label: "Surface gravity", value: 1.31, earth: 9.81, unit: "m/s²" },
    { label: "Rotation period", value: 85.22, earth: 23.93, unit: "hours" },
    { label: "Mean temperature", value: -170, earth: 15, unit: "°C" },
    { label: "Escape velocity", value: 2.03, earth: 11.19, unit: "km/s" },
    { label: "Surface pressure", value: 1e-12, earth: 1.013, unit: "bar" },
  ],
  moons: [],
  quiz: [
    {
      prompt: "What lies beneath Europa's icy surface?",
      options: ["A global ocean of salty liquid water", "A thick layer of liquid methane", "Solid rock all the way down", "A hollow cavity of gas"],
      answer: "A global ocean of salty liquid water",
      explanation: "Galileo's magnetometer detected an induced magnetic field that can only be explained by a conducting layer of salty water, an ocean thought to be 60 to 150 km deep.",
    },
    {
      prompt: "What keeps Europa's ocean from freezing solid so far from the Sun?",
      options: ["Sunlight absorbed by the dark cracks", "Tidal heating from Jupiter's gravity flexing the moon", "Radioactive decay in the ice", "Heat from Jupiter's atmosphere"],
      answer: "Tidal heating from Jupiter's gravity flexing the moon",
      explanation: "Europa's slightly elliptical orbit means Jupiter's pull changes every 3.55 days, flexing the moon and generating heat through friction.",
    },
    {
      prompt: "Roughly how old is Europa's surface, based on crater counts?",
      options: ["About 4 billion years", "About 1 billion years", "About 20 to 180 million years", "Less than 1,000 years"],
      answer: "About 20 to 180 million years",
      explanation: "Europa has almost no large craters, so its surface must be continually renewed, most likely by ice cracking, flooding and refreezing from below.",
    },
    {
      prompt: "Why will Europa Clipper orbit Jupiter rather than Europa itself?",
      options: ["Europa's gravity is too weak to orbit", "To avoid the intense radiation around Europa by making brief flybys", "Jupiter is a more interesting target", "The spacecraft cannot slow down enough"],
      answer: "To avoid the intense radiation around Europa by making brief flybys",
      explanation: "Europa sits inside Jupiter's radiation belts, where the surface dose is about 5 sieverts a day. Clipper dips in for 49 flybys and retreats each time to protect its electronics.",
    },
    {
      prompt: "Who discovered Europa, and when?",
      options: ["Christiaan Huygens in 1655", "William Lassell in 1846", "Galileo Galilei in 1610", "Giovanni Cassini in 1684"],
      answer: "Galileo Galilei in 1610",
      explanation: "Galileo identified Europa on 8 January 1610 as one of four moons orbiting Jupiter, a discovery that helped overturn the Earth-centred model of the universe.",
    },
  ],
  glossary: [
    { term: "Galilean moons", definition: "Jupiter's four largest moons, Io, Europa, Ganymede and Callisto, discovered by Galileo in 1610." },
    { term: "Tidal heating", definition: "Heat generated inside a moon by friction as a planet's varying gravitational pull flexes it during an elliptical orbit." },
    { term: "Induced magnetic field", definition: "A magnetic field produced in a conducting layer, such as a salty ocean, in response to a changing external field. Its detection at Europa is the strongest evidence for the ocean." },
    { term: "Lineae", definition: "The long, dark cracks and double ridges that criss-cross Europa's surface, some over 1,000 km long." },
    { term: "Chaos terrain", definition: "Regions where the icy crust has broken into tilted blocks and refrozen, possibly above pockets of meltwater within the shell." },
    { term: "Plume", definition: "A jet of water vapour and ice particles erupting into space. Hints of plumes at Europa have been seen but not confirmed." },
    { term: "Orbital resonance", definition: "A gravitational lock between orbits: Io, Europa and Ganymede orbit in a 4:2:1 rhythm that keeps Europa's orbit slightly elliptical." },
    { term: "Flyby", definition: "A close pass by a spacecraft that does not enter orbit around its target. Europa Clipper will make 49 of them." },
  ],
  sources: [
    { title: "NASA Science: Europa", url: "https://science.nasa.gov/jupiter/moons/europa/" },
    { title: "NASA Science: Europa Clipper mission", url: "https://science.nasa.gov/mission/europa-clipper/" },
    { title: "NSSDC Jovian Satellite Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/joviansatfact.html" },
    { title: "NASA JPL: Galileo findings boost idea of other-worldly ocean (2000)", url: "https://www.jpl.nasa.gov/news/galileo-findings-boost-idea-of-other-worldly-ocean/" },
    { title: "NASA JPL: Juno measures oxygen production at Europa (2024)", url: "https://www.jpl.nasa.gov/news/nasas-juno-mission-measures-oxygen-production-at-europa/" },
    { title: "ESA: Juice (Jupiter Icy Moons Explorer)", url: "https://www.esa.int/Science_Exploration/Space_Science/Juice" },
  ],
};
