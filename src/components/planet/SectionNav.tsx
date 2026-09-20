"use client";

import { useEffect, useRef, useState } from "react";

export interface NavItem {
  id: string;
  label: string;
}

/** Sticky in-page navigation that highlights the section currently in view. */
export function SectionNav({ items, accent }: { items: NavItem[]; accent: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;
    // Pick the section whose top is closest to (but above) a line 1/3 down the viewport.
    const update = () => {
      const marker = window.innerHeight * 0.33;
      let best = sections[0].id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= marker) best = el.id;
      }
      setActive(best);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  // Keep the active pill visible in the horizontal strip. Scroll the strip itself
  // rather than scrollIntoView, which would also yank the window to the sticky
  // bar's static position.
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !el) return;
    const left = el.offsetLeft - list.clientWidth / 2 + el.offsetWidth / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="On this page" className="relative sticky top-0 z-30 -mx-4 border-b border-white/10 bg-[#03050c]/80 px-4 backdrop-blur-xl sm:mx-0 sm:rounded-full sm:border sm:px-2">
      <div ref={listRef} className="no-scrollbar flex gap-1 overflow-x-auto py-2">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <a
              key={item.id}
              data-id={item.id}
              href={`#${item.id}`}
              aria-current={on ? "location" : undefined}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                on ? "text-black" : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
              style={on ? { background: accent } : undefined}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
