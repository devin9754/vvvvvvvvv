"use client";

// 1) Mark this page as dynamic so Next won't attempt to pre-render it
export const dynamic = "force-dynamic";

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
      setInfo("No code found. Did you arrive here without signing in?");
    }
  }, [searchParams]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Cognito Callback</h1>
      <p>{info}</p>
    </main>
  );
}
