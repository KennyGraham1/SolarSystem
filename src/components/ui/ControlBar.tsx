"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useSolarStore } from "@/store/useSolarStore";
import { METRICS, metricById } from "@/lib/compare";
import { PlanetChips } from "./PlanetList";

// Log-scale slider: 0..100 -> 0.1..1000 days per second
const toSpeed = (v: number) => Math.pow(10, v / 25 - 1);
const fromSpeed = (s: number) => (Math.log10(s) + 1) * 25;

const PRESETS = [
  { label: "1 day/s", speed: 1 },
  { label: "1 wk/s", speed: 7 },
  { label: "1 mo/s", speed: 30 },
  { label: "1 yr/s", speed: 365 },
];

function formatSpeed(s: number) {
  if (s >= 365) return `${(s / 365).toFixed(1)} yr / s`;
  if (s >= 30) return `${(s / 30).toFixed(1)} mo / s`;
  if (s >= 1) return `${s.toFixed(1)} d / s`;
  return `${(s * 24).toFixed(1)} h / s`;
}

// Format in LOCAL time to match how the input's value is parsed (local noon);
// toISOString() would shift the day for users far east or west of UTC.
const toInputDate = (d: Date) =>
  `${d.getFullYear().toString().padStart(4, "0")}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;

function SimDate() {
  // Poll the fast-changing clock at a readable rate instead of every frame.
  const [date, setDate] = useState<Date | null>(null);
  const jumpToDate = useSolarStore((s) => s.jumpToDate);
  useEffect(() => {
    const tick = () => {
      const { epochMs, simDays } = useSolarStore.getState();
      setDate(new Date(epochMs + simDays * 86_400_000));
    };
    tick();
    const id = setInterval(tick, 200);
    return () => clearInterval(id);
  }, []);
  if (!date) return null;
  const valid = date.getFullYear() >= 1800 && date.getFullYear() <= 2050;
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-white/40">Date</span>
      <input
        type="date"
        min="1800-01-01"
        max="2050-12-31"
        value={valid ? toInputDate(date) : ""}
        onChange={(e) => {
          const d = new Date(e.target.value + "T12:00:00");
          if (!Number.isNaN(d.getTime())) jumpToDate(d);
        }}
        className="rounded-md border border-white/10 bg-white/8 px-2 py-0.5 font-mono text-white/90 outline-none transition focus:border-amber-300/50 [color-scheme:dark]"
        title="Planet positions are computed for this date (accurate 1800–2050)"
      />
      <button onClick={() => jumpToDate(new Date())} className="rounded-md px-2 py-1 text-[11px] text-white/60 transition hover:bg-white/10 hover:text-white">
        Today
      </button>
      {!valid && <span className="text-amber-300/80">positions approximate outside 1800–2050</span>}
    </div>
  );
}

function ComparePicker() {
  const metric = useSolarStore((s) => s.compareMetric);
  const group = useSolarStore((s) => s.compareGroup);
  const setMetric = useSolarStore((s) => s.setCompareMetric);
  const setGroup = useSolarStore((s) => s.setCompareGroup);
  const showLabels = useSolarStore((s) => s.showLabels);
  const toggle = useSolarStore((s) => s.toggle);
  const def = metricById(metric);
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="text-[11px] uppercase tracking-wider text-white/40">Compare by</span>
        <div className="no-scrollbar flex gap-1 overflow-x-auto">
          {METRICS.map((m) => (
            <button
              key={m.id}
              onClick={() => setMetric(m.id)}
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs transition ${metric === m.id ? "bg-amber-300/20 text-amber-100" : "text-white/55 hover:bg-white/10 hover:text-white"}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="text-[11px] uppercase tracking-wider text-white/40">Show</span>
        {(
          [
            ["planets", "Sun & planets"],
            ["moons", "Dwarfs & moons"],
            ["all", "Everything"],
          ] as const
        ).map(([id, label]) => (
          <Toggle key={id} label={label} on={group === id} onClick={() => setGroup(id)} />
        ))}
        <span className="mx-1 hidden h-4 w-px bg-white/10 sm:block" />
        <Toggle label="Labels" on={showLabels} onClick={() => toggle("showLabels")} />
        <p className="basis-full text-[11px] text-white/45 sm:ml-auto sm:basis-auto">{def.hint} Click a body to learn more.</p>
      </div>
    </div>
  );
}

function Toggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-full border px-2.5 py-1 text-xs transition ${
        on ? "border-amber-300/40 bg-amber-300/15 text-amber-100" : "border-white/10 text-white/50 hover:border-white/20 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

export function ControlBar() {
  const { speed, paused, showOrbits, showLabels, showBelts, trueDistances, view } = useSolarStore();
  const setSpeed = useSolarStore((s) => s.setSpeed);
  const togglePaused = useSolarStore((s) => s.togglePaused);
  const toggle = useSolarStore((s) => s.toggle);
  const resetView = useSolarStore((s) => s.resetView);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePaused();
      }
      if (e.key === "Escape") resetView();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePaused, resetView]);

  const sliderStyle = { "--fill": `${fromSpeed(speed)}%` } as CSSProperties;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center p-3 sm:p-4">
      <div className="glass animate-slide-up pointer-events-auto flex w-full max-w-3xl flex-col gap-2.5 rounded-2xl px-4 py-3">
        <PlanetChips />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {view === "orbit" ? (
            <>
              <button
                onClick={togglePaused}
                aria-label={paused ? "Play" : "Pause"}
                title="Space"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-300 text-sm text-black shadow-[0_0_18px_rgba(251,191,36,0.4)] transition hover:bg-amber-200"
              >
                {paused ? "▶" : "❚❚"}
              </button>
              <div className="flex min-w-[180px] flex-1 flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Time speed</span>
                  <span className="font-mono text-white/80">{formatSpeed(speed)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.5}
                  value={fromSpeed(speed)}
                  onChange={(e) => setSpeed(toSpeed(Number(e.target.value)))}
                  style={sliderStyle}
                  aria-label="Time speed"
                />
              </div>
              <div className="flex gap-0.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setSpeed(p.speed)}
                    className={`rounded-md px-2 py-1 text-[11px] transition hover:bg-white/10 hover:text-white ${Math.abs(speed - p.speed) < 1e-6 ? "text-amber-200" : "text-white/60"}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <div className="basis-full lg:basis-auto">
                <SimDate />
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Toggle label="Orbits" on={showOrbits} onClick={() => toggle("showOrbits")} />
                <Toggle label="Labels" on={showLabels} onClick={() => toggle("showLabels")} />
                <Toggle label="Belts" on={showBelts} onClick={() => toggle("showBelts")} />
              <Toggle label="True distances" on={trueDistances} onClick={() => toggle("trueDistances")} />
              </div>
            </>
          ) : (
            <ComparePicker />
          )}
          <button onClick={resetView} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/60 transition hover:border-white/25 hover:text-white" title="Esc">
            Reset view
          </button>
        </div>
      </div>
    </div>
  );
}
