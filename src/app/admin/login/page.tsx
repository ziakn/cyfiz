import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import AdminLoginForm from "../AdminLoginForm";

export default async function AdminLoginPage() {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);

  if (user) {
    redirect("/admin/dashboard");
  }

  return <AdminLoginForm />;
}
