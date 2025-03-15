// app/api/paypal/confirm/route.ts
import { NextResponse } from "next/server";
import AWS from "aws-sdk";

// Initialize the Cognito provider
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: "us-west-1",
});

const USER_POOL_ID = "us-east-1_4DpZvC3H2";
const GROUP_NAME = "PaidMember";
const TEST_USERNAME = "testuser@example.com";

export async function POST() {
  try {
    // Naive approach, no real PayPal verification
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
