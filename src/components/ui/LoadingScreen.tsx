"use client";

import { useEffect, useState } from "react";
import { useSolarStore } from "@/store/useSolarStore";

/** Full-screen splash shown until the WebGL scene has drawn its first frame. */
export function LoadingScreen() {
  const ready = useSolarStore((s) => s.sceneReady);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => setGone(true), 700);
    return () => clearTimeout(id);
  }, [ready]);
  if (gone) return null;
  return (
    <div
      className={`absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#03050c] transition-opacity duration-700 ${ready ? "pointer-events-none opacity-0" : "opacity-100"}`}
      aria-live="polite"
      aria-busy={!ready}
    >
      <div className="relative h-28 w-28">
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="absolute inset-[18px] rounded-full border border-white/10" />
        <div className="animate-pulse-soft absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300 shadow-[0_0_30px_8px_rgba(251,191,36,0.45)]" />
        <div className="animate-orbit absolute inset-0">
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
        </div>
        <div className="animate-orbit absolute inset-[18px] [animation-duration:1.5s] [animation-direction:reverse]">
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300" />
        </div>
      </div>
      <p className="font-display mt-8 text-lg font-semibold tracking-tight text-white">Solar System Explorer</p>
      <p className="mt-1 text-xs text-white/45">Loading planets and textures…</p>
    </div>
  );
}
