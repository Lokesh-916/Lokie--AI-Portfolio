import Groq from "groq-sdk";
import { SYSTEM_PROMPT, CLASSIFIER_PROMPT, OUT_OF_SCOPE_REPLY, FEATURED_PROJECTS } from "./prompt";
import { REPLACE_MARKER } from "@/lib/chat-stream";

interface Message {
  role: string;
  content: string;
}

export const maxDuration = 30;

const MAX_HISTORY = 12;
const MAX_MESSAGE_CHARS = 1000;

// Keep only user/assistant turns so clients can't inject their own system messages
function sanitizeMessages(messages: Message[]) {
  return messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content.slice(0, MAX_MESSAGE_CHARS),
    }));
}

// Ask a small, fast model whether the latest question is about Lokesh.
// Fails open so a classifier outage doesn't take the chat down; the system prompt still applies.
async function isInScope(groq: Groq, messages: Message[]) {
  const latest = messages[messages.length - 1];
  const previous = messages.slice(-3, -1);
  const context = previous.map((m) => `${m.role}: ${m.content}`).join("\n");

  try {
    const result = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0,
      max_tokens: 3,
      messages: [
        { role: "system", content: CLASSIFIER_PROMPT },
        {
          role: "user",
          content: `Recent conversation:\n${context || "(none)"}\n\nLatest visitor message:\n${latest.content}`,
        },
      ],
    });
    const verdict = result.choices?.[0]?.message?.content?.trim().toUpperCase() || "";
    return !verdict.startsWith("OUT");
  } catch {
    return true;
  }
}

function pickFeaturedProjects(count = 3) {
  const pool = [...FEATURED_PROJECTS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

function textResponse(text: string) {
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function jsonResponse(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format. Expected an array." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing Groq API key. Please configure GROQ_API_KEY in your .env.local file." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const groq = new Groq({ apiKey });

    const cleanMessages = sanitizeMessages(messages);
    if (cleanMessages.length === 0 || cleanMessages[cleanMessages.length - 1].role !== "user") {
      return jsonResponse({ error: "The last message must be from the user." }, 400);
    }

    if (!(await isInScope(groq, cleanMessages))) {
      return textResponse(OUT_OF_SCOPE_REPLY);
    }

    // Add system prompt to the beginning of messages
    const systemPrompt = {
      ...SYSTEM_PROMPT,
      content: `${SYSTEM_PROMPT.content}\n## Featured projects for this reply\n\n${pickFeaturedProjects().join(", ")}\n`,
    };
    const messagesWithSystem = [systemPrompt, ...cleanMessages];

    let completion;
    try {
      completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: messagesWithSystem,
        stream: true,
      });
    } catch (primaryError) {
      // Fallback to llama if primary model fails
      completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: messagesWithSystem,
        stream: true,
      });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let sent = "";
        try {
          for await (const chunk of completion) {
            const text = chunk.choices?.[0]?.delta?.content;
            if (!text) continue;

            // The portfolio bot never needs to output code, so treat a code block as a guardrail slip
            if ((sent + text).includes("```")) {
              controller.enqueue(encoder.encode(REPLACE_MARKER + OUT_OF_SCOPE_REPLY));
              break;
            }

            sent += text;
            controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
