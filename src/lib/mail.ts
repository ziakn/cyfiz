export async function sendPortalPasswordResetEmail(email: string, resetUrl: string) {
  if (!process.env.EMAIL_SERVICE) {
    console.info(`Portal password reset link for ${email}: ${resetUrl}`);
    return;
  }

  console.info(`EMAIL_SERVICE is configured as ${process.env.EMAIL_SERVICE}, but no mail provider adapter is implemented yet.`);
  console.info(`Portal password reset link for ${email}: ${resetUrl}`);
}
