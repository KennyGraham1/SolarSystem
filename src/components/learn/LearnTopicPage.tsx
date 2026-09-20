import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { bodyById, bodyHref } from "@/lib/planets";
import { Sources } from "@/components/planet/Glossary";
import { TOPICS } from "./topics";
import type { LearnTopic } from "./types";
import { Thumbnail } from "./Thumbnail";

export function topicMetadata(topic: LearnTopic): Metadata {
  return {
    title: `${topic.title} · Learn`,
    description: topic.tagline,
    openGraph: { title: `${topic.title} · Learn · Solar System Explorer`, description: topic.tagline },
  };
}

function Section({ id, eyebrow, title, lead, children }: { id: string; eyebrow: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-12 sm:py-14">
      <div className="eyebrow mb-2">{eyebrow}</div>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      {lead && <p className="mt-3 max-w-2xl text-base text-white/60">{lead}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function NeighbourLink({ topic, dir }: { topic: LearnTopic | null; dir: "prev" | "next" }) {
  if (!topic) return <span className="hidden sm:block" />;
  return (
    <Link href={`/learn/${topic.slug}`} className={`glass group flex items-center gap-4 rounded-2xl px-5 py-4 transition hover:border-white/25 ${dir === "next" ? "flex-row-reverse text-right" : ""}`}>
      <Thumbnail slug={topic.slug} accent={topic.accent} className="h-12 w-12 shrink-0 rounded-xl bg-white/5" />
      <span className="min-w-0">
        <span className="eyebrow block">{dir === "prev" ? "← Previous" : "Next →"}</span>
        <span className="font-display block text-lg font-semibold text-white group-hover:text-amber-200">{topic.title}</span>
      </span>
    </Link>
  );
}

export function LearnTopicPage({ topic }: { topic: LearnTopic }) {
  const index = TOPICS.findIndex((t) => t.slug === topic.slug);
  const prev = index > 0 ? TOPICS[index - 1] : null;
  const next = index < TOPICS.length - 1 ? TOPICS[index + 1] : null;

  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]" style={{ background: `radial-gradient(70% 60% at 70% 10%, ${topic.accent}22 0%, transparent 70%)` }} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" className="btn-ghost">
              ← Back to the 3D explorer
            </Link>
            <Link href="/learn" className="btn-ghost">
              All explainers
            </Link>
          </div>
          <nav aria-label="Explainers" className="no-scrollbar flex max-w-full gap-1 overflow-x-auto">
            {TOPICS.map((t) => (
              <Link
                key={t.slug}
                href={`/learn/${t.slug}`}
                aria-current={t.slug === topic.slug ? "page" : undefined}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition ${t.slug === topic.slug ? "bg-white/15 text-white" : "text-white/55 hover:bg-white/10 hover:text-white"}`}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: t.accent, boxShadow: `0 0 6px ${t.accent}` }} />
                {t.short}
              </Link>
            ))}
          </nav>
        </header>

        <section className="py-8 lg:py-12">
          <div className="animate-slide-up max-w-3xl">
            <div className="eyebrow mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: topic.accent, boxShadow: `0 0 8px ${topic.accent}` }} />
              Explainer {index + 1} of {TOPICS.length}
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">{topic.title}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">{topic.tagline}</p>
          </div>
          <div className="prose-space mt-8 max-w-3xl">
            {topic.intro.map((p, i) => (
              <p key={i} className={i === 0 ? "text-lg text-white/85" : ""}>
                {p}
              </p>
            ))}
          </div>
        </section>

        <main className="divide-y divide-white/8">
          {topic.diagrams.map((d, i) => (
            <Section key={d.title} id={`interactive-${i + 1}`} eyebrow={topic.diagrams.length > 1 ? `Interactive ${i + 1}` : "Interactive"} title={d.title} lead={d.lead}>
              <d.Component />
            </Section>
          ))}

          <Section id="how" eyebrow="Step by step" title="How it works">
            <ol className="grid gap-4 md:grid-cols-2">
              {topic.steps.map((s, i) => (
                <li key={s.title} className="glass flex gap-4 rounded-2xl p-5">
                  <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-300/40 bg-amber-400/15 text-sm font-semibold text-amber-100">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/72">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="try" eyebrow="Hands on" title="Try this">
            <ul className="grid gap-3 md:grid-cols-2">
              {topic.tryThis.map((t, i) => (
                <li key={i} className="flex gap-3 rounded-2xl border border-amber-300/25 bg-amber-400/10 p-5">
                  <span aria-hidden className="text-amber-200">→</span>
                  <p className="font-display text-base leading-relaxed text-amber-50">{t}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="myths" eyebrow="Check your intuition" title="Common misconceptions">
            <dl className="grid gap-4 md:grid-cols-2">
              {topic.misconceptions.map((m) => (
                <div key={m.myth} className="glass rounded-2xl p-5">
                  <dt className="flex gap-2 text-sm font-medium text-rose-200/90">
                    <span className="eyebrow mt-0.5 shrink-0 !text-rose-300/70">Myth</span>
                    <span className="line-through decoration-rose-300/50 decoration-1">{m.myth}</span>
                  </dt>
                  <dd className="mt-3 flex gap-2 text-sm leading-relaxed text-white/80">
                    <span className="eyebrow mt-0.5 shrink-0 !text-emerald-300/80">Fact</span>
                    <span>{m.truth}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          {topic.upcoming && (
            <Section id="upcoming" eyebrow="Mark your calendar" title={topic.upcoming.title} lead={topic.upcoming.lead}>
              <div className="glass overflow-x-auto rounded-2xl">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-white/45">
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Where</th>
                      <th className="px-4 py-3 font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {topic.upcoming.events.map((e) => (
                      <tr key={e.date}>
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-white">{e.date}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full border px-2 py-0.5 text-xs ${e.kind === "Total" ? "border-amber-300/40 bg-amber-400/15 text-amber-100" : "border-white/15 text-white/70"}`}>{e.kind}</span>
                        </td>
                        <td className="px-4 py-3 text-white/75">{e.where}</td>
                        <td className="px-4 py-3 text-white/55">{e.note ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          <Section id="related" eyebrow="Go deeper" title="Related bodies">
            <div className="flex flex-wrap gap-3">
              {topic.related.map((id) => {
                const b = bodyById(id);
                return (
                  <Link key={id} href={bodyHref(b)} className="glass group flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:border-white/25">
                    <span className="h-7 w-7 rounded-full" style={{ background: `radial-gradient(circle at 35% 30%, #fff 0%, ${b.color} 40%, ${b.accent} 100%)`, boxShadow: `0 0 14px ${b.color}66` }} />
                    <span>
                      <span className="font-display block text-base font-semibold text-white group-hover:text-amber-200">{b.name}</span>
                      <span className="block text-[11px] text-white/45">{b.type}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </Section>

          <Section id="sources" eyebrow="References" title="Sources">
            <Sources sources={topic.sources} />
          </Section>
        </main>

        <footer className="border-t border-white/8 py-10">
          <div className="grid gap-3 sm:grid-cols-2">
            <NeighbourLink topic={prev} dir="prev" />
            <NeighbourLink topic={next} dir="next" />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40">
            <Link href="/" className="hover:text-white">
              ← Back to the 3D explorer
            </Link>
            <Link href="/learn" className="hover:text-white">
              All explainers
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
