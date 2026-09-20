import { bodyById, formatKm, formatPeriod, type Body } from "./planets";
import { lightTimeSeconds, orbitalSpeedKmS } from "./orbits";

export function formatLightTime(seconds: number) {
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)} min`;
  return `${(seconds / 3600).toFixed(1)} hours`;
}

export interface Stat {
  label: string;
  value: string;
  hint?: string;
}

/** The headline numbers for a body, in display order. */
export function bodyStats(b: Body): Stat[] {
  const isSun = b.id === "sun";
  const retro = b.rotationPeriodDays < 0;
  const stats: Stat[] = [
    { label: "Radius", value: formatKm(b.radiusKm), hint: `${(b.radiusKm / 6371).toLocaleString("en-US", { maximumSignificantDigits: 3 })} × Earth` },
    { label: "Mass", value: `${b.massEarths.toLocaleString("en-US", { maximumSignificantDigits: 3 })} × Earth` },
  ];
  const isMoon = b.kind === "moon";
  if (isMoon && b.parent && b.orbitRadiusKm) {
    const parent = bodyById(b.parent);
    stats.push(
      { label: `Distance from ${parent.name}`, value: formatKm(b.orbitRadiusKm), hint: `${(b.orbitRadiusKm / parent.radiusKm).toLocaleString("en-US", { maximumSignificantDigits: 3 })} × ${parent.name} radii` },
      { label: "Orbital period", value: `${formatPeriod(b.orbitalPeriodDays)}${b.orbitalPeriodDays < 0 ? " (retrograde)" : ""}` },
    );
  } else if (!isSun) {
    stats.push(
      { label: "Distance from Sun", value: `${b.distanceAU} AU`, hint: `${Math.round(b.distanceAU * 149.6).toLocaleString("en-US")} million km` },
      { label: "Year length", value: formatPeriod(b.orbitalPeriodDays) },
    );
  }
  stats.push(
    { label: "Rotation period", value: `${formatPeriod(b.rotationPeriodDays)}${retro ? " (retrograde)" : ""}` },
    { label: "Axial tilt", value: `${b.axialTiltDeg}°` },
    { label: "Gravity", value: `${b.gravity} m/s²`, hint: `${(b.gravity / 9.81).toLocaleString("en-US", { maximumSignificantDigits: 2 })} g` },
    { label: "Mean temp.", value: `${b.meanTempC.toLocaleString("en-US")} °C` },
  );
  if (!isSun) {
    if (!isMoon) stats.push({ label: "Known moons", value: String(b.moons) });
    stats.push(
      { label: "Orbital speed", value: `${orbitalSpeedKmS(b).toFixed(1)} km/s` },
      { label: "Sunlight takes", value: formatLightTime(lightTimeSeconds(b.distanceAU)) },
    );
  }
  return stats;
}

const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻" };

/** Human-friendly number: thousands separators, 3 significant digits, ×10ⁿ for very large/small values. */
export function formatNumber(n: number) {
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e12 || abs < 1e-3) {
    const [m, e] = n.toExponential(2).split("e");
    const exp = String(Number(e)).replace(/./g, (c) => SUP[c] ?? c);
    return `${Number(m).toLocaleString("en-US", { maximumSignificantDigits: 3 })} × 10${exp}`;
  }
  if (abs >= 1000) return Math.round(n).toLocaleString("en-US");
  return n.toLocaleString("en-US", { maximumSignificantDigits: 3 });
}

/** "×" multiplier text for a ratio. */
export function formatRatio(r: number) {
  if (!Number.isFinite(r)) return "—";
  if (r >= 100) return `${Math.round(r).toLocaleString("en-US")}×`;
  if (r >= 10) return `${r.toFixed(1)}×`;
  if (r >= 0.1) return `${r.toFixed(2)}×`;
  return `${r.toLocaleString("en-US", { maximumSignificantDigits: 2 })}×`;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
