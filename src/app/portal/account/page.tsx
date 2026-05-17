import PortalShell from "@/components/portal/PortalShell";
import { getRequiredPortalUser } from "@/lib/quizPortal";
import PasswordForm from "./PasswordForm";

export default async function PortalAccountPage() {
  const user = await getRequiredPortalUser();

  return (
    <PortalShell user={user}>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">Account Details</p>
        <h1 className="mt-2 text-3xl font-black">Profile</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Name</label>
            <input value={user.name} readOnly className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email</label>
            <input value={user.email} readOnly className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm" />
          </div>
        </div>
        <PasswordForm />
      </div>
    </PortalShell>
  );
}
