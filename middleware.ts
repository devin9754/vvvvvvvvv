import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const protectedPaths = ["/dashboard", "/success"];
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
  matcher: ["/dashboard/:path*", "/success", "/success/:path*"],
};
