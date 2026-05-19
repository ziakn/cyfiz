import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RowDataPacket } from "mysql2";
import { query } from "@/lib/db";
import { getPortalUserFromCookie, hashPortalPasswordResetToken, PORTAL_COOKIE_NAME, verifyPortalPasswordResetToken } from "@/lib/portalAuth";
import ResetPasswordForm from "./ResetPasswordForm";

interface PortalResetUserRow extends RowDataPacket {
  id: number;
  email: string;
  password_hash: string;
  password_reset_token_hash: string | null;
  password_reset_expires_at: Date | string | null;
}

function isResetExpiryValid(value: Date | string | null) {
  if (!value) return false;
  return new Date(value).getTime() > Date.now();
}

async function isResetTokenValid(token: string) {
  if (!token) return false;

  try {
    const unsafePayload = JSON.parse(Buffer.from(token.split(".")[1] ?? "", "base64url").toString("utf8")) as { id?: number };
    if (!unsafePayload.id) return false;

    const users = await query<PortalResetUserRow[]>(
      "SELECT id, email, password_hash, password_reset_token_hash, password_reset_expires_at FROM portal_users WHERE id = ? AND status = 1 LIMIT 1",
      [unsafePayload.id]
    );
    const user = users[0];
    if (!user) return false;
    if (!user.password_reset_token_hash || user.password_reset_token_hash !== hashPortalPasswordResetToken(token)) return false;
    if (!isResetExpiryValid(user.password_reset_expires_at)) return false;

    const payload = verifyPortalPasswordResetToken(token, user.password_hash);
    return Boolean(payload && payload.id === user.id && payload.email === user.email);
  } catch {
    return false;
  }
}

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const cookieStore = await cookies();
  const user = getPortalUserFromCookie(cookieStore.get(PORTAL_COOKIE_NAME)?.value ?? null);
  if (user) redirect("/portal/dashboard");

  const { token } = await searchParams;
  const resetToken = token ?? "";
  const tokenValid = await isResetTokenValid(resetToken);

  return <ResetPasswordForm token={resetToken} tokenValid={tokenValid} />;
}
