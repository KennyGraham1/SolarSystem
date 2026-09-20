"use client";

import { useSolarStore, type ViewMode } from "@/store/useSolarStore";

const TABS: { id: ViewMode; label: string }[] = [
  { id: "orbit", label: "Orbit view" },
  { id: "compare", label: "Size comparison" },
];

export function Header() {
  const view = useSolarStore((s) => s.view);
  const setView = useSolarStore((s) => s.setView);
  const setQuizOpen = useSolarStore((s) => s.setQuizOpen);
  const tourStep = useSolarStore((s) => s.tourStep);
  const setTourStep = useSolarStore((s) => s.setTourStep);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-wrap items-center gap-3 p-4">
      <div className="pointer-events-auto">
        <h1 className="text-lg font-semibold tracking-tight text-white">Solar System Explorer</h1>
        <p className="text-xs text-white/50">Drag to orbit · Scroll to zoom · Click a body to learn about it · Positions are real for the date shown</p>
      </div>
      <div className="pointer-events-auto ml-auto flex items-center gap-2">
        <div className="flex rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                view === t.id ? "bg-white/15 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setTourStep(tourStep === null ? 0 : null)}
          className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur transition hover:bg-white/10"
        >
          {tourStep === null ? "Start tour" : "End tour"}
        </button>
        <button
          onClick={() => setQuizOpen(true)}
          className="rounded-full border border-amber-300/30 bg-amber-400/15 px-3 py-1.5 text-xs font-medium text-amber-200 backdrop-blur transition hover:bg-amber-400/25"
        >
          Take the quiz
        </button>
      </div>
    </header>
  );
}
