import HeroImage from "@/components/ui/HeroImage";

/**
 * Secció Hero — Server Component.
 * Per anclatges interns fem servir <a href> en lloc de <Link>,
 * que està pensat per a navegació entre rutes.
 */
export default function Hero() {
  return (
    <section
      id="inici"
      className="relative pt-32 md:pt-36 pb-20 overflow-hidden bg-grain"
    >
      {/* Formes orgàniques decoratives al fons */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 -left-20 w-[320px] h-[320px] rounded-full bg-accent/15 dark:bg-accent/20 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Columna text */}
        <div className="animate-fadeUp">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-muted">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-accent"
            />
            Disponibilitat oberta · Temporada 2026
          </span>

          <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]">
            Viatja
            <br />
            <span className="italic text-primary">a la teva manera</span>.
          </h1>

          <p className="mt-6 text-lg text-muted max-w-md leading-relaxed">
            Furgonetes camper totalment equipades per descobrir cales amagades,
            valls remotes i nits sota les estrelles.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#models"
              className="bg-foreground hover:bg-primary text-card font-semibold px-6 py-3.5 rounded-full transition-colors inline-flex items-center gap-2"
            >
              Explora els models
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#contacte"
              className="border-2 border-foreground/15 hover:border-primary text-foreground font-semibold px-6 py-3.5 rounded-full transition-colors"
            >
              Demana pressupost
            </a>
          </div>

          {/* Mètriques */}
          <dl className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <dt className="text-xs text-muted uppercase tracking-wider">
                Models
              </dt>
              <dd className="font-display text-3xl font-semibold mt-1">+20</dd>
            </div>
            <div>
              <dt className="text-xs text-muted uppercase tracking-wider">
                Viatgers
              </dt>
              <dd className="font-display text-3xl font-semibold mt-1">3.5k</dd>
            </div>
            <div>
              <dt className="text-xs text-muted uppercase tracking-wider">
                Valoració
              </dt>
              <dd className="font-display text-3xl font-semibold mt-1">
                4.8<span className="text-base text-muted">/5</span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Columna imatge amb formes */}
        <div className="relative h-[460px] md:h-[560px] animate-fadeUp">
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl bg-background-soft">
            <HeroImage />
          </div>

          {/* Segell circular flotant */}
          <div
            aria-hidden="true"
            className="absolute -top-6 -left-6 w-32 h-32 md:w-36 md:h-36 rounded-full bg-primary text-card flex items-center justify-center font-display text-center rotate-[-12deg] shadow-xl"
          >
            <div className="text-xs leading-tight">
              <div className="text-2xl font-bold">-15%</div>
              <div className="mt-1">primera reserva</div>
            </div>
          </div>

          {/* Targeta inferior amb info */}
          <div className="absolute -bottom-4 right-4 md:bottom-6 md:right-6 bg-card border border-border rounded-2xl p-4 shadow-lg max-w-[220px]">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full bg-accent animate-pulse"
              />
              <span className="text-xs font-medium text-muted">
                Disponible avui
              </span>
            </div>
            <p className="text-sm font-semibold">
              Recollida flexible a Barcelona, València i Girona
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
