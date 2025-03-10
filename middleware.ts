import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // List the protected routes
  const protectedPaths = ["/success", "/dashboard"];

  // Check if the request path starts with any protected route
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    // Read the "access_token" cookie
    const token = req.cookies.get("access_token");
    // If no token, redirect to the home page (or your login page)
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// Configure the middleware to run on the protected routes
export const config = {
  matcher: ["/success/:path*", "/dashboard/:path*"],
};
