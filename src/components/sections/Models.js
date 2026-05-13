import { listFeatured, listModels } from "@/controllers/modelsController";
import ModelsGrid from "@/components/ui/ModelsGrid";

export default async function Models() {
  // Carreguem destacats i tota la flota en paral·lel
  const [featuredRes, allRes] = await Promise.all([
    listFeatured(4),
    listModels(),
  ]);

  const ok = featuredRes.ok && allRes.ok;
  const error = featuredRes.error || allRes.error;

  return (
    <section
      id="models"
      className="relative py-24 bg-background-soft border-y border-border"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <span aria-hidden="true">✦</span> La nostra flota
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight">
              Cada camper,{" "}
              <span className="italic text-primary">una història</span> per
              escriure.
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Des de compactes urbanes fins a 4x4 d&apos;aventura. Tria la que
              encaixa amb el teu pròxim viatge.
            </p>
          </div>
        </div>

        {!ok && (
          <div
            role="alert"
            className="bg-card border border-primary/30 text-primary px-4 py-3 rounded-xl"
          >
            {error}
          </div>
        )}

        {ok && (
          <ModelsGrid featured={featuredRes.data} all={allRes.data} />
        )}
      </div>
    </section>
  );
}
