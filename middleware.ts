// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
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
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
