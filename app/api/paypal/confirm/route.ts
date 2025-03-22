import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const COGNITO_REGION = process.env.AWS_REGION_COGNITO || "us-west-1";
// The new user pool ID in us-west-1
const USER_POOL_ID = "us-west-1_oWJEn8Id2";
const GROUP_NAME = "PaidMembers";

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
      return NextResponse.json(
        { success: false, error: "No user email provided" },
        { status: 400 },
      );
    }

    // adminAddUserToGroup requires the actual Cognito username
    // If your pool uses "Email as username," you can pass userEmail
    // or do a "listUsers" by email first. For example:
    // const { Users } = await cognito.listUsers({
    //   UserPoolId: USER_POOL_ID,
    //   Filter: `email = "${userEmail}"`,
    // }).promise();
    // if (!Users || !Users[0]) { ... handle no user ... }
    // const cognitoUsername = Users[0].Username;

    // If "email = username," you can do:
    const cognitoUsername = userEmail;

    await cognito
      .adminAddUserToGroup({
        UserPoolId: USER_POOL_ID,
        Username: cognitoUsername,
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
