import { NextResponse } from "next/server";

// We handle both GET and POST for logout
export async function GET() {
  console.log("Logout GET triggered");
  const response = NextResponse.redirect("https://digimodels.store/");
  response.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return response;
}

export async function POST() {
  console.log("Logout POST triggered");
  const response = NextResponse.redirect("https://digimodels.store/");
  response.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return response;
}
