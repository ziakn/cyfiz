// Google Gemini client for the AI Paper Summarizer.
// Sends the PDF natively (inline base64) and asks for a structured JSON summary.

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta";

// Inline requests to Gemini must stay under ~20MB total. Base64 inflates bytes by
// ~33%, so cap the raw PDF a bit below that ceiling.
export const MAX_PDF_SIZE = 15 * 1024 * 1024;

export interface PaperSummary {
  title: string;
  tag: string;
  excerpt: string;
  keyFindings: string[];
  readTime: string;
}

export interface SummarizeResult {
  summary: PaperSummary;
  model: string;
}

const SUMMARY_PROMPT = `You are a cybersecurity research analyst. Read the attached academic paper (a PDF) and produce a concise, accurate summary for a professional audience on a cybersecurity company's website.

Return:
- title: the paper's title (cleaned up, no trailing whitespace).
- tag: the single best category from exactly this list: "Research", "Case Study", "Whitepaper", "Technical".
- excerpt: a 2-4 sentence plain-language summary of what the paper is about and why it matters. No markdown headings.
- keyFindings: 3-5 short bullet strings capturing the paper's most important findings or contributions. Each bullet is one sentence, no leading dashes or numbering.
- readTime: an estimated reading time for the summary as a short string like "3 min read".

Base everything strictly on the paper's actual content. Do not invent findings.`;

// Wraps the admin's free-text steer, if any. Kept clearly separated so it
// guides tone/focus without overriding the structured-output contract above.
function buildPrompt(instructions?: string) {
  const trimmed = (instructions ?? "").trim();
  if (!trimmed) return SUMMARY_PROMPT;
  return `${SUMMARY_PROMPT}

Additional instructions from the editor (follow these for tone, focus, and emphasis, but keep the required JSON fields and the fixed tag list):
${trimmed}`;
}

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    tag: { type: "string", enum: ["Research", "Case Study", "Whitepaper", "Technical"] },
    excerpt: { type: "string" },
    keyFindings: { type: "array", items: { type: "string" } },
    readTime: { type: "string" },
  },
  required: ["title", "tag", "excerpt", "keyFindings", "readTime"],
  propertyOrdering: ["title", "tag", "excerpt", "keyFindings", "readTime"],
} as const;

export function isGeminiConfigured() {
  return Boolean(process.env.GEMINI_API_KEY);
}

/**
 * Summarize a PDF research paper with Gemini. Throws with a human-readable
 * message on any configuration, network, or parsing failure.
 */
export async function summarizePaper(
  pdfBuffer: Buffer,
  instructions?: string
): Promise<SummarizeResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Add it to your .env to enable summarization.");
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  const body = {
    contents: [
      {
        role: "user",
        parts: [
          {
            inline_data: {
              mime_type: "application/pdf",
              data: pdfBuffer.toString("base64"),
            },
          },
          { text: buildPrompt(instructions) },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
      temperature: 0.2,
    },
  };

  let response: Response;
  try {
    response = await fetch(
      `${GEMINI_API_BASE}/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
  } catch (error: unknown) {
    const detail = error instanceof Error ? error.message : "unknown error";
    throw new Error(`Could not reach Gemini: ${detail}`);
  }

  if (!response.ok) {
    let detail = `${response.status} ${response.statusText}`;
    try {
      const errJson = (await response.json()) as { error?: { message?: string } };
      if (errJson?.error?.message) detail = errJson.error.message;
    } catch {
      // keep status text
    }
    throw new Error(`Gemini request failed: ${detail}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    promptFeedback?: { blockReason?: string };
  };

  if (data.promptFeedback?.blockReason) {
    throw new Error(`Gemini blocked the request: ${data.promptFeedback.blockReason}`);
  }

  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim();
  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  let parsed: PaperSummary;
  try {
    parsed = JSON.parse(text) as PaperSummary;
  } catch {
    throw new Error("Gemini returned malformed JSON.");
  }

  return {
    summary: {
      title: (parsed.title ?? "").trim(),
      tag: (parsed.tag ?? "Research").trim(),
      excerpt: (parsed.excerpt ?? "").trim(),
      keyFindings: Array.isArray(parsed.keyFindings)
        ? parsed.keyFindings.map((f) => String(f).trim()).filter(Boolean)
        : [],
      readTime: (parsed.readTime ?? "").trim() || "3 min read",
    },
    model,
  };
}
