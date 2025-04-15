// server.js

// Import required modules
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

// Initialize Express app
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON body
app.use(express.json());

// Load the OpenRouter API key from environment variable
const openRouterKey = process.env.OPENROUTER_API_KEY;

// Check if the API key is available
if (!openRouterKey) {
  console.error("❌ API Key not found. Please set OPENROUTER_API_KEY.");
  process.exit(1);
}

// Set up the /api/chat POST route
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    // Make the API call to OpenRouter
    const response = await axios.post(
      "https://api.openrouter.ai/v1/chat", // Update with OpenRouter's correct endpoint
      {
        model: "gpt-4", // Replace with the correct model if needed
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Authorization": `Bearer ${openRouterKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Send the response back to the client
    return res.json({
      message: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error generating response:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Set up the server to listen on port 3001 (or the environment port)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
