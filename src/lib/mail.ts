import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "127.0.0.1",
  port: Number(process.env.SMTP_PORT || 25),
  secure: false,
  ignoreTLS: true,
  requireTLS: false,
  tls: {
    rejectUnauthorized: false,
  },
});

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

export async function sendPasswordResetEmail({ to, resetUrl }: { to: string; resetUrl: string }) {
  const escapedResetUrl = escapeHtml(resetUrl);

  const result = await transporter.sendMail({
    from: process.env.SMTP_FROM || "\"Cyfiz\" <no-reply@cyfiz.com>",
    to,
    subject: "Reset your Cyfiz password",
    text: `Reset your Cyfiz password

Use this secure link to choose a new password:
${resetUrl}

This link expires in 30 minutes. If you did not request a password reset, you can safely ignore this email.`,
    html: `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#172033">
        <tr>
          <td align="center" style="padding:32px 16px">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #e6eaf2;border-radius:16px;overflow:hidden">
              <tr>
                <td style="background:#111827;padding:28px 32px">
                  <div style="font-size:22px;font-weight:700;letter-spacing:0;color:#ffffff">Cyfiz</div>
                  <div style="margin-top:8px;font-size:13px;color:#cbd5e1">Secure account recovery</div>
                </td>
              </tr>
              <tr>
                <td style="padding:34px 32px 12px">
                  <h1 style="margin:0;color:#111827;font-size:24px;line-height:1.25;font-weight:700">Reset your password</h1>
                  <p style="margin:16px 0 0;color:#4b5563;font-size:15px;line-height:1.7">
                    We received a request to reset your Cyfiz password. Use the button below to choose a new password.
                  </p>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:20px 32px 28px">
                  <a href="${escapedResetUrl}" style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 22px;border-radius:10px">
                    Reset Password
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding:0 32px 28px">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px">
                    <tr>
                      <td style="padding:16px 18px">
                        <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6">If the button does not work, copy and paste this link into your browser:</p>
                        <p style="margin:0;color:#111827;font-size:13px;line-height:1.6;word-break:break-all">
                          <a href="${escapedResetUrl}" style="color:#1d4ed8;text-decoration:underline">${escapedResetUrl}</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:0 32px 34px">
                  <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.7">
                    This link expires in 30 minutes. If you did not request a password reset, you can safely ignore this email.
                  </p>
                </td>
              </tr>
            </table>
            <p style="margin:18px 0 0;color:#9ca3af;font-size:12px;line-height:1.6">
              Sent by Cyfiz from no-reply@cyfiz.com
            </p>
          </td>
        </tr>
      </table>
    `.trim(),
  });

  console.info("Password reset email SMTP result", {
    to,
    messageId: result.messageId,
    accepted: result.accepted,
    rejected: result.rejected,
    response: result.response,
  });
}

export async function sendPortalPasswordResetEmail(email: string, resetUrl: string) {
  await sendPasswordResetEmail({ to: email, resetUrl });
}
