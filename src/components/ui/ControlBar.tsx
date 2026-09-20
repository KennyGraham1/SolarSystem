"use client";

import { useEffect, useState } from "react";
import { useSolarStore } from "@/store/useSolarStore";

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

const toInputDate = (d: Date) => d.toISOString().slice(0, 10);

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
    <div className="flex items-center gap-2 text-xs">
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
        className="rounded bg-white/10 px-2 py-0.5 font-mono text-white/90 outline-none [color-scheme:dark]"
        title="Planet positions are computed for this date (accurate 1800–2050)"
      />
      <button onClick={() => jumpToDate(new Date())} className="rounded-md px-2 py-1 text-[11px] text-white/60 hover:bg-white/10 hover:text-white">
        Today
      </button>
      {!valid && <span className="text-amber-300/80">positions approximate outside 1800–2050</span>}
    </div>
  );
}

function Toggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 text-xs transition ${
        on ? "border-white/30 bg-white/15 text-white" : "border-white/10 text-white/50 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

export function ControlBar() {
  const { speed, paused, showOrbits, showLabels, trueDistances, view } = useSolarStore();
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

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center p-4">
      <div className="pointer-events-auto flex w-full max-w-3xl flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur">
        {view === "orbit" ? (
          <>
            <button
              onClick={togglePaused}
              aria-label={paused ? "Play" : "Pause"}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              {paused ? "▶" : "❚❚"}
            </button>
            <div className="flex min-w-[200px] flex-1 flex-col gap-1">
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
                className="accent-amber-300"
              />
            </div>
            <div className="flex gap-1">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setSpeed(p.speed)}
                  className="rounded-md px-2 py-1 text-[11px] text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="basis-full md:basis-auto">
              <SimDate />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Toggle label="Orbits" on={showOrbits} onClick={() => toggle("showOrbits")} />
              <Toggle label="Labels" on={showLabels} onClick={() => toggle("showLabels")} />
              <Toggle label="True distances" on={trueDistances} onClick={() => toggle("trueDistances")} />
            </div>
          </>
        ) : (
          <>
            <p className="flex-1 text-xs text-white/70">
              Every body is drawn at its <span className="text-white">true relative size</span> (Earth = 1). Click one to learn more.
            </p>
            <Toggle label="Labels" on={showLabels} onClick={() => toggle("showLabels")} />
          </>
        )}
        <button
          onClick={resetView}
          className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/60 transition hover:text-white"
          title="Esc"
        >
          Reset view
        </button>
      </div>
    </div>
  );
}
