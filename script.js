const messages = document.getElementById("messages");
const input = document.getElementById("input");
const characterSelect = document.getElementById("character");
const avatar = document.getElementById("avatar");

function changeCharacter() {
  avatar.className = characterSelect.value;
}

async function send() {
  const text = input.value.trim();
  if (!text) return;

  messages.innerHTML += `<div class="message"><b>You:</b> ${text}</div>`;
  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: text,
      character: characterSelect.value
    })
  });

  const data = await res.json();
  messages.innerHTML += `<div class="message"><b>AI:</b> ${data.reply}</div>`;
  messages.scrollTop = messages.scrollHeight;
}
