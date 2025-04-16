import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ✅ Point to OpenRouter endpoint
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1", // 👈 required for OpenRouter
});

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "openchat/openchat-3.5", // 🔁 You can change the model
      messages: [{ role: "user", content: message }],
    });

    const aiReply = response.choices[0]?.message?.content || "🤖 No reply.";
    res.json({ reply: aiReply });
  } catch (err) {
    console.error("❌ OpenRouter Error:", err.message);
    res.status(500).json({ reply: "❌ AI failed to respond." });
  }
});

export default router;



