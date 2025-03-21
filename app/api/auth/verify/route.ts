import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Grab the cookie from the request
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "No valid token" }, { status: 401 });
  }

  // Optionally call Cognito to verify deeper checks:
  // try {
  //   const userData = await cognito.getUser({ AccessToken: token }).promise();
  // } catch (err) {
  //   return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  // }

  return NextResponse.json({ success: true });
}
