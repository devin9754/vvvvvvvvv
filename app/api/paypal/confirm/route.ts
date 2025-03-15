// app/api/paypal/confirm/route.ts
import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const USER_POOL_ID = "us-east-1_13qoo9QXx";
const GROUP_NAME = "PaidMember";
const TEST_USERNAME = "testuser@example.com";

export async function POST() {
  try {
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
