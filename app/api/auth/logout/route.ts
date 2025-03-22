import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect("https://digimodels.store/");
  response.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return response;
}

export async function POST() {
  const response = NextResponse.redirect("https://digimodels.store/");
  response.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return response;
}
