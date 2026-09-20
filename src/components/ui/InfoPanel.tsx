"use client";

import { useState } from "react";
import Link from "next/link";
import { bodyById, type Body } from "@/lib/planets";
import { bodyStats } from "@/lib/format";
import { useSolarStore } from "@/store/useSolarStore";
import { YouOnPlanet } from "./YouOnPlanet";
import { bodyDot } from "./PlanetList";

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg bg-white/5 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-white/40">{label}</div>
      <div className="text-sm text-white">{value}</div>
      {hint && <div className="text-[10px] text-white/40">{hint}</div>}
    </div>
  );
}

export function InfoPanel() {
  const selected = useSolarStore((s) => s.selected);
  if (!selected) return null;
  // Keyed so the sheet state and animations restart for each body.
  return <Panel key={selected} body={bodyById(selected)} />;
}

function Panel({ body: b }: { body: Body }) {
  const select = useSolarStore((s) => s.select);
  // Mobile bottom sheet: peek (header only) or expanded.
  const [expanded, setExpanded] = useState(false);
  const stats = bodyStats(b);

  return (
    <aside
      aria-label={`${b.name} facts`}
      className={`glass-strong animate-slide-up md:animate-slide-in-right scroll-thin absolute inset-x-0 bottom-0 z-30 flex flex-col rounded-t-3xl !bg-[#090c18] md:!bg-[var(--panel-strong)] transition-[max-height] duration-300 md:inset-x-auto md:bottom-28 md:right-4 md:top-20 md:z-20 md:w-[22rem] md:max-h-none md:rounded-2xl ${
        expanded ? "max-h-[78dvh]" : "max-h-[11.5rem]"
      }`}
    >
      {/* drag handle (mobile) */}
      <button
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        aria-label={expanded ? "Collapse details" : "Expand details"}
        className="flex w-full justify-center pt-2.5 pb-1 md:hidden"
      >
        <span className="h-1 w-10 rounded-full bg-white/25" />
      </button>

      <div className="overflow-y-auto px-5 pb-5 pt-2 md:pt-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="eyebrow">{b.type}</div>
            <h2 className="font-display flex items-center gap-2.5 text-2xl font-semibold tracking-tight text-white">
              <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={bodyDot(b)} />
              <Link href={`/planet/${b.id}`} className="truncate transition hover:text-amber-200" title={`Open the ${b.name} page`}>
                {b.name}
              </Link>
            </h2>
          </div>
          <button onClick={() => select(null)} aria-label="Close" className="rounded-full px-2 py-1 text-white/50 transition hover:bg-white/10 hover:text-white">
            ✕
          </button>
        </div>

        <Link href={`/planet/${b.id}`} className="btn-accent mb-4 w-full justify-center">
          Explore {b.name} in depth →
        </Link>

        <p className="mb-4 text-sm leading-relaxed text-white/80">{b.description}</p>

        <div className="mb-4 grid grid-cols-2 gap-2">
          {stats.map((s) => (
            <Stat key={s.label} label={s.label} value={s.value} hint={s.hint} />
          ))}
        </div>

        <h3 className="eyebrow mb-1.5">Did you know?</h3>
        <ul className="space-y-1.5 text-sm text-white/75">
          {b.facts.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-amber-300">•</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <YouOnPlanet key={b.id} body={b} />
      </div>
    </aside>
  );
}
