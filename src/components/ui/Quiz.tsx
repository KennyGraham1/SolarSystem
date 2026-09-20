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
  return (
    <div className="animate-fade-in absolute inset-0 z-30 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="glass-strong animate-pop-in w-full max-w-lg rounded-2xl p-6 text-white"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Solar System Quiz"
      >
        <QuizRunner title="Solar System Quiz" questions={makeQuiz()} regenerate={makeQuiz} onClose={onClose} />
      </div>
    </div>
  );
}

interface RunnerProps {
  title: string;
  questions: Question[];
  /** Produces a fresh set for "Play again" (defaults to the same questions). */
  regenerate?: () => Question[];
  onClose?: () => void;
}

/** The question-by-question quiz flow, shared by the modal and the planet pages. */
export function QuizRunner({ title, questions: initial, regenerate, onClose }: RunnerProps) {
  const [questions, setQuestions] = useState<Question[]>(initial);
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
    setQuestions(regenerate ? regenerate() : initial);
    setIndex(0);
    setChoice(null);
    setScore(0);
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
        <div className="flex items-center gap-3">
          <div className="text-xs text-white/50">
            {finished ? "Done" : `Question ${index + 1} / ${questions.length}`} · Score {score}
          </div>
          {onClose && (
            <button onClick={onClose} aria-label="Close" className="rounded-full px-2 text-white/50 transition hover:text-white">
              ✕
            </button>
          )}
        </div>
      </div>

      {!finished && (
        <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-amber-300 transition-all duration-500" style={{ width: `${(index / questions.length) * 100}%` }} />
        </div>
      )}

      {finished ? (
        <div className="animate-pop-in text-center">
          <div className="font-display text-5xl font-semibold text-amber-200">
            {score} / {questions.length}
          </div>
          <p className="mt-2 text-sm text-white/70">
            {score === questions.length
              ? "Perfect — you know your stuff!"
              : score >= questions.length / 2
                ? "Nice work. Keep exploring and try again."
                : "Keep exploring — the answers are all on this page."}
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <button onClick={restart} className="btn-accent">
              Play again
            </button>
            {onClose && (
              <button onClick={onClose} className="btn-ghost">
                Close
              </button>
            )}
          </div>
        </div>
      ) : (
        <div key={index} className="animate-fade-in">
          <p className="mb-4 text-base leading-relaxed">{q.prompt}</p>
          <div className="grid gap-2">
            {q.options.map((opt) => {
              const isAnswer = opt === q.answer;
              const state = !choice ? "idle" : isAnswer ? "correct" : opt === choice ? "wrong" : "dim";
              const cls = {
                idle: "border-white/10 bg-white/5 hover:border-amber-300/40 hover:bg-white/10",
                correct: "border-emerald-400/50 bg-emerald-500/20",
                wrong: "border-rose-400/50 bg-rose-500/20",
                dim: "border-white/5 bg-white/5 opacity-50",
              }[state];
              return (
                <button key={opt} onClick={() => answer(opt)} className={`rounded-xl border px-4 py-2.5 text-left text-sm transition ${cls}`}>
                  {opt}
                </button>
              );
            })}
          </div>
          {choice && (
            <div className="animate-fade-in mt-4 flex items-center justify-between gap-4">
              <p className="text-xs leading-relaxed text-white/60">{q.explanation}</p>
              <button onClick={next} className="btn-ghost shrink-0">
                {index + 1 === questions.length ? "See score" : "Next"}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
