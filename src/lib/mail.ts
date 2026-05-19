import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "127.0.0.1",
  port: Number(process.env.SMTP_PORT || 25),
  secure: false,
  ignoreTLS: true,
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
    text: `Reset your password using this link: ${resetUrl}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>Reset your Cyfiz password</h2>
        <p>Click the link below to reset your password:</p>
        <p><a href="${escapedResetUrl}">${escapedResetUrl}</a></p>
        <p>This link will expire soon. If you did not request this, ignore this email.</p>
      </div>
    `,
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
