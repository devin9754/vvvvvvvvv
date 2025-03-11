"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /dashboard after 1 second
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Success!</h1>
        <p className="text-gray-600 mb-4">
          You have successfully signed in with AWS Cognito.
        </p>
        <p className="text-gray-600">Redirecting you to your dashboard...</p>
        <a
          href="/dashboard"
          className="mt-4 inline-block text-sm text-blue-600 hover:underline"
        >
          Click here if you are not redirected automatically.
        </a>
      </div>
    </main>
  );
}
