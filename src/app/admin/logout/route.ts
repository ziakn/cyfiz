import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  
  // Use delete() to ensure the cookie is removed
  cookieStore.delete(AUTH_COOKIE_NAME);
  
  // Redirect to the web landing page as requested
  redirect("/");
}
