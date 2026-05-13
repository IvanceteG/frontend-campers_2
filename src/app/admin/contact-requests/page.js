import { prisma } from "@/lib/prisma";

export default async function ContactRequestsPage() {
  const requests = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold mb-6">
        Sol·licituds de contacte ({requests.length})
      </h2>

      {requests.length === 0 ? (
        <p className="text-muted">No hi ha sol·licituds encara.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <article
              key={r.id}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <header className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-semibold">{r.name}</h3>
                  <p className="text-sm text-muted">
                    {r.email} {r.phone && `· ${r.phone}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted">
                    {new Date(r.createdAt).toLocaleString("ca-ES")}
                  </p>
                  <StatusBadge status={r.status} />
                </div>
              </header>

              {r.modelSlug && (
                <p className="text-xs text-muted mb-2">
                  Interès: <code className="text-foreground">{r.modelSlug}</code>
                </p>
              )}

              {r.pickupDate && r.returnDate && (
                <p className="text-xs text-muted mb-2">
                  Dates:{" "}
                  {new Date(r.pickupDate).toLocaleDateString("ca-ES")} →{" "}
                  {new Date(r.returnDate).toLocaleDateString("ca-ES")}
                </p>
              )}

              <p className="text-sm mt-3 leading-relaxed">{r.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-primary/10 text-primary",
    contacted: "bg-accent/15 text-accent",
    closed: "bg-background-soft text-muted",
  };
  return (
    <span
      className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${styles[status] || styles.pending}`}
    >
      {status}
    </span>
  );
}
