// app/dashboard/page.tsx (Server Component Wrapper)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

type CookieStore = {
  get: (name: string) => { value: string } | undefined;
};

export default async function DashboardWrapper() {
  // Read cookies (casting to a type that has .get() to avoid TypeScript errors)
  const cookieStore = (await cookies()) as unknown as CookieStore;
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    // If no token, redirect to home page
    redirect("/");
  }

  return <DashboardClient />;
}
