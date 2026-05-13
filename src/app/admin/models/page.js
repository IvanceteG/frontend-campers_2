import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminModelsPage() {
  const models = await prisma.camperModel.findMany({
    orderBy: { id: "asc" },
    include: { _count: { select: { comments: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-semibold">
          Models ({models.length})
        </h2>
        <Link
          href="/admin/models/new"
          className="bg-foreground hover:bg-primary text-card font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
        >
          + Nou model
        </Link>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-background-soft">
            <tr className="text-left">
              <Th>Nom</Th>
              <Th>Tipus</Th>
              <Th>Preu/dia</Th>
              <Th>Destacat</Th>
              <Th>Comentaris</Th>
              <Th>Accions</Th>
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr key={m.id} className="border-t border-border">
                <Td>
                  <strong>{m.name}</strong>
                  <p className="text-xs text-muted">{m.slug}</p>
                </Td>
                <Td>{m.type}</Td>
                <Td>{Number(m.pricePerDay)} €</Td>
                <Td>
                  {m.featured ? (
                    <span className="text-accent">Sí</span>
                  ) : (
                    <span className="text-muted">No</span>
                  )}
                </Td>
                <Td>{m._count.comments}</Td>
                <Td>
                  <Link
                    href={`/admin/models/${m.slug}`}
                    className="text-primary hover:underline font-medium"
                  >
                    Editar
                  </Link>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
      {children}
    </th>
  );
}
function Td({ children }) {
  return <td className="px-4 py-3 align-top">{children}</td>;
}
