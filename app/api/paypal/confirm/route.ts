import { NextResponse } from "next/server";
import AWS from "aws-sdk";

// Cognito config
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// The new user pool ID & group name
const USER_POOL_ID = "us-east-1_LE1OnaNPP";
const GROUP_NAME = "PaidMember";

export async function POST(request: Request) {
  try {
    // For real usage, parse the user’s email or sub from PayPal callback
    // or from session. Example: { userEmail: "someone@example.com" }
    const body = await request.json();
    const userEmail = body?.userEmail;

    if (!userEmail) {
      return NextResponse.json({ success: false, error: "No user email provided" }, { status: 400 });
    }

    // Add user to the PaidMember group
    await cognito
      .adminAddUserToGroup({
        UserPoolId: USER_POOL_ID,
        Username: userEmail, // Must match the actual username in Cognito
        GroupName: GROUP_NAME,
      })
      .promise();

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error adding user to group:", errorMessage);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
