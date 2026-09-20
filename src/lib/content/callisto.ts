import type { PlanetContent } from "./types";

export const callisto: PlanetContent = {
  id: "callisto",
  tagline: "The most heavily cratered world known: an ancient, frozen moon that may still hide an ocean.",
  intro: [
    "Callisto is the outermost of Jupiter's four Galilean moons and the third-largest moon in the solar system, with a radius of 2,410 km, almost the size of Mercury. It orbits Jupiter every 16.7 days at a distance of about 1,883,000 km, well beyond the orbits of Io, Europa and Ganymede and outside the harshest part of the planet's radiation belts. Its surface is dark, with an albedo of about 0.19, and is saturated with impact craters from pole to pole.",
    "Callisto is the Galilean moon that history forgot. It is not part of the orbital resonance that heats Io and Europa, so it has had almost no tidal heating, and it never fully separated into a core, mantle and crust. Its surface appears to be around four billion years old, essentially unchanged since the end of the heavy bombardment of the early solar system, and there is no sign that volcanism or tectonics ever reshaped it. It is the closest thing we have to a preserved relic of the era when the planets formed.",
    "Yet even Callisto may have a hidden ocean. NASA's Galileo orbiter found that Jupiter's changing magnetic field induces a response in the moon, best explained by a layer of salty liquid water perhaps 100 to 200 km below the surface, and a 2025 reanalysis strengthened the case. ESA's Juice spacecraft will make 21 flybys of Callisto between 2031 and 2034 to find out, and because its radiation environment is relatively mild, Callisto has been studied as a possible site for a future crewed base.",
  ],
  sections: [
    {
      title: "Structure and interior: a world that never fully settled",
      paragraphs: [
        "Callisto's mean density of 1.83 g/cm³ implies a mix of roughly equal parts rock and water ice, similar to Ganymede. But its gravity field, measured by Galileo, tells a different story about how that material is arranged. Its moment of inertia factor is about 0.355, much higher than Ganymede's 0.31 and close to the value for a uniform sphere, which means Callisto's mass is not strongly concentrated towards the centre. It is at most partially differentiated: the ice and rock are still largely mixed together, with perhaps a slight increase in rock content towards the middle and possibly a small rocky core.",
        "The reason is probably that Callisto formed slowly and stayed cool. Accreting far from Jupiter, with less material falling in and no tidal heating from an orbital resonance, it never got hot enough for the rock to sink fully through the ice. Its interior is thought to be warmed today only by the slow decay of radioactive elements in its rock, which is nonetheless enough, with a little dissolved ammonia or salt to lower the freezing point, to keep a layer of liquid water from freezing.",
        "Evidence for that ocean comes from Galileo's magnetometer. On flybys in the late 1990s, it recorded magnetic disturbances that varied with Jupiter's rotation, as expected if Jupiter's tilted field were inducing electric currents in a conducting layer inside the moon. A salty ocean beneath 80 to 150 km of ice is the simplest explanation, though a conducting ionosphere may account for part of the signal. A 2025 study combining Galileo data at several frequencies found the ocean explanation considerably stronger. The layer may be only tens of kilometres thick, sandwiched between the ice crust and the undifferentiated interior.",
      ],
      highlight: "Callisto never fully differentiated: its rock and ice are still largely mixed, yet a thin salty ocean may lie 100 to 200 km down.",
    },
    {
      title: "Surface and geology: craters upon craters",
      paragraphs: [
        "Callisto's surface is the most heavily cratered of any known world. Craters cover it almost to saturation, meaning that new impacts, on average, destroy as many old craters as they create. Crater counts imply an age of about four billion years for the bulk of the surface, older than any terrain on Ganymede, the Moon or Mars. There are no mountains, no volcanic plains, no grooves or fractures, and no evidence that the crust has ever moved.",
        "The largest features are multi-ring impact basins. Valhalla, the biggest, has a bright central region about 600 km across surrounded by concentric rings that extend to a diameter of roughly 3,800 km, the largest such structure in the solar system; Asgard spans about 1,600 km. The rings probably formed when the impact punched through a relatively thin, brittle crust into softer, warmer ice beneath, which flowed inward and cracked the surface around the basin like the rings on a pond.",
        "At close range, Galileo revealed a surprisingly degraded landscape. Crater rims are worn down, and the surface between them is covered in dark, smooth deposits and dotted with bright knobs and spires a few hundred metres to a kilometre high. The bright material is water ice, and the dark material is a residue of rocky and carbon-rich dust left behind as ice sublimates away over billions of years, gradually collapsing the smaller craters into rubble. Spectroscopy has identified water ice, carbon dioxide, silicates and organic compounds on the surface, and in 2024 the James Webb Space Telescope mapped its carbon-rich materials in detail.",
      ],
      highlight: "Valhalla's rings span some 3,800 km, and Callisto's surface has recorded four billion years of impacts without being wiped clean.",
    },
    {
      title: "A whisper of an atmosphere",
      paragraphs: [
        "Callisto has an atmosphere so thin it is better called an exosphere. In 1999 Galileo's near-infrared spectrometer detected carbon dioxide gas glowing faintly above the surface, with a surface pressure of about 7.5 picobar, less than a hundred-billionth of Earth's. The carbon dioxide probably sublimates from ice in the surface or is released from carbon-rich material by radiation, and it would escape into space within days unless continually replenished.",
        "Later observations showed there is more to it. Galileo's radio signals, passing through the moon's ionosphere during flybys, revealed far more charged particles than a pure carbon dioxide atmosphere could produce, and in 2015 Hubble Space Telescope observations detected atomic oxygen emissions best explained by molecular oxygen as the dominant gas, produced when radiation splits water ice. Hydrogen has also been detected as a faint corona. The exact balance of these gases, and how much oxygen there is, remains an active puzzle for Juice to solve.",
        "Callisto's distance from Jupiter makes its surface environment the gentlest of the Galilean moons. The dose from Jupiter's trapped radiation is roughly 0.1 millisieverts a day, less than a hundred-thousandth of the dose on Io and less than astronauts receive on the International Space Station, although cosmic rays add to it. That is why Callisto features in NASA's 2003 Human Outer Planets Exploration study as the most practical Jovian moon on which to place a crewed outpost.",
      ],
    },
    {
      title: "Orbit and tides: outside the resonance",
      paragraphs: [
        "Callisto orbits Jupiter in 16.69 days at a mean distance of 1,882,700 km, about 26 Jupiter radii, on a nearly circular path with an eccentricity of 0.007 and an inclination of about 0.2 degrees to the planet's equator. It is tidally locked, so its day equals its orbital period. Crucially, it is the one Galilean moon not part of the Laplace resonance: Io, Europa and Ganymede orbit in a 4:2:1 rhythm that keeps their orbits slightly elliptical, but Callisto's period is not a simple multiple of theirs.",
        "Without that resonance to maintain its eccentricity, Callisto's orbit has been circularised by tides, and the tidal flexing that drives Io's volcanoes and keeps Europa's ocean warm is negligible here. That single fact explains most of the contrast with Ganymede, its near-twin in size and composition: Ganymede differentiated, generates a magnetic field and reworked two-thirds of its surface, while Callisto stayed cold, mixed and cratered. The two moons are a natural experiment in what tidal heating does.",
        "Callisto sits far enough from Jupiter that the planet's magnetosphere is weaker and the plasma more tenuous, which is why its surface is only lightly weathered by charged particles compared with the inner moons. From the moon's surface, Jupiter would appear about 4 degrees across, eight times the width of Earth's full Moon, small compared with the view from Io but still dominating the sky.",
      ],
      highlight: "Callisto is the only Galilean moon outside the Laplace resonance, so it escaped tidal heating and kept its ancient surface.",
    },
    {
      title: "Exploration and missions",
      paragraphs: [
        "Pioneer 10 and 11 gave the first close views of Callisto in 1973 and 1974, and Voyager 1 and 2 in 1979 mapped roughly half of the surface, revealing the saturated cratering and the Valhalla and Asgard basins. NASA's Galileo orbiter made eight close encounters between 1996 and 2001, some within a few hundred kilometres, returning images at resolutions down to about 15 m, measuring the gravity field that showed the interior was only partly differentiated, detecting the carbon dioxide exosphere and gathering the magnetic evidence for an ocean. Cassini in 2000 and New Horizons in 2007 observed it briefly while passing Jupiter.",
        "Callisto's future exploration is tied to the two spacecraft now heading for Jupiter. ESA's Juice, launched on 14 April 2023, arrives in July 2031 and will make 21 flybys of Callisto between 2031 and 2034, some as low as about 200 km, using radar, laser altimetry, spectrometers and gravity tracking to search for the ocean and study the surface before it moves on to orbit Ganymede. Juice also uses Callisto's gravity to raise the inclination of its orbit around Jupiter for views of the planet's poles. NASA's Europa Clipper, arriving in April 2030, will fly past Callisto around nine times for gravity assists during its Europa campaign, gathering data on the way.",
        "China has announced Tianwen-4, a Jupiter mission planned for launch in 2029 that would place an orbiter around Callisto in the mid-2030s, though its details may change. No lander is currently approved for any of Jupiter's moons.",
      ],
      highlight: "Juice will fly past Callisto 21 times between 2031 and 2034, and Europa Clipper about nine times from 2030.",
    },
    {
      title: "Name and discovery",
      paragraphs: [
        "Callisto was discovered by Galileo Galilei on 7 January 1610, when he first turned his telescope on Jupiter and saw what he described as three small stars in a line beside it; Callisto was the outermost of the three. Over the following nights he saw the points of light shift position and realised they were moons orbiting the planet, a discovery he published in March 1610 in Sidereus Nuncius. The German astronomer Simon Marius said he had seen the moons independently at about the same time.",
        "The name comes from Marius, who in 1614, following a suggestion by Johannes Kepler, named the four moons after lovers of Zeus. In Greek myth Callisto was a nymph and follower of the hunter-goddess Artemis. Zeus seduced her and she bore a son, Arcas; the jealous Hera turned her into a bear, and Zeus eventually placed her in the sky as the constellation Ursa Major, the Great Bear. Galileo preferred to number the moons, and Callisto was known as Jupiter IV until the mythological names came into general use in the 20th century.",
        "The four Galilean moons were the first objects ever shown to orbit a body other than Earth, and their discovery was a key piece of evidence for the Copernican, Sun-centred model of the solar system.",
      ],
    },
    {
      title: "What you'd experience there",
      paragraphs: [
        "Callisto's surface gravity is 1.24 m/s², about 13% of Earth's and a little less than the Moon's, so you would weigh roughly an eighth of your Earth weight. The ground would be dark, dusty ice at around −140 °C, littered with icy knobs and worn crater rims, and a day, from one sunrise to the next, would last 16.7 Earth days, with more than a week of darkness at a stretch. The Sun would be a small, sharp disc giving about one twenty-seventh of the light it gives on Earth.",
        "From the hemisphere that faces Jupiter, the planet would hang fixed in the sky about 4 degrees across, eight times as wide as the full Moon appears from Earth, with Io, Europa and Ganymede passing in front of and behind it. There is no air to scatter light or carry sound, so the sky would be black by day and the stars brilliant, and nothing on the surface would ever move except the shadows.",
        "What sets Callisto apart is what you would not experience. Unlike Io, Europa or Ganymede, the radiation here would not be quickly lethal: the daily dose from Jupiter's radiation belts is lower than on the International Space Station, so a spacesuit and modest shielding against cosmic rays would suffice. That, together with abundant water ice and the ancient, stable surface, is why Callisto is considered the most practical Jovian moon for a human outpost, a base from which robots could be operated on the more dangerous moons closer to Jupiter.",
      ],
      highlight: "On Callisto the radiation is mild enough for humans to work outside, which is why it has been studied as a site for a crewed base.",
    },
  ],
  layers: [
    {
      name: "Mixed rock and ice interior",
      description: "An interior of rock and ice that never fully separated, with rock content perhaps increasing towards the centre and possibly a small silicate core. Galileo's gravity data show it is only partially differentiated.",
      color: "#6b5d4e",
      radiusFraction: 0.92,
      detail: "Compressed ice and rock, roughly 2,200 km to the centre; possibly a small rocky core",
    },
    {
      name: "Possible ocean",
      description: "A layer of salty liquid water inferred from induced magnetic fields, kept from freezing by radioactive heat and dissolved salts or ammonia. It may be only tens of kilometres thick.",
      color: "#2f6fb5",
      radiusFraction: 0.95,
      detail: "Salty water, perhaps 10 to 100 km thick, about 100 to 200 km below the surface",
    },
    {
      name: "Ice crust",
      description: "A thick, cold, rigid lithosphere of water ice mixed with rocky dust, saturated with craters and unchanged for about four billion years.",
      color: "#a39a8d",
      radiusFraction: 1,
      detail: "Water ice and dust, roughly 80 to 150 km thick; surface about −140 °C",
    },
  ],
  timeline: [
    { year: "1610", title: "Discovery", detail: "Galileo Galilei sees Callisto on 7 January as the outermost of the points of light beside Jupiter; Simon Marius names it in 1614." },
    { year: "1973–74", title: "Pioneer flybys", detail: "Pioneer 10 and 11 return the first close views of Callisto and refine its mass and size." },
    { year: "1979", title: "Voyager flybys", detail: "Voyager 1 and 2 map about half of the surface, revealing saturated cratering and the Valhalla and Asgard multi-ring basins." },
    { year: "1996–2001", title: "Galileo encounters", detail: "Eight close flybys show a partially differentiated interior, a degraded icy landscape and a thin carbon dioxide exosphere." },
    { year: "1998", title: "Ocean evidence", detail: "Galileo magnetometer data reveal an induced magnetic field, interpreted as evidence for a salty subsurface ocean." },
    { year: "2003", title: "Crewed base study", detail: "NASA's Human Outer Planets Exploration study identifies Callisto as the most practical Jovian moon for a human outpost because of its low radiation." },
    { year: "2015", title: "Oxygen detected", detail: "Hubble observations of atomic oxygen emissions show that molecular oxygen is probably the dominant gas in Callisto's thin atmosphere." },
    { year: "2023", title: "Juice launches", detail: "ESA's Jupiter Icy Moons Explorer lifts off on 14 April, with 21 Callisto flybys planned." },
    { year: "2025", title: "Stronger ocean case", detail: "A multi-frequency reanalysis of Galileo magnetic data finds the subsurface ocean explanation significantly more likely than an ionosphere alone." },
    { year: "2030–34", title: "Clipper and Juice arrive", detail: "Europa Clipper reaches Jupiter in April 2030 and uses Callisto for gravity assists; Juice arrives in July 2031 and makes 21 Callisto flybys before orbiting Ganymede." },
  ],
  comparisons: [
    { label: "Diameter", value: 4820.6, earth: 12742, unit: "km" },
    { label: "Mass", value: 0.018, earth: 1, unit: "× Earth" },
    { label: "Surface gravity", value: 1.235, earth: 9.81, unit: "m/s²" },
    { label: "Rotation period", value: 400.56, earth: 23.93, unit: "hours" },
    { label: "Mean temperature", value: -139, earth: 15, unit: "°C" },
    { label: "Escape velocity", value: 2.44, earth: 11.19, unit: "km/s" },
    { label: "Surface pressure", value: 7.5e-12, earth: 1.013, unit: "bar" },
  ],
  moons: [],
  quiz: [
    {
      prompt: "Why has Callisto's surface stayed almost unchanged for about four billion years?",
      options: ["It is made of solid iron", "It lies outside the Laplace resonance, so it has had almost no tidal heating", "It is shielded by a thick atmosphere", "It formed only recently"],
      answer: "It lies outside the Laplace resonance, so it has had almost no tidal heating",
      explanation: "Without a resonance to keep its orbit elliptical, Callisto was never flexed and heated like Io or Europa, so no volcanism or tectonics ever resurfaced it.",
    },
    {
      prompt: "What does Callisto's moment of inertia factor of about 0.355 tell us?",
      options: ["It has a large liquid iron core", "It is hollow", "Its rock and ice are still largely mixed, so it is only partially differentiated", "It is made entirely of ice"],
      answer: "Its rock and ice are still largely mixed, so it is only partially differentiated",
      explanation: "A value close to 0.4, that of a uniform sphere, means mass is not strongly concentrated at the centre; Ganymede's 0.31 shows full separation into layers.",
    },
    {
      prompt: "What is Valhalla?",
      options: ["A volcano 20 km high", "A multi-ring impact basin with rings spanning about 3,800 km", "A frozen lake of methane", "A canyon system 5,000 km long"],
      answer: "A multi-ring impact basin with rings spanning about 3,800 km",
      explanation: "Valhalla is the largest multi-ring structure in the solar system, with a bright central region about 600 km across surrounded by concentric rings.",
    },
    {
      prompt: "Why has Callisto been proposed as a site for a crewed base?",
      options: ["It has breathable air", "Its radiation environment is far milder than the inner Galilean moons", "It is the closest moon to Earth", "It has warm surface temperatures"],
      answer: "Its radiation environment is far milder than the inner Galilean moons",
      explanation: "Orbiting far from Jupiter, Callisto receives only about 0.1 millisieverts a day, less than a hundred-thousandth of the dose on Io, and it has abundant water ice.",
    },
    {
      prompt: "How many flybys of Callisto is ESA's Juice spacecraft planned to make?",
      options: ["2", "9", "21", "49"],
      answer: "21",
      explanation: "Juice will fly past Callisto 21 times between 2031 and 2034, more than any other moon, before entering orbit around Ganymede in December 2034.",
    },
  ],
  glossary: [
    { term: "Moment of inertia factor", definition: "A number describing how a body's mass is distributed; 0.4 is a uniform sphere, lower values mean a dense core. Callisto's 0.355 shows it is only partly differentiated." },
    { term: "Differentiation", definition: "The separation of a body into layers of different density. Callisto never completed the process, unlike Ganymede." },
    { term: "Multi-ring basin", definition: "A giant impact structure surrounded by concentric rings, formed when an impact punches through a brittle crust into softer material below. Valhalla is the largest." },
    { term: "Crater saturation", definition: "The state in which a surface is so crowded with craters that new impacts erase old craters as fast as they add new ones." },
    { term: "Induced magnetic field", definition: "A magnetic field produced in a conducting layer, such as a salty ocean, in response to a changing external field. Its detection at Callisto is the main evidence for an ocean." },
    { term: "Exosphere", definition: "An atmosphere so thin that its molecules rarely collide with one another. Callisto's is made of carbon dioxide and oxygen." },
    { term: "Sublimation", definition: "The change of ice directly into vapour without melting. It has slowly stripped ice from Callisto's surface, leaving dark dust behind." },
    { term: "Laplace resonance", definition: "The 4:2:1 orbital lock between Io, Europa and Ganymede. Callisto is the only Galilean moon outside it." },
  ],
  sources: [
    { title: "NASA Science: Callisto", url: "https://science.nasa.gov/jupiter/moons/callisto/" },
    { title: "NSSDC Jovian Satellite Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/joviansatfact.html" },
    { title: "ESA: Juice (Jupiter Icy Moons Explorer)", url: "https://www.esa.int/Science_Exploration/Space_Science/Juice" },
    { title: "NASA JPL: Galileo spacecraft finds thin atmosphere on Callisto (1999)", url: "https://www.jpl.nasa.gov/news/galileo-spacecraft-finds-thin-atmosphere-on-callisto/" },
    { title: "Khurana et al. 1998: Induced magnetic fields as evidence for subsurface oceans in Europa and Callisto", url: "https://ui.adsabs.harvard.edu/abs/1998Natur.395..777K/abstract" },
    { title: "Cochrane et al. 2025: Stronger evidence of a subsurface ocean within Callisto (AGU Advances)", url: "https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2024AV001237" },
  ],
};
