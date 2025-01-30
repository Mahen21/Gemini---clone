/*const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyCifHJ2UXQRL0x1tIJ4ugFQwTVEv-tlCXg"; // Make sure not to expose this in production!

const genAI = new GoogleGenerativeAI(apiKey);

async function run(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Use "gemini-pro" for text-based models.

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({ generationConfig, history: [] });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text(); // Return response instead of logging
  } catch (error) {
    console.error("An error occurred:", error.message);
    return "Error: " + error.message;
  }
}

module.exports = run;
*/

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCifHJ2UXQRL0x1tIJ4ugFQwTVEv-tlCXg";
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

