"use client";

import { bodyById, formatKm, formatPeriod } from "@/lib/planets";
import { useSolarStore } from "@/store/useSolarStore";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/5 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-white/40">{label}</div>
      <div className="text-sm text-white">{value}</div>
    </div>
  );
}

export function InfoPanel() {
  const selected = useSolarStore((s) => s.selected);
  const select = useSolarStore((s) => s.select);
  if (!selected) return null;
  const b = bodyById(selected);
  const isSun = b.id === "sun";
  const retro = b.rotationPeriodDays < 0;

  return (
    <aside className="absolute inset-x-4 bottom-24 z-20 max-h-[55vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur md:inset-x-auto md:right-4 md:top-20 md:bottom-28 md:w-80 md:max-h-none">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-white/40">{b.type}</div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
            <span className="h-3 w-3 rounded-full" style={{ background: b.color, boxShadow: `0 0 10px ${b.color}` }} />
            {b.name}
          </h2>
        </div>
        <button onClick={() => select(null)} aria-label="Close" className="rounded-full px-2 text-white/50 hover:text-white">
          ✕
        </button>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-white/80">{b.description}</p>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <Stat label="Radius" value={formatKm(b.radiusKm)} />
        <Stat label="Mass" value={isSun ? "333,000 × Earth" : `${b.massEarths} × Earth`} />
        {!isSun && <Stat label="Distance from Sun" value={`${b.distanceAU} AU`} />}
        {!isSun && <Stat label="Year length" value={formatPeriod(b.orbitalPeriodDays)} />}
        <Stat label="Day length" value={`${formatPeriod(b.rotationPeriodDays)}${retro ? " (retrograde)" : ""}`} />
        <Stat label="Axial tilt" value={`${b.axialTiltDeg}°`} />
        <Stat label="Gravity" value={`${b.gravity} m/s²`} />
        <Stat label="Mean temp." value={`${b.meanTempC.toLocaleString("en-US")} °C`} />
        {!isSun && <Stat label="Moons" value={String(b.moons)} />}
      </div>

      <h3 className="mb-1.5 text-[11px] uppercase tracking-wider text-white/40">Did you know?</h3>
      <ul className="space-y-1.5 text-sm text-white/75">
        {b.facts.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="text-amber-300">•</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
