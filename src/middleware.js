import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Middleware d'autorització per a rutes protegides (UC-10).
 * - /admin/*       → només EDITOR i ADMIN
 * - /admin/users   → només ADMIN (es comprova també a la pàgina)
 */
export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Rutes que requereixen com a mínim EDITOR
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

// Configura quines rutes passen pel middleware
export const config = {
  matcher: ["/admin/:path*"],
};
