// app/logout/page.tsx
"use client";

import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const signOutUser = async () => {
      try {
        // Global sign out clears the session on Cognito's side too.
        await Auth.signOut({ global: true });
      } catch (error) {
        console.error("Error signing out:", error);
      } finally {
        router.replace("/");
      }
    };

    signOutUser();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <p>Signing you out...</p>
    </main>
  );
}
