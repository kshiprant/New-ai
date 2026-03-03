/**********************************************
 * Smarter AI Chat Engine
 * Supports fuzzy matching, synonyms, tags,
 * random responses, and multi-turn conversation
 **********************************************/

let chatData = [];
const chatHistory = []; // store last few messages for context

const jsonFiles = [
  'chat_part_01.json',
  'chat_part_02.json',
  'chat_part_03.json',
  'chat_part_04.json',
  'chat_part_05.json',
  'chat_part_06.json',
  'chat_part_07.json',
  'chat_part_08.json',
  'chat_part_09.json',
  'chat_part_10.json'
];

// Synonym dictionary
const synonyms = {
  hi: ['hello', 'hey', 'yo'],
  bye: ['goodbye', 'see you', 'later'],
  thanks: ['thank you', 'thx', 'ty'],
  help: ['assist', 'support', 'guide']
};

// Load all JSON files
Promise.all(jsonFiles.map(file => fetch(file).then(res => res.json())))
  .then(results => {
    chatData = results.flat();
    console.log('All chat data loaded:', chatData.length);
  })
  .catch(err => console.error('Failed to load chat JSON:', err));

// Normalize a message: lowercase + remove punctuation
function normalize(msg) {
  return msg.toLowerCase().replace(/[^\w\s]/gi, '').trim();
}

// Expand synonyms in message
function expandSynonyms(msg) {
  let words = msg.split(' ');
  words = words.map(word => {
    for (let key in synonyms) {
      if (synonyms[key].includes(word)) return key;
    }
    return word;
  });
  return words.join(' ');
}

// Get the AI reply
function getReply(userMessage) {
  if (!chatData || chatData.length === 0) return "Loading AI data...";

  let msg = normalize(userMessage);
  msg = expandSynonyms(msg);

  let bestMatch = null;
  let maxScore = 0;

  // Loop through chat entries
  chatData.forEach(chat => {
    const input = normalize(chat.input || '');
    const words = input.split(' ');

    // Count word overlap
    let score = 0;
    words.forEach(word => {
      if (msg.includes(word)) score++;
    });

    // Consider tags as bonus points
    if (chat.tags) {
      chat.tags.forEach(tag => {
        if (msg.includes(tag)) score += 1;
      });
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = chat;
    }
  });

  let reply = "I didn't understand that, can you say it differently?";

  if (bestMatch && maxScore > 0) {
    // Pick a random response from responses array
    reply = bestMatch.responses[Math.floor(Math.random() * bestMatch.responses.length)];
  }

  // Add to chat history (optional for context)
  chatHistory.push({ user: userMessage, ai: reply });
  if (chatHistory.length > 20) chatHistory.shift(); // keep last 20 messages

  return reply;
}
