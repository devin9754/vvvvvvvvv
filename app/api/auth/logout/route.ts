// File: app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  console.log("Logout POST triggered");
  const response = NextResponse.redirect("https://digimodels.store/");
  response.cookies.set("access_token", "", {
    path: "/",
    maxAge: 0,
  });
  return response;
}

// Optionally handle GET for direct links to /api/auth/logout
export async function GET() {
  console.log("Logout GET triggered");
  const response = NextResponse.redirect("https://digimodels.store/");
  response.cookies.set("access_token", "", {
    path: "/",
    maxAge: 0,
  });
  return response;
}
