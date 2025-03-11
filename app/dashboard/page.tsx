"use client";

import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <motion.main
      // Fade/slide in the entire dashboard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-blue-50 to-blue-100 flex flex-col items-center justify-start p-6 text-center"
    >
      {/* Outer container for the dashboard content */}
      <motion.div
        // Animate the card container
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-4xl w-full"
      >
        {/* Gradient text heading */}
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 drop-shadow-sm">
          Dashboard
        </h1>

        <p className="text-xl text-gray-700 mb-10">
          Welcome to your dashboard. This content is protected.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Recent Activity Card */}
          <motion.div
            // Animate each card in slightly after the container
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
              Recent Activity
            </h2>
            <p className="text-gray-600">
              View your latest updates and progress here.
            </p>
          </motion.div>

          {/* Quick Links Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
              Quick Links
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
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
                <a href="/logout" className="text-blue-600 hover:underline">
                  Log Out
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Exclusive Video
          </h2>
          <p className="text-gray-600 mb-4">
            Watch our new AWS S3 hosted video:
          </p>

          {/* 16:9 container for a responsive video */}
          <div className="relative pb-[56.25%] h-0 w-full rounded-xl overflow-hidden shadow-xl">
            <video
              // Autoplay, muted, loop, playsInline
              autoPlay
              muted
              loop
              playsInline
              controls
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="https://digimodels.s3.us-west-1.amazonaws.com/AdobeStock_260385849.mp4"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
