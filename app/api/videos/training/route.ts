// app/api/videos/training/route.ts
import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const cognito = new AWS.CognitoIdentityServiceProvider({ region: "us-west-1" });
const s3 = new S3Client({ region: "us-west-1" });

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
  // Cognito doesn't always return 'cognito:groups' as a standard attribute,
  // so you might have to do a separate adminListGroupsForUser or store custom attributes.
  // For demonstration, let's assume the userData includes a "cognito:groups" attribute.

  const groupsAttr = userData.UserAttributes.find(
    (attr) => attr.Name === "cognito:groups"
  );
  let groupList: string[] = [];
  if (groupsAttr) {
    try {
      groupList = JSON.parse(groupsAttr.Value);
    } catch {
      groupList = [groupsAttr.Value];
    }
  }

  if (!groupList.includes("PaidMember")) {
    return NextResponse.json({ error: "Payment required" }, { status: 403 });
  }

  // 3) Generate a short-lived signed URL from your private bucket
  const command = new GetObjectCommand({
    Bucket: "digimodels-members", // your private bucket
    Key: "someTrainingVideo.mp4",
  });
  try {
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json({ error: "Failed to generate URL" }, { status: 500 });
  }
}
