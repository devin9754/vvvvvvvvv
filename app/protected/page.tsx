"use client";

import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((currentUser) => {
        // If user is logged in, store their info in state
        setUser(currentUser);
        setLoading(false);
      })
      .catch(() => {
        // If not logged in, redirect to /login (or wherever you want)
        router.replace("/login");
      });
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (!user) {
    // We tried to fetch the user but found none, so we redirect in useEffect
    return null;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Protected Content</h1>
      <p>Welcome, {user.getUsername()}!</p>
      <a href="/logout" className="mt-4 inline-block underline text-blue-600">
        Sign Out
      </a>
    </main>
  );
}
