import { NextResponse } from "next/server";

export async function GET() {
  console.log("Logout GET triggered");
  const response = NextResponse.redirect("https://digimodels.store/");
  response.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  return response;
}

export async function POST() {
  console.log("Logout POST triggered");
  const response = NextResponse.redirect("https://digimodels.store/");
  response.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  return response;
}
