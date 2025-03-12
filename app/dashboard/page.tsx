// app/dashboard/page.tsx (Server Component Wrapper)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

// Define a type for the cookies object
type CookieStore = {
  get: (name: string) => { value: string } | undefined;
};

export default async function DashboardWrapper() {
  // Get cookies (using await if necessary)
  const cookieStore = (await cookies()) as unknown as CookieStore;
  const token = cookieStore.get("access_token")?.value;

  // If no token is found, redirect to the home page immediately.
  if (!token) {
    redirect("/");
  }

  // Render the protected dashboard UI
  return <DashboardClient />;
}
