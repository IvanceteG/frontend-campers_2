"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <h1 className="font-display text-6xl font-semibold text-primary">!</h1>
        <h2 className="mt-4 font-display text-2xl font-semibold">
          Alguna cosa ha sortit malament
        </h2>
        <p className="mt-3 text-muted text-sm">
          {error?.message || "Si us plau, prova-ho de nou."}
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="bg-foreground hover:bg-primary text-card font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
          >
            Tornar a provar
          </button>
          <Link
            href="/"
            className="border-2 border-foreground/15 hover:border-primary text-foreground font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
          >
            Inici
          </Link>
        </div>
      </div>
    </div>
  );
}
