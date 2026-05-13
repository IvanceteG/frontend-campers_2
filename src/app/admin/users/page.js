import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import UsersTable from "./UsersTable";

export default async function UsersAdminPage() {
  const session = await auth();

  // Doble protecció: el middleware ja filtra però aquí restringim a ADMIN
  if (session?.user?.role !== "ADMIN") {
    redirect("/admin");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      _count: { select: { comments: true } },
    },
  });

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold mb-6">
        Usuaris ({users.length})
      </h2>
      <UsersTable users={users} currentUserId={session.user.id} />
    </div>
  );
}
