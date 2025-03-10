"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [isMember, setIsMember] = useState<boolean | null>(null);

  useEffect(() => {
    // Replace this with a secure check: e.g. an API call or reading a secure cookie
    // For testing, we simulate by reading localStorage (NOT secure in production)
    const membership = localStorage.getItem("membershipStatus");
    if (membership === "active") {
      setIsMember(true);
    } else {
      setIsMember(false);
    }
  }, []);

  if (isMember === null) {
    return (
      <main className="flex items-center justify-center min-h-screen p-6 text-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {isMember ? (
        <p>Welcome, premium member! Enjoy your exclusive content.</p>
      ) : (
        <>
          <p className="mb-4">
            You are not subscribed yet. Subscribe now to unlock premium content.
          </p>
          <button
            onClick={() => router.push("/subscribe")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Subscribe Now
          </button>
        </>
      )}
    </main>
  );
}
