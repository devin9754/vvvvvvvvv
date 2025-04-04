import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Use environment variables for region or fallback
const COGNITO_REGION = process.env.AWS_REGION_COGNITO || "us-west-1";
const S3_REGION = process.env.AWS_REGION_S3 || "us-west-1";

// Initialize the Cognito client
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: COGNITO_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Initialize the S3 client
const s3 = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Bucket & Key
const BUCKET_NAME = "digimodels-members";
const VIDEO_KEY = "EPD_Short_Reels_03.mp4";
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

  // 3) Find the "cognito:groups" attribute.
  const groupAttr = userData.UserAttributes?.find(
    (attr) => attr.Name === "cognito:groups"
  );
  if (!groupAttr?.Value) {
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  // 4) Parse the group attribute
  let groupList: string[] = [];
  try {
    groupList = JSON.parse(groupAttr.Value);
  } catch {
    groupList = [groupAttr.Value];
  }

  // 5) Ensure user is in the required group
  if (!groupList.includes(REQUIRED_GROUP)) {
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  // 6) Generate presigned URL
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
