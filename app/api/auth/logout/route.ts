// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

/**
 * If your logout is triggered by a link or <a href="..."> (which does a GET request)
 */
export async function GET() {
  console.log("Logout GET triggered");
  // Redirect user back to the home page
  const response = NextResponse.redirect("https://digimodels.store/");
  // Clear the access_token cookie
  response.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  return response;
}

/**
 * If your logout is triggered by a form or fetch() with method="POST"
 */
export async function POST() {
  console.log("Logout POST triggered");
  // Redirect user back to the home page
  const response = NextResponse.redirect("https://digimodels.store/");
  // Clear the access_token cookie
  response.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  return response;
}
