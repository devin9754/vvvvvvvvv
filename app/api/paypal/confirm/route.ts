// app/api/paypal/confirm/route.ts
import { NextResponse } from "next/server";
import AWS from "aws-sdk";

// Initialize the Cognito provider with your region
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: "us-west-1", // or your user pool's region
});

// Replace with your actual user pool ID
const USER_POOL_ID = "us-east-1_4DpZvC3H2";

// Hard-coded group name
const GROUP_NAME = "PaidMember";

// Example: We assume the user's Cognito Username or email is known
// In reality, you'd match the PayPal payer's email to your Cognito user or session data
const TEST_USERNAME = "testuser@example.com";

export async function POST() {
  try {
    // 1) (Naively) We skip verifying PayPal. In production, do a real check or use a webhook.
    // 2) Add the user to the PaidMember group in Cognito
    await cognito
      .adminAddUserToGroup({
        UserPoolId: USER_POOL_ID,
        Username: TEST_USERNAME,
        GroupName: GROUP_NAME,
      })
      .promise();

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // Use a type guard to get the message
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error adding user to group:", error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
