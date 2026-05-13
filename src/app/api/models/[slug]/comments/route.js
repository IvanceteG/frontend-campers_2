import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { commentSchema } from "@/lib/validations";

/**
 * GET /api/models/[slug]/comments
 * Llista pública de comentaris d'un model.
 */
export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const model = await prisma.camperModel.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!model) {
      return NextResponse.json(
        { error: "Model no trobat" },
        { status: 404 },
      );
    }

    const comments = await prisma.comment.findMany({
      where: { modelId: model.id },
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("[GET /api/models/[slug]/comments]", error);
    return NextResponse.json(
      { error: "Error en carregar comentaris" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/models/[slug]/comments
 * Crear un comentari. Requereix autenticació (UC-06, UC-07).
 */
export async function POST(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Has d'iniciar sessió per comentar" },
        { status: 401 },
      );
    }

    const { slug } = await params;
    const body = await request.json();
    const parsed = commentSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path.join(".")] = issue.message;
      }
      return NextResponse.json(
        { error: "Dades no vàlides", fieldErrors },
        { status: 400 },
      );
    }

    const model = await prisma.camperModel.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!model) {
      return NextResponse.json(
        { error: "Model no trobat" },
        { status: 404 },
      );
    }

    const comment = await prisma.comment.create({
      data: {
        content: parsed.data.content,
        rating: parsed.data.rating,
        userId: session.user.id,
        modelId: model.id,
      },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("[POST /api/models/[slug]/comments]", error);
    return NextResponse.json(
      { error: "Error en crear el comentari" },
      { status: 500 },
    );
  }
}
