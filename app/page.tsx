"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-blue-200">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl bg-white/90 p-10 rounded-2xl shadow-xl text-center"
      >
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          Welcome to DigiModels.Store
        </h1>
        <p className="text-lg text-blue-600 mb-6">
          We provide SaaS solutions, Website Development, Hosting, Refreshes, and SEO/Marketing & Sales services in Chula Vista and San Diego County.
        </p>
        <p className="text-md text-gray-600 mb-6">
          Ready to elevate your online presence? Contact us today!
        </p>
        <a
          href="mailto:devin@digimodels.us"
          className="inline-block bg-blue-500 text-white rounded-lg px-6 py-3 shadow-md hover:bg-blue-700 transition"
        >
          Get in Touch
        </a>
      </motion.div>

      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        src="https://digimodels.s3.us-west-1.amazonaws.com/AdobeStock_499549744.mp4"
        className="mt-10 rounded-xl shadow-xl w-full max-w-4xl"
        autoPlay
        loop
        muted
        playsInline
      />
    </main>
  );
}
