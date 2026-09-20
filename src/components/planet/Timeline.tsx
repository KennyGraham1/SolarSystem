import type { Milestone } from "@/lib/content";

export function Timeline({ items, color }: { items: Milestone[]; color: string }) {
  return (
    <ol className="relative ml-2 border-l border-white/15 pl-8">
      {items.map((m, i) => (
        <li key={`${m.year}-${m.title}`} className={i === items.length - 1 ? "" : "pb-8"}>
          <span
            className="absolute -left-[7px] mt-1.5 block h-3.5 w-3.5 rounded-full border-2 border-[#03050c]"
            style={{ background: color, boxShadow: `0 0 10px ${color}` }}
            aria-hidden
          />
          <div className="font-mono text-xs tracking-wide text-amber-200/90">{m.year}</div>
          <h3 className="font-display mt-0.5 text-lg font-semibold text-white">{m.title}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/70">{m.detail}</p>
        </li>
      ))}
    </ol>
  );
}
