"use client";

import { useEffect } from "react";
import Link from "next/link";
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
    <div className="pointer-events-none absolute inset-x-0 top-16 z-20 flex justify-center px-3 sm:top-20 sm:px-4 md:top-24">
      <div key={step} className="glass-strong animate-drift-down pointer-events-auto w-full max-w-xl rounded-2xl border-amber-300/25 p-4 sm:p-5">
        <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-amber-200/80">
          <span>
            Guided tour · {step + 1} / {BODIES.length}
          </span>
          <button onClick={() => setTourStep(null)} className="normal-case tracking-normal text-white/50 transition hover:text-white">
            End tour
          </button>
        </div>
        <h3 className="font-display mb-1 text-xl font-semibold tracking-tight text-white">{body.name}</h3>
        <p className="text-sm leading-relaxed text-white/85">{body.lesson}</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <button onClick={() => setTourStep(step - 1)} disabled={step === 0} className="btn-ghost !px-3 !py-1 text-xs">
            ← Back
          </button>
          <div className="flex items-center gap-1.5" aria-hidden>
            {BODIES.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setTourStep(i)}
                aria-label={b.name}
                className={`rounded-full transition-all ${i === step ? "h-1.5 w-4 bg-amber-300" : "h-1.5 w-1.5 bg-white/25 hover:bg-white/50"}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/planet/${body.id}`} className="text-xs text-white/60 underline-offset-4 transition hover:text-amber-200 hover:underline">
              Read more ↗
            </Link>
            <button onClick={() => (last ? setTourStep(null) : setTourStep(step + 1))} className="btn-accent !px-3 !py-1 text-xs">
              {last ? "Finish" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
