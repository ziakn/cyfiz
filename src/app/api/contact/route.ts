import { NextResponse } from "next/server";
import { execute } from "@/lib/db";
import { sendContactNotification } from "@/lib/mail";
import { getSiteSettings } from "@/lib/siteData";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOPICS = new Set(["General question", "Trainings", "Speaking or collaboration", "Feedback or suggestion"]);

const clean = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  const topic = clean(body.topic, 100) || "General question";
  const name = clean(body.name, 150);
  const email = clean(body.email, 191).toLowerCase();
  const organisation = clean(body.organisation, 150) || null;
  const role = clean(body.role, 150) || null;
  const message = clean(body.message, 5000);
  const subscribe = body.subscribe === true;

  if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!message) return NextResponse.json({ error: "Please write a message." }, { status: 400 });

  try {
    await execute(
      "INSERT INTO contact_messages (topic, name, email, organisation, role, message, subscribe) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [TOPICS.has(topic) ? topic : "General question", name, email, organisation, role, message, subscribe ? 1 : 0]
    );
    if (subscribe) {
      await execute(
        "INSERT INTO newsletter_subscribers (email, source, status) VALUES (?, 'contact', 1) ON DUPLICATE KEY UPDATE status = 1",
        [email]
      );
    }
  } catch (error) {
    console.error("Contact submission failed:", error);
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 500 });
  }

  // The message is already stored; a mail outage must not turn that into a failure.
  try {
    const { contact_email } = await getSiteSettings();
    await sendContactNotification({ topic, name, email, organisation, role, message, to: contact_email });
  } catch (error) {
    console.error("Contact notification email failed:", error);
  }

  return NextResponse.json({ success: true });
}
