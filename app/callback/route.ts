import { NextResponse } from "next/server";
import { Buffer } from "buffer";

const COGNITO_DOMAIN = "https://us-east-1le1onanpp.auth.us-east-1.amazoncognito.com";
const CLIENT_ID = "4a8r52l7d5267hle2liar1nr6p";
const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET || "1f1k65mo3jmakcmjabtf40kvna6f5s9o0pg5aguni34fb9s0a141";
const REDIRECT_URI = "https://digimodels.store/callback";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Missing code parameter" }, { status: 400 });
  }

  const tokenEndpoint = `${COGNITO_DOMAIN}/oauth2/token`;
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", CLIENT_ID);
  params.append("code", code);
  params.append("redirect_uri", REDIRECT_URI);

  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  try {
    const tokenResponse = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      body: params.toString(),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Token response error:", errorText);
      return NextResponse.json({ error: "Failed to exchange code for tokens" }, { status: 500 });
    }

    const tokenSet = await tokenResponse.json();
    const accessToken = tokenSet.access_token;

    const response = NextResponse.redirect("https://digimodels.store/dashboard");
    response.cookies.set("access_token", accessToken || "", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    return NextResponse.json({ error: "Failed to exchange code for tokens" }, { status: 500 });
  }
}
