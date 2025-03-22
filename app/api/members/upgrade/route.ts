import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const COGNITO_REGION = process.env.AWS_REGION_COGNITO || "us-west-1";
const USER_POOL_ID = "us-west-1_oWJEn8Id2"; // Replace with your actual pool ID
const GROUP_NAME = "PaidMembers";

// Initialize the CognitoIdentityServiceProvider client
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: COGNITO_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: Request) {
  try {
    // 1) Read the JSON body
    const body = await request.json();
    const userEmail = body?.userEmail;
    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: "No userEmail provided" },
        { status: 400 },
      );
    }

    // 2) Look up the user by email to get the internal Cognito Username (UUID)
    const listResult = await cognito
      .listUsers({
        UserPoolId: USER_POOL_ID,
        Filter: `email = "${userEmail}"`,
      })
      .promise();

    if (!listResult.Users || listResult.Users.length === 0) {
      return NextResponse.json(
        { success: false, error: "No matching user found" },
        { status: 404 },
      );
    }

    // The actual Cognito username is typically a UUID like "79f9b22e-2be1-70f2-9b46-100d9f14fa8b"
    const actualUsername = listResult.Users[0].Username;
    if (!actualUsername) {
      return NextResponse.json(
        { success: false, error: "User has no Cognito username" },
        { status: 500 },
      );
    }

    // 3) Add the user to the PaidMembers group
    await cognito
      .adminAddUserToGroup({
        UserPoolId: USER_POOL_ID,
        Username: actualUsername,
        GroupName: GROUP_NAME,
      })
      .promise();

    // 4) Return success
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error adding user to group:", errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
