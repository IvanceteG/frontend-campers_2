import Link from "next/link";
import { notFound } from "next/navigation";
import { showModel } from "@/controllers/modelsController";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ModelDetailImage from "@/components/ui/ModelDetailImage";
import CommentsSection from "@/components/ui/CommentsSection";

// Render dinàmic: la pàgina es genera en cada request (no SSG en build).
// Això evita que el build de Vercel intenti accedir a la BD per pre-generar.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { ok, data: model } = await showModel(slug);
  if (!ok) return { title: "Model no trobat — VanLife Rentals" };
  return {
    title: `${model.name} — VanLife Rentals`,
    description: model.description,
  };
}

export default async function ModelDetailPage({ params }) {
  const { slug } = await params;
  const { ok, data: model } = await showModel(slug);

  if (!ok || !model) {
    notFound();
  }

  return (
    <main className="relative">
      <Navbar />

      <article className="pt-32 pb-16 bg-grain">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href="/#models"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
          >
            <span aria-hidden="true">←</span> Tornar al catàleg
          </Link>

          <div className="mt-6 grid md:grid-cols-2 gap-10 items-start">
            <ModelDetailImage
              src={model.image}
              alt={`Furgoneta ${model.name}`}
              type={model.type}
            />

            <div>
              <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                {model.name}
              </h1>
              <p className="mt-4 text-muted leading-relaxed">
                {model.longDescription || model.description}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-4">
                <Stat label="Places" value={model.seats} />
                <Stat label="Llits" value={model.beds} />
                <Stat label="Bany" value={model.bathroom} />
                <Stat label="Equipament" value={model.equipment} />
              </dl>

              <div className="mt-8 p-5 bg-card border border-border rounded-2xl flex items-end justify-between">
                <div>
                  <span className="text-xs text-muted uppercase tracking-wider">
                    Des de
                  </span>
                  <div>
                    <span className="font-display text-4xl font-bold text-primary">
                      {model.pricePerDay} €
                    </span>
                    <span className="text-sm text-muted ml-1">/ dia</span>
                  </div>
                </div>
                <Link
                  href="/#contacte"
                  className="bg-foreground hover:bg-primary text-card font-semibold px-6 py-3 rounded-full transition-colors"
                >
                  Reservar
                </Link>
              </div>
            </div>
          </div>

          {/* Inclou */}
          {model.includes && model.includes.length > 0 && (
            <section className="mt-16 max-w-3xl">
              <h2 className="font-display text-2xl md:text-3xl font-semibold">
                Què inclou
              </h2>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {model.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 bg-card border border-border rounded-xl p-4"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent flex-shrink-0 mt-0.5"
                    >
                      ✓
                    </span>
                    <span className="text-sm text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Comentaris */}
          <div className="max-w-3xl">
            <CommentsSection slug={slug} />
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <dt className="text-xs text-muted uppercase tracking-wider">{label}</dt>
      <dd className="mt-1 font-semibold text-foreground">{value}</dd>
    </div>
  );
}
