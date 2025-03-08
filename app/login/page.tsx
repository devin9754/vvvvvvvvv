// app/login/page.tsx
"use client";

import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      // This will redirect the user to the Cognito Hosted UI
      await Auth.federatedSignIn();
    } catch (error) {
      console.error("Error during hosted UI sign-in:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <button
        onClick={handleSignIn}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Sign In with Hosted UI
      </button>
    </main>
  );
}
