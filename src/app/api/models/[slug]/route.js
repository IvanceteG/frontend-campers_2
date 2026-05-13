import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/models/[slug]
 * Detall complet d'un model. Lectura pública (UC-02).
 */
export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const model = await prisma.camperModel.findUnique({
      where: { slug },
    });

    if (!model) {
      return NextResponse.json(
        { error: "Model no trobat" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ...model,
      pricePerDay: Number(model.pricePerDay),
    });
  } catch (error) {
    console.error("[GET /api/models/[slug]]", error);
    return NextResponse.json(
      { error: "Error en carregar el model" },
      { status: 500 },
    );
  }
}
