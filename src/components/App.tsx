"use client";

import dynamic from "next/dynamic";
import { Header } from "./ui/Header";
import { PlanetList } from "./ui/PlanetList";
import { ControlBar } from "./ui/ControlBar";
import { InfoPanel } from "./ui/InfoPanel";
import { Quiz } from "./ui/Quiz";
import { Tour } from "./ui/Tour";

// WebGL only exists in the browser, so the scene must skip server rendering.
const SolarScene = dynamic(() => import("./scene/SolarScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-white/50">Loading the solar system…</div>
  ),
});

export function App() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-[#03050c]">
      <SolarScene />
      <Header />
      <PlanetList />
      <InfoPanel />
      <ControlBar />
      <Tour />
      <Quiz />
    </main>
  );
}
