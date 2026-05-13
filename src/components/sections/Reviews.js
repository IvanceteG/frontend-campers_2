const reviews = [
  {
    id: 1,
    name: "Josep Puig",
    location: "Girona",
    rating: 5,
    text: "Experiència increïble! La furgoneta estava impecable i el procés de recollida va ser super àgil.",
  },
  {
    id: 2,
    name: "Laura Martí",
    location: "Barcelona",
    rating: 5,
    text: "Molt bon servei i atenció al client. Ens van resoldre tots els dubtes abans del viatge. Repetirem segur!",
  },
  {
    id: 3,
    name: "Marc Garcia",
    location: "Tarragona",
    rating: 5,
    text: "Tot perfecte, des de la reserva fins a l'entrega. La camper té un equipament excel·lent.",
  },
  {
    id: 4,
    name: "Anna Torrents",
    location: "Lleida",
    rating: 4,
    text: "Una furgoneta molt còmoda i ben mantinguda. Ens va encantar la ruta pels Pirineus.",
  },
];

export default function Reviews() {
  return (
    <section id="opinions" className="py-24 bg-background bg-grain">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
            <span aria-hidden="true">✦</span> Testimonis
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight">
            Ho diuen ells, no <span className="italic text-primary">nosaltres</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="relative bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors"
            >
              <span
                aria-hidden="true"
                className="absolute -top-3 left-5 font-display text-5xl text-primary leading-none"
              >
                &ldquo;
              </span>

              <div
                className="flex gap-0.5 text-primary mt-3"
                aria-label={`${r.rating} de 5 estrelles`}
              >
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill={i < r.rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p className="mt-3 text-sm text-foreground/90 leading-relaxed">
                {r.text}
              </p>

              <div className="mt-5 pt-4 border-t border-border">
                <p className="font-semibold text-sm">{r.name}</p>
                <p className="text-xs text-muted">{r.location}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
