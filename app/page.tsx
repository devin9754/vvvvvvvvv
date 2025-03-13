"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// A set of pastel neon gradient classes
const PASTEL_GRADIENTS = [
  "bg-gradient-to-r from-pink-100 via-rose-50 to-purple-100",
  "bg-gradient-to-r from-blue-100 via-sky-100 to-cyan-100",
  "bg-gradient-to-r from-lime-100 via-green-50 to-teal-100",
  "bg-gradient-to-r from-fuchsia-100 via-pink-100 to-rose-100",
  "bg-gradient-to-r from-yellow-100 via-amber-50 to-orange-100",
];

export default function Home() {
  const [gradientIndex, setGradientIndex] = useState(0);

  // Randomly pick one of the pastel gradients on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * PASTEL_GRADIENTS.length);
    setGradientIndex(randomIndex);
  }, []);

  // Cycle to the next gradient in the array
  const handleSwitchGradient = () => {
    setGradientIndex((prev) => (prev + 1) % PASTEL_GRADIENTS.length);
  };

  const handleSignIn = () => {
    window.location.href =
      "https://us-east-1nvdll7sku.auth.us-east-1.amazoncognito.com/login" +
      "?client_id=46a9rm6mfce87enhsjk507mn9r" +
      "&response_type=code" +
      "&scope=email+openid+phone" +
      "&redirect_uri=https%3A%2F%2Fdigimodels.store%2Fapi%2Fauth%2Fcallback";
  };

  return (
    <main
      className={`${PASTEL_GRADIENTS[gradientIndex]} min-h-screen w-full flex flex-col items-center justify-center p-6 text-center transition-colors duration-500`}
    >
      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        src="https://digimodels.s3.us-west-1.amazonaws.com/AdobeStock_499549744.mp4"
        className="w-full max-w-4xl rounded-xl shadow-2xl mb-10 border-4 border-purple-200/50"
        autoPlay
        loop
        muted
        playsInline
      />

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full"
      >
        <Card className="bg-white/80 shadow-xl p-8 border border-purple-200/40 rounded-xl backdrop-blur-sm">
          <CardContent className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-extrabold text-purple-700 drop-shadow-sm">
              Welcome to <span className="text-pink-600">DigiModels.Store</span>
            </h1>
            <p className="text-lg text-purple-600 font-medium">
              We specialize in comprehensive digital solutions including SaaS,
              website design, hosting, development, refreshes, and SEO/Marketing &amp; Sales,
              specifically serving businesses in Chula Vista and San Diego County.
            </p>
            <p className="text-md text-gray-700">
              From startups needing a strong digital footprint to established
              businesses enhancing their existing online strategies,
              DigiModels.Store and DigiModels.us deliver tailored solutions to
              elevate your digital presence.
            </p>

            <ul className="list-disc list-inside text-purple-700 text-left md:text-center mx-auto space-y-2">
              <li><strong>SaaS Solutions:</strong> Customized software for unique business requirements.</li>
              <li><strong>Website Design &amp; Development:</strong> Modern, responsive, user-centric websites.</li>
              <li><strong>Website Hosting &amp; Refreshes:</strong> Reliable hosting &amp; updates to stay cutting-edge.</li>
              <li><strong>SEO &amp; Marketing:</strong> Targeted strategies for increased visibility &amp; growth.</li>
            </ul>

            <p className="text-purple-700">
              Contact us at{" "}
              <a
                href="mailto:devin@digimodels.us"
                className="underline decoration-purple-300 hover:decoration-purple-500"
              >
                devin@digimodels.us
              </a>{" "}
              or call{" "}
              <a
                href="tel:+16197918817"
                className="underline decoration-purple-300 hover:decoration-purple-500"
              >
                (619) 791-8817
              </a>
            </p>

            {/* Buttons row */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Button
                onClick={handleSignIn}
                className="bg-gradient-to-r from-pink-300 to-fuchsia-400 hover:from-fuchsia-400 hover:to-pink-300 text-white font-semibold rounded-md shadow-lg px-6 py-2 transition-transform transform hover:scale-105"
              >
                Get Started
              </Button>
              <Button
                onClick={handleSwitchGradient}
                variant="outline"
                className="border-2 border-pink-300 text-pink-700 hover:bg-pink-50 px-6 py-2 transition-transform transform hover:scale-105"
              >
                Switch Theme
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
