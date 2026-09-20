import { bodyById, formatPeriod, type Body } from "./planets";
import { formatNumber } from "./format";
import type { CompareMetric } from "@/store/useSolarStore";

export interface MetricDef {
  id: CompareMetric;
  label: string;
  /** Short explanation shown under the picker. */
  hint: string;
  /** Raw value for a body (null = not applicable). */
  value: (b: Body) => number | null;
  format: (v: number, b: Body) => string;
  /** Bars use a log scale when values span orders of magnitude. */
  log: boolean;
}

export const METRICS: MetricDef[] = [
  { id: "size", label: "Size", hint: "True relative diameters (Earth = 1).", value: (b) => b.radiusKm, format: (v) => `${(v / 6371).toLocaleString("en-US", { maximumSignificantDigits: 2 })}× Earth`, log: false },
  { id: "mass", label: "Mass", hint: "Bars use a logarithmic scale: the Sun outweighs Earth 333,000 to 1.", value: (b) => b.massEarths, format: (v) => `${formatNumber(v)} × Earth`, log: true },
  { id: "gravity", label: "Gravity", hint: "Surface gravity. Your weight scales with it.", value: (b) => b.gravity, format: (v) => `${v < 0.1 ? v.toLocaleString("en-US", { maximumSignificantDigits: 2 }) : v.toFixed(1)} m/s²`, log: true },
  { id: "day", label: "Day length", hint: "One rotation. Moons are tidally locked, so their day equals their orbit.", value: (b) => Math.abs(b.rotationPeriodDays), format: (v) => formatPeriod(v), log: true },
  { id: "year", label: "Year length", hint: "Time to orbit the Sun (moons: their planet's year).", value: (b) => (b.kind === "star" ? null : b.kind === "moon" && b.parent ? bodyById(b.parent).orbitalPeriodDays : b.orbitalPeriodDays), format: (v) => formatPeriod(v), log: true },
  { id: "temperature", label: "Temperature", hint: "Mean surface (or cloud-top) temperature.", value: (b) => (b.kind === "star" ? null : b.meanTempC), format: (v) => `${Math.round(v)} °C`, log: false },
  { id: "distance", label: "Distance from Sun", hint: "Mean distance in astronomical units (Earth = 1 AU).", value: (b) => (b.kind === "star" ? null : b.distanceAU), format: (v) => `${v.toLocaleString("en-US", { maximumSignificantDigits: 3 })} AU`, log: true },
  { id: "moons", label: "Known moons", hint: "Counts keep rising as surveys find more.", value: (b) => (b.kind === "moon" || b.kind === "star" ? null : b.moons), format: (v) => `${v}`, log: true },
];

export const metricById = (id: CompareMetric) => METRICS.find((m) => m.id === id)!;

/** Bar height fraction 0..1 for a value within the shown set. */
export function normalise(values: number[], v: number, log: boolean) {
  if (log) {
    const lv = values.map((x) => Math.log10(Math.max(x, 1e-12)));
    const lo = Math.min(...lv), hi = Math.max(...lv);
    return hi === lo ? 1 : (Math.log10(Math.max(v, 1e-12)) - lo) / (hi - lo);
  }
  const lo = Math.min(...values), hi = Math.max(...values);
  return hi === lo ? 1 : (v - lo) / (hi - lo);
}
