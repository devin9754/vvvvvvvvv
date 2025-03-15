// File: app/dashboard/DashboardClient.tsx
"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PayPalButton from "./PayPalButton";

const THEMES = [
  { name: "Pastel Pink", class: "bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100" },
  { name: "Blue Neon", class: "bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100" },
  { name: "Green Light", class: "bg-gradient-to-br from-lime-100 via-green-50 to-teal-100" },
  { name: "Fuchsia Mix", class: "bg-gradient-to-br from-fuchsia-100 via-pink-100 to-rose-100" },
  { name: "Yellow Orange", class: "bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100" },
];

export default function DashboardClient() {
  const router = useRouter();

  const [themeIndex, setThemeIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  // On mount, final check if we have the token
  useEffect(() => {
    const hasToken = document.cookie
      .split("; ")
      .some((row) => row.startsWith("access_token="));
    if (!hasToken) {
      // If no token, forcibly navigate to home
      router.replace("/");
    }
  }, [router]);

  // Load user’s theme preference from localStorage
  useEffect(() => {
    const storedThemeIndex = localStorage.getItem("themeIndex");
    if (storedThemeIndex !== null) {
      setThemeIndex(parseInt(storedThemeIndex, 10));
    }
  }, []);

  // Save the user’s theme preference
  const handleThemeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = parseInt(e.target.value, 10);
    setThemeIndex(newIndex);
    localStorage.setItem("themeIndex", newIndex.toString());
  };

  // Call your /api/videos/training route
  const handleLoadVideo = () => {
    fetch("/api/videos/training")
      .then((res) => res.json())
      .then((data) => {
        if (data.signedUrl) {
          setVideoUrl(data.signedUrl);
        } else {
          alert("Unable to load video. " + (data.error || "Payment required."));
        }
      })
      .catch((err) => {
        console.error("Error fetching private video:", err);
        alert("Error fetching video. Check console for details.");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`${THEMES[themeIndex].class} min-h-screen w-full flex flex-col transition-colors duration-500`}
    >
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-700">DigiModels Dashboard</h1>
        <form action="https://digimodels.store/api/auth/logout" method="POST">
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-300 to-fuchsia-400 text-white px-5 py-2 rounded-md shadow-md hover:scale-105 transform transition"
          >
            Log Out
          </button>
        </form>
      </header>

      {/* Example “hero” or “header” */}
      <section className="p-6">
        <p className="text-center text-xl">Welcome, you’re logged in!</p>
      </section>

      {/* Example: Purchase Access */}
      <section className="py-6">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold text-purple-700">
            Purchase Access to Exclusive Videos
          </h2>
          <p className="text-gray-700">
            Click below to pay and unlock private AWS S3–hosted video courses.
          </p>
          <PayPalButton />
        </div>
      </section>

      {/* Main content area */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Load Private Video</h3>
            <button
              onClick={handleLoadVideo}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold px-6 py-3 rounded-full shadow-xl hover:scale-105 transition"
            >
              Watch Premium Video
            </button>
            {videoUrl && (
              <div className="mt-4">
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full rounded-md shadow-md"
                />
              </div>
            )}
          </div>

          {/* Theme selection */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Theme Selection</h3>
            <select
              aria-label="Theme Selection"
              value={themeIndex}
              onChange={handleThemeSelect}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              {THEMES.map((theme, idx) => (
                <option key={idx} value={idx}>
                  {theme.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
