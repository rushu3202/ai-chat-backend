import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ✅ Use OpenRouter endpoint
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "openchat/openchat-3.5",
      messages: [{ role: "user", content: message }],
    });

    const aiReply = response.choices[0]?.message?.content || "🤖 No reply from OpenRouter.";
    res.json({ reply: aiReply });
  } catch (err) {
    console.error("❌ AI Error:", err.message);
    res.status(500).json({ reply: "❌ AI error. Try again later." });
  }
});

export default router;
