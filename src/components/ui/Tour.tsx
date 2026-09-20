"use client";

import { useEffect } from "react";
import { BODIES } from "@/lib/planets";
import { useSolarStore } from "@/store/useSolarStore";

/** Guided tour: walks outward from the Sun, one lesson card per body. */
export function Tour() {
  const step = useSolarStore((s) => s.tourStep);
  const setTourStep = useSolarStore((s) => s.setTourStep);
  const select = useSolarStore((s) => s.select);
  const setView = useSolarStore((s) => s.setView);

  // Selecting the body flies the camera there and opens its panel.
  useEffect(() => {
    if (step === null) return;
    setView("orbit");
    select(BODIES[step].id);
  }, [step, select, setView]);

  useEffect(() => {
    if (step === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && step < BODIES.length - 1) setTourStep(step + 1);
      if (e.key === "ArrowLeft" && step > 0) setTourStep(step - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, setTourStep]);

  if (step === null) return null;
  const body = BODIES[step];
  const last = step === BODIES.length - 1;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-20 z-20 flex justify-center px-4 md:top-24">
      <div className="pointer-events-auto w-full max-w-xl rounded-2xl border border-amber-300/20 bg-black/65 p-4 backdrop-blur">
        <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wider text-amber-200/80">
          <span>
            Guided tour · {step + 1} / {BODIES.length}
          </span>
          <button onClick={() => setTourStep(null)} className="text-white/50 hover:text-white">
            End tour
          </button>
        </div>
        <h3 className="mb-1 text-lg font-semibold text-white">{body.name}</h3>
        <p className="text-sm leading-relaxed text-white/85">{body.lesson}</p>
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => setTourStep(step - 1)}
            disabled={step === 0}
            className="rounded-full px-3 py-1 text-xs text-white/70 hover:text-white disabled:opacity-30"
          >
            ← Back
          </button>
          <div className="flex gap-1">
            {BODIES.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setTourStep(i)}
                aria-label={b.name}
                className={`h-1.5 w-1.5 rounded-full ${i === step ? "bg-amber-300" : "bg-white/25"}`}
              />
            ))}
          </div>
          <button
            onClick={() => (last ? setTourStep(null) : setTourStep(step + 1))}
            className="rounded-full bg-amber-400/20 px-3 py-1 text-xs text-amber-200 hover:bg-amber-400/30"
          >
            {last ? "Finish" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
