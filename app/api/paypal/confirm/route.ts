import { NextResponse } from "next/server";
import AWS from "aws-sdk";

// Use environment variables or fallback values for your region.
// Make sure your DigitalOcean env var AWS_REGION_COGNITO is set to "us-west-1".
const COGNITO_REGION = process.env.AWS_REGION_COGNITO || "us-west-1";
// Update USER_POOL_ID with your new pool's ID in us-west-1.
const USER_POOL_ID = "us-west-1_oWJEn8Id2";
const GROUP_NAME = "PaidMembers";

// Initialize the Cognito client.
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: COGNITO_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: Request) {
  try {
    // Parse the JSON body; expect an object with "userEmail"
    const body = await request.json();
    const userEmail = body?.userEmail;
    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: "No user email provided" },
        { status: 400 }
      );
    }

    // Look up the user by email to get their internal Cognito username (UUID)
    const listResult = await cognito
      .listUsers({
        UserPoolId: USER_POOL_ID,
        Filter: `email = "${userEmail}"`,
      })
      .promise();

    if (!listResult.Users || listResult.Users.length === 0) {
      return NextResponse.json(
        { success: false, error: "No matching user found" },
        { status: 404 }
      );
    }

    const actualUsername = listResult.Users[0].Username;
    if (!actualUsername) {
      return NextResponse.json(
        { success: false, error: "User has no Cognito username" },
        { status: 500 }
      );
    }

    // Add the user to the "PaidMembers" group using their internal username.
    await cognito
      .adminAddUserToGroup({
        UserPoolId: USER_POOL_ID,
        Username: actualUsername,
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
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
