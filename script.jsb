const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function appendMessage(sender, message) {
  const msgDiv = document.createElement('div');
  msgDiv.className = sender;
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Typing indicator
function showTyping() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'AI';
  typingDiv.id = 'typing-indicator';
  typingDiv.textContent = 'AI is typing...';
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  const typingDiv = document.getElementById('typing-indicator');
  if (typingDiv) typingDiv.remove();
}

function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  appendMessage('You', msg);
  userInput.value = '';

  showTyping();
  setTimeout(() => {
    removeTyping();
    const reply = getReply(msg);
    appendMessage('AI', reply);
  }, 600);
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});
