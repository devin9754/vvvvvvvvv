import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "No valid token" }, { status: 401 });
  }
  // Optionally call Cognito to verify if you want deeper checks:
  // e.g. await cognito.getUser({ AccessToken: token }).promise();

  return NextResponse.json({ success: true });
}
