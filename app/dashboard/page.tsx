// app/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

// Define a type so TS won't complain about .get()
type CookieStore = {
  get: (name: string) => { value: string } | undefined;
};

export default async function DashboardPage() {
  // If your Next.js returns a promise from cookies(), do:
  const cookieStore = (await cookies()) as unknown as CookieStore;

  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    redirect("/");
  }

  return <DashboardClient />;
}
