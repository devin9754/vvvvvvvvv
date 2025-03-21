"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import "./globals.css";

// -- 1) Full-screen overlay for initial cookie consent --
function BlockingCookieOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const userChoice = localStorage.getItem("userCookieConsent");
    if (!userChoice) {
      setShowOverlay(true);
      document.body.style.overflow = "hidden"; // disable scrolling behind overlay
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("userCookieConsent", "accepted");
    setShowOverlay(false);
    document.body.style.overflow = "auto";
  };

  const handleDeny = () => {
    localStorage.setItem("userCookieConsent", "denied");
    setShowOverlay(false);
    document.body.style.overflow = "auto";
  };

  if (!showOverlay) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          We Value Your Privacy
        </h2>
        <p className="text-gray-600">
          We use cookies for authentication and other essential features.
          Please accept or deny before proceeding.
        </p>
        <div className="flex justify-center space-x-4 pt-4">
          <button
            onClick={handleAccept}
            className="bg-lime-300 hover:bg-lime-400 text-lime-900 font-medium px-4 py-2 rounded"
          >
            Accept
          </button>
          <button
            onClick={handleDeny}
            className="bg-rose-300 hover:bg-rose-400 text-rose-900 font-medium px-4 py-2 rounded"
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
}

// -- 2) A smaller overlay if user tries to sign in after denying --
function ReAcceptOverlay({
  onAccept,
  onClose,
}: {
  onAccept: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Cookies Are Required to Sign In
        </h2>
        <p className="text-gray-600">
          You previously denied cookies. To sign in, you must accept them. Would
          you like to accept cookies now?
        </p>
        <div className="flex justify-center space-x-4 pt-4">
          <button
            onClick={onAccept}
            className="bg-lime-300 hover:bg-lime-400 text-lime-900 font-medium px-4 py-2 rounded"
          >
            Accept
          </button>
          <button
            onClick={onClose}
            className="bg-rose-300 hover:bg-rose-400 text-rose-900 font-medium px-4 py-2 rounded"
          >
            Remain Denied
          </button>
        </div>
      </div>
    </div>
  );
}

// -- Pastel theme definitions --
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

// -- MAIN PAGE COMPONENT --
export default function HomePage() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [showReAccept, setShowReAccept] = useState(false);

  // Default to "Pastel Pink" theme
  useEffect(() => {
    setThemeIndex(0);
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

  // Called when user clicks "Sign In"
  const handleSignIn = () => {
    const userChoice = localStorage.getItem("userCookieConsent");
    if (userChoice === "denied") {
      setShowReAccept(true);
      return;
    }

    // Make sure this domain & client ID match your new user pool in N. California (us-west-1).
    // Also ensure you have added https://digimodels.store/callback
    // in the "Allowed callback URLs" for the new app client.
    window.location.href =
      "https://us-west-1owjen8id2.auth.us-west-1.amazoncognito.com/login" +
      "?client_id=nv14cnivba0jp52p93krnisat" +
      "&response_type=code" +
      "&scope=email+openid+phone" +
      "&redirect_uri=https%3A%2F%2Fdigimodels.store%2Fcallback";
  };

  // After user re-accepts from the second prompt
  const handleReAcceptCookies = () => {
    localStorage.setItem("userCookieConsent", "accepted");
    setShowReAccept(false);
    // Optionally call handleSignIn() again if you want an immediate redirect
  };

  // If user remains denied after second prompt
  const handleRemainDenied = () => {
    setShowReAccept(false);
  };

  return (
    <main
      className={`${THEMES[themeIndex].class} min-h-screen w-full flex flex-col items-center justify-center p-6 text-center transition-colors duration-500`}
    >
      {/* The blocking overlay if user never made a choice */}
      <BlockingCookieOverlay />

      {/* The second overlay if user tries to sign in but had denied */}
      {showReAccept && (
        <ReAcceptOverlay
          onAccept={handleReAcceptCookies}
          onClose={handleRemainDenied}
        />
      )}

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
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
