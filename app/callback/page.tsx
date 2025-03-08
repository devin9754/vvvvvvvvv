"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const [info, setInfo] = useState("");

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      setInfo(`Successfully signed in! Code: ${code}`);
    } else {
      setInfo("No code found in the URL.");
    }
  }, [searchParams]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Cognito Callback</h1>
      <p>{info}</p>
    </main>
  );
}
