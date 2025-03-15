import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const cognito = new AWS.CognitoIdentityServiceProvider({ region: "us-east-1" });
const s3 = new S3Client({ region: "us-east-1" });

// Example: checking if user is in "PaidMember" group
export async function GET(request: NextRequest) {
  // Check if user has an access_token cookie
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 1) Get user from Cognito
  let userData;
  try {
    userData = await cognito.getUser({ AccessToken: token }).promise();
  } catch (err) {
    console.error("Error fetching user from Cognito:", err);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }

  // 2) Check if user is in "PaidMember" group
  //    Cognito doesn't always return 'cognito:groups' as a standard attribute,
  //    so you might do a separate adminListGroupsForUser. But let's assume
  //    userData.UserAttributes includes "cognito:groups" for demonstration.

  const groupAttr = userData.UserAttributes?.find(
    (attr) => attr.Name === "cognito:groups"
  );

  if (!groupAttr?.Value) {
    // If there's no "cognito:groups" attribute or the value is empty,
    // the user isn't in any group
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  let groupList: string[] = [];
  try {
    // groupAttr.Value is a string, but we must handle the possibility it might not be valid JSON
    groupList = JSON.parse(groupAttr.Value);
  } catch {
    // If parsing fails, assume it's a single group string
    groupList = [groupAttr.Value];
  }

  if (!groupList.includes("PaidMember")) {
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  // 3) Generate a short-lived signed URL from your private bucket
  try {
    const command = new GetObjectCommand({
      Bucket: "digimodels-members", // your private bucket name
      Key: "EPD_Short_Reels_03.mp4", // your video object key
    });
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json({ error: "Failed to generate URL" }, { status: 500 });
  }
}
