import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  const { prompt } = req.body;
  console.log("💬 Prompt received:", prompt);

  if (!prompt) {
    console.log("❌ No prompt received");
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful bilingual healthcare assistant. Respond in Spanish first, then English.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = completion.choices[0].message.content;
    console.log("✅ OpenAI response:", reply);

    res.status(200).json({ result: reply });
  } catch (err) {
    console.error("❌ OpenAI error:", err);
    res.status(500).json({ error: "Failed to get response from OpenAI." });
  }
});

export default router;
