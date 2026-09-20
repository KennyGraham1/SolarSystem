import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="eyebrow">404</div>
      <h1 className="font-display text-4xl font-semibold">Lost in space</h1>
      <p className="max-w-md text-white/60">That page is not in this solar system. Try one of the nine bodies, or head back to the explorer.</p>
      <Link href="/" className="btn-accent mt-2">
        ← Back to the 3D explorer
      </Link>
    </main>
  );
}
