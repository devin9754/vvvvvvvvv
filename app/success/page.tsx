"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect after 3 seconds (adjust as needed)
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-green-50">
      <h1 className="text-2xl font-bold mb-4">Success!</h1>
      <p>You have successfully signed in with AWS Cognito.</p>
      <p>Redirecting you to your dashboard...</p>
    </main>
  );
}
