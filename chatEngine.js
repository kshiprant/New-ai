let chatData = [];

// List all JSON files
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

// Load all JSONs
Promise.all(jsonFiles.map(file => fetch(file).then(res => res.json())))
  .then(results => {
    chatData = results.flat();
    console.log('All chat data loaded:', chatData.length);
  })
  .catch(err => console.error('Failed to load chat JSON:', err));

// Reply function
function getReply(userMessage) {
  if (!chatData || chatData.length === 0) return "Loading AI data...";

  const msg = userMessage.toLowerCase().replace(/[^\w\s]/gi, '');

  const possibleMatches = chatData.filter(chat => msg.includes(chat.input.toLowerCase()));

  if (possibleMatches.length > 0) {
    const selected = possibleMatches[Math.floor(Math.random() * possibleMatches.length)];
    const reply = selected.responses[Math.floor(Math.random() * selected.responses.length)];
    return reply;
  }

  return "I didn't understand that, can you say it differently?";
}
