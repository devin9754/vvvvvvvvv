import { NextResponse } from "next/server";
import { Buffer } from "buffer";

// Use your new region + domain + client info
// N. California is "us-west-1"
const COGNITO_DOMAIN = "https://us-west-1owjen8id2.auth.us-west-1.amazoncognito.com";
const CLIENT_ID = "nv14cnivba0jp52p93krnisat";
// If your app client has a secret, set it via environment or inline
const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET || "";
// Must match "Allowed callback URLs" in Cognito
const REDIRECT_URI = "https://digimodels.store/callback";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Missing code parameter" }, { status: 400 });
  }

  // Cognito's token endpoint for us-west-1
  const tokenEndpoint = `${COGNITO_DOMAIN}/oauth2/token`;

  // Build the POST form data for the token exchange
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", CLIENT_ID);
  params.append("code", code);
  params.append("redirect_uri", REDIRECT_URI);

  // If your client has a secret, do Basic Auth
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
      return NextResponse.json(
        { error: "Failed to exchange code for tokens" },
        { status: 500 },
      );
    }

    // Grab the access token from Cognito's response
    const tokenSet = await tokenResponse.json();
    const accessToken = tokenSet.access_token;

    // Redirect to your dashboard, setting the cookie
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
    return NextResponse.json(
      { error: "Failed to exchange code for tokens" },
      { status: 500 },
    );
  }
}
