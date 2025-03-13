"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

export default function DashboardClient() {
  const router = useRouter();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://digimodels.store/api/auth/logout", { method: "POST" });
      if (!res.ok) {
        console.error("Logout failed:", res.statusText);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex flex-col"
    >
      {/* Top Navigation */}
      <header className="bg-white shadow-md border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-700 tracking-wide">
          DigiModels Dashboard
        </h1>
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white px-5 py-2 rounded-md shadow-md hover:scale-105 transform transition"
          >
            Log Out
          </button>
        </form>
      </header>

      {/* Hero Video Section */}
      <section className="w-full bg-white py-4 shadow-sm">
        <div className="relative w-full max-w-5xl mx-auto px-4">
          <div className="relative pb-[56.25%] h-0 w-full overflow-hidden rounded-lg shadow-lg border border-purple-300/50">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
              src="https://digimodels.s3.us-west-1.amazonaws.com/AdobeStock_260385849.mp4"
            />
          </div>
        </div>
      </section>

      <div className="flex flex-1 overflow-hidden mt-4 px-4">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4 mr-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
            Navigation
          </h2>
          <nav className="flex flex-col space-y-3 text-gray-700">
            <a
              href="/dashboard/overview"
              className="hover:text-indigo-600 hover:font-semibold transition"
            >
              Overview
            </a>
            <a
              href="/dashboard/recent-activity"
              className="hover:text-indigo-600 hover:font-semibold transition"
            >
              Recent Activity
            </a>
            <a
              href="/dashboard/courses"
              className="hover:text-indigo-600 hover:font-semibold transition"
            >
              Courses
            </a>
            <a
              href="/dashboard/settings"
              className="hover:text-indigo-600 hover:font-semibold transition"
            >
              Settings
            </a>
            <a
              href="/dashboard/announcements"
              className="hover:text-indigo-600 hover:font-semibold transition"
            >
              Announcements
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
              <h2 className="text-3xl font-extrabold text-indigo-700 mb-2">
                Welcome to Your Dashboard
              </h2>
              <p className="text-gray-700">
                This content is protected. Explore your recent activity and exclusive content below.
              </p>
            </div>

            {/* Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                  Recent Activity
                </h3>
                <p className="text-gray-600">
                  Keep track of your latest actions and progress here.
                </p>
                <a
                  href="/dashboard/recent-activity"
                  className="mt-2 inline-block text-indigo-600 hover:underline"
                >
                  View Details
                </a>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                  Quick Links
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
                  <li>
                    <a
                      href="/profile"
                      className="text-blue-600 hover:underline"
                    >
                      Manage Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="/reports"
                      className="text-blue-600 hover:underline"
                    >
                      View Reports
                    </a>
                  </li>
                  <li>
                    <form
                      action="https://digimodels.store/api/auth/logout"
                      method="POST"
                    >
                      <button
                        type="submit"
                        className="text-blue-600 hover:underline"
                      >
                        Log Out
                      </button>
                    </form>
                  </li>
                </ul>
              </div>
            </div>

            {/* Additional Content Section */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                Additional Content
              </h3>
              <p className="text-gray-600">
                Add more widgets or course content here as you expand the app.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
