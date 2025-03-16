import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Protect /dashboard or subpaths
  if (
    req.nextUrl.pathname === "/dashboard" ||
    req.nextUrl.pathname.startsWith("/dashboard/")
  ) {
    const token = req.cookies.get("access_token");
    if (!token) {
      console.log("Middleware: No access token found, redirecting to home.");
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Force no-cache to prevent "back button" from resurrecting the page
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return response;
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
