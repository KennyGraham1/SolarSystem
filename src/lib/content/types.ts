import type { BodyId } from "@/lib/planets";

/** Rich educational content for a body's dedicated page. */
export interface PlanetContent {
  id: BodyId;
  /** One-line hook shown under the page title. */
  tagline: string;
  /** 2–3 introductory paragraphs. */
  intro: string[];
  /** Long-form sections, e.g. Structure, Atmosphere, Surface & weather, Moons & rings, Exploration, Name & history. */
  sections: ContentSection[];
  /** Interior layers from the centre outward, for the cross-section diagram. radiusFraction is the layer's OUTER edge as a fraction of the body radius (last entry = 1). */
  layers: Layer[];
  /** Exploration milestones in chronological order. */
  timeline: Milestone[];
  /** Head-to-head numbers versus Earth for the comparison bars. */
  comparisons: Comparison[];
  /** Notable moons (or an empty array). */
  moons: MoonInfo[];
  /** 5 multiple-choice questions specific to this body. */
  quiz: QuizQuestion[];
  /** Key terms a learner meets on this page. */
  glossary: GlossaryEntry[];
  /** Where the facts come from. */
  sources: Source[];
}

export interface ContentSection {
  title: string;
  paragraphs: string[];
  /** Optional pull-quote / key takeaway. */
  highlight?: string;
}

export interface Layer {
  name: string;
  description: string;
  /** CSS colour for the diagram. */
  color: string;
  radiusFraction: number;
  /** e.g. "Iron–nickel, ~5,400 °C" */
  detail?: string;
}

export interface Milestone {
  year: string;
  title: string;
  detail: string;
}

export interface Comparison {
  label: string;
  /** Value for this body. */
  value: number;
  /** Same quantity for Earth. */
  earth: number;
  unit: string;
}

export interface MoonInfo {
  name: string;
  radiusKm: number;
  description: string;
}

export interface QuizQuestion {
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
}

export interface Source {
  title: string;
  url: string;
}
