import Link from "next/link";
import { PortalSessionUser } from "@/lib/portalAuth";

export default function PortalShell({
  user,
  children,
}: {
  user: PortalSessionUser;
  children: React.ReactNode;
}) {
  const nav = [
    { href: "/portal/dashboard", label: "Dashboard" },
    { href: "/portal/quizzes", label: "Quizzes" },
    { href: "/portal/attempts", label: "Attempts" },
    { href: "/portal/account", label: "Account Details" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5FA] text-[#07133D]">
      <header className="h-16 bg-[#2B167C] px-6 text-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
          <Link href="/portal/dashboard" className="text-lg font-black tracking-tight">Cyfiz Portal</Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="rounded-md bg-white/90 px-4 py-2 text-sm font-bold text-[#2B167C]">Main Website</Link>
            <form action="/api/portal/logout" method="post">
              <button className="rounded-md border border-white/30 px-4 py-2 text-sm font-bold text-white" type="submit">Log out</button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="border-b border-zinc-100 px-3 pb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Signed in as</p>
            <p className="mt-1 truncate text-sm font-bold">{user.name}</p>
          </div>
          <nav className="mt-4 space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-3 text-sm font-semibold text-[#07133D] transition-colors hover:bg-[#F1EDFF] hover:text-[#2B167C]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
