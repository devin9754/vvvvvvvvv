"use client";

// If you want animations, uncomment the next line and run `npm install framer-motion`
// import { motion } from "framer-motion";

export default function Dashboard() {
  // Optional: if using framer-motion, wrap your main container with <motion.main> instead of <main>
  // and apply some simple fade/slide in animation
  // const MotionMain = motion.main;

  return (
    // If not using framer-motion, just use <main> with the same Tailwind classes
    // <MotionMain
    //   initial={{ opacity: 0, y: 10 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.8 }}
    //   className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6 text-center"
    // >
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to your dashboard. This content is protected.
        </p>

        <div className="flex flex-col space-y-4 items-center">
          {/* Example stats or links */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 w-full text-left">
            <h2 className="text-xl font-semibold text-blue-800 mb-1">
              Your Recent Activity
            </h2>
            <p className="text-gray-600">
              Keep track of your latest actions and progress here.
            </p>
          </div>

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
        </div>
      </div>
    </main>
    // </MotionMain>
  );
}
