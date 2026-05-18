import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth.config";

/**
 * Instància completa d'Auth.js v5 amb l'adapter de Prisma.
 * S'usa a les rutes API (Node.js runtime) i als Server Components.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
});
