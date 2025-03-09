// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Only run for routes starting with /dashboard
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    // Get the access token cookie (adjust the name if you used a different one)
    const token = req.cookies.get("access_token");
    
    // If there's no token, redirect the user to the home page (or login page)
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  // If token exists or route doesn't require protection, allow request
  return NextResponse.next();
}

// Configure the middleware to run on any route under /dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};
