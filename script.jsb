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

sendBtn.addEventListener('click', () => {
  const msg = userInput.value.trim();
  if (!msg) return;
  appendMessage('You', msg);

  const reply = getReply(msg); // Now works because JSON is loaded via fetch
  appendMessage('AI', reply);

  userInput.value = '';
});

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendBtn.click();
});
