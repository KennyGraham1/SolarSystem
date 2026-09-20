import type { PlanetContent } from "./types";

export const venus: PlanetContent = {
  id: "venus",
  tagline: "Earth's twin in size, and its evil twin in every other way: a runaway greenhouse under acid clouds.",
  intro: [
    "Venus is the second planet from the Sun and the closest to Earth in size, mass and composition, which is why it is often called our twin. It is also the brightest natural object in the night sky after the Moon, shining as the 'evening star' or 'morning star'. That brilliance comes from a blanket of clouds that reflects about 75% of the sunlight that hits it, and those clouds hide a world that could hardly be less like ours.",
    "The surface of Venus averages 464 °C, hot enough to melt lead, and the atmospheric pressure is 92 times that of Earth, equivalent to being 900 m under the ocean. The air is 96.5% carbon dioxide, the clouds are droplets of sulphuric acid, and the sky glows a dim orange. This is the greenhouse effect run to its extreme, and it makes Venus the hottest planet in the solar system, hotter even than Mercury, which is much closer to the Sun.",
    "Venus also turns the wrong way and does so painfully slowly: it spins backwards compared with most planets, one rotation taking 243 Earth days, longer than its 225-day year. Whether it once had oceans and a mild climate like Earth, and if so what went wrong, is one of the most urgent questions in planetary science, and a new generation of missions from NASA and ESA is being prepared to find out in the 2030s.",
  ],
  sections: [
    {
      title: "Structure and interior",
      paragraphs: [
        "Venus is built like Earth: an iron-nickel core roughly 3,200 km in radius, a thick rocky mantle and a thin basaltic crust. Its average density is only slightly lower than Earth's. But Venus has no detectable magnetic field generated in its interior, which suggests its core is not convecting the way Earth's is, perhaps because it lacks a solid inner core or because the mantle cannot draw heat out of it fast enough. Whether the core is fully liquid, partly solid or something else is still unknown.",
        "The biggest difference from Earth may lie in the mantle and crust. Earth's surface is broken into tectonic plates that recycle heat and carbon; Venus shows no sign of plate tectonics today. Instead its crust seems to be a single 'stagnant lid', with heat escaping through volcanism and possibly through episodes of global resurfacing. Radar mapping by NASA's Magellan orbiter in the early 1990s revealed a surface with relatively few craters, implying it is only a few hundred million years old.",
        "Exactly how Venus loses its internal heat is a major puzzle. One idea is that the whole surface is periodically buried under vast lava flows in catastrophic bursts; another is that resurfacing happens more steadily in patches. Distinguishing between them is a central goal of the upcoming VERITAS and EnVision radar missions.",
      ],
      highlight: "Venus has Earth's size and density but no plate tectonics and no magnetic field, and a surface only a few hundred million years old.",
    },
    {
      title: "A crushing, poisonous atmosphere",
      paragraphs: [
        "Venus's atmosphere contains about 90 times more gas than Earth's, and nearly all of it is carbon dioxide, with a few percent nitrogen and traces of sulphur dioxide, water vapour and argon. Earth actually holds a similar amount of carbon, but it is locked away in limestone rock and dissolved in the oceans. On Venus, without oceans, it all ended up in the air, trapping infrared radiation so efficiently that the surface is hotter than the daylight side of Mercury.",
        "Between about 48 and 70 km above the surface lies a continuous deck of clouds made of droplets of concentrated sulphuric acid, formed when sulphur dioxide from volcanoes reacts with water vapour in sunlight. Rain falls from these clouds but evaporates long before it reaches the ground. Below the clouds the air is hazy but clear, and above them the sky is blue, just as on Earth. Flashes attributed to lightning have been reported by several spacecraft, although whether Venus really has lightning is still debated.",
        "The upper atmosphere 'super-rotates': at cloud-top level winds blow at up to 360 km/h, circling the planet in only four Earth days while the surface below takes 243 days to turn once. At ground level, by contrast, the dense air moves at a walking pace, though with such high density even a gentle breeze would carry the force of an ocean current. A leading theory for Venus's fate is that as the young Sun brightened, its oceans evaporated, water vapour amplified the warming, and ultraviolet light split the water so that the hydrogen escaped to space, leaving CO2 behind with nothing to remove it.",
      ],
      highlight: "Venus and Earth hold similar amounts of carbon, but on Earth it is locked in rock and ocean; on Venus it is all in the air.",
    },
    {
      title: "Surface: volcanoes, plains and a mountain taller than Everest",
      paragraphs: [
        "Radar maps show that about 80% of Venus is covered by smooth volcanic plains, dotted with more than 1,600 major volcanoes and countless smaller ones, more than any other planet. There are shield volcanoes like those of Hawaii, flat-topped 'pancake domes' of thick lava, and coronae, huge circular features hundreds of kilometres wide where plumes of hot rock have pushed the crust upward and let it collapse.",
        "Two continent-sized highlands rise above the plains. Ishtar Terra in the north is about the size of Australia and carries Maxwell Montes, the planet's highest mountain at about 11 km, taller than Mount Everest. Aphrodite Terra straddles the equator and is as large as South America. Both are named, like nearly every feature on Venus, after women from history and mythology.",
        "For a long time nobody knew whether Venus's volcanoes were still alive. In 2023 researchers re-examining Magellan radar images from 1991 found a volcanic vent near Maat Mons that had changed shape and grown in eight months, the first direct evidence of a recent eruption. Combined with fluctuating sulphur dioxide in the atmosphere and hot spots seen by ESA's Venus Express, it now seems clear that Venus is volcanically active today.",
      ],
      highlight: "A vent on Maat Mons changed shape between two Magellan radar passes in 1991: Venus is volcanically active today.",
    },
    {
      title: "Exploration and missions",
      paragraphs: [
        "Venus was the first planet visited by a spacecraft, when NASA's Mariner 2 flew past in December 1962 and measured its scorching temperature. The Soviet Union then led the way with the Venera programme: Venera 7 made the first soft landing on another planet in 1970, Venera 9 sent the first pictures from the surface in 1975, and Venera 13 returned colour panoramas in 1982 and survived a record 127 minutes before the heat and pressure destroyed it. The Soviet Vega balloons of 1985 drifted in the clouds for nearly two days.",
        "NASA's Magellan orbiter mapped 98% of the surface with radar between 1990 and 1994, providing the maps still used today. ESA's Venus Express (2006 to 2014) studied the atmosphere and found evidence of recent volcanism, while Japan's Akatsuki orbiter studied the super-rotating winds from 2015 until contact was lost in April 2024; JAXA declared the mission over in 2025. In between, several spacecraft bound for other targets, including Parker Solar Probe, BepiColombo and Solar Orbiter, have used Venus for gravity assists and gathered data along the way.",
        "A new wave is planned. NASA selected two missions in 2021: DAVINCI, which will drop a probe through the atmosphere to sample its chemistry and photograph the surface on the way down, now targeting launch in December 2030 with arrival in early 2033, and VERITAS, a radar-mapping orbiter aiming for launch around 2031. Both have faced repeated delays, and the White House budget requests for 2026 and 2027 proposed cancelling them; Congress restored funding for 2026, but their future is still uncertain. ESA's EnVision orbiter is scheduled to launch in November 2031 to study the planet from core to upper atmosphere, and a small privately funded probe, Rocket Lab's Venus Life Finder, plans to search the clouds for organic molecules once the company's new Neutron rocket is ready to fly.",
      ],
    },
    {
      title: "Name, myth and history",
      paragraphs: [
        "Venus is named after the Roman goddess of love and beauty, a fitting title for the brightest planet. The Babylonians knew it as Ishtar, the Greeks as Aphrodite, and the Maya built a calendar around its 584-day cycle of appearances. Because it never strays far from the Sun in the sky, it appears either in the west after sunset or in the east before dawn, and many ancient peoples thought it was two different objects, Hesperus and Phosphorus.",
        "In 1610 Galileo saw that Venus shows a full set of phases like the Moon, from thin crescent to nearly full disc, which could only happen if it orbited the Sun rather than the Earth. This was one of the decisive observations in favour of the Copernican system. In 1761 the Russian scientist Mikhail Lomonosov noticed a bright ring around Venus as it crossed the Sun's face and correctly inferred that it has an atmosphere.",
        "Transits of Venus, when the planet passes directly between Earth and the Sun, were once the key to measuring the size of the solar system: expeditions in 1761 and 1769, including James Cook's voyage to Tahiti, timed the crossing from distant points to triangulate the Sun's distance. The most recent transit was in June 2012; the next will not occur until 2117. Until the space age, science-fiction writers imagined jungles or oceans beneath the clouds. Radio measurements in the 1950s and Mariner 2 in 1962 revealed the furnace instead.",
      ],
    },
    {
      title: "What you'd experience there",
      paragraphs: [
        "Standing on Venus you would weigh about 90% of your Earth weight, but that is the only familiar thing. Without a suit far beyond anything yet built, you would be crushed, cooked and corroded within seconds: the pressure of 92 bar is equivalent to the deep sea, the 464 °C heat is above the melting point of lead, and the air carries traces of sulphuric acid. The Soviet landers, built like submarines, survived for two hours at most.",
        "The light would be dim and orange, like a heavily overcast day at dusk, because the clouds high above absorb and scatter sunlight; you would never see the Sun, stars or Earth from the surface. The dense air would bend light so strongly that the horizon would appear to curve upward, as if you stood at the bottom of a bowl. Sound would carry well, but with a deeper pitch than on Earth.",
        "If the clouds cleared, the Sun would rise in the west and set in the east, because Venus spins backwards, and a single day from sunrise to sunrise would last 117 Earth days. Oddly, the most Earth-like place on Venus is about 50 to 55 km up in the clouds, where the pressure and temperature are close to those at Earth's surface. Some engineers have proposed floating cities of balloons there, above the acid but below the deadly ultraviolet.",
      ],
      highlight: "At 50 to 55 km up, Venus's atmosphere has Earth-like pressure and temperature, the most habitable spot on the planet.",
    },
  ],
  layers: [
    {
      name: "Core",
      description: "An iron-nickel core similar in size to Earth's, but apparently not convecting: Venus has no internally generated magnetic field.",
      color: "#e8d9b0",
      radiusFraction: 0.53,
      detail: "Iron-nickel, ~3,200 km radius; may be partly molten",
    },
    {
      name: "Mantle",
      description: "A thick shell of hot silicate rock. Without plate tectonics, heat escapes through volcanism and possible episodes of global resurfacing.",
      color: "#c0783c",
      radiusFraction: 0.99,
      detail: "Silicate rock, ~2,800 km thick",
    },
    {
      name: "Crust",
      description: "Basaltic volcanic plains, two continent-sized highlands and more than 1,600 major volcanoes, under a 92-bar CO2 atmosphere.",
      color: "#e6c98a",
      radiusFraction: 1,
      detail: "Basalt, ~20 to 50 km thick; surface 464 °C",
    },
  ],
  timeline: [
    { year: "1610", title: "Galileo sees the phases of Venus", detail: "Venus shows a full cycle of phases like the Moon, proving it orbits the Sun and supporting the Copernican model." },
    { year: "1761", title: "An atmosphere detected", detail: "During a transit, Mikhail Lomonosov notices a luminous ring around Venus and deduces that the planet has an atmosphere." },
    { year: "1962", title: "Mariner 2 flyby", detail: "NASA's Mariner 2 becomes the first spacecraft to visit another planet and measures Venus's extreme surface temperature." },
    { year: "1970", title: "Venera 7 lands", detail: "The Soviet probe makes the first successful soft landing on another planet and transmits for 23 minutes." },
    { year: "1975", title: "First surface images", detail: "Venera 9 returns the first photograph from the surface of another planet, showing flat, angular rocks." },
    { year: "1982", title: "Venera 13's colour panorama", detail: "Venera 13 sends colour images and analyses a soil sample, surviving for a record 127 minutes on the surface." },
    { year: "1985", title: "Vega balloons", detail: "Two Soviet balloons drift for nearly 48 hours in the cloud layer, measuring winds of about 240 km/h." },
    { year: "1990–94", title: "Magellan maps the planet", detail: "NASA's Magellan orbiter uses radar to map 98% of the surface, revealing volcanoes, coronae and a young crust." },
    { year: "2006–14", title: "Venus Express", detail: "ESA's orbiter studies the atmosphere and finds signs of recent volcanic activity and ongoing loss of water to space." },
    { year: "2015–24", title: "Akatsuki orbits Venus", detail: "Japan's climate orbiter, after a failed first attempt in 2010, studies the super-rotating winds until contact is lost in 2024." },
    { year: "2023", title: "Active volcanism found", detail: "Re-analysis of Magellan images shows a vent on Maat Mons changed shape in 1991, the first direct evidence of a recent eruption." },
    { year: "2030–31", title: "The next wave", detail: "NASA's DAVINCI probe (planned launch December 2030), VERITAS (around 2031) and ESA's EnVision (November 2031) are scheduled to head for Venus, funding permitting." },
  ],
  comparisons: [
    { label: "Diameter", value: 12104, earth: 12742, unit: "km" },
    { label: "Mass", value: 0.815, earth: 1, unit: "× Earth" },
    { label: "Surface gravity", value: 8.87, earth: 9.81, unit: "m/s²" },
    { label: "Rotation period (retrograde)", value: 5832, earth: 23.93, unit: "hours" },
    { label: "Year length", value: 224.7, earth: 365.25, unit: "Earth days" },
    { label: "Mean distance from Sun", value: 108.2, earth: 149.6, unit: "million km" },
    { label: "Mean temperature", value: 464, earth: 15, unit: "°C" },
    { label: "Escape velocity", value: 10.36, earth: 11.19, unit: "km/s" },
  ],
  moons: [],
  quiz: [
    {
      prompt: "Why is Venus hotter than Mercury even though it is further from the Sun?",
      options: [
        "Its volcanoes heat the surface",
        "Its thick carbon-dioxide atmosphere traps heat in a runaway greenhouse effect",
        "It is closer to the Sun for part of its orbit",
        "Its clouds focus sunlight onto the surface",
      ],
      answer: "Its thick carbon-dioxide atmosphere traps heat in a runaway greenhouse effect",
      explanation: "Venus's atmosphere is 96.5% CO2 at 92 times Earth's pressure. It lets sunlight in but blocks infrared from escaping, keeping the whole surface at about 464 °C, day and night.",
    },
    {
      prompt: "What are the clouds of Venus made of?",
      options: ["Water droplets", "Sulphuric acid droplets", "Frozen carbon dioxide", "Methane ice"],
      answer: "Sulphuric acid droplets",
      explanation: "Sulphur dioxide from volcanoes reacts with water vapour in sunlight to form a permanent global deck of sulphuric acid clouds between about 48 and 70 km altitude.",
    },
    {
      prompt: "Which of these is true about how Venus rotates?",
      options: [
        "It spins faster than any other planet",
        "It spins backwards, and one rotation takes longer than its year",
        "It always keeps the same face toward the Sun",
        "It spins on its side like Uranus",
      ],
      answer: "It spins backwards, and one rotation takes longer than its year",
      explanation: "Venus rotates retrograde once every 243 Earth days, while its year lasts 225 days. From the surface, the Sun would rise in the west.",
    },
    {
      prompt: "Which spacecraft was the first to make a soft landing on another planet?",
      options: ["Mariner 2", "Viking 1", "Venera 7", "Magellan"],
      answer: "Venera 7",
      explanation: "The Soviet Venera 7 lander reached the surface of Venus in December 1970 and transmitted data for about 23 minutes before succumbing to the heat and pressure.",
    },
    {
      prompt: "Where on Venus are the pressure and temperature most similar to Earth's surface?",
      options: ["On the highest mountain, Maxwell Montes", "At the poles", "About 50 to 55 km up in the atmosphere", "On the night side"],
      answer: "About 50 to 55 km up in the atmosphere",
      explanation: "Around 50 to 55 km altitude the pressure is about 1 bar and the temperature is roughly 20 to 70 °C, which is why some engineers imagine floating habitats there.",
    },
  ],
  glossary: [
    { term: "Greenhouse effect", definition: "Warming caused when atmospheric gases such as carbon dioxide let sunlight in but trap the infrared heat the surface radiates back." },
    { term: "Retrograde rotation", definition: "Spinning in the opposite direction to most planets, so that the Sun rises in the west. Venus and Uranus both rotate this way." },
    { term: "Super-rotation", definition: "Winds in Venus's upper atmosphere that circle the planet in about four days, sixty times faster than the surface rotates." },
    { term: "Corona (geology)", definition: "A large oval feature on Venus, up to hundreds of kilometres across, formed where a plume of hot mantle rock pushed up the crust." },
    { term: "Transit", definition: "The passage of a planet directly across the face of the Sun as seen from Earth. Venus last transited in 2012; the next is in 2117." },
    { term: "Radar mapping", definition: "Bouncing radio waves off a surface to build up an image, the only way to see Venus's ground through its permanent clouds." },
    { term: "Stagnant lid", definition: "A planetary crust that forms a single unbroken shell rather than moving plates, thought to describe Venus today." },
  ],
  sources: [
    { title: "NASA Venus Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/venusfact.html" },
    { title: "NASA Science: Venus", url: "https://science.nasa.gov/venus/" },
    { title: "NASA Science: DAVINCI", url: "https://science.nasa.gov/mission/davinci/" },
    { title: "NASA Science: VERITAS", url: "https://science.nasa.gov/mission/veritas/" },
    { title: "ESA: EnVision factsheet", url: "https://www.esa.int/Science_Exploration/Space_Science/Envision/Envision_factsheet" },
  ],
};
