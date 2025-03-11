import { NextResponse } from "next/server";
import { Buffer } from "buffer";

const COGNITO_DOMAIN = "https://us-east-1nvdll7sku.auth.us-east-1.amazoncognito.com";
const CLIENT_ID = "46a9rm6mfce87enhsjk507mn9r";
const CLIENT_SECRET = "3ciqhcjh2i1292iblbj7mjc7c00bk078gv9rq97p3umm2129r65";
const REDIRECT_URI = "https://digimodels.store/api/auth/callback";

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

    // Redirect directly to the dashboard
    const response = NextResponse.redirect("https://digimodels.store/dashboard");

    response.cookies.set("access_token", accessToken || "", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    return NextResponse.json({ error: "Failed to exchange code for tokens" }, { status: 500 });
  }
}
