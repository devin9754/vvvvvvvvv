// app/api/paypal/confirm/route.ts
import { NextResponse } from "next/server";
import AWS from "aws-sdk";

// 1) Make sure you've installed aws-sdk: npm install aws-sdk
// 2) Adjust region to match your user pool's region
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: "us-west-1",
});

// Replace with your actual user pool ID
const USER_POOL_ID = "us-east-1_XXXXXX";
// Group name you want to add user to
const GROUP_NAME = "PaidMember";

// Hard-coded example: in production, you'd figure out the actual Cognito username
// maybe from session or matching PayPal email to Cognito email
const TEST_USERNAME = "testuser@example.com";

export async function POST() {
  try {
    // Naive approach: no real PayPal verification
    await cognito
      .adminAddUserToGroup({
        UserPoolId: USER_POOL_ID,
        Username: TEST_USERNAME,
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
