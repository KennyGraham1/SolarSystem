import * as THREE from "three";
import type { TextureKind } from "./planets";

const W = 1024;
const H = 512;

/** Small seeded PRNG (mulberry32) so textures are stable between renders. */
function rng(seedStr: string) {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) | 0;
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const css = (c: THREE.Color, a = 1) =>
  `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)},${a})`;

function ellipse(ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number, fill: string) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
}

function paintBands(ctx: CanvasRenderingContext2D, rand: () => number, base: THREE.Color, accent: THREE.Color, redSpot: boolean) {
  const k1 = 6 + rand() * 6, k2 = 14 + rand() * 10, p1 = rand() * 6, p2 = rand() * 6;
  for (let y = 0; y < H; y++) {
    const t = y / H;
    const v = 0.5 + 0.28 * Math.sin(t * Math.PI * k1 + p1) + 0.18 * Math.sin(t * Math.PI * k2 + p2) + (rand() - 0.5) * 0.08;
    ctx.fillStyle = css(base.clone().lerp(accent, THREE.MathUtils.clamp(v, 0, 1)));
    ctx.fillRect(0, y, W, 1);
  }
  // Horizontal streaks / eddies
  for (let i = 0; i < 260; i++) {
    const c = base.clone().lerp(accent, rand());
    ellipse(ctx, rand() * W, rand() * H, 20 + rand() * 120, 2 + rand() * 6, css(c, 0.18));
  }
  if (redSpot) {
    ellipse(ctx, W * 0.32, H * 0.62, 70, 34, "rgba(196,84,60,0.85)");
    ellipse(ctx, W * 0.32, H * 0.62, 50, 22, "rgba(220,120,90,0.6)");
  }
}

function paintRocky(ctx: CanvasRenderingContext2D, rand: () => number, base: THREE.Color, accent: THREE.Color) {
  for (let i = 0; i < 5000; i++) {
    const c = base.clone().lerp(accent, rand());
    ellipse(ctx, rand() * W, rand() * H, 1 + rand() * 6, 1 + rand() * 6, css(c, 0.25));
  }
  // Craters: dark floor with a light rim
  for (let i = 0; i < 160; i++) {
    const x = rand() * W, y = rand() * H, r = 3 + rand() * 14;
    ellipse(ctx, x, y, r, r, css(accent, 0.55));
    ctx.beginPath();
    ctx.arc(x, y, r, Math.PI * 0.9, Math.PI * 1.9);
    ctx.strokeStyle = css(base.clone().lerp(new THREE.Color("#ffffff"), 0.35), 0.5);
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

function paintEarth(ctx: CanvasRenderingContext2D, rand: () => number) {
  const land = new THREE.Color("#3f9b4a");
  const dry = new THREE.Color("#b8a15c");
  // Continents as a handful of blob clusters; oceans should still dominate
  for (let c = 0; c < 9; c++) {
    const cx = rand() * W, cy = H * 0.15 + rand() * H * 0.7;
    for (let b = 0; b < 28; b++) {
      const col = land.clone().lerp(dry, rand() * 0.7);
      ellipse(ctx, cx + (rand() - 0.5) * 170, cy + (rand() - 0.5) * 110, 6 + rand() * 26, 5 + rand() * 20, css(col, 0.95));
    }
  }
  // Polar ice
  const ice = ctx.createLinearGradient(0, 0, 0, H);
  ice.addColorStop(0, "rgba(255,255,255,0.95)");
  ice.addColorStop(0.08, "rgba(255,255,255,0)");
  ice.addColorStop(0.92, "rgba(255,255,255,0)");
  ice.addColorStop(1, "rgba(255,255,255,0.95)");
  ctx.fillStyle = ice;
  ctx.fillRect(0, 0, W, H);
  // Clouds
  for (let i = 0; i < 700; i++) {
    ellipse(ctx, rand() * W, rand() * H, 6 + rand() * 28, 2 + rand() * 6, "rgba(255,255,255,0.16)");
  }
}

function paintSwirls(ctx: CanvasRenderingContext2D, rand: () => number, base: THREE.Color, accent: THREE.Color) {
  for (let i = 0; i < 90; i++) {
    const c = base.clone().lerp(accent, rand());
    ellipse(ctx, rand() * W, rand() * H, 60 + rand() * 260, 8 + rand() * 30, css(c, 0.12));
  }
  for (let i = 0; i < 600; i++) {
    const c = base.clone().lerp(new THREE.Color("#ffffff"), rand() * 0.4);
    ellipse(ctx, rand() * W, rand() * H, 10 + rand() * 60, 2 + rand() * 5, css(c, 0.08));
  }
}

function paintStar(ctx: CanvasRenderingContext2D, rand: () => number, base: THREE.Color, accent: THREE.Color) {
  const hot = new THREE.Color("#fff1b8");
  for (let i = 0; i < 14000; i++) {
    const c = rand() > 0.5 ? base.clone().lerp(hot, rand()) : base.clone().lerp(accent, rand());
    ellipse(ctx, rand() * W, rand() * H, 1 + rand() * 5, 1 + rand() * 5, css(c, 0.22));
  }
  for (let i = 0; i < 10; i++) {
    ellipse(ctx, rand() * W, H * 0.3 + rand() * H * 0.4, 2 + rand() * 5, 1.5 + rand() * 3, "rgba(80,30,0,0.6)");
  }
}

export function makeBodyTexture(seed: string, kind: TextureKind, color: string, accent: string) {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const rand = rng(seed);
  const base = new THREE.Color(color);
  const acc = new THREE.Color(accent);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, W, H);

  switch (kind) {
    case "banded": paintBands(ctx, rand, base, acc, seed === "jupiter"); break;
    case "rocky": paintRocky(ctx, rand, base, acc); break;
    case "earth": paintEarth(ctx, rand); break;
    case "smooth": paintSwirls(ctx, rand, base, acc); break;
    case "star": paintStar(ctx, rand, base, acc); break;
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** Planar ring texture: concentric bands with a Cassini-style gap. */
export function makeRingTexture(seed: string, color: string, innerRatio: number) {
  const S = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext("2d")!;
  const rand = rng(seed + "-rings");
  const c = new THREE.Color(color);
  const cx = S / 2, inner = innerRatio * (S / 2), outer = S / 2 - 1;
  for (let r = inner; r < outer; r += 1) {
    const t = (r - inner) / (outer - inner);
    let a = 0.55 + 0.35 * Math.sin(t * 40 + rand()) * Math.sin(t * 7);
    if (t > 0.66 && t < 0.72) a *= 0.15; // gap
    if (t > 0.94) a *= (1 - t) / 0.06; // soft outer edge
    ctx.beginPath();
    ctx.arc(cx, cx, r, 0, Math.PI * 2);
    ctx.strokeStyle = css(c.clone().lerp(new THREE.Color("#ffffff"), rand() * 0.2), THREE.MathUtils.clamp(a, 0, 1));
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Soft radial glow used for the Sun's corona sprite. */
export function makeGlowTexture() {
  const S = 256;
  const canvas = document.createElement("canvas");
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, "rgba(255,230,160,1)");
  g.addColorStop(0.25, "rgba(255,180,80,0.6)");
  g.addColorStop(0.6, "rgba(255,120,30,0.15)");
  g.addColorStop(1, "rgba(255,100,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  return new THREE.CanvasTexture(canvas);
}
