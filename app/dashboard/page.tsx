import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Define a custom type so TypeScript won't complain about .get()
type CookieStore = {
  get: (name: string) => { value: string } | undefined;
};

export default async function Dashboard() {
  // If your Next.js version returns a promise, use `await cookies()`
  // then cast to CookieStore to avoid build errors.
  const cookieStore = (await cookies()) as unknown as CookieStore;

  // Safely read the token
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    redirect("/");
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-blue-50 to-blue-100">
      <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-700">DigiModels Dashboard</h1>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Log Out
          </button>
        </form>
      </header>
      <section className="p-6 flex-1 overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h2>
        <p className="text-gray-600 mb-6">
          This content is protected. Only authenticated users can view this page.
        </p>
        {/* Put your dashboard content here (cards, video, etc.) */}
      </section>
    </main>
  );
}
