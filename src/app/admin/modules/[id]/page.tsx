import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { getModuleById } from "@/lib/db";

export default async function AdminModulePage({ params }: { params: { id: string } }) {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    redirect("/admin");
  }

  const moduleItem = await getModuleById(params.id);
  if (!moduleItem) {
    redirect("/admin/modules");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-16">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div className="rounded-3xl border border-white/10 bg-black/70 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">Module detail</p>
              <h1 className="mt-4 text-4xl font-black">{moduleItem.title}</h1>
              <p className="mt-2 text-zinc-400">Manage the content and metadata for this module.</p>
            </div>
            <Link
              href="/admin/modules"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-zinc-100"
            >
              Back to modules
            </Link>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-6 rounded-3xl border border-white/10 bg-zinc-900 p-6">
              <div>
                <p className="text-sm text-zinc-400">Slug</p>
                <p className="mt-2 text-lg font-semibold text-white">{moduleItem.slug}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Status</p>
                <p className="mt-2 rounded-full bg-white/5 px-3 py-2 text-sm uppercase tracking-[0.22em] text-zinc-300">{moduleItem.status}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Description</p>
                <p className="mt-2 text-zinc-400">{moduleItem.description}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Content</p>
                <div className="mt-3 rounded-3xl border border-white/10 bg-black/80 p-5 text-sm leading-7 text-zinc-300 whitespace-pre-wrap">
                  {moduleItem.content}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-zinc-400">Created</p>
                  <p className="mt-1 text-white">{new Date(moduleItem.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Last updated</p>
                  <p className="mt-1 text-white">{new Date(moduleItem.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
