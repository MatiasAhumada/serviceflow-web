import { auth } from "@/lib/auth";
import { APP_ROUTES } from "@/constants/routes.constants";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname === APP_ROUTES.LOGIN;
  const isRegisterTrialPage =
    req.nextUrl.pathname === APP_ROUTES.REGISTER_TRIAL;
  const isPublicRoute = req.nextUrl.pathname.startsWith("/api/auth");

  if (isPublicRoute || isRegisterTrialPage) {
    return NextResponse.next();
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL(APP_ROUTES.HOME, req.url));
  }

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL(APP_ROUTES.LOGIN, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets).*)"],
};
