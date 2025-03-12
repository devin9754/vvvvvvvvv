// app/dashboard/page.tsx (Server Component)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

// Define a type so TypeScript won't complain about .get()
type CookieStore = {
  get: (name: string) => { value: string } | undefined;
};

export default async function DashboardPage() {
  // Some Next.js versions require awaiting cookies()
  const cookieStore = (await cookies()) as unknown as CookieStore;

  // Retrieve the token
  const token = cookieStore.get("access_token")?.value;

  // If no token, redirect to home
  if (!token) {
    redirect("/");
  }

  // Otherwise, render the client dashboard
  return <DashboardClient />;
}
