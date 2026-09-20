"use client";

import { useState } from "react";
import type { Body } from "@/lib/planets";

/** Small calculator: what your weight and age would be on this body. */
export function YouOnPlanet({ body }: { body: Body }) {
  const [weight, setWeight] = useState(60);
  const [age, setAge] = useState(12);
  const isSun = body.id === "sun";
  const weightHere = (weight * body.gravity) / 9.81;
  const ageHere = isSun ? null : (age * 365.25) / body.orbitalPeriodDays;

  return (
    <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3">
      <h3 className="eyebrow mb-2">You on {body.name}</h3>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <label className="flex flex-col gap-1 text-white/50">
          Your weight (kg)
          <input
            type="number"
            min={1}
            value={weight}
            onChange={(e) => setWeight(Math.max(0, Number(e.target.value)))}
            className="rounded-md border border-white/10 bg-black/40 px-2 py-1 text-white outline-none transition focus:border-amber-300/50"
          />
        </label>
        <label className="flex flex-col gap-1 text-white/50">
          Your age (years)
          <input
            type="number"
            min={0}
            value={age}
            onChange={(e) => setAge(Math.max(0, Number(e.target.value)))}
            className="rounded-md border border-white/10 bg-black/40 px-2 py-1 text-white outline-none transition focus:border-amber-300/50"
          />
        </label>
      </div>
      <p className="mt-2 text-sm text-white/85">
        The scales would read <span className="font-semibold text-amber-200">{weightHere.toFixed(1)} kg</span>
        {isSun ? " at the Sun's surface (your mass doesn't change — gravity does)" : ""}
        {ageHere !== null && (
          <>
            {" "}
            and be{" "}
            <span className="font-semibold text-amber-200">
              {ageHere >= 10 ? Math.round(ageHere) : ageHere.toFixed(1)} {body.name} years
            </span>{" "}
            old
          </>
        )}
        .
      </p>
    </div>
  );
}
