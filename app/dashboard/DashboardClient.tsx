"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import PayPalButton from "./PayPalButton";

const THEMES = [
  { name: "Pastel Pink", class: "bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100" },
  { name: "Blue Neon", class: "bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100" },
  { name: "Green Light", class: "bg-gradient-to-br from-lime-100 via-green-50 to-teal-100" },
  { name: "Fuchsia Mix", class: "bg-gradient-to-br from-fuchsia-100 via-pink-100 to-rose-100" },
  { name: "Yellow Orange", class: "bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100" },
];

export default function DashboardClient() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const storedThemeIndex = localStorage.getItem("themeIndex");
    if (storedThemeIndex !== null) {
      setThemeIndex(parseInt(storedThemeIndex, 10));
    }
  }, []);

  const handleThemeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = parseInt(e.target.value, 10);
    setThemeIndex(newIndex);
    localStorage.setItem("themeIndex", newIndex.toString());
  };

  // Fetch the private video from your API route
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
      <header className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-gray-700">DigiModels Dashboard</h1>
        <div className="flex items-center gap-4">
          {/* Logout form using POST */}
          <form action="https://digimodels.store/api/auth/logout" method="POST">
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-300 to-fuchsia-400 text-white px-5 py-2 rounded-md shadow-md hover:scale-105 transform transition"
            >
              Log Out
            </button>
          </form>
        </div>
      </header>

      {/* Hero Video Section */}
      <section className="py-4">
        <div className="relative w-full max-w-5xl mx-auto px-4">
          <div className="relative pb-[56.25%] h-0 w-full overflow-hidden rounded-xl shadow-lg border border-purple-200/50">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
              src="https://digimodels.s3.us-west-1.amazonaws.com/AdobeStock_499549744.mp4"
            />
          </div>
        </div>
      </section>

      {/* Purchase Access Section */}
      <section className="py-6">
        <div className="max-w-5xl mx-auto text-center space-y-4 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-purple-700">
            Purchase Access to Exclusive Videos
          </h2>
          <p className="text-gray-700">
            Click below to pay and unlock private AWS S3–hosted video courses.
          </p>
          <PayPalButton />
        </div>
      </section>

      <div className="flex flex-1 overflow-hidden mt-4 px-4">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 p-4 mr-4 rounded-xl shadow-md">
          <nav className="flex flex-col space-y-2">
            <a href="/dashboard/overview" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium">
              Overview
            </a>
            <a href="/dashboard/recent-activity" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium">
              Recent Activity
            </a>
            <a href="/dashboard/courses" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium">
              Courses
            </a>
            <a href="/dashboard/settings" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium">
              Settings
            </a>
            <a href="/dashboard/announcements" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium">
              Announcements
            </a>
          </nav>
        </aside>

        {/* Main Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="p-5 rounded-xl shadow-md backdrop-blur-sm border border-gray-300">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to Your Dashboard
              </h2>
              <p className="text-gray-600">
                This content is protected. Explore your recent activity and exclusive content below.
              </p>
            </div>

            {/* Load Private Video Section */}
            <div className="p-5 rounded-xl shadow-md backdrop-blur-sm border border-gray-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Access Premium Training Video
              </h3>
              <p className="text-gray-600 mb-4">
                Tap the button below to load your exclusive video course.
              </p>
              <button
                onClick={handleLoadVideo}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold px-6 py-3 rounded-full shadow-xl transform hover:scale-105 transition"
              >
                Watch Premium Video
              </button>
              {videoUrl && (
                <div className="mt-4">
                  <video src={videoUrl} controls autoPlay className="w-full rounded-md shadow-md" />
                </div>
              )}
            </div>

            {/* Theme Selection Section */}
            <div className="p-5 rounded-xl shadow-md backdrop-blur-sm border border-gray-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Theme Selection</h3>
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
      </div>
    </motion.div>
  );
}
