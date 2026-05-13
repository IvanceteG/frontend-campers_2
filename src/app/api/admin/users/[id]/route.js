import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { updateRoleSchema } from "@/lib/validations";

export async function PATCH(request, { params }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autenticat" }, { status: 401 });
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Només ADMIN pot canviar rols" }, { status: 403 });
  }

  const { id } = await params;
  if (id === session.user.id) {
    return NextResponse.json({ error: "No pots canviar el teu propi rol" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = updateRoleSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Rol no vàlid" }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { role: parsed.data.role },
      select: { id: true, email: true, role: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[PATCH /api/admin/users/[id]]", error);
    return NextResponse.json({ error: "Error en actualitzar" }, { status: 500 });
  }
}