import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Use environment variables for regions, or fallback to "us-west-1"
const COGNITO_REGION = process.env.AWS_REGION_COGNITO || "us-west-1";
const S3_REGION = process.env.AWS_REGION_S3 || "us-west-1";

// Initialize the Cognito client with the correct region
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: COGNITO_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Initialize the S3 client for generating a presigned URL
const s3 = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Define your S3 bucket name and video key
const BUCKET_NAME = "digimodels-members";
const VIDEO_KEY = "EPD_Short_Reels_03.mp4";

// The required Cognito group name that grants access
const REQUIRED_GROUP = "PaidMembers";

export async function GET(request: NextRequest) {
  // 1) Check for the access_token cookie.
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 2) Try to fetch user details from Cognito.
  let userData;
  try {
    userData = await cognito.getUser({ AccessToken: token }).promise();
  } catch (err: unknown) {
    let errorMessage = "Unknown error";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error("Error calling cognito.getUser:", errorMessage);
    return NextResponse.json(
      { error: "Failed to fetch user", details: errorMessage },
      { status: 500 }
    );
  }

  // 3) Find the "cognito:groups" attribute in the returned user attributes.
  const groupAttr = userData.UserAttributes?.find(
    (attr) => attr.Name === "cognito:groups"
  );
  if (!groupAttr?.Value) {
    // If no group info exists, the user isn't in any groups.
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  // 4) Parse the group attribute (it might be a JSON array or a single string)
  let groupList: string[] = [];
  try {
    groupList = JSON.parse(groupAttr.Value);
  } catch {
    groupList = [groupAttr.Value];
  }

  // 5) Ensure the user is in the required group.
  if (!groupList.includes(REQUIRED_GROUP)) {
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  // 6) Generate a presigned URL for the private video (valid for 1 hour).
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: VIDEO_KEY,
    });
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return NextResponse.json({ signedUrl });
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error generating signed URL:", errorMessage);
    return NextResponse.json(
      { error: "Failed to generate URL", details: errorMessage },
      { status: 500 }
    );
  }
}
