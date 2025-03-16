import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const COGNITO_REGION = process.env.AWS_REGION || "us-east-1";
const USER_POOL_ID = "us-east-1_LE1OnaNPP"; // Your new user pool
const GROUP_NAME = "PaidMembers"; // Must match exactly the group name in Cognito

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: COGNITO_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: Request) {
  try {
    // You’d typically get userEmail from your PayPal IPN or from session
    // This is just a naive example
    const body = await request.json();
    const userEmail = body?.userEmail;
    if (!userEmail) {
      return NextResponse.json({ success: false, error: "No user email provided" }, { status: 400 });
    }

    // adminAddUserToGroup requires the Cognito username to match
    await cognito
      .adminAddUserToGroup({
        UserPoolId: USER_POOL_ID,
        Username: userEmail, // must be an actual user in that pool
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
