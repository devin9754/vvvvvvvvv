import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// 1) Use environment variables for region, or fallback defaults:
const COGNITO_REGION = process.env.AWS_REGION || "us-east-1";
const S3_REGION = process.env.S3_REGION || "us-west-1";

// 2) Cognito client to verify group membership:
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: COGNITO_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// 3) S3 client for presigned URLs:
const s3 = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// 4) Name of your private S3 bucket & object key
const BUCKET_NAME = "digimodels-members";
const VIDEO_KEY = "EPD_Short_Reels_03.mp4";

// 5) Our GET route
export async function GET(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    // Not logged in
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Check user in Cognito
  let userData;
  try {
    userData = await cognito.getUser({ AccessToken: token }).promise();
  } catch (err) {
    console.error("Error fetching user from Cognito:", err);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }

  // Attempt to find group membership in user attributes
  const groupAttr = userData.UserAttributes?.find(
    (attr) => attr.Name === "cognito:groups"
  );

  // If none, user’s not in any group
  if (!groupAttr?.Value) {
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  // Could be a JSON array or string. Attempt parse:
  let groupList: string[] = [];
  try {
    groupList = JSON.parse(groupAttr.Value);
  } catch {
    groupList = [groupAttr.Value];
  }

  // Only "PaidMembers" is allowed. Adjust name if needed.
  if (!groupList.includes("PaidMembers")) {
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  // Generate the presigned URL (1-hour expiration)
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: VIDEO_KEY,
    });
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    // Return { signedUrl } to the client
    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json({ error: "Failed to generate URL" }, { status: 500 });
  }
}
