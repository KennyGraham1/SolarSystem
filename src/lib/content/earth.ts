import type { PlanetContent } from "./types";

export const earth: PlanetContent = {
  id: "earth",
  tagline: "The only world we know where rain falls, oceans stir and something is alive to notice.",
  intro: [
    "Earth is the third planet from the Sun, the largest and densest of the four rocky planets, and, as far as we know, the only place in the universe where life exists. It sits in the Sun's habitable zone, at a distance where water can be liquid on the surface, and about 71% of that surface is covered by ocean. Seen from space it is a blue marble streaked with white cloud, and the blue is water, the green is life.",
    "What makes Earth unusual is not any single ingredient but the way its systems work together. A molten iron core generates a magnetic field that deflects the solar wind. Moving tectonic plates recycle the crust and regulate carbon dioxide over millions of years. An atmosphere of nitrogen and oxygen, the oxygen itself produced by living things, keeps the surface warm and shields it from ultraviolet light. A large Moon steadies the planet's tilt, so the seasons stay reliable.",
    "Earth is also the only planet whose surface we have explored in detail and the base from which everything else is studied. Thousands of satellites now watch its weather, oceans, ice and forests from orbit, and after a gap of more than fifty years, humans flew around the Moon again in April 2026 aboard Artemis II, the first step toward a return to the lunar surface.",
  ],
  sections: [
    {
      title: "Structure and interior",
      paragraphs: [
        "Earth is layered like an onion, and we know its interior mainly from earthquakes: seismic waves bend, speed up and reflect at each boundary. At the centre is a solid inner core of iron and nickel about 1,220 km in radius, as hot as the surface of the Sun (around 5,400 °C) but kept solid by immense pressure. Around it lies a liquid outer core 2,260 km thick. The slow churning of this molten metal, twisted by Earth's rotation, generates the magnetic field.",
        "Above the core sits the mantle, 2,900 km of hot, solid but slowly flowing silicate rock that makes up 84% of Earth's volume. Convection in the mantle, moving at about the speed fingernails grow, drives plate tectonics at the surface. The crust is the thin outer skin: about 5 to 10 km thick under the oceans and 30 to 70 km under the continents. Together the crust and the rigid top of the mantle form the lithosphere, broken into about 15 major plates.",
        "Earth is the only planet known to have plate tectonics. Where plates pull apart, new crust forms at mid-ocean ridges; where they collide, one dives beneath the other, generating earthquakes, volcanoes and mountain ranges like the Himalayas. This recycling is thought to be crucial for long-term habitability, because it buries carbon in rock and releases it again through volcanoes, acting as a thermostat over millions of years.",
      ],
      highlight: "Earth's inner core is as hot as the Sun's surface, yet solid, because it is crushed under pressure 3.6 million times that of the air.",
    },
    {
      title: "Atmosphere",
      paragraphs: [
        "Earth's air is 78% nitrogen, 21% oxygen, about 1% argon, and small but vital traces of water vapour, carbon dioxide (currently about 0.042%, or 420 parts per million, and rising), methane and ozone. The oxygen is a biological signature: it is so chemically reactive that it would vanish from the air within a few million years if photosynthesis stopped replacing it. Any alien astronomer detecting oxygen in our spectrum would have good reason to suspect life.",
        "The atmosphere has layers. The troposphere, the lowest 8 to 15 km, holds most of the air and all of the weather. Above it the stratosphere contains the ozone layer, which absorbs harmful ultraviolet radiation; then the mesosphere, where meteors burn up; the thermosphere, where the aurora glows and the International Space Station orbits; and finally the exosphere, fading into space. There is no sharp edge, but the Kármán line at 100 km is the conventional boundary of space.",
        "Greenhouse gases keep Earth habitable. Without water vapour and carbon dioxide trapping heat, the average temperature would be about −18 °C instead of 15 °C. But the balance is delicate. Burning fossil fuels has raised CO2 levels by about 50% since the industrial revolution, and the planet has warmed by roughly 1.2 to 1.3 °C so far, with 2024 the hottest year on record. Venus shows where a runaway greenhouse leads; Earth's climate is the subject of the most intense scientific monitoring of any planet.",
      ],
      highlight: "Free oxygen makes up a fifth of our air only because living things constantly replace it.",
    },
    {
      title: "Oceans, weather and a living surface",
      paragraphs: [
        "Earth's oceans hold 97% of its water, average about 3.7 km deep and reach nearly 11 km in the Mariana Trench. They store and move enormous amounts of heat: currents like the Gulf Stream carry warmth toward the poles, and the oceans have absorbed most of the extra heat from recent climate change. Water evaporates, condenses into clouds and falls as rain or snow in a cycle that shapes every landscape through erosion.",
        "Weather is driven by the uneven heating of a spinning planet. Warm air rises at the equator, sinks in the subtropics and sets up global wind belts, twisted by the Coriolis effect into trade winds, westerlies and spiralling storms. Hurricanes can release energy equivalent to hundreds of times the world's electricity generation, and lightning strikes about 40 to 50 times per second worldwide. Earth is the only planet where rain is made of water.",
        "The surface is home to an estimated 8.7 million species of eukaryotes, plus uncounted trillions of microbes, living everywhere from boiling deep-sea vents to Antarctic rock. Life has reshaped the planet: cyanobacteria filled the air with oxygen about 2.4 billion years ago in the Great Oxidation Event, plants carpeted the continents about 470 million years ago, and human activity now moves more rock and soil each year than all the world's rivers.",
      ],
    },
    {
      title: "The Moon",
      paragraphs: [
        "Earth has one natural satellite, the Moon, and relative to its planet it is the largest moon in the solar system: about a quarter of Earth's diameter. It formed about 4.5 billion years ago, most likely when a Mars-sized body called Theia struck the young Earth and the splashed-out debris coalesced in orbit. Moon rocks brought back by Apollo share Earth's chemical fingerprints, supporting this giant-impact theory.",
        "The Moon's gravity raises the tides, which are gradually slowing Earth's spin (days were about 22 hours long when the dinosaurs lived) and pushing the Moon away by 3.8 cm a year, a rate measured by bouncing lasers off reflectors left by Apollo astronauts. The Moon also keeps Earth's axial tilt stable at about 23.4°; without it, the tilt might wander chaotically and the climate with it.",
        "Twelve people walked on the Moon between 1969 and 1972. Humanity is now going back: Artemis II carried four astronauts around the Moon in April 2026, the first crewed lunar flight since Apollo 17. NASA plans Artemis III in 2027 as an Earth-orbit test with commercial landers, followed by crewed landings near the lunar south pole targeted for 2028. China aims to land its own astronauts before 2030, and robotic landers from the US, China, Japan and India have reached the surface in recent years.",
      ],
      highlight: "Artemis II flew four astronauts around the Moon in April 2026, the first crewed lunar mission in more than 50 years.",
    },
    {
      title: "Exploring Earth from space",
      paragraphs: [
        "The space age turned Earth into a planet we could study whole. The first weather satellite, TIROS-1, flew in 1960, and today a fleet of more than 1,000 Earth-observation satellites tracks storms, sea level, ice sheets, wildfires, crops, air pollution and the slow creep of the continents. Landsat has photographed the entire land surface continuously since 1972, and ESA's Copernicus Sentinels provide free radar and optical images every few days.",
        "Some of the most important measurements are the subtle ones. The GRACE satellites weigh groundwater and melting ice by sensing tiny changes in gravity. Radar altimeters have tracked sea level rising about 10 cm since 1993. NASA's PACE satellite, launched in 2024, watches ocean plankton and aerosols, and the NISAR radar satellite, launched by NASA and India's ISRO in July 2025, maps changes in the ground to within a centimetre.",
        "Humans have lived in orbit continuously since November 2000 aboard the International Space Station, and China's Tiangong station has been permanently crewed since 2022. Around 700 people have flown to space so far. The ISS is due to be retired around 2030, with commercial stations intended to replace it.",
      ],
    },
    {
      title: "Name, myth and history",
      paragraphs: [
        "Earth is the only planet whose English name does not come from Greek or Roman mythology. It derives from the Old English 'eorthe' and Germanic words simply meaning 'ground' or 'soil'. The Greeks personified it as the goddess Gaia, the Romans as Terra, and the scientific adjective 'terrestrial' still comes from the Latin.",
        "For most of history people did not think of Earth as a planet at all; planets were the wandering lights in the sky, and Earth was the fixed stage beneath them. The Greek scholar Eratosthenes measured its circumference around 240 BCE using shadows in two Egyptian cities and got remarkably close to the modern value of 40,075 km. It was Copernicus in 1543 who moved Earth from the centre of the cosmos and made it the third of the Sun's planets.",
        "Earth's age was settled only in the 20th century. Radiometric dating of meteorites and the oldest minerals, tiny zircon crystals from Australia, gives an age of about 4.54 billion years. The first photographs of the whole Earth from space, especially Apollo 8's 'Earthrise' in 1968 and Apollo 17's 'Blue Marble' in 1972, helped launch the modern environmental movement.",
      ],
    },
    {
      title: "What you'd experience there",
      paragraphs: [
        "You already know. But try to see it as a visitor would. The sky is blue because air molecules scatter short-wavelength sunlight; sunsets are red for the same reason. Gravity holds you at 9.81 m/s². The air is dense enough to carry sound, fly birds and burn up most incoming meteoroids before they land. A day lasts 24 hours and, because the axis is tilted 23.4°, the length of daylight swings through the year, giving seasons.",
        "The temperature ranges from −89 °C recorded in Antarctica to 57 °C in Death Valley, but averages a mild 15 °C, and almost everywhere it is possible to find liquid water. From the surface, Earth's own Moon is the most obvious object in the night sky, and five other planets are visible to the naked eye. From orbit, astronauts describe the atmosphere as an impossibly thin blue line, and many report a shift in perspective, the 'overview effect', on seeing the whole planet with no borders.",
      ],
      highlight: "Seen from orbit, the atmosphere that keeps us alive is a blue line thinner than the skin on an apple.",
    },
  ],
  layers: [
    {
      name: "Inner core",
      description: "A solid ball of iron and nickel, as hot as the Sun's surface but kept solid by crushing pressure.",
      color: "#fff3b0",
      radiusFraction: 0.19,
      detail: "Solid iron-nickel, ~1,220 km radius, ~5,400 °C",
    },
    {
      name: "Outer core",
      description: "Molten iron and nickel whose churning flow generates Earth's magnetic field.",
      color: "#f5a623",
      radiusFraction: 0.55,
      detail: "Liquid iron-nickel, ~2,260 km thick, 4,000 to 5,000 °C",
    },
    {
      name: "Lower mantle",
      description: "Hot, dense silicate rock that flows very slowly over millions of years.",
      color: "#d0561c",
      radiusFraction: 0.895,
      detail: "Solid but flowing silicate rock, ~2,200 km thick",
    },
    {
      name: "Upper mantle",
      description: "Includes the partly molten asthenosphere on which the tectonic plates slide.",
      color: "#a24a2a",
      radiusFraction: 0.995,
      detail: "Peridotite rock, ~660 km thick",
    },
    {
      name: "Crust",
      description: "The thin, rigid outer shell: basalt under the oceans, granite-rich rock in the continents.",
      color: "#2468d6",
      radiusFraction: 1,
      detail: "5 to 70 km thick; surface averages 15 °C",
    },
  ],
  timeline: [
    { year: "c. 240 BCE", title: "Eratosthenes measures the Earth", detail: "Using the angle of the Sun's shadow in two Egyptian cities, he estimates Earth's circumference to within a few percent." },
    { year: "1543", title: "Earth becomes a planet", detail: "Copernicus publishes his heliocentric model, placing the Earth in orbit around the Sun." },
    { year: "1957", title: "Sputnik 1", detail: "The Soviet Union launches the first artificial satellite, opening the space age." },
    { year: "1961", title: "First human in space", detail: "Yuri Gagarin orbits Earth once aboard Vostok 1 on 12 April 1961." },
    { year: "1968", title: "'Earthrise'", detail: "Apollo 8 astronauts become the first humans to leave Earth orbit and photograph the whole planet rising over the Moon." },
    { year: "1969", title: "Apollo 11", detail: "Neil Armstrong and Buzz Aldrin walk on the Moon; Michael Collins orbits above." },
    { year: "1972", title: "Landsat begins", detail: "The first Landsat satellite starts what is now the longest continuous record of Earth's land surface from space." },
    { year: "2000", title: "Permanent presence in orbit", detail: "The first long-duration crew boards the International Space Station on 2 November 2000; it has been occupied ever since." },
    { year: "2022", title: "Artemis I", detail: "NASA's uncrewed Orion capsule flies around the Moon on the first launch of the Space Launch System." },
    { year: "2025", title: "NISAR launched", detail: "The joint NASA and ISRO radar satellite launches on 30 July 2025 to map centimetre-scale changes in Earth's surface." },
    { year: "2026", title: "Artemis II", detail: "Astronauts Reid Wiseman, Victor Glover, Christina Koch and Jeremy Hansen fly around the Moon (1 to 10 April), travelling farther from Earth than any humans before them." },
    { year: "2027–28", title: "Return to the surface", detail: "Artemis III is planned as an Earth-orbit test with commercial landers in 2027, with crewed lunar landings targeted for 2028." },
  ],
  comparisons: [
    { label: "Diameter", value: 12742, earth: 12742, unit: "km" },
    { label: "Mass", value: 1, earth: 1, unit: "× Earth" },
    { label: "Surface gravity", value: 9.81, earth: 9.81, unit: "m/s²" },
    { label: "Rotation period", value: 23.93, earth: 23.93, unit: "hours" },
    { label: "Year length", value: 365.25, earth: 365.25, unit: "Earth days" },
    { label: "Mean distance from Sun", value: 149.6, earth: 149.6, unit: "million km" },
    { label: "Mean temperature", value: 15, earth: 15, unit: "°C" },
    { label: "Escape velocity", value: 11.19, earth: 11.19, unit: "km/s" },
  ],
  moons: [
    {
      name: "Moon",
      radiusKm: 1737.4,
      description: "Earth's only natural satellite, a quarter of Earth's width, probably formed from debris after a giant impact 4.5 billion years ago. It stabilises our axial tilt and drives the tides.",
    },
  ],
  quiz: [
    {
      prompt: "Which layer of Earth generates its magnetic field?",
      options: ["The solid inner core", "The liquid outer core", "The mantle", "The crust"],
      answer: "The liquid outer core",
      explanation: "The slow churning of molten iron in the outer core, twisted by Earth's rotation, acts as a dynamo. The field it produces deflects the solar wind and creates the auroras.",
    },
    {
      prompt: "Why does Earth's atmosphere contain so much oxygen?",
      options: [
        "It was delivered by comets",
        "Volcanoes release it",
        "Living things produce it through photosynthesis",
        "It is left over from the planet's formation",
      ],
      answer: "Living things produce it through photosynthesis",
      explanation: "Oxygen is so reactive that it would disappear from the air in a few million years if photosynthesis stopped. Its abundance is a signature of life.",
    },
    {
      prompt: "What causes Earth's seasons?",
      options: [
        "Earth's changing distance from the Sun",
        "The 23.4° tilt of Earth's axis",
        "The Moon blocking sunlight",
        "Changes in the Sun's brightness",
      ],
      answer: "The 23.4° tilt of Earth's axis",
      explanation: "As Earth orbits, first one hemisphere and then the other leans toward the Sun, changing the angle and duration of sunlight. Earth is actually closest to the Sun in early January, during northern winter.",
    },
    {
      prompt: "Which mission carried astronauts around the Moon in April 2026?",
      options: ["Apollo 18", "Artemis I", "Artemis II", "Artemis III"],
      answer: "Artemis II",
      explanation: "Artemis II launched on 1 April 2026 with a crew of four and looped around the Moon before splashing down on 10 April, the first crewed lunar flight since Apollo 17 in 1972.",
    },
    {
      prompt: "Roughly how old is the Earth?",
      options: ["4.5 million years", "450 million years", "4.5 billion years", "13.8 billion years"],
      answer: "4.5 billion years",
      explanation: "Radiometric dating of meteorites and the oldest zircon crystals gives an age of about 4.54 billion years. The universe itself is about 13.8 billion years old.",
    },
  ],
  glossary: [
    { term: "Plate tectonics", definition: "The slow movement of Earth's rigid outer plates, which builds mountains, causes earthquakes and recycles the crust. No other planet is known to have it." },
    { term: "Habitable zone", definition: "The range of distances from a star where a planet could keep liquid water on its surface. Earth sits comfortably inside the Sun's." },
    { term: "Magnetosphere", definition: "The region around Earth shaped by its magnetic field, which deflects most of the solar wind and funnels some particles to the poles as auroras." },
    { term: "Axial tilt (obliquity)", definition: "The angle between a planet's spin axis and its orbit. Earth's 23.4° tilt causes the seasons." },
    { term: "Greenhouse gas", definition: "A gas such as carbon dioxide, methane or water vapour that traps heat radiated by the surface, warming the planet." },
    { term: "Giant-impact hypothesis", definition: "The leading explanation for the Moon's origin: a Mars-sized body struck the young Earth and the debris formed the Moon." },
    { term: "Kármán line", definition: "The altitude of 100 km conventionally taken as the boundary between Earth's atmosphere and space." },
    { term: "Lithosphere", definition: "Earth's rigid outer layer, comprising the crust and the uppermost mantle, which is broken into tectonic plates." },
  ],
  sources: [
    { title: "NASA Earth Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html" },
    { title: "NASA Science: Earth", url: "https://science.nasa.gov/earth/" },
    { title: "NASA Science: Earth's Moon", url: "https://science.nasa.gov/moon/" },
    { title: "NASA: Artemis II", url: "https://www.nasa.gov/mission/artemis-ii/" },
    { title: "NASA Climate: Vital Signs", url: "https://climate.nasa.gov/vital-signs/carbon-dioxide/" },
    { title: "ESA: Copernicus Sentinel missions", url: "https://www.esa.int/Applications/Observing_the_Earth/Copernicus" },
  ],
};
