import { prisma } from "@/lib/prisma";

/**
 * Capa de servei: accés a dades.
 *
 * En server components (la majoria del nostre codi), accedim directament
 * a Prisma. És més ràpid que fer un fetch intern.
 *
 * Si en algun moment volem fer fetch a una API externa, podem afegir
 * una branca segons NEXT_PUBLIC_API_URL aquí mateix.
 */

function serialize(model) {
  if (!model) return null;
  return { ...model, pricePerDay: Number(model.pricePerDay) };
}

export async function getAllModels() {
  const models = await prisma.camperModel.findMany({
    orderBy: [{ featured: "desc" }, { id: "asc" }],
  });
  return models.map(serialize);
}

export async function getModelBySlug(slug) {
  const model = await prisma.camperModel.findUnique({
    where: { slug },
  });
  return serialize(model);
}

export async function getFeaturedModels(limit = 4) {
  const models = await prisma.camperModel.findMany({
    where: { featured: true },
    orderBy: { id: "asc" },
    take: limit,
  });
  return models.map(serialize);
}
