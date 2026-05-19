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
  const appOrigin = new URL(resetUrl).origin;
  const logoUrl = `${appOrigin}/logo-transparent.png`;

  const result = await transporter.sendMail({
    from: process.env.SMTP_FROM || "\"Cyfiz\" <no-reply@cyfiz.com>",
    to,
    subject: "Reset your Cyfiz password",
    text: `Reset your Cyfiz password

Use this secure link to choose a new password:
${resetUrl}

This link expires in 30 minutes. If you did not request a password reset, you can safely ignore this email.`,
    html: `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0;padding:0;background:#f7f5fa;font-family:Arial,Helvetica,sans-serif;color:#07133d">
        <tr>
          <td align="center" style="padding:38px 16px">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #e9e4f2;border-radius:20px;overflow:hidden;box-shadow:0 18px 45px rgba(43,22,124,0.12)">
              <tr>
                <td style="padding:0;background:#2b167c">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#2b167c">
                    <tr>
                      <td style="padding:30px 34px 26px">
                        <img src="${logoUrl}" width="92" alt="Cyfiz" style="display:block;border:0;max-width:92px;height:auto;margin:0 0 24px">
                        <p style="margin:0 0 10px;color:#d8d0ff;font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase">Secure account recovery</p>
                        <h1 style="margin:0;color:#ffffff;font-size:30px;line-height:1.2;font-weight:800;letter-spacing:0">Reset your password</h1>
                        <p style="margin:14px 0 0;color:#eee9ff;font-size:15px;line-height:1.7;max-width:440px">
                          Use the secure link below to create a new Cyfiz password.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:34px 34px 6px">
                  <p style="margin:0;color:#38415c;font-size:15px;line-height:1.8">
                    We received a request to reset the password for your Cyfiz account. Click the button below to continue.
                  </p>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:24px 34px 32px">
                  <a href="${escapedResetUrl}" style="display:inline-block;background:#2b167c;color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;padding:15px 26px;border-radius:12px;box-shadow:0 10px 22px rgba(43,22,124,0.22)">
                    Reset Password
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding:0 34px 30px">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fbfaff;border:1px solid #eee9ff;border-radius:14px">
                    <tr>
                      <td style="padding:18px 20px">
                        <p style="margin:0 0 10px;color:#6b6380;font-size:13px;line-height:1.6">
                          Button not working? Paste this link into your browser:
                        </p>
                        <p style="margin:0;color:#07133d;font-size:13px;line-height:1.7;word-break:break-all">
                          <a href="${escapedResetUrl}" style="color:#2b167c;text-decoration:underline">${escapedResetUrl}</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:0 34px 34px">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="4" style="background:#2b167c;border-radius:99px"></td>
                      <td style="padding-left:14px">
                        <p style="margin:0;color:#6b6380;font-size:13px;line-height:1.7">
                          This link expires in 30 minutes. If you did not request a password reset, you can safely ignore this email.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <p style="margin:18px 0 0;color:#928aa8;font-size:12px;line-height:1.6">
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
