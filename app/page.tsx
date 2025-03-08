"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-sky-100 to-blue-200">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl bg-white bg-opacity-90 p-8 rounded-xl shadow-xl"
      >
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          Welcome to DigiModels.Store
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          We specialize in delivering comprehensive digital solutions including SaaS, professional website design, hosting, development, refreshes, and SEO/Marketing & Sales tailored specifically for businesses in Chula Vista and across San Diego County.
        </p>
        <p className="text-md text-gray-600 mb-6">
          Whether you're starting fresh, need a professional online presence, or looking to enhance your existing digital strategy, DigiModels.Store and DigiModels.us have the expertise to elevate your business.
        </p>
        <ul className="text-left text-gray-700 mb-6 list-disc list-inside">
          <li><strong>SaaS Solutions:</strong> Custom software tailored to your unique business needs.</li>
          <li><strong>Website Design & Development:</strong> Beautiful, responsive, and user-friendly designs.</li>
          <li><strong>Website Hosting & Refreshes:</strong> Fast, secure hosting and seamless updates to keep your website modern.</li>
          <li><strong>SEO & Marketing:</strong> Optimized strategies to boost visibility, attract customers, and grow sales.</li>
        </ul>
        <p className="text-gray-700 mb-6">
          Contact us today at <a href="mailto:devin@digimodels.us" className="underline text-blue-600">devin@digimodels.us</a> or call us at <a href="tel:+16197918817" className="underline text-blue-600">(619) 791-8817</a>
        </p>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-200">
          Explore Our Services
        </button>
      </motion.div>

      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        src="https://digimodels.s3.us-west-1.amazonaws.com/AdobeStock_499549744.mp4"
        className="mt-12 w-full max-w-4xl rounded-xl shadow-xl"
        autoPlay
        loop
        muted
        playsInline
      />
    </main>
  );
}