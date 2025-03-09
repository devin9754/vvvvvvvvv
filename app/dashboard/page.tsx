"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "aws-amplify";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch the current authenticated user
    Auth.currentAuthenticatedUser()
      .then((currentUser) => {
        setUser(currentUser);
        setLoading(false);
      })
      .catch((err) => {
        console.error("User is not authenticated:", err);
        router.replace("/"); // redirect to home or login if not authenticated
      });
  }, [router]);

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p>Loading your dashboard...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.username || user.email}!</h1>
      <p className="mb-6">
        This is your dashboard. Here you can view your profile and manage your account.
      </p>
      {/* You can add more sections below */}
      <Button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md">
        Sign Out
      </Button>
    </main>
  );
}
