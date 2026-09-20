# Solar System Explorer

An interactive 3D solar system for learning about the Sun and the eight planets, built with Next.js, React Three Fiber and Tailwind.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What you can do

- **Orbit view** – watch the planets orbit and spin. Drag to rotate, scroll to zoom.
- **Click any body** (or use the list on the left) to fly to it and open a fact panel: radius, mass, distance, year/day length, axial tilt, gravity, temperature, moons, plus "did you know" facts.
- **Time controls** – pause (Space), change speed from hours-per-second to years-per-second, and watch the simulated date advance.
- **Toggles** – orbit lines, labels, and *True distances* (real AU ratios, which shows how empty the solar system really is).
- **Size comparison** – every body lined up at its true relative size.
- **Quiz** – 8 randomly generated questions built from the planet data.
- **Esc** resets the camera.

## Notes on accuracy

- Physical data (radius, orbital period, rotation period, tilt, gravity, moon counts, temperatures) come from NASA planetary fact sheets.
- In the default orbit view, planet **sizes** are square-root scaled and **distances** are log-compressed so everything fits on screen. Turn on *True distances* or open *Size comparison* for accurate proportions.
- Orbits are drawn as circles (real orbits are slightly elliptical) and starting positions are arbitrary, not today's real positions.
- Planet surfaces are procedurally generated textures, not photographs.

## Structure

- `src/lib/planets.ts` – all body data and the scene scaling helpers
- `src/lib/textures.ts` – procedural canvas textures (surfaces, rings, sun glow)
- `src/lib/quiz.ts` – question generators
- `src/store/useSolarStore.ts` – zustand store for UI/simulation state
- `src/components/scene/` – React Three Fiber scene (Sun, planets, camera rig, comparison view)
- `src/components/ui/` – header, planet list, controls, info panel, quiz
