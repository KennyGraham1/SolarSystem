"use client";

import { BODIES } from "@/lib/planets";
import { useSolarStore } from "@/store/useSolarStore";

export function PlanetList() {
  const selected = useSolarStore((s) => s.selected);
  const select = useSolarStore((s) => s.select);

  return (
    <nav className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-1 md:flex">
      {BODIES.map((b) => (
        <button
          key={b.id}
          onClick={() => select(b.id)}
          className={`flex items-center gap-2 rounded-full px-2.5 py-1 text-left text-xs transition ${
            selected === b.id ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.color, boxShadow: `0 0 6px ${b.color}` }} />
          {b.name}
        </button>
      ))}
    </nav>
  );
}
