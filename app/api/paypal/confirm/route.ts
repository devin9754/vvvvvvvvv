import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Use your actual user pool ID and the new group name "PaidMembers"
const USER_POOL_ID = "us-east-1_LE1OnaNPP";
const GROUP_NAME = "PaidMembers";

export async function POST(request: Request) {
  try {
    // Expect the client to send a JSON body containing the user’s email (which is used as the Cognito username)
    const body = await request.json();
    const userEmail = body?.userEmail;
    if (!userEmail) {
      return NextResponse.json({ success: false, error: "No user email provided" }, { status: 400 });
    }

    await cognito
      .adminAddUserToGroup({
        UserPoolId: USER_POOL_ID,
        Username: userEmail,
        GroupName: GROUP_NAME,
      })
      .promise();

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
