import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // If the request path is exactly /dashboard or starts with /dashboard/
  if (
    req.nextUrl.pathname === "/dashboard" ||
    req.nextUrl.pathname.startsWith("/dashboard/")
  ) {
    const token = req.cookies.get("access_token");
    // If no token, redirect to home
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  // We match the exact /dashboard route and any subpaths under /dashboard
  matcher: ["/dashboard", "/dashboard/:path*"],
};
