import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // List of top-level protected routes
  const protectedPaths = ["/success", "/dashboard"];

  // Check if the request path is EXACTLY one of the protected routes
  // or starts with it followed by a slash.
  if (
    protectedPaths.some(
      (path) =>
        req.nextUrl.pathname === path || // exact match
        req.nextUrl.pathname.startsWith(path + "/") // subpath
    )
  ) {
    const token = req.cookies.get("access_token");
    // If no token, redirect to home
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  // Otherwise allow
  return NextResponse.next();
}

// The matcher ensures the middleware runs on:
//   - EXACT /success
//   - /success/... subpaths
//   - EXACT /dashboard
//   - /dashboard/... subpaths
export const config = {
  matcher: [
    "/success",
    "/success/:path*",
    "/dashboard",
    "/dashboard/:path*"
  ],
};
