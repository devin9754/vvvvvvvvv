// app/api/videos/training/route.ts
import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// 1) Cognito client to check group membership
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION || "us-east-1", // Cognito region (N. Virginia)
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// 2) S3 client for generating a signed URL
const s3 = new S3Client({
  region: "us-west-1", // Your S3 bucket region (N. California)
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// The name of your private S3 bucket
const BUCKET_NAME = "digimodels-members";
// The specific video object key
const VIDEO_KEY = "EPD_Short_Reels_03.mp4";

export async function GET(request: NextRequest) {
  // 1) Check if user has an access_token cookie
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 2) Use Cognito to verify the user and check group membership
  let userData;
  try {
    userData = await cognito.getUser({ AccessToken: token }).promise();
  } catch (err) {
    console.error("Error fetching user from Cognito:", err);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }

  // Attempt to find the "cognito:groups" attribute
  const groupAttr = userData.UserAttributes?.find(
    (attr) => attr.Name === "cognito:groups"
  );

  // If there's no group attribute or the value is empty, user isn't in any group
  if (!groupAttr?.Value) {
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  // Parse group list. Could be a JSON array or a single string
  let groupList: string[] = [];
  try {
    groupList = JSON.parse(groupAttr.Value);
  } catch {
    groupList = [groupAttr.Value];
  }

  // Check if user is in "PaidMember"
  if (!groupList.includes("PaidMember")) {
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  // 3) Generate a short-lived signed URL for the private video
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: VIDEO_KEY,
    });

    // Signed URL valid for 1 hour (3600s). Adjust as needed.
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    // Return the signed URL to the client
    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json({ error: "Failed to generate URL" }, { status: 500 });
  }
}
