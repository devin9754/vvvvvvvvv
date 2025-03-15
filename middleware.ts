import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname === "/dashboard" ||
    req.nextUrl.pathname.startsWith("/dashboard/")
  ) {
    const token = req.cookies.get("access_token");
    if (!token) {
      console.log("Middleware: No access token found, redirecting to home.");
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Optionally set no-cache headers on every route or just the /dashboard
  // for the sake of back-button issues:
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return res;
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
