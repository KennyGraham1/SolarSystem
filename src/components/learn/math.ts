/** Small pure helpers shared by the Learn diagrams (safe on server and client). */

export const DEG = Math.PI / 180;
export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const mod = (n: number, m: number) => ((n % m) + m) % m;

/**
 * Round to 3 decimals. Trig results can differ in the last bit between the
 * server's and the browser's JS engines, which would trip hydration; every
 * coordinate derived from sin/cos/atan goes through this.
 */
export const r3 = (n: number) => Math.round(n * 1000) / 1000;

/** Point on a circle. Angles in radians, SVG coordinates (y grows downward). */
export const polar = (cx: number, cy: number, r: number, a: number) => ({ x: r3(cx + r * Math.cos(a)), y: r3(cy + r * Math.sin(a)) });

export const fmt = (n: number, digits = 0) => n.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits });

/** "14:30" from decimal hours. */
export function clock(hours: number) {
  const h = mod(hours, 24);
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60) % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

/** "12 Jun" for a day-of-year (0 = 1 Jan) in a non-leap year. */
export function dayLabel(day: number) {
  const d = new Date(Date.UTC(2027, 0, 1 + Math.round(day)));
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

const hex = (c: string) => {
  const s = c.replace("#", "");
  const n = parseInt(s.length === 3 ? s.split("").map((ch) => ch + ch).join("") : s, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
/** Linear mix of two hex colours, t in [0,1]. */
export function mix(a: string, b: string, t: number) {
  const [r1, g1, b1] = hex(a);
  const [r2, g2, b2] = hex(b);
  const k = clamp(t, 0, 1);
  const ch = (x: number, y: number) => Math.round(lerp(x, y, k));
  return `rgb(${ch(r1, r2)},${ch(g1, g2)},${ch(b1, b2)})`;
}

/** Approximate sRGB colour of a visible wavelength in nm (380–780). */
export function wavelengthToRgb(nm: number) {
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else { r = 1; }
  let f = 1;
  if (nm < 420) f = 0.3 + (0.7 * (nm - 380)) / 40;
  else if (nm > 700) f = 0.3 + (0.7 * (780 - nm)) / 80;
  const c = (v: number) => Math.round(255 * Math.pow(clamp(v * f, 0, 1), 0.8));
  return `rgb(${c(r)},${c(g)},${c(b)})`;
}

/** Deterministic pseudo-random numbers so star fields are stable between renders. */
export function seeded(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5; s >>>= 0;
    return (s >>> 0) / 4294967296;
  };
}

export function starField(w: number, h: number, n: number, seed = 7) {
  const rnd = seeded(seed);
  return Array.from({ length: n }, () => ({ x: rnd() * w, y: rnd() * h, r: 0.4 + rnd() * 1.1, o: 0.25 + rnd() * 0.6 }));
}
