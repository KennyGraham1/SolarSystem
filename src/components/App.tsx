"use client";

import dynamic from "next/dynamic";
import { Header } from "./ui/Header";
import { PlanetList } from "./ui/PlanetList";
import { ControlBar } from "./ui/ControlBar";
import { InfoPanel } from "./ui/InfoPanel";
import { Quiz } from "./ui/Quiz";
import { Tour } from "./ui/Tour";
import { LoadingScreen } from "./ui/LoadingScreen";
import { UniverseHud } from "./universe/UniverseHud";
import { useSolarStore } from "@/store/useSolarStore";

// WebGL only exists in the browser, so the scenes must skip server rendering.
const SolarScene = dynamic(() => import("./scene/SolarScene"), { ssr: false, loading: () => null });
const UniverseScene = dynamic(() => import("./universe/UniverseScene"), { ssr: false, loading: () => null });

export function App() {
  const universe = useSolarStore((s) => s.view === "universe");
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-[#03050c]">
      {universe ? <UniverseScene /> : <SolarScene />}
      <LoadingScreen />
      <Header />
      {universe ? (
        <UniverseHud />
      ) : (
        <>
          <PlanetList />
          <InfoPanel />
          <ControlBar />
          <Tour />
        </>
      )}
      <Quiz />
    </main>
  );
}
