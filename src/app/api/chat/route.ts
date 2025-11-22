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
    
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format. Expected an array." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY is missing from environment variables");
      return new Response(
        JSON.stringify({ error: "Missing Groq API key. Please configure GROQ_API_KEY in your .env.local file." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    
    const groq = new Groq({ apiKey });
    
    // Add system prompt to the beginning of messages
    const messagesWithSystem = [SYSTEM_PROMPT, ...messages];
    
    console.log("Sending request to Groq API with", messagesWithSystem.length, "messages");
    
    // messages should be an array of { role: 'user' | 'assistant' | 'system', content: string }
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: messagesWithSystem,
    });
    
    const content = completion.choices?.[0]?.message?.content || "";
    
    if (!content) {
      console.warn("Groq API returned empty content");
    }
    
    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
