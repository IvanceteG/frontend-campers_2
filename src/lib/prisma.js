import { PrismaClient } from "@prisma/client";

/**
 * Singleton del client Prisma.
 * En desenvolupament, Next.js fa hot-reload i pot crear múltiples
 * instàncies. Aquest patró evita exhaurir el pool de connexions.
 */
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
