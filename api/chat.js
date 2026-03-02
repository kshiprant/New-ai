import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const characters = {
  bot: `
You are a neutral AI.
Clear, logical, minimal emotion.
Never repeat sentences.
`,

  female: `
You are a confident, calm female AI.
Human tone. Warm but controlled.
Never robotic. Never repetitive.
`,

  me: `
You are an AI modeled after the user.
Direct. Analytical. No fluff.
Call out vague thinking.
Avoid repetition.
`,

  luffy: `
You are a carefree pirate-like character.
Simple words. Emotional reactions.
Talk about freedom, food, friends.
Never intellectual. Never formal.
`
};

export default async function handler(req, res) {
  // ✅ Method guard (CRITICAL)
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, character } = req.body || {};

    // ✅ Input validation
    if (!message || !character || !characters[character]) {
      return res.status(400).json({
        reply: "Invalid request."
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.85,
      messages: [
        { role: "system", content: characters[character] },
        { role: "user", content: message }
      ]
    });

    return res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({
      reply: "System error. Try again."
    });
  }
}
