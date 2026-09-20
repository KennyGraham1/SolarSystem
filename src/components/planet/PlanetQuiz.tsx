"use client";

import type { QuizQuestion } from "@/lib/content";
import { QuizRunner } from "@/components/ui/Quiz";

export function PlanetQuiz({ name, questions }: { name: string; questions: QuizQuestion[] }) {
  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <QuizRunner title={`${name} quiz`} questions={questions} />
    </div>
  );
}
