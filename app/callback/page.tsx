"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * A minimal callback page for Cognito Hosted UI.
 * It displays "Successfully signed in" and any code from Cognito.
 * You can customize or exchange the code for tokens here if needed.
 */
export default function CallbackPage() {
  const searchParams = useSearchParams();
  const [info, setInfo] = useState<string>("");

  useEffect(() => {
    // Grab the "code" param from the querystring if Cognito sends one
    const code = searchParams.get("code");
    if (code) {
      setInfo(`Successfully signed in! Code: ${code}`);
    } else {
      setInfo("No code found. Did you just arrive here without signing in?");
    }
  }, [searchParams]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Cognito Callback</h1>
      <p>{info}</p>
    </main>
  );
}
