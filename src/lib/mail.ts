import nodemailer from "nodemailer";

function createSmtpTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "127.0.0.1",
    port: Number(process.env.SMTP_PORT || 25),
    secure: false,
    ignoreTLS: true,
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
    from: process.env.SMTP_FROM || "no-reply@cyfiz.com",
    to: email,
    subject: "Reset your Cyfiz portal password",
    text: `Use this link to reset your Cyfiz portal password: ${resetUrl}\n\nThis link expires in 30 minutes.`,
    html: `
      <p>Use this link to reset your Cyfiz portal password:</p>
      <p><a href="${escapedResetUrl}">${escapedResetUrl}</a></p>
      <p>This link expires in 30 minutes.</p>
    `,
  });
}
