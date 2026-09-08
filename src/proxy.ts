import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_AUTH_SECRET || "belarmino-admin-secret-jwt-key-change-in-prod-2026"
);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept /admin routes
  if (pathname.startsWith("/admin")) {
    // Allow login route freely
    if (pathname === "/admin/login") {
      const token = request.cookies.get("belarmino_admin_session")?.value;
      if (token) {
        try {
          await jwtVerify(token, SECRET_KEY);
          // Already logged in -> redirect to /admin dashboard
          return NextResponse.redirect(new URL("/admin", request.url));
        } catch {
          // Invalid token, stay on login
        }
      }
      return NextResponse.next();
    }

    // For all other /admin routes, check auth session
    const token = request.cookies.get("belarmino_admin_session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next();
    } catch {
      // Invalid or expired token
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("belarmino_admin_session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
