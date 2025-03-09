import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Check if the request is for a protected route
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    // Look for an auth token in cookies (adjust the cookie name as needed)
    const token = req.cookies.get("access_token");

    // If token is missing, redirect to the home page (or login page)
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  // Run this middleware on any route under /dashboard
  matcher: ["/dashboard/:path*"],
};
