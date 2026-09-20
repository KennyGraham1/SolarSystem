# Solar System Explorer

An interactive 3D solar system for learning about the Sun and the eight planets, built with Next.js, React Three Fiber and Tailwind.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What you can do

- **Orbit view** – watch the planets orbit and spin. Drag to rotate, scroll to zoom. Planet positions are **real for the date shown**, computed from JPL Keplerian orbital elements (elliptical, inclined orbits; accurate for 1800–2050).
- **Guided tour** – walks outward from the Sun with a lesson card per body (Kepler's third law, why we have seasons, the greenhouse effect, ...). Arrow keys step through it.
- **Click any body** (or use the list on the left) to fly to it and open a fact panel: radius, mass, distance, year/day length, axial tilt, gravity, temperature, moons, orbital speed, light travel time from the Sun, "did you know" facts, and a **"You on this planet"** calculator (your weight and age there).
- **Time controls** – pause (Space), change speed from hours-per-second to years-per-second, pick any date or jump back to today.
- **Toggles** – orbit lines, labels, and *True distances* (real AU ratios, which shows how empty the solar system really is).
- **Dwarf planets and belts** – Ceres and Pluto orbit on their real (JPL SBDB) orbits — Pluto's is tilted 17° and crosses inside Neptune's — with the asteroid belt (2.1–3.3 AU) and Kuiper belt (30–50 AU) drawn as point clouds (toggle *Belts*).
- **Moons** – the Moon, Europa, Titan and Triton have their own pages (`/moon/<id>`) and appear in the size comparison; selecting one in the explorer flies to its parent planet.
- **Compare** – every body at its true relative size, or ranked with bars by mass, gravity, day length, year length, temperature, distance from the Sun or number of moons; filter to Sun & planets, dwarfs & moons, or everything.
- **Zoom out** – a ten-step cosmic zoom from the inner solar system through the Oort cloud, the nearest stars (real 3D positions), the Milky Way, the Local Group and Laniakea to the observable universe, with captions and scale bars (`src/components/universe/`).
- **Learn** (`/learn`) – eight interactive explainers with slider-driven diagrams: day/night & sunsets, seasons, Moon phases, solar and lunar eclipses (with upcoming dates), tides, retrograde motion, and why the sky is blue / stars twinkle.
- **Moons** – 14 moons across the planets and Pluto, each with a page (`/moon/<id>`), grouped (and collapsible) in the explorer's body list.
- **Quiz** – 5/10/15 questions from a pool of 44 generators: multiple choice, true/false and put-in-order. A wrong answer earns a hint and a second try; every answer comes with an explanation and a link to the page or explainer that covers it, and the results screen reviews what you missed by topic.
- **Esc** resets the camera.
- **Planet pages** – every body has a dedicated page at `/planet/<id>` (e.g. `/planet/saturn`) with a spinning 3D hero, an interactive interior cross-section, comparison bars against Earth, notable moons, an exploration timeline, a per-planet quiz, a glossary and sources. Reach them from the info panel, the planet list or the tour card.

## Notes on accuracy

- Physical data (radius, orbital period, rotation period, tilt, gravity, temperatures) come from NASA planetary fact sheets. Moon counts are as of August 2026 per NASA (Jupiter 115, Saturn 293, Uranus 29, Neptune 16) and keep growing.
- Rotation axes lean in their real directions (from IAU pole coordinates), so Earth's northern hemisphere really does face the Sun in June. Bodies always spin right-handed about their own axis; Venus and Uranus are retrograde purely because their obliquity exceeds 90°.
- The Moon is drawn much closer to Earth than reality (2.6 Earth radii instead of 60) and its 5° orbital inclination is ignored; it is tidally locked as in reality.
- In the default orbit view, planet **sizes** are square-root scaled and **distances** are log-compressed so everything fits on screen. Turn on *True distances* or open *Size comparison* for accurate proportions.
- Orbits and positions use the JPL approximate Keplerian elements, good to a fraction of a degree between 1800 and 2050. Outside that range they degrade gracefully but are no longer accurate.
- Planet spin is capped at ¼ turn per second for readability when the clock runs fast; orbital motion is always exact.
- Planet surfaces use 2K photographic texture maps where available (see credits); if a texture file is missing or fails to load, the app falls back to a procedurally generated surface for that body.

## Performance

Phones, low-core machines and users who prefer reduced motion get a lighter render: 1K textures (`public/textures/1k`, generated from the 2K originals), no post-processing bloom, 1× pixel ratio, fewer stars and belt points. See `src/lib/device.ts`.

## Structure

- `src/lib/planets.ts` – all body data, tour lessons and the scene scaling helpers
- `src/lib/orbits.ts` – Keplerian position calculator (JPL elements), orbital speed, light time
- `src/lib/textures.ts` – procedural canvas textures (surfaces, rings, sun glow)
- `src/lib/textureLoader.ts` – loads the photographic textures with the procedural ones as fallback
- `src/lib/content/` – long-form educational content for the planet pages
- `src/app/planet/[id]/` – statically generated planet pages; `src/components/planet/` – their sections
- `src/lib/quiz.ts` – question generators
- `src/store/useSolarStore.ts` – zustand store for UI/simulation state
- `src/components/scene/` – React Three Fiber scene (Sun, planets, camera rig, comparison view)
- `src/components/ui/` – header, planet list, controls, info panel, quiz

## Credits

- Textures: [Solar System Scope](https://www.solarsystemscope.com/textures/), CC BY 4.0 (files in `public/textures/`).
- Physical data: NASA planetary fact sheets; orbital elements: JPL.
