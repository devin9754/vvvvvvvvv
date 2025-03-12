// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

// Handle GET requests (e.g. a direct link <a href="/api/auth/logout">)
export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  return response;
}

// Handle POST requests (e.g. fetch("/api/auth/logout", { method: "POST" }))
export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  return response;
}
