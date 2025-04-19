import dotenv from "dotenv";
dotenv.config();

import express from "express";
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful bilingual healthcare assistant. Respond in clear, simple Spanish. The reply should also be in English after the Spanish response to provide clarity.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = completion.choices[0].message.content;

    console.log("PROMPT:", prompt);
    console.log("REPLY:", reply);

    res.status(200).json({ result: reply });
  } catch (error) {
    console.error("OpenAI error (raw):", error);
    console.error(
      "OpenAI error (response):",
      error.response?.data || error.message
    );

    res.status(500).json({ error: "Failed to get response from OpenAI" });
  }
});

export default router;
