import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST || "127.0.0.1";
const smtpPort = Number(process.env.SMTP_PORT || 25);
const smtpFrom = process.env.SMTP_FROM || "Cyfiz <no-reply@cyfiz.com>";

function createSmtpTransporter() {
  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

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

export async function sendPortalPasswordResetEmail(email: string, resetUrl: string) {
  const transporter = createSmtpTransporter();
  const escapedResetUrl = escapeHtml(resetUrl);

  await transporter.sendMail({
    from: smtpFrom,
    to: email,
    subject: "Reset your Cyfiz password",
    text: `Reset your password using this link: ${resetUrl}

This link will expire in 30 minutes.

If you did not request this, ignore this email.`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222">
        <h2>Reset your Cyfiz password</h2>
        <p>Click the button below to reset your password.</p>
        <p>
          <a href="${escapedResetUrl}" style="display:inline-block;background:#111;color:#fff;padding:12px 18px;text-decoration:none;border-radius:6px">
            Reset Password
          </a>
        </p>
        <p>Or copy this link:</p>
        <p style="word-break:break-all">${escapedResetUrl}</p>
        <p>This link will expire in 30 minutes.</p>
        <p>If you did not request this, ignore this email.</p>
      </div>
    `.trim(),
  });
}
