import { prisma } from "@/lib/prisma";

export default async function AdminHomePage() {
  const [models, comments, requests, users] = await Promise.all([
    prisma.camperModel.count(),
    prisma.comment.count(),
    prisma.contactRequest.count(),
    prisma.user.count(),
  ]);

  const pendingRequests = await prisma.contactRequest.count({
    where: { status: "pending" },
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Models" value={models} />
      <StatCard label="Comentaris" value={comments} />
      <StatCard
        label="Sol·licituds pendents"
        value={pendingRequests}
        sub={`${requests} en total`}
      />
      <StatCard label="Usuaris" value={users} />
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <p className="text-xs text-muted uppercase tracking-wider">{label}</p>
      <p className="mt-2 font-display text-4xl font-bold text-primary">
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </div>
  );
}
