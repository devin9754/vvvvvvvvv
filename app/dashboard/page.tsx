import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
  const token = cookies().get("access_token")?.value;
  if (!token) {
    redirect("/");
  }
  return <DashboardClient />;
}
