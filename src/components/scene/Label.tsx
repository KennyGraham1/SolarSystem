"use client";

import { Html } from "@react-three/drei";

interface Props {
  text: string;
  sub?: string;
  y: number;
  active?: boolean;
}

/** Screen-space label pinned above a body. */
export function Label({ text, sub, y, active }: Props) {
  return (
    <Html position={[0, y, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
      <div
        className={`flex flex-col items-center whitespace-nowrap text-[11px] tracking-wide select-none transition-opacity ${
          active ? "text-amber-200" : "text-white/70"
        }`}
      >
        <span className="font-medium drop-shadow-[0_0_4px_rgba(0,0,0,0.9)]">{text}</span>
        {sub && <span className="text-[10px] text-white/50">{sub}</span>}
      </div>
    </Html>
  );
}
