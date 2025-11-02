import { auth } from "@/lib/auth";
import { APP_ROUTES } from "@/constants/routes.constants";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== APP_ROUTES.LOGIN) {
    return Response.redirect(new URL(APP_ROUTES.LOGIN, req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};