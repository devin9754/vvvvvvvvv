"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  const router = useRouter();

  // Optional: a logout function. If the cookie is HttpOnly, you might need an API route to clear it properly.
  const handleLogout = () => {
    // Expire the cookie client-side (if not truly HttpOnly) or call an API route to do so.
    document.cookie = "access_token=; path=/; max-age=0;";
    router.push("/");
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-blue-50 to-blue-100 flex flex-col"
    >
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-700">DigiModels Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Log Out
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
          <nav className="flex flex-col space-y-2">
            {/* Sidebar links */}
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

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome to Your Dashboard
              </h2>
              <p className="text-gray-600 mt-1">
                This content is protected. Explore your recent activity and exclusive content below.
              </p>
            </div>

            {/* Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Recent Activity
                </h3>
                <p className="text-gray-600">
                  Keep track of your latest actions and progress here.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Quick Links
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Manage Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      View Reports
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Exclusive Video Section */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Exclusive Video
              </h3>
              <p className="text-gray-600 mb-4">
                Watch our new AWS S3 hosted video:
              </p>
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
          </div>
        </div>
      </div>
    </motion.main>
  );
}
