// app/dashboard/page.tsx (Server Component)

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

// 1) Define a type so TypeScript won't complain about .get()
type CookieStore = {
  get: (name: string) => { value: string } | undefined;
};

export default async function DashboardPage() {
  // 2) Some Next.js versions return a promise from cookies(), so we await it.
  //    Then we cast to our custom CookieStore type to allow .get("...").
  const cookieStore = (await cookies()) as unknown as CookieStore;

  // 3) Safely retrieve the token from the cookie store
  const token = cookieStore.get("access_token")?.value;

  // 4) If no token is found, redirect to home
  if (!token) {
    redirect("/");
  }

  // 5) If token exists, render the client-side dashboard UI
  return <DashboardClient />;
}
