// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Create a response redirecting to "/"
  const response = NextResponse.redirect(new URL("/", request.url));
  // Clear the "access_token" cookie by setting maxAge=0
  response.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  return response;
}
