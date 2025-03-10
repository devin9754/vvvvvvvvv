import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Define protected paths: both /dashboard and /success should be protected.
  const protectedPaths = ["/dashboard", "/success"];

  // If the current path starts with one of the protected paths, check for the access token.
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    const token = req.cookies.get("access_token");

    // If the token doesn't exist, redirect to the home page.
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Otherwise, allow the request to proceed.
  return NextResponse.next();
}

// Run this middleware on any route under /dashboard and /success.
export const config = {
  matcher: ["/dashboard/:path*", "/success/:path*"],
};
