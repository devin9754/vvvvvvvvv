// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Define the protected paths
  const protectedPaths = ["/dashboard", "/success"];

  // Check if the current request path is exactly one of the protected routes
  // or starts with one of them plus a "/"
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

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/success", "/success/:path*"],
};
