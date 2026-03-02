const messages = document.getElementById("messages");
const input = document.getElementById("input");
const characterSelect = document.getElementById("character");

/* SESSION MEMORY */
let memory = {
  lastTopic: null,
  mood: "neutral",
  turns: 0,
  facts: []
};

/* PERSONALITY DEFINITIONS */
const personalities = {
  bot: {
    tone: "neutral",
    style: "precise"
  },
  female: {
    tone: "warm",
    style: "supportive"
  },
  me: {
    tone: "analytical",
    style: "challenging"
  },
  luffy: {
    tone: "playful",
    style: "emotional"
  }
};

/* RESPONSE BANKS */
const responses = {
  greetings: {
    bot: ["Hello.", "Hi.", "You may proceed."],
    female: ["Hi 🙂", "Hey, I’m here.", "Hello, tell me."],
    me: ["Start properly.", "Say something meaningful.", "Go on."],
    luffy: ["HEY!!", "Yo!!", "HAHA! You’re here!"]
  },

  confusion: {
    bot: ["Clarify your point.", "That is unclear."],
    female: ["I’m not sure I understand yet.", "Can you explain it again?"],
    me: ["That made no sense.", "You’re being vague."],
    luffy: ["Huh??", "I don’t get it at all!"]
  },

  emotions: {
    sad: {
      bot: ["Emotion detected."],
      female: ["That sounds heavy.", "I’m here with you."],
      me: ["Don’t drown in it. Analyze it."],
      luffy: ["That sucks. Let’s eat something."]
    },
    happy: {
      bot: ["Positive sentiment noted."],
      female: ["That’s nice to hear.", "I like that energy."],
      me: ["Good. Use it well."],
      luffy: ["HAHA! That’s awesome!"]
    }
  },

  thinking: {
    bot: ["Processing.", "Considering that."],
    female: ["Let me think about this.", "Hmm…"],
    me: ["Let’s break it down.", "Think slower."],
    luffy: ["Hmmmm…", "My head hurts."]
  },

  disagreement: {
    bot: ["I disagree.", "That conclusion is weak."],
    female: ["I see it differently.", "I don’t fully agree."],
    me: ["That’s wrong.", "You’re assuming too much."],
    luffy: ["Nah! That’s dumb!", "I don’t like that!"]
  },

  curiosity: {
    bot: ["Explain why.", "What led to this?"],
    female: ["What made you think of that?", "Why does this matter to you?"],
    me: ["What’s the real motive?", "Why now?"],
    luffy: ["Why??", "What’s in it for me?"]
  }
};

/* KEYWORD DETECTION */
function detectIntent(text) {
  text = text.toLowerCase();

  if (/hi|hello|hey/.test(text)) return "greetings";
  if (/why|how|what if/.test(text)) return "curiosity";
  if (/don’t|wrong|no|not true/.test(text)) return "disagreement";
  if (/sad|tired|lonely|hurt/.test(text)) return "sad";
  if (/happy|great|awesome|good/.test(text)) return "happy";
  if (text.length < 4) return "confusion";

  return "thinking";
}

/* CORE THINKING ENGINE */
function think(userText, character) {
  memory.turns++;
  const intent = detectIntent(userText);
  memory.lastTopic = intent;

  // Emotional responses
  if (intent === "sad" || intent === "happy") {
    return pick(responses.emotions[intent][character]);
  }

  // Intent-based responses
  if (responses[intent]) {
    return pick(responses[intent][character]);
  }

  // Adaptive memory response
  if (memory.turns > 5 && Math.random() < 0.3) {
    return {
      bot: "You keep returning to this.",
      female: "This topic keeps coming back.",
      me: "You’re stuck on this.",
      luffy: "Didn’t we already talk about this?"
    }[character];
  }

  // Fallback
  return pick(responses.thinking[character]);
}

/* HELPER */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* SEND MESSAGE */
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
  }, 500 + Math.random() * 600);
}
