"use client";

import Link from "next/link";
import { BODIES, type Body } from "@/lib/planets";
import { useSolarStore } from "@/store/useSolarStore";

export function bodyDot(b: Body) {
  return {
    background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${b.color} 35%, ${b.accent} 100%)`,
    boxShadow: `0 0 8px ${b.color}99`,
  };
}

/** Desktop: vertical list on the left, each row with a link to the body's page. */
export function PlanetList() {
  const selected = useSolarStore((s) => s.selected);
  const select = useSolarStore((s) => s.select);

  return (
    <nav aria-label="Bodies" className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-0.5 md:flex">
      {BODIES.map((b) => {
        const on = selected === b.id;
        return (
          <div key={b.id} className={`group flex items-center rounded-full pr-1 transition ${on ? "bg-white/12" : "hover:bg-white/8"}`}>
            <button
              onClick={() => select(b.id)}
              className={`flex items-center gap-2.5 rounded-full py-1.5 pl-2.5 pr-2 text-left text-xs transition ${on ? "text-white" : "text-white/60 group-hover:text-white"}`}
            >
              <span className="h-3 w-3 rounded-full" style={bodyDot(b)} />
              {b.name}
            </button>
            <Link
              href={`/planet/${b.id}`}
              aria-label={`Open the ${b.name} page`}
              title={`Explore ${b.name} in depth`}
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[13px] text-white/50 transition hover:bg-amber-300/20 hover:text-amber-200 ${
                on ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus:opacity-100"
              }`}
            >
              ↗
            </Link>
          </div>
        );
      })}
    </nav>
  );
}

/** Mobile: horizontal chip strip. */
export function PlanetChips() {
  const selected = useSolarStore((s) => s.selected);
  const select = useSolarStore((s) => s.select);
  return (
    <div className="no-scrollbar flex gap-1.5 overflow-x-auto md:hidden" role="list" aria-label="Bodies">
      {BODIES.map((b) => {
        const on = selected === b.id;
        return (
          <button
            key={b.id}
            onClick={() => select(b.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition ${
              on ? "border-white/30 bg-white/15 text-white" : "border-white/10 text-white/60"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={bodyDot(b)} />
            {b.name}
          </button>
        );
      })}
    </div>
  );
}
