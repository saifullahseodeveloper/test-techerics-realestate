import createIntlMiddleware from "next-intl/middleware";
import { auth } from "@/auth";
import { routing } from "@/i18n/routing";
import { NextResponse } from "next/server";

// Next.js 16 renamed middleware.ts -> proxy.ts (confirmed via latest docs research).
// Two concerns are composed here: (1) next-intl locale detection/redirect for all
// public routes, (2) auth-gating for /admin/* — admin is intentionally OUTSIDE the
// [locale] segment (admin dashboard is internal tooling, not a public SEO surface,
// so it doesn't need translation or locale prefixing).
const intlMiddleware = createIntlMiddleware(routing);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const isLoggedIn = !!req.auth;
    const isLoginPage = pathname === "/admin/login";
    if (!isLoginPage && !isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }
    return NextResponse.next();
  }

  return intlMiddleware(req);
});

export const config = {
  // Run on everything except static files, API routes, and Next internals
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
