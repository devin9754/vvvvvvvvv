import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION_COGNITO || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const s3 = new S3Client({
  region: process.env.AWS_REGION_S3 || "us-west-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// S3 bucket and key
const BUCKET_NAME = "digimodels-members";
const VIDEO_KEY = "EPD_Short_Reels_03.mp4";

export async function GET(request: NextRequest) {
  // 1) Check for access_token
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 2) Get user from Cognito
  let userData;
  try {
    userData = await cognito.getUser({ AccessToken: token }).promise();
  } catch (err) {
    console.error("Error fetching user from Cognito:", err);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }

  // 3) Check if user is in PaidMembers group
  const groupAttr = userData.UserAttributes?.find((attr) => attr.Name === "cognito:groups");
  if (!groupAttr?.Value) {
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  let groupList: string[] = [];
  try {
    groupList = JSON.parse(groupAttr.Value);
  } catch {
    groupList = [groupAttr.Value];
  }

  if (!groupList.includes("PaidMembers")) {
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  // 4) Generate presigned URL
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
