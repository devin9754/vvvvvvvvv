// app/dashboard/DashboardClient.tsx
"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import PayPalButton from "./PayPalButton";

// Define an array of theme objects
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

  // Pick a random theme on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * THEMES.length);
    setThemeIndex(randomIndex);
  }, []);

  // Cycle to the next theme
  const handleSwitchTheme = () => {
    setThemeIndex((prev) => (prev + 1) % THEMES.length);
  };

  // If user selects from the dropdown
  const handleThemeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeIndex(parseInt(e.target.value, 10));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`${THEMES[themeIndex].class} min-h-screen w-full flex flex-col transition-colors duration-500`}
    >
      {/* Top Navigation (no dropdown here) */}
      <header className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-purple-700 tracking-wide">
          DigiModels Dashboard
        </h1>
        <div className="flex items-center gap-4">
          {/* Optional button to cycle theme */}
          <button
            onClick={handleSwitchTheme}
            className="bg-purple-100 text-purple-700 px-4 py-2 rounded-md border border-purple-300 hover:bg-purple-50 transition"
          >
            Switch Theme
          </button>
          {/* Form-based logout => POST */}
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
        <aside className="hidden md:flex flex-col w-64 border-r border-purple-300 p-4 mr-4 rounded-xl shadow-md backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
            Navigation
          </h2>
          <nav className="flex flex-col space-y-3 text-gray-700">
            <a
              href="/dashboard/overview"
              className="hover:text-purple-700 hover:font-semibold transition"
            >
              Overview
            </a>
            <a
              href="/dashboard/recent-activity"
              className="hover:text-purple-700 hover:font-semibold transition"
            >
              Recent Activity
            </a>
            <a
              href="/dashboard/courses"
              className="hover:text-purple-700 hover:font-semibold transition"
            >
              Courses
            </a>
            <a
              href="/dashboard/settings"
              className="hover:text-purple-700 hover:font-semibold transition"
            >
              Settings
            </a>
            <a
              href="/dashboard/announcements"
              className="hover:text-purple-700 hover:font-semibold transition"
            >
              Announcements
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="p-5 rounded-xl shadow-md backdrop-blur-sm border border-purple-300">
              <h2 className="text-3xl font-extrabold text-purple-700 mb-2">
                Welcome to Your Dashboard
              </h2>
              <p className="text-gray-700">
                This content is protected. Explore your recent activity and exclusive content below.
              </p>
            </div>

            {/* Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl shadow-md backdrop-blur-sm border border-purple-300 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-purple-800 mb-2">
                  Recent Activity
                </h3>
                <p className="text-gray-600">
                  Keep track of your latest actions and progress here.
                </p>
                <a
                  href="/dashboard/recent-activity"
                  className="mt-2 inline-block text-purple-600 hover:underline"
                >
                  View Details
                </a>
              </div>
              <div className="p-5 rounded-xl shadow-md backdrop-blur-sm border border-purple-300 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-purple-800 mb-2">
                  Quick Links
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
                  <li>
                    <a href="/profile" className="text-pink-600 hover:underline">
                      Manage Profile
                    </a>
                  </li>
                  <li>
                    <a href="/reports" className="text-pink-600 hover:underline">
                      View Reports
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Additional Content Section */}
            <div className="p-5 rounded-xl shadow-md backdrop-blur-sm border border-purple-300 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-purple-800 mb-2">
                Additional Content
              </h3>
              <p className="text-gray-600">
                Add more widgets or course content here as you expand the app.
              </p>
            </div>

            {/* Theme Selection at the Bottom */}
            <div className="p-5 rounded-xl shadow-md backdrop-blur-sm border border-purple-300 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-purple-800 mb-2">
                Theme Selection
              </h3>
              <p className="text-gray-600 mb-2">
                Pick your favorite pastel style:
              </p>
              <select
                aria-label="Theme Selection"
                value={themeIndex}
                onChange={handleThemeSelect}
                className="border border-purple-300 rounded-md px-3 py-2 text-purple-700"
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
