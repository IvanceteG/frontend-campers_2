import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

/**
 * Proxy (abans "middleware") d'autorització per a rutes protegides.
 * Next.js 16 ha reanomenat la convenció middleware → proxy.
 *
 * Usa authConfig (sense adapter Prisma) perquè corre en Edge Runtime.
 * - /admin/*  → només EDITOR i ADMIN (UC-10)
 */
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const role = req.auth?.user?.role;

    if (!req.auth) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (role !== "EDITOR" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
