import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { contactRequestSchema } from "@/lib/validations";

/**
 * POST /api/contact-requests
 * Crea una nova sol·licitud de contacte (UC-03).
 * Públic — qualsevol pot enviar sense estar autenticat.
 *
 * GET /api/contact-requests
 * Llista totes les sol·licituds. Restringit a EDITOR/ADMIN.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = contactRequestSchema.safeParse(body);

    if (!parsed.success) {
      // Convertim els errors de Zod a un format manejable pel client
      const fieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.join(".");
        fieldErrors[key] = issue.message;
      }
      return NextResponse.json(
        { error: "Dades no vàlides", fieldErrors },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const created = await prisma.contactRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        modelSlug: data.modelSlug || null,
        pickupDate: data.pickupDate ? new Date(data.pickupDate) : null,
        returnDate: data.returnDate ? new Date(data.returnDate) : null,
        message: data.message,
      },
    });

    return NextResponse.json({ id: created.id, ok: true }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/contact-requests]", error);
    return NextResponse.json(
      { error: "Error en processar la sol·licitud" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "No autenticat" }, { status: 401 });
    }
    if (!["EDITOR", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "No autoritzat" }, { status: 403 });
    }

    const requests = await prisma.contactRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("[GET /api/contact-requests]", error);
    return NextResponse.json(
      { error: "Error en carregar sol·licituds" },
      { status: 500 },
    );
  }
}
