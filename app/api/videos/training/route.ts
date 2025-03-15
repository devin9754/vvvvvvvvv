import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Initialize Cognito
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Initialize S3
const s3 = new S3Client({
  region: "us-west-1", // N. California region for your S3 bucket
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Bucket & object key
const BUCKET_NAME = "digimodels-members";
const VIDEO_KEY = "EPD_Short_Reels_03.mp4";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 1) Attempt to fetch user with that AccessToken
  let userData;
  try {
    userData = await cognito.getUser({ AccessToken: token }).promise();
  } catch (err) {
    console.error("Error fetching user from Cognito:", err);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }

  // 2) Check group membership from user attributes
  const groupAttr = userData.UserAttributes?.find(
    (attr) => attr.Name === "cognito:groups"
  );
  if (!groupAttr?.Value) {
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  let groupList: string[] = [];
  try {
    groupList = JSON.parse(groupAttr.Value);
  } catch {
    groupList = [groupAttr.Value];
  }

  if (!groupList.includes("PaidMember")) {
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  // 3) Generate presigned URL if user is in PaidMember
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
