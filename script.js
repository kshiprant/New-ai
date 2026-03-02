const messages = document.getElementById("messages");
const input = document.getElementById("input");
const characterSelect = document.getElementById("character");
const avatar = document.getElementById("avatar");

/* Animation map (PLACEHOLDERS – replace later if needed) */
const animations = {
  bot: "https://assets.lottiefiles.com/packages/lf20_yd8fbnml.json",
  female: "https://assets.lottiefiles.com/packages/lf20_tll0j4bb.json",
  me: "https://assets.lottiefiles.com/packages/lf20_q5pk6p1k.json",
  luffy: "https://assets.lottiefiles.com/packages/lf20_jtbfg2nb.json"
};

/* Load animation when character changes */
function changeCharacter() {
  const selected = characterSelect.value;
  avatar.load(animations[selected]);
}

/* Load default character on page load */
window.onload = () => {
  changeCharacter();
};

/* Send message to backend */
async function send() {
  const text = input.value.trim();
  if (!text) return;

  messages.innerHTML += `<div class="message"><b>You:</b> ${text}</div>`;
  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        character: characterSelect.value
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      messages.innerHTML += `<div class="message"><b>System:</b> API Error</div>`;
      console.error("API error:", errText);
      return;
    }

    const data = await res.json();

    messages.innerHTML += `<div class="message"><b>AI:</b> ${data.reply}</div>`;
    messages.scrollTop = messages.scrollHeight;

  } catch (err) {
    messages.innerHTML += `<div class="message"><b>System:</b> Network failure</div>`;
    console.error(err);
  }
}
