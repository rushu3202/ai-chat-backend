const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Replace with your actual OpenAI API Key
const API_KEY = "sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // Put your key here

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

// Route
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    const aiMessage = response.data.choices[0].message.content;
    res.json({ message: aiMessage });
  } catch (error) {
    console.error("❌ Error from OpenAI:", error.message || error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

