import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: "us-east-1", // Cognito region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const USER_POOL_ID = "us-east-1_LE1OnaNPP";
const GROUP_NAME = "PaidMembers";

export async function POST(request: Request) {
  try {
    // Suppose PayPal sends back the user's email or you store it in your session
    // Example: { userEmail: "someone@example.com" }
    const body = await request.json();
    const userEmail = body?.userEmail;

    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: "No user email provided" },
        { status: 400 }
      );
    }

    // Add the user to the "PaidMembers" group
    await cognito
      .adminAddUserToGroup({
        UserPoolId: USER_POOL_ID,
        Username: userEmail,
        GroupName: GROUP_NAME,
      })
      .promise();

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = (error as Error).message || "Unknown error";
    console.error("Error adding user to group:", errorMessage);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
