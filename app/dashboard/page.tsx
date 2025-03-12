import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// We'll define a type to avoid TypeScript errors on .get()
type CookieStore = {
  get: (name: string) => { value: string } | undefined;
};

// We'll keep it simple and not use motion in the server component
// If you want motion, do it in a separate client component.
export default async function DashboardPage() {
  // If your Next.js version returns a promise from cookies(), use await
  const cookieStore = (await cookies()) as unknown as CookieStore;
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    // No token found, redirect to home
    redirect("/");
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-blue-50 to-blue-100 flex flex-col">
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-700">DigiModels Dashboard</h1>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Log Out
          </button>
        </form>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
          <nav className="flex flex-col space-y-2">
            <a href="#" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium">
              Overview
            </a>
            <a href="#" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium">
              Recent Activity
            </a>
            <a href="#" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium">
              Quick Links
            </a>
            <a href="#" className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium">
              Settings
            </a>
          </nav>
        </aside>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome to Your Dashboard</h2>
              <p className="text-gray-600 mt-1">
                This content is protected. Only authenticated users can view this page.
              </p>
            </div>
            {/* Cards / Video / etc. can go here */}
          </div>
        </div>
      </div>
    </main>
  );
}
