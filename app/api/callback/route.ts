import { NextResponse } from "next/server";
import { Issuer, Client } from "openid-client";

// Replace these with your actual Cognito values
const USER_POOL_ID = "us-east-1_13qoo9QXx";
const REGION = "us-east-1";
const CLIENT_ID = "3ji0uv51r83q7u086p5f61fers";
const CLIENT_SECRET = "1ojdiqojoqcm9fqara6qiof5r0hfrdstpvte8ic8kl7jad9oodu6";
const CALLBACK_URL = "https://digimodels.store/api/callback";

// We'll store the Client instance here once discovered
let clientPromise: Promise<Client> | null = null;

async function getClient(): Promise<Client> {
  if (!clientPromise) {
    // Discover the OIDC configuration from Cognito
    clientPromise = Issuer.discover(
      `https://cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`
    ).then((issuer) => {
      return new issuer.Client({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uris: [CALLBACK_URL],
        response_types: ["code"],
      });
    });
  }
  return clientPromise;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing code parameter" },
      { status: 400 }
    );
  }

  try {
    const client = await getClient();

    // Parse callback params
    const callbackParams = client.callbackParams(request);

    // Exchange the code for tokens
    const tokenSet = await client.callback(CALLBACK_URL, callbackParams);
    const accessToken = tokenSet.access_token;

    // Create a redirect response to success
    const response = NextResponse.redirect(new URL("/success", request.url));

    // Set an HttpOnly, secure cookie with the access token
    response.cookies.set("access_token", accessToken || "", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("Error exchanging code for tokens:", error);
    return NextResponse.json(
      { error: "Failed to exchange code for tokens" },
      { status: 500 }
    );
  }
}
