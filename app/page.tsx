// File: app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Example theme array
const THEMES = [
  { name: "Pastel Pink", class: "bg-gradient-to-r from-pink-100 via-rose-50 to-purple-100" },
  { name: "Blue Neon", class: "bg-gradient-to-r from-blue-100 via-sky-100 to-cyan-100" },
  { name: "Green Light", class: "bg-gradient-to-r from-lime-100 via-green-50 to-teal-100" },
  { name: "Fuchsia Mix", class: "bg-gradient-to-r from-fuchsia-100 via-pink-100 to-rose-100" },
  { name: "Yellow Orange", class: "bg-gradient-to-r from-yellow-100 via-amber-50 to-orange-100" },
];

export default function Home() {
  const [themeIndex, setThemeIndex] = useState(0);

  // Pick a random theme on mount (optional)
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * THEMES.length);
    setThemeIndex(randomIndex);
  }, []);

  // Force a reload if the page is shown from the bfcache
  useEffect(() => {
    function handlePageShow(e: PageTransitionEvent) {
      if (e.persisted) {
        window.location.reload();
      }
    }
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const handleThemeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeIndex(parseInt(e.target.value, 10));
  };

  // Example sign-in logic
  const handleSignIn = () => {
    window.location.href =
      "https://YOUR_COGNITO_DOMAIN.auth.us-east-1.amazoncognito.com/login"
      + "?client_id=YOUR_CLIENT_ID"
      + "&response_type=code"
      + "&scope=email+openid+phone"
      + "&redirect_uri=https%3A%2F%2FYOUR_DOMAIN%2Fcallback";
  };

  return (
    <main
      className={`${THEMES[themeIndex].class} min-h-screen w-full flex flex-col items-center justify-center p-6 text-center transition-colors duration-500`}
    >
      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        src="https://example.com/your_public_video.mp4"
        className="w-full max-w-4xl rounded-xl shadow-2xl mb-10"
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
        <Card className="bg-white/90 shadow-xl p-8">
          <CardContent className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-extrabold text-purple-800">
              Welcome to DigiModels.Store
            </h1>
            <p className="text-md text-gray-700">Your custom text here...</p>

            {/* Theme selection */}
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

            <Button
              onClick={handleSignIn}
              className="bg-purple-600 text-white px-6 py-2 rounded-md shadow"
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
