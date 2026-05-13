import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

function requireStaff(session) {
  if (!session?.user) {
    return NextResponse.json({ error: "No autenticat" }, { status: 401 });
  }
  if (!["EDITOR", "ADMIN"].includes(session.user.role)) {
    return NextResponse.json({ error: "No autoritzat" }, { status: 403 });
  }
  return null;
}

/**
 * PUT /api/admin/models/[slug]
 * Actualitza un model. Requereix EDITOR o ADMIN.
 */
export async function PUT(request, { params }) {
  const session = await auth();
  const denied = requireStaff(session);
  if (denied) return denied;

  try {
    const { slug } = await params;
    const body = await request.json();

    const updated = await prisma.camperModel.update({
      where: { slug },
      data: {
        name: body.name,
        type: body.type,
        seats: body.seats,
        beds: body.beds,
        bathroom: body.bathroom || "—",
        equipment: body.equipment || "",
        pricePerDay: body.pricePerDay,
        description: body.description,
        longDescription: body.longDescription || null,
        includes: body.includes || [],
        image: body.image || "",
        featured: !!body.featured,
      },
    });

    return NextResponse.json({
      ...updated,
      pricePerDay: Number(updated.pricePerDay),
    });
  } catch (error) {
    console.error("[PUT /api/admin/models/[slug]]", error);
    return NextResponse.json(
      { error: "Error en actualitzar el model" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/admin/models/[slug]
 * Elimina un model. Requereix EDITOR o ADMIN.
 */
export async function DELETE(request, { params }) {
  const session = await auth();
  const denied = requireStaff(session);
  if (denied) return denied;

  try {
    const { slug } = await params;
    await prisma.camperModel.delete({ where: { slug } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[DELETE /api/admin/models/[slug]]", error);
    return NextResponse.json(
      { error: "Error en eliminar el model" },
      { status: 500 },
    );
  }
}
