import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Define protected paths (exact route and subpaths)
  const protectedPaths = ["/dashboard", "/success"];

  // Check if the requested path is exactly one of the protected routes
  // or starts with one of those routes followed by a "/"
  if (
    protectedPaths.some(
      (path) =>
        req.nextUrl.pathname === path ||
        req.nextUrl.pathname.startsWith(path + "/")
    )
  ) {
    const token = req.cookies.get("access_token");
    if (!token) {
      // Redirect anonymous users to the home page
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

// Configure the middleware to run for all paths under /dashboard and /success,
// including the exact route for /success.
export const config = {
  matcher: ["/dashboard/:path*", "/success", "/success/:path*"],
};
