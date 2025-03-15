"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const [message, setMessage] = useState("Verifying payment...");
  const router = useRouter();

  useEffect(() => {
    // Call an internal API route that attempts to add the user to the PaidMember group
    fetch("/api/paypal/confirm", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("Payment verified! You now have paid access. Redirecting...");
          // Optional: redirect them to the dashboard after 2 seconds
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        } else {
          setMessage("Payment not verified: " + (data.error || "Unknown error"));
        }
      })
      .catch((err) => {
        setMessage("Error verifying payment: " + err.message);
      });
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white shadow-md rounded-md text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Success</h1>
        <p>{message}</p>
      </div>
    </main>
  );
}
