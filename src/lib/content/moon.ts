import type { PlanetContent } from "./types";

export const moon: PlanetContent = {
  id: "moon",
  tagline: "Earth's constant companion: the only other world people have walked on, and the next one we are going back to.",
  intro: [
    "The Moon is Earth's only natural satellite and, after the Sun, the brightest object in our sky. With a diameter of 3,475 km it is a little over a quarter of Earth's width, an unusually large moon for a planet of Earth's size, and it orbits at an average distance of 384,400 km, far enough that all the other planets would fit side by side in the gap. It takes 27.3 days to circle Earth and exactly the same time to turn once on its axis, which is why we only ever see one face.",
    "The Moon is an airless, cratered world of grey rock and dust, with no weather, no liquid water and a surface that swings from about 120 °C at noon to −170 °C at night. But it is far from dull. Its dark 'seas' are vast plains of ancient lava, its bright highlands record the earliest bombardment of the solar system, and its shadowed polar craters hold ice that may one day supply drinking water and rocket fuel. It shapes life on Earth too, driving the ocean tides and steadying the tilt of Earth's axis.",
    "Twelve astronauts walked on the Moon between 1969 and 1972, and more than a hundred robotic spacecraft have been sent there. After a long lull, the Moon is busy again: China has returned samples from the far side, India and Japan have landed, commercial landers are arriving under NASA's CLPS programme, and in April 2026 the Artemis II crew flew around the Moon, the first people to leave low Earth orbit in more than 50 years.",
  ],
  sections: [
    {
      title: "Structure and interior",
      paragraphs: [
        "The Moon is the only world besides Earth whose interior has been probed by a seismic network. Apollo astronauts left seismometers that recorded thousands of moonquakes between 1969 and 1977, and reanalysis of that data in 2011, combined with gravity mapping by NASA's twin GRAIL spacecraft in 2012 and decades of laser ranging to the Apollo reflectors, gives a fairly detailed picture. At the centre is a small solid inner core of iron about 240 km in radius, surrounded by a liquid iron-rich outer core out to about 330 km. That whole core is only about 20% of the Moon's radius, compared with more than 50% for Earth's, and it makes up just 1 to 2% of the Moon's mass.",
        "Around the core lies a layer of partly molten rock, perhaps 150 km thick, and above that a solid silicate mantle extending most of the way to the surface. The crust averages about 40 km thick on the near side and up to 60 km on the far side; that lopsidedness is one reason the far side has so few dark lava plains, since magma had further to rise. Because the Moon is small and cooled quickly, it has been geologically quiet for billions of years, though shallow moonquakes still occur as the crust shrinks and cracks, and deep quakes are triggered every month by Earth's tides.",
        "The Moon has no global magnetic field today, but magnetised rocks show it had one billions of years ago, when the core was hotter and churning. The leading explanation for the Moon itself is the giant-impact hypothesis: about 4.5 billion years ago a Mars-sized body, often called Theia, struck the young Earth, and the Moon coalesced from the ring of molten debris. That accounts for its small iron core, its chemistry, which closely matches Earth's mantle, and the ancient magma ocean whose frozen scum became the bright highland crust.",
      ],
      highlight: "Apollo seismometers and GRAIL gravity data reveal a small iron core, solid inside and liquid outside, only about a fifth of the Moon's radius.",
    },
    {
      title: "Surface and geology",
      paragraphs: [
        "Two kinds of terrain make the familiar face of the Moon. The bright highlands are the original crust, made of a light rock called anorthosite that floated to the top of the magma ocean, and they are saturated with craters from the heavy bombardment of the first 700 million years. The dark patches, the maria (Latin for 'seas'), are plains of basalt lava that flooded giant impact basins mostly between about 3 and 4 billion years ago. They cover about 16% of the surface, nearly all of it on the near side; the far side, first photographed by the Soviet Luna 3 in 1959, is almost entirely rugged highland.",
        "The largest and oldest impact scar is the South Pole–Aitken basin on the far side, roughly 2,500 km across and about 8 km deep, from which China's Chang'e 6 returned the first far-side samples in 2024. Young craters such as Tycho, about 108 million years old, still show bright rays of ejecta streaking across the surface. Everything is blanketed in regolith, a layer of pulverised rock and glassy dust metres thick, ground up by billions of years of micrometeorite impacts. It is sharp, clingy and abrasive, and it plagued the Apollo astronauts' suits and equipment.",
        "The Moon has water, but not much and not in obvious places. Water molecules are bound in minerals across the surface in tiny amounts, confirmed by NASA's SOFIA airborne observatory in 2020, and far larger deposits of water ice survive in permanently shadowed craters near the poles, where temperatures stay below −200 °C. NASA's LCROSS impact in 2009 found ice at the south pole, and that ice is the main reason both NASA's Artemis programme and China's planned base are aimed at the south polar region. Samples returned by Chang'e 5 in 2020 also showed that volcanism continued until about 2 billion years ago, far later than anyone expected.",
      ],
      highlight: "The dark 'seas' are ancient lava plains, and the far side, which we never see from Earth, has almost none of them.",
    },
    {
      title: "Almost no atmosphere",
      paragraphs: [
        "The Moon's gravity, one-sixth of Earth's, is too weak to hold a real atmosphere. What it has is an exosphere so thin that its atoms almost never collide: a few hundred thousand particles per cubic centimetre, compared with about 10 million million million in a breath of Earth's air. It consists of helium, neon and argon leaking from the interior and delivered by the solar wind, plus traces of sodium and potassium knocked off the surface by sunlight and micrometeorites. Each Apollo landing briefly added more gas than the whole exosphere contained.",
        "With no air, there is no sound, no wind, no weather and no protection. The sky is black even in daytime, the stars do not twinkle, and cosmic rays and solar-flare particles reach the surface unfiltered, a serious hazard for long stays. The lack of atmosphere also means nothing erodes: the Apollo astronauts' footprints and rover tracks will remain for millions of years, slowly softened only by micrometeorite rain.",
      ],
    },
    {
      title: "Tides, phases and the same face",
      paragraphs: [
        "The Moon's gravity pulls the near side of Earth's oceans towards it and, in effect, pulls Earth away from the far-side oceans, producing two tidal bulges that sweep around the planet as it rotates. Those tides drag against the seabed and slow Earth's spin by about 2 milliseconds per century, and the same interaction pushes the Moon outward by about 3.8 cm a year, a figure measured precisely by bouncing lasers off the reflectors Apollo astronauts left behind. Long ago the Moon was much closer, and Earth's day was much shorter.",
        "Earth's tides worked on the Moon too, and long ago locked its rotation so that it turns exactly once per orbit. From Earth we therefore see the same hemisphere, though small wobbles called librations let us glimpse about 59% of the surface over time. The Moon has no light of its own: its phases, from new to full and back every 29.5 days, are simply the changing amount of its sunlit half that faces us, and the 'dark side' is no darker than the near side; it just faces away from Earth.",
        "The Moon has no moons of its own. Anything orbiting it is quickly perturbed by Earth's gravity and by the lumpy gravity of the Moon itself, whose buried dense masses, the mascons, make low lunar orbits unstable within months unless they are carefully chosen.",
      ],
      highlight: "The Moon is drifting away by about 3.8 cm a year, measured by laser beams bounced off mirrors left by Apollo astronauts.",
    },
    {
      title: "Exploration: from Apollo to Artemis",
      paragraphs: [
        "The Soviet Union reached the Moon first: Luna 2 crashed into it in September 1959, Luna 3 photographed the far side a month later, and Luna 9 made the first soft landing in February 1966. The United States answered with Apollo. Neil Armstrong and Buzz Aldrin stepped onto the Sea of Tranquillity on 20 July 1969, and six Apollo missions landed twelve astronauts in all, the last, Apollo 17, in December 1972. They brought home 382 kg of rock and soil and left instruments that operated for years. Soviet robots returned small samples too, and the Lunokhod rovers drove tens of kilometres.",
        "After a long gap, orbiters returned in the 1990s and 2000s, and NASA's Lunar Reconnaissance Orbiter has mapped the Moon in detail since 2009. China then led a new wave of landings: Chang'e 3 in 2013, Chang'e 4, the first landing on the far side, in January 2019, and Chang'e 5, which returned 1,731 g of samples in December 2020. In June 2024 Chang'e 6 brought back 1,935 g from the far side's South Pole–Aitken basin, the first far-side samples ever. India's Chandrayaan-3 landed near the south pole on 23 August 2023, and Japan's SLIM made a pinpoint landing in January 2024. Under NASA's Commercial Lunar Payload Services programme, Intuitive Machines' Odysseus became the first private lander to reach the surface in February 2024, Firefly's Blue Ghost completed a fully successful two-week mission in Mare Crisium in March 2025, and Intuitive Machines' Athena landed near the south pole days later but tipped over. Several other attempts, including two by Japan's ispace, crashed.",
        "NASA's Artemis programme aims to return people to the Moon. Artemis I flew an uncrewed Orion capsule around the Moon in late 2022. Artemis II, with astronauts Reid Wiseman, Victor Glover, Christina Koch and Canada's Jeremy Hansen, launched on 1 April 2026, looped around the far side of the Moon, set a new distance record for a crewed spacecraft of about 406,800 km from Earth, and splashed down in the Pacific on 10 April. In February 2026 NASA restructured the following flights: Artemis III, in 2027, will now test the commercial landers from SpaceX and Blue Origin with a crew in low Earth orbit, and the first Artemis landing, near the south pole, is planned for Artemis IV in 2028. Meanwhile more robotic landers are due in late 2026, including Astrobotic's Griffin, Intuitive Machines' third mission and Firefly's Blue Ghost 2 to the far side, and China's Chang'e 7, delayed by a typhoon in August 2026, is now expected to launch in 2027 to hunt for water ice at the south pole.",
      ],
      highlight: "Artemis II flew four astronauts around the Moon on 1 to 10 April 2026; the first Artemis landing is now planned for 2028.",
    },
    {
      title: "Name, myth and history",
      paragraphs: [
        "Our word 'Moon' comes from Old English 'mona', and it shares a root with 'month', because the Moon's cycle of phases was humanity's first calendar; many calendars, including the Islamic, Hebrew and traditional Chinese ones, still follow it. The Latin name Luna gives us 'lunar', and the Greek goddess Selene gives us 'selenology', the study of the Moon. In Chinese tradition the goddess Chang'e lives on the Moon with a jade rabbit, which is why China's lunar programme and its rovers, the Yutu ('jade rabbit'), carry those names. Artemis, the Greek goddess of the Moon and twin sister of Apollo, lends her name to NASA's return.",
        "In 1609 and 1610 Galileo turned a telescope on the Moon and saw mountains, valleys and craters, proof that it was a world like Earth rather than a perfect celestial sphere, and one of the observations that overturned ancient astronomy. Later mapmakers named its features: the 'seas' were christened by Giovanni Riccioli in 1651, along with craters honouring astronomers, a convention still used today.",
        "The Moon has been an emblem of everything from madness ('lunacy') to romance, but its greatest cultural moment came on 20 July 1969, when an estimated 600 million people watched Neil Armstrong step onto its surface. The 'Earthrise' photograph taken by Apollo 8 in 1968 and the samples returned by Apollo changed how we see both worlds: the Moon as a place, and Earth as a fragile blue marble.",
      ],
    },
    {
      title: "What you'd experience there",
      paragraphs: [
        "On the Moon you would weigh one-sixth of your Earth weight, so a 70 kg person would feel like 12 kg. Walking is awkward in a spacesuit; the Apollo astronauts found a bounding, two-footed hop worked best, and every fall happened in slow motion. Dust would coat everything and smell, the astronauts reported, like spent gunpowder once it got inside the cabin.",
        "There is no air, so you would hear nothing except through your suit's radio, and the sky would be black even at noon, with the Sun a blinding glare and Earth hanging in one fixed spot, four times wider than the Moon looks from home, going through its own phases. A lunar day lasts about two Earth weeks and a night just as long, and with nothing to spread the heat, sunlit ground reaches about 120 °C while the shadows and the night side plunge to −170 °C. Near the poles the Sun skims the horizon, some crater rims are lit almost continuously, and crater floors have been dark and colder than −200 °C for billions of years.",
        "Without a magnetic field or atmosphere, radiation from the Sun and from cosmic rays is the main long-term danger, and future crews are likely to shelter under metres of regolith. But the view would be worth it: a horizon only 2.4 km away, the far side's silence, and, from the near side, the whole of humanity's home visible in a single glance.",
      ],
      highlight: "Earth in the lunar sky appears four times wider than the Moon does from Earth, and it never moves from its spot.",
    },
  ],
  layers: [
    {
      name: "Inner core",
      description: "A small solid ball of iron, confirmed by reanalysis of Apollo seismic data and by studies of the Moon's rotation.",
      color: "#f2e2b0",
      radiusFraction: 0.138,
      detail: "Solid iron, ~240 km radius",
    },
    {
      name: "Outer core",
      description: "A shell of liquid iron rich in sulphur. Together the core is only about a fifth of the Moon's radius.",
      color: "#e0a04a",
      radiusFraction: 0.19,
      detail: "Liquid iron and sulphur, to ~330 km radius",
    },
    {
      name: "Partial-melt layer",
      description: "A zone of partly molten rock at the base of the mantle that damps seismic waves from the far side.",
      color: "#b0603a",
      radiusFraction: 0.276,
      detail: "10 to 30% molten silicate, to ~480 km radius",
    },
    {
      name: "Mantle",
      description: "Solid silicate rock that once fed the mare lavas. Deep moonquakes are triggered here by Earth's tides.",
      color: "#8a7a6a",
      radiusFraction: 0.977,
      detail: "Olivine and pyroxene rock, ~1,200 km thick",
    },
    {
      name: "Crust",
      description: "Light anorthosite highlands and basalt maria, blanketed in dusty regolith; thicker on the far side.",
      color: "#b9b6ae",
      radiusFraction: 1,
      detail: "~40 km on the near side, up to ~60 km on the far side",
    },
  ],
  timeline: [
    { year: "1609–10", title: "Galileo's telescope", detail: "Galileo sees mountains and craters on the Moon, showing it to be a rocky world rather than a perfect sphere." },
    { year: "1959", title: "First contact", detail: "The Soviet Luna 2 becomes the first spacecraft to reach the Moon in September; Luna 3 photographs the never-before-seen far side in October." },
    { year: "1966", title: "First soft landing", detail: "Luna 9 lands in Oceanus Procellarum and sends back the first pictures from the surface." },
    { year: "1969", title: "Apollo 11", detail: "Neil Armstrong and Buzz Aldrin walk on the Sea of Tranquillity on 20 July while Michael Collins orbits above." },
    { year: "1972", title: "Apollo 17", detail: "The last crewed landing; in six missions twelve astronauts explore the surface and return 382 kg of samples." },
    { year: "2009", title: "LRO and LCROSS", detail: "NASA's Lunar Reconnaissance Orbiter begins detailed mapping, and the LCROSS impact confirms water ice in a shadowed south-polar crater." },
    { year: "2019", title: "First far-side landing", detail: "China's Chang'e 4 lands in Von Kármán crater on 3 January and deploys the Yutu-2 rover." },
    { year: "2020", title: "Chang'e 5 sample return", detail: "China returns 1,731 g of lunar material, the first new samples since 1976, including basalt only 2 billion years old." },
    { year: "2023", title: "India lands", detail: "Chandrayaan-3's Vikram lander touches down near the south pole on 23 August, a first for India." },
    { year: "2024", title: "Landers from Japan, the US and China", detail: "SLIM makes a pinpoint landing in January; Intuitive Machines' Odysseus becomes the first commercial lander in February; Chang'e 6 returns the first far-side samples on 25 June." },
    { year: "2025", title: "Commercial landings", detail: "Firefly's Blue Ghost completes a fully successful mission in Mare Crisium in March; Intuitive Machines' Athena lands near the south pole but tips over." },
    { year: "2026", title: "Artemis II", detail: "Four astronauts fly around the Moon from 1 to 10 April, the first crewed lunar flight since 1972; NASA replans Artemis III as a 2027 orbital lander test with a landing on Artemis IV in 2028." },
  ],
  comparisons: [
    { label: "Diameter", value: 3474.8, earth: 12742, unit: "km" },
    { label: "Mass", value: 0.0123, earth: 1, unit: "× Earth" },
    { label: "Surface gravity", value: 1.62, earth: 9.81, unit: "m/s²" },
    { label: "Rotation period", value: 655.68, earth: 23.93, unit: "hours" },
    { label: "Orbital period", value: 27.32, earth: 365.25, unit: "Earth days" },
    { label: "Mean temperature", value: -20, earth: 15, unit: "°C" },
    { label: "Escape velocity", value: 2.38, earth: 11.19, unit: "km/s" },
  ],
  moons: [],
  quiz: [
    {
      prompt: "Why do we always see the same side of the Moon?",
      options: [
        "The Moon does not rotate",
        "The Moon rotates once for every orbit it makes around Earth",
        "The far side is always dark",
        "Earth's shadow hides the other side",
      ],
      answer: "The Moon rotates once for every orbit it makes around Earth",
      explanation: "Earth's tides long ago locked the Moon's spin to its orbit, both taking 27.3 days. The far side gets just as much sunlight; it simply never faces Earth.",
    },
    {
      prompt: "What are the dark patches on the Moon, the 'maria'?",
      options: ["Oceans of water", "Shadows of mountains", "Plains of ancient basalt lava", "Deposits of coal"],
      answer: "Plains of ancient basalt lava",
      explanation: "The maria are vast lava flows that flooded impact basins mostly 3 to 4 billion years ago. They cover about 16% of the surface, nearly all on the near side.",
    },
    {
      prompt: "How many people have walked on the Moon?",
      options: ["2", "6", "12", "24"],
      answer: "12",
      explanation: "Six Apollo missions between July 1969 and December 1972 each landed two astronauts. Artemis IV, planned for 2028, aims to add to that list.",
    },
    {
      prompt: "What is happening to the Moon's distance from Earth?",
      options: [
        "It is slowly getting closer",
        "It is slowly moving away, by about 3.8 cm a year",
        "It stays exactly the same",
        "It moves away by 1 km a year",
      ],
      answer: "It is slowly moving away, by about 3.8 cm a year",
      explanation: "Tidal friction transfers energy from Earth's rotation to the Moon's orbit. The rate is measured with lasers bounced off reflectors left by Apollo astronauts.",
    },
    {
      prompt: "Which mission returned the first samples from the Moon's far side?",
      options: ["Apollo 17 (1972)", "Luna 16 (1970)", "Chang'e 5 (2020)", "Chang'e 6 (2024)"],
      answer: "Chang'e 6 (2024)",
      explanation: "China's Chang'e 6 landed in the South Pole–Aitken basin and brought 1,935 g of far-side material back to Earth on 25 June 2024.",
    },
  ],
  glossary: [
    { term: "Maria", definition: "Latin for 'seas': the dark plains of solidified basalt lava that fill the Moon's largest impact basins." },
    { term: "Regolith", definition: "The layer of loose, pulverised rock and glassy dust that covers the Moon's surface, made by billions of years of impacts." },
    { term: "Tidal locking", definition: "When a body's rotation has been slowed by tides until it turns exactly once per orbit, so it always shows the same face to its partner." },
    { term: "Libration", definition: "The slight wobbling of the Moon as seen from Earth, which lets us view about 59% of its surface over time." },
    { term: "Giant-impact hypothesis", definition: "The leading theory that the Moon formed from debris when a Mars-sized body struck the young Earth about 4.5 billion years ago." },
    { term: "Permanently shadowed region", definition: "A crater floor near the poles that sunlight never reaches, cold enough to trap water ice for billions of years." },
    { term: "Mascon", definition: "A 'mass concentration' of dense rock beneath a lunar basin that makes the Moon's gravity lumpy and low orbits unstable." },
    { term: "CLPS", definition: "NASA's Commercial Lunar Payload Services programme, which pays private companies to deliver instruments to the Moon's surface." },
  ],
  sources: [
    { title: "NSSDC Moon Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html" },
    { title: "NASA Science: Moon facts", url: "https://science.nasa.gov/moon/facts/" },
    { title: "NASA: Artemis II splashes down", url: "https://www.nasa.gov/image-article/artemis-ii-splashes-down/" },
    { title: "NASA: Artemis programme", url: "https://www.nasa.gov/humans-in-space/artemis/" },
    { title: "NASA: Commercial Lunar Payload Services", url: "https://www.nasa.gov/commercial-lunar-payload-services/" },
    { title: "Weber et al. (2011), Seismic detection of the lunar core, Science", url: "https://www.science.org/doi/10.1126/science.1199375" },
  ],
};
