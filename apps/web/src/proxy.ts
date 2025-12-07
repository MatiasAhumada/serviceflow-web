import { auth } from "@/lib/auth";
import { APP_ROUTES } from "@/constants/routes.constants";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname === APP_ROUTES.LOGIN;
  const isPublicRoute = req.nextUrl.pathname.startsWith("/api/auth");

  // Permitir rutas públicas
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Si está logueado y trata de ir al login, redirigir al dashboard
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL(APP_ROUTES.HOME, req.url));
  }

  // Si no está logueado y no está en login, redirigir al login
  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL(APP_ROUTES.LOGIN, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets).*)"],
};