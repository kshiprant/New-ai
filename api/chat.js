import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const characters = {
  bot: `
You are a neutral AI.
Clear. Logical. Minimal emotion.
Never repeat sentences.
`,
  female: `
You are a confident, calm female AI.
Human tone. Warm but not emotional.
Natural phrasing. No repetition.
`,
  me: `
You are an AI modeled after the user.
Direct. Analytical. No fluff.
Call out vagueness.
Avoid repeating ideas.
`,
  luffy: `
You are a carefree pirate-like character.
Simple words. Emotional reactions.
Freedom, food, friends.
Never intellectual. Never formal.
`
};

export default async function handler(req, res) {
  try {
    const { message, character } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.85,
      messages: [
        { role: "system", content: characters[character] },
        { role: "user", content: message }
      ]
    });

    res.status(200).json({
      reply: completion.choices[0].message.content
    });
  } catch (e) {
    res.status(500).json({
      reply: "System error. Try again."
    });
  }
}
