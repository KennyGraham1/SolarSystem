"use client";

import { useSolarStore, type ViewMode } from "@/store/useSolarStore";

const TABS: { id: ViewMode; label: string; short: string }[] = [
  { id: "orbit", label: "Orbit view", short: "Orbit" },
  { id: "compare", label: "Size comparison", short: "Sizes" },
];

export function Header() {
  const view = useSolarStore((s) => s.view);
  const setView = useSolarStore((s) => s.setView);
  const setQuizOpen = useSolarStore((s) => s.setQuizOpen);
  const tourStep = useSolarStore((s) => s.tourStep);
  const setTourStep = useSolarStore((s) => s.setTourStep);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-wrap items-center gap-x-4 gap-y-2 p-3 sm:p-4">
      <div className="pointer-events-auto flex items-center gap-3">
        <span className="relative flex h-8 w-8 items-center justify-center" aria-hidden>
          <span className="absolute h-8 w-8 rounded-full border border-white/15" />
          <span className="h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_14px_3px_rgba(251,191,36,0.55)]" />
          <span className="absolute -top-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sky-400" />
        </span>
        <div>
          <h1 className="font-display text-base font-semibold leading-tight tracking-tight text-white sm:text-lg">Solar System Explorer</h1>
          <p className="hidden text-[11px] text-white/45 sm:block">Drag to orbit · Scroll to zoom · Click a body to learn about it · Positions are real for the date shown</p>
        </div>
      </div>
      <div className="pointer-events-auto ml-auto flex items-center gap-2">
        <div className="glass flex rounded-full p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition ${
                view === t.id ? "bg-white/15 text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]" : "text-white/55 hover:text-white"
              }`}
            >
              <span className="sm:hidden">{t.short}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
        <button onClick={() => setTourStep(tourStep === null ? 0 : null)} className={`whitespace-nowrap !py-1.5 ${tourStep === null ? "btn-ghost" : "btn-accent"}`}>
          {tourStep === null ? "Start tour" : "End tour"}
        </button>
        <button onClick={() => setQuizOpen(true)} className="btn-accent whitespace-nowrap !py-1.5">
          <span className="sm:hidden">Quiz</span>
          <span className="hidden sm:inline">Take the quiz</span>
        </button>
      </div>
    </header>
  );
}
