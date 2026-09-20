"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useSolarStore } from "@/store/useSolarStore";
import { DEG } from "./astro";
import { CAMERA, FRAME_R, LEVELS, cameraDistanceFor, canvasHeight, formatFactor, zoomFactor } from "./levels";

const subscribeResize = (cb: () => void) => {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
};
const useViewport = () => useSyncExternalStore(subscribeResize, () => `${window.innerWidth}x${window.innerHeight}`, () => "1400x900");

/** Pixels on screen per scene unit in the plane through the origin (perspective camera at a fixed distance). */
function usePxPerUnit() {
  const [w, h] = useViewport().split("x").map(Number);
  const ch = canvasHeight(w, h);
  return ch / 2 / (cameraDistanceFor(w, ch) * Math.tan((CAMERA.fov / 2) * DEG));
}

function ScaleBar({ level }: { level: number }) {
  const def = LEVELS[level];
  const px = def.scaleBar.value * (FRAME_R / def.radius) * usePxPerUnit();
  return (
    <div className="mt-4 border-t border-white/10 pt-3">
      <div className="eyebrow mb-1.5">Scale</div>
      <div className="flex items-end gap-3">
        <div className="relative h-3 shrink-0 border-x border-b border-amber-300/80" style={{ width: Math.max(12, Math.round(px)) }}>
          <div className="absolute inset-x-0 bottom-0 h-px bg-amber-300/80" />
        </div>
        <span className="text-xs text-white/75">{def.scaleBar.label}</span>
      </div>
    </div>
  );
}

const ZoomInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
    <path d="M8 3v10M3 8h10" />
  </svg>
);
const ZoomOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
    <path d="M3 8h10" />
  </svg>
);

export function UniverseHud() {
  const level = useSolarStore((s) => s.universeLevel);
  const setLevel = useSolarStore((s) => s.setUniverseLevel);
  const setView = useSolarStore((s) => s.setView);
  const quizOpen = useSolarStore((s) => s.quizOpen);
  const last = LEVELS.length - 1;
  const def = LEVELS[level];
  const factor = zoomFactor(level);

  const step = (d: number) => setLevel(Math.min(last, Math.max(0, level + d)));

  useEffect(() => {
    if (quizOpen) return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT")) return;
      if (e.key === "+" || e.key === "=" || e.key === "ArrowUp" || e.key === "ArrowRight") {
        e.preventDefault();
        setLevel(Math.min(last, level + 1));
      } else if (e.key === "-" || e.key === "_" || e.key === "ArrowDown" || e.key === "ArrowLeft") {
        e.preventDefault();
        setLevel(Math.max(0, level - 1));
      } else if (e.key === "Home") {
        setLevel(0);
      } else if (e.key === "End") {
        setLevel(last);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [level, last, quizOpen, setLevel]);

  return (
    <>
      {/* Level ladder: right rail on desktop, horizontal dots on phones. */}
      <nav aria-label="Zoom level" className="pointer-events-none absolute inset-x-0 bottom-[calc(42dvh+8px)] z-10 flex justify-center px-4 sm:inset-x-auto sm:bottom-auto sm:right-4 sm:top-1/2 sm:-translate-y-1/2 sm:px-0">
        <div className="glass pointer-events-auto flex items-center gap-1 rounded-full p-1.5 sm:flex-col sm:items-stretch sm:gap-0 sm:rounded-2xl sm:p-2">
          <button onClick={() => step(1)} disabled={level >= last} className="btn-ghost !gap-1.5 !px-3 !py-1.5 sm:mb-1.5 sm:justify-center" title="Zoom out (+ or ↑)">
            <ZoomInIcon />
            <span className="hidden sm:inline">Zoom out</span>
          </button>
          <ol className="flex items-center gap-1 sm:flex-col-reverse sm:items-stretch sm:gap-0">
            {LEVELS.map((l, i) => {
              const active = i === level;
              return (
                <li key={l.id} className="flex items-center sm:flex-col">
                  {i > 0 && <span className="hidden text-center text-[10px] leading-3 text-amber-200/55 sm:block">{formatFactor(zoomFactor(i))}</span>}
                  <button
                    onClick={() => setLevel(i)}
                    aria-current={active ? "step" : undefined}
                    title={l.title}
                    className={`group flex items-center gap-2 rounded-full p-1 transition sm:w-full sm:rounded-lg sm:px-2 sm:py-0.5 ${active ? "text-white" : "text-white/45 hover:text-white/85"}`}
                  >
                    <span className={`block h-2.5 w-2.5 shrink-0 rounded-full transition ${active ? "bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.8)]" : "bg-white/30 group-hover:bg-white/60"}`} />
                    <span className={`hidden whitespace-nowrap text-[11px] sm:inline ${active ? "font-medium" : ""}`}>{l.short}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          <button onClick={() => step(-1)} disabled={level <= 0} className="btn-ghost !gap-1.5 !px-3 !py-1.5 sm:mt-1.5 sm:justify-center" title="Zoom in (− or ↓)">
            <ZoomOutIcon />
            <span className="hidden sm:inline">Zoom in</span>
          </button>
        </div>
      </nav>

      {/* Caption: bottom-left card on desktop, bottom sheet on phones. */}
      <section aria-live="polite" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[380px]">
        <div key={def.id} className="glass-strong animate-slide-up pointer-events-auto max-h-[42dvh] overflow-y-auto rounded-t-2xl px-5 pb-5 pt-4 scroll-thin sm:max-h-[calc(100dvh-120px)] sm:rounded-2xl">
          <div className="flex items-baseline justify-between gap-3">
            <span className="eyebrow">
              Step {level + 1} of {LEVELS.length} · {def.span}
            </span>
            {level > 0 && (
              <span className="shrink-0 whitespace-nowrap rounded-full bg-amber-300/15 px-2 py-0.5 text-[11px] font-medium text-amber-200" title="Field of view compared with the previous step">
                {formatFactor(factor)} wider
              </span>
            )}
          </div>
          <h2 className="font-display mt-1 text-xl font-semibold tracking-tight text-white">{def.title}</h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-white/80">{def.seeing}</p>
          <ul className="mt-3 space-y-1.5">
            {def.facts.map((f) => (
              <li key={f} className="flex gap-2 text-xs leading-relaxed text-white/65">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-amber-300/80" aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <ScaleBar level={level} />
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <button onClick={() => setView("orbit")} className="btn-accent !py-1.5">
              ← Back to the solar system
            </button>
            <span className="hidden text-[11px] text-white/40 sm:inline">Keys: + / − · drag to orbit</span>
          </div>
        </div>
      </section>
    </>
  );
}
