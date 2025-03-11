import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Create an S3 client – adjust the region if needed.
const s3 = new S3Client({ region: "us-west-1" });

// Replace with your S3 bucket name.
const BUCKET_NAME = "digimodels"; 

export async function GET(request: Request, { params }: { params: { key: string } }) {
  const { key } = params; // the filename from the URL, e.g. "AdobeStock_260385849.mp4"
  
  // Optionally: Check user authentication here, e.g., reading cookies.
  // For example:
  // const token = request.cookies.get("access_token");
  // if (!token) return NextResponse.redirect(new URL("/", request.url));

  // Create a command to get the object.
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  
  try {
    // Generate a pre-signed URL valid for 1 hour (3600 seconds)
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json({ error: "Failed to generate pre-signed URL" }, { status: 500 });
  }
}
