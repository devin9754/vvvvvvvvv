"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import PayPalButton from "./PayPalButton";

// Pastel theme definitions:
const THEMES = [
  {
    name: "Pastel Pink",
    class: "bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100",
  },
  {
    name: "Blue Neon",
    class: "bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100",
  },
  {
    name: "Green Light",
    class: "bg-gradient-to-br from-lime-100 via-green-50 to-teal-100",
  },
  {
    name: "Fuchsia Mix",
    class: "bg-gradient-to-br from-fuchsia-100 via-pink-100 to-rose-100",
  },
  {
    name: "Yellow Orange",
    class: "bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100",
  },
];

export default function DashboardClient() {
  // Track which pastel theme is active
  const [themeIndex, setThemeIndex] = useState(0);

  // Our final “premium” video URL once we fetch a presigned link
  const [premiumUrl, setPremiumUrl] = useState<string | null>(null);
  const [showPaidVideo, setShowPaidVideo] = useState(false);

  // For displaying an error if user is unauthorized or token is invalid
  const [errorMsg, setErrorMsg] = useState("");

  // On mount, load theme from localStorage
  useEffect(() => {
    const storedThemeIndex = localStorage.getItem("themeIndex");
    if (storedThemeIndex !== null) {
      setThemeIndex(parseInt(storedThemeIndex, 10));
    }

    // Insert a new history state so that if user hits "Back," we can handle it
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      // Force reload → triggers server check → if no cookie, redirect home
      window.location.reload();
    };
  }, []);

  // Auto-logout after 10 minutes
  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      // Call logout route with POST
      fetch("/api/auth/logout", { method: "POST" })
        .then(() => window.location.reload())
        .catch((err) => console.error("Auto-logout error:", err));
    }, 600_000); // 600,000 ms = 10 minutes

    return () => clearTimeout(logoutTimer);
  }, []);

  // Handle user changing theme
  const handleThemeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = parseInt(e.target.value, 10);
    setThemeIndex(newIndex);
    localStorage.setItem("themeIndex", newIndex.toString());
  };

  // This function calls our secured route to get the presigned URL
  const handleShowPaidVideo = async () => {
    setErrorMsg(""); // Clear previous errors
    try {
      const res = await fetch("/api/videos/training"); // calls app/api/videos/training/route.ts
      if (!res.ok) {
        // e.g. 403, 401, etc.
        const data = await res.json();
        setErrorMsg(data?.error || "Unknown error fetching video.");
        return;
      }
      const data = await res.json();
      setPremiumUrl(data.signedUrl);
      setShowPaidVideo(true);
    } catch (error) {
      console.error("Error fetching premium video link:", error);
      setErrorMsg("Something went wrong fetching the premium video.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`${THEMES[themeIndex].class} min-h-screen w-full flex flex-col transition-colors duration-500`}
    >
      {/* Top Navigation */}
      <header className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-gray-700">
          DigiModels Dashboard (MVP)
        </h1>
        {/* Logout form → POST to clear cookie */}
        <form action="https://digimodels.store/api/auth/logout" method="POST">
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-300 to-fuchsia-400 text-white px-5 py-2 rounded-md shadow-md hover:scale-105 transform transition"
          >
            Log Out
          </button>
        </form>
      </header>

      {/* Example "hero" video (public or placeholder) */}
      <section className="py-4">
        <div className="relative w-full max-w-xl mx-auto px-4">
          <video
            className="w-full rounded-xl shadow-lg border border-purple-200/50 object-contain"
            controls
            autoPlay
            muted
            loop
            playsInline
            src="https://digimodels.s3.us-west-1.amazonaws.com/AdobeStock_499549744.mp4"
          />
        </div>
      </section>

      {/* Purchase Access Section */}
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
      <div className="flex flex-1 overflow-hidden mt-4 px-4">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 p-4 mr-4 rounded-xl shadow-md">
          <nav className="flex flex-col space-y-2 text-gray-700">
            <a
              href="/dashboard/overview"
              className="px-3 py-2 rounded hover:bg-gray-100"
            >
              Overview
            </a>
            <a
              href="/dashboard/recent-activity"
              className="px-3 py-2 rounded hover:bg-gray-100"
            >
              Recent Activity
            </a>
            <a
              href="/dashboard/courses"
              className="px-3 py-2 rounded hover:bg-gray-100"
            >
              Courses
            </a>
            <a
              href="/dashboard/settings"
              className="px-3 py-2 rounded hover:bg-gray-100"
            >
              Settings
            </a>
          </nav>
        </aside>

        {/* Dashboard content */}
        <div className="flex-1 overflow-y-auto max-w-6xl mx-auto space-y-6">
          {/* Intro Card */}
          <div className="p-5 rounded-xl shadow-md backdrop-blur-sm border border-gray-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to Your Dashboard
            </h2>
            <p className="text-gray-600">
              This content is protected. Explore your recent activity and
              exclusive content below.
            </p>
          </div>

          {/* Now a truly secured Premium Video */}
          <div className="p-5 rounded-xl shadow-md backdrop-blur-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Access Premium Training Video
            </h3>
            <p className="text-gray-600 mb-4">
              Click the button to fetch a private presigned URL (if authorized).
            </p>

            {errorMsg && (
              <div className="text-red-600 font-semibold mb-2">{errorMsg}</div>
            )}

            {!showPaidVideo && (
              <button
                onClick={handleShowPaidVideo}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold px-6 py-3 rounded-full shadow-xl transform hover:scale-105 transition"
              >
                Watch Premium Video
              </button>
            )}

            {showPaidVideo && premiumUrl && (
              <div className="mt-4 w-full max-w-md mx-auto">
                <video
                  src={premiumUrl}
                  controls
                  autoPlay
                  className="w-full rounded-md shadow-md object-contain"
                />
              </div>
            )}
          </div>

          {/* Theme Selection */}
          <div className="p-5 rounded-xl shadow-md backdrop-blur-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Theme Selection
            </h3>
            <p className="text-gray-600 mb-2">Pick your favorite pastel style:</p>
            <select
              aria-label="Theme Selection"
              value={themeIndex}
              onChange={handleThemeSelect}
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-800"
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
