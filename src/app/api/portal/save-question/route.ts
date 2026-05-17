import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { execute, query } from "@/lib/db";
import { getPortalUserFromCookie, parsePortalCookieHeader } from "@/lib/portalAuth";

export async function POST(request: Request) {
  const user = getPortalUserFromCookie(parsePortalCookieHeader(request.headers.get("cookie")));
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const questionId = Number(body.questionId);
  if (!Number.isFinite(questionId)) {
    return NextResponse.json({ error: "Question is required." }, { status: 400 });
  }

  const existing = await query<RowDataPacket[]>(
    "SELECT id FROM saved_questions WHERE user_id = ? AND question_id = ? LIMIT 1",
    [user.id, questionId]
  );

  if (existing.length > 0) {
    await execute("DELETE FROM saved_questions WHERE user_id = ? AND question_id = ?", [user.id, questionId]);
    return NextResponse.json({ saved: false });
  }

  await execute("INSERT INTO saved_questions (user_id, question_id) VALUES (?, ?)", [user.id, questionId]);
  return NextResponse.json({ saved: true });
}
