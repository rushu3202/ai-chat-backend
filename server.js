import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Use environment variable for your API key
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
});

// 💬 Chat route
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or another model via OpenRouter
      messages: [{ role: "user", content: message }],
    });

    const aiReply = response.choices[0]?.message?.content || "🤖 No reply.";
    res.json({ reply: aiReply });
  } catch (err) {
    console.error("🔥 AI Error:", err);
    res.status(500).json({ reply: "❌ AI error. Please try again later." });
  }
});

// 🧠 Health check route
app.get("/", (req, res) => {
  res.send("✅ AI Homework Helper Backend is running!");
});

// 🌐 Render port binding
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server live at http://localhost:${PORT}`);
});
