"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    // Fetch the pre-signed URL for your video.
    // In this example, the video key is "AdobeStock_260385849.mp4".
    fetch("/api/videos/AdobeStock_260385849.mp4")
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          setVideoUrl(data.url);
        }
      })
      .catch((err) => {
        console.error("Error fetching video URL:", err);
      });
  }, []);

  return (
    <main className="min-h-screen w-full bg-gray-50 p-6 text-center">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Dashboard</h1>
        <p className="text-gray-700 mb-6">Private video for members only</p>

        {videoUrl ? (
          <video className="w-full rounded-lg shadow-lg" controls src={videoUrl} />
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    </main>
  );
}
