// app/dashboard/DashboardClient.tsx
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DashboardClient() {
  const router = useRouter();

  // Handle logout via a form submission
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
      className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col"
    >
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">DigiModels Dashboard</h1>
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Log Out
          </button>
        </form>
      </header>

      {/* Hero Video Section */}
      <section className="w-full bg-white py-4 shadow-sm">
        <div className="relative w-full max-w-5xl mx-auto px-4">
          <div className="relative pb-[56.25%] h-0 w-full overflow-hidden rounded-lg shadow-lg">
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
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4 mr-4 rounded-lg shadow-sm">
          <nav className="flex flex-col space-y-2">
            <a href="/dashboard/overview" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-800 font-medium">
              Overview
            </a>
            <a href="/dashboard/recent-activity" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-800 font-medium">
              Recent Activity
            </a>
            <a href="/dashboard/courses" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-800 font-medium">
              Courses
            </a>
            <a href="/dashboard/settings" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-800 font-medium">
              Settings
            </a>
            <a href="/dashboard/announcements" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-800 font-medium">
              Announcements
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to Your Dashboard
              </h2>
              <p className="text-gray-600 mt-1">
                Explore your recent activity, enroll in courses, and manage your account.
              </p>
            </div>

            {/* Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Recent Activity</h3>
                <p className="text-gray-600">
                  Check out your latest progress and actions.
                </p>
                <a href="/dashboard/recent-activity" className="text-blue-600 hover:underline mt-2 inline-block">
                  View Details
                </a>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Available Courses</h3>
                <p className="text-gray-600">
                  Browse and enroll in courses to boost your skills.
                </p>
                <a href="/dashboard/courses" className="text-blue-600 hover:underline mt-2 inline-block">
                  Explore Courses
                </a>
              </div>
            </div>

            {/* Additional Section */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Member Announcements</h3>
              <p className="text-gray-600">
                Stay informed with the latest updates and training sessions.
              </p>
              <a href="/dashboard/announcements" className="text-blue-600 hover:underline mt-2 inline-block">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
