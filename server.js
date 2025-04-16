app.post("/api/chat", async (req, res) => {
  console.log("Chat route hit"); // Add this log to confirm the route is accessed

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const response = await axios.post(
      "https://api.openrouter.ai/v1/chat",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Authorization": `Bearer ${openRouterKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({
      message: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error generating response:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
