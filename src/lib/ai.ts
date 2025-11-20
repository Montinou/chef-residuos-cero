import { createOpenAI } from '@ai-sdk/openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not defined');
}

export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
