import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { getAllModules } from "@/lib/db";

interface ModuleItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  status: string;
  updatedAt: string;
}

export default async function AdminModulesPage() {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    redirect("/admin");
  }

  const modules = (await getAllModules()) as ModuleItem[];

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-16">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="rounded-3xl border border-white/10 bg-black/70 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">Modules</p>
              <h1 className="mt-4 text-4xl font-black">Module library</h1>
              <p className="mt-2 text-zinc-400">All dynamic page modules are stored in MySQL and can be managed here.</p>
            </div>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-zinc-100"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {modules.map((moduleItem) => (
            <Link
              key={moduleItem.id}
              href={`/admin/modules/${moduleItem.id}`}
              className="group rounded-3xl border border-white/10 bg-zinc-900 p-6 transition hover:border-white/20"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-300">{moduleItem.status}</span>
                <span className="text-sm text-zinc-400">{new Date(moduleItem.updatedAt).toLocaleDateString()}</span>
              </div>
              <h2 className="mt-5 text-xl font-black text-white">{moduleItem.title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{moduleItem.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
