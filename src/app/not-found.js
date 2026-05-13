import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 bg-grain">
      <div className="text-center max-w-md">
        <h1 className="font-display text-8xl font-semibold text-primary">404</h1>
        <h2 className="mt-4 font-display text-2xl font-semibold">
          Aquesta ruta s&apos;ha perdut pel camí
        </h2>
        <p className="mt-3 text-muted">
          La pàgina que busques no existeix o ha estat moguda.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex bg-foreground hover:bg-primary text-card font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Tornar a l&apos;inici
        </Link>
      </div>
    </div>
  );
}
