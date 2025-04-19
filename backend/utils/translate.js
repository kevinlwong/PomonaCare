//  Upload a PDF → Extract text (pdf-parse → fallback to OCR) →
// Use OpenAI GPT-4 (via translate.js) → Return both English + Spanish → All
//  safely on the backend

import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function translateText(english) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a bilingual medical assistant. Translate this medical document from English to Spanish, keeping formatting and clarity.",
        },
        {
          role: "user",
          content: `Translate the following document into Spanish:\n\n${english}`,
        },
      ],
      temperature: 0.3,
    });
   

    const spanish = response.choices[0].message.content.trim();

    return { english, spanish };
  } catch (err) {
    console.error("[translateText] OpenAI failed:", err.message);
    return { english, spanish: "Translation failed." };
  }
}
