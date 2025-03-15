// app/api/paypal/confirm/route.ts
import { NextResponse } from "next/server";
import AWS from "aws-sdk";

// Initialize the Cognito provider with the us-east-1 region
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: "us-east-1",
});

// Replace with your actual user pool ID (from your Cognito user pool configuration)
const USER_POOL_ID = "us-east-1_13qoo9QXx";
// The group name that grants access to paid training videos
const GROUP_NAME = "PaidMember";

// For demonstration, we hard-code the Cognito username.
// In production, match the PayPal payer’s email or ID to your Cognito user.
const TEST_USERNAME = "testuser@example.com";

export async function POST() {
  try {
    // Naively add the user to the PaidMember group (no real PayPal verification here)
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
