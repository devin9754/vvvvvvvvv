import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Define protected paths: both /dashboard and /success are protected.
  const protectedPaths = ["/dashboard", "/success"];

  // Check if the request path starts with any protected path.
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

// Ensure the middleware runs on any route under /dashboard and /success.
export const config = {
  matcher: ["/dashboard/:path*", "/success/:path*"],
};
