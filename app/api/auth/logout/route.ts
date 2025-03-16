import { NextResponse } from "next/server";

export async function POST() {
  console.log("Logout POST triggered");
  const response = NextResponse.json({ success: true });
  response.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return response;
}
