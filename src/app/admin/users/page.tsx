import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { getAllAdminUsers } from "@/lib/db";
import UserList from "./UserList";

interface AdminUser {
  id: number;
  email: string;
  role: string;
  status: number;
  createdAt: string;
}

export default async function AdminUsersPage() {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);

  const users = (await getAllAdminUsers()) as AdminUser[];

  return <UserList initialUsers={users} currentUserEmail={user?.email ?? ""} />;
}
