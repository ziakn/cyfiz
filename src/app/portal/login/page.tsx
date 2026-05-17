import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPortalUserFromCookie, PORTAL_COOKIE_NAME } from "@/lib/portalAuth";
import AuthForm from "../AuthForm";

export default async function PortalLoginPage() {
  const cookieStore = await cookies();
  const user = getPortalUserFromCookie(cookieStore.get(PORTAL_COOKIE_NAME)?.value ?? null);
  if (user) redirect("/portal/dashboard");
  return <AuthForm mode="login" />;
}
