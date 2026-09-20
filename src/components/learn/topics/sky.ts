import type { LearnTopic } from "../types";
import { ScatteringDiagram, TwinkleDiagram } from "../diagrams/ScatteringDiagram";

export const sky: LearnTopic = {
  slug: "blue-sky-and-twinkling",
  title: "Why the sky is blue and stars twinkle",
  short: "Blue sky & twinkling",
  tagline: "Two things air does to light: it scatters the blue out of sunlight, and it jiggles the pinpoints of starlight.",
  accent: "#60a5fa",
  intro: [
    "Sunlight is white — a mix of every colour. As it passes through the atmosphere, the molecules of nitrogen and oxygen, far smaller than a wavelength of light, scatter it in all directions. Crucially, they scatter short wavelengths much more than long ones: the strength goes as 1/λ⁴, so 450 nm blue light is scattered about 5.5 times more than 700 nm red. Look anywhere in the sky away from the Sun and what reaches your eye is mostly that scattered blue.",
    "The same air is never perfectly still. Pockets of slightly warmer and cooler air bend light by tiny, changing amounts, and a star's single needle of light flickers as it passes through them.",
  ],
  diagrams: [
    {
      title: "Scattering",
      lead: "Pick a wavelength to see how strongly it is scattered, and switch the Sun between noon and sunset to compare the short and long paths.",
      Component: ScatteringDiagram,
    },
    {
      title: "Twinkling (scintillation)",
      lead: "Turn the turbulence up and compare the star with the planet in the 'what you see' box.",
      Component: TwinkleDiagram,
    },
  ],
  steps: [
    {
      title: "Rayleigh scattering",
      body: "When a light wave much longer than a molecule passes by, it makes the molecule's electrons oscillate and re-radiate the light in other directions. The efficiency rises steeply with frequency — Lord Rayleigh showed in 1871 that it scales as 1/λ⁴. Halve the wavelength and the scattering goes up sixteen-fold.",
    },
    {
      title: "So why blue, not violet?",
      body: "Violet is scattered even more than blue, but the Sun emits less violet, some is absorbed high in the atmosphere, and our eyes are far less sensitive to it. The mixture that reaches us — strong blue, some violet and green, a little of everything — is perceived as sky blue. On the Moon, with no air, the daytime sky is black.",
    },
    {
      title: "Sunsets and sunrises",
      body: "Near the horizon, sunlight crosses up to 38 times more air than when the Sun is overhead. So much blue is scattered out of the direct beam that what remains is orange and red — and the low clouds it lights up glow the same colours. Fine dust, smoke and volcanic aerosols add extra scattering and make sunsets redder still.",
    },
    {
      title: "Why clouds are white",
      body: "Cloud droplets are far larger than a wavelength. They scatter all colours about equally (Mie scattering), so clouds look white — or grey when thick enough to block light. The same is true of fog, milk and the haze on a humid day.",
    },
    {
      title: "Why stars twinkle",
      body: "The atmosphere is full of cells of air at slightly different temperatures, tens of centimetres across, drifting on the wind. Each has a slightly different refractive index and bends light a tiny bit. A star is effectively a point, so its light arrives along a single narrow path: as the cells drift through it, the beam is nudged, focused and defocused many times a second. The star brightens, dims, shimmers and even flashes colours (dispersion splits the colours slightly, most obviously near the horizon).",
    },
    {
      title: "Why planets (mostly) don't",
      body: "A planet shows a tiny disk — a few to tens of arcseconds across — which sends light along many slightly different paths through different cells. Their flickers are out of step and average out, so the planet shines steadily. Twinkling is worst low in the sky, where the light passes through far more turbulent air, and on hot, windy nights. Astronomers call the steadiness of the air the 'seeing', and build observatories on high, dry mountains (or in space) to escape it.",
    },
  ],
  tryThis: [
    "Set the wavelength to 400 nm and then 700 nm: the scattering ratio is (700/400)⁴ ≈ 9.4. Now try 450 nm versus 700 nm to get the familiar 5.5×.",
    "Switch the Sun to the horizon. Most of the blue is scattered out of the beam before it reaches the observer — the remaining light is the colour of the sunset.",
    "Turn the turbulence up and watch the star flash and jump while the planet only shivers. Then turn it to calm: this is what 'good seeing' means to astronomers.",
    "Tonight, compare a bright star near the horizon with a planet high in the sky. Then find a bright star at the zenith — it twinkles far less than the low one.",
  ],
  misconceptions: [
    { myth: "The sky is blue because it reflects the ocean.", truth: "The sky is blue over deserts, and it was blue before there were oceans. Air scatters blue light preferentially; the ocean is partly blue because it reflects the sky and because water absorbs red." },
    { myth: "Blue light is scattered because air molecules are blue.", truth: "Nitrogen and oxygen are colourless. The effect is purely about size: particles much smaller than a wavelength scatter short wavelengths more strongly." },
    { myth: "Stars twinkle because they are pulsing.", truth: "Some stars do vary in brightness over hours to years, but twinkling on timescales of a fraction of a second is entirely Earth's atmosphere. From orbit, stars shine perfectly steadily." },
    { myth: "Planets never twinkle.", truth: "They can, faintly, when very low in the sky or in poor seeing. But it takes far more turbulence to make a disk flicker than a point." },
  ],
  related: ["earth", "sun", "mars", "venus"],
  sources: [
    { title: "NASA Space Place — Why is the sky blue?", url: "https://spaceplace.nasa.gov/blue-sky/en/" },
    { title: "NASA APOD — Why stars twinkle", url: "https://science.nasa.gov/image-article/apod-2000-july-25-why-stars-twinkle/" },
    { title: "NASA StarChild — Why do stars twinkle?", url: "https://starchild.gsfc.nasa.gov/docs/StarChild/questions/question26.html" },
    { title: "ESO — Astronomical seeing and atmospheric turbulence", url: "https://www.eso.org/public/teles-instr/technology/adaptive_optics/" },
    { title: "Hyperphysics — Blue sky and Rayleigh scattering", url: "http://hyperphysics.phy-astr.gsu.edu/hbase/atmos/blusky.html" },
  ],
};
