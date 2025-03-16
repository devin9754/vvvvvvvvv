import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION_COGNITO || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const USER_POOL_ID = "us-east-1_LE1OnaNPP";
const GROUP_NAME = "PaidMembers";

export async function POST(request: Request) {
  try {
    // Example: read userEmail from request JSON
    const body = await request.json();
    const userEmail = body?.userEmail; // e.g. "someone@example.com"

    if (!userEmail) {
      return NextResponse.json({ success: false, error: "No user email provided" }, { status: 400 });
    }

    // Add them to PaidMembers group
    await cognito
      .adminAddUserToGroup({
        UserPoolId: USER_POOL_ID,
        Username: userEmail,
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
