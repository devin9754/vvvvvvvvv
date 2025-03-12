// app/dashboard/DashboardClient.tsx
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DashboardClient() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      console.log("Attempting to log out...");
      // Call the logout route with POST
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) {
        console.error("Logout failed:", res.statusText);
      } else {
        console.log("Logout successful, redirecting to home.");
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
      className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-blue-50 to-blue-100 flex flex-col"
    >
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-bold text-gray-700">DigiModels Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Log Out
        </button>
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
            <a href="#" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium">
              Overview
            </a>
            <a href="#" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium">
              Recent Activity
            </a>
            <a href="#" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium">
              Quick Links
            </a>
            <a href="#" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium">
              Settings
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
                This content is protected. Explore your recent activity and exclusive content below.
              </p>
            </div>

            {/* Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Recent Activity</h3>
                <p className="text-gray-600">
                  Keep track of your latest actions and progress here.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Links</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
                  <li>
                    <a href="/profile" className="text-blue-600 hover:underline">
                      Manage Profile
                    </a>
                  </li>
                  <li>
                    <a href="/reports" className="text-blue-600 hover:underline">
                      View Reports
                    </a>
                  </li>
                  <li>
                    {/* This link triggers a GET to logout (if you want GET) */}
                    <a href="/api/auth/logout" className="text-blue-600 hover:underline">
                      Log Out
                    </a>
                    {/* If you prefer POST only, use a form or remove this link */}
                  </li>
                </ul>
              </div>
            </div>

            {/* Additional Content */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Additional Content</h3>
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
