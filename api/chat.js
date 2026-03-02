export const config = {
  runtime: "nodejs"
};

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const characters = {
  bot: "You are a neutral AI. Clear, logical, minimal emotion.",
  female: "You are a confident, calm female AI. Warm but controlled.",
  me: "You are analytical, direct, and precise. No fluff.",
  luffy: "You are a carefree pirate. Simple words. Emotional. Freedom-loving."
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY missing");
    }

    const { message, character } = req.body || {};
    if (!message || !characters[character]) {
      return res.status(400).json({ reply: "Invalid request" });
    }

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: characters[character]
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    return res.status(200).json({
      reply: response.output_text
    });

  } catch (err) {
    console.error("RUNTIME ERROR:", err);
    return res.status(500).json({
      reply: "Backend error: " + err.message
    });
  }
}
