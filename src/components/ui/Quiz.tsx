"use client";

import { useState } from "react";
import { makeQuiz, type Question } from "@/lib/quiz";
import { useSolarStore } from "@/store/useSolarStore";

export function Quiz() {
  const open = useSolarStore((s) => s.quizOpen);
  const setOpen = useSolarStore((s) => s.setQuizOpen);
  if (!open) return null;
  return <QuizDialog onClose={() => setOpen(false)} />;
}

function QuizDialog({ onClose }: { onClose: () => void }) {
  const [questions, setQuestions] = useState<Question[]>(() => makeQuiz());
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const q = questions[index];
  const finished = index >= questions.length;

  const answer = (opt: string) => {
    if (choice) return;
    setChoice(opt);
    if (opt === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    setChoice(null);
    setIndex((i) => i + 1);
  };

  const restart = () => {
    setQuestions(makeQuiz());
    setIndex(0);
    setChoice(null);
    setScore(0);
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0b1020] p-6 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Solar System Quiz</h2>
          <div className="text-xs text-white/50">
            {finished ? "Done" : `Question ${index + 1} / ${questions.length}`} · Score {score}
          </div>
        </div>

        {finished ? (
          <div className="text-center">
            <div className="text-5xl font-semibold text-amber-200">
              {score} / {questions.length}
            </div>
            <p className="mt-2 text-sm text-white/70">
              {score === questions.length ? "Perfect — you know the solar system!" : score >= questions.length / 2 ? "Nice work. Explore the planets and try again." : "Keep exploring — click the planets to learn their facts."}
            </p>
            <div className="mt-5 flex justify-center gap-2">
              <button onClick={restart} className="rounded-full bg-amber-400/20 px-4 py-2 text-sm text-amber-200 hover:bg-amber-400/30">
                Play again
              </button>
              <button onClick={onClose} className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20">
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-4 text-base">{q.prompt}</p>
            <div className="grid gap-2">
              {q.options.map((opt) => {
                const isAnswer = opt === q.answer;
                const state = !choice ? "idle" : isAnswer ? "correct" : opt === choice ? "wrong" : "dim";
                const cls = {
                  idle: "border-white/10 bg-white/5 hover:bg-white/10",
                  correct: "border-emerald-400/50 bg-emerald-500/20",
                  wrong: "border-rose-400/50 bg-rose-500/20",
                  dim: "border-white/5 bg-white/5 opacity-50",
                }[state];
                return (
                  <button key={opt} onClick={() => answer(opt)} className={`rounded-lg border px-4 py-2.5 text-left text-sm transition ${cls}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {choice && (
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-xs text-white/60">{q.explanation}</p>
                <button onClick={next} className="shrink-0 rounded-full bg-white/15 px-4 py-1.5 text-sm hover:bg-white/25">
                  {index + 1 === questions.length ? "See score" : "Next"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
