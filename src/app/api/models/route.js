import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/models
 * Query params:
 *   - featured=true  → només destacats
 *   - limit=4        → limitar resultats
 *
 * Lectura pública (UC-01).
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured") === "true";
    const limit = parseInt(searchParams.get("limit") || "0", 10);

    const models = await prisma.camperModel.findMany({
      where: featured ? { featured: true } : undefined,
      orderBy: [{ featured: "desc" }, { id: "asc" }],
      take: limit > 0 ? limit : undefined,
    });

    // Decimal → number per serialitzar correctament a JSON
    const serialized = models.map((m) => ({
      ...m,
      pricePerDay: Number(m.pricePerDay),
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error("[GET /api/models]", error);
    return NextResponse.json(
      { error: "Error en carregar els models" },
      { status: 500 },
    );
  }
}
