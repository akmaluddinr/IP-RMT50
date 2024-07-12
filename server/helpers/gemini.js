const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" },
});

module.exports = async function gemini(value) {
  const prompt = `Create a short profile about a football player, named ${value}. The response must be JSON format. Your response must be a JSON object containing 3 recipes. A recipe object has the following schema: {
  "name": "",
  "born": "",
  "country": "",
  "achievments": [
  {"": ::},
  ...]}`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
};
