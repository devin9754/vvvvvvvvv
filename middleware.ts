// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // If the request is exactly "/dashboard" or starts with "/dashboard/"
  if (
    req.nextUrl.pathname === "/dashboard" ||
    req.nextUrl.pathname.startsWith("/dashboard/")
  ) {
    const token = req.cookies.get("access_token");
    // If no token, redirect to home
    if (!token) {
      console.log("Middleware: No access token found, redirecting to /");
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
