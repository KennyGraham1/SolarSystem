"use client";

import type { QuizQuestion } from "@/lib/content";
import { fromContent } from "@/lib/quiz";
import { QuizRunner } from "@/components/ui/Quiz";

export function PlanetQuiz({ name, questions }: { name: string; questions: QuizQuestion[] }) {
  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <QuizRunner title={`${name} quiz`} questions={fromContent(name, questions)} />
    </div>
  );
}
