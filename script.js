const messages = document.getElementById("messages");
const input = document.getElementById("input");
const characterSelect = document.getElementById("character");

/* MEMORY */
let memory = {
  turns: 0,
  lastIntent: null
};

/* RESPONSE BANK */
const brain = {
  bot: {
    greetings: ["Hello.", "Proceed.", "Yes?"],
    thinking: ["Processing.", "Considering.", "Noted."],
    confusion: ["Clarify.", "That is unclear."],
    curiosity: ["Explain why.", "What caused this?"],
    sad: ["Emotion detected."],
    happy: ["Positive state detected."]
  },
  female: {
    greetings: ["Hi 🙂", "Hey, I’m here.", "Hello."],
    thinking: ["Let me think.", "Hmm…"],
    confusion: ["Can you explain more?", "I didn’t get that fully."],
    curiosity: ["Why does this matter to you?", "What made you ask?"],
    sad: ["That sounds heavy.", "I’m here with you."],
    happy: ["That’s nice to hear.", "I like that energy."]
  },
  me: {
    greetings: ["Start with substance.", "Go on."],
    thinking: ["Break it down.", "Think clearly."],
    confusion: ["That’s vague.", "Be precise."],
    curiosity: ["Why now?", "What’s the real motive?"],
    sad: ["Don’t sink in it. Analyze it."],
    happy: ["Good. Use it well."]
  },
  luffy: {
    greetings: ["HEY!!", "HAHA!", "Yo!"],
    thinking: ["Hmmmm…", "My head hurts."],
    confusion: ["Huh??", "I don’t get it!"],
    curiosity: ["Why??", "What’s in it for me?"],
    sad: ["That sucks. Let’s eat."],
    happy: ["HAHA! That’s awesome!"]
  }
};

/* INTENT DETECTION */
function detectIntent(text) {
  text = text.toLowerCase();
  if (/hi|hello|hey/.test(text)) return "greetings";
  if (/why|how/.test(text)) return "curiosity";
  if (/sad|tired|lonely|hurt/.test(text)) return "sad";
  if (/happy|great|awesome|good/.test(text)) return "happy";
  if (text.length < 4) return "confusion";
  return "thinking";
}

/* THINKING ENGINE */
function think(text, character) {
  memory.turns++;
  const intent = detectIntent(text);
  memory.lastIntent = intent;

  const pool = brain[character][intent] || brain[character].thinking;
  return pool[Math.floor(Math.random() * pool.length)];
}

/* SEND */
function send() {
  const text = input.value.trim();
  if (!text) return;

  const character = characterSelect.value;

  messages.innerHTML += `<div class="message"><b>You:</b> ${text}</div>`;
  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    const reply = think(text, character);
    messages.innerHTML += `<div class="message"><b>AI:</b> ${reply}</div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 500 + Math.random() * 500);
}
