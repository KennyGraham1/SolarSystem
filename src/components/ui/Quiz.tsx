"use client";

import Link from "next/link";
import { useState } from "react";
import { makeQuiz, QUIZ_POOL_SIZE, type Question } from "@/lib/quiz";
import { useSolarStore } from "@/store/useSolarStore";

export function Quiz() {
  const open = useSolarStore((s) => s.quizOpen);
  const setOpen = useSolarStore((s) => s.setQuizOpen);
  if (!open) return null;
  return <QuizDialog onClose={() => setOpen(false)} />;
}

const LENGTHS = [5, 10, 15];

function QuizDialog({ onClose }: { onClose: () => void }) {
  const [length, setLength] = useState<number | null>(null);
  return (
    <div className="animate-fade-in absolute inset-0 z-30 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4" onClick={onClose}>
      <div
        className="glass-strong animate-pop-in max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-2xl p-5 text-white sm:p-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Solar System Quiz"
      >
        {length === null ? (
          <div>
            <div className="mb-1 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold tracking-tight">Solar System Quiz</h2>
              <button onClick={onClose} aria-label="Close" className="rounded-full px-2 text-white/50 transition hover:text-white">
                ✕
              </button>
            </div>
            <p className="text-sm text-white/65">
              Multiple choice, true-or-false and put-in-order questions drawn from a pool of {QUIZ_POOL_SIZE}. Get one wrong and you will get a hint and a second go — and an explanation with somewhere to read more.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-white/40">Questions</span>
              {LENGTHS.map((n) => (
                <button key={n} onClick={() => setLength(n)} className="btn-accent">
                  {n}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <QuizRunner key={length} title="Solar System Quiz" questions={makeQuiz(length)} regenerate={() => makeQuiz(length)} onClose={onClose} onChangeLength={() => setLength(null)} />
        )}
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
  onChangeLength?: () => void;
}

interface Result {
  question: Question;
  /** 1 = right first time, 0.5 = right after a hint, 0 = wrong. */
  points: number;
  given: string;
}

const answerText = (q: Question) => (q.kind === "choice" ? q.answer : q.kind === "boolean" ? (q.answer ? "True" : "False") : q.items.join(" → "));

/** The question-by-question quiz flow, shared by the modal and the body pages. */
export function QuizRunner({ title, questions: initial, regenerate, onClose, onChangeLength }: RunnerProps) {
  const [questions, setQuestions] = useState<Question[]>(initial);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [streak, setStreak] = useState(0);

  const q = questions[index];
  const finished = index >= questions.length;
  const score = results.reduce((s, r) => s + r.points, 0);

  const record = (points: number, given: string) => {
    setResults((r) => [...r, { question: q, points, given }]);
    setStreak((s) => (points === 1 ? s + 1 : 0));
  };
  const next = () => setIndex((i) => i + 1);
  const restart = () => {
    setQuestions(regenerate ? regenerate() : initial);
    setIndex(0);
    setResults([]);
    setStreak(0);
  };

  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
        <div className="flex items-center gap-3">
          <div className="text-xs text-white/50">
            {finished ? "Done" : `${index + 1} / ${questions.length}`} · Score {score % 1 ? score.toFixed(1) : score}
            {streak >= 3 && !finished && <span className="ml-2 text-amber-200">🔥 {streak} in a row</span>}
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
        <Summary results={results} total={questions.length} onRestart={restart} onClose={onClose} onChangeLength={onChangeLength} />
      ) : (
        <QuestionCard key={index} q={q} last={index + 1 === questions.length} onAnswered={record} onNext={next} />
      )}
    </>
  );
}

// ---------------------------------------------------------------------------

function QuestionCard({ q, last, onAnswered, onNext }: { q: Question; last: boolean; onAnswered: (points: number, given: string) => void; onNext: () => void }) {
  // phase: answering → (hint, second try) → revealed
  const [attempt, setAttempt] = useState(0);
  const [outcome, setOutcome] = useState<{ points: number; given: string } | null>(null);

  const finish = (correct: boolean, given: string) => {
    if (correct) {
      const points = attempt === 0 ? 1 : 0.5;
      setOutcome({ points, given });
      onAnswered(points, given);
    } else if (attempt === 0 && q.kind !== "order") {
      // First miss: give a hint and one more go.
      setAttempt(1);
    } else {
      setOutcome({ points: 0, given });
      onAnswered(0, given);
    }
  };

  const kindLabel = q.kind === "choice" ? "Multiple choice" : q.kind === "boolean" ? "True or false?" : `Put in order — ${q.rule}`;

  return (
    <div className="animate-fade-in">
      <div className="eyebrow mb-1.5 flex items-center gap-2">
        <span>{kindLabel}</span>
        <span className="text-white/25">·</span>
        <span className="text-white/45">{q.topic}</span>
      </div>
      <p className="mb-4 text-base leading-relaxed">{q.prompt}</p>

      {q.kind === "choice" && <ChoiceInput q={q} attempt={attempt} revealed={!!outcome} onPick={(opt) => finish(opt === q.answer, opt)} />}
      {q.kind === "boolean" && <BooleanInput q={q} attempt={attempt} revealed={!!outcome} onPick={(v) => finish(v === q.answer, v ? "True" : "False")} />}
      {q.kind === "order" && <OrderInput q={q} revealed={!!outcome} onCheck={(seq) => finish(seq.every((s, i) => s === q.items[i]), seq.join(" → "))} />}

      {attempt === 1 && !outcome && (
        <div className="animate-fade-in mt-3 rounded-xl border border-amber-300/25 bg-amber-400/10 px-4 py-3 text-sm">
          <span className="font-medium text-amber-200">Not quite — try once more.</span>
          {q.hint && <span className="text-white/75"> Hint: {q.hint}</span>}
          {!q.hint && <span className="text-white/60"> Half marks if you get it now.</span>}
        </div>
      )}

      {outcome && (
        <div className={`animate-fade-in mt-4 rounded-xl border px-4 py-3 ${outcome.points > 0 ? "border-emerald-400/30 bg-emerald-500/10" : "border-rose-400/30 bg-rose-500/10"}`}>
          <div className={`mb-1 text-sm font-medium ${outcome.points > 0 ? "text-emerald-200" : "text-rose-200"}`}>
            {outcome.points === 1 ? "Correct!" : outcome.points === 0.5 ? "Correct on the second try." : `Not this time — the answer is: ${answerText(q)}`}
          </div>
          <p className="text-sm leading-relaxed text-white/75">{q.explanation}</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            {q.learn ? (
              <Link href={q.learn.href} className="text-xs text-amber-200 underline-offset-4 hover:underline">
                {q.learn.label} →
              </Link>
            ) : (
              <span />
            )}
            <button onClick={onNext} className="btn-accent">
              {last ? "See results" : "Next question"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ChoiceInput({ q, attempt, revealed, onPick }: { q: Extract<Question, { kind: "choice" }>; attempt: number; revealed: boolean; onPick: (opt: string) => void }) {
  const [tried, setTried] = useState<string[]>([]);
  const pickOpt = (opt: string) => {
    if (revealed || tried.includes(opt)) return;
    setTried((t) => [...t, opt]);
    onPick(opt);
  };
  return (
    <div className="grid gap-2">
      {q.options.map((opt) => {
        const isAnswer = opt === q.answer;
        const wasTried = tried.includes(opt);
        const state = revealed ? (isAnswer ? "correct" : wasTried ? "wrong" : "dim") : wasTried ? "wrong" : "idle";
        const cls = {
          idle: "border-white/10 bg-white/5 hover:border-amber-300/40 hover:bg-white/10",
          correct: "border-emerald-400/50 bg-emerald-500/20",
          wrong: "border-rose-400/50 bg-rose-500/20 line-through opacity-70",
          dim: "border-white/5 bg-white/5 opacity-50",
        }[state];
        return (
          <button key={opt} onClick={() => pickOpt(opt)} disabled={revealed || wasTried} className={`rounded-xl border px-4 py-2.5 text-left text-sm transition ${cls}`}>
            {opt}
          </button>
        );
      })}
      {attempt === 1 && !revealed && <span className="sr-only">One more try</span>}
    </div>
  );
}

function BooleanInput({ q, attempt, revealed, onPick }: { q: Extract<Question, { kind: "boolean" }>; attempt: number; revealed: boolean; onPick: (v: boolean) => void }) {
  const [tried, setTried] = useState<boolean | null>(null);
  const pickVal = (v: boolean) => {
    if (revealed || tried === v) return;
    setTried(v);
    onPick(v);
  };
  return (
    <div className="grid grid-cols-2 gap-2">
      {[true, false].map((v) => {
        const state = revealed ? (v === q.answer ? "correct" : tried === v ? "wrong" : "dim") : tried === v ? "wrong" : "idle";
        const cls = {
          idle: "border-white/10 bg-white/5 hover:border-amber-300/40 hover:bg-white/10",
          correct: "border-emerald-400/50 bg-emerald-500/20",
          wrong: "border-rose-400/50 bg-rose-500/20 opacity-70",
          dim: "border-white/5 bg-white/5 opacity-50",
        }[state];
        return (
          <button key={String(v)} onClick={() => pickVal(v)} disabled={revealed || tried === v || (attempt === 1 && tried !== null && tried === v)} className={`rounded-xl border px-4 py-3 text-center text-sm font-medium transition ${cls}`}>
            {v ? "True" : "False"}
          </button>
        );
      })}
    </div>
  );
}

function OrderInput({ q, revealed, onCheck }: { q: Extract<Question, { kind: "order" }>; revealed: boolean; onCheck: (seq: string[]) => void }) {
  // Shuffled once when the question mounts (the card is keyed by question index).
  const [pool] = useState(() => shuffleItems(q.items));
  const [seq, setSeq] = useState<string[]>([]);
  const remaining = pool.filter((i) => !seq.includes(i));
  return (
    <div>
      <div className="mb-2 grid grid-cols-4 gap-2">
        {q.items.map((_, i) => {
          const item = seq[i];
          const ok = revealed && item === q.items[i];
          const bad = revealed && item !== undefined && item !== q.items[i];
          return (
            <div key={i} className={`flex min-h-11 items-center justify-center rounded-xl border px-2 py-2 text-center text-xs sm:text-sm ${ok ? "border-emerald-400/50 bg-emerald-500/20" : bad ? "border-rose-400/50 bg-rose-500/20" : item ? "border-amber-300/40 bg-amber-400/10" : "border-dashed border-white/15 text-white/30"}`}>
              {item ?? `${i + 1}`}
            </div>
          );
        })}
      </div>
      {revealed && seq.some((s, i) => s !== q.items[i]) && (
        <div className="mb-2 text-xs text-white/55">
          Correct order: <span className="text-white/85">{q.items.join(" → ")}</span>
        </div>
      )}
      {!revealed && (
        <div className="flex flex-wrap items-center gap-2">
          {remaining.map((item) => (
            <button key={item} onClick={() => setSeq((s) => [...s, item])} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm transition hover:border-amber-300/40 hover:bg-white/10">
              {item}
            </button>
          ))}
          {seq.length > 0 && (
            <button onClick={() => setSeq((s) => s.slice(0, -1))} className="btn-ghost !py-1.5 text-xs">
              Undo
            </button>
          )}
          {remaining.length === 0 && (
            <button onClick={() => onCheck(seq)} className="btn-accent ml-auto">
              Check order
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function shuffleItems<T>(items: T[]) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Summary({ results, total, onRestart, onClose, onChangeLength }: { results: Result[]; total: number; onRestart: () => void; onClose?: () => void; onChangeLength?: () => void }) {
  const score = results.reduce((s, r) => s + r.points, 0);
  const missed = results.filter((r) => r.points < 1);
  const topics = Object.entries(
    results.reduce<Record<string, { got: number; of: number }>>((acc, r) => {
      const t = (acc[r.question.topic] ??= { got: 0, of: 0 });
      t.got += r.points;
      t.of += 1;
      return acc;
    }, {}),
  );
  const pct = Math.round((score / total) * 100);
  return (
    <div className="animate-pop-in">
      <div className="text-center">
        <div className="font-display text-5xl font-semibold text-amber-200">
          {score % 1 ? score.toFixed(1) : score} / {total}
        </div>
        <p className="mt-2 text-sm text-white/70">
          {pct === 100 ? "Perfect — you know your solar system!" : pct >= 70 ? "Nice work. Review the ones you missed below." : "Keep exploring — every miss below links to where the answer lives."}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-1.5">
        {topics.map(([t, v]) => (
          <span key={t} className={`rounded-full border px-2.5 py-1 text-[11px] ${v.got === v.of ? "border-emerald-400/30 text-emerald-200" : "border-white/10 text-white/60"}`}>
            {t}: {v.got % 1 ? v.got.toFixed(1) : v.got}/{v.of}
          </span>
        ))}
      </div>

      {missed.length > 0 && (
        <div className="mt-5">
          <div className="eyebrow mb-2">Review what you missed</div>
          <ul className="space-y-2">
            {missed.map((r, i) => (
              <li key={i} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                <div className="text-white/85">{r.question.prompt}</div>
                <div className="mt-1 text-xs text-white/55">
                  Answer: <span className="text-emerald-200">{answerText(r.question)}</span>
                  {r.points === 0.5 && <span className="ml-2 text-amber-200/80">(you got it on the second try)</span>}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-white/60">{r.question.explanation}</p>
                {r.question.learn && (
                  <Link href={r.question.learn.href} className="mt-1 inline-block text-xs text-amber-200 underline-offset-4 hover:underline">
                    {r.question.learn.label} →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <button onClick={onRestart} className="btn-accent">
          Play again
        </button>
        {onChangeLength && (
          <button onClick={onChangeLength} className="btn-ghost">
            Change length
          </button>
        )}
        {onClose && (
          <button onClick={onClose} className="btn-ghost">
            Close
          </button>
        )}
      </div>
    </div>
  );
}
