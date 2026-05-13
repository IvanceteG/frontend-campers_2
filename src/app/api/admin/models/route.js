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
 * POST /api/admin/models
 * Crea un nou model. Requereix rol EDITOR o ADMIN (UC-08).
 */
export async function POST(request) {
  const session = await auth();
  const denied = requireStaff(session);
  if (denied) return denied;

  try {
    const body = await request.json();

    const created = await prisma.camperModel.create({
      data: {
        slug: body.slug,
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

    return NextResponse.json(
      { ...created, pricePerDay: Number(created.pricePerDay) },
      { status: 201 },
    );
  } catch (error) {
    console.error("[POST /api/admin/models]", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Ja existeix un model amb aquest slug" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Error en crear el model" },
      { status: 500 },
    );
  }
}
