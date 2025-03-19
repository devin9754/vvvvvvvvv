"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Inline CookieBanner component (you can also move this to its own file)
function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const userChoice = localStorage.getItem("userCookieConsent");
    if (!userChoice) {
      // No choice yet → show banner
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("userCookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleDeny = () => {
    localStorage.setItem("userCookieConsent", "denied");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
      <p className="text-sm">
        We use cookies for authentication and other essential features. Please accept to continue.
      </p>
      <div className="flex space-x-2">
        <button
          onClick={handleAccept}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          Accept All
        </button>
        <button
          onClick={handleDeny}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Deny
        </button>
      </div>
    </div>
  );
}

// Pastel theme definitions
const THEMES = [
  {
    name: "Pastel Pink",
    class: "bg-gradient-to-r from-pink-100 via-rose-50 to-purple-100",
  },
  {
    name: "Blue Neon",
    class: "bg-gradient-to-r from-blue-100 via-sky-100 to-cyan-100",
  },
  {
    name: "Green Light",
    class: "bg-gradient-to-r from-lime-100 via-green-50 to-teal-100",
  },
  {
    name: "Fuchsia Mix",
    class: "bg-gradient-to-r from-fuchsia-100 via-pink-100 to-rose-100",
  },
  {
    name: "Yellow Orange",
    class: "bg-gradient-to-r from-yellow-100 via-amber-50 to-orange-100",
  },
];

export default function Home() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [canSignIn, setCanSignIn] = useState(true);

  // Pick a random theme on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * THEMES.length);
    setThemeIndex(randomIndex);
  }, []);

  // If user tries to go "back" after logout, force reload
  useEffect(() => {
    function handlePageShow(e: PageTransitionEvent) {
      if (e.persisted) {
        window.location.reload();
      }
    }
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  // Check if user has denied cookies
  useEffect(() => {
    const userChoice = localStorage.getItem("userCookieConsent");
    if (userChoice === "denied") {
      setCanSignIn(false);
    }
  }, []);

  const handleThemeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeIndex(parseInt(e.target.value, 10));
  };

  const handleSignIn = () => {
    // Block sign-in if cookies are denied
    if (!canSignIn) {
      alert("You must accept cookies to sign in.");
      return;
    }

    // Replace with your Cognito domain, client_id, callback, etc.
    window.location.href =
      "https://us-east-1le1onanpp.auth.us-east-1.amazoncognito.com/login" +
      "?client_id=4a8r52l7d5267hle2liar1nr6p" +
      "&response_type=code" +
      "&scope=email+openid+phone" +
      "&redirect_uri=https%3A%2F%2Fdigimodels.store%2Fcallback";
  };

  return (
    <main
      className={`${THEMES[themeIndex].class} min-h-screen w-full flex flex-col items-center justify-center p-6 text-center transition-colors duration-500`}
    >
      {/* Cookie banner */}
      <CookieBanner />

      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        src="https://digimodels.s3.us-west-1.amazonaws.com/AdobeStock_499549744.mp4"
        className="w-full max-w-4xl rounded-xl shadow-2xl mb-10 border-4 border-purple-300/50"
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
        <Card className="bg-white/90 shadow-xl p-8 border border-purple-200/40 rounded-xl backdrop-blur-sm">
          <CardContent className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-extrabold text-purple-800 drop-shadow-sm">
              Honor, Integrity, Trust
            </h1>
            <p className="text-lg text-purple-700 font-semibold">
              Welcome to DigiModels.Store
            </p>
            <p className="text-md text-gray-700">
              Digital solutions that embody our core values.
            </p>
            <p className="text-sm text-gray-600">
              Learn more at{" "}
              <a
                href="https://digimodels.us"
                className="underline decoration-purple-400 hover:decoration-purple-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                DigiModels.us
              </a>
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Button
                onClick={handleSignIn}
                className="bg-gradient-to-r from-fuchsia-600 to-pink-500 hover:from-pink-500 hover:to-fuchsia-600 text-white font-semibold rounded-md shadow-lg px-6 py-2 transition-transform transform hover:scale-105"
              >
                Get Started
              </Button>
              <select
                aria-label="Theme Selection"
                value={themeIndex}
                onChange={handleThemeSelect}
                className="border border-purple-300 rounded-md px-3 py-2 text-purple-700"
              >
                {THEMES.map((theme, idx) => (
                  <option key={idx} value={idx}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
