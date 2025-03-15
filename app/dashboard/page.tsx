// app/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

// Force dynamic rendering and no caching:
export const dynamic = "force-dynamic";
export const revalidate = 0;

type CookieStore = {
  get: (name: string) => { value: string } | undefined;
};

export default async function DashboardPage() {
  const cookieStore = cookies() as unknown as CookieStore;
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    redirect("/");
  }
  return <DashboardClient />;
}
