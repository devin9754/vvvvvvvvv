// app/api/paypal/confirm/route.ts
import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Replace with your actual user pool
const USER_POOL_ID = "us-east-1_13qoo9QXx";
const GROUP_NAME = "PaidMember";

export async function POST(request: Request) {
  try {
    // 1) Retrieve the user’s email or username from somewhere:
    // e.g., from a cookie, from the request body, from session, etc.
    // For example, if the user’s email is in the JSON body:
    const body = await request.json();
    const userEmail = body?.userEmail; 
    // Or if you have a cookie with the ID token or user sub, parse it.

    if (!userEmail) {
      return NextResponse.json({ success: false, error: "No user email provided" }, { status: 400 });
    }

    // 2) Add them to the PaidMember group
    await cognito
      .adminAddUserToGroup({
        UserPoolId: USER_POOL_ID,
        Username: userEmail, // or the user’s actual Cognito Username
        GroupName: GROUP_NAME,
      })
      .promise();

    // 3) Return success
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error adding user to group:", errorMessage);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
