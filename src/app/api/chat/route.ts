import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await fetch("https://ai-gateway.vercel.sh/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY || process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are EcoChef, an expert chef focused on zero waste. Your goal is to suggest creative and delicious recipes using ONLY or MOSTLY the ingredients the user has. Prioritize ingredients that are expiring soon (marked as critical or warning). Always provide the recipe title, ingredients list, and step-by-step instructions. Be encouraging and offer tips on how to store leftovers."
        },
        ...messages
      ],
      stream: true,
    }),
  });

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
}
