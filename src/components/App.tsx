"use client";

import dynamic from "next/dynamic";
import { Header } from "./ui/Header";
import { PlanetList } from "./ui/PlanetList";
import { ControlBar } from "./ui/ControlBar";
import { InfoPanel } from "./ui/InfoPanel";
import { Quiz } from "./ui/Quiz";
import { Tour } from "./ui/Tour";
import { LoadingScreen } from "./ui/LoadingScreen";

// WebGL only exists in the browser, so the scene must skip server rendering.
const SolarScene = dynamic(() => import("./scene/SolarScene"), { ssr: false, loading: () => null });

export function App() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-[#03050c]">
      <SolarScene />
      <LoadingScreen />
      <Header />
      <PlanetList />
      <InfoPanel />
      <ControlBar />
      <Tour />
      <Quiz />
    </main>
  );
}
