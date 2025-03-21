import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Use environment variables for region, or fallback
const COGNITO_REGION = process.env.AWS_REGION_COGNITO || "us-west-1";
const S3_REGION = process.env.AWS_REGION_S3 || "us-west-1";

// 1) Cognito client to check group membership
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: COGNITO_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// 2) S3 client for generating a signed URL
const s3 = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// The name of your private S3 bucket & object
const BUCKET_NAME = "digimodels-members";
const VIDEO_KEY = "EPD_Short_Reels_03.mp4";

// The name of your Cognito user pool group that grants access
const REQUIRED_GROUP = "PaidMembers";

export async function GET(request: NextRequest) {
  // 1) Check for access_token cookie
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 2) Fetch user details from Cognito
  let userData;
  try {
    userData = await cognito.getUser({ AccessToken: token }).promise();
  } catch (err) {
    console.error("Error calling cognito.getUser:", err);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }

  // 3) Check the "cognito:groups" attribute
  const groupAttr = userData.UserAttributes?.find(
    (attr) => attr.Name === "cognito:groups"
  );
  if (!groupAttr?.Value) {
    // No group info → user has no groups
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  // The groupAttr might be JSON array or a single string
  let groupList: string[] = [];
  try {
    groupList = JSON.parse(groupAttr.Value);
  } catch {
    groupList = [groupAttr.Value];
  }

  // 4) Ensure the user is in our required group
  if (!groupList.includes(REQUIRED_GROUP)) {
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  // 5) Generate a short-lived presigned URL (1 hour) for the private video
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: VIDEO_KEY,
    });
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json({ error: "Failed to generate URL" }, { status: 500 });
  }
}
