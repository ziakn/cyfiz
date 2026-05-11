import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { getAllAdminUsers, getAllModules } from "@/lib/db";

interface ModuleItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminUser {
  id: number;
  email: string;
  role: string;
  createdAt: string;
}

export default async function AdminDashboardPage() {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    redirect("/admin");
  }

  const [modules, users] = (await Promise.all([getAllModules(), getAllAdminUsers()])) as [ModuleItem[], AdminUser[]];

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-16">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="rounded-3xl border border-white/10 bg-black/70 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">Admin Portal</p>
              <h1 className="mt-4 text-4xl font-black">Dashboard</h1>
              <p className="mt-2 text-zinc-400">Manage modules, view user data, and keep the admin portal synced with MySQL.</p>
            </div>
            <Link
              href="/admin/modules"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-zinc-100"
            >
              Manage Modules
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
              <p className="text-sm text-zinc-400">Signed in as</p>
              <p className="mt-3 text-2xl font-black text-white">{user.email}</p>
              <p className="mt-2 text-sm text-zinc-400">Role: {user.role}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
              <p className="text-sm text-zinc-400">Module items</p>
              <p className="mt-3 text-4xl font-black text-white">{modules.length}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
              <p className="text-sm text-zinc-400">Admin users</p>
              <p className="mt-3 text-4xl font-black text-white">{users.length}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
              <p className="text-sm text-zinc-400">Quick actions</p>
              <div className="mt-4 space-y-3 text-sm">
                <Link href="/admin/modules" className="text-white underline">Open module list</Link>
                <Link href="/admin" className="text-white underline">Return to login</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-black/70 p-8">
            <h2 className="text-2xl font-black">Latest modules</h2>
            <div className="mt-6 space-y-4">
              {modules.slice(0, 4).map((moduleItem) => (
                <Link
                  key={moduleItem.id}
                  href={`/admin/modules/${moduleItem.id}`}
                  className="block rounded-3xl border border-white/10 bg-zinc-900 p-5 transition hover:border-white/20"
                >
                  <p className="text-sm text-zinc-400">{moduleItem.status}</p>
                  <p className="mt-2 text-xl font-bold text-white">{moduleItem.title}</p>
                  <p className="mt-2 text-sm text-zinc-400">{moduleItem.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/70 p-8">
            <h2 className="text-2xl font-black">Admin users</h2>
            <div className="mt-6 space-y-3">
              {users.map((admin) => (
                <div key={admin.id} className="rounded-3xl border border-white/10 bg-zinc-900 p-4">
                  <p className="font-semibold text-white">{admin.email}</p>
                  <p className="text-sm text-zinc-400">{admin.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
