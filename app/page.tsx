"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-blue-50">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center max-w-xl"
      >
        <h1 className="text-4xl font-bold text-blue-800 mb-4 drop-shadow-md">
          Welcome to DigiModels.Store
        </h1>
        <p className="text-lg text-blue-700 mb-8">
          SaaS • Website Development • SEO & Marketing in Chula Vista and San Diego County
        </p>
        <button className="btn bg-blue-600 hover:bg-blue-700 text-white border-none shadow-md">
          Explore Our Services
        </button>
      </motion.div>

      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        src="https://digimodels.s3.us-west-1.amazonaws.com/AdobeStock_499549744.mp4"
        className="max-w-full sm:max-w-3xl mt-10 rounded-lg shadow-2xl"
        autoPlay
        loop
        muted
        playsInline
      />
    </main>
  );
}