// app/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

type CookieStore = {
  get: (name: string) => { value: string } | undefined;
};

export default async function DashboardPage() {
  const cookieStore = (await cookies()) as unknown as CookieStore;
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    redirect("/");
  }
  return <DashboardClient />;
}
