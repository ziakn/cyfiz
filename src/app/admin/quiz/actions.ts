"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/lib/db";

const REVALIDATE_PATHS = ["/admin/quiz", "/quiz", "/portal/dashboard", "/portal/quizzes"];

function revalidateQuizPaths() {
  REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Action failed";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function parseCsvRows(csvText: string) {
  const rows: string[][] = [];
  let currentLine = "";
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const nextChar = csvText[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      currentLine += char + nextChar;
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (currentLine.trim()) rows.push(parseCsvLine(currentLine));
      currentLine = "";
      if (char === "\r" && nextChar === "\n") index += 1;
      continue;
    }

    currentLine += char;
  }

  if (currentLine.trim()) rows.push(parseCsvLine(currentLine));
  return rows;
}

function normalizeHeader(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "_");
}

function getCsvValue(row: string[], headerMap: Map<string, number>, key: string) {
  const index = headerMap.get(key);
  return index === undefined ? "" : String(row[index] ?? "").trim();
}

export async function addQuizAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const duration = Number(formData.get("duration_minutes") ?? 60);
  const passing = Number(formData.get("passing_percentage") ?? 70);
  const order = String(formData.get("question_order") ?? "sequential") === "random" ? "random" : "sequential";

  if (!title) return { error: "Title is required" };

  try {
    await execute(
      "INSERT INTO quizzes (title, slug, description, duration_minutes, passing_percentage, question_order, status) VALUES (?, ?, ?, ?, ?, ?, 1)",
      [title, slugify(title), description, duration, passing, order]
    );
    revalidateQuizPaths();
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function editQuizAction(id: number, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const duration = Number(formData.get("duration_minutes") ?? 60);
  const passing = Number(formData.get("passing_percentage") ?? 70);
  const order = String(formData.get("question_order") ?? "sequential") === "random" ? "random" : "sequential";

  if (!title) return { error: "Title is required" };

  try {
    await execute(
      "UPDATE quizzes SET title = ?, slug = ?, description = ?, duration_minutes = ?, passing_percentage = ?, question_order = ? WHERE id = ?",
      [title, slugify(title), description, duration, passing, order, id]
    );
    revalidateQuizPaths();
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function deleteQuizAction(id: number) {
  try {
    await execute("DELETE FROM quizzes WHERE id = ?", [id]);
    revalidateQuizPaths();
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function addQuestionAction(formData: FormData) {
  const quizId = Number(formData.get("quiz_id"));
  const question = String(formData.get("question") ?? "").trim();
  const optionA = String(formData.get("option_a") ?? "").trim();
  const optionB = String(formData.get("option_b") ?? "").trim();
  const optionC = String(formData.get("option_c") ?? "").trim();
  const optionD = String(formData.get("option_d") ?? "").trim();
  const correct = String(formData.get("correct_option") ?? "A").toUpperCase();
  const explanation = String(formData.get("explanation") ?? "").trim();
  const referenceText = String(formData.get("reference_text") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0);

  if (!quizId || !question || !optionA || !optionB || !optionC || !optionD || !["A", "B", "C", "D"].includes(correct)) {
    return { error: "Question, options, and correct answer are required" };
  }

  try {
    await execute(
      `INSERT INTO quiz_questions
        (quiz_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, reference_text, sort_order, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [quizId, question, optionA, optionB, optionC, optionD, correct, explanation, referenceText, sortOrder]
    );
    revalidateQuizPaths();
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function importQuestionsCsvAction(formData: FormData) {
  const quizId = Number(formData.get("quiz_id"));
  const file = formData.get("questions_csv");

  if (!quizId) return { error: "Quiz is required" };
  if (!(file instanceof File) || file.size === 0) return { error: "CSV file is required" };

  try {
    const csvText = (await file.text()).replace(/^\uFEFF/, "");
    const rows = parseCsvRows(csvText);

    if (rows.length < 2) {
      return { error: "CSV must include a header row and at least one question row" };
    }

    const headerMap = new Map(rows[0].map((header, index) => [normalizeHeader(header), index]));
    const requiredColumns = ["question", "option_a", "option_b", "option_c", "option_d", "correct_option"];
    const missingColumns = requiredColumns.filter((column) => !headerMap.has(column));

    if (missingColumns.length > 0) {
      return { error: `Missing required columns: ${missingColumns.join(", ")}` };
    }

    const errors: string[] = [];
    const validRows = rows.slice(1).flatMap((row, rowIndex) => {
      const rowNumber = rowIndex + 2;
      const question = getCsvValue(row, headerMap, "question");
      const optionA = getCsvValue(row, headerMap, "option_a");
      const optionB = getCsvValue(row, headerMap, "option_b");
      const optionC = getCsvValue(row, headerMap, "option_c");
      const optionD = getCsvValue(row, headerMap, "option_d");
      const correct = getCsvValue(row, headerMap, "correct_option").toUpperCase();
      const explanation = getCsvValue(row, headerMap, "explanation");
      const referenceText = getCsvValue(row, headerMap, "reference_text");
      const sortOrderValue = getCsvValue(row, headerMap, "sort_order");
      const sortOrder = sortOrderValue ? Number(sortOrderValue) : rowIndex + 1;

      if (!question || !optionA || !optionB || !optionC || !optionD) {
        errors.push(`Row ${rowNumber}: question and all four options are required`);
        return [];
      }

      if (!["A", "B", "C", "D"].includes(correct)) {
        errors.push(`Row ${rowNumber}: correct_option must be A, B, C, or D`);
        return [];
      }

      if (!Number.isFinite(sortOrder)) {
        errors.push(`Row ${rowNumber}: sort_order must be a number`);
        return [];
      }

      return [{ question, optionA, optionB, optionC, optionD, correct, explanation, referenceText, sortOrder }];
    });

    if (errors.length > 0) {
      return { error: errors.slice(0, 8).join("; ") };
    }

    if (validRows.length === 0) {
      return { error: "No valid question rows found" };
    }

    for (const row of validRows) {
      await execute(
        `INSERT INTO quiz_questions
          (quiz_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, reference_text, sort_order, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        [quizId, row.question, row.optionA, row.optionB, row.optionC, row.optionD, row.correct, row.explanation, row.referenceText, row.sortOrder]
      );
    }

    revalidateQuizPaths();
    return { success: true, importedCount: validRows.length };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function editQuestionAction(id: number, formData: FormData) {
  const question = String(formData.get("question") ?? "").trim();
  const optionA = String(formData.get("option_a") ?? "").trim();
  const optionB = String(formData.get("option_b") ?? "").trim();
  const optionC = String(formData.get("option_c") ?? "").trim();
  const optionD = String(formData.get("option_d") ?? "").trim();
  const correct = String(formData.get("correct_option") ?? "A").toUpperCase();
  const explanation = String(formData.get("explanation") ?? "").trim();
  const referenceText = String(formData.get("reference_text") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0);

  try {
    await execute(
      `UPDATE quiz_questions
       SET question = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, correct_option = ?, explanation = ?, reference_text = ?, sort_order = ?
       WHERE id = ?`,
      [question, optionA, optionB, optionC, optionD, correct, explanation, referenceText, sortOrder, id]
    );
    revalidateQuizPaths();
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function deleteQuestionAction(id: number) {
  try {
    await execute("DELETE FROM quiz_questions WHERE id = ?", [id]);
    revalidateQuizPaths();
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}
