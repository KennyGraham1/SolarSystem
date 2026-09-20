import type { PlanetContent } from "./types";

export const titania: PlanetContent = {
  id: "titania",
  tagline: "The largest moon of Uranus, a grey world of ice and rock split by canyons that opened as its interior froze.",
  intro: [
    "Titania is the largest of the 29 known moons of Uranus and the eighth-largest moon in the solar system, about 1,577 km across, a little under half the diameter of Earth's Moon. It orbits Uranus every 8.7 days at a distance of about 436,000 km, always keeping the same face towards the planet, and it shares Uranus's extraordinary tilt: its poles point almost along the planet's orbit, so each one spends 42 years in continuous sunlight followed by 42 years of night.",
    "Voyager 2, the only spacecraft to visit Uranus, photographed Titania from a distance of 365,000 km on 24 January 1986. The images cover only about 40 percent of the moon, the sunlit southern hemisphere, but they were enough to show a heavily cratered surface of dark grey ice broken by enormous fault valleys. The longest, Messina Chasma, runs about 1,500 km from the equator almost to the south pole. These canyons are thought to have opened when water inside the young moon froze and expanded, cracking the crust as the moon grew slightly larger.",
    "Titania is now regarded as a candidate ocean world. Its size, its rocky content and the detection of carbon dioxide ice and possibly ammonia on its surface suggest that a thin, salty layer of liquid water may survive deep inside, and the Uranus orbiter recommended by the 2023 to 2032 US decadal survey would test that idea directly. As of September 2026 that mission has not yet begun.",
  ],
  sections: [
    {
      title: "Structure and interior",
      paragraphs: [
        "Titania's density of about 1.66 to 1.71 g/cm³ is among the highest of the Uranian moons, implying roughly equal amounts of water ice and rock by mass. Models of its interior assume the rock settled into a core about 520 km in radius, around two-thirds of the way to the surface, surrounded by an icy mantle about 270 km thick. The heat needed to separate them would have come from the decay of radioactive elements in the rock, with a small contribution from tides.",
        "Whether liquid water survives is an open question. Modelling by Hauke Hussmann and colleagues in 2006, and later work led by Julie Castillo-Rogez in 2023, found that if the icy mantle contains ammonia or salts to lower its freezing point, a residual ocean a few tens of kilometres thick, less than about 50 km in the 2023 study, could persist today at the boundary between the ice and the rocky core. Without such antifreeze the moon would have frozen solid long ago.",
        "The canyons on the surface are the best evidence that the interior changed. Water expands as it freezes, so if Titania once had a thick liquid layer that later solidified, the moon's volume would have grown slightly, stretching the brittle crust until it broke along long normal faults. Those faults are what Voyager saw.",
      ],
      highlight: "Titania's canyons probably opened as water inside the young moon froze and expanded, and a thin salty ocean may survive at the base of its ice.",
    },
    {
      title: "Canyons and craters",
      paragraphs: [
        "Titania's most striking features are its chasmata, long rift valleys bounded by faults. Messina Chasma is the largest, about 1,500 km long, and Belmont Chasma about 240 km; Rousillon Rupes is a fault scarp some 400 km long. Their walls are brighter than the surrounding plains, possibly because fresh ice or frost is exposed along them, and NASA describes them as evidence of tectonic extension of the crust, the surface pulling apart rather than being pushed together.",
        "The rest of the surface is heavily cratered but noticeably less so than neighbouring Oberon or Umbriel, which means Titania's surface is somewhat younger and was resurfaced after the era of heaviest bombardment. The largest known crater, Gertrude, is about 326 km across, and Ursula about 135 km. Many craters appear shallow and softened, consistent with a warm, slowly flowing icy crust early in the moon's history, and smooth plains within some basins may be the result of icy material welling up from below.",
        "Because Uranus is tilted, the craters and canyons Voyager photographed are all in the southern hemisphere. The northern half of the moon, in darkness in 1986, has never been seen up close.",
      ],
      highlight: "Messina Chasma stretches about 1,500 km, nearly the moon's full diameter, from Titania's equator almost to its south pole.",
    },
    {
      title: "Surface composition and the absent atmosphere",
      paragraphs: [
        "Titania's surface is dark grey and reflects only about a quarter of the sunlight that hits it, dimmer than the ice moons of Saturn because its water ice is mixed with dark, possibly carbon-rich material. Ground-based infrared spectra in the 2000s found water ice across the surface and carbon dioxide ice concentrated on the trailing hemisphere, the side that faces backwards along the orbit.",
        "Since 2023 the James Webb Space Telescope has studied the four large outer moons of Uranus, and a 2026 analysis led by Richard Cartwright confirmed carbon dioxide ice and detected carbon monoxide on Titania, Oberon, Ariel and Umbriel, with the strongest features on the trailing hemispheres and weakening with distance from Uranus. The team concluded that some of the carbon oxides are original to the moons, perhaps brought up from their interiors, while the trailing-side enhancement comes from charged particles in Uranus's magnetosphere breaking apart ice and organic material and re-forming it as carbon dioxide and carbon monoxide.",
        "That radiation chemistry matters for the ocean question. Carbon dioxide and possible ammonia-bearing compounds on the surface are the kinds of material that could have come from a chemically active interior, and the Uranus orbiter would look for the same tell-tale signs that revealed the oceans of Europa and Enceladus.",
        "Titania has no known atmosphere. The best test was a stellar occultation on 8 September 2001, when Titania passed in front of a star and the starlight winked out sharply with no sign of refraction by gas, setting an upper limit on any atmosphere of about 10 to 20 nanobars, roughly a fifty-millionth of Earth's sea-level pressure. That is not surprising: at around −200 °C water and carbon dioxide are frozen solid, only the most volatile gases such as nitrogen could exist as vapour, and there is no evidence Titania has any. With an escape velocity of about 0.77 km/s, even a thin exosphere of carbon dioxide released by summer sunlight would be quickly lost.",
      ],
    },
    {
      title: "Orbit, tides and the 42-year seasons",
      paragraphs: [
        "Titania orbits Uranus at about 436,000 km, 17 planetary radii out, once every 8.706 days, and rotates in the same time. Its orbit is nearly circular and lies almost exactly in Uranus's equatorial plane, so present-day tidal heating is negligible; what heat the moon retains comes from radioactive decay in its rocky core.",
        "Uranus's axis is tilted by 98 degrees, and the moons orbit around its equator, so the whole system is turned on its side. Titania's seasons follow Uranus's 84-year journey around the Sun: around each solstice one pole faces the Sun for decades while the other is in a night lasting 42 years. This extreme cycle means each hemisphere alternates between long periods of gentle warming and deep freezing, which may help drive the migration of carbon dioxide frost from the sunlit regions to colder ones.",
        "Titania is the outermost of the large moons except Oberon, so Uranus's magnetosphere, which is itself tilted by 59 degrees to the planet's spin axis and offset from its centre, sweeps over it in a complicated pattern. The trailing hemisphere takes the brunt of the charged particles, which is why the radiation-made carbon oxides are concentrated there.",
      ],
    },
    {
      title: "Exploration and missions",
      paragraphs: [
        "Voyager 2 is the only spacecraft to have seen Titania. On 24 January 1986, during its dash through the Uranus system, it passed about 365,200 km from the moon and returned images with a resolution of a few kilometres, enough to map the southern hemisphere's craters and canyons and to measure Titania's size and mass. Since then the moon has been studied only by telescopes, including Hubble, ground-based infrared spectrometers and, since 2023, the James Webb Space Telescope.",
        "The 2023 to 2032 planetary science decadal survey placed a Uranus Orbiter and Probe at the top of its list of new flagship missions. The concept would spend several years in orbit, drop a probe into Uranus's atmosphere and make repeated flybys of Titania and the other large moons, using gravity, magnetic and imaging measurements to search for subsurface oceans. As of September 2026 NASA has not formally begun the mission; a shortage of plutonium-238 for its power supply has pushed the realistic launch date into the mid to late 2030s, and concept studies published in 2026 examined routes that use a solar-electric propulsion stage or a larger launch vehicle to reach Uranus without a Jupiter gravity assist. Arrival would be in the mid-2040s at the earliest, which would put the northern hemisphere, unseen by Voyager, in daylight.",
      ],
      highlight: "Voyager 2 mapped only 40 percent of Titania in 1986; the Uranus orbiter that would finish the job is the top US flagship priority but has not yet started.",
    },
    {
      title: "Name and discovery",
      paragraphs: [
        "Titania was discovered on 11 January 1787 by William Herschel, six years after he found Uranus itself, on the same night that he discovered Oberon. Both moons are faint and close to the planet's glare, and no one else managed to see them for almost 50 years. Herschel did not name them; his son John Herschel proposed the names in 1852, at the request of William Lassell, who had just discovered Ariel and Umbriel.",
        "Titania is the queen of the fairies in Shakespeare's A Midsummer Night's Dream, and Oberon is her husband. The choice broke with the classical mythology used for the moons of other planets and established the tradition that Uranus's moons are named after characters from Shakespeare and Alexander Pope. Titania's craters are named after female Shakespearean characters, Gertrude from Hamlet and Ursula from Much Ado About Nothing, and its canyons after places in the plays: Messina from Much Ado About Nothing and Belmont from The Merchant of Venice.",
        "Despite the similar spelling, Titania has nothing to do with Titan or the Titans of Greek myth, and the two are often confused; Saturn's moons take their names from classical mythology while Uranus's come from English literature.",
      ],
    },
    {
      title: "What you'd experience there",
      paragraphs: [
        "Titania's gravity is about 0.37 m/s², less than four percent of Earth's, so a 70 kg person would weigh about as much as a 2.6 kg bag of flour does at home. You could jump more than 10 m straight up and take about 15 seconds to come down. A full pressure suit is essential: there is no air, and the ground is grey, dusty ice at around −200 °C, cold enough to make any unprotected material brittle as glass.",
        "From the near side, Uranus would hang motionless in the sky, a pale blue-green disc about 6.7 degrees across, 13 times the width of the full Moon from Earth, showing hardly any detail. The Sun would be a tiny, piercingly bright point, giving less than a three-hundredth of the light it gives Earth, still bright enough to read by. Near the poles it would circle the horizon for 42 years without setting, then vanish for 42 years of night.",
        "A day on Titania lasts 8.7 Earth days. Standing at the rim of Messina Chasma you would look down into a rift valley whose bright, frosty walls drop away for kilometres and stretch to both horizons, a crack opened when the moon's frozen heart expanded billions of years ago.",
      ],
      highlight: "From Titania, Uranus hangs as a still, pale disc 13 times wider than our Moon, and each pole sees 42 years of daylight in a row.",
    },
  ],
  layers: [
    {
      name: "Rocky core",
      description: "A core of silicate rock, heated over billions of years by radioactive decay, that models place at about two-thirds of the moon's radius.",
      color: "#8a5a3c",
      radiusFraction: 0.66,
      detail: "Silicate rock, about 520 km in radius in standard models",
    },
    {
      name: "Possible residual ocean",
      description: "A thin layer of salty or ammonia-rich liquid water may persist at the base of the ice; models suggest less than about 50 km if it exists at all.",
      color: "#2f6fb5",
      radiusFraction: 0.72,
      detail: "Hypothetical; liquid water with ammonia or salts as antifreeze",
    },
    {
      name: "Ice mantle and crust",
      description: "A thick mantle of water ice, mixed with dark material and dusted with carbon dioxide frost, split by giant fault canyons at the surface.",
      color: "#a9a39b",
      radiusFraction: 1,
      detail: "Water ice with dark and carbon-bearing material, roughly 220 to 270 km thick; surface about −200 °C",
    },
  ],
  timeline: [
    { year: "1787", title: "Discovery", detail: "William Herschel finds Titania and Oberon on 11 January, the first two moons of Uranus to be discovered." },
    { year: "1852", title: "Named for the fairy queen", detail: "John Herschel names the moon after Titania from A Midsummer Night's Dream, at William Lassell's request." },
    { year: "1986", title: "Voyager 2 flyby", detail: "On 24 January Voyager 2 photographs Titania from about 365,200 km, revealing craters and the 1,500-km Messina Chasma." },
    { year: "2001", title: "No atmosphere", detail: "A stellar occultation on 8 September shows Titania has no atmosphere above about 10 to 20 nanobars." },
    { year: "2006", title: "Carbon dioxide ice found", detail: "Infrared spectra reveal carbon dioxide ice concentrated on the trailing hemisphere; interior models suggest a possible residual ocean." },
    { year: "2022", title: "Uranus orbiter recommended", detail: "The US decadal survey names a Uranus Orbiter and Probe, with Titania flybys, as the highest-priority new flagship for 2023 to 2032." },
    { year: "2023", title: "Ocean world candidate", detail: "Modelling led by Julie Castillo-Rogez finds that Titania and Oberon could retain oceans up to about 50 km thick if their ice contains antifreeze." },
    { year: "2026", title: "Webb finds carbon monoxide", detail: "JWST spectra analysed by Richard Cartwright and colleagues confirm carbon dioxide and detect carbon monoxide on Titania, partly made by radiation on its trailing side." },
  ],
  comparisons: [
    { label: "Diameter", value: 1576.8, earth: 12742, unit: "km" },
    { label: "Mass", value: 0.00057, earth: 1, unit: "× Earth" },
    { label: "Surface gravity", value: 0.367, earth: 9.81, unit: "m/s²" },
    { label: "Rotation period", value: 208.94, earth: 23.93, unit: "hours" },
    { label: "Mean temperature", value: -203, earth: 15, unit: "°C" },
    { label: "Escape velocity", value: 0.77, earth: 11.19, unit: "km/s" },
    { label: "Surface pressure (upper limit from 2001 occultation)", value: 2e-8, earth: 1.013, unit: "bar" },
  ],
  moons: [],
  quiz: [
    {
      prompt: "How are Titania's giant canyons thought to have formed?",
      options: [
        "Rivers of liquid methane carved them",
        "Water inside the moon froze and expanded, cracking the crust",
        "Asteroid impacts split the moon open",
        "Uranus's tides tore the surface apart last century",
      ],
      answer: "Water inside the moon froze and expanded, cracking the crust",
      explanation: "As a liquid layer inside the young moon solidified, Titania's volume grew slightly and the brittle crust broke along long normal faults such as Messina Chasma.",
    },
    {
      prompt: "Who discovered Titania, and when?",
      options: ["Christiaan Huygens, 1655", "William Herschel, 1787", "William Lassell, 1851", "Gerard Kuiper, 1948"],
      answer: "William Herschel, 1787",
      explanation: "Herschel found Titania and Oberon on 11 January 1787, six years after discovering Uranus. Lassell found Ariel and Umbriel in 1851 and Kuiper found Miranda in 1948.",
    },
    {
      prompt: "After whom is Titania named?",
      options: ["A Titan of Greek myth", "The queen of the fairies in A Midsummer Night's Dream", "A daughter of Uranus in Roman legend", "The wife of the astronomer who found it"],
      answer: "The queen of the fairies in A Midsummer Night's Dream",
      explanation: "John Herschel chose Shakespearean names in 1852, starting the tradition that Uranus's moons come from Shakespeare and Alexander Pope rather than classical myth.",
    },
    {
      prompt: "How much of Titania's surface did Voyager 2 photograph in 1986?",
      options: ["About 40 percent, the sunlit southern hemisphere", "The entire surface", "Only the north pole", "None; it was too far away"],
      answer: "About 40 percent, the sunlit southern hemisphere",
      explanation: "Because Uranus was near its southern solstice, only the southern hemisphere was lit; the north has never been seen up close.",
    },
    {
      prompt: "Why does each of Titania's poles experience 42 years of continuous daylight?",
      options: [
        "Titania spins very slowly",
        "Uranus's axis is tilted about 98 degrees, so its moons' poles point nearly at the Sun around each solstice",
        "Titania orbits the Sun directly",
        "Uranus glows brightly enough to light the poles",
      ],
      answer: "Uranus's axis is tilted about 98 degrees, so its moons' poles point nearly at the Sun around each solstice",
      explanation: "Titania orbits in Uranus's equatorial plane, so it shares the planet's sideways tilt and its 84-year cycle of extreme seasons.",
    },
  ],
  glossary: [
    { term: "Chasma", definition: "A long, steep-sided valley bounded by faults. Messina Chasma on Titania is about 1,500 km long." },
    { term: "Normal fault", definition: "A break in a crust that is being stretched, where one side drops down relative to the other; Titania's canyons are bounded by such faults." },
    { term: "Stellar occultation", definition: "The passage of a body in front of a star. How the starlight fades reveals whether the body has an atmosphere; Titania's 2001 occultation showed none." },
    { term: "Trailing hemisphere", definition: "The side of a tidally locked moon that faces backwards along its orbit; on Titania it carries the most carbon dioxide and carbon monoxide ice." },
    { term: "Radiolysis", definition: "Chemical change caused by radiation. Charged particles in Uranus's magnetosphere break up ice and organics on Titania to form carbon oxides." },
    { term: "Residual ocean", definition: "A thin layer of liquid that may survive at the base of a moon's ice shell long after most of it has frozen, kept liquid by salts or ammonia." },
    { term: "Uranus Orbiter and Probe", definition: "The proposed NASA flagship that would orbit Uranus and fly past its moons, ranked top by the 2023 to 2032 decadal survey but not yet started as of 2026." },
  ],
  sources: [
    { title: "NASA Science: Titania", url: "https://science.nasa.gov/uranus/moons/titania/" },
    { title: "NSSDC Uranian Satellite Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/uraniansatfact.html" },
    { title: "AAS Nova (September 2026): Origins of carbon oxides on Uranian moons", url: "https://aasnova.org/2026/09/11/breaking-the-ice-origins-of-carbon-oxides-on-uranian-moons/" },
    { title: "NASA: Uranus Orbiter and Probe mission concept study (decadal survey)", url: "https://science.nasa.gov/wp-content/uploads/2023/10/uranus-orbiter-and-probe.pdf" },
    { title: "NASA Science: Voyager mission", url: "https://science.nasa.gov/mission/voyager/" },
  ],
};
