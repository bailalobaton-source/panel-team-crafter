// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

  // Redirección inteligente en la raíz "/"
  if (request.nextUrl.pathname === "/") {
    return token
      ? NextResponse.redirect(new URL("/dashboard", request.url))
      : NextResponse.redirect(new URL("/login", request.url));
  }

  // Protección de rutas bajo /dashboard
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
