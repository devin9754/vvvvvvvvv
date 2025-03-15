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
    // No token? Redirect home
    redirect("/");
  }
  return <DashboardClient />;
}
