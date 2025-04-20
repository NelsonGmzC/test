const chatContainer = document.getElementById("chat-container");

// Configura tu canal
const channelName = "TU_CANAL"; // sin @ ni https

const client = new tmi.Client({
  connection: { reconnect: true },
  channels: [channelName]
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  if (self) return;

  const msg = document.createElement("div");
  msg.className = "message";
  msg.innerHTML = `<strong>${tags["display-name"]}:</strong> ${message}`;
  chatContainer.appendChild(msg);

  // Limitar la cantidad de mensajes
  if (chatContainer.children.length > 15) {
    chatContainer.removeChild(chatContainer.firstChild);
  }
});
