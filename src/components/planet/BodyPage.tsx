import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { BODIES, HELIOCENTRIC_BODIES, MOONS, bodyById, bodyHref, moonsOf, type Body, type BodyId } from "@/lib/planets";
import { CONTENT } from "@/lib/content";
import { bodyStats, slugify } from "@/lib/format";
import { PlanetHero3D } from "@/components/planet/PlanetHero3D";
import { SectionNav, type NavItem } from "@/components/planet/SectionNav";
import { InteriorDiagram } from "@/components/planet/InteriorDiagram";
import { ComparisonBars } from "@/components/planet/ComparisonBars";
import { MoonCards } from "@/components/planet/MoonCards";
import { Timeline } from "@/components/planet/Timeline";
import { PlanetQuiz } from "@/components/planet/PlanetQuiz";
import { Glossary, Sources } from "@/components/planet/Glossary";

/** "Atmosphere: haze, jets and the hexagon" → "Atmosphere" for the compact nav. */
function shortLabel(title: string) {
  const head = title.split(/[:—–(]/)[0].trim();
  return head.length > 26 ? `${head.slice(0, 24).trim()}…` : head;
}

export function bodyMetadata(id: BodyId): Metadata {
  const body = bodyById(id);
  const content = CONTENT[id];
  return {
    title: body.name,
    description: content.tagline || body.description,
    openGraph: { title: `${body.name} · Solar System Explorer`, description: content.tagline || body.description },
  };
}

const ORDINAL = (n: number) => `${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"}`;

/** "4th from the Sun", "Moon of Jupiter", "Dwarf planet in the Kuiper belt". */
function subtitle(body: Body) {
  if (body.kind === "star") return "the centre of the solar system";
  if (body.kind === "moon" && body.parent) return `moon of ${bodyById(body.parent).name}`;
  if (body.kind === "dwarf") return body.region ? `${body.region}` : "dwarf planet";
  return `${ORDINAL(HELIOCENTRIC_BODIES.findIndex((b) => b.id === body.id))} from the Sun`;
}

function Section({ id, eyebrow, title, children, lead }: { id: string; eyebrow: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-12 sm:py-16">
      <div className="eyebrow mb-2">{eyebrow}</div>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      {lead && <p className="mt-3 max-w-2xl text-base text-white/60">{lead}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function NeighbourLink({ id, dir }: { id: BodyId | null; dir: "prev" | "next" }) {
  if (!id) return <span className="hidden sm:block" />;
  const b = bodyById(id);
  return (
    <Link
      href={bodyHref(b)}
      className={`glass group flex items-center gap-4 rounded-2xl px-5 py-4 transition hover:border-white/25 ${dir === "next" ? "flex-row-reverse text-right" : ""}`}
    >
      <span className="h-8 w-8 shrink-0 rounded-full" style={{ background: `radial-gradient(circle at 35% 30%, #fff 0%, ${b.color} 40%, ${b.accent} 100%)`, boxShadow: `0 0 16px ${b.color}66` }} />
      <span className="min-w-0">
        <span className="eyebrow block">{dir === "prev" ? "← Previous" : "Next →"}</span>
        <span className="font-display block text-lg font-semibold text-white group-hover:text-amber-200">{b.name}</span>
      </span>
    </Link>
  );
}

export function BodyPage({ id }: { id: BodyId }) {
  const body = bodyById(id);
  const content = CONTENT[id];
  // Prev/next walk outward through Sun → planets → dwarfs, or through the moons.
  const sequence = body.kind === "moon" ? MOONS : HELIOCENTRIC_BODIES;
  const index = sequence.findIndex((b) => b.id === id);
  const prev = index > 0 ? sequence[index - 1].id : null;
  const next = index < sequence.length - 1 ? sequence[index + 1].id : null;
  const stats = bodyStats(body);
  const parent = body.kind === "moon" && body.parent ? bodyById(body.parent) : null;
  const moons = moonsOf(id);

  const sectionSlugs = content.sections.map((s) => `s-${slugify(s.title)}`);
  const nav: NavItem[] = [{ id: "overview", label: "Overview" }];
  if (content.layers.length) nav.push({ id: "inside", label: "Inside" });
  content.sections.forEach((s, i) => nav.push({ id: sectionSlugs[i], label: shortLabel(s.title) }));
  if (content.moons.length) nav.push({ id: "moons", label: "Notable moons" });
  if (content.timeline.length) nav.push({ id: "timeline", label: "Exploration" });
  if (content.comparisons.length) nav.push({ id: "compare", label: "Compare" });
  if (content.quiz.length) nav.push({ id: "quiz", label: "Quiz" });
  if (content.glossary.length) nav.push({ id: "glossary", label: "Glossary" });
  if (content.sources.length) nav.push({ id: "sources", label: "Sources" });

  return (
    <div className="relative min-h-dvh overflow-x-clip">
      {/* ambient colour wash behind the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{ background: `radial-gradient(70% 60% at 70% 20%, ${body.color}26 0%, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3 py-5">
          <Link href="/" className="btn-ghost">
            ← Back to the 3D explorer
          </Link>
          <nav aria-label="Bodies" className="no-scrollbar flex max-w-full gap-1 overflow-x-auto">
            {BODIES.map((b) => (
              <Link
                key={b.id}
                href={bodyHref(b)}
                aria-current={b.id === id ? "page" : undefined}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition ${
                  b.id === id ? "bg-white/15 text-white" : "text-white/55 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: b.color, boxShadow: `0 0 6px ${b.color}` }} />
                {b.name}
              </Link>
            ))}
          </nav>
        </header>

        <section className="grid items-center gap-8 py-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-10">
          <div className="animate-slide-up">
            <div className="eyebrow mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: body.color, boxShadow: `0 0 8px ${body.color}` }} />
              {body.kind === "moon" ? subtitle(body) : `${body.type} · ${subtitle(body)}`}
            </div>
            <h1 className="font-display text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">{body.name}</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">{content.tagline}</p>
            {(parent || moons.length > 0) && (
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/50">
                {parent && (
                  <>
                    <span>Orbits</span>
                    <Link href={bodyHref(parent)} className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-white/80 transition hover:border-white/30 hover:text-white">
                      <span className="h-2 w-2 rounded-full" style={{ background: parent.color, boxShadow: `0 0 6px ${parent.color}` }} />
                      {parent.name}
                    </Link>
                  </>
                )}
                {moons.length > 0 && <span>{body.moons === 1 ? "Its moon" : "Featured moon"}</span>}
                {moons.map((m) => (
                  <Link key={m.id} href={bodyHref(m)} className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-white/80 transition hover:border-white/30 hover:text-white">
                    <span className="h-2 w-2 rounded-full" style={{ background: m.color, boxShadow: `0 0 6px ${m.color}` }} />
                    {m.name} ↗
                  </Link>
                ))}
              </div>
            )}

            <dl className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-xl px-3 py-2.5">
                  <dt className="text-[10px] uppercase tracking-wider text-white/40">{s.label}</dt>
                  <dd className="mt-0.5 text-sm font-medium text-white">
                    {s.value}
                    {s.hint && <span className="ml-1.5 text-[11px] font-normal text-white/40">{s.hint}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="animate-fade-in">
            <PlanetHero3D body={body} />
          </div>
        </section>

        <SectionNav items={nav} accent={body.color} />

        <main className="divide-y divide-white/8">
          <Section id="overview" eyebrow="Overview" title={`Meet ${body.name}`}>
            <div className="prose-space max-w-3xl">
              {content.intro.map((p, i) => (
                <p key={i} className={i === 0 ? "text-lg text-white/85" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </Section>

          {content.layers.length > 0 && (
            <Section id="inside" eyebrow="Interior" title={`Inside ${body.name}`} lead="Hover, tap or use the arrow keys to explore each layer from the core outward.">
              <InteriorDiagram name={body.name} radiusKm={body.radiusKm} layers={content.layers} />
            </Section>
          )}

          {content.sections.map((s, i) => (
            <Section key={s.title} id={sectionSlugs[i]} eyebrow={`Section ${i + 1}`} title={s.title}>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div className="prose-space max-w-3xl">
                  {s.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                {s.highlight && (
                  <aside className="self-start rounded-2xl border border-amber-300/25 bg-amber-400/10 p-5">
                    <div className="eyebrow mb-2 !text-amber-200/70">Key takeaway</div>
                    <p className="font-display text-base leading-relaxed text-amber-50">{s.highlight}</p>
                  </aside>
                )}
              </div>
            </Section>
          ))}

          {content.moons.length > 0 && (
            <Section id="moons" eyebrow="Satellites" title={`Notable moons of ${body.name}`} lead={`${body.moons} known moons. Dots are drawn to scale against our own Moon (1,737 km).`}>
              <MoonCards moons={content.moons} accent={body.accent} />
            </Section>
          )}

          {content.timeline.length > 0 && (
            <Section id="timeline" eyebrow="Exploration" title="How we got to know it">
              <Timeline items={content.timeline} color={body.color} />
            </Section>
          )}

          {content.comparisons.length > 0 && (
            <Section id="compare" eyebrow="By the numbers" title={`${body.name} vs Earth`} lead="Bars switch to a logarithmic scale when the two values are more than 25× apart.">
              <ComparisonBars name={body.name} color={body.color} comparisons={content.comparisons} />
            </Section>
          )}

          {content.quiz.length > 0 && (
            <Section id="quiz" eyebrow="Check yourself" title={`${body.name} quiz`}>
              <PlanetQuiz name={body.name} questions={content.quiz} />
            </Section>
          )}

          {content.glossary.length > 0 && (
            <Section id="glossary" eyebrow="Vocabulary" title="Glossary">
              <Glossary entries={content.glossary} />
            </Section>
          )}

          {content.sources.length > 0 && (
            <Section id="sources" eyebrow="References" title="Sources">
              <Sources sources={content.sources} />
            </Section>
          )}
        </main>

        <footer className="border-t border-white/8 py-10">
          <div className="grid gap-3 sm:grid-cols-2">
            <NeighbourLink id={prev} dir="prev" />
            <NeighbourLink id={next} dir="next" />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40">
            <Link href="/" className="hover:text-white">
              ← Back to the 3D explorer
            </Link>
            <span>Textures: Solar System Scope (CC BY 4.0) · Data: NASA planetary fact sheets</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
