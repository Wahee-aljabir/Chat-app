const binId =  "67b0f17ead19ca34f804ea72"; // Replace with your bin ID
const apiKey = "$2a$10$elM1jsqJs0NHu4FsNQCJA.gSiIKgSYEtw22MWHmoRCBlg3S8yNU8m"; // Replace with your API key
const binUrl = `https://api.jsonbin.io/v3/b/${binId}`;

// Fetch messages from JSONBin.io
async function fetchMessages() {
    const response = await fetch(binUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    });
    const data = await response.json();
    const messages = data.record.messages || [];

    document.getElementById("chat-box").innerHTML = messages
        .map(msg => `<p>${msg}</p>`)
        .join("");
}

// Send a new message
async function sendMessage() {
    const input = document.getElementById("message-input");
    if (input.value.trim() === "") return;

    // Fetch current messages
    const response = await fetch(binUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    });
    const data = await response.json();
    const messages = data.record.messages || [];

    // Add new message
    messages.push(input.value);

    // Update the bin with the new messages array
    await fetch(binUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': apiKey
        },
        body: JSON.stringify({ messages })
    });

    input.value = "";
    fetchMessages(); // Refresh chat
}

//  Auto-refresh messages every 3 seconds
// setInterval(fetchMessages, 3000);
fetchMessages();
