require('dotenv').config(); // This MUST come first

console.log("Your API Key:", process.env.OPENAI_API_KEY);

const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAI() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello, how are you?" }],
    });

    console.log("✅ OpenAI API is working!");
    console.log("AI Response:", response.choices[0].message.content);
  } catch (error) {
    console.error("❌ Error testing OpenAI API:", error.message || error);
  }
}

testOpenAI();

