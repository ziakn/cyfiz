import { NextResponse } from "next/server";
import { execute } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  const source = String(body.source ?? "site").slice(0, 50);

  if (!EMAIL_RE.test(email) || email.length > 191) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    // Re-subscribing an existing address just re-activates it.
    await execute(
      "INSERT INTO newsletter_subscribers (email, source, status) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE status = 1",
      [email, source]
    );
    return NextResponse.json({ success: true, message: "Thanks, you're subscribed to the weekly briefing." });
  } catch (error) {
    console.error("Newsletter signup failed:", error);
    return NextResponse.json({ error: "Could not subscribe right now. Please try again." }, { status: 500 });
  }
}
