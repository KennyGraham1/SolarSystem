import type { MoonInfo } from "@/lib/content";
import { formatKm } from "@/lib/planets";

const LUNA_KM = 1737.4;

export function MoonCards({ moons, accent }: { moons: MoonInfo[]; accent: string }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {moons.map((m) => {
        const ratio = m.radiusKm / LUNA_KM;
        const px = Math.max(5, Math.min(72, Math.round(48 * ratio)));
        return (
          <li key={m.name} className="glass flex gap-4 rounded-2xl p-4">
            <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center" aria-hidden>
              <span
                className="block rounded-full"
                style={{
                  width: px,
                  height: px,
                  background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${accent} 45%, #0a0c14 100%)`,
                  boxShadow: `0 0 ${Math.round(px / 3)}px ${accent}55`,
                }}
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-base font-semibold text-white">{m.name}</h3>
              <p className="text-[11px] text-white/45">
                Radius {formatKm(m.radiusKm)} · {ratio >= 1 ? ratio.toFixed(1) : ratio.toLocaleString("en-US", { maximumSignificantDigits: 2 })}× our Moon
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{m.description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
