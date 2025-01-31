import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY; // Use Vite's import.meta.env
const genAI = new GoogleGenerativeAI(apiKey);

async function run(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({ generationConfig, history: [] });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error("An error occurred:", error.message);
    return "Error: " + error.message;
  }
}

export default run;

