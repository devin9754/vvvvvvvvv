import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Define the protected routes
  const protectedPaths = ["/dashboard", "/success"];

  // Check if the requested pathname is exactly a protected route
  // or starts with a protected route followed by a slash.
  if (
    protectedPaths.some(
      (path) =>
        req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(path + "/")
    )
  ) {
    const token = req.cookies.get("access_token");
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

// Ensure middleware runs for any /dashboard or /success requests (including exactly "/success")
export const config = {
  matcher: ["/dashboard/:path*", "/success", "/success/:path*"],
};
