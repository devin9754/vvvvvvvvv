"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import PayPalButton from "./PayPalButton";

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
  const [themeIndex, setThemeIndex] = useState(0);

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const storedThemeIndex = localStorage.getItem("themeIndex");
    if (storedThemeIndex !== null) {
      setThemeIndex(parseInt(storedThemeIndex, 10));
    }

    // Push a history state so that if user clicks "Back," we force a reload
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => window.location.reload();
  }, []);

  // Auto-logout after 10 minutes
  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      fetch("/api/auth/logout", { method: "POST" })
        .then(() => window.location.reload())
        .catch((err) => console.error("Auto-logout error:", err));
    }, 600000); // 10 minutes

    return () => clearTimeout(logoutTimer);
  }, []);

  // Update theme on selection
  const handleThemeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = parseInt(e.target.value, 10);
    setThemeIndex(newIndex);
    localStorage.setItem("themeIndex", newIndex.toString());
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

      {/* Main Content Area */}
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
            <a
              href="/dashboard/announcements"
              className="px-3 py-2 rounded hover:bg-gray-100"
            >
              Announcements
            </a>
          </nav>
        </aside>

        {/* Dashboard Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
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

            {/* Training Video (always visible) */}
            <div className="p-5 rounded-xl shadow-md backdrop-blur-sm border border-gray-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Access Training Video
              </h3>
              <p className="text-gray-600 mb-4">
                Watch the non-anesthetic pet dental training video below.
              </p>
              <div className="mt-2 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                <video
                  src="https://digimodels-members.s3.us-west-1.amazonaws.com/EPD_Short_Reels_03.mp4"
                  controls
                  className="w-full rounded-md shadow-md object-contain"
                  preload="metadata"
                />
              </div>
            </div>

            {/* Quiz Section */}
            <div className="p-5 rounded-xl shadow-md backdrop-blur-sm border border-gray-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Non-Anesthetic Pet Dental Quiz
              </h3>
              <p className="text-gray-600 mb-4">
                Test your knowledge by taking the quiz below!
              </p>
              <div className="overflow-auto">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSeIS5flhXysGV_D9tRk2zCRZQjrVl96qEgE9jOyPywyXHmTrg/viewform?embedded=true"
                  width="100%"
                  height="1200"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  title="Non-Anesthetic Dental Quiz"
                  loading="lazy"
                >
                  Loading...
                </iframe>
              </div>
            </div>

            {/* Theme Selection */}
            <div className="p-5 rounded-xl shadow-md backdrop-blur-sm border border-gray-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Theme Selection
              </h3>
              <p className="text-gray-600 mb-2">
                Pick your favorite pastel style:
              </p>
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
