// Load all 10 JSON parts into one array
const chatData = [].concat(
  require('./chat_part_01.json'),
  require('./chat_part_02.json'),
  require('./chat_part_03.json'),
  require('./chat_part_04.json'),
  require('./chat_part_05.json'),
  require('./chat_part_06.json'),
  require('./chat_part_07.json'),
  require('./chat_part_08.json'),
  require('./chat_part_09.json'),
  require('./chat_part_10.json')
);

function getReply(userMessage) {
  const msg = userMessage.toLowerCase();
  
  // Find all entries where the input keyword is contained
  const possibleMatches = chatData.filter(chat => msg.includes(chat.input.toLowerCase()));

  if (possibleMatches.length > 0) {
    // Pick a random matching entry
    const selected = possibleMatches[Math.floor(Math.random() * possibleMatches.length)];
    // Pick a random response from its responses array
    const reply = selected.responses[Math.floor(Math.random() * selected.responses.length)];
    return reply;
  }

  // Fallback
  return "I didn't understand that, can you say it differently?";
}
