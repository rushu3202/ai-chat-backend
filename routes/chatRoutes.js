import express from "express";
import axios from "axios";
const router = express.Router();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct", // 🔁 You can change model
        messages: [
          {
            role: "system",
            content: "You are an AI homework helper. Answer simply and helpfully.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://aihomeworkhelper-frontend.onrender.com", // optional
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error("❌ OpenRouter error:", err.message);
    res.status(500).json({ reply: "AI is down. Please try again later." });
  }
});

export default router;

