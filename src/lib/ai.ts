import { createOpenAI } from '@ai-sdk/openai';

const apiKey = process.env.OPENAI_API_KEY || process.env.AI_GATEWAY_API_KEY;

if (!apiKey) {
  throw new Error('OPENAI_API_KEY or AI_GATEWAY_API_KEY is not defined');
}

export const openai = createOpenAI({
  apiKey: apiKey,
  baseURL: process.env.AI_GATEWAY_API_KEY ? "https://ai-gateway.vercel.sh/v1" : undefined,
});
