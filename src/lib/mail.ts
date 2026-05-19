import nodemailer from "nodemailer";

function createSmtpTransporter() {
  const host = process.env.SMTP_HOST;

  if (!host) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 25),
    secure: false,
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

  if (!transporter) {
    console.info(`Portal password reset link for ${email}: ${resetUrl}`);
    return;
  }

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
