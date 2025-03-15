// File: app/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

type CookieStore = {
  get: (name: string) => { value: string } | undefined;
};

export default function DashboardPage() {
  const cookieStore = cookies() as unknown as CookieStore;
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    // Or rely on the middleware. This is just an extra check
    redirect("/");
  }

  // Render the client-side dashboard
  return <DashboardClient />;
}
