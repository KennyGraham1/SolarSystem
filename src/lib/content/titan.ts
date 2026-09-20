import type { PlanetContent } from "./types";

export const titan: PlanetContent = {
  id: "titan",
  tagline: "A moon with a thick orange atmosphere, methane rain and seas of liquid hydrocarbons.",
  intro: [
    "Titan is Saturn's largest moon and the second-largest moon in the solar system, after Jupiter's Ganymede. With a radius of 2,575 km it is bigger than the planet Mercury, though only about 40% as massive, and nearly 50% wider than Earth's Moon. It orbits Saturn every 15.9 days at a distance of about 1.22 million km, always keeping the same face towards the planet. What makes Titan unique among moons is its atmosphere: a dense blanket of nitrogen and methane, one and a half times the surface pressure of Earth's, wrapped in a thick orange haze that hides the surface completely from ordinary cameras.",
    "Beneath that haze is a landscape that is strangely Earth-like. Titan is the only world besides Earth known to have liquid standing on its surface, but at −179 °C the liquid is not water. Methane and ethane fill lakes and seas around the north pole, fall as rain, carve river channels and evaporate back into clouds, in a full cycle that mirrors Earth's water cycle. Water, meanwhile, is frozen so hard that it plays the role of bedrock, and vast fields of dunes made of organic sand stretch around the equator.",
    "Titan was explored in depth by the NASA-ESA Cassini-Huygens mission, which made 127 targeted flybys between 2004 and 2017 and, on 14 January 2005, landed the Huygens probe on its surface, still the most distant landing ever made. NASA's next mission, the Dragonfly rotorcraft, is being assembled for launch in July 2028 and will fly from site to site across Titan's dunes from late 2034, studying the prebiotic chemistry that makes this moon so intriguing.",
  ],
  sections: [
    {
      title: "Structure and interior",
      paragraphs: [
        "Titan's mean density of 1.88 g/cm³ shows that it is roughly half rock and half water ice by mass. NASA's model of its interior has a core of water-bearing silicate rock about 4,000 km in diameter, surrounded by layers of ice and, crucially, a layer of salty liquid water. Cassini's repeated gravity measurements revealed that Titan flexes far more under Saturn's tides than a solid moon would, which requires a global subsurface ocean decoupling the crust from the interior.",
        "That ocean is thought to lie 55 to 80 km below the surface, under a shell of ordinary water ice, and may be a few hundred kilometres deep, though its thickness, salinity and composition remain poorly constrained. Ammonia dissolved in the water would act as antifreeze and help explain how it stays liquid. Beneath the ocean, the enormous pressure may turn water into dense high-pressure forms of ice sitting on top of the rocky core, though whether this layer exists depends on how warm the ocean is.",
        "Because Titan's atmosphere is rich in methane, which sunlight destroys within tens of millions of years, something must be replenishing it. One possibility is that methane is stored in the crust as clathrates, ice cages that trap gas, and released by cryovolcanoes such as the candidate Doom Mons, a 1.45-km-high mountain beside a deep pit, Sotra Patera. Another is that Titan's methane is a temporary phase that will eventually run out.",
      ],
      highlight: "Cassini's gravity measurements showed Titan flexing under Saturn's tides in a way only a global subsurface ocean can explain.",
    },
    {
      title: "The atmosphere: nitrogen, methane and orange haze",
      paragraphs: [
        "Titan's atmosphere is about 95% nitrogen and 5% methane near the surface, with small amounts of hydrogen and a rich cocktail of more complex carbon compounds. It is far more massive than Earth's: the surface pressure is 1.45 bar and, because Titan's gravity is so weak, the atmosphere extends hundreds of kilometres into space, roughly ten times higher than ours. Titan is the only moon in the solar system with a substantial atmosphere, and the only world besides Earth with a thick atmosphere dominated by nitrogen.",
        "High in the atmosphere, ultraviolet sunlight and charged particles from Saturn's magnetosphere break apart nitrogen and methane. The fragments recombine into ever larger organic molecules, ultimately forming the smog of tiny particles known as tholins that gives Titan its opaque orange colour and slowly rains down onto the surface. The haze also acts as an anti-greenhouse layer, absorbing sunlight before it reaches the ground, so the surface receives only about a tenth of one percent of the sunlight that Earth does.",
        "Below the haze there is weather. Methane condenses into clouds and falls as rain, mostly in rare but heavy storms that models suggest may strike a given region only once in decades, clustered around the equinoxes. Titan's seasons follow Saturn's 29.5-year orbit, each lasting more than seven Earth years, and Cassini watched the clouds and lakes shift from the southern to the northern hemisphere as the seasons turned.",
      ],
      highlight: "Titan's surface pressure of 1.45 bar is higher than Earth's, yet its air is a chemistry set of nitrogen, methane and organic smog.",
    },
    {
      title: "Surface: dunes, rivers and hydrocarbon seas",
      paragraphs: [
        "Cassini's radar and infrared cameras, which could see through the haze, revealed three great seas of liquid methane and ethane clustered near Titan's north pole. The largest, Kraken Mare, covers roughly 400,000 to 500,000 km², larger than the Caspian Sea, and is at least 100 m and probably more than 300 m deep in its centre. Ligeia Mare, about 126,000 km² with a shoreline over 2,000 km long, is so clear that Cassini's radar sounded the seabed 170 m down, showing the liquid is nearly pure methane. Punga Mare, the third and northernmost sea, is about 110 m deep along the radar track. Hundreds of smaller lakes dot the north polar region, while the south has far fewer, the largest being Ontario Lacus.",
        "Around the equator, where methane rain is rare, the surface is a desert. Vast sand seas such as Belet, Shangri-La, Fensal and Aztlan are covered in long, parallel dunes up to 100 to 150 m high and hundreds of kilometres long, shaped by the wind like the dunes of Namibia. The sand is not silicate but grains of organic material, fallen from the haze and clumped together. Between the dune fields, river channels and dry lakebeds show that liquid has flowed here in the past, and the Huygens landing site was strewn with rounded pebbles of water ice, worn smooth by flowing methane.",
        "Titan's surface is young and lightly cratered, with only a few dozen certain impact craters, including the 80-km Selk Crater that Dragonfly will visit. Erosion, dunes and possibly cryovolcanism, the eruption of water-ammonia slush instead of molten rock, keep resurfacing it. Water ice is the bedrock, mountains are made of ice, and features such as Doom Mons and the deep pit Sotra Patera are the best candidates for ice volcanoes.",
      ],
      highlight: "Kraken Mare, a sea of liquid methane larger than the Caspian Sea, is the biggest body of surface liquid known beyond Earth.",
    },
    {
      title: "Habitability and prebiotic chemistry",
      paragraphs: [
        "Titan's surface is far too cold for water-based life as we know it, but it is one of the richest natural laboratories for prebiotic chemistry in the solar system. Sunlight and radiation are continuously turning nitrogen and methane into more complex organic molecules, which settle onto a surface of water ice. Where impacts or cryovolcanoes have melted that ice, as they probably did at Selk Crater, liquid water and organic compounds would have mixed for thousands of years, exactly the kind of setting in which the building blocks of life could form.",
        "The subsurface ocean is a second possibility. It is liquid water, possibly in contact with rock, and cut off from the surface by tens of kilometres of ice, much like the oceans of Europa and Enceladus. Whether organic material from the surface can reach it, and whether the ocean floor provides any chemical energy, is unknown.",
        "More speculatively, some scientists have asked whether life of an entirely different kind could use liquid methane as a solvent instead of water. Nothing like it has ever been found, and there are good reasons to doubt it, but Titan is the one place where the question could actually be tested.",
      ],
      highlight: "Titan is the best place in the solar system to watch the chemistry that precedes life happen on a planetary scale.",
    },
    {
      title: "Exploration and missions",
      paragraphs: [
        "In 1944 Gerard Kuiper detected methane in Titan's spectrum, making it the first moon known to have an atmosphere. Pioneer 11 passed by in 1979, and on 12 November 1980 Voyager 1 passed about 6,500 km from Titan, revealing that the atmosphere is mostly nitrogen, measuring its pressure and temperature, and finding that the haze was completely opaque; the surface remained a mystery for another 24 years.",
        "The Cassini-Huygens mission, a partnership between NASA, ESA and the Italian Space Agency, was launched on 15 October 1997 and entered orbit around Saturn on 1 July 2004. On 25 December 2004 Cassini released ESA's Huygens probe, which entered Titan's atmosphere on 14 January 2005, descended by parachute for 2 hours 27 minutes, and touched down on a damp plain of ice pebbles near the region called Adiri, transmitting for another 72 minutes from the surface. Cassini went on to make 127 targeted flybys of Titan, mapping the seas and dunes with radar, sounding the depth of Ligeia Mare, watching the seasons change and measuring the tidal flexing that revealed the hidden ocean. Its final Titan pass on 11 September 2017 nudged it into Saturn's atmosphere, where it burned up on 15 September.",
        "NASA's Dragonfly, a car-sized nuclear-powered rotorcraft with eight rotors, was selected in June 2019 and confirmed in April 2024 at a cost of 3.35 billion dollars. It is now being assembled at the Johns Hopkins Applied Physics Laboratory: full integration began in early 2026, the fuselage was delivered on 29 June 2026, and its wiring harness was installed in July. Dragonfly is scheduled to launch in July 2028 and arrive at Titan in late 2034, landing in Ahmakiq Undae, a dune region about 810 km across south of Selk Crater that received its official name in September 2026. Over a 3.3-year primary mission it will hop between dozens of sites, covering more ground than any rover, to sample the organic sands and the water-ice deposits around the crater.",
      ],
      highlight: "Huygens' landing on 14 January 2005 remains the most distant touchdown ever made; Dragonfly will follow in late 2034.",
    },
    {
      title: "Name, myth and discovery",
      paragraphs: [
        "Titan was discovered on 25 March 1655 by the Dutch astronomer Christiaan Huygens, using a telescope he had built with his brother, and was the first moon of Saturn to be found. Huygens simply called it Saturn's moon (Saturni Luna); when Giovanni Cassini found four more moons in the following decades, astronomers fell back on numbers, and Titan was for a long time known as Saturn VI.",
        "The name Titan was proposed in 1847 by John Herschel, son of the discoverer of Uranus, in his account of observations made at the Cape of Good Hope. He suggested naming Saturn's seven then-known moons after the Titans, the brothers and sisters of Cronus, the Greek equivalent of Saturn, who ruled the world before the Olympian gods. As the largest of the family, this moon took the family name.",
        "Both halves of the Cassini-Huygens mission honour these pioneers: Cassini for the astronomer who discovered four of Saturn's moons and the main gap in its rings, and Huygens for the discoverer of Titan, who also worked out the true nature of the rings themselves.",
      ],
    },
    {
      title: "What you'd experience there",
      paragraphs: [
        "Titan is the one world beyond Earth where you could walk outside without a pressure suit. The air presses down at 1.45 times Earth's surface pressure, so you would need only warm clothing and a supply of oxygen; the nitrogen atmosphere is not toxic, and the methane is too dilute to burn. Warm clothing would have to be very warm indeed, because the temperature is a steady −179 °C, cold enough that exposed skin would freeze in moments and the thick air would carry the cold away efficiently.",
        "Gravity is only 14% of Earth's, a little less than the Moon's, and combined with the dense air this makes Titan the easiest place in the solar system to fly. A person with wings strapped to their arms could probably stay aloft by flapping, which is exactly why NASA chose a rotorcraft to explore it. The light is dim, a permanent orange dusk about a thousand times fainter than a sunny day on Earth, and the sky is a featureless haze; Saturn, though it would span more than five degrees of sky, would be hidden from view.",
        "The ground would be a mix of hard water-ice bedrock, dunes of dark organic sand, and, near the poles, the shores of seas whose liquid is lighter than water and roughly as fluid as it. Methane drizzle might fall, and once in a lifetime a violent rainstorm could flood the channels. A day lasts almost 16 Earth days, and each season more than seven Earth years.",
      ],
      highlight: "On Titan you could walk outside with only oxygen and warm clothes, and with strap-on wings you could fly.",
    },
  ],
  layers: [
    {
      name: "Rocky core",
      description: "A core of water-bearing silicate rock, warm enough at its edge to drive slow convection in the ice above.",
      color: "#8a5a3c",
      radiusFraction: 0.78,
      detail: "Hydrated silicate rock, about 4,000 km in diameter",
    },
    {
      name: "High-pressure ice",
      description: "Dense forms of water ice that may exist under the crushing weight of the ocean, depending on how warm the ocean is.",
      color: "#9fb8d6",
      radiusFraction: 0.87,
      detail: "High-pressure ice, up to about 230 km thick (may be absent)",
    },
    {
      name: "Water-ammonia ocean",
      description: "A global ocean of salty liquid water, with dissolved ammonia acting as antifreeze, revealed by Cassini's tidal measurements.",
      color: "#2f6fb5",
      radiusFraction: 0.97,
      detail: "Liquid water and ammonia, perhaps a few hundred km deep",
    },
    {
      name: "Ice crust",
      description: "An outer shell of ordinary water ice topped by organic sand, hydrocarbon seas and the thick atmosphere.",
      color: "#e0c98f",
      radiusFraction: 1,
      detail: "Water ice, roughly 55 to 80 km to the ocean; surface −179 °C",
    },
  ],
  timeline: [
    { year: "1655", title: "Discovery", detail: "Christiaan Huygens spots Titan on 25 March, the first moon of Saturn to be found." },
    { year: "1847", title: "Named after the Titans", detail: "John Herschel proposes naming Saturn's moons after the Titans of Greek myth." },
    { year: "1944", title: "An atmosphere", detail: "Gerard Kuiper detects methane in Titan's spectrum, making it the first moon known to have an atmosphere." },
    { year: "1980", title: "Voyager 1 flyby", detail: "Voyager 1 finds a nitrogen-dominated atmosphere thicker than Earth's, but its cameras cannot see through the haze." },
    { year: "1997", title: "Cassini-Huygens launches", detail: "The joint NASA-ESA-ASI mission lifts off on 15 October for a seven-year journey to Saturn." },
    { year: "2004", title: "Cassini arrives", detail: "Cassini enters orbit around Saturn on 1 July and releases the Huygens probe on 25 December." },
    { year: "2005", title: "Huygens lands", detail: "On 14 January Huygens parachutes through the atmosphere for 2 hours 27 minutes and transmits from the surface for 72 minutes, the most distant landing ever made." },
    { year: "2006–07", title: "Lakes and seas found", detail: "Cassini's radar reveals hundreds of lakes and then the great seas of methane and ethane near the north pole." },
    { year: "2012", title: "A hidden ocean", detail: "Cassini's gravity measurements show Titan flexing under Saturn's tides, evidence of a global subsurface ocean." },
    { year: "2017", title: "Grand Finale", detail: "After 127 targeted Titan flybys, Cassini's last pass on 11 September sends it into Saturn's atmosphere on 15 September." },
    { year: "2019", title: "Dragonfly selected", detail: "NASA chooses the Dragonfly rotorcraft as its fourth New Frontiers mission; it is confirmed for development in April 2024." },
    { year: "2026", title: "Dragonfly takes shape", detail: "Assembly begins at APL, the fuselage is delivered in June, and in September the landing area is named Ahmakiq Undae, ahead of a July 2028 launch and arrival in late 2034." },
  ],
  comparisons: [
    { label: "Diameter", value: 5149.4, earth: 12742, unit: "km" },
    { label: "Mass", value: 0.0225, earth: 1, unit: "× Earth" },
    { label: "Surface gravity", value: 1.35, earth: 9.81, unit: "m/s²" },
    { label: "Rotation period", value: 382.68, earth: 23.93, unit: "hours" },
    { label: "Mean temperature", value: -179, earth: 15, unit: "°C" },
    { label: "Escape velocity", value: 2.64, earth: 11.19, unit: "km/s" },
    { label: "Surface pressure", value: 1.45, earth: 1.013, unit: "bar" },
  ],
  moons: [],
  quiz: [
    {
      prompt: "What fills Titan's lakes and seas?",
      options: ["Liquid water", "Liquid methane and ethane", "Liquid nitrogen", "Molten sulphur"],
      answer: "Liquid methane and ethane",
      explanation: "At −179 °C water is frozen solid, but methane and ethane are liquid. They fall as rain, flow in rivers and collect in seas such as Kraken Mare.",
    },
    {
      prompt: "Which of these is true of Titan's atmosphere?",
      options: [
        "It is thinner than Mars's",
        "It is mostly carbon dioxide",
        "Its surface pressure is higher than Earth's and it is mostly nitrogen",
        "It is transparent, so the surface is easily seen from orbit",
      ],
      answer: "Its surface pressure is higher than Earth's and it is mostly nitrogen",
      explanation: "Titan's surface pressure is 1.45 bar, about 45% higher than Earth's, and its air is about 95% nitrogen and 5% methane, hidden under an orange organic haze.",
    },
    {
      prompt: "What did the Huygens probe achieve on 14 January 2005?",
      options: ["The first orbit of a moon other than our own", "The first landing on Titan, the most distant landing ever made", "The first flight in Titan's atmosphere", "The first sample returned from Saturn"],
      answer: "The first landing on Titan, the most distant landing ever made",
      explanation: "ESA's Huygens descended by parachute for 2 hours 27 minutes and transmitted from the surface for 72 minutes, revealing a plain of rounded ice pebbles.",
    },
    {
      prompt: "How will NASA's Dragonfly mission explore Titan?",
      options: ["As a submarine in Kraken Mare", "As a wheeled rover", "As a nuclear-powered rotorcraft flying between sites", "As a balloon drifting in the haze"],
      answer: "As a nuclear-powered rotorcraft flying between sites",
      explanation: "Titan's thick air and low gravity make flight easy, so Dragonfly, launching in July 2028, will hop across the dunes to Selk Crater after arriving in late 2034.",
    },
    {
      prompt: "What are Titan's equatorial dunes made of?",
      options: ["Silicate sand like Earth's deserts", "Grains of organic material fallen from the haze", "Frozen carbon dioxide", "Salt left by evaporated seas"],
      answer: "Grains of organic material fallen from the haze",
      explanation: "Sunlight turns methane and nitrogen into complex organic particles that settle out of the atmosphere and are blown by the wind into dunes up to 150 m high.",
    },
  ],
  glossary: [
    { term: "Tholins", definition: "Complex organic compounds made when sunlight and radiation break apart methane and nitrogen; they form Titan's orange haze." },
    { term: "Methane cycle", definition: "Titan's equivalent of Earth's water cycle: methane evaporates from seas, forms clouds, falls as rain and flows back through rivers." },
    { term: "Mare", definition: "Latin for sea, used for Titan's three large bodies of liquid hydrocarbons: Kraken, Ligeia and Punga Mare." },
    { term: "Cryovolcanism", definition: "Volcanic activity that erupts water, ammonia or other ices instead of molten rock." },
    { term: "Clathrate", definition: "Ice whose crystal structure traps gas molecules such as methane; a possible reservoir replenishing Titan's atmosphere." },
    { term: "Anti-greenhouse effect", definition: "Cooling caused by a haze that absorbs incoming sunlight high in the atmosphere before it can warm the surface." },
    { term: "Rotorcraft", definition: "An aircraft lifted by spinning rotors, like a helicopter or drone. Dragonfly has eight." },
    { term: "Tidal flexing", definition: "The stretching of a moon as its planet's gravity varies along an elliptical orbit; Titan's large flexing revealed its subsurface ocean." },
  ],
  sources: [
    { title: "NASA Science: Titan facts", url: "https://science.nasa.gov/saturn/moons/titan/facts/" },
    { title: "NSSDC Saturnian Satellite Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/saturniansatfact.html" },
    { title: "NASA Science: Dragonfly mission", url: "https://science.nasa.gov/mission/dragonfly/" },
    { title: "NASA Dragonfly blog: landing area named Ahmakiq Undae (September 2026)", url: "https://science.nasa.gov/blogs/dragonfly/2026/09/02/nasas-dragonfly-gets-wired-up-while-titan-landing-area-is-named/" },
    { title: "NASA Science: Huygens probe", url: "https://science.nasa.gov/mission/cassini/spacecraft/huygens-probe/" },
    { title: "ESA: Cassini-Huygens", url: "https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens" },
  ],
};
