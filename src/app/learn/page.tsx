import type { Metadata } from "next";
import Link from "next/link";
import { TOPICS } from "@/components/learn/topics";
import { Thumbnail } from "@/components/learn/Thumbnail";

export const metadata: Metadata = {
  title: "Learn",
  description: "Interactive explainers for everyday sky phenomena: day and night, seasons, Moon phases, eclipses, tides, retrograde motion and why the sky is blue.",
};

export default function LearnPage() {
  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]" style={{ background: "radial-gradient(70% 60% at 50% 0%, rgba(251,191,36,0.14) 0%, transparent 70%)" }} />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3 py-5">
          <Link href="/" className="btn-ghost">
            ← Back to the 3D explorer
          </Link>
          <span className="eyebrow">{TOPICS.length} interactive explainers</span>
        </header>

        <section className="animate-slide-up max-w-3xl py-8 lg:py-12">
          <div className="eyebrow mb-3">Learn</div>
          <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">The sky, explained</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            Why the Sun sets red, why we have seasons, why the Moon changes shape, why eclipses are rare and tides are not. Each explainer has a diagram you can drive with a slider, a step-by-step explanation, things to try, and the myths to unlearn.
          </p>
        </section>

        <ol className="grid gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t, i) => (
            <li key={t.slug} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
              <Link href={`/learn/${t.slug}`} className="glass group flex h-full flex-col rounded-2xl p-5 transition hover:border-white/25 hover:bg-white/8">
                <div className="flex items-start justify-between gap-4">
                  <Thumbnail slug={t.slug} accent={t.accent} className="h-20 w-20 shrink-0 rounded-2xl bg-white/5 ring-1 ring-white/10 transition group-hover:scale-105" />
                  <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h2 className="font-display mt-5 text-2xl font-semibold text-white group-hover:text-amber-200">{t.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">{t.tagline}</p>
                <span className="mt-4 text-sm font-medium text-amber-200/90">
                  Open explainer <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <footer className="border-t border-white/8 py-8 text-xs text-white/40">
          <Link href="/" className="hover:text-white">
            ← Back to the 3D explorer
          </Link>
        </footer>
      </div>
    </div>
  );
}
