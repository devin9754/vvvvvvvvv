"use client";

// If you want a fade-in animation, install framer-motion:
// npm install framer-motion
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to your dashboard. This content is protected.
        </p>

        <div className="flex flex-col space-y-4 items-center">
          {/* Example section */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 w-full text-left">
            <h2 className="text-xl font-semibold text-blue-800 mb-1">
              Your Recent Activity
            </h2>
            <p className="text-gray-600">
              Keep track of your latest actions and progress here.
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 w-full text-left">
            <h2 className="text-xl font-semibold text-blue-800 mb-1">
              Quick Links
            </h2>
            <ul className="list-disc list-inside text-gray-600 mt-2">
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

          {/* Embedded Video from S3 */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 w-full text-left">
            <h2 className="text-xl font-semibold text-blue-800 mb-1">
              Exclusive Video
            </h2>
            <p className="text-gray-600">Watch our new AWS S3 hosted video:</p>
            <video
              className="w-full rounded-lg shadow-lg mt-3"
              controls
              src="https://digimodels.s3.us-west-1.amazonaws.com/AdobeStock_260385849.mp4"
            />
          </div>
        </div>
      </div>
    </motion.main>
  );
}
