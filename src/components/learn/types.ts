import type { ComponentType } from "react";
import type { BodyId } from "@/lib/planets";

export interface LearnStep {
  title: string;
  body: string;
}
export interface Misconception {
  myth: string;
  truth: string;
}
export interface LearnSource {
  title: string;
  url: string;
}
export interface UpcomingEvent {
  date: string;
  kind: string;
  where: string;
  note?: string;
}
export interface LearnDiagram {
  title: string;
  lead: string;
  Component: ComponentType;
}
export interface LearnTopic {
  slug: string;
  title: string;
  /** Short label for cards and nav pills. */
  short: string;
  tagline: string;
  /** Hex colour used for the ambient wash and card thumbnail. */
  accent: string;
  intro: string[];
  diagrams: LearnDiagram[];
  steps: LearnStep[];
  tryThis: string[];
  misconceptions: Misconception[];
  upcoming?: { title: string; lead: string; events: UpcomingEvent[] };
  related: BodyId[];
  sources: LearnSource[];
}
