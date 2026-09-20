"use client";

import dynamic from "next/dynamic";
import type { Body } from "@/lib/planets";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <HeroPlaceholder />,
});

function HeroPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse-soft rounded-full bg-white/5" />
    </div>
  );
}

/** Client-only WebGL hero (WebGL has no server counterpart). */
export function PlanetHero3D({ body }: { body: Body }) {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#03050c] sm:h-[420px] lg:h-[520px]">
      <HeroScene body={body} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#03050c]/70 to-transparent" />
      <div className="pointer-events-none absolute bottom-3 right-4 text-[11px] text-white/35">Drag to rotate</div>
    </div>
  );
}
