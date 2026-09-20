"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

// ---- Motion hooks ----------------------------------------------------------

const QUERY = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}

/** Calls `onFrame(dtSeconds)` on every animation frame while `playing` is true. */
export function useAnimationFrame(playing: boolean, onFrame: (dt: number) => void) {
  const cb = useRef(onFrame);
  useEffect(() => {
    cb.current = onFrame;
  }, [onFrame]);
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      cb.current(dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);
}

/**
 * Play/pause state that respects prefers-reduced-motion: nothing auto-plays for
 * those users, and playback pauses if the preference switches on mid-session.
 */
export function usePlayback(autoplay = false) {
  const reduced = useReducedMotion();
  // "auto" only plays when the user has not asked for reduced motion; an explicit press always wins.
  const [state, setState] = useState<"auto" | "on" | "off">(autoplay ? "auto" : "off");
  const playing = state === "on" || (state === "auto" && !reduced);
  return { playing, reduced, setPlaying: (on: boolean) => setState(on ? "on" : "off"), toggle: () => setState(playing ? "off" : "on") };
}

// ---- Controls --------------------------------------------------------------

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  /** Formatted value shown next to the label. */
  display?: string;
  /** Tick labels spread evenly under the track. */
  ticks?: string[];
  className?: string;
}

export function Slider({ label, value, min, max, step = 1, onChange, display, ticks, className = "" }: SliderProps) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={`min-w-0 ${className}`}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-xs font-medium text-white/70">
          {label}
        </label>
        {display !== undefined && (
          <output htmlFor={id} className="font-mono text-xs tabular-nums text-amber-200">
            {display}
          </output>
        )}
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--fill" as string]: `${pct}%` }}
        aria-valuetext={display}
      />
      {ticks && (
        <div className="mt-1 flex justify-between text-[10px] text-white/35" aria-hidden>
          {ticks.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export function PlayButton({ playing, onToggle, reduced, label = "animation" }: { playing: boolean; onToggle: () => void; reduced?: boolean; label?: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={playing}
      className={playing ? "btn-accent" : "btn-ghost"}
      title={reduced ? "Auto-play is off because your system prefers reduced motion" : undefined}
    >
      <span aria-hidden>{playing ? "❚❚" : "▶"}</span>
      {playing ? `Pause ${label}` : `Play ${label}`}
    </button>
  );
}

export function ButtonGroup<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-xs text-white/50">{label}</span>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={o.value === value}
          className={`rounded-full border px-3 py-1 text-xs transition ${
            o.value === value ? "border-amber-300/50 bg-amber-400/20 text-amber-100" : "border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Readout({ label, value, hint, accent }: { label: string; value: ReactNode; hint?: ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-xl border px-3 py-2.5 ${accent ? "border-amber-300/30 bg-amber-400/10" : "border-white/10 bg-white/5"}`}>
      <div className="text-[10px] uppercase tracking-wider text-white/40">{label}</div>
      <div className={`mt-0.5 text-sm font-medium ${accent ? "text-amber-100" : "text-white"}`}>{value}</div>
      {hint && <div className="mt-0.5 text-[11px] text-white/45">{hint}</div>}
    </div>
  );
}

/** Frame around a diagram: title strip plus a caption, consistent across explainers. */
export function Panel({ title, caption, children, className = "" }: { title: string; caption?: string; children: ReactNode; className?: string }) {
  return (
    <figure className={`glass min-w-0 overflow-hidden rounded-2xl ${className}`}>
      <figcaption className="flex items-baseline justify-between gap-3 border-b border-white/8 px-4 py-2.5">
        <span className="font-display text-sm font-semibold text-white">{title}</span>
        {caption && <span className="text-right text-[11px] text-white/45">{caption}</span>}
      </figcaption>
      <div className="p-3 sm:p-4">{children}</div>
    </figure>
  );
}

export function Legend({ items }: { items: { color: string; label: string; dashed?: boolean }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/60">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: i.color, outline: i.dashed ? `1px dashed ${i.color}` : undefined, opacity: i.dashed ? 0.6 : 1 }} />
          {i.label}
        </li>
      ))}
    </ul>
  );
}
