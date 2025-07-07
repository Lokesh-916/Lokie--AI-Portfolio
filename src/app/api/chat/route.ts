import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "./prompt";

interface Message {
  role: string;
  content: string;
}

export const maxDuration = 30;

// ❌ Pas besoin de l'export ici, Next.js n'aime pas ça
function errorHandler(error: unknown) {
  if (error == null) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response("Missing Groq API key.", { status: 500 });
    }
    
    const groq = new Groq({ apiKey });
    
    // Add system prompt to the beginning of messages
    const messagesWithSystem = [SYSTEM_PROMPT, ...messages];
    
    // messages should be an array of { role: 'user' | 'assistant' | 'system', content: string }
    const completion = await groq.chat.completions.create({
      model: "gemma2-9b-it",
      messages: messagesWithSystem,
    });
    const content = completion.choices?.[0]?.message?.content || "";
    
    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
