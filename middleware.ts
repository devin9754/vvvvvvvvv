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
      const resp = NextResponse.redirect(new URL("/", req.url));
      resp.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
      return resp;
    }
  }
  const resp = NextResponse.next();
  resp.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return resp;
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
