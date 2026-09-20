import type { GlossaryEntry, Source } from "@/lib/content";

export function Glossary({ entries }: { entries: GlossaryEntry[] }) {
  return (
    <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
      {entries.map((g) => (
        <div key={g.term} className="border-l-2 border-amber-300/40 pl-4">
          <dt className="font-display text-base font-semibold text-white">{g.term}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-white/70">{g.definition}</dd>
        </div>
      ))}
    </dl>
  );
}

function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function Sources({ sources }: { sources: Source[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {sources.map((s) => (
        <li key={s.url}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass group flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm text-white/80 transition hover:border-amber-300/40 hover:text-white"
          >
            <span className="min-w-0">
              <span className="block truncate">{s.title}</span>
              <span className="block truncate text-[11px] text-white/40">{host(s.url)}</span>
            </span>
            <span className="text-white/40 transition group-hover:text-amber-200" aria-hidden>
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
