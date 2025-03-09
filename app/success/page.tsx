// app/success/page.tsx
// This is a server component by default (no "use client";).

export default function SuccessPage() {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-green-50">
        <h1 className="text-2xl font-bold mb-4">You’ve successfully logged in!</h1>
        <p>Welcome to DigiModels.Store.</p>
      </main>
    );
  }
  