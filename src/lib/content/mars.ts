import type { PlanetContent } from "./types";

export const mars: PlanetContent = {
  id: "mars",
  tagline: "A cold desert world that once had rivers and lakes, and may once have had life.",
  intro: [
    "Mars is the fourth planet from the Sun and the outermost of the rocky worlds, about half Earth's diameter and one-tenth its mass. Its reddish colour, obvious even to the naked eye, comes from iron oxide, ordinary rust, in the dust and rock that cover its surface. It has polar ice caps, seasons, volcanoes, canyons and a day just 40 minutes longer than ours, which makes it feel more familiar than any other planet, and it is the most visited world beyond the Moon.",
    "Yet Mars today is a frozen desert. Its thin carbon-dioxide atmosphere has less than 1% of Earth's surface pressure, far too little to let liquid water survive, and the average temperature is −65 °C. The rovers and orbiters we have sent there tell a different story about the past: three to four billion years ago, water carved valleys, filled lakes and deltas, and left behind clays and minerals that only form when rock is soaked for a long time.",
    "That history is why Mars is the focus of the search for life beyond Earth. NASA's Perseverance rover has been drilling and caching samples in the ancient lakebed of Jezero Crater since 2021, and in 2025 NASA announced that one of them, from a rock nicknamed Cheyava Falls, contains features that could be a potential biosignature. Confirming that will probably require bringing the samples home, a goal now pursued by both NASA and China.",
  ],
  sections: [
    {
      title: "Structure and interior",
      paragraphs: [
        "For decades Mars's interior was a matter of inference; then NASA's InSight lander placed a seismometer on the surface in 2018 and recorded more than 1,300 marsquakes before its mission ended in 2022. By timing seismic waves that travelled through the planet, scientists found that Mars has a liquid iron core with a radius of roughly 1,650 to 1,830 km, about half the planet's radius, and lighter than expected, meaning it contains a large share of sulphur and other light elements.",
        "Later analysis suggested a layer of molten silicate rock, perhaps 150 km thick, wraps around the core, which would explain why the core had seemed so large. Above that is a rocky mantle, and then a crust between about 24 and 72 km thick, thinner in the northern lowlands and thicker in the southern highlands. This 'crustal dichotomy', with the smooth low north and rugged high south, is one of Mars's defining features and may be the scar of a colossal early impact.",
        "Mars has no global magnetic field today, but patches of its crust are strongly magnetised, evidence that a dynamo operated in the first few hundred million years and then shut down as the small planet's core cooled. Without that magnetic shield, the solar wind has been stripping the atmosphere ever since, a process NASA's MAVEN orbiter has measured directly.",
      ],
      highlight: "InSight's seismometer revealed a liquid core about half the planet's radius, wrapped in a layer of molten rock.",
    },
    {
      title: "A thin, cold atmosphere",
      paragraphs: [
        "The Martian atmosphere is about 95% carbon dioxide, 2.7% nitrogen and 1.6% argon, with traces of oxygen and water vapour. Its surface pressure averages about 6 millibars, less than 1% of Earth's and roughly what you would find 35 km up in our own atmosphere. At that pressure, liquid water boils away or freezes almost immediately; it can exist only briefly as brine in the very lowest, warmest places.",
        "Despite its thinness, the atmosphere produces real weather. Clouds of water ice form over the volcanoes and at high altitude; frost coats the ground on cold mornings; and dust devils, some kilometres tall, wander across the plains, occasionally cleaning the solar panels of grateful rovers. Winds rarely exceed 100 km/h, and because the air is so thin they carry little force, but they lift enormous amounts of fine dust.",
        "Every few Martian years a regional dust storm grows until it engulfs the whole planet, hiding the surface for weeks. The global storm of 2018 blocked so much sunlight that NASA's solar-powered Opportunity rover fell silent after 14 years of operation. Mars also has seasons, because its axis is tilted 25°, similar to Earth's, but they are uneven: its elliptical orbit makes southern summers short and hot, northern summers long and cool.",
      ],
    },
    {
      title: "Surface: the biggest volcano and canyon in the solar system",
      paragraphs: [
        "Mars is a planet of superlatives. Olympus Mons, a shield volcano built up by countless lava flows, stands about 22 km high, nearly two and a half times the height of Mount Everest, and is roughly 600 km across, so wide that its slopes are barely noticeable from the summit. Nearby, three more giant volcanoes line the Tharsis bulge. Valles Marineris, a system of canyons up to 7 km deep, stretches about 4,000 km, the width of the United States; it is a rift in the crust, cracked open as Tharsis swelled.",
        "The southern hemisphere is heavily cratered and ancient, including the Hellas impact basin, 2,300 km wide and 7 km deep. The north is smoother and lower, and may once have held an ocean. Winding valley networks, river deltas like the one in Jezero Crater, and layered lake sediments explored by the Curiosity rover in Gale Crater all show that water flowed freely more than 3 billion years ago, when the atmosphere was thicker and the climate warmer.",
        "Both poles carry permanent caps of water ice, with a seasonal layer of frozen carbon dioxide that grows and shrinks each year; up to a quarter of the atmosphere freezes onto the winter pole and sublimates back in spring. Radar from orbit has found vast amounts of water ice buried in the mid-latitudes as well, a resource future explorers could drink, breathe and turn into rocket fuel.",
      ],
      highlight: "Olympus Mons is about 22 km high and 600 km across: a mountain the size of Arizona.",
    },
    {
      title: "Moons",
      paragraphs: [
        "Mars has two small, lumpy moons, Phobos and Deimos, discovered by Asaph Hall in 1877 and named after the sons of the Greek war god Ares: Fear and Panic. Phobos is about 22 km across and orbits only 6,000 km above the surface, closer than any other moon to its planet, circling Mars three times a day, so fast that it rises in the west and sets in the east. Deimos, half the size, orbits further out and takes 30 hours to go round.",
        "Both are dark and cratered, resembling carbon-rich asteroids, but their nearly circular orbits above Mars's equator are hard to explain by capture. An alternative is that they formed from debris thrown up by a giant impact, like Earth's Moon. Phobos is being pulled closer by tidal forces about 2 cm a year and will either crash into Mars or break up into a ring within about 50 million years.",
        "Japan's MMX mission, scheduled to launch on 20 October 2026, will orbit Mars, land on Phobos to scoop up a sample and return it to Earth in 2031, which should finally settle where the moons came from.",
      ],
    },
    {
      title: "Exploration and missions",
      paragraphs: [
        "More than half of all missions to Mars have failed, but the successes have transformed it from a blurry disc into a mapped, sampled world. Mariner 4's flyby in 1965 sent the first close-up pictures, revealing a cratered surface that dashed hopes of a living planet. Mariner 9 became the first spacecraft to orbit another planet in 1971 and discovered the giant volcanoes and canyons. The twin Viking landers of 1976 searched for life with ambiguous results, and Pathfinder's little Sojourner rover in 1997 proved that roving on Mars was possible.",
        "The 21st century has been the age of the rovers. Spirit and Opportunity (2004) found evidence of past water; Curiosity, in Gale Crater since 2012, showed that an ancient lake was habitable and in 2026 completed a 1-km climb up Mount Sharp. Perseverance landed in Jezero Crater in February 2021 with the Ingenuity helicopter, which made 72 flights, the first powered flights on another world, before a rotor broke in January 2024. Perseverance has cached over 30 sealed sample tubes, including the potential biosignature rock announced in September 2025, and continues exploring the crater rim.",
        "Orbiters from NASA, ESA, India, the UAE and China keep watch overhead, and China's Zhurong rover drove across Utopia Planitia in 2021 and 2022. NASA's twin ESCAPADE probes, launched in November 2025, will swing past Earth in November 2026 on their way to study how the solar wind strips the atmosphere. ESA's Rosalind Franklin rover, built to drill 2 m underground, is planned for launch in 2028, the same year China aims to launch Tianwen-3, a sample-return mission targeting 2031. NASA's own Mars Sample Return has been scaled back amid budget cuts and its future is uncertain. Crewed landings remain a long-term aspiration.",
      ],
      highlight: "Perseverance's 'Sapphire Canyon' sample, drilled in 2024, holds the strongest hint yet of ancient Martian life, but proof awaits a laboratory on Earth.",
    },
    {
      title: "Name, myth and history",
      paragraphs: [
        "Because of its blood-red colour, Mars has been linked with war and violence across many cultures. The Babylonians called it Nergal, the Greeks Ares, and the Romans Mars, after their god of war; the month of March is named after him. In Chinese, Japanese and Korean astronomy it is the 'fire star'. Its two moons, Phobos and Deimos, complete the warlike theme.",
        "Mars's looping path across the sky puzzled astronomers for centuries and was ultimately what led Johannes Kepler, using Tycho Brahe's careful observations, to discover in 1609 that planets move in ellipses rather than circles. In 1877 Giovanni Schiaparelli mapped dark lines he called 'canali' (channels), which was mistranslated into English as 'canals'. Percival Lowell built an observatory in Arizona to study them and popularised the idea of a dying civilisation irrigating a desert planet, inspiring H. G. Wells's 'The War of the Worlds'.",
        "The canals turned out to be optical illusions, and Mariner 4's 1965 photographs of a cratered, Moon-like surface seemed to end the dream of Martians altogether. Later missions revived it in a more careful form: not canals, but ancient rivers; not civilisations, but perhaps microbes, billions of years ago.",
      ],
    },
    {
      title: "What you'd experience there",
      paragraphs: [
        "On Mars you would weigh about 38% of your Earth weight, so you could jump nearly three times as high, but you could not take off your helmet. The air is unbreathable and so thin that your blood would boil at body temperature within minutes. Temperatures on a summer afternoon at the equator can reach 20 °C, but drop to −70 °C or lower the same night, and the average is −65 °C.",
        "The sky is not blue but a butterscotch tan, coloured by suspended dust, and, in a reversal of Earth, the sunset glows blue around the Sun. The Sun itself appears about two-thirds the size it does from Earth and less than half as bright. Earth would be visible as a bright blue 'evening star', and Phobos would cross the sky twice a night, sometimes passing in front of the Sun in a brief partial eclipse.",
        "A Martian day, called a sol, lasts 24 hours 39 minutes, so a human's body clock would adjust easily; rover teams on Earth have famously lived on 'Mars time' for months. A year is 687 Earth days, and because Mars and Earth line up only every 26 months, a return trip would mean a stay of at least a year and a half. Fine, sharp, toxic dust that gets into everything would be the everyday enemy of anyone living there.",
      ],
      highlight: "On Mars the daytime sky is tan and sunsets are blue: the dust scatters light the opposite way to Earth's air.",
    },
  ],
  layers: [
    {
      name: "Liquid core",
      description: "A molten iron core rich in sulphur, smaller and lighter than Earth's. Its dynamo died early, and Mars lost its magnetic shield.",
      color: "#ffd27a",
      radiusFraction: 0.5,
      detail: "Liquid iron with sulphur and other light elements, ~1,650 to 1,830 km radius",
    },
    {
      name: "Molten silicate layer",
      description: "A layer of partly molten rock at the base of the mantle, inferred from InSight's marsquake data.",
      color: "#e8823c",
      radiusFraction: 0.55,
      detail: "Molten silicate, ~150 km thick",
    },
    {
      name: "Mantle",
      description: "Solid silicate rock that once fed the giant Tharsis volcanoes.",
      color: "#a34a22",
      radiusFraction: 0.985,
      detail: "Silicate rock, ~1,500 km thick",
    },
    {
      name: "Crust",
      description: "Basaltic rock coated in iron-oxide dust; thin in the northern lowlands, thick in the southern highlands.",
      color: "#c1562d",
      radiusFraction: 1,
      detail: "24 to 72 km thick; surface averages −65 °C",
    },
  ],
  timeline: [
    { year: "1609", title: "Kepler's ellipses", detail: "Using Tycho Brahe's observations of Mars, Kepler shows that planets travel in elliptical orbits." },
    { year: "1877", title: "Two moons and 'canals'", detail: "Asaph Hall discovers Phobos and Deimos; Schiaparelli maps 'canali' that spark decades of speculation about Martians." },
    { year: "1965", title: "Mariner 4 flyby", detail: "The first close-up images of Mars show a cratered, apparently dead surface." },
    { year: "1971", title: "Mariner 9 in orbit", detail: "The first spacecraft to orbit another planet maps Mars and reveals Olympus Mons and Valles Marineris." },
    { year: "1976", title: "Viking landers", detail: "Viking 1 and 2 make the first successful landings on Mars and run experiments searching for life." },
    { year: "1997", title: "Sojourner rover", detail: "Mars Pathfinder lands with the first rover, the 10-kg Sojourner, which explores for 83 days." },
    { year: "2004", title: "Spirit and Opportunity", detail: "The twin rovers land and find minerals that formed in water; Opportunity operates until 2018." },
    { year: "2012", title: "Curiosity lands", detail: "The car-sized rover touches down in Gale Crater via 'sky crane' and finds evidence of an ancient habitable lake." },
    { year: "2018–22", title: "InSight listens for quakes", detail: "The lander's seismometer detects over 1,300 marsquakes and maps the planet's core, mantle and crust." },
    { year: "2021", title: "Perseverance and Ingenuity", detail: "NASA's rover lands in Jezero Crater on 18 February; Ingenuity makes the first powered flight on another planet on 19 April. China's Zhurong rover lands in May." },
    { year: "2025", title: "A potential biosignature", detail: "NASA announces that Perseverance's Sapphire Canyon sample contains chemical and mineral patterns that may be a sign of ancient life; the ESCAPADE probes launch in November." },
    { year: "2026", title: "MMX sets off for Phobos", detail: "Japan's Martian Moons eXploration mission is scheduled to launch on 20 October 2026 to return a sample from Phobos by 2031." },
  ],
  comparisons: [
    { label: "Diameter", value: 6779, earth: 12742, unit: "km" },
    { label: "Mass", value: 0.107, earth: 1, unit: "× Earth" },
    { label: "Surface gravity", value: 3.71, earth: 9.81, unit: "m/s²" },
    { label: "Rotation period", value: 24.62, earth: 23.93, unit: "hours" },
    { label: "Year length", value: 686.98, earth: 365.25, unit: "Earth days" },
    { label: "Mean distance from Sun", value: 228.0, earth: 149.6, unit: "million km" },
    { label: "Mean temperature", value: -65, earth: 15, unit: "°C" },
    { label: "Escape velocity", value: 5.03, earth: 11.19, unit: "km/s" },
  ],
  moons: [
    {
      name: "Phobos",
      radiusKm: 11.1,
      description: "The larger, inner moon, orbiting just 6,000 km above the surface three times a day. It is spiralling inward and will be torn apart within about 50 million years.",
    },
    {
      name: "Deimos",
      radiusKm: 6.2,
      description: "The smaller, outer moon, smoother than Phobos and orbiting every 30 hours. From Mars it would look like a bright star.",
    },
  ],
  quiz: [
    {
      prompt: "What gives Mars its red colour?",
      options: ["Volcanic sulphur", "Iron oxide (rust) in its dust and rock", "Red algae", "Light scattered by its thick atmosphere"],
      answer: "Iron oxide (rust) in its dust and rock",
      explanation: "Iron-rich minerals on the surface have oxidised over billions of years, coating the planet in fine rusty dust that also tints the sky.",
    },
    {
      prompt: "Why can't liquid water survive on the surface of Mars today?",
      options: [
        "There is no water at all on Mars",
        "The atmosphere is too thin and the surface too cold, so water freezes or boils away",
        "The surface is too hot",
        "The strong magnetic field breaks water apart",
      ],
      answer: "The atmosphere is too thin and the surface too cold, so water freezes or boils away",
      explanation: "At less than 1% of Earth's air pressure and an average of −65 °C, water can only exist as ice or vapour. Mars has plenty of ice at its poles and underground.",
    },
    {
      prompt: "Which of these is the tallest volcano in the solar system?",
      options: ["Mauna Kea", "Maxwell Montes", "Olympus Mons", "Mount Sharp"],
      answer: "Olympus Mons",
      explanation: "Olympus Mons rises about 22 km above the surrounding plains, nearly two and a half times the height of Mount Everest, and is about 600 km wide.",
    },
    {
      prompt: "What was the first powered aircraft to fly on another planet?",
      options: ["Sojourner", "Ingenuity", "Dragonfly", "Zhurong"],
      answer: "Ingenuity",
      explanation: "The Ingenuity helicopter, carried to Mars by Perseverance, made its first flight on 19 April 2021 and completed 72 flights before a rotor was damaged in January 2024.",
    },
    {
      prompt: "How does the length of a Martian day (a sol) compare with an Earth day?",
      options: ["It is about half as long", "It is about 40 minutes longer", "It is about twice as long", "It is 59 Earth days long"],
      answer: "It is about 40 minutes longer",
      explanation: "A sol lasts 24 hours 39 minutes. Mars's year, however, is almost twice as long as Earth's at 687 days.",
    },
  ],
  glossary: [
    { term: "Sol", definition: "One Martian solar day, lasting 24 hours 39 minutes." },
    { term: "Biosignature", definition: "Any feature, chemical or pattern that could only, or most plausibly, have been made by life." },
    { term: "Marsquake", definition: "A quake on Mars, caused by the crust cracking as the planet cools or by meteorite impacts. InSight recorded over 1,300." },
    { term: "Crustal dichotomy", definition: "The striking difference between Mars's smooth, low northern hemisphere and its rugged, high, cratered south." },
    { term: "Dust devil", definition: "A spinning column of dust lifted by warm rising air; on Mars they can be kilometres tall." },
    { term: "Sample caching", definition: "Sealing rock cores in tubes on the surface, as Perseverance does, for a later mission to collect and return to Earth." },
    { term: "Sublimation", definition: "Turning directly from solid to gas without melting, as carbon-dioxide frost does on Mars each spring." },
    { term: "Launch window", definition: "The period, every 26 months for Mars, when Earth and Mars are positioned so that a spacecraft can travel between them efficiently." },
  ],
  sources: [
    { title: "NASA Mars Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html" },
    { title: "NASA Science: Mars", url: "https://science.nasa.gov/mars/" },
    { title: "NASA JPL: Perseverance potential biosignature announcement", url: "https://www.jpl.nasa.gov/news/nasa-says-mars-rover-discovered-potential-biosignature-last-year/" },
    { title: "NASA Science: InSight mission", url: "https://science.nasa.gov/mission/insight/" },
    { title: "JAXA: Martian Moons eXploration (MMX)", url: "https://www.mmx.jaxa.jp/en/" },
    { title: "ESA: Rosalind Franklin rover", url: "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Exploration/ExoMars" },
  ],
};
