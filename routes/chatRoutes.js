import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const aiReply = response.choices[0]?.message?.content || "🤖 No reply received.";
    res.json({ reply: aiReply });
  } catch (error) {
    console.error("❌ AI Error:", error);
    res.status(500).json({ reply: "❌ AI failed to respond." });
  }
});

export default router;



