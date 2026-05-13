import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

/**
 * POST /api/auth/register
 * Crea un usuari nou amb rol USER (UC-05).
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

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

    const { name, email, password } = parsed.data;

    // Comprovem si l'email ja està registrat
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { error: "Aquest email ja està registrat" },
        { status: 409 },
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: "USER",
      },
      select: { id: true, email: true, name: true, role: true },
    });

    return NextResponse.json({ ok: true, user }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/auth/register]", error);
    return NextResponse.json(
      { error: "Error en crear l'usuari" },
      { status: 500 },
    );
  }
}
