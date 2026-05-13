import Link from "next/link";
import ModelCardImage from "./ModelCardImage";

/**
 * Targeta resum d'un model de camper.
 * Server Component — la imatge amb fallback s'aïlla a ModelCardImage.
 */
export default function ModelCard({ model }) {
  return (
    <article className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48 overflow-hidden bg-background-soft">
        <ModelCardImage
          src={model.image}
          alt={`Furgoneta ${model.name}`}
          name={model.name}
        />

        {/* Badge tipus */}
        <span className="absolute top-3 left-3 inline-flex items-center bg-card/95 backdrop-blur-sm border border-border text-xs font-semibold px-2.5 py-1 rounded-full z-10">
          {model.type}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-semibold leading-tight">
          {model.name}
        </h3>

        <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed">
          {model.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2 text-xs">
          <Spec icon="👥" label={`${model.seats} places`} />
          <Spec icon="🛏️" label={`${model.beds} llits`} />
          {model.bathroom !== "—" && <Spec icon="🚿" label={model.bathroom} />}
        </ul>

        <div className="mt-5 pt-4 border-t border-border flex items-end justify-between">
          <div>
            <span className="font-display text-2xl font-bold text-primary">
              {model.pricePerDay} €
            </span>
            <span className="text-xs text-muted ml-1">/ dia</span>
          </div>
          <Link
            href={`/models/${model.slug}`}
            aria-label={`Veure detalls de ${model.name}`}
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group-hover:gap-2"
          >
            Detalls
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function Spec({ icon, label }) {
  return (
    <li className="inline-flex items-center gap-1 bg-background-soft px-2 py-1 rounded-md text-foreground/80">
      <span aria-hidden="true">{icon}</span>
      {label}
    </li>
  );
}
